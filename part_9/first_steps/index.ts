import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;
  if (!height || !weight) {
    res.status(400).json({ error: "Missing parameters" });
  }
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400).json({ error: "Invalid parameters" });
  }
  
  const bmi = calculateBmi(Number(height), Number(weight));
  res.json({
    weight: Number(weight),
    height: Number(height),
    bmi: bmi
  });
});


app.post("/exercises", (req: Request, res: Response) => {
  const { target, trainingHoursPerDay } = req.body;
  if (!target || !trainingHoursPerDay) {
    res.status(400).json({ error: "Missing parameters" });
  }
  if (isNaN(Number(target)) || trainingHoursPerDay.some(isNaN)) {
    res.status(400).json({ error: "Invalid parameters" });
  }
  const result = calculateExercises(trainingHoursPerDay, Number(target));
  res.json(result);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});