import { Router, Request, Response } from "express";
import patientsService from "../services/patients";
import middleware from "../middleware/schema";
import { NewPatient, Patient } from "../types";
const router = Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
});

router.post('/', middleware.patientParser, (req: Request<{}, {}, NewPatient>, res: Response<Patient>) => {
    const newPatient = patientsService.addPatient(req.body);
    res.json(newPatient);
});

export default router;