interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: String;
  target: number;
  average: number;
}

interface inputData {
  dailyTarget: number;
  trainingHours: Array<number>;
}

const parseArguments2 = (args: Array<string>): inputData => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let valid: boolean = true;
  let trainingHours: Array<number> = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      valid = false;
    }
    if (i > 2) {
      trainingHours.push(Number(args[i]));
    }
  }
  if (valid) {
    return {
      dailyTarget: Number(args[2]),
      trainingHours: trainingHours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (
  dailyTarget: number,
  trainingHours: Array<number>
): result => {
  const len: number = trainingHours.length;
  const avg: number = trainingHours.reduce((a, b) => a + b) / len;

  const ratingData: number = avg / (dailyTarget * 1.0);
  let rating: number;
  let ratingDescription: String;
  if (ratingData >= 1) {
    rating = 3;
    ratingDescription = 'superb target reached!';
  } else if (ratingData < 1 && ratingData >= 0.5) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad, exercise more';
  }

  return {
    periodLength: len,
    trainingDays: trainingHours.filter((d) => d != 0).length,
    success: avg >= dailyTarget,
    rating: rating,
    ratingDescription: ratingDescription,
    target: dailyTarget,
    average: avg
  };
};

try {
  const { dailyTarget, trainingHours } = parseArguments2(process.argv);
  console.log(calculateExercises(dailyTarget, trainingHours));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
