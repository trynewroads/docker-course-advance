---
marp: true
theme: default
title: Monitorización y Debugging
paginate: true
footer: "Monitorización y Debugging"
header: |
  <div class="image-wrapper">
    <img src="../../img/TNR_01.png" alt="Logo Empresa" width="120" class="logo" />
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
  <h1 class="title"> Monitorización y Debugging </h1>
  <hr class="line"/>
  <p class="author">Arturo Silvelo</p>
  <p class="company">Try New Roads</p>
</div>

---

## 1. Introducción a la monitorización y logging en Docker

- La monitorización y la gestión de logs son esenciales para mantener la salud y el rendimiento de los contenedores y servicios.
- Docker ofrece herramientas integradas y permite la integración con soluciones externas para centralizar métricas y logs.

---

## 2. Logs en Docker

- Cada contenedor tiene su propio stream de logs accesible con:
  ```bash
  docker logs <container>
  ```
- Los logs por defecto usan el driver `json-file`, pero Docker soporta otros drivers: `syslog`, `journald`, `fluentd`, `gelf`, `awslogs`, `splunk`, etc.
- Ejemplo de cambio de driver:
  ```bash
  docker run --log-driver=syslog nginx
  ```
- Es recomendable centralizar los logs para entornos de producción.

---

## 3. Centralización de logs

- Arquitecturas típicas:
  - **ELK Stack (Elasticsearch, Logstash, Kibana):** Para almacenar, procesar y visualizar logs.
  - **Grafana Loki:** Solución ligera y escalable para logs, integrada con Grafana.
  - **Graylog:** Plataforma de gestión de logs que soporta GELF.
  - **Fluentd/Fluent Bit:** Para recolectar y reenviar logs a múltiples destinos.
- Ejemplo de configuración GELF para Graylog:
  ```bash
  docker run --log-driver=gelf --log-opt gelf-address=udp://graylog:12201 nginx
  ```

---

## 4. Monitorización de contenedores

- Comando básico:
  ```bash
  docker stats
  ```
  Muestra uso de CPU, memoria, red y disco en tiempo real.
- Herramientas avanzadas:
  - **cAdvisor:** Exporta métricas de contenedores para Prometheus.
  - **Prometheus:** Recolector de métricas, ideal para monitorizar clústeres.
  - **Grafana:** Visualización de métricas y dashboards personalizables.
- Ejemplo de stack Prometheus + Grafana + cAdvisor en Docker Compose:
  ```yaml
  services:
    prometheus:
      image: prom/prometheus
      ports: [9090:9090]
    grafana:
      image: grafana/grafana
      ports: [3000:3000]
    cadvisor:
      image: gcr.io/cadvisor/cadvisor
      ports: [8080:8080]
      volumes:
        - /var/run/docker.sock:/var/run/docker.sock
        - /:/rootfs:ro
        - /var/lib/docker/:/var/lib/docker:ro
  ```

---

## 5. Debugging y troubleshooting

- Comandos útiles:
  - `docker logs <container>`: Ver logs de un contenedor.
  - `docker exec -it <container> sh`: Acceso interactivo al contenedor.
  - `docker inspect <container>`: Información detallada de configuración y estado.
  - `docker events`: Ver eventos en tiempo real del demonio Docker.
- Buenas prácticas:
  - Configurar alertas sobre métricas críticas.
  - Automatizar la rotación y limpieza de logs.
  - Documentar procedimientos de troubleshooting.

---

title: Monitorización y Debugging
paginate: true
footer: "Monitorización y Debugging"
header: |

  <div class="image-wrapper">
    <img src="../../img/TNR_01.png" alt="Logo Empresa" width="120" class="logo" />
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
  <h1 class="title"> Monitorización y Debugging </h1>
  <hr class="line"/>
  <p class="author">Arturo Silvelo</p>
  <p class="company">Try New Roads</p>
</div>

---
