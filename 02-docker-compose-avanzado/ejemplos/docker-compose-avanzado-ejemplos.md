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

Esta presentación contiene ejemplos prácticos que demuestran las técnicas avanzadas de Docker Compose. Todos los ejemplos utilizan una aplicación de demostración ubicada en la carpeta `app/`.

La aplicación consiste en un servidor web desarrollado en **Node.js** con **Express** que expone los siguientes endpoints:

- `GET /` - Endpoint principal que devuelve un mensaje de bienvenida
- `GET /healthcheck` - Endpoint principal que devuelve el estado
- `GET /secret` - Endpoint que muestra el valor de la variable de entorno `SECRET`

---

La aplicación utiliza las siguientes **variables de entorno**:

- `SECRET` - Variable que contiene un valor secreto mostrado en el endpoint `/secret`
- `LOG_LEVEL` - Nivel de logs a mostrar
- `PORT` - Puerto en el que se ejecuta el servidor (por defecto: 3000)

> **Nota:** Para ejecutar los ejemplos, asegúrate de estar en el directorio `ejemplos/` y usar los comandos tal como se muestran en cada sección.

---

# Ejemplo 0: Imagen Base

```
docker build -f Dockerfile -t app-custom ../../01-dockerfile-avanzado/ejemplos/app/
```

# Ejemplo 1: Anchor

---

- Levantar las máquinas

  ```bash
  docker compose  -f 1.anchor/docker-compose.yaml  up
  ```

- Comprobación y logs
  ```bash
  curl http://localhost:3000
  ```

---

# Ejemplo 2: Healthcheck

---

- Creación
  ```bash
  docker build -f 2.healthcheck/Dockerfile -t app-custom-health ../../01-dockerfile-avanzado/ejemplos/app/
  ```
- Levantar las máquinas.

  ```
  docker run --rm --init -p3000:3000 app-custom-health
  ```

- Docker compose

  ```
  docker compose  -f 2.healthcheck/docker-compose.yaml  up
  ```

- Comprobación
  ```bash
  docker ps
  Up 55 seconds (healthy)
  ```

---

# Ejemplo 3: Entornos ficheros .env

---

- Creación

  ```
  docker compose  -f 3.env/docker-compose.yaml up
  ```

---

# Ejemplo 4: Entornos docker compose

---

- Creación

  ```
  docker compose -f 4.env/docker-compose.yaml -f 4.env/docker-compose.dev.yaml up
  docker compose -f 4.env/docker-compose.yaml -f 4.env/docker-compose.prod.yaml up
  ```

---

# Ejemplo 5: Entornos Dockerfile

- Creación

  ```
  docker build -f 5.env/Dockerfile.dev -t app-custom-dev ../../01-dockerfile-avanzado/ejemplos/app/
  ```

  ```
  docker build -f 5.env/Dockerfile.prod -t app-custom-prod ../../01-dockerfile-avanzado/ejemplos/app/
  ```

- Ejecución
  ```
  docker run --rm --init --name app-custom-dev app-custom-dev
  docker run --rm --init --name app-custom-dev app-custom-prod
  ```

---

- Comprobación

  ```
  docker image ls

  REPOSITORY        TAG       IMAGE ID       CREATED         SIZE
  app-custom-dev    latest    b6df7158d052   4 minutes ago   1.18GB
  app-custom-prod   latest    e094b76034e5   4 minutes ago   147MB
  ```
