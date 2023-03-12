
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

import IsPrivate from './components/isPrivate';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <div className="App">


<Routes>
  
<Route path="/" element={ <Home/> }/>

<Route path="/profile" element={<IsPrivate><Profile/></IsPrivate>}/>
<Route path="/profile/:id/edit" element={<IsPrivate><ProfileEdit/></IsPrivate>}/>

<Route path="/signup" element={ <Signup/> }  />
<Route path="/login" element={ <Login/> }  />

<Route path="/exercise" element={<IsPrivate><Exercise/></IsPrivate> }/>
<Route path="/exercise/:id/details" element={<IsPrivate><ExerciseDetails/></IsPrivate> }/>
<Route path="/exercise/:id/edit" element={<IsPrivate><ExerciseEdit/></IsPrivate>}/>
<Route path="/exercise/create" element={<IsPrivate><ExerciseCreate/></IsPrivate>}/>


</Routes>
      


    </div>
  );
}

export default App;
