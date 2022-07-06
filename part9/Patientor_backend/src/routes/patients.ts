import express from 'express';
import patientService from '../services/patientService';
import { NewPatient, Patient, Entry, EntryWithoutId } from '../types';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAllNonSensitive());
});

router.get('/:id', (req, res) => {
  const patient: Patient | undefined = patientService.findById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry: EntryWithoutId | undefined = toNewEntry(req.body);
    if (newEntry) {
      const addedEntry: Entry = patientService.addEntry(id, newEntry);
      res.json(addedEntry);
    }
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send(e.message);
    }
  }
});

export default router;
