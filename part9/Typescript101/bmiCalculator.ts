const calculateBmi = (height: number, weight: number): String => {
  const BMI: number = weight / Math.pow(height / 100, 2);
  switch (true) {
    case BMI < 18.5:
      return "Low (underweight)";
    case BMI >= 18.5 && BMI < 25.0:
      return "Normal (healthy weight)";
    case BMI >= 25.0:
      return "High (overweight)";
    default:
      return "error";
  }
};

console.log(calculateBmi(180, 74));
