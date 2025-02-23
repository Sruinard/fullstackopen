interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

type NewPatient = Omit<Patient, 'id'>;
type PublicPatient = Omit<Patient, 'ssn'>;


export enum Gender {
    Male = 'male',
    Female = 'female',
}


export type { Diagnosis, Patient, PublicPatient, NewPatient };