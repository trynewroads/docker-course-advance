---
marp: true
theme: default
title: Orquestación con Docker Swarm
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Orquestación con Docker Swarm
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
    <h1 class="title"> Orquestación con Docker Swarm </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

- Crear red para los nodos

  ```
  docker network create --driver bridge swarm-net
  ```

- Crear manager

  ```
  docker run -d --privileged --name swarm-manager \
  --hostname swarm-manager \
  --network swarm-net \
  -p 2377:2377 \
  -p 7946:7946 \
  -p 4789:4789 \
  docker:dind
  ```

- Iniciar el swarm

  ```
  docker exec -it swarm-manager docker swarm init --advertise-addr eth0
  ```

---

- Obtener token

  ```
  docker exec swarm-manager docker swarm join-token worker -q
  ```

- Crear nodos

  ```
  docker run -d --privileged --name swarm-worker1 \
    --hostname swarm-worker1 \
    --network swarm-net \
    docker:dind
  ```

  ```
  docker run -d --privileged --name swarm-worker2 \
    --hostname swarm-worker2 \
    --network swarm-net \
    docker:dind
  ```

---

- Añadir nodos al swarm
  ```
  docker exec swarm-worker1 docker swarm join --token $TOKEN swarm-manager:2377
  docker exec swarm-worker2 docker swarm join --token $TOKEN swarm-manager:2377
  ```
- Mostrar nodos

  ```
  docker exec swarm-manager docker node ls
  ```

---

- Limpiar swarm

  ```
  docker stop swarm-manager swarm-worker1 swarm-worker2
  docker rm swarm-manager swarm-worker1 swarm-worker2
  docker network rm swarm-net
  ```

---

- Crear un servicio nginx

  ```
  docker exec swarm-manager docker service create --name web --replicas 3 -p 8080:80 nginx
  ```

  ```
  docker exec swarm-manager docker node update --availability pause swarm-worker1
  ```

  ```
  docker exec swarm-manager docker node update --availability drain swarm-worker1
  ```

  ```
  docker exec swarm-manager docker node update --availability active swarm-worker1
  ```

  ```
  docker stop swarm-worker1
  ```
