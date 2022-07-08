import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { HealthCheckValues } from "./HealthCheckForm";
import { HospitalValues } from "./HospitalForm";
import { OccupationalValues } from "./OccupationalForm";

export type EntryFormValues =
  | HealthCheckValues
  | HospitalValues
  | OccupationalValues;
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  Form: React.FC<{
    onSubmit: (values: EntryFormValues) => void;
    onCancel: () => void;
  }>;
}

const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  Form,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <Form onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
