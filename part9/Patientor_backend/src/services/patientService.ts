import patientData from '../../data/patients';
import {
  NewPatient,
  Patient,
  NonSensitivePatient,
  EntryWithoutId,
  Entry
} from '../types';
import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientData;

const getAllNonSensitive = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patient: Patient = { id: uuid(), ...newPatient };
  patients.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: EntryWithoutId): Entry => {
  if (!patients.find((p) => p.id === id)) {
    throw new Error('there is no patient with given id');
  }
  const entry: Entry = { id: uuid(), ...newEntry };

  patients.map((a) =>
    a.id !== id ? a : { ...a, entries: a.entries.push(entry) }
  );
  return entry;
};

export default { getAllNonSensitive, addPatient, findById, addEntry };
