import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  function handelSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
        navigate("/paronAB/");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <button onClick={handelSignOut} className="app__logout-btn">
        Logga ut
      </button>
    </div>
  );
}
