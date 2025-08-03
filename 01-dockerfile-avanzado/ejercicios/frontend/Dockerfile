# Dockerfile sin optimizar para Angular Frontend
FROM ubuntu:22.04

# Instalar Node.js y nginx
RUN apt-get update && \
    apt-get install -y curl nginx && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Copiar todo el proyecto
COPY ../../frontend .

# Instalar dependencias
RUN npm install

# Compilar aplicación Angular
RUN npm run build

# Copiar archivos compilados a nginx
RUN cp -r dist/course-frontend/* /var/www/html/

# Configurar nginx (eliminar página por defecto)
RUN rm /var/www/html/index.nginx-debian.html

# Exponer puerto
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
