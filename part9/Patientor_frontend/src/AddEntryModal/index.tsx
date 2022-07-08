import React from "react";
import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import HealthCheckForm, { HealthCheckValues } from "./HealthCheckForm";
import HospitalForm, { HospitalValues } from "./HospitalForm";
import OccupationalForm, { OccupationalValues } from "./OccupationalForm";

export type EntryFormValues =
  | HealthCheckValues
  | HospitalValues
  | OccupationalValues;
interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

const HealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new health check entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <HealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

const HospitalModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new hospital entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <HospitalForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

const OccupationalModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new occupational entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <OccupationalForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
  </Dialog>
);

export { HospitalModal, HealthCheckModal, OccupationalModal };
