# Do-Fit

## Description

Our application is designed to help users maintain a healthy lifestyle by tracking their physical activities, workouts. The app allows the user to personalize workout plans and also includes social features, allowing users to connect with friends and share their achievements.

## User Stories

-  **404:** As visitor/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As visitor I can sign up in the app so that I can start checking the exercises and create my own routines. 
-  **Login:** As a user I can login to the platform so that I can see my fixed routines, share them or see other users' routines.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Create Routines** As a user I can create personalized routines and add my favorites exercises to them.
-  **Exercises List** As a user I can see different exercises and add or remove them from my routines.
-  **Start Routines** Once the routines are created, I can use them whenver I want! It includes a timer!.
-  **Search Users** As a user I can find other users by typing their names so that I can use their routines (in this case other users' routines can't be modified in any aspect).
-  **Follow Users** As a user I can follow other users in order to check and why not use their routines.
-  **Create / Edit / Remove** As a non user (admin) I can have have access to insert new Execercises, edit and remove them, so we can keep your app updated.
-  
## Backlog

User profile:

- Add more specific information (age, height, weight, etc)
- Be able to interact (send messages to other users) so they can fix a workout session together
- Add exercices, routines to Favorites.
- Add a role for "Trainers"

Routines / Exercices:

- Set a Calendar, users will be able to schedule when to start their workout sessions.
- Give a total information of calories burned per exercise completed in your Rotuine and per Routine.
- Mark your routine as "Done" when you've acomplished that.
  
# Client

## Routes

- / => Homepage
- /error => 404
- /* => Page doesn't exist 
- /profile => User profile
- /profile/:id/edit => Profile edition

- /signup => Signup form
- /login => Login form



- /exercise => Exercises list 
- /exercise/:id/details => Exercise details
- /exercise/:id/edit => Update exercise
- /exercise/create => Create new exercise

- /routine/:id => Routine details
- /routine/create => Routine creation form
- /routine/:idRoutine/exercise => Exercises in routine
- /routine/:idRoutine/exercise/add => Add exercises to routine
- /routine/:idRoutine/exercise/:idExerciseInArray/edit => Routine update form

- /routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData => Starting routine
- /routine/:idRoutine/exercise/:idExerciseInArray/start/:lengthData/user => Starting other user's routine Private 

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- User profile (user only)
- Profile edition (user only)
- Exercises list (user only)
- Exercise details (user only)
- Update exercise (admin only) 
- Create new exercise (admin only)
- Routine details (user only)
- Routine creation form (user only)
- Exercises in routine (user only)
- Add exercises to routine (user only)
- Routine update form (user only)
- Starting routine (user only)
- Starting other user's routine (user only)
- 404 Page (public)
- Not Found page (public)

## Components

- Situational components
  - AllButtons
  - isAdmin
  - isPrivate
  - SarchFriends
  - SearchingSpinner

## IO


## Services

- Auth Service
  - signupSerivce
  - loginService
  - verifyService
   
- Exercises Service
  - exerciseService / List
  - exerciseCreateService / create
  - exerciseDetailService / Details
  - exerciseEditSerivce / Edit
  - exerciseDeleteService / Delete

- Profile Service
  - profileService / user profile Data
  - profileEditService / edit profile
  - profileUserService / specific User Data
  - followFoundUserService / Add users to other User's data.    
  
- Routine Service
  - routineService / Routines list
  - routineDetailService / Details of a specific routine
  - crearRoutineService / Create routine
  - rotuineUserService / another user's routines
  - ExerciseIbRoutineDetail / Details of routines' exercises
  - RemoveExerciseFromRoutine / remove exercise in routine
  - EditExerciseFromRoutine / update exercise in routine
  - deleteRoutineService / delete routine
  - AddExerciseToRoutine / adds exercises in routine
  
- Search Service 
  - searchUserService / Gets all users
  
-  Upload Image service 
   - upliadImageService / uploads the image (input)  

# Server

## Models

User model

```
name - String // required
email - String // required & unique
password - String // required
friends - [ObjectID<User>]
age - Num
weight - Num
height - Num
imageProfile - String // default
timestamps - true
```

Routine model

```
owner - ObjectID<User> // required
exercises - exercisesId / ObjectID<Exercise> // repeticion, series, chronometro
category - String
frequency - String
status - String (public/private)

```
Exercise model

```
creador- ObjectID<User>
category - String
calories - Number
description - String
tagline - String
videoUrl - String
image: String
```

## API Endpoints/Backend Routes

### Auth Routes
- POST /auth/signup
  - body:
    - username
    - email
    - password
    - friends
    - age
    - weight
    - height
  
- POST /auth/login
  - body:
    - email
    - password
  
- GET /auth/verify

### Profile Routes
  
- GET /profile/ => user Information
- PATCH /profile/:id => Edits user information
  - body:
    - name
    - imageProfile
    - age
    - weight
    - height
- GET /profile/:id => gets details of another user profile

### Exercise Routes
- GET /exercise/ => exercise List
- POST /exercise/ => creates exercise
  - body:
    - name,
    - category
    - calories
    - description
    - videoUrl
    - tagline
    - image
- GET /exercise/:id => exercise details
- PATCH /exercise/:id => updates an exercise
- DELTE /exercise/:id => deltes an exercise

### Routine Routes
- GET /routine/ => all routines list
- POST /routine/ => creates a routine
  - body:
    - name
    - owner
    - frequency
    - status
    - category
    - exercise
- GET /routine/:id => details of aroutine
- PATCH /routine/:idRoutine/:idExerciseInArray/edit => edits propertys of a exercise in routine
- PATCH /routine/:id => Adds exercise in routine
  - body:
    - exercisesId
    - series
    - repeticion
    - chronometro
- GET /routine/:idRoutine/:idExerciseInArray => details of one exercise in routine
- PATCH /routine/:id/:idExereciseInArray => Deletes exercise from array of execises
- DELETE /routine/:id => deletes routine
  
### Search Routes
- GET /search/ => gets all users

### Upload Routes
- POST /upload/ => uploads images (cloudinary)
  
## Links

### Git

- Collaborators:
  - Alexandre Tuysuzian (https://github.com/AlexTznDev)
  - Victor Mamani (https://github.com/AVikhal)  
- Repositories

[Client repository Link](https://github.com/AlexTznDev/do-fit-client)
[Server repository Link](https://github.com/AlexTznDev/do-fit-server)

[Deploy Link](https://do-fit.netlify.app/)

### Slides

- My Slides
[Slides Link](http://slides.com)