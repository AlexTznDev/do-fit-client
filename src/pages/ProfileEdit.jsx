import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  profileEditService,
  profileSerivce,
} from "../services/profile.services";
import { uploadImageService } from "../services/upload.services";

function ProfileEdit() {
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const [username, setUsername] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);

  //!cloudinary
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  //!!!!!!!

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUserAgeChange = (event) => {
    setUserAge(event.target.value);
  };

  const handleUserHeightChange = (event) => {
    setUserHeight(event.target.value);
  };

  const handleUserWeightChange = (event) => {
    setUserWeight(event.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await profileSerivce();
      console.log(response.data);
      const { name, imageProfile, age, weight, height } = response.data;
      console.log(imageProfile);
      setUsername(name);
      setUserAge(age);
      setUserWeight(weight);
      setUserHeight(height);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const updatedProfileInformation = {
      name: username,
      imageProfile: imageUrl,
      age: userAge,
      weight: userWeight,
      height: userHeight,
    };

    try {
      await profileEditService(id, updatedProfileInformation);
      navigate("/profile");
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
    <div>
      <h3>Edit Profile</h3>

      <form>
        <label htmlFor="name">Username: </label>
        <input
          type="text"
          name="name"
          value={username}
          onChange={handleUsernameChange}
        />
        <br />
        <label htmlFor="imageProfile">Profile picture: </label>
        <input type="file" name="imageProfile" onChange={handleFileUpload} />
        <br />
        <label htmlFor="age">Age: </label>
        <input
          type="number"
          name="age"
          value={userAge}
          onChange={handleUserAgeChange}
        />
        <br />
        <label htmlFor="weight">Weight: </label>
        <input
          type="number"
          name="weight"
          value={userWeight}
          onChange={handleUserWeightChange}
        />
        <br />
        <label htmlFor="height">Height: </label>
        <input
          type="number"
          name="height"
          value={userHeight}
          onChange={handleUserHeightChange}
        />
        <br />

        {!isUploading ? (
          <button onClick={handleUpdateProfile}>Update</button>
        ) : (
          <h2>...is uploading</h2>
        )}
      </form>
    </div>
  );
}

export default ProfileEdit;
