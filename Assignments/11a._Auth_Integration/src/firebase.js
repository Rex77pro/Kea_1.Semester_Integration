import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBLwU1Wt52skDaq4rKGk1dm1pQs5C1XK4Q",
  authDomain: "kea1sem-authintegration.firebaseapp.com",
  projectId: "kea1sem-authintegration",
  storageBucket: "kea1sem-authintegration.firebasestorage.app",
  messagingSenderId: "326793240879",
  appId: "1:326793240879:web:5a7e1a6de9225d5bd781da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);