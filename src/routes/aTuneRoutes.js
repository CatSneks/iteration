import express from 'express';
import aTuneController from '../controllers/aTuneController';

const router = express.Router();

router.get('/dayview', aTuneController.getDaily, (req, res) => {
  res.status(200).json({ dailyHabits: req.dailyHabits });
});

export default router;
