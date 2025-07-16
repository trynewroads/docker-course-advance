# Temario Curso Avanzado Docker

_Todos los ejercicios están diseñados para ejecutarse en un solo ordenador._

## 1. Dockerfile avanzado y optimización de imágenes

- **Multi-stage builds**: Crear imágenes ligeras con etapas separadas.
- **Optimización de capas**: Minimizar capas y aprovechar cache.
- **ARG y ENV**: Uso de variables para configuración.
- **Gestión de secretos**: Evitar exponer datos sensibles.

## 2. Docker Compose avanzado

- **Anchors y extends**: Reutilizar configuraciones YAML comunes.
- **Healthcheck**: Comprobación y dependencias de servicios.
- **Entornos**: Gestión de variables de entorno y configuraciones para múltiples entornos.

## 3. Volúmenes y persistencia avanzada

- **Backup con contenedores**: Crear y restaurar backups con tar.
- **Backups consistentes**: Estrategias para bases de datos.

## 4. Docker Registry privado

- **Desplegar registry privado**: Montaje y configuración básica.
- **Gestionar imágenes**: Subir, eliminar y mantener el registry.

## 5. Orquestación con Docker Swarm

- **Clúster local**: Crear entorno de pruebas.
- **Despliegue**: Gestionar stacks y rollback.
- **Escalado**: Ajustar réplicas.
- **Red overlay**: Comunicación entre nodos.
- **Secrets**: Gestionar datos sensibles.

## 6. Monitorización y debugging (opcional)

- **Drivers logging**: Centralizar logs con distintos drivers.
- **Herramientas monitorización**: Uso de `docker stats`, Prometheus.
- **Debugging contenedores**: Técnicas para análisis en tiempo real.
