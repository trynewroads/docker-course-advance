---
marp: true
theme: default
title: Docker Compose Avanzado - Ejercicios
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Docker Compose Avanzado - Ejercicios
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
    <h2 class="title"> Ejercicios Prácticos </h2>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

## Ejercicios

Estos ejercicios prácticos te permitirán aplicar las técnicas avanzadas de Dockerfile aprendidas en los ejemplos. Trabajarás con aplicaciones reales:

- **Backend**: API REST desarrollada con **NestJS** (TypeScript)
- **Frontend**: Aplicación web desarrollada con **Angular** (TypeScript)

Cada ejercicio incluye un **Dockerfile base sin optimizar** que deberás mejorar aplicando las técnicas aprendidas.

> **Nota:** Para ejecutar los ejercicios, asegúrate de estar en el directorio `ejercicios/` y seguir las instrucciones de cada sección.

---

# Ejercicio 1: Backend NestJS

### 1.1 Creación healthcheck

Crea un healthcheck en el Dockerfile del backend que compruebe periódicamente la salud de la API.
El healthcheck debe realizar una petición HTTP al endpoint /healthcheck y marcar el contenedor como healthy solo si la respuesta es satisfactoria.

### 1.2 Creación de entornos

Configura el backend para soportar diferentes entornos (desarrollo y producción) utilizando Docker Compose y variables de entorno.
