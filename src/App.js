
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

import RoutineCreate from './pages/routine/RoutineCreate';
import RoutineDetail from './pages/routine/RoutineDetail';
import RoutineExercise from './pages/routine/RoutineExercise';


import IsPrivate from './components/isPrivate';
import ProfileEdit from './pages/ProfileEdit';
import SearchFriends from './components/SearchFriends';
import ProfileFoundUser from './pages/ProfileFoundUser';

function App() {
  return (
    <div className="App">


<Routes>
<Route path="/search" element={<SearchFriends/>}></Route>
<Route path="/profile/:idFoundUser" element={<ProfileFoundUser/>}/>



<Route path="/" element={ <Home/> }/>

<Route path="/profile" element={<IsPrivate><Profile/></IsPrivate>}/>
<Route path="/profile/:id/edit" element={<IsPrivate><ProfileEdit/></IsPrivate>}/>

<Route path="/signup" element={ <Signup/> }  />
<Route path="/login" element={ <Login/> }  />



<Route path="/exercise" element={<IsPrivate><Exercise/></IsPrivate> }/>
<Route path="/exercise/:id/details" element={<IsPrivate><ExerciseDetails/></IsPrivate>}/>
<Route path="/exercise/:id/edit" element={<IsPrivate><ExerciseEdit/></IsPrivate>}/>
<Route path="/exercise/create" element={<IsPrivate><ExerciseCreate/></IsPrivate>}/>

<Route path="/routine/:id" element={<RoutineDetail/>}></Route>
<Route path="/routine/:id/user" element={<RoutineDetail/>}></Route>

<Route path="/routine/create" element={<RoutineCreate/>}></Route>
<Route path="/routine/:idRoutine/exercise" element={<RoutineExercise/>}></Route>
<Route path="/routine/:idRoutine/exercise/add" element={<RoutineExercise/>}></Route>
<Route path="/routine/:idRoutine/exercise/:idExercise" element={<ExerciseDetails/>}></Route>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/edit" element={<RoutineExercise/>}></Route>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/user" element={<RoutineExercise/>}></Route>


<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData" element={<RoutineExercise/>}></Route>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData/user" element={<RoutineExercise/>}></Route>
<Route path="/routine/create" element={<RoutineCreate/>}></Route>


</Routes>
      


    </div>
  );
}

export default App;
