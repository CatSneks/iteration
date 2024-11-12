const aTuneModels = require('../models/aTuneModels');

const userId = async (req, res, next) => {
  // console.log({ req });
  try {
    // const dailyHabits = await aTuneModels.getDailyHabits(); // call model to fetch dailyHabits from Supabase
    // req.dailyHabits = dailyHabits;
    const name = req.query.userName;
    console.log({ name });
    const getUserId = await aTuneModels.getUserId(name);
    console.log({ getUserId });
    req.userId = getUserId;
    return next();
  } catch (error) {
    console.error('Error with aTuneController.userId:', error);
    return next({
      log: `Error in aTuneController.userId middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while fetching user id from Supabase',
      },
    });
  }
};

const getDaily = async (req, res, next) => {
  try {
    const id = req.query.userId;
    const dailyHabits = await aTuneModels.getDailyHabits(id); // call model to fetch dailyHabits from Supabase
   
    req.dailyHabits = dailyHabits;
    return next();
  } catch (error) {
    console.error('Error with aTuneController.getDaily:', error);
    return next({
      log: `Error in aTuneController.getDaily middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while fetching daily habits from Supabase',
      },
    });
  }
};

const addNewHabit = async (req, res, next) => {
  try {
    const newHabit = await aTuneModels.makeDailyHabits(); // call model to fetch dailyHabits from Supabase
    req.newHabit = newHabit;
    next();
  } catch (error) {
    console.error('Error with aTuneController.addNewHabit:', error);
    return next({
      log: `Error in aTuneController.getDaily middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while posting daily habits to Supabase',
      },
    });
  }
};

module.exports = { getDaily, userId, addNewHabit };
