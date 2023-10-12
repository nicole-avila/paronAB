import "./Logo.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Logo() {
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
    <div className="logo">
      {titleVisibility && (
        <h4 onClick={() => navigate("/paronAB/")} className="logo__title">
          päron <span>ab</span>
        </h4>
      )}
    </div>
  );
}
