import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Button } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import { Patient, Entry } from "../types";
import EntryDetails from "../components/EntryDetails";
import {
  HospitalModal,
  HealthCheckModal,
  OccupationalModal,
  EntryFormValues,
} from "../AddEntryModal";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [error, setError] = React.useState<string>();
  const [modalHealthCheckOpen, setHealthCheckModal] =
    React.useState<boolean>(false);
  const [modalHospitalOpen, setHospitalModal] = React.useState<boolean>(false);
  const [modalOccupationalOpen, setOccupationalModal] =
    React.useState<boolean>(false);

  const closeModal = (
    set: React.Dispatch<React.SetStateAction<boolean>>
  ): void => {
    set(false);
    setError(undefined);
  };

  if (!id) {
    return null;
  }

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch, id]);

  const patient: Patient = patients[id];

  if (!patient) {
    return <p>loading info..</p>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(id, newEntry));
      closeModal(setHealthCheckModal);
      closeModal(setHospitalModal);
      closeModal(setOccupationalModal);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const GenderIcons = {
    male: <Male />,
    female: <Female />,
    other: <Transgender />,
  };

  return (
    <div className="App">
      <h2>
        {patient.name}
        {GenderIcons[patient.gender]}
      </h2>
      <p>
        ssn: {patient.ssn} <br />
        occupation: {patient.occupation}
      </p>
      <h3>entries</h3>
      {patient.entries?.map((entry) => (
        <div key={entry.id}>
          <EntryDetails entry={entry} />
        </div>
      ))}
      ADD NEW ENTRY:&nbsp;
      <HealthCheckModal
        modalOpen={modalHealthCheckOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={() => closeModal(setHealthCheckModal)}
      />
      <Button variant="contained" onClick={() => setHealthCheckModal(true)}>
        HEALTHCHECK
      </Button>
      &nbsp;&nbsp;&nbsp;
      <HospitalModal
        modalOpen={modalHospitalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={() => closeModal(setHospitalModal)}
      />
      <Button variant="contained" onClick={() => setHospitalModal(true)}>
        HOSPITAL
      </Button>
      &nbsp;&nbsp;&nbsp;
      <OccupationalModal
        modalOpen={modalOccupationalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={() => closeModal(setOccupationalModal)}
      />
      <Button variant="contained" onClick={() => setOccupationalModal(true)}>
        OCCUPATIONAL
      </Button>
    </div>
  );
};

export default PatientPage;
