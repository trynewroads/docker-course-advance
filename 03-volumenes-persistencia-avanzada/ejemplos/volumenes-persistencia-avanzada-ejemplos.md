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

TODO: Añadir nuevos endpoints uploads y users

---

La aplicación utiliza las siguientes **variables de entorno**:

- `SECRET` - Variable que contiene un valor secreto mostrado en el endpoint `/secret`
- `LOG_LEVEL` - Nivel de logs a mostrar
- `PORT` - Puerto en el que se ejecuta el servidor (por defecto: 3000)

> **Nota:** Para ejecutar los ejemplos, asegúrate de estar en el directorio `ejemplos/` y usar los comandos tal como se muestran en cada sección.

---

# Ejemplo 0: Imagen Base

- Creación

  ```
  docker build -f Dockerfile -t app-base-3 ../../01-dockerfile-avanzado/ejemplos/app/
  ```

- Levantar las máquinas

  ```bash
  docker compose -f docker-compose.backup.yaml up
  ```

---

- Crear usuarios

  ```bash
  curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name":"Ana García","email":"ana@example.com"}'
  curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name":"Marta López","email":"marta.lopez@correo.org"}'
  curl -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"name":"Luis Pérez","email":"luisperez@email.com"}'
  ```

- Subir Ficheros

  ```bash
  curl -F "file=@Dockerfile" http://localhost:3000/upload
  curl -F "file=@docker-compose.yaml" http://localhost:3000/upload
  ```

---

# Ejemplo 1: Backup Completo

---

- Creación del backup

  ```bash
  docker run --rm -v uploads-data:/data -v $(pwd)/backups:/backups alpine tar czvf /backups/uploads-backup-$(date +%Y%m%d-%H%M%S).tar.gz -C /data .
  ```

- Eliminación

  ```bash
  docker compose down --volumes
  ```

- Restauración del backup

  ```bash
  docker compose -f docker-compose.yaml up

  docker run --rm -v uploads-data:/data -v $(pwd)/backups:/backups alpine sh -c "tar xzvf /backups/uploads-backup-xxxx-xxx.tar -C /data"
  ```

---

# Ejemplo 2: Backup base de datos

---

- Creación del backup

  ```bash
  docker exec -t <nombre_o_id_del_contenedor_db> pg_dump -U user mydb > backups/db-backup-$(date +%Y%m%d-%H%M%S).sql
  ```

- Eliminación

  ```bash
  docker compose down --volumes
  ```

- Restauración del backup

  ```bash
  docker compose -f docker-compose.yaml up

  cat backups/db-backup-20250806-134107.sql | docker exec -i <nombre_contenedor_db> psql -U user mydb
  ```

---
