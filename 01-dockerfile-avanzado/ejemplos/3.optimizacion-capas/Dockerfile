FROM node:20
WORKDIR /app
COPY . .
RUN apt-get update
RUN apt-get install -y build-essential
RUN npm install
RUN npm test
CMD ["node", "app.js"]
