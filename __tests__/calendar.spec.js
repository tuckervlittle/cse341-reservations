const mockingoose = require('mockingoose');

const { findOne, findAll } = require('../controllers/calendarController');
const Calendar = require('../models/index').calendar;
const TestResponse = require('../lib/test-response');

jest.setTimeout(60000);

describe('Calendar routes', () => {
  // With something in the database
  test('Get all calendars, 200', async () => {
  const _calendar = [
    {
    _id: '68db5477046c79066df0eef8',
    date: "12/25/2025",
    areaId: "68db5477046c79066df0eef8",
    is_available: false,
    notes: "Date not available"
    },
    {
    _id: '693309417f92ce21771bddb0',
    date: "12/31/2025",
    areaId: "692a479eeaf18049482f6c64",
    is_available: true,
    notes: "Date is available"
    },
  ];

  mockingoose(Calendar).toReturn(_calendar, 'find');

  const req = {};
  const res = new TestResponse();

  await findAll(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.data).toEqual(_calendar);
  });

  // With nothing in the database
  test('Get all calendars, 500 server error', async () => {

  mockingoose(Calendar).toReturn(new Error('Server error'), 'find');

  const req = {};
  const res = new TestResponse();

  await findAll(req, res);
  expect(res.statusCode).toBe(500);
  });
  
  // With correct params
  test('Get one calendar, 200', async () => {
    const _calendar = {
      _id: '68db5477046c79066df0eef8',
      date: "12/25/2025",
      areaId: "692a479eeaf18049482f6c64",
      is_available: false,
      notes: "Date not available"
    };

    mockingoose(Calendar).toReturn(_calendar, 'findOne');

    const req = {
      params: { date: "12/25/2025" },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(_calendar);
  });

  // With incorrect params
  test('Get one calendar, 404 No calendar entry', async () => {
    const _calendar = {
      _id: '68db5477046c79066df0eef8',
      date: "12/25/2025",
      areaId: "692a479eeaf18049482f6c64",
      is_available: false,
      notes: "Date not available"
    };

    mockingoose(Calendar).toReturn(null, 'findOne');

    const req = {
      params: { date: "12/21/2025" },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(404);
  });

  // With empty params
  test('Get one calendar, 500 server error', async () => {
    const _calendar = {
      _id: '68db5477046c79066df0eef8',
      date: "12/25/2025",
      areaId: "692a479eeaf18049482f6c64",
      is_available: false,
      notes: "Date not available"
    };

    mockingoose(Calendar).toReturn(new Error('Server Error'), 'findOne');

    const req = {
      params: {},
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(500);
  });
});