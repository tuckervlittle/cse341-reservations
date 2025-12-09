const mockingoose = require('mockingoose');

const { findByUser, findAll } = require('../controllers/reservationController');
const Reservation = require('../models/index').reservations;
const User = require('../models/index').users;
const TestResponse = require('../lib/test-response');

jest.setTimeout(60000);

describe('Reservation routes', () => {
  // With something in the database
  test('Get all reservations, 200', async () => {
    const _reservations = [
      {
      _id: '68db5477046c79066df0eef8',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      areaName: null,
      date: "12/25/2025",
      status: "pending"
      },
      {
      _id: '692a4817eaf18049482f6c6c',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      areaName: null,
      date: "12/25/2025",
      status: "pending"
      },
    ];

    mockingoose(Reservation).toReturn(_reservations, 'find');

    const req = {};
    const res = new TestResponse();

    await findAll(req, res);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data).toHaveLength(_reservations.length);
    res.data.forEach((r, i) => {
      expect(r._id).toBe(_reservations[i]._id);
      expect(r.areaId).toBe(_reservations[i].areaId);
      expect(r.userId).toBe(_reservations[i].userId);
      expect(r.status).toBe(_reservations[i].status);
      const iso = new Date(r.date).toISOString();
      expect(new Date(r.date).toISOString().startsWith(new Date(_reservations[i].date).toISOString().slice(0,10))).toBe(true);
    });
  });

  // With nothing in the database
  test('Get all reservation, 500 server error', async () => {

    mockingoose(Reservation).toReturn(new Error('Server error'), 'find');

    const req = {};
    const res = new TestResponse();

    await findAll(req, res);
    expect(res.statusCode).toBe(500);
  });

    // With correct params
  test('Find by user, 200', async () => {
    const _reservation = [
      {
      _id: '692a47deeaf18049482f6c68',
      userId: "68db5477046c79066df0eef8",
      areaId: "692a479eeaf18049482f6c64",
      areaName: null,
      date: '2025-12-25T00:00:00.000Z',
      status: "pending"
      },
    ];
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(Reservation).toReturn(_reservation, 'find');
    mockingoose(User).toReturn(_user, 'findOne');

    const req = {
      params: { username: "TestUser" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toHaveLength(_reservation.length);
    res.data.forEach((r, i) => {
      expect(r._id).toBe(_reservation[i]._id);
      expect(r.areaId).toBe(_reservation[i].areaId);
      expect(r.userId).toBe(_reservation[i].userId);
      expect(r.status).toBe(_reservation[i].status);
      expect(new Date(r.date).toISOString().startsWith(new Date(_reservation[i].date).toISOString().slice(0,10))).toBe(true);
    });
  });

    // With incorrect user
  test('Find by user, 404 User not found', async () => {
    const _reservation = [
      {
      _id: '692a47deeaf18049482f6c68',
      userId: "68db5477046c79066df0eef8",
      areaId: "692a479eeaf18049482f6c64",
      areaName: null,
      date: '2025-12-25T00:00:00.000Z',
      status: "pending"
      },
    ];
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(Reservation).toReturn(_reservation, 'find');
    mockingoose(User).toReturn(null, 'findOne');

    const req = {
      params: { username: "WrongUser" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(404);
  });

    // With no reservations for user
  test('Find by user, 404 No reservations found', async () => {
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(Reservation).toReturn([], 'find');
    mockingoose(User).toReturn(_user, 'findOne');

    const req = {
      params: { username: "TestUser" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(404);
  });

  // With server error
  test('Find by user, 500 Server error', async () => {
    const _user = {
      _id: '68db5477046c79066df0eef8',
      username: "TestUser",
      dni: "1231231231",
      role: "resident",
      email: "testemail2@email.com"
    };

    mockingoose(Reservation).toReturn(new Error('Server Error'), 'find');
    mockingoose(User).toReturn(_user, 'findOne');

    const req = {
      params: { username: "TestUser" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(500);
  });
});