import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((coursePart, i) => (
        <Part key={i} coursePart={coursePart} />
      ))}
    </div>
  );
};

export default Content;
