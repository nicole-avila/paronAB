import "./ReadStockOverview.scss";
import CreateStockData from "../CreateStockData/CreateStockData";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ReadStockOverview() {
  const [readStockList, setReadStockList] = useState([]);
  const stockListCollectionRef = collection(db, "stockList");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      async function handelLoading() {
        const getStockListData = await getDocs(stockListCollectionRef);
        setLoading(false);
      }
      handelLoading();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

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
      <div className="stock__container">
        {loading ? (
          <p className="stock__loading">Loading...</p>
        ) : (
          <div>
            {Array.isArray(readStockList) &&
              readStockList.map((stock, index) => (
                <div key={index} className="stock__section">
                  <div>
                    <h1 className="stock__warehouse-title">
                      {stock.warehouse}
                    </h1>
                    <div className="stock__products-container">
                      {stock.products.map((product, index) => (
                        <div key={index} className="stock__product-box">
                          <div className="stock__product-text">
                            <p className="stock__product-name">
                              {product.productName}
                            </p>
                            <p className="stock__product-quantity">
                              {product.quantity} st
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
