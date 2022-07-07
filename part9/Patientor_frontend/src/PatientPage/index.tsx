import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Female, Male, Transgender } from "@mui/icons-material";
import { Button } from "@material-ui/core";

import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient, addEntry } from "../state";
import { Patient, Entry } from "../types";
import EntryDetails from "../components/EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddHealthCheckEntryForm";
import AddHospitalEntryModal from "../AddHospitalEntryModal.tsx";
import AddOccupationalEntryModal from "../AddOccupationalEntryModal.tsx";

const PatientPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalHealthCheckOpen, setHealthCheckModalOpen] =
    React.useState<boolean>(false);
  const [modalHospitalOpen, setHospitalModalOpen] =
    React.useState<boolean>(false);
  const [modalOccupationalOpen, setOccupationalModalOpen] =
    React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();

  const openHealthCheckModal = (): void => setHealthCheckModalOpen(true);
  const openHospitalModal = (): void => setHospitalModalOpen(true);
  const openOccupationalModal = (): void => setOccupationalModalOpen(true);

  const closeHealthCheckModal = (): void => {
    setHealthCheckModalOpen(false);
    setError(undefined);
  };

  const closeHospitalModal = (): void => {
    setHospitalModalOpen(false);
    setError(undefined);
  };

  const closeOccupationalModal = (): void => {
    setOccupationalModalOpen(false);
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
      closeHealthCheckModal();
      closeHospitalModal();
      closeOccupationalModal();
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
      <AddEntryModal
        modalOpen={modalHealthCheckOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHealthCheckModal}
      />
      <Button variant="contained" onClick={() => openHealthCheckModal()}>
        HEALTHCHECK
      </Button>
      &nbsp;&nbsp;&nbsp;
      <AddHospitalEntryModal
        modalOpen={modalHospitalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeHospitalModal}
      />
      <Button variant="contained" onClick={() => openHospitalModal()}>
        HOSPITAL
      </Button>
      &nbsp;&nbsp;&nbsp;
      <AddOccupationalEntryModal
        modalOpen={modalOccupationalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeOccupationalModal}
      />
      <Button variant="contained" onClick={() => openOccupationalModal()}>
        OCCUPATIONAL
      </Button>
    </div>
  );
};

export default PatientPage;
