import "./Home.scss";
import pear from "../../assets/pear-image.png";
import ReadStockOverview from "../../components/ReadStockOverview/ReadStockOverview";
import profileIcon from "../../assets/profile-icon.svg";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar/TopBar";

export default function Home({ authUser }) {
  return (
    <div className="home">
      {authUser ? (
        <div>
          <div className="home__profile">
            <img src={profileIcon} className="home__profile-icon" alt="" />
            <p className="home__auth-user">{`${authUser.email}`}</p>
          </div>
          <ReadStockOverview />
        </div>
      ) : (
        <div className="home-hero">
          <h1 className="home__hero-title">
            Päron <span>Ab</span>
          </h1>
          <div className="home__img-container">
            <img
              className="home__pear-img"
              src={pear}
              alt="glas transparent pear in color gray"
            />
          </div>
        </div>
      )}
    </div>
  );
}
