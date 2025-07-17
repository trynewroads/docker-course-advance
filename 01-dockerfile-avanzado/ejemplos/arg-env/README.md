---
marp: true
theme: default
title: Ejemplos - ARG y ENV
paginate: true
footer: "Ejemplos - ARG y ENV"
---

<!-- _paginate: skip -->

<div style="text-align:center;">
  <img src="../../../img/TNR_01.png" alt="Logo Empresa" width="180" style="margin-bottom: 30px;" />
  <h1 style="font-size:2.5em; margin-bottom: 0.2em;"> Ejemplos - ARG y ENV</h1>
  <hr style="width:60%; margin: 1em auto; border:1px solid #ccc;" />
  <p style="font-size:1.3em; margin-top: 1.5em;">Arturo Silvelo</p>
</div>

---

Este ejemplo muestra cómo utilizar argumentos de build (`ARG`) y variables de entorno (`ENV`) en Docker para personalizar el comportamiento de la imagen y el contenedor.

- **Dockerfile**: Define un `ARG` llamado `MENSAJE` y lo pasa a una variable de entorno `MENSAJE_ENV`. El script `app.js` imprime el valor de esa variable.
- **app.js**: Imprime el valor de la variable de entorno `MENSAJE_ENV`.

---

### 1. Build con el valor por defecto

docker build -t arg-env .
docker run --rm arg-env

# Salida esperada:

````

### 2. Build con un valor personalizado

```sh
# ---
# marp: true
# theme: default
# title: Ejemplo de ARG y ENV en Docker
# ---
docker run --rm arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje personalizado
````

---

### 3. Sobrescribir la variable en ejecución

```sh
docker run --rm -e MENSAJE_ENV="Mensaje en ejecución" arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje en ejecución
```
