import { Link } from "react-router-dom";
import { MdAddCircle } from "react-icons/md";
import { useState, useEffect } from "react";

import { routineService } from "../../services/routine.services";


import abbs from "../../image/Abbs.jpg"
import bodyWeight from "../../image/bodyWeight.jpg"
import breathing from "../../image/breathing.jpg"
import cardio from "../../image/cardio.jpg"
import lowerBody from "../../image/lowerBody.jpg"
import stretching from "../../image/stretching.jpg"
import upperBody from "../../image/upperBody.jpg"

import logo from "../../logo/logo-final.png"


function ContainerRoutineProfil() {
  const [allRoutines, setallRoutines] = useState(null);

  const [isFetchingRoutine, setisFetchingRoutine] = useState(true);



  useEffect(() => {
    getDataAllRoutines();
  }, []);

  const getDataAllRoutines = async () => {
    try {
      const response = await routineService();
      setallRoutines(response.data);
      console.log(response.data);
      setisFetchingRoutine(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="containerRoutineProfil">
      <div className="wrapperRoutine">
        {isFetchingRoutine ? (
          <h2>...is fetching</h2>
        ) : allRoutines.length !== 0 ? (
          allRoutines.map((eachRoutine) => {
            return (
              <Link
                className="wrapperNameRoutineProfile"
                key={eachRoutine._id}
                to={`/routine/${eachRoutine._id}`}
              >
                <div className="imgBgRoutine">
                {
                  eachRoutine.category === 'Abbs'? (<img src={eachRoutine.category === 'Abbs'? (abbs):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Upper body'? (<img src={eachRoutine.category === 'Upper body'? (upperBody):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Lower body'? (<img src={eachRoutine.category === 'Lower body'? (lowerBody):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Stretching'? (<img src={eachRoutine.category === 'Stretching'? (stretching):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Breathings'? (<img src={eachRoutine.category === 'Breathings'? (breathing):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'Cardio'? (<img src={eachRoutine.category === 'Cardio'? (cardio):(null)} alt="" className="imgExercise"/>):(null)
                }
                {
                  eachRoutine.category === 'body weight'? (<img src={eachRoutine.category === 'body weight'? (bodyWeight):(null)} alt="" className="imgExercise"/>):(null)
                }

                  
                </div>
                  <h2 style={{ color: "black" }}>{eachRoutine.name}</h2>

              </Link>
            );
          })
        ) : (
          <div className="wrapperLogo">
            <div className="containerLogoFound">
              <img src={logo} alt="logo" className="imgWrapper" />
            </div>
          </div>
        )}
      </div>

      <Link
        className={"ButtonHome"}
        style={{ position: "absolute", bottom: "10px" }}
        to={"/routine/create"}
      >
        <MdAddCircle size="2rem" />
        <p className="textButton">Create routine</p>
      </Link>
    </div>
  );
}

export default ContainerRoutineProfil;
