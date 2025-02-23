import { Request, Response, NextFunction } from "express";
import parsers from "../utils/parsers";

const patientParser = (req: Request, _res: Response, next: NextFunction) => { 
    try {
        parsers.parsePatientObject(req.body);
      next();
    } catch (error: unknown) {
      next(error);
    }
  };

const middleware = {
    patientParser,
}

export default middleware;