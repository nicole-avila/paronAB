import { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthLogin from "../Auth/AuthLogin";
import "../Auth/Auth.scss";
import { useNavigate } from "react-router-dom";

export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [viewComponent, setViewComponent] = useState("signup");
  const navigate = useNavigate();

  function handleSignUp(e) {
    e.preventDefault();

    if (password.length < 6) {
      setPasswordError("Lösenordet måste innehålla minst 6 tecken");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/paronAb/home");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="auth">
      {viewComponent === "signup" ? (
        <div className="auth__container">
          <div className="auth__profile">
            <h1>Skapa ett konto</h1>
          </div>

          <form onSubmit={handleSignUp} className="auth__form">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onClick={() => setPasswordError("")}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            <p className="auth__password-text">{passwordError}</p>
            <button className="auth__signup-btn">Skapa konto</button>
          </form>
          <button
            onClick={() => setViewComponent("login")}
            className="auth__login-btn"
          >
            logga in
          </button>
        </div>
      ) : (
        <AuthLogin />
      )}
    </div>
  );
}
