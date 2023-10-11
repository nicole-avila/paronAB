import "./CreateStock.scss";
import CreateStockData from "../../components/CreateStockData/CreateStockData";

export default function CreateStock() {
  return (
    <div className="create">
      <h1>Skapa nytt</h1>
      <CreateStockData />
    </div>
  );
}
