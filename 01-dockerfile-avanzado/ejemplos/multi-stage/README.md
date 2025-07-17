---
marp: true
---

# Ejemplo de Multi-stage build

Este ejemplo muestra cómo crear una imagen Docker optimizada usando la técnica de multi-stage build. Se parte de una aplicación Node.js y se utilizan dos etapas:

1. **Stage de construcción:** Instala dependencias y prepara la app.
2. **Stage final:** Copia solo los archivos necesarios para ejecutar la app, generando una imagen más pequeña y segura.

---

- **Dockerfile.before**: Imagen sin multi-stage, menos optimizada. Instala dependencias y copia todo en una sola etapa, lo que genera una imagen más grande y menos segura.

  - Ejecución:
    ```sh
    docker build -f Dockerfile.before -t app-simple .
    docker run --rm -p 3000:3000 app-simple
    ```

---

- **Dockerfile.after**: Imagen con multi-stage build. El primer stage instala dependencias y prepara la app, el segundo solo copia los artefactos necesarios, generando una imagen más pequeña y segura.
  - Ejecución:
    ```sh
    docker build -f Dockerfile.after -t app-multistage .
    docker run --rm -p 3000:3000 app-multistage
    ```

---

## Recomendación

Construye y ejecuta ambos Dockerfiles para comparar el tamaño, el tiempo de construcción y la seguridad de la imagen. Observa cómo el uso de multi-stage impacta el resultado final.
