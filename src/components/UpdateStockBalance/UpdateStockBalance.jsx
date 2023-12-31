import "./UpdateStockBalance.scss";
import UpdateStockForm from "./UpdateStockForm";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  increment,
} from "firebase/firestore";

export default function UpdateStockBalance() {
  const [warehouse, setWarehouse] = useState("");
  const [products, setProducts] = useState({ productName: "", quantity: "" });
  const [stocks, setStocks] = useState([]);
  const [message, setMessage] = useState("");

  const stockListCollectionRef = collection(db, "stockList");
  const updatedHistoryCollectionRef = collection(db, "updatedHistory");

  useEffect(() => {
    async function getStockList() {
      try {
        const data = await getDocs(stockListCollectionRef);
        console.log(data);
        setStocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.log("error", error);
      }
    }
    getStockList();
  }, [stockListCollectionRef]);

  async function handleUpdate(id, productName, quantity) {
    if (warehouse && products.productName && products.quantity) {
      try {
        const stockListDoc = doc(db, "stockList", id);
        console.log(stockListDoc);

        const warehouseDocSnap = await getDoc(stockListDoc);
        console.log(warehouseDocSnap);

        if (warehouseDocSnap.exists()) {
          const data = warehouseDocSnap.data();

          const productQuantity = Number(quantity);
          const productUpdate = data.products.map((product) => {
            if (product.productName === productName) {
              return { ...product, quantity: increment(productQuantity) };
            }
            return product;
          });

          const updatedData = {
            ...data,
            products: productUpdate,
          };

          await updateDoc(stockListDoc, updatedData);

          await addDoc(updatedHistoryCollectionRef, {
            // author: { email: auth.currentUser.email, id: auth.currentUser.uid },
            updatedData: updatedData,
          });
          console.log(updatedHistoryCollectionRef);

          setWarehouse("");
          setProducts({ productName: "", quantity: "" });
          setMessage("Lyckad Uppdatering!");
          console.log("antalet i podukten är uppdaterad");
        }
      } catch (error) {
        console.error("något fel inträffa", error);
      }
    }
  }

  return (
    <div className="update">
      <h1 className="update__title">Uppdatera Lagersaldo</h1>
      <UpdateStockForm
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        products={products}
        setProducts={setProducts}
        stocks={stocks}
        setMessage={setMessage}
      />
      <div className="update__btn-container">
        <button
          className="update__add-btn"
          onClick={() => {
            const selectedStock = stocks.find(
              (stock) => stock.warehouse === warehouse
            );
            handleUpdate(
              selectedStock.id,
              products.productName,
              products.quantity
            );
          }}
        >
          Lägg till
        </button>
        <button className="update__remove-btn">Ta bort</button>
      </div>
      <p className="update__message">{message}</p>
    </div>
  );
}
