import "./Home.scss";
import ReadStockOverview from "../../components/ReadStockOverview/ReadStockOverview";
import profileIcon from "../../assets/profile-icon.svg";

export default function Home({ authUser }) {
  return (
    <div className="home">
      {authUser ? (
        <div>
          <div className="home__profile">
            <img src={profileIcon} className="home__profile-icon" alt="" />
            <p className="home__auth-user">{`${authUser.email}`}</p>
          </div>
          <ReadStockOverview data-testid={"read-stock-overview"} />
        </div>
      ) : (
        <div className="home-hero">
          <h1 className="home__hero-title">
            Päron <span className="home__title-ab">Ab</span>
          </h1>
        </div>
      )}
    </div>
  );
}
