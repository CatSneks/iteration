const express = require('express');
const aTuneController = require('../controllers/aTuneController');

const router = express.Router();

router.get('/dayview', aTuneController.getDaily, (req, res) => {
  res.status(200).json({ dailyHabits: req.dailyHabits });
});

module.exports = router;