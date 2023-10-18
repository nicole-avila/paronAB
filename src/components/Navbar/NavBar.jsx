import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function handleLinkClick() {
    setIsOpen(false);
  }

  return (
    <div className="navbar" onClick={() => setIsOpen(!isOpen)}>
      <div className={`navbar__toggle ${isOpen && "navbar__open"}`}>
        <div className="navbar__bar"></div>
      </div>
      <div className={`navbar__items ${isOpen && "navbar__open"}`}>
        <Link to="/paronAB/" onClick={handleLinkClick}>
          Home
        </Link>
        <Link to="/paronAB/create-stock" onClick={handleLinkClick}>
          Skapa
        </Link>
        <Link to="/paronAB/update-stock" onClick={handleLinkClick}>
          Uppdatera Saldo
        </Link>
        {/* <Link to="/paronAB/history" onClick={handleLinkClick}>
          Historik
        </Link> */}
      </div>
    </div>
  );
}
