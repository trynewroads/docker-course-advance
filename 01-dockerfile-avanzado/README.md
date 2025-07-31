---
marp: true
theme: default
title: Curso Avanzado Docker
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Curso Avanzado Docker
header: |
  <div class="logo-start">
    <img src="../img/docker-logo-white.png" alt="Logo Docker"  class="logo"/>
  </div>
  <div class="logo-end">
    <img src="../img/logo_white.png" alt="Logo Docker" class="logo" />
  </div>

style: |
  section {
    display:flex;
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
---

  <!-- _paginate: skip -->

  <div class="front">
    <h1 class="title"> Optimización de Imágenes </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

# 1. Optimización de imágenes

Bienvenido al primer módulo del curso avanzado de Docker.

## ¿Qué encontrarás aquí?

- Las diapositivas con la teoría están en la carpeta [`slides/`](./slides/dockerfile-avanzado.md).
- Las ficheros de los ejemplos están en la carpeta [`ejemplos/`](./ejemplos/).
- Los enunciados de los ejercicios están en la carpeta [`ejercicios/`](./ejercicios/).
- Las soluciones propuestas están en la carpeta [`soluciones/`](./soluciones/).

---

## Recomendación

Lee primero las diapositivas para entender los conceptos clave y después resuelve los ejercicios prácticos. Consulta las soluciones solo para comparar o si te atascas.
