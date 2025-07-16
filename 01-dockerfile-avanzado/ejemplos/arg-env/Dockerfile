FROM node:20

# Definimos una variable de build (ARG)
ARG MENSAJE="Hola desde ARG"

# Pasamos el valor de ARG a una variable de entorno (ENV)
ENV MENSAJE_ENV=$MENSAJE

# Script que imprime el valor de la variable
COPY app.js .

CMD ["node", "app.js"]
