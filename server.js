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

const ROOT = path.join(__dirname, 'public');
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

const server = http.createServer(function (req, res) {
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

  if (pathname === '/') pathname = '/index.html';

  let filePath = safeJoin(ROOT, pathname);
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
          filePath = path.join(ROOT, 'index.html');
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

server.listen(PORT, HOST, function () {
  const url = 'http://' + HOST + ':' + PORT + '/';
  console.log('');
  console.log('  AI Awareness Course');
  console.log('  --------------------');
  console.log('  Serving: ' + ROOT);
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
