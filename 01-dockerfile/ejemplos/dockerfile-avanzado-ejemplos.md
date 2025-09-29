---
marp: true
theme: default
title: Dockerfile Avanzado
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Dockerfile Avanzado
header: |
  <div class="logo-start">
    <img src="../../img/docker-logo-white.png" alt="Logo Docker"  class="logo"/>
  </div>
  <div class="logo-end">
    <img src="../../img/logo_white.png" alt="Logo Docker" class="logo" />
  </div>

style: |
  section {
    display:flex;
  }

  section > h2, h3, h4, h5{
    border-bottom: 2px solid #2D6BFA;
    padding-bottom: .3rem;
  }

  section::after, header, footer {
    font-weight: 700;
    color: white;
  }

  section > header {
    display: flex;
    top: 0;
    width: calc(100% - 60px);
    background: radial-gradient(30% 100% at 50% 0%, #2D6BFA 0%, rgba(46, 32, 82, 0.00) 100%);
  }

  .logo-start{
    flex:1;
  }

  .logo-end{
    flex:1;
    text-align:end;
    width: auto;
    height: 30px;
  }

  .logo {
    width: auto;
    height: 30px;
  }

  .front {
    display: flex;
    flex-direction: column;
  }

  .title{
    font-size:2.5em;
    margin-bottom:0;
    padding-bottom:0;
    
  }

  .line{
    width:100%;
    background-color: #2D6BFA
  }

  .author{
    font-size:1.3em;
    font-weight: 700;
    margin-bottom: 0;
  }

  .company{
    font-size:.9em;
    margin-top: .1em;
  }

  blockquote{
    color:white;
    font-size: 16px;
    border-color:#2D6BFA;
    bottom: 70px;
    left: 30px;
    position: absolute;
  }

  a{
    background-color: rgb(45 107 250 / 30%);
    color: white;
    font-weight: bold;
    text-decoration: none;
  }

  a > code {
    background-color: rgb(45 107 250 / 30%);
  }


  code {
    background-color: rgb(255 255 255 / 30%);
  }
---

  <!-- _paginate: skip -->

  <div class="front">
    <h1 class="title"> Dockerfile Avanzado </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

## Ejemplos

Esta presentación contiene ejemplos prácticos que demuestran las técnicas avanzadas de Dockerfile. Todos los ejemplos utilizan una aplicación de demostración ubicada en la carpeta `app/`.

La aplicación consiste en un servidor web desarrollado en **Node.js** con **Express** que expone los siguientes endpoints:

- `GET /` - Endpoint principal que devuelve un mensaje de bienvenida
- `GET /secret` - Endpoint que muestra el valor de la variable de entorno `SECRET`

---

La aplicación utiliza las siguientes **variables de entorno**:

- `SECRET` - Variable que contiene un valor secreto mostrado en el endpoint `/secret`
- `PORT` - Puerto en el que se ejecuta el servidor (por defecto: 3000)

> **Nota:** Para ejecutar los ejemplos, asegúrate de estar en el directorio `ejemplos/` y usar los comandos tal como se muestran en cada sección.

---

# Ejemplo 1: Mínimo

---

- Contenido del `Dockerfile`

  ```dockerfile
  FROM alpine:3.20
  CMD ["echo", "Hola Docker!"]
  ```

- Construcción de la imagen

  ```bash
  docker build -f 1.minimo/Dockerfile -t app-minimo 1.minimo
  ```

- Ejecución de la imagen

  ```bash
  docker run --rm app-minimo
  ```

---

# Ejemplo 2: Multi-stage

---

Este ejemplo muestra cómo crear una imagen Docker optimizada usando `multi-stage`.

---

- `Dockerfile.before:` Imagen sin multi-stage

  ```dockerfile
    FROM node:20
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm test
    CMD ["node", "app.js"]
  ```

- Creación:

  ```bash
  docker build -f 2.multi-stage/Dockerfile.before -t app-simple app
  ```

- Ejecución y comprobación:

  ```bash
  docker run --rm --init -p 3000:3000 app-simple
  curl http://localhost:3000
  ```

---

- `Dockerfile.after:` Imagen con multi-stage.

  ```dockerfile
    FROM node:20 AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .

    FROM node:20 AS test
    WORKDIR /app
    COPY --from=build /app /app
    RUN npm test

    FROM node:20 AS production
    WORKDIR /app
    COPY --from=build /app/app.js .
    COPY --from=build /app/package.json .
    RUN npm install --production
    CMD ["node", "app.js"]
  ```

---

- Creación:

  ```bash
  docker build -f 2.multi-stage/Dockerfile.after -t app-multi-stage app
  ```

- Ejecución y comprobación:

  ```bash
  docker run --rm --init -p 3000:3000 app-multi-stage
  curl http://localhost:3000
  ```

- Comprobación reducción:

  ```bash
   docker image ls
  REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
  app-simple        latest    2fa07e3c943c   4 minutes ago   1.26GB
  app-multi-stage   latest    e57316ecfb25   5 minutes ago   1.2GB
  ```

---

# Ejemplo 3: Optimización Capas

---

Este ejemplo muestra cómo optimizar las capas de Docker progresivamente para mejorar el rendimiento y reducir el tamaño de las imágenes.

---

- `Dockerfile:` Imagen con capas mal optimizadas (versión original)

  ```dockerfile
  FROM node:20
  WORKDIR /app
  COPY . .
  RUN apt-get update
  RUN apt-get install -y build-essential
  RUN npm install
  RUN npm test
  CMD ["node", "app.js"]
  ```

- Creación:

  ```bash
  docker build -f 3.optimizacion-capas/Dockerfile -t app-mal-optimizado app
  ```

---

- `Dockerfile.1-agrupa-run:` Agrupando comandos RUN

  ```dockerfile
  FROM node:20
  WORKDIR /app
  COPY . .
  RUN apt-get update && \
      apt-get install -y build-essential && \
      npm install
  RUN npm test
  CMD ["node", "app.js"]
  ```

- Creación:

  ```bash
  docker build -f 3.optimizacion-capas/Dockerfile.1 -t app-fase1 app
  ```

---

- `Dockerfile.2-limpieza:` Agrupando RUN y limpiando archivos temporales

  ```dockerfile
  FROM node:20
  WORKDIR /app
  COPY . .
  RUN apt-get update && \
      apt-get install -y build-essential && \
      npm install && \
      apt-get clean && \
      rm -rf /var/lib/apt/lists/*
  RUN npm test
  CMD ["node", "app.js"]
  ```

- Creación:

  ```bash
  docker build -f 3.optimizacion-capas/Dockerfile.2 -t app-fase2 app
  ```

---

```dockerfile
FROM node:20
WORKDIR /app

# Instalar dependencias del sistema primero (se cachea)
RUN apt-get update && \
    apt-get install -y build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copiar solo package.json primero (mejor cache)
COPY package*.json ./
RUN npm install

# Copiar código fuente al final
COPY . .
RUN npm test

CMD ["node", "app.js"]
```

---

- `Dockerfile.3-optimizado:` Capas optimizadas y bien organizadas

- Creación:

  ```bash
  docker build -f 3.optimizacion-capas/Dockerfile.3 -t app-fase3 app
  ```

- Comparación de mejoras:

  ```bash
  # Ver tamaños de las imágenes
  docker images | grep app-

  # Ver número de capas
  docker history app-mal-optimizado
  docker history app-fase1
  docker history app-fase2
  docker history app-fase3
  ```

---

- Prueba de eficiencia del cache:

  ```bash
  # Modificar código de la aplicación
  res.send('¡Hola desde Node.js en Docker!'); -> res.send('¡Hola Mundo!');

  # Comparar tiempos de rebuild
  docker build -f 3.optimizacion-capas/Dockerfile -t app-mal-optimizado app
  docker build -f 3.optimizacion-capas/Dockerfile.3 -t app-fase3 app
  ```

> **Nota:** La versión optimizada será significativamente más rápida al hacer cambios en el código, ya que reutiliza las capas de instalación de dependencias del sistema y npm.

---

# Ejemplo 4: ARG y ENV

---

Este ejemplo demuestra el uso de variables `ARG` (build time) y `ENV` (runtime) en Docker.

---

```dockerfile
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
```

---

- `Dockerfile:` Uso de ARG para PORT y ENV para SECRET

- Creación con valores por defecto:

  ```bash
  docker build -f 4.arg-env/Dockerfile -t app-arg-env app
  ```

- Creación con puerto personalizado:

  ```bash
  docker build -f 4.arg-env/Dockerfile --build-arg PORT=8080 -t app-arg-env-8080 app
  ```

---

- Verificación:

  ```bash
  # Ver variables de entorno del contenedor
  docker run --rm app-arg-env env | grep -E "(PORT|SECRET)"
  docker run --rm app-arg-env-8080 env | grep -E "(PORT|SECRET)"
  ```

- Ejecución y comprobación:

  ```bash
  docker run --rm --init -p 3000:3000 app-arg-env
  docker run --rm --init -p 8080:8080 app-arg-env-8080
  curl http://localhost:3000
  curl http://localhost:3000/secret
  curl http://localhost:3000
  curl http://localhost:3000/secret
  ```

---

# Ejemplo 5: Secretos

---

Este ejemplo demuestra las diferentes formas de gestionar secretos en Docker: la **mala práctica** (hardcodeado) y las **buenas prácticas** (variables de entorno y archivos montados).

---

- `Dockerfile:` Secreto hardcodeado

  ```dockerfile
    FROM node:20

    # ENV para el secreto (variable de entorno)
    ENV SECRET="mi-secreto-por-defecto"
    ....

  ```

- Creación (mala práctica):

  ```bash
  docker build -f 5.secretos/Dockerfile -t app-secreto-malo app
  ```

---

- `Dockerfile.1:` Sin secretos hardcodeados

  ```dockerfile
  FROM node:20
  # ENV SECRET="mi-secreto-por-defecto"
  ...
  ```

- Creación (buena práctica):

  ```bash
  docker build -f 5.secretos/Dockerfile.1 -t app-secreto-bueno app
  ```

---

- Ejecución **sin secreto** (muestra "undefined"):

  ```bash
  docker run --rm --init -p 3000:3000 app-secreto-bueno
  curl http://localhost:3000/secret
  ```

- Ejecución con **variable de entorno**:

  ```bash
  docker run --rm --init -p 3000:3000 -e SECRET="mi-secreto-desde-env" app-secreto-bueno
  curl http://localhost:3000/secret
  ```

- Ejecución con **archivo montado**:

  ```bash
  docker run --rm --init -p 3000:3000 -v "$(pwd)/5.secretos/my_secret.txt:/run/secrets/secret.txt" app-secreto-bueno
  curl http://localhost:3000/secret
  ```

---

- Verificación del problema de seguridad:

  ```bash
  # Ver que el secreto está expuesto en la imagen mala
  docker run --rm app-secreto-malo env | grep SECRET

  # Ver que no hay secreto hardcodeado en la imagen buena
  docker run --rm app-secreto-bueno env | grep SECRET
  ```
