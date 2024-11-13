const aTuneModels = require('../models/aTuneModels');
const { getDaily, userId, addNewHabit } = require('./aTuneController');

//mocks the models functions i think???
jest.mock('../models/aTuneModels');

//this mocks the entire aTuneModels module
//we need to test userId, getDaily, and addNewHabit
describe('aTuneController', () => {
  describe('userId', () => {
    const req = { query: { userName: 'testUser' } };
    const res = {};
    const next = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should fetch userId and call next', async () => {
      const mockUserId = 6969;
      aTuneModels.getUserId.mockResolvedValue(mockUserId);

      await userId(req, res, next);

      //checks to see that getUserId gets called with testUser
      expect(aTuneModels.getUserId).toHaveBeenLastCalledWith('testUser');
      //checks that request param is the mockUserId's id number
      expect(req.userId).toBe(mockUserId);
      //checks that function goes next
      expect(next).toHaveBeenCalled();
    });
  });

  describe('getDaily', () => {
    const req = { query: { userId: '6969' } };
    const res = {};
    const next = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should fetch daily habits and call next0', async () => {
      const mockDailyHabits = [{ habit: 'drinking' }];
      aTuneModels.getDailyHabits.mockResolvedValue(mockDailyHabits);

      await getDaily(req, res, next);

      expect(aTuneModels.getDailyHabits).toHaveBeenCalledWith('6969');
      expect(req.dailyHabits).toEqual(mockDailyHabits);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('addNewHabit', () => {
    const req = {};
    const res = {};
    const next = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });
    it('should add a new habit and call next', async () => {
      const mockNewHabit = { habit: 'sippin' };
      aTuneModels.makeDailyHabits.mockResolvedValue(mockNewHabit);

      await addNewHabit(req, res, next);

      expect(aTuneModels.makeDailyHabits).toHaveBeenCalled();
      expect(req.newHabit).toEqual(mockNewHabit);
      expect(next).toHaveBeenCalled();
    });
  });
});
