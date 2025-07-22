---
marp: true
theme: default
title: Docker Compose avanzado
paginate: true
footer: "Docker Compose avanzado"
header: |
  <div class="image-wrapper">
    <img src="../../img/TNR_02.png" alt="Logo Empresa" width="120" class="logo" />
  </div>

style: |
  section {
    display:flex;
  }

  section > header {
    width: 95%;
  }

  .front {
    display: flex;
    flex-direction: column;
  }
  .image-wrapper{
    text-align: end;
    width: 100%;
  }
  .logo{
  }
  .title{
    font-size:2.5em;
    margin-bottom: 0.2em;
  }
  .line{
    width:100%;
  }
  .author{
    font-size:1.3em;
    margin-top: .5em;
    margin-bottom: 0;
  }
  .company{
    font-size:.9em;
    margin-top: .1em;
  }
---

  <!-- _paginate: skip -->

  <div class="front">
    <h1 class="title"> Docker Compose avanzado </h1>
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

### Ejemplo 1: Lista de variables reutilizable

```yaml
services:
  first:
    image: my-image:latest
    environment: &env
      - CONFIG_KEY
      - EXAMPLE_KEY
      - DEMO_VAR
  second:
    image: another-image:latest
    environment: *env
```

En este ejemplo, ambos servicios comparten la misma lista de variables de entorno definida con el anchor `&env`.

---

### Ejemplo 2: Diccionario de variables reutilizable y extendido

```yaml
services:
  first:
    image: my-image:latest
    environment: &env
      FOO: BAR
      ZOT: QUIX
  second:
    image: another-image:latest
    environment:
      <<: *env
      YET_ANOTHER: VARIABLE
```

Aquí, el servicio `second` hereda todas las variables de entorno de `first` y añade una variable adicional (`YET_ANOTHER`).

---

### Ventajas

- Menos repetición de código.
- Cambios centralizados y más fáciles de mantener.
- Configuraciones más limpias y legibles.

---

## Healthcheck

El parámetro `healthcheck` en Docker Compose permite definir una comprobación periódica para saber si un servicio está funcionando correctamente. Esto ayuda a detectar fallos y a gestionar dependencias entre servicios.

---

### Formas de definir healthcheck

- **En Dockerfile:**

```dockerfile
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget --spider -q http://localhost || exit 1
```

---

- **En Docker Compose:**

```yaml
services:
  web:
    image: nginx:alpine
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
```

---

### Personalizar los Healthcheck

- **test**: Comando que se ejecuta para comprobar la salud.
- **interval**: Frecuencia de la comprobación.
- **timeout**: Tiempo máximo de espera para la comprobación.
- **retries**: Número de intentos antes de marcar el servicio como unhealthy.
- **start_period**: Tiempo de gracia antes de empezar a comprobar.

---

### Dependencias entre servicios usando healthcheck y depends_on

Puedes usar `depends_on` junto con la condición `service_healthy` para que un servicio espere a que otro esté sano antes de arrancar:

```yaml
services:
  db:
    image: postgres:alpine
    healthcheck:
      test: ["CMD", "pg_isready", "-U", "postgres"]
      interval: 5s
      retries: 5
  app:
    image: alpine:3.20
    command: ["sh", "-c", "echo APP RUNNING"]
    depends_on:
      db:
        condition: service_healthy
```

Esto asegura que `app` solo se inicie cuando la base de datos esté lista y saludable.

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
