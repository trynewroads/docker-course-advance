---
marp: true
theme: default
title: Ejemplos -  Multi-stage
paginate: true
footer: "Ejemplos -  Multi-stage "
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
    <h1 class="title"> Ejemplos -  Multi-stage </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

Este ejemplo muestra cómo crear una imagen Docker optimizada usando la técnica de multi-stage build. Se parte de una aplicación Node.js y se utilizan dos etapas:

1. **Stage de construcción:** Instala dependencias y prepara la app.
2. **Stage final:** Copia solo los archivos necesarios para ejecutar la app, generando una imagen más pequeña y segura.

---

- **Dockerfile.before**: Imagen sin multi-stage, menos optimizada. Instala dependencias y copia todo en una sola etapa, lo que genera una imagen más grande y menos segura.

  - Ejecución:
    ```sh
    docker build -f Dockerfile.before -t app-simple .
    docker run --rm -p 3000:3000 app-simple
    ```

---

- **Dockerfile.after**: Imagen con multi-stage build. El primer stage instala dependencias y prepara la app, el segundo solo copia los artefactos necesarios, generando una imagen más pequeña y segura.
  - Ejecución:
    ```sh
    docker build -f Dockerfile.after -t app-multistage .
    docker run --rm -p 3000:3000 app-multistage
    ```

---

## Recomendación

Construye y ejecuta ambos Dockerfiles para comparar el tamaño, el tiempo de construcción y la seguridad de la imagen. Observa cómo el uso de multi-stage impacta el resultado final.
