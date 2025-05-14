# React + Vite + Firebase Authentication

## Setup

### Vite 
I started by setting up my project by running:

````powershell
npm create vite@latest .
````

And just followed it in the terminal by giving it a name, type of language etc. 

### Firebase

Then i installed Firebase 

````powershell
npm install firebase
````

* I went into the console on Firebases website. 
* Created a project and added it as an Web-App.
* I followed it step-by-step and later it will automatically configure a script for you almost as mine in ./src/firebase.js. 
* I have then chosen to hide my keys in an .env file.

### Code

* I made the src/AuthContext.jsx which keeps trak of a users state (logged in/ logged out)
* I made the src/AuthFrom.jsx which is a Form for the user to be able to login. 
* I Updated src/App.jsx to display and handle the users state in the frontend
* I Updated src/main.jsx to import the needed packages

### Run

````powershell
npm run dev
````