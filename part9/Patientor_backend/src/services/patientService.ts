import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Array<Patient> = patientData as Array<Patient>;

const getAllNonSensitive = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: Patient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const id: string = uuid() as string;
  const newPatient: Patient = { ...patient, id: id };

  patients.push(newPatient);
  return newPatient;
};

export default { getAllNonSensitive, addPatient };
