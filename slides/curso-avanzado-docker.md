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
    font-family: Inter;
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
  <h1 class="title"> Curso Avanzado Docker </h1>
  <hr class="line"/>
  <p class="author">Arturo Silvelo</p>
  <p class="company">Try New Roads</p>
</div>

---

## 1. Dockerfile avanzado y optimización de imágenes

- **Multi-stage builds**: Crear imágenes ligeras con etapas separadas.
- **Optimización de capas**: Minimizar capas y aprovechar cache.
- **ARG y ENV**: Uso de variables para configuración.
- **Gestión de secretos**: Evitar exponer datos sensibles.

---

## 2. Docker Compose avanzado

- **Anchors y extends**: Reutilizar configuraciones YAML comunes.
- **Healthcheck**: Comprobación y dependencias de servicios.
- **Entornos**: Gestión de variables de entorno y configuraciones para múltiples entornos.

---

## 3. Volúmenes y persistencia avanzada

- **Backup con contenedores**: Crear y restaurar backups con tar.
- **Backups consistentes**: Estrategias para bases de datos.

---

## 4. Docker Registry privado

- **Desplegar registry privado**: Montaje y configuración básica.
- **Gestionar imágenes**: Subir, eliminar y mantener el registry.

---

## 5. Orquestación con Docker Swarm

- **Clúster local**: Crear entorno de pruebas.
- **Despliegue**: Gestionar stacks y rollback.
- **Escalado**: Ajustar réplicas.
- **Red overlay**: Comunicación entre nodos.
- **Secrets**: Gestionar datos sensibles.

---

## 6. Monitorización y debugging (opcional)

- **Drivers logging**: Centralizar logs con distintos drivers.
- **Herramientas monitorización**: Uso de `docker stats`, Prometheus.
- **Debugging contenedores**: Técnicas para análisis en tiempo real.
