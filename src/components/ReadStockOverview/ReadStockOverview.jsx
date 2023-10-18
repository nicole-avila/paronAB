import "./ReadStockOverview.scss";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import DeleteStockData from "../DeleteStockData/DeleteStockData";
import { useQuery } from "react-query";

export default function ReadStockOverview() {
  // const [readStockList, setReadStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: readStockList } = useQuery("stockList", getStockList);

  async function getStockList() {
    try {
      const stockListCollectionRef = collection(db, "stockList");
      const data = await getDocs(stockListCollectionRef);
      console.log(data);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (error) {
      console.error("error", error);
    }
  }

  useEffect(() => {
    async function getStockListData() {
      try {
        await getStockList();
        setLoading(false);
      } catch (error) {
        console.error("error fetching data", error);
      }
    }
    getStockListData();
  }, []);

  return (
    <div className="stock">
      <h1 className="stock__title">Lagersaldo</h1>
      <div className="stock__container">
        {loading ? (
          <p className="stock__loading">Loading...</p>
        ) : (
          <>
            {Array.isArray(readStockList) &&
              readStockList.map((stock, index) => (
                <div key={index} className="stock__section">
                  <div>
                    <div className="stock__section-top">
                      <h1 className="stock__warehouse-title">
                        {stock.warehouse}
                      </h1>
                      <DeleteStockData stockId={stock.id} />
                    </div>
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
          </>
        )}
      </div>
    </div>
  );
}
