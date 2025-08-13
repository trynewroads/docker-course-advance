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

## ¿Qué es Docker Swarm?

Orquestador integrado en Docker que agrupa varias máquinas y mantiene servicios con las réplicas que defines. Simple para alta disponibilidad básica y escalado rápido.

Elementos clave:

- **Nodo:** máquina que participa en el clúster.
- **Servicio:** Contenedor y réplicas.
- **Stack:** conjunto de servicios desplegados y gestionados juntos.

---

### Acciones principales

- **Añadir nodos:** sumar máquinas (workers o managers) para más capacidad o alta disponibilidad.
- **Ver estado:** revisar nodos, servicios y tareas para saber si todo funciona y cómo se reparte.
- **Creación de servicios:** definir imagen, réplicas y cómo se conectan (puertos, redes, secretos).
- **Escalado de servicios:** subir o bajar el número de réplicas.
- **Rebalanceo:** redistribuir réplicas tras caídas o nuevos nodos para aprovechar recursos.
- **Creación de stacks:** desplegar varios servicios relacionados.

---

## Red overlay en Swarm

La red overlay conecta contenedores de servicios que pueden estar en máquinas distintas como si estuvieran en la misma red virtual.

Ventajas:

- Se crea una sola vez y los servicios que se unen se ven por nombre.
- Cada servicio obtiene resolución DNS interna.
- El tráfico viaja cifrado entre nodos (túneles) sin que tengas que configurarlo.
- **Aísla:** una overlay distinta separa entornos.
- **Permite escalar:** nuevas réplicas se añaden y ya pueden ser alcanzadas por el mismo nombre.

---

## Secrets

Un secret es un dato sensible (contraseña, token, clave) que el clúster guarda cifrado y solo entrega a los servicios que lo piden. No va dentro de la imagen ni se escribe en disco de forma visible en las tareas.

Ventajas:

- **Aislamiento:** solo las tareas del servicio que lo declara lo reciben.
- **Cifrado:** viaja y se almacena cifrado en los managers.
- No queda en capas de la imagen ni en variables de entorno globales.
- **Acceso mínimo:** cada servicio solo monta lo que necesita.
