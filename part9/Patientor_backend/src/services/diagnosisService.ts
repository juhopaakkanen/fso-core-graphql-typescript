import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getAll = (): Array<Diagnosis> => {
  return diagnoses;
};

export default { getAll };
