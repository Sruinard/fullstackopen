import { Patient, NonSensitivePatient, NewPatient, Gender } from "../types";
import { v4 as uuid } from 'uuid';
const patients: Patient[] = [
    {
        "id": "d2773336-f723-11e9-8f0b-362b9e155667",
        "name": "John McClane",
        "dateOfBirth": "1986-07-09",
        "ssn": "090786-122X",
        "gender": Gender.Male,
        "occupation": "New york city cop",
        "entries": [
            {
                id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
                date: '2015-01-02',
                type: 'Hospital',
                specialist: 'MD House',
                diagnosisCodes: ['S62.5'],
                description:
                  "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
                discharge: {
                  date: '2015-01-16',
                  criteria: 'Thumb has healed.',
                }
              },
              {
                id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
                date: '2019-08-05',
                type: 'OccupationalHealthcare',
                specialist: 'MD House',
                employerName: 'HyPD',
                diagnosisCodes: ['Z57.1', 'Z74.3', 'M51.2'],
                description:
                  'Patient mistakenly found himself in a nuclear plant waste site without protection gear. Very minor radiation poisoning. ',
                sickLeave: {
                  startDate: '2019-08-05',
                  endDate: '2019-08-28'
                }
              }
        ]
    },
    {
        "id": "d2773598-f723-11e9-8f0b-362b9e155667",
        "name": "Martin Riggs",
        "dateOfBirth": "1979-01-30",
        "ssn": "300179-77A",
        "gender": Gender.Male,
        "occupation": "Cop",
        "entries": []
    },
    {
        "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
        "name": "Hans Gruber",
        "dateOfBirth": "1970-04-25",
        "ssn": "250470-555L",
        "gender": Gender.Male,
        "occupation": "Technician",
        "entries": []
    },
    {
        "id": "d2773822-f723-11e9-8f0b-362b9e155667",
        "name": "Dana Scully",
        "dateOfBirth": "1974-01-05",
        "ssn": "050174-432N",
        "gender": Gender.Female,
        "occupation": "Forensic Pathologist",
        "entries": []
    },
    {
        "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
        "name": "Matti Luukkainen",
        "dateOfBirth": "1971-04-09",
        "ssn": "090471-8890",
        "gender": Gender.Male,
        "occupation": "Digital evangelist",
        "entries": []
    },
    
];

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(patient => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { ssn, ...rest } = patient;
        return rest;
    });
};

const getPatient = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error('Patient not found');
    }
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = {
        id: id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};
export default { getPatients, getPatient, addPatient };