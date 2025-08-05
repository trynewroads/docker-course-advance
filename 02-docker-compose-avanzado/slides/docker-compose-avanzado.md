---
marp: true
theme: default
title: Docker Compose Avanzado
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Docker Compose Avanzado
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
    <hr class="line"/>
    <p class="author">Arturo Silvelo</p>
    <p class="company">Try New Roads</p>
  </div>

---

## Introducción a Docker Compose avanzado

Docker Compose es una herramienta esencial para definir y gestionar aplicaciones multicontenedor en Docker. Permite describir la arquitectura de una aplicación, sus servicios, redes y volúmenes en un solo archivo YAML, facilitando la orquestación y el despliegue en diferentes entornos.

---

## Anchors en YAML

En archivos YAML, como los usados por Docker Compose, los anchors (`&`) y alias (`*`) permiten reutilizar bloques de configuración, evitando duplicidad y facilitando el mantenimiento.

- **Anchor (`&`)**: Define un bloque reutilizable.
- **Alias (`*`)**: Inserta el bloque definido por el anchor.
- **Merge (`<<`)**: Permite combinar configuraciones.

---

### Ventajas

- Menos repetición de código.
- Cambios centralizados y más fáciles de mantener.
- Configuraciones más limpias y legibles.

---

## Healthcheck

El parámetro `healthcheck` en Docker Compose permite definir una comprobación periódica para saber si un servicio está funcionando correctamente. Esto ayuda a detectar fallos y a gestionar dependencias entre servicios.

---

El parámetro `healthcheck` puede definirse tanto en el `Dockerfile` como en cada servicio dentro de Docker Compose.  
En ambos casos, se dispone de varias opciones de configuración:

- **test**: Comando que se ejecuta para comprobar la salud.
- **interval**: Frecuencia de la comprobación.
- **timeout**: Tiempo máximo de espera para la comprobación.
- **retries**: Número de intentos antes de marcar el servicio como unhealthy.
- **start_period**: Tiempo de gracia antes de empezar a comprobar.

---

#### depends_on

Es posible emplear `depends_on` junto con la condición `service_healthy` para garantizar que un servicio espere a que otro esté en estado saludable antes de iniciar su ejecución.

> El servicio dependiente será creado y su contenedor iniciado, pero no comenzará su proceso principal hasta que el servicio del que depende alcance el estado saludable (`healthy`).

---

## Gestión de entornos

En el desarrollo de aplicaciones, un entorno define el contexto en el que se ejecuta la aplicación: desarrollo, pruebas, integración o producción. Cada entorno puede requerir configuraciones, variables y servicios diferentes.

---

Docker y Docker Compose permiten gestionar estos entornos de varias formas:

- **Variables de entorno:** Permiten parametrizar el comportamiento de los servicios según el entorno. Se pueden definir directamente en el archivo Compose, en archivos .env o pasarlas desde el sistema.

- **Archivos Compose específicos:** Puedes crear archivos docker-compose adicionales (por ejemplo, docker-compose.dev.yaml, docker-compose.prod.yaml) para sobreescribir o extender la configuración base según el entorno.

---

- **Múltiples Dockerfile:** Es posible mantener diferentes Dockerfile (por ejemplo, Dockerfile.dev, Dockerfile.prod) adaptados a las necesidades de cada entorno, seleccionando el adecuado en la sección build del Compose.

Estas estrategias permiten adaptar fácilmente la infraestructura y el despliegue de la aplicación a cada fase del ciclo de vida.
