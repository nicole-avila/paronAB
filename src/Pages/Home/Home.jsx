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
        <h1>Päron Ab</h1>
      )}
    </div>
  );
}
