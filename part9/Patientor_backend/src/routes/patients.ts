import express from 'express';
import patientService from '../services/patientService';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllNonSensitive());
});

router.post('/', (req, res) => {
  try {
    const newPatient: Patient = { ...req.body } as Patient;
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
