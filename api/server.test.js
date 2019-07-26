const server = require('./server');
const request = require('supertest');
const db = require('../database/dbConfig');
const Users = require('../database/userModel');

beforeEach(async () => {
  await db('users').truncate();
});

describe('Register endpoint works', () => {
  it('should return a status 201 when a user is registered', async () => {
    const response = await request(server)
      .post('/api/register')
      .send({
        username: 'username',
        password: 'password'
      });
    expect(response.status).toEqual(201);
  });
  it('should return a status 500 if no user or no password is passed to register endpoint', async () => {
    let response = await request(server)
      .post('/api/register')
      .send({
        password: 'password'
      });
    expect(response.status).toEqual(500);

    response = await request(server)
      .post('/api/register')
      .send({
        username: 'username'
      });
    expect(response.status).toEqual(500);
  });
  it('should create a user in the database when used register endpoint', async () => {
    const usersBefore = await db('users');
    await request(server)
      .post('/api/register')
      .send({
        username: 'username',
        password: 'password'
      });
    const usersAfter = await db('users');
    expect(usersAfter.length).toEqual(usersBefore.length + 1);
  });
});

describe('Login endpoint works', () => {
  beforeEach(async () => {
    await request(server)
      .post('/api/register')
      .send({
        username: 'username',
        password: 'password'
      });
  });
  it('should provide a token when a user is logged in', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({
        username: 'username',
        password: 'password'
      });
    expect(response.body.token).toBeDefined();
    expect(response.body.token.length).toBeGreaterThan(0);
  });
  it('should return a status 401 when the information provided is not correct', async () => {
    const response = await request(server)
      .post('/api/login')
      .send({
        username: 'username',
        password: 'passwor'
      });
    expect(response.status).toEqual(401);
  });
});
