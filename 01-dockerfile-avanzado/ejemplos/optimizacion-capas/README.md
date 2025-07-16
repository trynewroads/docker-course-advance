# Ejemplos de optimización de capas

Esta carpeta contiene varios Dockerfiles y archivos de ejemplo para practicar la optimización de capas en imágenes Docker.

- `Dockerfile.1-mal-optimizado`: Ejemplo con malas prácticas.
- `Dockerfile.2-agrupa-run`: Agrupando RUN.
- `Dockerfile.3-limpieza`: Eliminando archivos temporales y dependencias de build.
- `Dockerfile.4-reordenado`: Capas ordenadas para mejor cache.
- `.dockerignore`: Para evitar copiar archivos innecesarios.

Puedes construir y comparar los resultados usando estos archivos.
