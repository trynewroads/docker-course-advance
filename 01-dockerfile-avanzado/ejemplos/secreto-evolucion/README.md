---
marp: true
---

# Ejemplos de gestión de secretos en Docker

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
