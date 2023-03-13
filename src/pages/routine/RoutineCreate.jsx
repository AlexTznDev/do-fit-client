import { useState } from "react";
import AllButtons from "../../components/AllButtons";
import ProfilDescription from "../../components/ProfilDescription";

import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoutineCreate() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [frequency, setFrequency] = useState("");
  const [status, setStatus] = useState("private");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };
  const handlefrequencyChange = (e) => {
    setFrequency(e.target.value);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmitRoutine = async (e) => {
    e.preventDefault();
    const newRoutine = {
      name,
      owner,
      frequency,
      status,
    };

    try {
      const response = await axios.post(
        "http://localhost:5005/api/routine",
        newRoutine
      );
      const IdRoutine = response.data._id;
      navigate(`/routine/${IdRoutine}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mainContainer">
      <ProfilDescription />

      <AllButtons />

      <form style={{ padding: "2rem" }}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

        <br />
        <br />

        <label htmlFor="owner">Owner</label>
        <input
          type="text"
          name="owner"
          value={owner}
          onChange={handleOwnerChange}
        />

        <br />
        <br />

        <label htmlFor="frequency">Frequency</label>
        <input
          type="text"
          name="frequency"
          value={frequency}
          onChange={handlefrequencyChange}
        />

        <br />
        <br />

        <label htmlFor="status">Status</label>
        <select
          type="text"
          name="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
      </form>

      <button onClick={handleSubmitRoutine}>Ok</button>
    </div>
  );
}

export default RoutineCreate;
