const express = require('express');
const aTuneController = require('../controllers/aTuneController');

const router = express.Router();

router.get('/userId', aTuneController.userId, (req, res) => {
  return res.status(200).json({ userId: req.userId });
});

router.get('/dayview', aTuneController.getDaily, (req, res) => {
  return res.status(200).json({ dailyHabits: req.dailyHabits });
});

router.post('/addNewHabit', aTuneController.addNewHabit, (req, res) => {
  return res.status(200).json({ newHabit: req.newHabit });
});

router.delete('deleteHabit', aTuneController.deleteHabit, (req, res) => {
  return res.status(200).json({ updatedHabits: req.updatedHabits });
});

module.exports = router;
