import { useState } from "react";
import AllButtons from "../../components/AllButtons";
import { useNavigate } from "react-router-dom";
//* all services import
import { crearRoutineService } from "../../services/routine.services";

import logoWhite from "../../logo/logoDofitblanc.png";
import imgBG from "../../image/createRoutine.jpg";

function RoutineCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("");
  const [status, setStatus] = useState("private");
  const [category, setcategory] = useState("Abbs");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlefrequencyChange = (e) => {
    setFrequency(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setcategory(e.target.value);
  };

  const handleSubmitRoutine = async (e) => {
    e.preventDefault();
    const newRoutine = {
      name,
      frequency,
      status,
      category
    };

    try {
      const response = await crearRoutineService(newRoutine);
      const IdRoutine = response.data._id;
      navigate(`/routine/${IdRoutine}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer justify">


      <div className="containerLogohome">
        <img src={logoWhite} alt="logo" />
      </div>

      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "fixed",
          zIndex: "-1",
        }}
      >
        <img
          src={imgBG}
          alt="bachGDimgForm"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="ContainerForm">
          <form style={{ padding: "2rem" }}>
            <h1 style={{ color: "#fff" }}>Create routine</h1>
            <br />
            <br />

            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
            />

          
            <label htmlFor="frequency"></label>
            <input
              type="text"
              name="frequency"
              value={frequency}
              onChange={handlefrequencyChange}
              placeholder="Frequency"
            />

            <br />
            

            <label style={{ color: "#fff" }} htmlFor="status">
              Status
            </label>
            <select
              type="text"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            <br />


            <label style={{ color: "#fff" }} htmlFor="status">
            category
            </label>
            <select
              type="text"
              name="category"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="Abbs">Abbs</option>
              <option value="Upper body">Upper body</option>
              <option value="Lower body">Lower body</option>
              <option value="Stretching">Stretching</option>
              <option value="Breathings">Breathings</option>
              <option value="Cardio">Cardio</option>
              <option value="body weight">Body weight</option>
            </select>

            <br />
            <button onClick={handleSubmitRoutine}>Ok</button>
          </form>
        </div>
      </div>

      <AllButtons />
    </div>
  );
}

export default RoutineCreate;
