import express from 'express';
import { calculateBmi, typecheckQueryParameters } from './bmiCalculator';
import {
  calculateExercises,
  typecheckJSONParameters
} from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { weight, height }: any = req.query;
  let bmi;

  try {
    typecheckQueryParameters(weight, height);
    bmi = calculateBmi(weight, height);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
  }
  return res.send({ weight: weight, height: height, bmi: bmi });
});

app.post('/exercises', (req, res) => {
  const { target, daily_exercises } = req.body;
  let result;

  try {
    typecheckJSONParameters(target, daily_exercises);
    result = calculateExercises(target, daily_exercises);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
