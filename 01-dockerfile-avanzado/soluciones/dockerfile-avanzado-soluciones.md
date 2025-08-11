---
marp: true
theme: default
title: Dockerfile Avanzado - Ejercicios
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Dockerfile Avanzado - Ejercicios
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

# Soluciones: Ejercicios Dockerfile Avanzado

---

## 0. Base

**Construcción:**

```bash
docker build -f ../ejercicios/backend/Dockerfile -t backend-base ../../backend/
```

**Ejecución:**

```bash
docker run --rm --init -p3000:3000 backend-base
```

**Comprobación:**

```
curl localhost:3000/api/healthcheck
# Respuesta
{"status":"ok"}
```

---

## 1. Multi-stage (multi-stage)

**Construcción:**

```bash
docker build -f Dockerfile.multistage -t backend-multistage ../../backend/
```

**Ejecución:**

```bash
docker run -p 3000:3000 backend-multistage
```

---

## 2. Optimización de capas (optimizacion-capas)

**Construcción:**

```bash
docker build -f Dockerfile.optimizado -t backend-optimizado ../../backend/
```

**Ejecución:**

```bash
docker run -p 3000:3000 backend-optimizado
```

---

## 3. ARGS y ENV

**Construcción:**

```bash
docker build -f Dockerfile.variables -t backend-variables ../../backend/
```

---

## 4. Secretos

**Construcción:**

```bash
docker build -f Dockerfile.seguro -t backend-seguro ../../backend/
```

---

## 5. Bonus

**Construcción:**

```bash
docker build -f Dockerfile.bonus -t backend-bonus ../../backend/
```

---

## Comprobaciones

**Servidor:**

```
curl localhost:3000/api/healthcheck
# Respuesta
{"status":"ok"}
```

**Imágenes:**

```
docker image ls | grep backend
```

---

**Historial:**

```
docker history <id>
```

**Variables:**

```
docker exec -it <id> env
```
