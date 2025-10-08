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

## Gestión Swarm

---

### Estructura Swarm

Un swarm se compone de nodos manager y nodos worker. Los managers son responsables de gestionar el estado del cluster, tomar decisiones de orquestación y proporcionar las APIs del swarm - siempre debe haber al menos uno y se recomienda un número impar para garantizar el consenso. Los workers ejecutan las tareas (contenedores) que les asignan los managers.

---

## Añadir al swarm

Cuando creas un swarm, inicias con un solo Docker Engine en modo Swarm. Para aprovechar todas las ventajas de Swarm, puedes añadir más nodos:

- **Añadir nodos worker** aumenta la capacidad del cluster. Los servicios se distribuyen entre todos los nodos disponibles, sean workers o managers, permitiendo escalar el swarm sin afectar el consenso de los managers.
- **Añadir nodos manager** incrementa la tolerancia a fallos. Los managers gestionan la orquestación y el estado del cluster. Entre ellos, uno actúa como líder. Si el líder falla, los managers restantes eligen un nuevo líder y el cluster sigue funcionando.

---

### Swarm con DinD

<div class=container-column>
<div class=small>

- Crear red para el clúster

  ```
  docker network create swarm-network
  ```

- Crear el nodo manager

  ```bash
  docker run -d \
  --name manager \
  --hostname manager \
  --privileged \
  --network swarm-network \
  -p 3000:3000 \
  -p 2377:2377 \
  -p 7946:7946 \
  -p 7946:7946/udp \
  -p 4789:4789/udp \
  docker:dind \
  dockerd --host=tcp://0.0.0.0:2375 --host=unix:///var/run/docker.sock

  ```

- Crear nodos

  ```bash
  docker run -d \
  --name worker-1 \
  --hostname worker-1 \
  --privileged \
  --network swarm-network \
  docker:dind
  ```

</div>

<div class=small>

- Iniciar swarm

  ```bash
  docker exec manager docker swarm init
  ```

- compose.yaml

  ```yaml
  name: swarm-cluster

  services:
    manager:
      image: docker:dind
      container_name: manager
      hostname: manager
      privileged: true
      networks:
        - swarm-network
      ports:
        - "3000:3000"
        - "2377:2377"
        - "7946:7946"
        - "7946:7946/udp"
        - "4789:4789/udp"
      command: dockerd --host=tcp://0.0.0.0:2375 --host=unix:///var/run/docker.sock

    worker-1:
      image: docker:dind
      container_name: worker-1
      hostname: worker-1
      privileged: true
      networks:
        - swarm-network

    worker-2:
      image: docker:dind
      container_name: worker-2
      hostname: worker-2
      privileged: true
      networks:
        - swarm-network

  networks:
    swarm-network:
      driver: bridge
  ```

</div>
</div>

---

## Añadir nodos `worker`

Para obtener el comando de unión, incluyendo el token para nodos worker

```bash
manager: docker swarm join-token worker
```

El comando `swarm join` une los nodos al swarm y realiza las siguientes acciones:

- Extiende la red overlay
- Solicita un certificado TLS

```bash
worker-1: docker swarm join ....
worker-2: docker swarm join ....
```

---

## Añadir nodos `manager`

Para obtener el comando de unión, incluyendo el token para nodos manager:

```bash
manager: docker swarm join-token manager
```

```bash
manager-2: docker swarm join ....
```

---

### Gestionar nodos

Para ver todos los nodos que forman parte del swarm, ejecuta el siguiente comando **desde un nodo manager**:

```bash
manager: docker node ls
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
o5zoqjxhgyfn14qk2w1mpy1xu *   manager    Ready     Active         Leader           28.5.0
ml6v08wcxlcqvagmjg69pj27m     worker-1   Ready     Active                          28.5.0
y9haoji1t9316n6g9m03au2im     worker-2   Ready     Active                          28.5.0

```

---

- **AVAILABILITY**: Indica si el planificador puede asignar tareas al nodo:

  - **Active:** El nodo puede recibir tareas nuevas.
  - **Pause:** No recibe tareas nuevas, pero las existentes siguen ejecutándose.
  - **Drain:** No recibe tareas nuevas y las existentes se reubican en otros nodos.

---

