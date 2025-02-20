interface BmiValuesResponse {
    height: number,
    weight: number,
    bmi: string
}

const calculateBmi = (height: number, weight: number): BmiValuesResponse => {
    return {
        height: height,
        weight: weight,
        bmi: "normal range"
    };
};

export { calculateBmi };


