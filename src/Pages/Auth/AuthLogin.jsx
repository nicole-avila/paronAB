import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSignIn(e) {
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
      <h1>Logga in</h1>
      <form onSubmit={handleSignIn} className="auth__container">
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
    </div>
  );
}
