// ✅ IMPORTANTE: Configurar variables ANTES de importar cualquier módulo
process.env.NODE_ENV = 'test';
process.env.USE_DB = 'false';
process.env.SECRET = 'test-secret-key-at-least-32-chars-long';
process.env.DEBUG_LEVEL = 'error';
process.env.PORT = '3001';


jest.mock('../src/config/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  warn: jest.fn()
}));


jest.mock('../src/config/env', () => ({
  NODE_ENV: 'test',
  PORT: 3001,
  DEBUG_LEVEL: 'error',
  USE_DB: false,
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_NAME: 'test_db',
  DB_USER: 'test_user',
  DB_PASS: 'test_pass',
  SECRET: 'mi-secreto'
}));

const request = require('supertest');
const app = require('../src/app');

describe('App Express', () => {
  it('GET / debe responder con saludo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hola desde Node.js');
  });

  it('GET /health debe responder con estado ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /secret debe responder con el secreto', async () => {
    const res = await request(app).get('/secret');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('secret');
  });

  it('GET /db-health debe responder ok con memoria', async () => {
    const res = await request(app).get('/db-health');
    expect(res.statusCode).toBe(200);
    expect(res.body.database).toBe('memory');
  });
});