import { z } from "zod";
import { Gender, NewPatient } from "../types";

const parsePatientObject = (object: unknown): NewPatient => {
    return patientSchema.parse(object);
}
const patientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    ssn: z.string(),
});

const parsers = {
    parsePatientObject,
}
export default parsers;


