import { useNavigate } from "react-router-dom";
import UpdateStockBalance from "../UpdateStockBalance/UpdateStockBalance";
import Wearehouse from "../Wearehouse/Wearehouse";
import CreateStockData from "../CreateStockData/CreateStockData";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ReadStockOverview() {
  const [readStockList, setReadStockList] = useState([]);
  const stockListCollectionRef = collection(db, "stockList");

  useEffect(() => {
    try {
      async function getStockList() {
        const data = await getDocs(stockListCollectionRef);
        console.log(data);
        setReadStockList(data.docs.map((doc) => ({ ...doc.data() })));
      }
      getStockList();
    } catch (error) {
      console.log("error", error);
    }

    console.log(readStockList);
  }, []);

  return (
    <div className="stack">
      <CreateStockData />
      <h1>Read</h1>
      {readStockList.map((stock) => {
        return (
          <div>
            <div key={stock.id}>
              <h1>{stock.wearehouse}</h1>
              <p>{stock.product}</p>
              <p>{stock.product}</p>
              <p>{stock.quantity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
