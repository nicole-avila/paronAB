import "./ReadStockOverview.scss";
import trashCan from "../../assets/trash-can.svg";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

export default function ReadStockOverview() {
  const [readStockList, setReadStockList] = useState([]);
  const [loading, setLoading] = useState(true);
  const stockListCollectionRef = collection(db, "stockList");

  useEffect(() => {
    try {
      async function handelLoading() {
        await getDocs(stockListCollectionRef);
        setLoading(false);
      }
      handelLoading();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    try {
      async function getStockList() {
        const data = await getDocs(stockListCollectionRef);
        setReadStockList(data.docs.map((doc) => ({ ...doc.data() })));
      }
      getStockList();
      console.log(readStockList);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  // async function handleDelete() {
  //   try {
  //     const stockListDocRef = doc(db, "stockList");
  //     console.log(stockListDocRef);
  //   } catch (error) {
  //     console.error("error removing doc: ", error);
  //   }
  // }

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
                      {/* <img
                        className="stock__delete"
                        src={trashCan}
                        alt="trash can in black color"
                        onClick={() => handleDelete()}
                      /> */}
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
