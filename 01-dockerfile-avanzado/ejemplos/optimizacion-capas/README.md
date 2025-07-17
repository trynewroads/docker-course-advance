---
marp: true
theme: default
title: Ejemplos - Optimización de capas
paginate: true
footer: "Ejemplos - Optimización de capas "
---

<!-- _paginate: skip -->

<div style="text-align:center;">
  <img src="../../../img/TNR_01.png" alt="Logo Empresa" width="180" style="margin-bottom: 30px;" />
  <h1 style="font-size:2.5em; margin-bottom: 0.2em;"> Ejemplos -  Optimización de capas </h1>
  <hr style="width:60%; margin: 1em auto; border:1px solid #ccc;" />
  <p style="font-size:1.3em; margin-top: 1.5em;">Arturo Silvelo</p>
</div>

---

Este ejemplo muestra cómo optimizar el uso de capas en un Dockerfile para aprovechar la cache y reducir el tiempo de construcción.

- Agrupa instrucciones que no cambian frecuentemente (por ejemplo, instalación de dependencias).
- Usa `.dockerignore` para evitar copiar archivos innecesarios.

---

## Dockerfiles incluidos y explicación

- **Dockerfile.1-mal-optimizado**: Todas las instrucciones están separadas y no se aprovecha la cache. La imagen es más grande y lenta de construir.

  - Ejecución:
    ```sh
    docker build -f Dockerfile.1-mal-optimizado -t capas-mal .
    docker run --rm capas-mal
    ```

---

- **Dockerfile.2-agrupa-run**: Se agrupan instrucciones `RUN` para reducir el número de capas y mejorar la cache.

  - Ejecución:
    ```sh
    docker build -f Dockerfile.2-agrupa-run -t capas-agrupadas .
    docker run --rm capas-agrupadas
    ```

---

- **Dockerfile.3-limpieza**: Se eliminan archivos temporales y dependencias de build al final del proceso para reducir el tamaño de la imagen.

  - Ejecución:
    ```sh
    docker build -f Dockerfile.3-limpieza -t capas-limpias .
    docker run --rm capas-limpias
    ```

---

- **Dockerfile.4-reordenado**: Las capas se ordenan para maximizar el uso de la cache, poniendo primero las instrucciones que menos cambian (por ejemplo, dependencias).

  - Ejecución:
    ```sh
    docker build -f Dockerfile.4-reordenado -t capas-reordenadas .
    docker run --rm capas-reordenadas
    ```

- **.dockerignore**: Evita copiar archivos innecesarios al contexto de construcción, lo que reduce el tamaño y mejora la cache.

---

## Recomendación

Construye y ejecuta cada imagen para comparar el tamaño, el tiempo de construcción y el uso de la cache. Observa cómo los cambios en el Dockerfile afectan el resultado final.
