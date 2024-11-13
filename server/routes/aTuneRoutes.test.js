const request = require('supertest');
const express = require('express');
const aTuneRouter = require('../routes/aTuneRoutes');
const aTuneModels = require('../models/aTuneModels');

// Create a new Express app instance for testing
const app = express();
app.use(express.json());
app.use('/aTune', aTuneRouter);

// Mock database models 
jest.mock('../models/aTuneModels', () => ({
  getUserId: jest.fn(),
  getDailyHabits: jest.fn(),
  makeDailyHabits: jest.fn(),
}));

// Set up mock implementations for controller methods
aTuneModels.getUserId.mockImplementation(async () => 'mockUserId');
aTuneModels.getDailyHabits.mockImplementation(async () => [{ id: '1' }, { id: '2' }]);
aTuneModels.makeDailyHabits.mockImplementation(async () => ({ name: 'mockyHabit' }));

//Tests for the Routes
describe('aTune Routes', () => {
  it('GET /aTune/userId - should return mocked userId', async () => {
    const response = await request(app).get('/aTune/userId?userName=testUser');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userId: 'mockUserId' });
  });

  it('GET /aTune/dayview - should return mocked daily habits', async () => {
    const response = await request(app).get('/aTune/dayview?userId=mockUserId');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ dailyHabits: [{ id: '1' }, { id: '2' }] });
  });

  it('POST /aTune/addNewHabit - should return newly added habit', async () => {
    const response = await request(app).post('/aTune/addNewHabit').send({ habit: 'mockHabit' });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ newHabit: { name: 'mockyHabit' } });
  });
});
