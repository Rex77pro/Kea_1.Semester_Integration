// src/App.jsx
import React from "react";
import { useAuth } from "./AuthContext";
import AuthForm from "./AuthForm";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./app.css";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="App" style={{ padding: 20 }}>
      {user ? (
        <>
          <p>Du er logget ind som <strong>{user.email}</strong></p>
          <button onClick={() => signOut(auth)}>
            Log ud
          </button>
        </>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}
