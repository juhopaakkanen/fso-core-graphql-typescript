interface personData {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): personData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const parseQueryParameters = (height: any, weight: any): personData => {
  if (!height || !weight) {
    throw new Error('malformatted parameters: missing weight or height');
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    throw new Error('malformatted parameters: not numbers');
  } else {
    return {
      height: Number(height),
      weight: Number(weight)
    };
  }
};

const calculateBmi = (height: number, weight: number): String => {
  const BMI: number = weight / Math.pow(height / 100, 2);
  switch (true) {
    case BMI < 18.5:
      return 'Low (underweight)';
    case BMI >= 18.5 && BMI < 25.0:
      return 'Normal (healthy weight)';
    case BMI >= 25.0:
      return 'High (overweight)';
    default:
      throw new Error('Something mysterious went wrong');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export { calculateBmi, parseQueryParameters };
