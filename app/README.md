# Aplicación Demo - Curso Docker Avanzado

Esta es una aplicación Node.js con Express utilizada para demostrar técnicas avanzadas de Docker como multi-stage builds, optimización de capas, gestión de secretos y seguridad.

## 📁 Estructura del Proyecto

```
app/
├── src/                    # Código fuente principal
│   ├── app.js             # Aplicación Express principal
│   ├── config/            # Configuración (logger, multer)
│   ├── db/                # Gestión de base de datos PostgreSQL
│   ├── routes/            # Rutas de la API
│   └── utils/             # Utilidades (gestión de directorios, secretos)
├── tests/                 # Tests automatizados
├── app.js                 # Punto de entrada (actualmente vacío)
├── package.json          # Dependencias y scripts
└── .dockerignore         # Archivos excluidos en build Docker
```

## 🚀 Funcionalidades

### API Endpoints
- **`GET /`** - Página de inicio con saludo
- **`GET /healthcheck`** - Health check de la aplicación
- **`GET /secret`** - Endpoint que muestra secretos de configuración
- **`GET /db-health`** - Verificación de conexión a base de datos
- **`/users`** - CRUD de usuarios con PostgreSQL
- **`/upload`** - Subida de archivos con Multer

### Características Técnicas
- ✅ **Framework**: Express.js
- ✅ **Base de datos**: PostgreSQL con pool de conexiones
- ✅ **Logging**: Winston para logs estructurados
- ✅ **Upload de archivos**: Multer para gestión de archivos
- ✅ **Gestión de secretos**: Lectura desde variables de entorno y archivos
- ✅ **Testing**: Jest con Supertest para tests de integración
- ✅ **Auto-setup**: Creación automática de directorios y tablas

## 🛠️ Tecnologías

### Dependencias de Producción
- **express**: Framework web
- **multer**: Middleware para upload de archivos
- **pg**: Cliente PostgreSQL
- **winston**: Sistema de logging

### Dependencias de Desarrollo
- **jest**: Framework de testing
- **supertest**: Testing de APIs HTTP
- **nodemon**: Auto-reload en desarrollo
- **eslint**: Linter de código
- **prettier**: Formateador de código
- **dotenv**: Gestión de variables de entorno

## 🔧 Variables de Entorno

```bash
PGHOST
PGUSER
PGPASSWORD
PGDATABASE
PGPORT
```

## 🐳 Uso con Docker

### Construcción Básica
```bash
# Construcción simple
docker build -t node-app .

# Ejecutar con variables de entorno
docker run -d -p 3000:3000 \
  -e DB_HOST=postgres_container \
  -e SECRET_KEY=mi_secreto_super_seguro \
  --name node-app-container node-app
```

### Con Base de Datos
```bash
# Crear red
docker network create app-network

# PostgreSQL
docker run -d \
  --network app-network \
  --name postgres \
  -e POSTGRES_DB=dockerapp \
  -e POSTGRES_USER=appuser \
  -e POSTGRES_PASSWORD=apppass \
  postgres:15

# Aplicación Node.js
docker run -d \
  --network app-network \
  -p 3000:3000 \
  -e DB_HOST=postgres \
  -e DB_USER=appuser \
  -e DB_PASSWORD=apppass \
  -e DB_NAME=dockerapp \
  --name node-app node-app
```

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm start              # Ejecutar aplicación
npm run start:watch    # Desarrollo con auto-reload
npm test              # Ejecutar tests

# Linting y formato
npm run lint          # Verificar código con ESLint
npm run format        # Formatear código con Prettier
```

## 🎯 Propósito Educativo

Esta aplicación está diseñada específicamente para demostrar:

### 1. **Multi-stage Builds**
- Separación de etapas de build, test y producción
- Optimización de tamaño de imagen final
- Aprovechamiento de cache de Docker

### 2. **Gestión de Secretos**
- Lectura de secretos desde variables de entorno
- Soporte para Docker secrets (archivos montados)
- Buenas prácticas de seguridad

### 3. **Optimización de Capas**
- Instalación de dependencias antes que código fuente
- Combinación de comandos RUN para reducir capas
- Uso eficiente de cache de Docker

### 4. **Configuración Flexible**
- Variables ARG para build-time
- Variables ENV para runtime
- Soporte para múltiples ambientes

### 5. **Seguridad**
- Ejecución con usuario no-root
- Gestión segura de credenciales
- Principio de menor privilegio

## 🧪 Testing

### Ejecutar Tests
```bash
# Tests locales
npm test

# Tests en Docker
docker run --rm node-app npm test

# Tests con cobertura
npm test -- --coverage
```

### Endpoints de Prueba
```bash
# Health check
curl http://localhost:3000/healthcheck

# Verificar aplicación
curl http://localhost:3000/

# Test de secretos
curl http://localhost:3000/secret

# Estado de base de datos
curl http://localhost:3000/db-health
```

## 📁 Gestión de Archivos

La aplicación crea automáticamente las siguientes carpetas:
- `uploads/` - Archivos subidos por usuarios
- `logs/` - Archivos de log de la aplicación
- `temp/` - Archivos temporales

## 🔍 Debugging

### Logs de Aplicación
```bash
# Ver logs del contenedor
docker logs node-app-container

# Seguir logs en tiempo real
docker logs -f node-app-container

# Acceder al contenedor
docker exec -it node-app-container /bin/sh
```

### Variables de Debug
```bash
# Habilitar logs debug de base de datos
DEBUG=db:* npm start

# Debug completo
DEBUG=* npm start
```

## 🤝 Desarrollo Local

### Requisitos
- Node.js 18+ 
- PostgreSQL (opcional)
- Docker (opcional)

### Setup Rápido
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar sin base de datos (modo desarrollo)
npm start

# O con base de datos local
# Configurar PostgreSQL primero
npm start
```

## 📚 Uso en Ejercicios del Curso

Esta aplicación se utiliza en:
1. **Dockerfile básico** - Construcción simple
2. **Multi-stage builds** - Optimización avanzada  
3. **Gestión de variables** - ARG vs ENV
4. **Secretos seguros** - Mejores prácticas
5. **Usuario no-root** - Seguridad en contenedores
6. **Optimización de capas** - Performance de builds