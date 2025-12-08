const mockingoose = require('mockingoose');

const { findByUser, findAll } = require('../controllers/reservationController');
const Reservation = require('../models/index').reservations;
const TestResponse = require('../lib/test-response');

jest.setTimeout(60000);

describe('Reservation routes', () => {
  // With something in the database
  test('Get all reservation, 200', async () => {
    const _reservations = [
      {
      _id: '68db5477046c79066df0eef8',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      date: "12/25/2025",
      status: "pending"
      },
      {
      _id: '692a4817eaf18049482f6c6c',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      date: "12/25/2025",
      status: "pending"
      },
    ];

    mockingoose(Reservation).toReturn(_reservations, 'find');

    const req = {};
    const res = new TestResponse();

    await findAll(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(_reservations);
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
  test('Get one reservation, 200', async () => {
    const _reservation = [
      {
      _id: '68db5477046c79066df0eef8',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      date: "12/25/2025",
      status: "pending"
      },
    ];

    mockingoose(Reservation).toReturn(_reservation, 'find');

    const req = {
      params: { userId: "692a47deeaf18049482f6c68" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(_reservation);
  });

    // With incorrect params
  test('Get one reservation, 404 Reservation not found', async () => {
    const _reservation = [
      {
      _id: '68db5477046c79066df0eef8',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      date: "12/25/2025",
      status: "pending"
      },
    ];

    mockingoose(Reservation).toReturn([], 'find');

    const req = {
      params: { userId: "692a47deeaf18049482f6c45" },
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(404);
  });

    // With empty params
  test('Get one reservation, 500 Server error', async () => {
    const _reservation = [
      {
      _id: '68db5477046c79066df0eef8',
      userId: "692a47deeaf18049482f6c68",
      areaId: "692a479eeaf18049482f6c64",
      date: "12/25/2025",
      status: "pending"
      },
    ];

    mockingoose(Reservation).toReturn(new Error('Server error'), 'find');

    const req = {
      params: {},
    };
    const res = new TestResponse();

    await findByUser(req, res);
    expect(res.statusCode).toBe(500);
  });
});