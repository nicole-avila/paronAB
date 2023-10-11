import "./TopBar.scss";
import menu from "../../assets/menu-bar.svg";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <div className="topbar">
      <img
        className="topbar__menu"
        src={menu}
        alt="slide drawer icon, 3 lines"
      />
      <h4 onClick={() => navigate("/paronAB")} className="topbar__title">
        päron <span>ab</span>
      </h4>
    </div>
  );
}
