import React from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { Female, Male, Transgender } from "@mui/icons-material";

const PatientPage = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  React.useEffect(() => {
    const fetchPatient = async () => {
      if (!localStorage.getItem(`${id}`)) {
        try {
          const { data: patientFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(updatePatient(patientFromApi));
          localStorage.setItem(`${id}`, JSON.stringify(patientFromApi));
        } catch (e) {
          console.error(e);
        }
      }
    };
    void fetchPatient();
  }, [dispatch]);

  const localStoragePatient: string | null = localStorage.getItem(`${id}`);

  const patient: Patient = localStoragePatient
    ? (JSON.parse(localStoragePatient) as Patient)
    : patients[id];

  if (!patient || !diagnoses) {
    return <p>loading info..</p>;
  }

  const genderIcon = () => {
    switch (patient.gender) {
      case "male":
        return <Male></Male>;
      case "female":
        return <Female></Female>;
      case "other":
        return <Transgender></Transgender>;
      default:
        throw new Error("gender not valid");
    }
  };

  return (
    <div className="App">
      <h2>
        {patient.name}
        {genderIcon()}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3>
      {patient.entries?.map((entry) => (
        <div key={entry.id}>
          {entry.date} {entry.description}
          <ul>
            {entry.diagnosisCodes?.map((code) => (
              <li key={code}>
                {code} {diagnoses[code]?.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
