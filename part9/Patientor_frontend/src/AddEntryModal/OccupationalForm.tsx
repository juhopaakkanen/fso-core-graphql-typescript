import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { isDate, isOptionalDate } from "../utils/helpers";
import { TextField, DiagnosisSelection } from "../components/FormField";
import { OccupationalHealthcareEntryWithoutId } from "../types";
import { useStateValue } from "../state";

export type OccupationalValues = OccupationalHealthcareEntryWithoutId;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryWithoutId) => void;
  onCancel: () => void;
}

export const OccupationalForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        type: "OccupationalHealthcare",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.name = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = "Malformatted date";
        }
        if (
          values.sickLeave !== undefined &&
          !isOptionalDate(values.sickLeave.startDate)
        ) {
          errors.startDate = "Malformatted date";
        }
        if (
          values.sickLeave !== undefined &&
          !isOptionalDate(values.sickLeave.endDate)
        ) {
          errors.endDate = "Malformatted date";
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer"
              placeholder="Employer"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Sickleave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="Sickleave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalForm;
