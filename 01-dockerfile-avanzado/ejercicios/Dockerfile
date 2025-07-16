# Dockerfile base para los ejercicios avanzados
FROM node:20-alpine

WORKDIR /app


COPY package.json ./
COPY app.js ./

# Variables de entorno por defecto (pueden ser sobreescritas en tiempo de ejecución)
ENV PORT=3000 \
    NODE_ENV=produccion \
    DB_PASSWORD=pon-tu-secreto-aqui

RUN npm install --omit=dev


EXPOSE 3000

CMD ["npm", "start"]
