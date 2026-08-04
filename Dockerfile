# Multi‑stage Dockerfile for the AI Awareness Course static server
# ---------------------------------------------------------------
# Builder stage (uses Node to install only production deps)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev && npm cache clean --force
COPY . .

# Runtime stage – copy only what is needed
FROM node:20-alpine AS runtime
WORKDIR /app
# Copy production node_modules and compiled assets from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server.js ./server.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/private ./private
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "server.js"]
