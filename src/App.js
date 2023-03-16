
import './App.css';
import {Routes, Route} from 'react-router';

import Error from './pages/Error';
import NotFound from './pages/NotFound';

import Home from './pages/Home';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import Profile from './pages/profile/Profile';

import Exercise from "./pages/exercisse/Exercise"
import ExerciseDetails from "./pages/exercisse/Exercisedetails.jsx"
import ExerciseCreate from './pages/exercisse/ExerciseCreate';
import ExerciseEdit from './pages/exercisse/ExerciseEdit';

import RoutineCreate from './pages/routine/RoutineCreate';
import RoutineDetail from './pages/routine/RoutineDetail';
import RoutineExercise from './pages/routine/RoutineExercise';

import logo from "./logo/logo-final.png"

import IsPrivate from './components/isPrivate';
import ProfileEdit from './pages/profile/ProfileEdit';
import SearchFriends from './components/SearchFriends';
import ProfileFoundUser from './pages/profile/ProfileFoundUser';
import IsAdmin from './components/isAdmin';

function App() {
  return (
    <div className="App">

<div className='minWidthMedia'>
  <div className='containerLogo'>
    <img src={logo} alt="logo do fit" />
  </div>
</div>
 
<Routes>
<Route path="/search" element={<IsPrivate><SearchFriends/></IsPrivate>}/>
<Route path="/profile/:idFoundUser" element={<IsPrivate><ProfileFoundUser/></IsPrivate>}/>
<Route path="/profile/:idFoundUser/user" element={<isPrivate><ProfileFoundUser/></isPrivate>}/>



<Route path="/" element={ <Home/> }/>

<Route path="/profile" element={<IsPrivate><Profile/></IsPrivate>}/>
<Route path="/profile/:id/edit" element={<IsPrivate><ProfileEdit/></IsPrivate>}/>

<Route path="/signup" element={ <Signup/> }  />
<Route path="/login" element={ <Login/> }  />



<Route path="/exercise" element={<IsPrivate><Exercise/></IsPrivate> }/>
<Route path="/exercise/:id/details" element={<IsPrivate><ExerciseDetails/></IsPrivate>}/>
<Route path="/exercise/:id/edit" element={<IsAdmin><ExerciseEdit/></IsAdmin>}/>
<Route path="/exercise/create" element={<IsAdmin><ExerciseCreate/></IsAdmin>}/>

<Route path="/routine/:id" element={<IsPrivate><RoutineDetail/></IsPrivate>}/>
<Route path="/routine/:id/user" element={<IsPrivate><RoutineDetail/></IsPrivate>}/>

<Route path="/routine/create" element={<IsPrivate><RoutineCreate/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise/add" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise/:idExercise" element={<IsPrivate><ExerciseDetails/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/edit" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/user" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>


<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>
<Route path="/routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData/user" element={<IsPrivate><RoutineExercise/></IsPrivate>}/>


<Route path="/error" element={<Error />}/>
<Route path="*" element={<NotFound />}/>


</Routes>
      


    </div>
  );
}

export default App;
