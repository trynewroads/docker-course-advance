# ESLint y Prettier - Comandos Útiles

## 📋 Comandos disponibles

```bash
# Verificar código con ESLint
npm run lint

# Corregir automáticamente problemas de ESLint
npm run lint:fix

# Formatear código con Prettier
npm run format

# Verificar si el código está bien formateado
npm run format:check

# Ejecutar todo el pipeline de verificación
npm run precommit
```

## 🛠️ Configuración aplicada

### ESLint

- **Base**: `eslint:recommended`
- **Plugins**: `node`, `jest`
- **Compatibilidad**: Prettier (sin conflictos)
- **Reglas personalizadas**:
  - `no-console`: warn (permitido en tests)
  - `no-unused-vars`: error (ignora variables con `_`)
  - `prefer-const`: error
  - `no-var`: error

### Prettier

- **Estilo**: Semicolons, single quotes
- **Indentación**: 2 espacios
- **Línea máxima**: 80 caracteres
- **Trailing commas**: none
- **Arrow functions**: avoid parentheses

## 🔧 Integración con VSCode

El proyecto incluye configuración para VSCode:

- Format on save habilitado
- ESLint auto-fix on save
- Prettier como formateador por defecto

## 📁 Archivos de configuración

```
app/
├── .eslintrc.js          # Configuración de ESLint
├── .eslintignore         # Archivos ignorados por ESLint
├── .prettierrc.json      # Configuración de Prettier
├── .prettierignore       # Archivos ignorados por Prettier
└── .vscode/
    └── settings.json     # Configuración de VSCode
```

## 🚨 Errores comunes y soluciones

### Error: `no-process-exit`

```javascript
// ❌ ESLint no permite process.exit()
process.exit(1);

// ✅ Usar throw en su lugar
throw new Error('Configuración inválida');
```

### Error: `no-unused-vars`

```javascript
// ❌ Variable no utilizada
const unusedVar = 'value';

// ✅ Usar guión bajo para ignorar
const _unusedVar = 'value';

// ✅ O eliminar si no es necesaria
```

### Error: `node/no-missing-require`

```javascript
// ❌ Ruta incorrecta
require('../app'); // Si el archivo está en src/app.js

// ✅ Ruta correcta
require('./src/app'); // Desde la raíz
require('./app'); // Desde src/
```

## 🎯 Scripts recomendados para desarrollo

```bash
# Desarrollo con auto-reload y linting
npm run start:watch

# Antes de commit
npm run precommit

# Pipeline completo
npm run lint && npm run format && npm test
```

## 📦 Dependencias instaladas

```json
{
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-jest": "^27.6.0",
    "eslint-plugin-node": "^11.1.0",
    "prettier": "^3.2.5"
  }
}
```
