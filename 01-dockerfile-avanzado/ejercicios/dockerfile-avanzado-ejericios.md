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

## Ejercicios

Estos ejercicios prácticos te permitirán aplicar las técnicas avanzadas de Dockerfile aprendidas en los ejemplos. Trabajarás con aplicaciones reales:

- **Backend**: API REST desarrollada con **NestJS** (TypeScript)
- **Frontend**: Aplicación web desarrollada con **Angular** (TypeScript)

Cada ejercicio incluye un **Dockerfile base sin optimizar** que deberás mejorar aplicando las técnicas aprendidas.

> **Nota:** Para ejecutar los ejercicios, asegúrate de estar en el directorio `ejercicios/` y seguir las instrucciones de cada sección.

---

# Ejercicio 1: Backend NestJS

---

## Objetivo

Optimizar progresivamente el Dockerfile del backend NestJS aplicando cada una de las técnicas vistas en el temario.

## Aplicación

La aplicación backend está ubicada en `../../backend/` y contiene:

- API REST con NestJS
- Base de datos con TypeORM
- Autenticación JWT
- Documentación Swagger

---

### 1.1 Dockerfile Base

Analiza el `Dockerfile` sin optimizar ubicado en `backend/Dockerfile`.

**Comando para construir:**

```bash
docker build -f backend/Dockerfile -t backend-sin-optimizar ../../backend
```

---

### 1.2 Multi-stage Build

Crea `Dockerfile.multistage` que implemente multi-stage builds:

- **Etapa 1 (build)**: Compila la aplicación TypeScript
- **Etapa 2 (test)**: Ejecuta los tests sobre el código compilado
- **Etapa 3 (production)**: Solo archivos necesarios para ejecutar

**Beneficios esperados:**

- Imagen más pequeña
- Sin dependencias de desarrollo
- Tests ejecutados durante el build
- Separación clara de responsabilidades

---

### 1.3 Optimización de Capas

Crea `Dockerfile.optimizado` mejorando el anterior:

- Agrupa comandos RUN relacionados
- Limpia archivos temporales en la misma capa
- Reordena instrucciones para mejor cache
- Copia `package*.json` antes que el código fuente

**Resultado:** Builds más rápidos y mejor aprovechamiento del cache.

---

### 1.4 Variables ARG y ENV

Crea `Dockerfile.variables` que gestione correctamente las variables:

- Usa **ARG** para `PORT` (configurable en build time)
- Mantén **ENV** solo para configuración no sensible
- **NO hardcodees secretos** como `JWT_SECRET`, `DEFAULT_PASS`, `DB_PASS`

**Variables a gestionar:**

```
PORT, DEBUG_REQUEST, DEFAULT_USER, DEFAULT_PASS,
JWT_SECRET, ENABLE_AUTH, USE_DB, DB_HOST, DB_PORT,
DB_USER, DB_PASS, DB_NAME
```

---

### 1.5 Gestión Segura de Secretos

Crea `Dockerfile.seguro` que elimine todos los secretos hardcodeados:

- Variables sensibles se pasan solo en runtime (`-e`)
- Opción para leer secretos desde archivos montados
- Documenta cómo inyectar secretos de forma segura

**Comandos de ejemplo:**

```bash
# Con variables de entorno
docker run -e JWT_SECRET="secret" -e DB_PASS="pass" imagen

# Con archivos montados
docker run -v ./secrets:/run/secrets imagen
```

---

# Ejercicio 2: Frontend Angular

---

## Objetivo

Crear un Dockerfile optimizado para Angular aplicando multi-stage builds y nginx.

## Aplicación

La aplicación frontend está ubicada en `../../frontend/` y contiene:

- Aplicación Angular con TypeScript
- Angular Material para UI
- Build optimizado para producción

---

### 2.1 Dockerfile Base

Analiza el `Dockerfile` sin optimizar en `frontend/Dockerfile`:

- ¿Por qué es ineficiente tener Node.js y nginx en la misma imagen?
- ¿Qué archivos innecesarios quedan en la imagen final?
- ¿Cuál es el tamaño de la imagen resultante?

**Comando para construir:**

```bash
docker build -f frontend/Dockerfile -t frontend-sin-optimizar ../../frontend
```

---

### 2.2 Multi-stage Optimizado

Crea `Dockerfile.multistage` con dos etapas:

- **Etapa 1 (build)**: Node.js para compilar Angular
- **Etapa 2 (production)**: Solo nginx + archivos estáticos

**Ventajas:**

- Imagen final mucho más pequeña
- Solo nginx en producción (más seguro)
- Eliminación automática de dependencias de desarrollo

---

### 2.3 Configuración Nginx

Mejora `Dockerfile.nginx` añadiendo:

- Configuración personalizada de nginx
- Gzip compression habilitado
- Configuración para Single Page Application (SPA)
- Headers de seguridad

---

### 2.4 Variables de Entorno

Crea `Dockerfile.variables` que permita:

- **ARG** para la URL de la API backend
- Configuración en build time del entorno (dev/prod)
- Variables para personalizar la configuración de nginx

---

### 2.5 Optimización Final

Crea `Dockerfile.final` que combine todas las técnicas:

- Multi-stage optimizado
- Capas bien organizadas
- Variables configurables
- Imagen mínima de producción

**Resultado esperado:** Imagen final < 50MB con nginx optimizado.

---
