---
marp: true
theme: default
title: Logs and Metrics
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Logs and Metrics
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


  .container-column  {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: .5rem;
  }

  .small {
    font-size: 16px;
  }

  figure{
    display: block;    
  }

  figcaption{
    padding: 2px;
    text-align: center;
    font-size: 18px;
    font-bold: bold;
  }

  figure img {
    width: 100%;
    object-fit: contain;
  }


  table, td, th, tr{
    background: transparent!important;
  }

  th {
   font-size: 26px;
  }

  td {
    font-size: 20px;
  }
---

  <!-- _paginate: skip -->

  <div class="front">
    <h1 class="title"> Logs and Metrics </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

# Logs

---

## Logs

El comando `docker logs` permite visualizar la salida generada por los procesos que se ejecutan dentro de un contenedor. Por defecto, muestra todo lo que la aplicación escribe en los flujos estándar de salida y error (STDOUT y STDERR), tal como lo veríamos si ejecutáramos el proceso en una terminal. Sin embargo, la utilidad de este comando depende de cómo la aplicación gestione sus propios logs. Si la aplicación escribe sus registros en archivos internos o si se utiliza un driver de logs externo, es posible que `docker logs` no muestre información relevante.

---

### Logging drivers

Docker ofrece varios mecanismos para gestionar y recolectar los logs de los contenedores y servicios, conocidos como `logging drivers` o controladores de logs. Estos controladores permiten enviar los registros a distintos destinos.

---

- **json-file**: Es el driver por defecto. Guarda los logs en archivos JSON en el host.
- **syslog**: Envía los logs al sistema syslog del host o a un servidor remoto.
- **fluentd**: Permite enviar los logs a un agregador Fluentd.
- **awslogs**: Envía los logs a Amazon CloudWatch Logs.
- **gelf**: Envía los logs a sistemas compatibles con Graylog Extended Log Format.
- **none**: Desactiva el registro de logs para el contenedor.

---

### Configuración

Puedes configurar el comportamiento de los logs de manera global para todos los contenedores editando el archivo `/etc/docker/daemon.json`.

```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3",
    "labels": "production_status",
    "env": "os,customer"
  }
}
```

---

- Ejecución (Sin logs)

  ```bash
  docker run -it --rm --init --log-driver none --name app ghcr.io/trynewroads/docker-course-advance
  ```

- Verificación

  ```bash
  $docker logs app
  Error response from daemon: configured logging driver does not support reading
  ```

- Ejecución (Json-file)

  ```bash
  docker run -it --rm --init --log-opt labels=environment --log-opt env=os --label environment=production -e os=ubuntu --name app ghcr.io/trynewroads/docker-course-advance
  ```

- Verificación

  ```bash
  sudo cat /var/lib/docker/containers/<container_id>/<container_id>-json.log | jq
  ```

---

## GELF

---

### GELF

El driver **GELF** (Graylog Extended Log Format) permite enviar los logs de los contenedores Docker a sistemas de gestión de logs compatibles con Graylog, como Graylog, Logstash o Fluentd. GELF es útil para centralizar, analizar y visualizar logs de múltiples contenedores en una sola plataforma.

- Permite enviar logs en formato estructurado (JSON) a través de UDP o TCP.
- Facilita la integración con herramientas de monitoreo y análisis.
- Soporta la inclusión de metadatos como etiquetas y variables de entorno.

---

| Opción           | Requerido | Descripción                                     | Ejemplo                                           |
| ---------------- | --------- | ----------------------------------------------- | ------------------------------------------------- |
| **gelf-address** | Sí        | Dirección del servidor GELF (UDP/TCP y puerto). | `--log-opt gelf-address=udp://192.168.0.42:12201` |
| **env**          | No        | Lista de variables de entorno a incluir.        | `--log-opt env=os,customer`                       |
| **labels**       | No        | Lista de labels a incluir como campos extra.    | `--log-opt labels=production_status,geo`          |

---

<div class=container-column>
<div class=small>

- compose.yaml

