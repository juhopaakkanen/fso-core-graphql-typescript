import { HealthCheckRating } from "../types";
import { Favorite } from "@mui/icons-material/";

const HealthCheckIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case 0:
      return <Favorite style={{ fill: "green" }} />;
    case 1:
      return <Favorite style={{ fill: "yellow" }} />;
    case 2:
      return <Favorite style={{ fill: "orange" }} />;
    case 3:
      return <Favorite style={{ fill: "red" }} />;
    default:
      throw new Error(`invalid rating value: ${rating}`);
  }
};

export default HealthCheckIcon;
