import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { exerciseDetailService } from "../../services/exercise.services";
import { exerciseEditService } from "../../services/exercise.services";

import AllButtons from "../../components/AllButtons";

import logoWhite from "../../logo/logoDofitblanc.png";
import imgBG from "../../image/imgCreateExo.jpg";

function ExerciseEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState(0);
  const [description, setDescription] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [tagline, settagline] = useState("");
  const [image, setimage] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
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

  useEffect(() => {
    getDataExercise();
  }, []);

  const getDataExercise = async () => {
    try {
      const response = await exerciseDetailService(id);

      const {
        name,
        calories,
        category,
        description,
        image,
        tagline,
        videoUrl,
      } = response.data;

      setName(name);
      setCategory(category);
      setCalories(calories);
      setDescription(description);
      setvideoUrl(videoUrl);
      settagline(tagline);
      setimage(image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitExercisse = async (e) => {
    e.preventDefault();
    const updateExercise = {
      name,
      category,
      calories,
      description,
      videoUrl,
      tagline,
      image,
    };

    try {
      await exerciseEditService(id, updateExercise);
      navigate(`/exercise/${id}/details`);
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
          <form>
            <label style={{ color: "#fff" }} htmlFor="category">
              Category
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
              <option value="Breathing">Breathing</option>
              <option value="Cardio">Cardio</option>
              <option value="body weight">body weight</option>
            </select>

<br />
            <label style={{ color: "#fff" }} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              style={{ width: "15rem" }}
            />

            <label style={{ color: "#fff" }} htmlFor="calories">
              Calories
            </label>
            <input
              type="number"
              name="calories"
              value={calories}
              onChange={handleCaloriesChange}
              style={{ width: "15rem" }}
            />

            <label style={{ color: "#fff" }} htmlFor="description">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              style={{ width: "15rem" }}
            />

            <label style={{ color: "#fff" }} htmlFor="videoUrl">
              Video Url
            </label>
            <input
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              style={{ width: "15rem" }}
            />

            <label style={{ color: "#fff" }} htmlFor="tagline">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={tagline}
              onChange={handleTaglineChange}
              style={{ width: "15rem" }}
            />

            <label
              style={{ color: "#fff", paddingTop: "15px" }}
              htmlFor="image"
            >
              Image
            </label>
            <input
              type="text"
              name="image"
              value={image}
              onChange={handleImageChange}
              style={{ width: "15rem" }}
            />

            <br />
            <br />

            <button onClick={handleSubmitExercisse}>Edit exercise</button>
          </form>
        </div>
      </div>
      <AllButtons />
    </div>
  );
}

export default ExerciseEdit;
