# Dockerfile muy mal optimizado y complejo
FROM ubuntu:22.04

WORKDIR /app

# Instala Node.js y npm de forma manual
RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

# Copia todo el contexto, incluyendo archivos innecesarios
COPY . .

# Instala todas las dependencias
RUN npm install

# Variables de entorno por defecto
ENV PORT=3000
ENV NODE_ENV=produccion
ENV DB_PASSWORD=pon-tu-secreto-aqui

EXPOSE 3000

CMD ["npm", "start"]