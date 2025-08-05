---
marp: true
theme: default
title: Docker Compose Avanzado
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Docker Compose Avanzado
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

## Introducción a Docker Compose avanzado

Docker Compose es una herramienta esencial para definir y gestionar aplicaciones multicontenedor en Docker. Permite describir la arquitectura de una aplicación, sus servicios, redes y volúmenes en un solo archivo YAML, facilitando la orquestación y el despliegue en diferentes entornos.

---

## Anchors en YAML

En archivos YAML, como los usados por Docker Compose, los anchors (`&`) y alias (`*`) permiten reutilizar bloques de configuración, evitando duplicidad y facilitando el mantenimiento.

- **Anchor (`&`)**: Define un bloque reutilizable.
- **Alias (`*`)**: Inserta el bloque definido por el anchor.
- **Merge (`<<`)**: Permite combinar configuraciones.

---

### Ventajas

- Menos repetición de código.
- Cambios centralizados y más fáciles de mantener.
- Configuraciones más limpias y legibles.

---

## Healthcheck

El parámetro `healthcheck` en Docker Compose permite definir una comprobación periódica para saber si un servicio está funcionando correctamente. Esto ayuda a detectar fallos y a gestionar dependencias entre servicios.

---

### Definición

- **En Dockerfile:** En el fichero de Dockerfile
- **En Docker Compose:** En cada servicio de docker compose.

En ambos casos puede configurarse con los siguientes parámetros:

- **test**: Comando que se ejecuta para comprobar la salud.
- **interval**: Frecuencia de la comprobación.
- **timeout**: Tiempo máximo de espera para la comprobación.
- **retries**: Número de intentos antes de marcar el servicio como unhealthy.
- **start_period**: Tiempo de gracia antes de empezar a comprobar.

---

#### depends_on

Es posible emplear `depends_on` junto con la condición `service_healthy` para garantizar que un servicio espere a que otro esté en estado saludable antes de iniciar su ejecución.

> El servicio dependiente será creado y su contenedor iniciado, pero no comenzará su proceso principal hasta que el servicio del que depende alcance el estado saludable (`healthy`).

---

## Entornos y variables

Docker Compose permite gestionar variables de entorno de forma flexible, facilitando la configuración para distintos entornos (desarrollo, producción, testing, etc.).

---

### Formas de definir variables de entorno

- **Directamente en el servicio:**
  ```yaml
  services:
    app:
      environment:
        - DEBUG=true
        - API_URL=https://api.example.com
  ```

---

- **Variables globales (nivel superior):**

  ```yaml
  environment:
    GLOBAL_VAR: valor
  services:
    app:
      image: alpine:3.20
      environment:
        - APP_VAR=valor2
  ```

  Todas las variables definidas en el bloque global `environment` estarán disponibles en todos los servicios. Si una variable se repite en el bloque del servicio, este valor sobrescribe el global.

---

- **Usando archivos `.env` (uno o varios):**
  Puedes crear uno o varios archivos `.env` y referenciarlos con `env_file`:
  ```yaml
  services:
    app:
      env_file:
        - ./app.env
        - ./common.env
  ```
  Ejemplo de archivo `app.env`:
  ```env
  DEBUG=true
  API_URL=https://api.example.com
  ```

---

- **Referenciando variables del sistema:**
  ```yaml
  services:
    app:
      environment:
        - USER=${USER}
        - HOME=${HOME}
  ```

---

- **Combinando env_file y environment:**
  ```yaml
  services:
    app:
      env_file:
        - ./app.env
      environment:
        DEBUG: "false" # Sobrescribe el valor de DEBUG si está en app.env
        EXTRA: "valor"
  ```
  Las variables definidas en `environment` sobrescriben las que vienen de `env_file` si tienen el mismo nombre.

---

## Configuración para múltiples entornos

Docker Compose permite adaptar la configuración según el entorno (desarrollo, producción, testing) usando archivos y variables específicas.

---

- **Ejemplo de archivo base (`docker-compose.yml`):**

  ```yaml
  services:
    app:
      image: my-app:latest
      env_file:
        - .env
  ```

- **Ejemplo de archivo extendido (`docker-compose.dev.yml`):**

  ```yaml
  services:
    app:
      environment:
        DEBUG: "true"
      volumes:
        - ./src:/app/src
  ```

---

- **Lanzar el entorno deseado:**

  ```bash
  docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up
  ```

- **Diferencias típicas entre entornos:**
  - Variables de entorno (DEBUG, API_URL, credenciales)
  - Montaje de volúmenes (hot reload en dev)
  - Puertos expuestos
  - Servicios adicionales (mock, test, monitoring)