```yaml
name: log
# For DataNode setup, graylog starts with a preflight UI, this is a change from just using OpenSearch/Elasticsearch.
# Please take a look at the README at the top of this repo or the regular docs for more info.

services:
  # MongoDB: https://hub.docker.com/_/mongo/
  mongodb:
    image: "mongo:7.0"
    restart: "on-failure"
    networks:
      - log
    volumes:
      - "mongodb_data:/data/db"
      - "mongodb_config:/data/configdb"

  # For DataNode setup, graylog starts with a preflight UI, this is a change from just using OpenSearch/Elasticsearch.
  # Please take a look at the README at the top of this repo or the regular docs for more info.
  # Graylog Data Node: https://hub.docker.com/r/graylog/graylog-datanode

  # ⚠️ Make sure this is set on the host before starting:
  # echo "vm.max_map_count=262144" | sudo tee -a /etc/sysctl.conf
  # sudo sysctl -p
  datanode:
    image: "${DATANODE_IMAGE:-graylog/graylog-datanode:6.3}"
    hostname: "datanode"
    environment:
      GRAYLOG_DATANODE_NODE_ID_FILE: "/var/lib/graylog-datanode/node-id"
      # GRAYLOG_DATANODE_PASSWORD_SECRET and GRAYLOG_PASSWORD_SECRET MUST be the same value
      GRAYLOG_DATANODE_PASSWORD_SECRET: "${GRAYLOG_PASSWORD_SECRET:?Please configure GRAYLOG_PASSWORD_SECRET in the .env file}"
      GRAYLOG_DATANODE_MONGODB_URI: "mongodb://mongodb:27017/graylog"
    ulimits:
      memlock:
        hard: -1
        soft: -1
      nofile:
        soft: 65536
        hard: 65536
    ports:
      - "8999:8999/tcp" # DataNode API
      - "9200:9200/tcp"
      - "9300:9300/tcp"
    networks:
      - log
    volumes:
      - "graylog-datanode:/var/lib/graylog-datanode"
    restart: "on-failure"

  # Graylog: https://hub.docker.com/r/graylog/graylog-enterprise
  graylog:
    hostname: "server"
    image: "${GRAYLOG_IMAGE:-graylog/graylog:6.3}"
    depends_on:
      mongodb:
        condition: "service_started"
      datanode:
        condition: "service_started"
    entrypoint: "/usr/bin/tini --  /docker-entrypoint.sh"
    environment:
      GRAYLOG_NODE_ID_FILE: "/usr/share/graylog/data/data/node-id"
      # GRAYLOG_DATANODE_PASSWORD_SECRET and GRAYLOG_PASSWORD_SECRET MUST be the same value
      GRAYLOG_PASSWORD_SECRET: "${GRAYLOG_PASSWORD_SECRET:?Please configure GRAYLOG_PASSWORD_SECRET in the .env file}"
      GRAYLOG_ROOT_PASSWORD_SHA2: "${GRAYLOG_ROOT_PASSWORD_SHA2:?Please configure GRAYLOG_ROOT_PASSWORD_SHA2 in the .env file}"
      GRAYLOG_HTTP_BIND_ADDRESS: "0.0.0.0:9000"
      GRAYLOG_HTTP_EXTERNAL_URI: "http://localhost:9000/"
      GRAYLOG_MONGODB_URI: "mongodb://mongodb:27017/graylog"
    ports:
      - "5044:5044/tcp" # Beats
      - "5140:5140/udp" # Syslog
      - "5140:5140/tcp" # Syslog
      - "5555:5555/tcp" # RAW TCP
      - "5555:5555/udp" # RAW UDP
      - "9000:9000/tcp" # Server API
      - "12201:12201/tcp" # GELF TCP
      - "12201:12201/udp" # GELF UDP
      #- "10000:10000/tcp" # Custom TCP port
      #- "10000:10000/udp" # Custom UDP port
      - "13301:13301/tcp" # Forwarder data
      - "13302:13302/tcp" # Forwarder config
    networks:
      - log
    volumes:
      - "graylog_data:/usr/share/graylog/data/data"
    restart: "on-failure"

networks:
  log:
    driver: "bridge"
    name: log-network

volumes:
  mongodb_data:
  mongodb_config:
  graylog-datanode:
  graylog_data:
```

</div>

<div class=small>

- Ejecución

  ```bash
  docker compose up -d
  ```

- Verificación

  ```bash
  docker logs log-graylog-1
  Initial configuration is accessible at 0.0.0.0:9000, with username 'admin' and password 'QadtbPdtsu'.
  Try clicking on http://admin:QadtbPdtsu@0.0.0.0:9000
  ```

- Generar CA

    <figure>
    <img src="./../../img/graylog_create_ca.png" alt="Create CA">
    <figure>

