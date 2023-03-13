import { Link } from "react-router-dom";

function AllButtons() {
  return (

  
    <div className="containerBtnHome">
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
