import {
  NewPatient,
  Gender,
  Entry,
  EntryWithoutId,
  EntryType,
  HealthCheckRating,
  SickLeave,
  Discharge
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (value: unknown, label: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${label}`);
  }
  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseString(name, 'name'),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseString(occupation, 'occupation'),
    entries: new Array<Entry>()
  };

  return newPatient;
};

type EntryField = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntryType = (param: any): param is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(param);
};

const parseEntryType = (entryType: unknown): EntryType => {
  if (!entryType || !isEntryType(entryType)) {
    throw new Error('Incorrect or missing entry type: ' + entryType);
  }
  return entryType;
};

const isArrayOfStrings = (arr: unknown): boolean => {
  return Array.isArray(arr) && arr.every((item) => typeof item === 'string');
};

const parsediagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if (!diagnosisCodes || !isArrayOfStrings(diagnosisCodes)) {
    return undefined;
  }
  return diagnosisCodes as string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  HealthCheckRating: unknown
): HealthCheckRating => {
  if (!isHealthCheckRating(HealthCheckRating)) {
    throw new Error(
      'Incorrect or missing HealthCheckRating: ' + HealthCheckRating
    );
  }
  return HealthCheckRating;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
  if (typeof sickLeave !== 'object' || sickLeave === null) {
    return undefined;
  }
  if (!('startDate' in sickLeave && 'endDate' in sickLeave)) {
    return undefined;
  }
  const Fields = sickLeave as {
    startDate: unknown;
    endDate: unknown;
  };
  const parsedSickLeave = {
    startDate: parseDate(Fields.startDate),
    endDate: parseDate(Fields.endDate)
  };
  return parsedSickLeave;
};

const parseDischarge = (discharge: unknown): Discharge | undefined => {
  if (typeof discharge !== 'object' || discharge === null) {
    return undefined;
  }
  if (!('date' in discharge && 'criteria' in discharge)) {
    return undefined;
  }
  const Fields = discharge as {
    date: unknown;
    criteria: unknown;
  };
  const parsedDischarge = {
    date: parseDate(Fields.date),
    criteria: parseString(Fields.criteria, 'criteria')
  };
  return parsedDischarge;
};

const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge
}: EntryField): EntryWithoutId | undefined => {
  const newEntry = {
    description: parseString(description, 'description'),
    date: parseDate(date),
    specialist: parseString(specialist, 'specialist'),
    type: parseEntryType(type),
    diagnosisCodes: parsediagnosisCodes(diagnosisCodes)
  };

  switch (newEntry.type) {
    case 'HealthCheck': {
      const healthCheckEntry: EntryWithoutId = {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return healthCheckEntry;
    }
    case 'OccupationalHealthcare': {
      const occupationalHealthcareEntry: EntryWithoutId = {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(employerName, 'employerName'),
        sickLeave: parseSickLeave(sickLeave)
      };
      return occupationalHealthcareEntry;
    }
    case 'Hospital': {
      const hospitalEntry: EntryWithoutId = {
        ...newEntry,
        type: 'Hospital',
        discharge: parseDischarge(discharge)
      };
      return hospitalEntry;
    }
    default:
      return undefined;
  }
};

export { toNewPatient, toNewEntry };
