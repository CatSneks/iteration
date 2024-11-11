const express = require('express');
const aTuneController = require('../controllers/aTuneController');

const router = express.Router();

router.get('/userId', aTuneController.userId, (req, res) => {
  res.status(200).json({ userName: req.userName });
});

router.get('/dayview', aTuneController.getDaily, (req, res) => {
  res.status(200).json({ dailyHabits: req.dailyHabits });
});

router.post('/addNewHabit', aTuneController.addNewHabit, (req, res) => {
  res.status(200).json({ newHabit: req.newHabit });
});

module.exports = router;