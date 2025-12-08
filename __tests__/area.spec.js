const mockingoose = require('mockingoose');

const { findOne, findAll } = require('../controllers/areaController');
const Area = require('../models/index').areas;
const TestResponse = require('../lib/test-response');

jest.setTimeout(60000);

describe('Get Area routes', () => {
  // With something in the database
    test('Get all areas, 200', async () => {
      const _areas = [
        {
        _id: '68db5477046c79066df0eef8',
        name: "Club House",
        description: "Capacity for 100 people",
        price: 100,
        },
        {
        _id: '692a479eeaf18049482f6c64',
        name: "BBQ Pavilion",
        description: "Capacity for 150 people with 2 BBQ pits.",
        price: 200,
        },
      ];
  
      mockingoose(Area).toReturn(_areas, 'find');
  
      const req = {};
      const res = new TestResponse();
  
      await findAll(req, res);
      expect(res.statusCode).toBe(200);
      expect(res.data).toEqual(_areas);
    });
  
  // With nothing in the database
    test('Get all areas, 500 server error', async () => {

      mockingoose(Area).toReturn(new Error('Server error'), 'find');
  
      const req = {};
      const res = new TestResponse();
  
      await findAll(req, res);
      expect(res.statusCode).toBe(500);
    });
  
  // With correct inputs
  test('Get one area, 200', async () => {
    const _area = {
      _id: '68db5477046c79066df0eef8',
      name: "Club House",
      description: "Capacity for 100 people",
      price: 100,
    };

    mockingoose(Area).toReturn(_area, 'findOne');

    const req = {
      params: { areaId: '68db5477046c79066df0eef8' },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.data).toEqual(_area);
  });

  // With incorrect area ID
  test('Get one area, 404 Area not found', async () => {
    const _area = {
      _id: '68db5477046c79066df0eef8',
      name: "Club House",
      description: "Capacity for 100 people",
      price: 100,
    };

    mockingoose(Area).toReturn(null, 'findOne');

    const req = {
      params: { areaId: '68db5477046c79066df0eeg1' },
    };
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(404);
  });

  // With nothing in the params
  test('Get one area, 500 server error', async () => {

    mockingoose(Area).toReturn(new Error('Server error'), 'find');

    const req = {};
    const res = new TestResponse();

    await findOne(req, res);
    expect(res.statusCode).toBe(500);
  });
});