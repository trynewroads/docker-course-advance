---
marp: true
theme: default
title: Ejemplos - Secretos
paginate: true
footer: "Ejemplos - Secretos "
---

<!-- _paginate: skip -->

<div style="text-align:center;">
  <img src="../../../img/TNR_01.png" alt="Logo Empresa" width="180" style="margin-bottom: 30px;" />
  <h1 style="font-size:2.5em; margin-bottom: 0.2em;"> Ejemplos -  Secretos </h1>
  <hr style="width:60%; margin: 1em auto; border:1px solid #ccc;" />
  <p style="font-size:1.3em; margin-top: 1.5em;">Arturo Silvelo</p>
</div>

---

## 1. Dockerfile con secreto en claro (mala práctica)

- `Dockerfile.1-mala-practica`
- El secreto queda guardado en la imagen y es visible para cualquiera.

---

## 2. Variable de entorno solo en ejecución

- `Dockerfile.2-env-ejecucion`
- Ejecuta con:
  ```sh
  docker run -e DB_PASSWORD=supersecreto imagen-segura
  ```
- El secreto no está en la imagen, solo se pasa al contenedor.

---

## 3. Montar archivo externo

- `Dockerfile.3-archivo-externo`
- Ejecuta con:
  ```sh
  docker run -v $(pwd)/db_password.txt:/run/secreto.txt imagen-segura
  ```
- El secreto está en un archivo externo, no en la imagen.
