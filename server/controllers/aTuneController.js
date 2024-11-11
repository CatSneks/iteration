const aTuneModels = require('../models/aTuneModels');

const getDaily = async (req, res, next) => {
  try {
    const dailyHabits = await aTuneModels.getDailyHabits(); // call model to fetch dailyHabits from Supabase
    req.dailyHabits = dailyHabits;
    next();
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

module.exports = { getDaily };
