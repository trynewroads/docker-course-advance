ARG NODE=20
ARG PORT=3000
ARG DEBUG_LEVEL=info

# Stage 1: Build
FROM node:$NODE AS build

WORKDIR /app
COPY package*.json ./

RUN npm ci && \
    npm cache clean --force


# Stage 2: Testing
FROM node:$NODE AS test

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm test

# Stage 3: Production
FROM node:$NODE-alpine AS production

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001 -G nodejs

COPY --chown=nodeuser:nodejs package*.json ./
COPY --chown=nodeuser:nodejs src src
    

RUN mkdir -p uploads logs && \
    npm ci --only=production && \
    npm cache clean --force && \
    chown -R nodeuser:nodejs /app

ARG PORT
ARG DEBUG_LEVEL

ENV NODE_ENV=production \
    PORT=$PORT \
    DEBUG_LEVEL=$DEBUG_LEVEL \
    USE_DB=false

EXPOSE $PORT

USER nodeuser

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:$PORT/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"


CMD ["node", "src/app.js"]