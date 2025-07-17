---
marp: true
theme: default
title: Ejemplos - ARG y ENV
paginate: true
footer: "Ejemplos - ARG y ENV"
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
    <h1 class="title"> Ejemplos - ARG y ENV </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

Este ejemplo muestra cómo utilizar argumentos de build (`ARG`) y variables de entorno (`ENV`) en Docker para personalizar el comportamiento de la imagen y el contenedor.

- **Dockerfile**: Define un `ARG` llamado `MENSAJE` y lo pasa a una variable de entorno `MENSAJE_ENV`. El script `app.js` imprime el valor de esa variable.
- **app.js**: Imprime el valor de la variable de entorno `MENSAJE_ENV`.

---

### 1. Build con el valor por defecto

docker build -t arg-env .
docker run --rm arg-env

### 2. Build con un valor personalizado

```sh
docker run --rm arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje personalizado
```

---

### 3. Sobrescribir la variable en ejecución

```sh
docker run --rm -e MENSAJE_ENV="Mensaje en ejecución" arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje en ejecución
```
