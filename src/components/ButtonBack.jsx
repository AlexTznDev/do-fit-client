import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

function ButtonBack() {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(-1);
    };

  return (
    <div>
    <button onClick={handleClick}>
      <IoIosArrowBack  size="1.3rem" color="f4a261"/>
    </button>
  </div>
  )
}

export default ButtonBack