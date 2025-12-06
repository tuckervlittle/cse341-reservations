const mockingoose = require('mockingoose');

const { findOne } = require('../controllers/userController');
const User = require('../models/index').users;
const TestResponse = require('../lib/test-response');

jest.setTimeout(60000);

describe('Get User routes', () => {
  // With correct inputs
  test('Get one user, 200', async () => {
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(User).toReturn(_user, 'findOne');

    const req = {
      params: { username: 'TestUser' },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(_user);
  });

  // With no user name
  test('Get one user, 500 empty req params', async () => {

    mockingoose(User).toReturn(new Error('DB error'), 'findOne');

    const req = {
      params: {},
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(500);
  });

  // With an incorrect user name
  test('Get one user, 404 no user found', async () => {
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(User).toReturn(null, 'findOne');

    const req = {
      params: { username: 'WrongUser' },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(404);
  })
});