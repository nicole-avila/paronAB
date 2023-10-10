import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/AuthLogin";
import UpdateStock from "./Pages/UpdateStock/UpdateStock";

/*
Har använt mig utav useState och useEffekt hook för att uppdatera och hantera 
autentiseringsstatusen för användaren. 
Så om användaren är inloggad, uppdaterar authUser till användarobjektet OM anvädnaren INTE är 
inloggad, uppdaterar authUser till NULL, skickar iväg det state till Home för en bekräftelse att man är inloggad
på sin mail. Sedan OM authUser är sann (alltså inloggad) så visa en button för att 'logga ut' annars visa en länk till Logga in sidan. 
*/

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  function handelSignOut() {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="App">
      <Router>
        <nav>
          <Link to="/paronAB">Home</Link>
          {authUser ? (
            <div>
              <Link to="/paronAB/update-stock">Uppdatera Saldo</Link>
              <button onClick={handelSignOut}>Logga ut</button>
            </div>
          ) : (
            <Link to="/paronAB/auth">Logga in</Link>
          )}
        </nav>
        <Routes>
          <Route path="/paronAB" element={<Home authUser={authUser} />} />
          <Route path="/paronAB/auth" element={<Auth />} />
          <Route path="/paronAB/update-stock" element={<UpdateStock />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
