const app = require('../server');
const supertest = require('supertest');
const request = supertest(app);

describe('GET Endpoints', () => {
    //Home
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.statusCode).toBe(200);
        expect(res.header['content-type']).toMatch(/html|json/);
    });

    // Swagger docs
    test('responds to /api-docs if swagger is loaded',    async () => {
    const res = await request.get('/api-docs');
    expect([200, 301, 404]).toContain(res.statusCode);
    }); 

    // Areas
    test('GET /area - get all areas', async () => {
    const res = await request.get('/area');
    expect([200, 404]).toContain(res.statusCode);
    if(res.statusCode === 200) expect(Array.isArray(res.body)).toBe(true);
  });

    // Areas  by ID
    test('GET /area/:areaId - get one area', async () => {
    const res = await request.get('/area/692a479eeaf18049482f6c64'); 
    expect([200, 404]).toContain(res.statusCode);
  });

    //Calendar
    test('GET /calendar - get all dates', async () => {
    const res = await request.get('/calendar');
    expect([200, 401, 404]).toContain(res.statusCode); 
  });
    //Calendar by Date
    test('GET /calendar/:date - get one date', async () => {
    const res = await request.get('/calendar/2025-12-17');
    expect([200, 401, 404]).toContain(res.statusCode);
  });

    // Reservations
    test('GET /reservation/status - get reservation status', async () => {
    const res = await request.get('/reservation/status');
    expect([200, 404]).toContain(res.statusCode);
  });

    test('GET /reservation/user/testuser - get reservations by user', async () => {
    const res = await request.get('/reservation/user/testuser');
    expect([200, 401, 404]).toContain(res.statusCode);
  });

    // Users
    test('GET /user/logout - logout', async () => {
    const res = await request.get('/user/logout');
    expect([200]).toContain(res.statusCode);
  });

    test('GET /user/:username - get user by username', async () => {
    const res = await request.get('/user/testuser');
    expect([200, 401, 404]).toContain(res.statusCode);
  });

});



