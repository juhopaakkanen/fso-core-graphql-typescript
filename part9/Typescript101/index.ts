import express from 'express';
import { calculateBmi, parseQueryParameters } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const { weight, height }: any = parseQueryParameters(
      req.query.weight,
      req.query.height
    );
    const bmi = calculateBmi(weight, height);
    res.send({ weight: weight, height: height, bmi: bmi });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({ error: error.message });
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
