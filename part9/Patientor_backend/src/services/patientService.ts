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
  const id: string = uuid();
  const patient: Patient = { id: id, ...newPatient };

  patients.push(patient);
  return patient;
};

const addEntry = (id: string, newEntry: EntryWithoutId): Entry => {
  //const patient = patients.find((p) => p.id === id);
  console.log(id);
  const entryId: string = uuid();
  const entry: Entry = { id: entryId, ...newEntry };

  return entry;
};

export default { getAllNonSensitive, addPatient, findById, addEntry };
