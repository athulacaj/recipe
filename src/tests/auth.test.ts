import request from 'supertest';
import express, { Application, Router } from 'express';
import router from '../routes/authRoutes';
import exp from 'constants';

import { app } from '../server';



describe('Auth Routes', () => {
  it('should login a user at POST /api/emailLogin', async () => {
    const res = await request(app)
      .post('/api/emailLogin')
      .send({ email: 'test@test.com', password: 'password' });

    expect(res.statusCode).toEqual(200);
    // Add more assertions based on your response structure
  });

  // it('should signup a user at POST /api/signup', async () => {
  //   const res = await request(router)
  //     .post('/api/signup')
  //     .send({ email: 'test@test.com', password: 'password' });

  //   expect(res.statusCode).toEqual(200);
  //   // Add more assertions based on your response structure
  // });
});