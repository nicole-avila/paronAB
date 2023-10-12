import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/AuthLogin";
import UpdateStock from "./Pages/UpdateStock/UpdateStock";
import TopBar from "./components/TopBar/TopBar";
import CreateStock from "./Pages/CreateStock/CreateStock";
import History from "./Pages/History/History";
import SignOut from "./components/SignOut/SignOut";

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        <nav className="app__navbar">
          {authUser ? (
            <div className="app__navbar-container">
              <TopBar />
              <div className={`app__nav-items ${isOpen && "app__open"}`}>
                <Link to="/paronAB/">Home</Link>
                <Link to="/paronAB/create-stock">Skapa</Link>
                <Link to="/paronAB/update-stock">Uppdatera Saldo</Link>
                <Link to="/paronAB/history">Historik</Link>
                <SignOut />
              </div>
            </div>
          ) : (
            <div className="app__topbar">
              <TopBar />
              <Link to="/paronAB/auth" className="app__topbar-login">
                Logga in
              </Link>
            </div>
          )}
          <div
            className={`app__nav-toggle ${isOpen && "app__open"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="app__bar"></div>
          </div>
        </nav>
        <Routes>
          <Route path="/paronAB/" element={<Home authUser={authUser} />} />
          <Route path="/paronAB/auth" element={<Auth />} />
          <Route path="/paronAB/update-stock" element={<UpdateStock />} />
          <Route path="/paronAB/create-stock" element={<CreateStock />} />
          <Route path="/paronAB/history" element={<History />} />
          <Route path="*" element={<Home authUser={authUser} />} />
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
