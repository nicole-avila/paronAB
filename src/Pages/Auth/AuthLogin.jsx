import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";
import profileIcon from "../../assets/profile-icon.svg";
import AuthSignUp from "./AuthSignUp";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewComponent, setViewComponent] = useState("login");
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/paronAB");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="auth">
      {viewComponent === "login" ? (
        <div>
          <div className="auth__profile">
            <img src={profileIcon} alt="" />
            <h1>Logga in</h1>
          </div>
          <form onSubmit={handleSignUp} className="auth__container">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="passowrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>logga in</button>
          </form>

          <p onClick={() => setViewComponent("signup")}>skapa ett konto</p>
        </div>
      ) : (
        <AuthSignUp />
      )}
    </div>
  );
}
