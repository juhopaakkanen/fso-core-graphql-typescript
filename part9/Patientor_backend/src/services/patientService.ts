import patientData from '../../data/patients';
import { NewPatient, Patient, NonSensitivePatient } from '../types';
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
  const Patient: Patient = { id: id, ...newPatient };

  patients.push(Patient);
  return Patient;
};

export default { getAllNonSensitive, addPatient, findById };
