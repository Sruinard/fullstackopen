import { useState, useEffect } from "react";
import { Patient, Diagnosis } from "../../types";
import { useParams } from "react-router-dom";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
interface PatientPageProps {
    patients: Patient[];
}

const PatientPage = ({ patients }: PatientPageProps) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchDiagnoses = () => {
            diagnosesService.getAll().then(diagnoses => {
                setDiagnoses(diagnoses);
            });
        };
        fetchDiagnoses();
    }, []);

    if (patients.length === 0) {
        return (<div> <h1>Patients not found</h1> </div>);
    }

    const patient = patients.find(p => p.id === id);
    if (!patient) {
        return (<div> <h1>Patient not found</h1> </div>);
    }

    if (diagnoses.length === 0) {
        return (<div> <h1>Diagnoses not found</h1> </div>);
    }



    return (<div>
        <h1>{patient.name}</h1>
        <p>{patient.gender}</p>
        <p>{patient.occupation}</p>
        <p>{patient.dateOfBirth}</p>
        <h2>Entries</h2>
        {patient.entries.map(entry => (
            <EntryDetails key={entry.id} entry={entry} />
        ))}
    </div>);
};

export default PatientPage;