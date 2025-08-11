---
marp: true
theme: default
title: Volumenes y persistencia - Ejercicios
paginate: true
size: 16:9
backgroundColor: #2E2052;
color: #ffffff;
footer: Volumenes y persistencia - Ejercicios
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

# Soluciones: Ejercicios Persistencia de datos.

---

### Preparación del escenario

**Construcción:**

```bash
docker build -f Dockerfile.backend -t backend ../../backend/
docker build -f Dockerfile.frontend -t frontend ../../frontend/
docker compose up -d
```

Acceder [http://localhost:3000/docs](http://localhost:3000/docs) ó [http://localhost](http://localhost), iniciar sesión y crear tareas.

---

### 1.1 Backup de PostgreSQL

- Creación del backup

  ```
  docker exec -t db pg_dump -U postgres app_db > backups/db-backup-$(date +%Y%m%d-%H%M%S).sql
  ```

---

### 1.2 Verifica el backup

- Creación del checksum y comprobación

  ```
  sha256sum backups/db-backup-xxxxx.sql > backups/db-backup-xxxxx.sql.checksum.sha256

  sha256sum -c backups/db-backup-xxxxx.sql.checksum.sha256
  ```

- Modificar el fichero y volver a comprobar:

  ```
  sha256sum -c backups/db-backup-xxxxx.sql.checksum.sha256
  ```

---

### 1.3 Restaura el backup

- Eliminar la base de datos

  ```
  docker compose down --volumes
  ```

- Levantar el escenario y comprobar el estado

  ```
  docker compose up -d
  ```

- Restaurar la base de datos
  ```
  cat backups/db-backup-xxxxx.sql | docker exec -i db psql -U postgres app_db
  ```
