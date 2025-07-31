const request = require('supertest');
const express = require('express');

// Importa la app o crea una instancia para test
const app = require('../app');

describe('App Express', () => {
  it('GET / debe responder con saludo', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('¡Hola desde Node.js en Docker!');
  });

  it('GET /secret debe responder con el secreto', async () => {
    process.env.SECRET = 'prueba';
    const res = await request(app).get('/secret');
    expect(res.statusCode).toBe(200);
  });

});
