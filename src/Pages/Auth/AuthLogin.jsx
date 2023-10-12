import "./Auth.scss";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profile-icon.svg";
import AuthSignUp from "../AuthSignUp/AuthSignUp";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [viewComponent, setViewComponent] = useState("login");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/paronAB/");
      })
      .catch((error) => {
        console.log(error);
        setMessage("Något fel skedde, försök igen");
      });
  }

  return (
    <div className="auth">
      {viewComponent === "login" ? (
        <div className="auth__container">
          <div className="auth__profile">
            <img src={profileIcon} alt="" />
            <h1>Logga in</h1>
          </div>
          <form onSubmit={handleLogin} className="auth__form">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="auth__login-message">{message}</p>
            <button className="auth__login">logga in</button>
          </form>

          <p
            onClick={() => setViewComponent("signup")}
            className="auth__signup-text"
          >
            {" "}
            <u>skapa ett konto</u>{" "}
          </p>
        </div>
      ) : (
        <AuthSignUp />
      )}
    </div>
  );
}
