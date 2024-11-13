// aTuneRoutes.test.js
const request = require('supertest');
const express = require('express');
const aTuneRouter = require('../routes/aTuneRoutes');
const aTuneController = require('../controllers/aTuneController');

const app = express();
app.use(express.json());
app.use('/aTune', aTuneRouter);

// Mock aTuneController functions
aTuneController.userId = (req, res, next) => {
  req.userId = 'mockUserId';
  next();
};

aTuneController.getDaily = (req, res, next) => {
  req.dailyHabits = ['mockHabit1', 'mockHabit2'];
  next();
};

aTuneController.addNewHabit = (req, res, next) => {
  req.newHabit = { id: 1, name: 'mockyHabit' };
  next();
};

// Test cases below
describe('aTune Routes', () => {
  it('GET /aTune/userId - should return mocked userId', async () => {
    const response = await request(app).get('/aTune/userId');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ userId: 'mockUserId' });
  });

  it('GET /aTune/dayview - should return mocked daily habits', async () => {
    const response = await request(app).get('/aTune/dayview');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      dailyHabits: ['mockHabit1', 'mockHabit2'],
    });
  });

  it('POST /aTune/addNewHabit - should return newly added habit', async () => {
    const response = await request(app).post('/aTune/addNewHabit');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ newHabit: { id: 1, name: 'mockyHabit' } });
  });
});
