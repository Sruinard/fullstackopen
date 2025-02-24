import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../../types";

interface EntryDetailsProps {
    entry: Entry;
}

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            <p>{entry.specialist}</p>
        </div>
    );
};

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            <p>{entry.specialist}</p>
        </div>
    );
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <div>
            <h3>{entry.date}</h3>
            <p>{entry.description}</p>
            <p>{entry.specialist}</p>
        </div>
    );
};

const EntryDetails = ({ entry }: EntryDetailsProps) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
