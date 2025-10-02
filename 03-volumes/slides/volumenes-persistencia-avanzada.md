---
marp: true
theme: default
title: Volumenes y persistencia
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Volumenes y persistencia
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


  .container-column  {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
  }

  .small {
    font-size: 16px;
  }

  figure{
    display: block;    
  }

  figcaption{
    padding: 2px;
    text-align: center;
    font-size: 18px;
    font-bold: bold;
  }

  figure img {
    width: 100%;
    object-fit: contain;
  }


  table, td, th, tr{
    background: transparent!important;
  }

  th {
   font-size: 26px;
  }

  td {
    font-size: 20px;
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

## Volumes

Los **volúmenes** son almacenes de datos persistentes para contenedores, creados y gestionados por Docker. Puedes crear un volumen explícitamente con el comando: `docker volume create`, o Docker puede crearlo durante la creación de un contenedor o servicio.

---

## Gestión de volumes

Cuando se crea un **volumen** se almacena en un directorio del **host Docker**. Cuando se monta un volumen en un contenedor, ese directorio es lo que se monta dentro del contenedor.

Esto es similar a como funcionan los **bind mounts**, excepto que los volúmenes son gestionados por Docker y están aislados de la funcionalidad principal del sistema host.

**Ubicación de almacenamiento:**

- **Linux**: `/var/lib/docker/volumes/<volume-name>/_data`
- **Windows (Docker Desktop)**: `\\wsl$\docker-desktop-data\data\docker\volumes\<volume-name>\_data`

---

<div class=container-column>

<div class=small>

- Opción 1

```yaml
services:
  app-base:
    build:
      context: ./../../../app
      dockerfile: ../02-compose/ejemplos/Dockerfile
    ports:
      - "3001:3000"
    image: app-base
    container_name: app-base
    environment:
      NODE_ENV: development
      PORT: 3000
    volumes:
      - app-uploads-compose:/app/uploads

volumes:
  app-uploads-compose:
    driver: local
    name: app-uploads-compose
```

```bash
docker compose -f 03-volumes/ejemplos/1.volume/compose.yml up -d --build
```

- Opción 2

```bash
docker volume create app-uploads
docker run -p3000:3000 --name app-base -v app-uploads:/app/uploads app-base
```

</div>

<div class=small>

- Verificación

```
docker volume ls
ls /var/lib/docker/volumes/
```

```bash
curl -X POST http://localhost:3001/upload \
     -F "file=@./03-volumes/ejemplos/lenna.png" \
     -H "Content-Type: multipart/form-data"
```

- Resultado

```bash
docker exec app-base-compose ls /app/uploads
docker exec app-base ls /app/uploads
```

```bash
ls /var/lib/docker/volumes/app-uploads/_data
ls /var/lib/docker/volumes/app-uploads-compose/_data
```

- Limpiar

```bash
docker rm -f app-base app-base-compose
docker volume rm app-uploads-compose app-uploads
```

```

```

</div>

</div>

---

## Ciclo de vida de volumes

- Un volume dado puede ser montado en **múltiples contenedores simultáneamente**
- Cuando ningún contenedor está usando un volume, el volume sigue **disponible para Docker**
- Puedes eliminar volumes no utilizados usando: `docker volume prune`

---

## Cuando usar volumes

- Se pueden gestionar usando comandos CLI de Docker o la API
- Funcionan tanto en contenedores Linux como Windows
- Se pueden compartir más seguramente entre múltiples contenedores
- Cuando tu aplicación requiere I/O de alto rendimiento
- Fáciles de migrar y hacer backup
- Se necesita tener contenido previo en el contenedor.

---

## Named y Anonymous volumes

Un volumen puede ser **nombrado** o **anónimo**. Los volúmenes anónimos reciben un nombre aleatorio que está garantizado de ser único dentro de un host Docker dado.

Al igual que los volúmenes nombrados, **los volúmenes anónimos persisten** incluso si eliminas el contenedor que los usa, **excepto** si usas el flag `--rm` al crear el contenedor, en cuyo caso el volumen anónimo asociado con el contenedor es destruido.

---

## Características de Anonymous volumes

Si creas múltiples contenedores consecutivamente que cada uno usa volúmenes anónimos, **cada contenedor crea su propio volumen**.

Los volúmenes anónimos **no son reutilizados o compartidos** entre contenedores automáticamente.

---

<div class=container-column>
<div class=small>

- compose.yml

  ```yaml
  x-app-base: &app-base
    build:
      context: ./../../../app
      dockerfile: ../03-volumes/ejemplos/Dockerfile.anonymous
    ports:
      - "3000:3000"
    image: app-base
    container_name: app-base
    environment:
      NODE_ENV: development
      PORT: 3000

  services:
    app-base-1:
      <<: *app-base
    app-base-2:
      <<: *app-base
      container_name: app-base-2
      ports:
        - "3002:3000"
    app-base-3:
      <<: *app-base
      container_name: app-base-3
      ports:
        - "3003:3000"
  ```

- Dockerfile

  ```yaml
  VOLUME /app/uploads
  VOLUME /app/logs
  ```

</div>
<div class=small>

- Ejecución

  ```bash
  docker compose -f 03-volumes/ejemplos/2.anonymous/compose.yml up -d --build
  ```

- Verificación

  ```bash
  docker volume ls
  DRIVER    VOLUME NAME
  local     4c6d0a83e7cc576945aa7eca1a931af58a6568b7a9e4145d3148742d57d16390
  local     4c9f5b83ced73c1a8974be98b9b217be1aa4ae31cc2601c8e5834ee898fe9b0d
  local     603d9377cd6a6e74cdb0d77b927c03b9775f3e01e0beff86449bd477f1de8e51
  local     a4a41d61068c9e18ac0ef0e4a20fbefb32ef158085b5f55ac933cab69a76e151
  local     b24b0bd309a53b5d6c9dd03270390e51b650524818146cd121dbc921f2732578
  local     e5c6355e0cfd95a064cf05be083960b067e95a7b894390bff1ccaa064baba6ce
  ```

- Limpiar

  ```bash
  docker compose -f 03-volumes/ejemplos/2.anonymous/compose.yml down -v
  # ó
  docker compose -f 03-volumes/ejemplos/2.anonymous/compose.yml down
  docker volume prune
  ```

  ```bash
  docker volume ls
  DRIVER    VOLUME NAME
  ```

</div>
</div>

---

## Montaje de volumes: --mount vs --volume

Para montar un volumen con el comando `docker run`, puedes usar los flags `--mount` o `--volume`.

En general, **`--mount` es preferido**. La principal diferencia es que el flag `--mount` es más explícita y soporta todas las opciones disponibles.

**Debes usar `--mount` si quieres:**

- Especificar opciones del driver de volumen
- Montar un subdirectorio de un volumen
- Montar un volumen en un servicio de Swarm

---

```bash
docker run -d  --mount  source=app-uploads-mount,target=/app/logs,ro --name app-base-mount app-base
docker run -d -v app-uploads-volume:/app/logs:ro --name app-base-volume app-base
```

```bash
docker volume ls
DRIVER    VOLUME NAME
local     86d082cdbabb590be11db783dde3be9f039d38ba10c1df587a725323a68eeca5
local     983d94bf98ca23ec46acfccbc00543edc9e6ec5df71eac6d86021daa9f1f1149
local     app-uploads-mount
local     app-uploads-volume
```

```bash
docker rm -f --volumes app-base-mount app-base-volume
docker volume rm app-uploads-volume app-uploads-mount
```

---

### Montar un subdirectorio

<div class=container-column>
<div class=small>

- Creación y configuración del volumen

  ```bash
  docker volume create logs
  docker run --rm \
    --mount src=logs,dst=/logs \
    alpine mkdir -p /logs/app1 /logs/app2
  ```

- Crear contenedores

  ```bash
  docker run -d  --mount  source=logs,target=/app/logs,volume-subpath=app1  --name app-base-1 app-base
  docker run -d  --mount  source=logs,target=/app/logs,volume-subpath=app2  --name app-base-2 app-base
  ```

- Verificar

  ```bash
  docker volume ls
  DRIVER    VOLUME NAME
  local     2ddcf36b0b174340a774fdc991d3c52c4d20d8d37ed8ded7f0038214990501ed
  local     c4e4afc0cc8c8be3832893e24d5872483178fd8003a1942638517537b15a796c
  local     logs
  ```

</div>
<div class=small>

- Verificar

  ```bash
  docker run --rm   --mount src=logs,dst=/logs   alpine cat /logs/app1/app.log
  docker run --rm   --mount src=logs,dst=/logs   alpine cat /logs/app2/app.log
  ```

- Limpiar

  ```bash
  docker rm -f --volumes app-base-1 app-base-2
  docker volume rm logs
  ```

</div>
</div>

---

<div class=container-column>
<div class=small>

- compose.yaml

```yaml
x-app-base: &app-base
  build:
    context: ./../../../app
    dockerfile: ../03-volumes/ejemplos/Dockerfile.anonymous
  ports:
    - "3000:3000"
  image: app-base
  container_name: app-base
  environment:
    NODE_ENV: development
    PORT: 3000
  depends_on:
    - init-logs
x-alpine: &alpine
  image: alpine
  volumes:
    - app-logs:/logs
  command: |
    sh -c "
      if [ ! -d '/logs/app1' ]; then
        mkdir -p /logs/app1 /logs/app2
        echo 'Directorios creados'
      else
        echo 'Directorios ya existen'
      fi
    "
  restart: "no"

services:
  app-base-1:
    <<: *app-base
    container_name: app-base-1
    volumes:
      - type: volume
        source: app-logs
        target: /app/logs
        volume:
          subpath: app1
  app-base-2:
    <<: *app-base
    container_name: app-base-2
    ports:
      - "3001:3000"
    volumes:
      - type: volume
        source: app-logs
        target: /app/logs
        volume:
          subpath: app2
  init-logs:
    <<: *alpine
  test:
    <<: *alpine
    command: |
      sh -c "
        ls -l /logs/app1
        cat /logs/app1/app.log
        ls -l /logs/app2
        cat /logs/app2/app.log
      "
    depends_on:
      - app-base-1
      - app-base-2
volumes:
  app-logs:
    driver: local
    name: app-logs
```

</div>

<div class=small>

- Ejecución

```bash
docker compose -f 03-volumes/ejemplos/3.mount/compose.yml up -d --build
```

- Validación

```bash
docker compose -f 03-volumes/ejemplos/3.mount/compose.yml logs test
```

- Limpiar

```bash
docker compose -f 03-volumes/ejemplos/3.mount/compose.yml down -v
docker volume rm app-logs
```

</div>
</div>

---

## Compartir datos entre máquinas

Al construir aplicaciones tolerantes a fallos, puedes necesitar configurar múltiples réplicas del mismo servicio para que tengan acceso a los mismos archivos.

- Añadir lógica a tu aplicación para almacenar archivos en un sistema de almacenamiento de objetos en la nube como **Amazon S3**.

- Crear volúmenes con un **driver** que soporte escribir archivos a un sistema de almacenamiento externo como **NFS** o **Amazon S3**.

---
