import "./TopBar.scss";
import menu from "../../assets/menu-bar.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TopBar() {
  const [titleVisibility, setTitleVisibility] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location === "/paronAB/") {
      setTitleVisibility(false);
    } else {
      setTitleVisibility(true);
    }
  }, [location]);

  return (
    <div className="topbar">
      <img
        className="topbar__menu"
        src={menu}
        alt="slide drawer icon, 3 lines"
      />
      {titleVisibility && (
        <h4 onClick={() => navigate("/paronAB/")} className="topbar__title">
          päron <span>ab</span>
        </h4>
      )}
    </div>
  );
}
