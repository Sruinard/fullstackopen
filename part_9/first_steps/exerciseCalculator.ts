
interface ExerciseValues {
    target: number,
    trainingHoursPerDay: Array<number>
}

const parseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 3) throw new Error('Not enough arguments');
  
    const target = Number(args[2]);
    const trainingHoursPerDay = args.slice(3).map(Number);

    if (!isNaN(target) && trainingHoursPerDay.every(hour => !isNaN(hour))) {
      return {
        target,
        trainingHoursPerDay
      };
    } else {
      throw new Error('Provided values were incorrect');
    }
  };


interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (trainingHoursPerDay: Array<number>, target: number): Result => {
    // add 1 if hours in gym on a given day is greater than 0
    const trainingDays = trainingHoursPerDay.filter(hour => hour > 0).length;
    const success = trainingDays >= target;

    return {
        periodLength: trainingHoursPerDay.length,
        trainingDays: trainingDays,
        success: success,
        rating: success ? 5 : 1,
        ratingDescription: success ? 'excellent' : 'not too bad but could be better',
        target: target,
        average: trainingHoursPerDay.reduce((acc, curr) => acc + curr, 0) / trainingHoursPerDay.length
    };
};

if (require.main === module) {
try {
    const { target, trainingHoursPerDay } = parseArguments(process.argv);
    console.log(calculateExercises(trainingHoursPerDay, target));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}

export { calculateExercises };