- **MANAGER STATUS**: Muestra la participación del nodo en el consenso Raft:
  - _(Vacío):_ Nodo worker, no participa en la gestión del swarm.
  - **Leader:** Nodo manager principal, toma decisiones de orquestación.
  - **Reachable:** Manager participante en el quorum Raft, elegible como nuevo líder si el actual falla.
  - **Unavailable:** Manager que no puede comunicarse con otros managers; es recomendable añadir o promover otro manager.

---

### Cambiar Estado

Cambiar el parámetro availability de un nodo en Docker Swarm sirve para controlar si ese nodo puede recibir nuevas tareas o no.

```bash
manager: docker node update --availability pause|drain|active worker-1
manager: docker node ls
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Pause                           28.5.0
l5lddhqxecbkhq1ue578z9c6x     worker-2   Ready     Active                          28.5.0

```

---

### Promover o degradar un nodo

Puedes **promover** un nodo worker a manager, lo cual es útil si un manager queda fuera de servicio o si necesitas más managers para mantener el quorum.

```bash
manager: docker node promote worker-1 worker-2
manager: docker node ls
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active         Reachable        28.5.0
l5lddhqxecbkhq1ue578z9c6x     worker-2   Ready     Active         Reachable        28.5.0
```

---

De igual forma, puedes **degradar** (demote) un manager a worker, por ejemplo, para realizar tareas de mantenimiento o reducir el número de managers.

```bash
manager: docker node demote worker-1 worker-2
manager: docker node ls
ID                            HOSTNAME   STATUS    AVAILABILITY   MANAGER STATUS   ENGINE VERSION
jijwfjp1atvi3ho32puxax1pe *   silvelo    Ready     Active         Leader           28.5.0
gi7u04ihrvr95dn6ei1144vyh     worker-1   Ready     Active                          28.5.0
l5lddhqxecbkhq1ue578z9c6x     worker-2   Ready     Active                          28.5.0
```

---

### Eliminar nodo

En ocasiones es necesario eliminar un nodo del swarm, por ejemplo, cuando un nodo deja de estar disponible, se va a dar de baja definitivamente o simplemente quieres reorganizar el cluster.

- Nodo abandone el swarm

  ```bash
  worker-2: docker swarm leave
  ```

- Eliminar nodo del swarm

  ```bash
  manager: docker node rm worker-2
  ```

> Para nodos manager primero hay que degradar el nodo

---

## Servicios

---

### Crear

Para desplegar una aplicación en el cluster Swarm, se utiliza el concepto de **servicio**. Un servicio define la imagen del contenedor, el número de réplicas y otras opciones de despliegue.

```bash
manager: docker service create --name single ghcr.io/trynewroads/docker-course-advance:latest
```
---

### Listar servicios y contenedores

Para gestionar y supervisar el estado de las aplicaciones desplegadas en un clúster Swarm, es fundamental listar los servicios activos:

```bash
manager: docker service ls
ID             NAME      MODE         REPLICAS   IMAGE                                              PORTS
prronr507803   single    replicated   2/2        ghcr.io/trynewroads/docker-course-advance:latest   *:3000->3000/tcp
```

y los contenedores (tareas) que los componen. 

```bash
manager: docker service ps single
ID             NAME      MODE         REPLICAS   IMAGE                                              PORTS
prronr507803   single    replicated   1/1        ghcr.io/trynewroads/docker-course-advance:latest   *:3000->3000/tcp
```

---

### Actualizar

Puedes modificar casi cualquier aspecto de un servicio existente usando el comando `docker service update`. Al actualizar un servicio, Docker detiene sus contenedores y los reinicia con la nueva configuración.

```bash
manager: docker service update --publish-add 3000:3000 --constraint-add 'node.role==worker' single
```

Para eliminar la configuración:

```bash
manager: docker service update --publish-rm 3000 --constraint-rm 'node.role==worker' single
```

---

### Escalar

Puedes aumentar o disminuir el número de réplicas de un servicio en Swarm de forma sencilla usando el comando `docker service scale`.

```bash
docker service scale single=5
```

Esto ajusta el servicio `single` para que tenga 5 réplicas activas distribuidas entre los nodos del cluster.

---

### Conexiones y balanceo en Docker Swarm

