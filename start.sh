#!/usr/bin/env bash
# Launch AI Awareness Course on macOS / Linux
# Requires only Node.js (no npm install / no internet after Node is installed)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

PORT="${PORT:-3000}"
HOST="${HOST:-127.0.0.1}"
URL="http://${HOST}:${PORT}/"

if ! command -v node >/dev/null 2>&1; then
  echo "============================================"
  echo " Node.js is required (only system dependency)"
  echo "============================================"
  echo ""
  echo " Install once:"
  echo "   macOS:  brew install node"
  echo "           or download LTS from https://nodejs.org/"
  echo "   Linux:  use your package manager, e.g."
  echo "           sudo apt install nodejs   (Debian/Ubuntu)"
  echo "           or https://nodejs.org/"
  echo ""
  echo " Then run this script again."
  exit 1
fi

NODE_VER="$(node -v 2>/dev/null || true)"
echo "Using Node.js ${NODE_VER}"
echo "Starting AI Awareness Course at ${URL}"
echo "Press Ctrl+C to stop the server."
echo ""

open_browser() {
  sleep 1.2
  if command -v open >/dev/null 2>&1; then
    open "${URL}" || true
  elif command -v xdg-open >/dev/null 2>&1; then
    xdg-open "${URL}" || true
  elif command -v sensible-browser >/dev/null 2>&1; then
    sensible-browser "${URL}" || true
  else
    echo "Open this URL in your browser: ${URL}"
  fi
}

open_browser &
export PORT HOST
exec node server.js
