---
marp: true
theme: default
title: Networking
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Networking
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
    <h1 class="title"> Dockerfile Avanzado </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

# Networking

---

Docker soporta los siguientes tipos de montajes de almacenamiento para guardar datos:

- **Bridge Network**
- **Host Network**
- **IPvlan Network**
- **Macvlan Network**
- **None Network**
- **Overlay Network**

---

## Bridge network

---

### Bridge network

Permite que los contenedores conectados a la misma red se comuniquen, mientras proporciona aislamiento de contenedores que no están conectados a esa red.

---

### Default vs user-defined

- Las `user-defined` proporcionan resolución automática de DNS entre contenedores:

  Los contenedores en la red bridge por defecto solo pueden acceder entre sí por direcciones IP, a menos que uses la opción --link, que se considera obsoleta.

  ```bash
  docker compose -f 04-network/ejemplos/1.isolated/compose.yml up -d
  ```

  ```bash
  $docker exec app-base-1 ping app-base-2
  ping: bad address 'app-base-2'
  ```

---

- Las `user-defined` proporcionan un mejor aislamiento

  ```bash
  docker compose -f 04-network/ejemplos/1.isolated/compose.yml up -d
  docker compose -f 04-network/ejemplos/1.isolated/compose-p2.yml up -d
  ```

  ```bash
  $docker inspect bridge --format='{{range .Containers}}{{.Name}} - {{.IPv4Address}}{{"\n"}}{{end}}'
  app-base-3 - 172.17.0.4/16
  app-base-1 - 172.17.0.3/16
  app-base-2 - 172.17.0.2/16
  app-base-4 - 172.17.0.5/16
  ```

- Las `user-defined` permiten una configuración especifica.

---

### Opciones de configuración Bridge

| Opción                                           | Por defecto      | Descripción                                          |
| ------------------------------------------------ | ---------------- | ---------------------------------------------------- |
| `com.docker.network.bridge.enable_icc`           | `true`           | Habilitar/deshabilitar conectividad inter-contenedor |
| `com.docker.network.bridge.enable_ip_masquerade` | `true`           | Habilitar acceso a internet (NAT)                    |
| `com.docker.network.driver.mtu`                  | `0` (sin límite) | MTU máximo de la red                                 |
| `com.docker.network.bridge.host_binding_ipv4`    | todas las IPs    | IP del host por defecto al publicar puertos          |
| `com.docker.network.bridge.name`                 | -                | Nombre personalizado del bridge                      |

---

<div class="container-column">

<div class="small">

- Red con comunicación inter-contenedor deshabilitada:

  ```bash
  docker network create \
    --opt com.docker.network.bridge.enable_icc=false \
    --opt com.docker.network.bridge.name=red-aislada \
    red-segura
  ```

- Red sin acceso a internet

  ```bash
  docker network create \
    --opt com.docker.network.bridge.enable_ip_masquerade=false \
    red-local
  ```

</div>
<div class=small>

- Verificar acceso a internet pero no entre contenedores

  ```bash
  docker run --network red-segura --name test1 -d alpine sleep 300
  docker run --network red-segura --name test2 -d alpine sleep 300
  docker exec test1 ping test2
  docker exec test1 ping google.com
  ```

- Cambiamos las redes

  ```
  docker network disconnect red-segura test1
  docker network disconnect red-segura test2
  docker network connect red-local test1
  docker network connect red-local test2
  ```

- Verificar acceso entre contenedores pero no a internet

  ```bash
  docker exec test1 ping test2
  docker exec test1 ping google.com
  ```

</div>

---

### IPAM (IP Address Management)

IPAM controla la asignación de direcciones IP en las redes Docker.

<div class=small>

| Opción          | Descripción                    |
| --------------- | ------------------------------ |
| `--subnet`      | Rango de IPs de la red (CIDR)  |
| `--gateway`     | IP del gateway de la red       |
| `--ip-range`    | Subconjunto de IPs asignables  |
| `--aux-address` | IPs reservadas (no asignables) |

</div>

---

<div class=container-column>
<div class=small>

- Creación red

  ```bash
  docker network create \
    --opt com.docker.network.bridge.name=red-ipam \
    --subnet=192.168.100.0/24 \
    --ip-range=192.168.100.128/25 \
    --gateway=192.168.100.1 \
    --aux-address="proxy=192.168.100.20" \
    --aux-address="dns=192.168.100.10" \
    custom-ipam
  ```

- Verificación

  ```bash
  docker run --network custom-ipam alpine ip addr
  ```

- Verificación (Compose)

  ```bash
  docker exec app-base-1 ip addr
  docker exec app-base-2 ip addr
  ```

</div>

<div class=small>

- compose.yaml

  ```yaml
  x-app-base: &app-base
  build:
    context: ./../../../app
    dockerfile: ../04-volumes/ejemplos/Dockerfile
  ports:
    - "3000:3000"
  image: app-base
  container_name: app-base
  environment:
    NODE_ENV: development
    PORT: 3000
  services:
    app-base-1:
      <<: *app-base
      container_name: app-base-1
      hostname: app-base-1

    app-base-2:
      <<: *app-base
      container_name: app-base-2
      hostname: app-base-2
      ports:
        - "3001:3000"

  networks:
    default:
      name: compose-ipam
      ipam:
        driver: default
        config:
          - subnet: 192.168.120.0/24
            ip_range: 192.168.120.128/25
            gateway: 192.168.120.1
            aux_addresses:
              proxy: 192.168.120.20
              dns: 192.168.120.10
      driver_opts:
        com.docker.network.bridge.name: compose-ipam
        com.docker.network.bridge.enable_icc: "true"
  ```

</div>
</div>

---

## Host network

---

### Host network

La red de ese contenedor **no está aislada del host Docker** (el contenedor comparte el namespace de red del host), y el contenedor no obtiene su propia dirección IP asignada.

---

### Ventajas

- **Optimizar el rendimiento**
- **Situaciones donde un contenedor necesita manejar un gran rango de puertos**

---

```bash
$docker run --rm --net=host app-base
$curl -X POST http://localhost:3000/upload   -F "file=@/home/silvelo/Downloads/lenna.png"   -H "Content-Type: multipart/form-data"
```

---

## None network

---

### None network

Si quieres **aislar completamente** un contenedor, puedes usar la red `--network none` al iniciar el contenedor. Dentro del contenedor, **solo se crea el dispositivo loopback**.

```bash
docker run --rm --network none alpine:latest ip link show
```

---

## Overlay network

---

### Overlay network

Una red distribuida entre **múltiples hosts Docker daemon**. Esta red se sitúa encima de (overlays) las redes específicas del host, permitiendo que los contenedores conectados a ella se comuniquen de forma segura cuando el cifrado está habilitado.

Docker **maneja transparentemente el enrutamiento** de cada paquete hacia y desde el host Docker daemon correcto y el contenedor de destino correcto.

```
docker network create -d overlay --attachable my-attachable-overlay
```
