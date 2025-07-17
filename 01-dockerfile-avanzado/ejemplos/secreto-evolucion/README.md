---
marp: true
theme: default
title: Ejemplos - Secretos
paginate: true
footer: "Ejemplos - Secretos"
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
    <h1 class="title"> Ejemplos -  Secretos </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

## 1. Dockerfile con secreto en claro (mala práctica)

- `Dockerfile.1-mala-practica`
- El secreto queda guardado en la imagen y es visible para cualquiera.

---

## 2. Variable de entorno solo en ejecución

- `Dockerfile.2-env-ejecucion`
- Ejecuta con:
  ```sh
  docker run -e DB_PASSWORD=supersecreto imagen-segura
  ```
- El secreto no está en la imagen, solo se pasa al contenedor.

---

## 3. Montar archivo externo

- `Dockerfile.3-archivo-externo`
- Ejecuta con:
  ```sh
  docker run -v $(pwd)/db_password.txt:/run/secreto.txt imagen-segura
  ```
- El secreto está en un archivo externo, no en la imagen.
