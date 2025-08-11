---
marp: true
theme: default
title: Docker Registro Privado Soluciones
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Docker Registro Privado Soluciones
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
    <h1 class="title"> Docker Registro Privado Soluciones</h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

### Requisitos previos

Instalar [harbor](https://goharbor.io/docs/2.0.0/install-config/download-installer/) para las pruebas de registro.

```
wget https://github.com/goharbor/harbor/releases/download/v2.13.2/harbor-online-installer-v2.13.2.tgz
tar xzvf harbor-online-installer-version.tgz
cd harbor
mv harbor.yml.tmpl harbor.yml
./install.sh
```

---

# Ejercicio 1: Backend NestJS

---

### 1.1 Subir imagen

- Crear tags
  ```
  docker tag backend registry.example.local/common/backend
  docker tag backend registry.example.local/public/backend
  ```
- Subir tags
  ```
  docker push registry.example.local/common/backend
  docker push registry.example.local/public/backend
  ```

---

### 1.2 Descargar la imagen

- Eliminar imagen local

  ```
  docker image rm registry.example.local/common/backend
  docker image rm registry.example.local/public/backend
  ```

- Descargar la imagen

  ```
  docker pull registry.example.local/common/backend
  docker pull registry.example.local/public/backend
  ```
