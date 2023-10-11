import { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AuthLogin from "../Auth/AuthLogin";
import "../Auth/Auth.scss";

export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [viewComponent, setViewComponent] = useState("signup");

  function handleSignUp(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="auth">
      {viewComponent === "signup" ? (
        <div>
          <div className="auth__profile">
            <h1>Skapa ett konto</h1>
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
            <button>Skapa konto</button>
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
