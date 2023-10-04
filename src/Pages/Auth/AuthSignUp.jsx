import { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AuthSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <form onSubmit={handleSignUp}>
        <h1>Skapa ett konto</h1>
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
    </div>
  );
}