- Iniciar Sesión: admin/admin1234

</div>
</div>

---

<div class=container-column>
<div class=small>

- Configurar System -> Input: GELF UDP: recibir y procesar logs provenientes de diferentes fuentes externas

<figure>
  <img src="./../../img/create_input.png" alt="Create Input">
<figure>

</div>
<div class=small>

- Configurar Stream: Se utiliza para clasificar, filtrar y enrutar los mensajes de log que llegan al sistema.

<figure>
  <img src="./../../img/create_stream.png" alt="Create Stream">
<figure>

</div>
</div>

---

<div class=container-column>
<div class=small>

- compose.yaml

  ```yaml
  name: app

  x-gelf: &gelf
  driver: gelf
  options:
    gelf-address: "udp://192.168.1.41:12201"

  services:
  backend:
    image: ghcr.io/trynewroads/docker-course-advance:latest
    logging:
    <<: *gelf
    environment:
    USE_DB: "true"
    DB_HOST: postgres
    DB_PORT: 5432
    DB_USER: postgres
    DB_PASS: password
    DB_NAME: postgres
    ports:
      - "3100:3000"
    depends_on:
    postgres:
      condition: service_healthy

  postgres:
    image: postgres:15

    logging:
    <<: *gelf
    environment:
    POSTGRES_PASSWORD: password
    healthcheck:
    test: ["CMD", "pg_isready", "-U", "postgres"]
    interval: 20s
    timeout: 10s
    retries: 3

  networks:
  default:
    name: app-network
  ```

</div>
<div class=small>

- Ejecución

  ```bash
  docker compose -f 06-log-metric/ejemplos/3.compose/compose.yaml up -d
  ```

- Verificación: En Graylog podemos ver los mensajes.

- Extraer solo el mensaje:

  ```
  ^\[[^\]]+\]\[[^\]]+\]\[[^\]]+\]:\s*(.*)$
  ```

  <figure>
    <img src="./../../img/clean_message.png" alt="Clean Message">
  <figure>

- Comprobar

  ```bash
  curl http://localhost:3000
  ```

</div>
</div>

---

# Metrics

---

## Metrics

El comando `docker stats` permite monitorear en tiempo real el uso de recursos de los contenedores.

Para un monitoreo real y centralizado de métricas en entornos productivos, es recomendable integrar soluciones especializadas como **Prometheus**, **Grafana** o herramientas de observabilidad que permitan recolectar, almacenar y visualizar métricas históricas, establecer alertas y analizar tendencias de uso de recursos en toda la infraestructura Docker.

---

### Prometheus

Es una herramienta de monitoreo y almacenamiento de series temporales ampliamente utilizada para recolectar métricas de sistemas y aplicaciones, incluyendo contenedores Docker.

- Permite recolectar métricas de uso de CPU, memoria, red, disco y más, de forma automática y continua.
- Se integra fácilmente con Docker a través de **exporters** como [cAdvisor](https://github.com/google/cadvisor), que expone métricas de todos los contenedores en el host.
- Las métricas recolectadas pueden visualizarse y analizarse en tiempo real usando **Grafana**.

---

<div class=container-column>
<div class=small>
- compose.yaml

```yaml
name: metric

services:
  prometheus:
    container_name: prometheus
    image: prom/prometheus
    volumes:
      - "./prometheus.yml:/etc/prometheus/prometheus.yml"
    ports:
      - "9090:9090"
    networks:
      - metric

  cadvisor:
    image: gcr.io/cadvisor/cadvisor:latest
    container_name: cadvisor
    ports:
      - "8080:8080"
    volumes:
      - /:/rootfs:ro
      - /var/run:/var/run:ro
      - /sys:/sys:ro
      - /var/lib/docker/:/var/lib/docker:ro
    networks:
      - metric

networks:
  metric:
    driver: "bridge"
    name: metric-network
```

</div>
<div class=small>

- Ejecución

  ```bash
  docker compose -f 06-log-metric/ejemplos/4.metrics/compose.yaml up -d
  ```

- Verificación: Acceder [http://localhost:9090/targets](http://localhost:9090/targets)

- Query: podremos realizar las consultas

  ```
  container_memory_usage_bytes{name=~"app-backend-1|app-postgres-1"}
  ```

    <figure>
    <img src="./../../img/prometheus_query.png" alt="Prometheus Query">
  <figure>

</div>
</div>
