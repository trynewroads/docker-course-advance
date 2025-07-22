---
marp: true
theme: default
title: Ejemplo - Anchors
paginate: true
footer: Ejemplo - Anchors
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
    <h1 class="title"> Ejemplos - Anchor </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

Este ejemplo muestra cómo reutilizar variables de entorno en Docker Compose usando anchors (`&`), alias (`*`) y merge (`<<`).

## Contenido

- `anchors.yml`: archivo de ejemplo con cuatro servicios que demuestran el uso de anchors en YAML y el orden de ejecución con `depends_on`.

---

## Servicios y orden de ejecución

1. **first**: Define un anchor de lista de variables de entorno.
2. **second**: Reutiliza la lista de variables de entorno definida en `first` (`depends_on: first`).
3. **third**: Define un anchor de diccionario de variables de entorno (`depends_on: second`).
4. **fourth**: Usa el anchor de diccionario y lo extiende con una variable adicional (`depends_on: third`).

El orden de ejecución está garantizado por la directiva `depends_on`.

---

## Ejecución

1. Abre una terminal en esta carpeta:
   ```bash
   cd ejemplos/anchor
   ```
2. Ejecuta los servicios:
   ```bash
   docker compose -f anchors.yml up
   ```
3. Verás en la salida el nombre del servicio y las variables de entorno correspondientes, en el orden definido.
4. Para limpiar los contenedores:
   ```bash
   docker compose -f anchors.yml down
   ```
