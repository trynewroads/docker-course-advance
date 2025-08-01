FROM node:20

# ARG para el puerto (se puede pasar en build time)
ARG PORT=3000

# ENV para el secreto (variable de entorno)
ENV SECRET="mi-secreto-por-defecto"

# Pasar el valor de ARG a una ENV para que esté disponible en runtime
ENV PORT=$PORT

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

# Exponer el puerto
EXPOSE $PORT

CMD ["node", "app.js"]
