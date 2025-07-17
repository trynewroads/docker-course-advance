---
marp: true
---

# Ejemplo de ARG y ENV en Docker

Este ejemplo muestra cómo utilizar argumentos de build (`ARG`) y variables de entorno (`ENV`) en Docker para personalizar el comportamiento de la imagen y el contenedor.

- **Dockerfile**: Define un `ARG` llamado `MENSAJE` y lo pasa a una variable de entorno `MENSAJE_ENV`. El script `app.js` imprime el valor de esa variable.
- **app.js**: Imprime el valor de la variable de entorno `MENSAJE_ENV`.

---

### 1. Build con el valor por defecto

```sh
docker build -t arg-env .
docker run --rm arg-env
# Salida esperada:
# MENSAJE_ENV: Hola desde ARG
```

---

### 2. Build con un valor personalizado

```sh
docker build --build-arg MENSAJE="Mensaje personalizado" -t arg-env-custom .
docker run --rm arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje personalizado
```

---

### 3. Sobrescribir la variable en ejecución

```sh
docker run --rm -e MENSAJE_ENV="Mensaje en ejecución" arg-env-custom
# Salida esperada:
# MENSAJE_ENV: Mensaje en ejecución
```
