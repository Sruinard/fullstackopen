import diagnosesService from "../services/diagnoses";
import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;