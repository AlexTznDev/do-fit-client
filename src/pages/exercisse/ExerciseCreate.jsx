import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AllButtons from "../../components/AllButtons";

function ExerciseCreate() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [creador, setCreador] = useState("");
  const [category, setCategory] = useState("Abbs");
  const [calories, setCalories] = useState(0);
  const [description, setDescription] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [tagline, settagline] = useState("");
  const [image, setimage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCreadorChange = (e) => {
    setCreador(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleVideoUrlChange = (e) => {
    setvideoUrl(e.target.value);
  };
  const handleTaglineChange = (e) => {
    settagline(e.target.value);
  };
  const handleImageChange = (e) => {
    setimage(e.target.value);
  };
  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleSubmitExercisse = async (e) => {
    e.preventDefault();
    const newExercise = {
      name,
      creador,
      category,
      calories,
      description,
      videoUrl,
      tagline,
      image,
    };

    try {
      await axios.post("http://localhost:5005/api/exercise", newExercise);
      navigate("/exercise");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Add exercise</h2>

      <br />

      <AllButtons/>
      <br />
      <br /> 

      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <br />

        <label htmlFor="creador">Creador</label>
        <input
          type="text"
          name="creador"
          value={creador}
          onChange={handleCreadorChange}
        />
        <br />
        <br />

        <label htmlFor="category">Category</label>
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
          <option value="Breathing">Breathing</option>
          <option value="Cardio">Cardio</option>
          <option value="body weight">body weight</option>

        </select>

        <br />
        <br />

        <label htmlFor="calories">Calories</label>
        <input
          type="number"
          name="calories"
          value={calories}
          onChange={handleCaloriesChange}
        />
        <br />
        <br />

        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <br />
        <br />

        <label htmlFor="videoUrl">Video Url</label>
        <input
          type="text"
          name="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
        />
        <br />
        <br />

        <label htmlFor="tagline">Tagline</label>
        <input
          type="text"
          name="tagline"
          value={tagline}
          onChange={handleTaglineChange}
        />
        <br />
        <br />

        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={handleImageChange}
        />
        <br />
        <br />

        <button onClick={handleSubmitExercisse}>Create</button>
      </form>
    </div>
  );
}

export default ExerciseCreate;
