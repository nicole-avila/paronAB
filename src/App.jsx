import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { QueryClient, QueryClientProvider } from "react-query";

import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/AuthLogin";
import UpdateStock from "./Pages/UpdateStock/UpdateStock";

import CreateStock from "./Pages/CreateStock/CreateStock";
import SignOut from "./components/SignOut/SignOut";
import Navbar from "./components/Navbar/NavBar";
import Logo from "./components/Logo/Logo";

const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Router>
          <nav>
            {authUser ? (
              <div className="app__navbar-container">
                <div className="app__navbar">
                  <Logo />
                  <Navbar />
                </div>
                <SignOut />
              </div>
            ) : (
              <div className="app__home-navbar">
                <Logo />
                <Link to="/paronAB/auth" className="app__topbar-login">
                  Logga in
                </Link>
              </div>
            )}
          </nav>
          <Routes>
            <Route path="/paronAB/" element={<Home authUser={authUser} />} />
            <Route path="/paronAB/auth" element={<Auth />} />
            <Route path="/paronAB/update-stock" element={<UpdateStock />} />
            <Route path="/paronAB/create-stock" element={<CreateStock />} />
            <Route path="*" element={<Home authUser={authUser} />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
