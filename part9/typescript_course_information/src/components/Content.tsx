import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((part, i) => (
        <p key={i}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
