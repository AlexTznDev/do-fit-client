import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ExerciseEdit() {
  const params = useParams();
  const navigate = useNavigate()
  const { id } = params;

  const [name, setName] = useState("");
  const [creador, setCreador] = useState("");
  const [category, setCategory] = useState("");
  const [colories, setColories] = useState(0);
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
    setColories(e.target.value);
  };

  useEffect(() => {
    getDataExercise();
  }, []);

  const getDataExercise = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/exercise/${id}`
      );

      const {
        name,
        calories,
        category,
        creador,
        description,
        image,
        tagline,
        videoUrl,
      } = response.data;


      setName(name)
      setCreador(creador)
      setCategory(category)
      setColories(calories)
      setDescription(description)
      setvideoUrl(videoUrl)
      settagline(tagline)
      setimage(image)
      



    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitExercisse = async (e) => {
    e.preventDefault();
    const updateExercise = {
      name,
      creador,
      category,
      colories,
      description,
      videoUrl,
      tagline,
      image,
    };

    try {
      await axios.patch(`http://localhost:5005/api/exercise/${id}`, updateExercise);
      navigate(`/exercise/${id}/details`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
          value={colories}
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

        <button onClick={handleSubmitExercisse}>Edit exercise</button>
      </form>
    </div>
  );
}

export default ExerciseEdit;
