const { z } = require('zod');
const getDatabasePassword = require('../utils/getDatabasePassword');

if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (error) {
    console.warn('No se pudo cargar .env:', error.message);
  }
}

process.env.DB_PASS = getDatabasePassword() || process.env.DB_PASS;


const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().min(1).max(65535).default(3000),
  DEBUG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).default('info'),
  USE_DB: z.string().toLowerCase().transform((x) => x === 'true').pipe(z.boolean()).default('false'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().default(5432),
  DB_NAME: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASS: z.string().optional(),
  SECRET: z
    .string()
    .min(12)
    .default('dev-secret-key-at-least-12-chars-long')
});

try {
  const env = envSchema.parse(process.env);
  if (env.USE_DB) {
    if (!env.DB_NAME || !env.DB_USER || !env.DB_PASS) {
      throw new Error(
        'DB_NAME, DB_USER y DB_PASS son requeridas cuando USE_DB=true'
      );
    }
  }
  
  module.exports = env;
} catch (error) {
  console.error('Error en configuración de entorno:', error);
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
