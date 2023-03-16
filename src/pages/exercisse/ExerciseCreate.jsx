import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { exerciseCreateService } from "../../services/exercise.services";
import AllButtons from "../../components/AllButtons";

import { uploadImageService } from "../../services/upload.services";

import { AuthContext } from "../../context/auth.context";

import logoWhite from "../../logo/logoDofitblanc.png";
import imgBG from "../../image/createRoutine.jpg";

function ExerciseCreate() {
  const { loggedUser } = useContext(AuthContext);
  console.log(loggedUser);

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [category, setCategory] = useState("Abbs");
  const [calories, setCalories] = useState(0);
  const [description, setDescription] = useState("");
  const [videoUrl, setvideoUrl] = useState("");
  const [tagline, settagline] = useState("");

  //!cloudinary
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  //!!!!!!!

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

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handleSubmitExercisse = async (e) => {
    e.preventDefault();
    const newExercise = {
      name,
      category,
      calories,
      description,
      videoUrl,
      tagline,
      image: imageUrl,
    };

    try {
      await exerciseCreateService(newExercise);
      navigate("/exercise");
    } catch (error) {
      console.log(error);
    }
  };

  //! cloudinary
  const handleFileUpload = async (event) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    if (!event.target.files[0]) {
      // to prevent accidentally clicking the choose file button and not selecting a file
      return;
    }

    setIsUploading(true); // to start the loading animation

    const uploadData = new FormData(); // images and other files need to be sent to the backend in a FormData
    uploadData.append("image", event.target.files[0]);
    //                   |
    //     this name needs to match the name used in the middleware => uploader.single("image")

    try {
      const response = await uploadImageService(uploadData);

      setImageUrl(response.data.imageUrl);
      console.log(response.data.imageUrl);
      //                          |
      //     this is how the backend sends the image to the frontend => res.json({ imageUrl: req.file.path });

      setIsUploading(false); // to stop the loading animation
    } catch (error) {
      navigate("/error");
    }
  };
  //!!!!!!!!!!
  return (
    <div className="mainContainer justify">
      <div className="containerLogohome">
        <img src={logoWhite} alt="logo" />
      </div>

      <div
        style={{
          width: "100vw",
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
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
            />

            <br />

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

            <label htmlFor="calories"></label>
            <input
              type="number"
              name="calories"
              value={calories}
              onChange={handleCaloriesChange}
              placeholder="Calories"
            />

            <label htmlFor="description"></label>
            <input
              type="text"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Description"
            />

            <label htmlFor="videoUrl"></label>
            <input
              type="text"
              name="videoUrl"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              placeholder="Video Url"
            />

            <label htmlFor="tagline"></label>
            <input
              type="text"
              name="tagline"
              value={tagline}
              onChange={handleTaglineChange}
              placeholder="Tagline"
            />

            <br />
            <label style={{ color: "#fff" }} htmlFor="image">
              Exercisse picture:{" "}
            </label>
            <input type="file" name="image" onChange={handleFileUpload} />

            <br />
            <br />
            {loggedUser.role === "admin" && !isUploading ? (
              <button onClick={handleSubmitExercisse}>Create</button>
            ) : null}
          </form>
        </div>
      </div>

      <AllButtons />
    </div>
  );
}

export default ExerciseCreate;
