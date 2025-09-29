# Dockerfile sin optimizar para NestJS Backend
FROM node:20

WORKDIR /app

# Variables de entorno con valores por defecto
ENV PORT=3000
ENV DEBUG_REQUEST=false
ENV DEFAULT_USER=admin
ENV DEFAULT_PASS=12345678
ENV JWT_SECRET=secretKey
ENV ENABLE_AUTH=true
ENV USE_DB=false
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_USER=todo_user
ENV DB_PASS=todo_pass
ENV DB_NAME=todo_db

# Copiar todo el proyecto
COPY . .

# Instalar dependencias
RUN npm install

# Compilar TypeScript genera carpeta dist
RUN npm run build

# Ejecutar tests
RUN npm run test:e2e

# Exponer puerto
EXPOSE $PORT

# Comando para ejecutar en producción
CMD ["node", "dist/main.js"]
