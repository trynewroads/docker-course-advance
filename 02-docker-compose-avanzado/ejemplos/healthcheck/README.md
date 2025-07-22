---
marp: true
theme: default
title: Ejemplo de Healthcheck en Docker
paginate: true
footer: "Healthcheck en Docker"
header: |
  <div class="image-wrapper">
    <img src="../../../img/TNR_02.png" alt="Logo Empresa" width="120" class="logo" />
  </div>

style: |
  section {
    display:flex;
  }
  section > header {
    width: 95%;
  }
  .image-wrapper{
    text-align: end;
    width: 100%;
  }
  .logo{}
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

# Ejemplo de Healthcheck en Docker

Esta carpeta contiene dos ejemplos prácticos de healthcheck: uno usando Dockerfile y otro usando Docker Compose.

---

## 1. Healthcheck en Dockerfile

- Se define el healthcheck directamente en la imagen personalizada.
- Basado en `nginx:alpine`.

```dockerfile
FROM nginx:alpine
HEALTHCHECK --interval=10s --timeout=3s --retries=3 \
  CMD wget --spider -q http://localhost || exit 1
```

---

### Ejecución (Dockerfile)

1. Construir la imagen:
   ```bash
   docker build -t nginx-healthcheck .
   ```
2. Ejecutar el contenedor:
   ```bash
   docker run --rm nginx-healthcheck
   ```
3. Ver el estado de salud:
   - En otra terminal, busca el container ID:
     ```bash
     docker ps
     ```
   - Luego inspecciona el estado:
     ```bash
     docker inspect --format='{{json .State.Health}}' <container_id>
     ```

---

## 2. Healthcheck en Docker Compose

- Se define el healthcheck en el propio servicio del Compose.

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

### Ejecución (Compose)

1. Levanta el servicio:
   ```bash
   docker compose up
   ```
2. Ver el estado de salud:
   - Busca el container ID:
     ```bash
     docker ps
     ```
   - Inspecciona el estado:
     ```bash
     docker inspect --format='{{json .State.Health}}' <container_id>
     ```

---

## 3. Ejemplo de dependencia con healthcheck

Este ejemplo muestra cómo usar `depends_on` con la condición `service_healthy` para que un servicio espere a que otro esté sano antes de arrancar.

```yaml
version: "3.8"
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

---

### Ejecución (Dependencia con healthcheck)

1. Levanta los servicios:
   ```bash
   docker compose -f docker-compose-healthcheck.yml up
   ```
2. Observa que `app` solo se inicia cuando la base de datos está lista y saludable.
3. Verifica el estado de salud:
   - Busca el container ID:
     ```bash
     docker ps
     ```
   - Inspecciona el estado:
     ```bash
     docker inspect --format='{{json .State.Health}}' <container_id>
     ```
