---
marp: true
theme: default
title: Curso Avanzado Docker
paginate: true
footer: "Curso Avanzado Docker"
header: |
  <div class="image-wrapper">
    <img src="../img/TNR_01.png" alt="Logo Empresa" width="120" class="logo" />
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
  .logo{}
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
