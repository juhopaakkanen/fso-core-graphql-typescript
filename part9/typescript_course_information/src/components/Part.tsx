import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  const basicInfo = (
    <b>
      {coursePart.name} {coursePart.exerciseCount}
    </b>
  );

  switch (coursePart.type) {
    case "normal":
      return (
        <p>
          {basicInfo} <br />
          <em>{coursePart.description}</em>
        </p>
      );
    case "groupProject":
      return (
        <p>
          {basicInfo} <br />
          <>project exercises {coursePart.groupProjectCount}</>
        </p>
      );
    case "submission":
      return (
        <p>
          {basicInfo} <br />
          <em>{coursePart.description}</em> <br />
          <>submit to {coursePart.exerciseSubmissionLink}</>
        </p>
      );
    case "special":
      return (
        <p>
          {basicInfo} <br />
          <em>{coursePart.description}</em> <br />
          <>required skills: {coursePart.requirements.join(", ")}</>
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
