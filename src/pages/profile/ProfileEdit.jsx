import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AllButtons from "../../components/AllButtons";
import {
  profileEditService,
  profileSerivce,
} from "../../services/profile.services";
import { uploadImageService } from "../../services/upload.services";

import logoWhite from "../../logo/logoDofitblanc.png";
import imgBG from "../../image/editProfil.jpg";
import SearchingSpinner from "../../components/SearchingSpinner";

function ProfileEdit() {
  
  const navigate = useNavigate();
  const params = useParams();
  
  const { id } = params;

  const [username, setUsername] = useState("");
  const [userAge, setUserAge] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [userImageProfile, setUserImageProfile] = useState("")

  const [isFetching, setisFetching] = useState(true);

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
      const { name, imageProfile, age, weight, height } = response.data;
      setUsername(name);
      setUserAge(age);
      setUserWeight(weight);
      setUserHeight(height);
     // setUserImageProfile(imageProfile)
      console.log(imageProfile)
      setisFetching(false)
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
      navigate("/error");
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
  
  if (isFetching) {
    return <SearchingSpinner/>
  }
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
            <h1 style={{ color: "#fff" }}>Edit profile</h1>
            <br /><br />
            <label htmlFor="name"></label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Username"
            />

            <label htmlFor="imageProfile"></label>
            <input
              type="file"
              name="imageProfile"
              // value={userImageProfile}
              onChange={handleFileUpload}
              placeholder="Profile picture"
            />
            
            <label style={{color:"#fff"}} htmlFor="age">Age :</label>
            <input
              type="number"
              name="age"
              value={userAge}
              onChange={handleUserAgeChange}
              placeholder="Age"
            />
            
            {/* <label htmlFor="weight"></label>
            <input
              type="number"
              name="weight"
              value={userWeight}
              onChange={handleUserWeightChange}
              placeholder="Weight"
            />
            
            <label htmlFor="height">Height: </label>
            <input
              type="number"
              name="height"
              value={userHeight}
              onChange={handleUserHeightChange}
            /> */}
            <br />

            {!isUploading ? (
              <button onClick={handleUpdateProfile}>Update</button>
            ) : (
              <SearchingSpinner/>
            )}
          </form>
        </div>
      </div>

      <AllButtons />
    </div>
  );
}

export default ProfileEdit;
