import request from 'supertest';
import app from '../dist/app.js';

// Set this to true to console log tested values
const ENABLE_LOGGING = false;

describe('GET /launches', () => {
  test('It should respond with 200 success', async () => {
    const response = await request(app).get('/launches');
    if (ENABLE_LOGGING) console.log(response.statusCode);
    expect(response.statusCode).toBe(200);
  });
  test('It should respond with an array', async () => {
    const response = await request(app).get('/launches');
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.body).toEqual(expect.any(Array));
  });
  test('Each array item should be a valid launch object', async () => {
    const response = await request(app).get('/launches');
    if (ENABLE_LOGGING) console.log(response.body);
    response.body.map((launch) => {
      console.log(launch);
      expect(typeof launch.flightNumber).toBe('number');
      expect(typeof launch.mission).toBe('string');
      expect(typeof launch.rocket).toBe('string');
      expect(new Date(launch.launchDate) instanceof Date).toBe(true);
      expect(typeof launch.target).toBe('string');
      expect(Array.isArray(launch.customer)).toBe(true);
      expect(typeof launch.upcoming).toBe('boolean');
      expect(typeof launch.success).toBe('boolean');
    });
  });
});

describe('POST /launches', () => {
  test('It should respond with 201 Created', async () => {
    const response = await request(app).post('/launches').send({
      mission: 'DSCOVR IFWRKNG',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    if (ENABLE_LOGGING) console.log(response.statusCode);
    expect(response.statusCode).toBe(201);
  });

  test('It should respond with the created launch', async () => {
    const response = await request(app).post('/launches').send({
      mission: 'DSCOVR IFWRKNG GUD',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.body).toEqual({
      mission: 'DSCOVR IFWRKNG GUD',
      rocket: 'SuperTest EXP-201',
      launchDate: expect.stringContaining('2023-06-06'),
      target: 'Earth',
      customer: ['ZTM', 'NASA'],
      flightNumber: expect.any(Number),
      success: true,
      upcoming: true
    });
  });

  test('It should respond with 400 Error', async () => {
    const response = await request(app).post('/launches').send({
      mission: '',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.statusCode).toBe(400);
  });

  test('It should respond with a descriptive error', async () => {
    const response = await request(app).post('/launches').send({
      mission: '',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.body).toEqual({
      error: 'Missing required launch property.'
    });
  });
});

describe('DELETE /launches/:id', () => {
  test('It should respond with 202 Accepted', async () => {
    const newLaunchResponse = await request(app).post('/launches').send({
      mission: 'New Test Launch',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    console.log('NLR', newLaunchResponse.body);
    const response = await request(app).delete(
      `/launches/${newLaunchResponse.body.flightNumber}`
    );
    if (ENABLE_LOGGING) console.log(response.statusCode);
    expect(response.statusCode).toBe(202);
  });

  test('It should respond with the deleted launch', async () => {
    const newLaunchResponse = await request(app).post('/launches').send({
      mission: 'New Test Launch',
      rocket: 'SuperTest EXP-201',
      launchDate: 'June 6, 2023',
      target: 'Earth'
    });
    const response = await request(app).delete(
      `/launches/${newLaunchResponse.body.flightNumber}`
    );
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.body.launchData.flightNumber).toEqual(
      newLaunchResponse.body.flightNumber
    );
  });

  test('It should respond with 404 Not Found', async () => {
    const response = await request(app).delete(`/launches/500000`);
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.statusCode).toBe(404);
  });

  test('It should respond with a descriptive error', async () => {
    const response = await request(app).delete(`/launches/500000`);
    if (ENABLE_LOGGING) console.log(response.body);
    expect(response.body).toEqual({
      error: 'No launch found by Flight Number 500000'
    });
  });
});
