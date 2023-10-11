import "./Home.scss";
import pear from "../../assets/pear-image.png";
import ReadStockOverview from "../../components/ReadStockOverview/ReadStockOverview";

export default function Home({ authUser }) {
  return (
    <div className="home">
      {authUser ? (
        <div>
          <p className="home__auth-user">{`${authUser.email}`}</p>
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
