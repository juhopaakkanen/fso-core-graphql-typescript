import { useStateValue } from "../state";
import { Entry } from "../types";

const listDiagnoses = (entry: Entry) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>
            {code} {diagnoses[code]?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default listDiagnoses;
