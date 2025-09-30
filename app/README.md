# Aplicación Demo - Curso Docker Avanzado

Esta es una aplicación Node.js con Express.

## 📁 Estructura del Proyecto

```
app/
├── src/                         # Código fuente principal
│   ├── app.js                  # Aplicación Express principal
│   ├── config/                 # Configuración de la aplicación
│   │   ├── env.js             # Validación de variables de entorno (Zod)
│   │   ├── logger.js          # Configuración de Winston
│   │   └── multer.js          # Configuración de upload de archivos
│   ├── repositories/           # Patrón Repository (acceso a datos)
│   │   ├── base.js            # Interfaz base del repositorio
│   │   ├── memoryUserRepository.js  # Implementación en memoria
│   │   ├── pgUserRepository.js      # Implementación PostgreSQL
│   │   └── userRepositoryFactory.js # Factory pattern
│   ├── services/               # Lógica de negocio
│   │   └── users.js           # Servicio de usuarios
│   ├── routes/                 # Controladores HTTP/API
│   │   ├── misc.js            # Rutas de utilidad
│   │   ├── uploads.js         # Gestión de archivos
│   │   └── users.js           # API de usuarios
│   └── utils/                  # Utilidades
│       ├── ensureDirs.js      # Creación de directorios
│       └── getSecret.js       # Gestión de secretos
├── tests/                      # Tests automatizados
├── .eslintrc.js               # Configuración ESLint
├── .prettierrc.json           # Configuración Prettier
├── package.json               # Dependencias y scripts
└── .dockerignore              # Archivos excluidos en build Docker
```

## 🚀 Funcionalidades

### API Endpoints

- **`GET /`** - Página de inicio con saludo
- **`GET /health`** - Health check de la aplicación
- **`GET /secret`** - Endpoint que muestra secretos de configuración
- **`GET /db-health`** - Verificación de conexión a base de datos
- **`POST /users`** - Crear nuevo usuario
- **`GET /users`** - Obtener todos los usuarios
- **`POST /upload`** - Subida de archivos con Multer

### Características Técnicas

- ✅ **Arquitectura**: Patrón Repository + Service Layer
- ✅ **Framework**: Express.js
- ✅ **Base de datos**: PostgreSQL + Repositorio en memoria (configurable)
- ✅ **Validación**: Zod para variables de entorno
- ✅ **Logging**: Winston con niveles configurables
- ✅ **Upload de archivos**: Multer para gestión de archivos
- ✅ **Gestión de secretos**: Variables de entorno y archivos
- ✅ **Code quality**: ESLint + Prettier
- ✅ **Testing**: Jest con Supertest para tests de integración

## 🛠️ Tecnologías

### Dependencias de Producción

- **express**: Framework web
- **multer**: Middleware para upload de archivos
- **pg**: Cliente PostgreSQL
- **winston**: Sistema de logging
- **zod**: Validación de esquemas y variables de entorno

### Dependencias de Desarrollo

- **jest**: Framework de testing
- **supertest**: Testing de APIs HTTP
- **nodemon**: Auto-reload en desarrollo
- **eslint**: Linter de código + plugins (node, jest, prettier)
- **prettier**: Formateador de código
- **dotenv**: Gestión de variables de entorno (solo desarrollo)

## 🔧 Variables de Entorno

```bash
# Configuración básica
NODE_ENV=development|production|test
PORT=3000
DEBUG_LEVEL=error|warn|info|http|verbose|debug|silly

# Base de datos (configurable)
USE_DB=true|false              # true=PostgreSQL, false=memoria
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dockerapp
DB_USER=appuser
DB_PASS=apppass

# Secretos (cambiar en producción)
SECRET=your-secret-key-at-least-32-chars-long

# Archivo de secretos (opcional para Docker secrets)
SECRET_FILE=/run/secrets/secret-file
```

### Configuración dinámica

- **`USE_DB=true`**: Usa PostgreSQL
- **`USE_DB=false`**: Usa base de datos en memoria (ideal para desarrollo/tests)

## 🐳 Uso con Docker

### Modo desarrollo (sin base de datos)

```bash
# Construcción
docker build -t node-app .

# Ejecutar en memoria
docker run -d -p 3000:3000 \
  -e USE_DB=false \
  -e DEBUG_LEVEL=debug \
  --name node-app-dev node-app
```

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm start              # Ejecutar aplicación
npm run start:watch    # Desarrollo con auto-reload
npm test               # Ejecutar tests

# Code Quality
npm run lint           # Verificar código con ESLint
npm run lint:fix       # Corregir automáticamente problemas
npm run format         # Formatear código con Prettier
npm run format:check   # Verificar formato sin cambios
npm run precommit      # Pipeline completo (lint + format check)
```

## 🧪 Testing de API

### Endpoints básicos

```bash
# Health check
curl http://localhost:3000/health

# Verificar aplicación
curl http://localhost:3000/

# Test de secretos
curl http://localhost:3000/secret

# Estado de base de datos
curl http://localhost:3000/db-health
```

### API de usuarios

```bash
# Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan Pérez","email":"juan@example.com"}'

# Obtener usuarios
curl http://localhost:3000/users
```

### Upload de archivos

```bash
# Subir un archivo de prueba
curl -X POST http://localhost:3000/upload \
  -F "file=@/path/to/your/file.txt" \
  -H "Content-Type: multipart/form-data"
```
