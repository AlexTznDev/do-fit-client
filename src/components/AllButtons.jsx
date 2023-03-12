import { Link } from "react-router-dom";

function AllButtons() {
  return (
    <div>
      <Link className={"ButtonHome"} to={"/exercise"}>
        Exercise
      </Link>
      <Link className={"ButtonHome"} to={"/profile"}>
        My routines
      </Link>

    </div>
  );
}

export default AllButtons;
