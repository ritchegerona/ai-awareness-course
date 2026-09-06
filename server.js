#!/usr/bin/env node
/**
 * Zero-dependency static file server (Node.js built-ins only).
 * Works on Windows, macOS, and Linux — no npm packages required.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// Load environment variables from a .env file if present (simple parser, no external deps)
if (fs.existsSync(path.join(__dirname, '.env'))) {
  const envContent = fs.readFileSync(path.join(__dirname, '.env'), { encoding: 'utf8' });
  envContent.split(/\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) return;
    const key = trimmed.slice(0, eqIdx).trim();
    const value = trimmed.slice(eqIdx + 1).trim();
    process.env[key] = value;
  });
}

// Simple in‑memory rate limiting (max 100 requests per IP per minute)
const requestCounts = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const window = 60 * 1000; // 1 minute
  const record = requestCounts.get(ip) || { count: 0, start: now };
  if (now - record.start > window) {
    // reset window
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  requestCounts.set(ip, record);
  return record.count > 100;
}

const PUBLIC_ROOT = path.join(__dirname, 'public');
const PRIVATE_ROOT = path.join(__dirname, 'private');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8'
};

function safeJoin(root, requestPath) {
  const decoded = decodeURIComponent(requestPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const full = path.join(root, normalized);
  if (!full.startsWith(root)) return null;
  return full;
}

function send(res, status, body, headers) {
  res.writeHead(status, headers || {});
  res.end(body);
}

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

// Request logging and basic security headers
const server = http.createServer(function (req, res) {
  // Log incoming request
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);

  // Rate limiting based on client IP
  const clientIp = req.socket.remoteAddress || 'unknown';
  if (isRateLimited(clientIp)) {
    send(res, 429, 'Too Many Requests', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Content-Security-Policy', "default-src 'self'" );
  // Cache control for static assets (1 day)
  if (req.method === 'GET' && req.url !== '/' && req.url.match(/\.(css|js|png|jpg|jpeg|svg|webp|ico|json|html|txt)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400');
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    send(res, 405, 'Method Not Allowed', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  let pathname;
  try {
    pathname = new URL(req.url || '/', 'http://localhost').pathname;
  } catch (_) {
    send(res, 400, 'Bad Request', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  // Health‑check endpoint
  if (pathname === '/health') {
    const health = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    };
    send(res, 200, JSON.stringify(health), {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    });
    return;
  }

  if (pathname === '/') pathname = '/index.html';

  // Check if requesting private folder
  let root = PUBLIC_ROOT;
  if (pathname.startsWith('/private/')) {
    root = PRIVATE_ROOT;
    pathname = pathname.replace('/private/', '/');
  }

  let filePath = safeJoin(root, pathname);
  if (!filePath) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' });
    return;
  }

  fs.stat(filePath, function (err, stat) {
    if (err || !stat.isFile()) {
      // Try directory index
      if (!err && stat && stat.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      } else if (pathname === '/index.html' || pathname === '/') {
        send(res, 404, 'Not Found', { 'Content-Type': 'text/plain; charset=utf-8' });
        return;
      } else {
        // SPA-friendly: unknown paths without extension → index.html
        if (!path.extname(pathname)) {
          filePath = path.join(root, 'index.html');
        } else {
          send(res, 404, 'Not Found', { 'Content-Type': 'text/plain; charset=utf-8' });
          return;
        }
      }
    }

    fs.readFile(filePath, function (readErr, data) {
      if (readErr) {
        send(res, 404, 'Not Found', { 'Content-Type': 'text/plain; charset=utf-8' });
        return;
      }
      const headers = {
        'Content-Type': contentType(filePath),
        'Content-Length': data.length,
        'Cache-Control': path.extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=3600'
      };
      if (req.method === 'HEAD') {
        res.writeHead(200, headers);
        res.end();
        return;
      }
      send(res, 200, data, headers);
    });
  });
});

// Export server for testing when required
if (process.env.NODE_ENV === 'test') {
  module.exports = server;
}

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, HOST, function () {
    const url = 'http://' + HOST + ':' + PORT + '/';
    console.log('');
    console.log('  AI Awareness Course');
    console.log('  --------------------');
    console.log('  Public:   ' + PUBLIC_ROOT);
    console.log('  Private:  ' + PRIVATE_ROOT);
    console.log('  Open:    ' + url);
    console.log('  Press Ctrl+C to stop');
    console.log('');
  });

  server.on('error', function (err) {
    if (err.code === 'EADDRINUSE') {
      console.error('Port ' + PORT + ' is already in use.');
      console.error('Try: PORT=3001 node server.js');
      console.error('Or stop the other process using that port.');
    } else {
      console.error(err);
    }
    process.exit(1);
  });
}
