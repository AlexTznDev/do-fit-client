
import './App.css';
import {Routes, Route} from 'react-router';

import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/Profile';

import Exercise from "./pages/exercisse/Exercise"
import ExerciseDetails from "./pages/exercisse/Exercisedetails.jsx"
import ExerciseCreate from './pages/exercisse/ExerciseCreate';
import ExerciseEdit from './pages/exercisse/ExerciseEdit';

function App() {
  return (
    <div className="App">


<Routes>
  
<Route path="/" element={ <Home/> }/>

<Route path="/profile" element={<Profile/>}/>
<Route path="/signup" element={ <Signup/> }  />
<Route path="/login" element={ <Login/> }  />

<Route path="/exercise" element={ <Exercise/> }/>
<Route path="/exercise/:id/details" element={ <ExerciseDetails/> }/>
<Route path="/exercise/:id/edit" element={ <ExerciseEdit/> }/>
<Route path="/exercise/create" element={ <ExerciseCreate/> }/>


</Routes>
      


    </div>
  );
}

export default App;
