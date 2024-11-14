const aTuneModels = require('../models/aTuneModels');

const userId = async (req, res, next) => {
  try {
    const name = req.query.userName;
    const getUserId = await aTuneModels.getUserId(name);
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
    const { user_id, newHabit } = req.body;

    if (!user_id || !newHabit) {
      return next({
        log: 'Missing required fields in addNewHabit',
        status: 400,
        message: {
          err: 'User ID and new habit are required',
        },
      });
    }

    const updatedHabits = await aTuneModels.makeDailyHabits(user_id, newHabit);
    req.newHabit = updatedHabits;
    next();
  } catch (error) {
    console.error('Error with aTuneController.addNewHabit:', error);
    return next({
      log: `Error in aTuneController.addNewHabit middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while posting daily habits to Supabase',
      },
    });
  }
};

const deleteHabit = async (req, res, next) => {
  try {
    const { user_id, habit } = req.body;

    if (!user_id || !habit) {
      return next({
        log: 'Missing required fields in deleteHabit',
        status: 400,
        message: { err: 'User ID and habit to be deleted are required' },
      });
    }

    const updatedHabits = await aTuneModels.deleteDailyHabit(user_id, habit);

    if (!updatedHabits) {
      return next({
        log: 'No habits returned after deletion',
        status: 500,
        message: { err: 'Failed to delete habit' },
      });
    }

    req.updatedHabits = updatedHabits;
    return next();
  } catch (error) {
    console.error('Error with aTuneController.deleteHabit:', error);
    return next({
      log: `Error in aTuneController.deleteHabit middleware. Error: ${error.message}`,
      status: 500,
      message: {
        err: 'An error occurred while deleting the habit from Supabase',
      },
    });
  }
};

module.exports = { getDaily, userId, addNewHabit, deleteHabit };
