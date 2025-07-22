---
marp: true
theme: default
title: Ejemplos - Variables y Entornos
paginate: true
footer: "Ejemplos - Variables y Entornos"
header: |
  <div class="image-wrapper">
    <img src="../../../img/TNR_01.png" alt="Logo Empresa" width="120" class="logo" />
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
    <h1 class="title"> Variables y Entornos </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

# Ejemplo: Configuración para múltiples entornos con Docker Compose

Este ejemplo muestra cómo estructurar y lanzar una aplicación con Docker Compose usando archivos y variables específicas para desarrollo y producción.

## Archivos principales

- `docker-compose.yml`: Configuración base común.
- `docker-compose.dev.yml`: Extiende la base para desarrollo.
- `docker-compose.prod.yml`: Extiende la base para producción.
- `.env`, `.env.dev`, `.env.prod`: Variables de entorno para cada caso.

---

## Lanzar cada entorno

**Desarrollo:**

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up
```

**Producción:**

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up
```

---

## ¿Qué ocurre?

- Se combinan los archivos y variables según el entorno.
- El servicio `app` muestra por pantalla los valores de las variables seleccionadas.
- En desarrollo se monta el volumen `./src` para hot reload.
- En producción se usa la URL de API de producción y DEBUG desactivado.

Modifica los archivos y prueba los comandos para ver cómo cambian los valores y comportamientos según el entorno.
