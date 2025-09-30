FROM node:20-alpine AS build
ARG PORT=3000
ENV PORT=$PORT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:20-alpine AS test
ARG PORT=3000
ENV PORT=$PORT
WORKDIR /app
COPY --from=build /app /app
RUN npm test

FROM node:20-alpine AS production
ARG PORT=3000
ENV PORT=$PORT
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app/app.js .
COPY --from=build /app/package.json .
RUN npm install --omit=dev


EXPOSE $PORT

HEALTHCHECK --interval=5s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:$PORT/healthcheck || exit 1

CMD ["node", "app.js"]
