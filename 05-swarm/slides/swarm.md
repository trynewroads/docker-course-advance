---
marp: true
theme: default
title: Swarm
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Swarm
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
    <h1 class="title"> Swarm </h1>
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

# Swarm

---

## Swarm

Docker Swarm es la **solución nativa de orquestación** de Docker que permite gestionar un cluster de motores Docker como un **sistema virtual único**.

Elementos:

- **Nodo:** máquina que participa en el clúster.
- **Servicio:** Contenedor y réplicas.
- **Stack:** conjunto de servicios desplegados y gestionados juntos.

---

## Características principales

- **Gestión de cluster integrada** - sin software adicional
- **Escalado automático** - ajusta réplicas según demanda
- **Reconciliación del estado deseado** - auto-reparación
- **Service discovery + Balanceo de carga** - DNS y distribución automática
- **Rolling updates** - despliegues sin downtime con rollback
- **Seguro por defecto** - TLS

---

### Crear un Swarm con DinD

Para este curso usaremos **Docker-in-Docker (DinD)** para simular múltiples nodos en una sola máquina.

<div class=container-column>
<div class=small>

- Crear el nodo manager

  ```bash
  docker run -d --privileged --name manager --network host docker:dind
  ```

- Crear nodos

  ```bash
  docker run -d --privileged --name worker-1 --hostname  worker-1 docker:dind
  docker run -d --privileged --name worker-2 --hostname  worker-1 docker:dind
  ```

- Iniciar swarm

  ```bash
  docker exec manager docker swarm init --advertise-addr <ip|interface>
  ```

</div>
<div class=small>

- Añadir nodos

  ```bash
  docker exec worker-1 docker swarm join <token> <ip>
  docker exec worker-2 docker swarm join <token> <ip>
  ```

- Comprobar swarm

  ```bash
  $docker exec manager docker node ls
  ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
  jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
  gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active                          28.5.0
  pjvz11lrjh0pn5re6mhri83df     worker-2   Ready     Active                          28.5.0

  ```

  </div>
  </div>

---

### Gestionar nodos

<div class=container-column>

<div class=small>

- Añadir nodos

  ```bash
  docker run -d --privileged --name worker-3 --hostname  worker-3 docker:dind
  docker exec worker-3 docker swarm join <token> <ip>
  ```

- Comprobar swarm

  ```bash
  $docker exec manager docker node ls
  ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
  jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
  gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active                          28.5.0
  pjvz11lrjh0pn5re6mhri83df     worker-2   Ready     Active                          28.5.0
  7ujsql2taxx4evm045zg7recc     worker-3   Ready     Active                          28.5.0                       28.5.0
  ```

- Eliminar nodo

  ```bash
  docker exec worker-3 docker swarm leave
  ```

</div>

<div class=small>

- Comprobar swarm

  ```
  docker exec manager docker node ls
  ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
  jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
  gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active                          28.5.0
  pjvz11lrjh0pn5re6mhri83df     worker-2   Ready     Active                          28.5.0
  7ujsql2taxx4evm045zg7recc     worker-3   Down      Active                          28.5.0

  ```

- Eliminar completamente

  ```bash
  docker exec manager docker node rm worker-3
  ```

- Comprobar swarm

  ```bash
  $docker exec manager docker node ls
  ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
  jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
  gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active                          28.5.0
  pjvz11lrjh0pn5re6mhri83df     worker-2   Ready     Active                          28.5.0
  ```

</div>
</div>

---

### Gestionar Servicios

<div class=container-column>

<div class=small>

- Servicio Básico

  ```bash
  docker exec manager docker service create --name app-base app-base
  ```

- Servicio con réplicas

  ```
  docker exec manager docker service create  --name app-base-replica --replicas 3 app-base
  ```

- Servicio con réplicas y puerto

  ```bash
  docker exec manager docker service create --name app-base-port --replicas 2  --publish 8080:80 app-base
  ```

- Comprobar contenedores

  ```bash
  docker exec manager docker service ps web
  ```

</div>

<div class=small>

</div>
</div>

---
