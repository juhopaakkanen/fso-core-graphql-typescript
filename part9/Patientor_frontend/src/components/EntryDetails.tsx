import { LocalHospital, Work, MedicalServices } from "@mui/icons-material/";

import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../types";
import listDiagnoses from "../utils/listDiagnoses";
import HealthCheckIcon from "../utils/HealthCheckIcon";
import assertNever from "../utils/assertNever";

const entryStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: "solid",
  borderWidth: 2,
  marginBottom: 5,
};

const HospitalElement = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div style={entryStyle}>
      {entry.date} <LocalHospital /> <br />
      <em>{entry.description}</em> <br />
      diagnose by {entry.specialist} <br />
      discharged: {entry.discharge?.date || "no"} <br />
      criteria: {entry.discharge?.criteria || "not available"}
      {listDiagnoses(entry)}
    </div>
  );
};

const OccupationalElement = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div style={entryStyle}>
      {entry.date} <Work /> {entry.employerName} <br />
      <em>{entry.description}</em> <br />
      diagnose by {entry.specialist} <br />
      sickleave: {entry.sickLeave?.startDate || "no"} {entry.sickLeave?.endDate}
      {listDiagnoses(entry)}
    </div>
  );
};

const HealthCheckElement = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div style={entryStyle}>
      {entry.date} <MedicalServices /> <br />
      <em>{entry.description}</em> <br />
      <HealthCheckIcon rating={entry.healthCheckRating} /> <br />
      diagnose by {entry.specialist}
      {listDiagnoses(entry)}
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalElement entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalElement entry={entry} />;
    case "HealthCheck":
      return <HealthCheckElement entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
