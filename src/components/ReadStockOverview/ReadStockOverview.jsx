import "./ReadStockOverview.scss";
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

  console.log(readStockList);

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
    <div className="stock">
      <h1 className="stock__title">Lagersaldo</h1>
      {Array.isArray(readStockList) &&
        readStockList.map((stock, index) => (
          <div className="stock__container">
            <div key={index}>
              <h1 className="stock__wearehouse-title">{stock.wearehouse}</h1>
              <div className="stock__products-container">
                {stock.products.map((product, index) => (
                  <div key={index} className="stock__product">
                    <p className="stock__product-name">{product.productName}</p>
                    <p className="stock__product-quantity">
                      {product.quantity} st
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      <CreateStockData />
    </div>
  );
}
