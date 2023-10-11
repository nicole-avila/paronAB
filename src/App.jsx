import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/AuthLogin";
import UpdateStock from "./Pages/UpdateStock/UpdateStock";
import TopBar from "./components/TopBar/TopBar";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [topbarVisibility, setTopbarVisibility] = useState(false);

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

  function handleLoginClick() {
    setTopbarVisibility(true);
  }

  // function handleTopBarVisisbility() {
  //   setTopbarVisibility(false);
  // }

  return (
    <div className="app">
      <Router>
        <nav>
          {authUser ? (
            <div>
              <Link to="/paronAB">Home</Link>
              <Link to="/paronAB/update-stock">Uppdatera Saldo</Link>
              <button onClick={handelSignOut}>Logga ut</button>
            </div>
          ) : (
            <div className="app__topbar">
              {topbarVisibility && <TopBar />}

              <Link
                to="/paronAB/auth"
                onClick={handleLoginClick}
                className="app__topbar-login"
              >
                Logga in
              </Link>
            </div>
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

/*
Har använt mig utav useState och useEffekt hook för att uppdatera och hantera 
autentiseringsstatusen för användaren. 
Så om användaren är inloggad, uppdaterar authUser till användarobjektet OM anvädnaren INTE är 
inloggad, uppdaterar authUser till NULL, skickar iväg det state till Home för en bekräftelse att man är inloggad
på sin mail. Sedan OM authUser är sann (alltså inloggad) så visa en button för att 'logga ut' annars visa en länk till Logga in sidan. 
*/