Docker Swarm gestiona automáticamente el enrutamiento y balanceo de las conexiones hacia los servicios desplegados en el clúster. Cuando un servicio está publicado en un puerto, cualquier petición enviada a ese puerto en cualquier nodo del clúster será redirigida de forma transparente a una de las réplicas disponibles del servicio.

En el caso de nuestra aplicación, si accedemos [http://localhost:3000/](http://localhost:3000/), el servidor responde con un JSON que incluye la propiedad `hostname`, la cual corresponde al identificador del contenedor que ha gestionado la petición. 


---

### Redes en Docker Swarm

En Docker Swarm, la gestión de redes es fundamental para la comunicación y el aislamiento de los servicios desplegados en el clúster.

- **Redes overlay:**  
  Swarm introduce el concepto de redes overlay, que permiten la comunicación entre contenedores distribuidos en diferentes nodos del clúster. Estas redes se crean a nivel de Swarm y conectan servicios de forma segura y transparente, independientemente del nodo en el que se encuentren.

---

- **Red ingress:**  
  Así como Docker clásico utiliza la red bridge para conectar contenedores en un solo host, Swarm utiliza la red ingress como su análogo.

- **Aislamiento de servicios:**  
  Al igual que en Docker tradicional se pueden aislar contenedores usando diferentes redes bridge, en Swarm es posible aislar servicios utilizando distintas redes overlay. 


---

- Crear una red overlay

  ```
  manager: docker network create --driver overlay my-overlay
  ```

- Añadir red al servicio

  ```
  manage: docker service update --network-add my-overlay single
  ```

- Comprobar la red

  ```bash
  manager: docker network inspect my-overlay
  worker-1: docker network inspect my-overlay
  ```

---

### Volume

En Docker Swarm, los volúmenes se gestionan a nivel de clúster y permiten almacenar datos persistentes para los servicios.

Puedes configurar un volumen en Docker Swarm usando la opción `--mount` al crear un servicio, o bien con `--mount-add` y `--mount-rm` para añadir o eliminar volúmenes en servicios ya existentes.

Los volúmenes pueden crearse antes de desplegar un servicio, o bien, si no existen en un host cuando una tarea es programada allí, Docker los crea automáticamente según la especificación del volumen en el servicio.

---

- Añadir el volume
  
  ```bash
  manager: docker service update --mount-add type=volume,source=app-uploads,target=/app/uploads single
  ```

- Verificar la creación del volume

  ```bash
  manager: docker volume ls
  worker-1: docker volume ls
  worker-2: docker volume ls
  ```

- Subir un archivo

  ```
  curl -X POST http://localhost:3000/upload  -F "file=@<file-path>"   -H "Content-Type: multipart/form-data"
  ```

- Verificar cada contenedor: El contenido del volumen es diferente en cada contenedor porque, por defecto, los volúmenes se crean de manera local en cada nodo donde se ejecuta una tarea del servicio.

---

### Eliminar

Para eliminar un servicio en Docker Swarm y detener todas sus tareas y contenedores asociados.

```bash
docker service rm single
```

Esto elimina el servicio `single` y libera los recursos en todos los nodos del cluster.

---

### Stack

Un stack es una colección de servicios que se despliegan y gestionan juntos como una sola unidad. Se define mediante un archivo YAML que describe todos los componentes y configuraciones de tu aplicación, incluyendo servicios, redes y volúmenes.

Cuando despliegas un stack, Docker Swarm crea todos los servicios definidos en ese archivo y los agrupa bajo un mismo nombre de stack, facilitando la gestión y el despliegue de aplicaciones complejas con múltiples servicios relacionados

---

#### Deploy


El bloque `deploy` en un servicio de Docker Swarm permite definir políticas y restricciones de despliegue avanzadas. Los elementos principales son:

- **replicas:** Número de instancias (réplicas) del servicio que se desean ejecutar.

- **placement:** Restricciones para decidir en qué nodos se ejecuta el servicio (por ejemplo, solo en managers o solo en workers).

---

- **resources:**   Límites y reservas de recursos (CPU y memoria) para cada contenedor del servicio.

- **restart_policy:** Política de reinicio automático de los contenedores en caso de fallo.

- **rollback_config:** Permite definir cómo se comporta el servicio durante un rollback (reversión) tras un fallo en una actualización.

- **update_config:** Permite definir cómo se realiza la actualización de un servicio en Swarm. 


---

### Secretos
