import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { BiDumbbell } from "react-icons/bi";

function AllButtons() {
  return (
    <div className="containerBtnHome">
      <Link className={"ButtonHome"} to={"/exercise"}>
        <BiDumbbell size="1.7rem" color="rgba(33, 33, 33, 0.853)"/>
        <p className="textButton">Training</p>
      </Link>

      <Link className={"ButtonHome"} to={"/profile"}>
        <CgProfile size="1.7rem" color="rgba(33, 33, 33, 0.853)"/>
        <p className="textButton">Profil</p>
      </Link>
     {!window.location.href.includes("search") ? <Link to="/search" className={"ButtonHome"}>
        <MdSearch size="2.1rem" color="rgba(33, 33, 33, 0.853)"/>
        <p className="textButton">Search</p>
      </Link> : null}  
      
    </div>
  );
}

export default AllButtons;
