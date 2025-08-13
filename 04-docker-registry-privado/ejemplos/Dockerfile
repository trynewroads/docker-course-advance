FROM node:20-alpine AS build
ARG PORT=3000
ENV PORT=$PORT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


FROM node:20-alpine AS production

LABEL org.opencontainers.image.source="https://github.com/trynewroads/docker-course-advance" \
      org.opencontainers.image.description="Container para docker curso de docker" \
      org.opencontainers.image.licenses="Apache-2.0"

ARG PORT=3000
ENV PORT=$PORT
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=build /app/src src
COPY --from=build /app/package.json .
RUN npm install --omit=dev


EXPOSE $PORT

HEALTHCHECK --interval=5s --timeout=10s --retries=3 \
  CMD curl -f http://localhost:$PORT/healthcheck || exit 1

VOLUME ["/app/uploads", "/app/logs"]

CMD ["node", "src/app.js"]



