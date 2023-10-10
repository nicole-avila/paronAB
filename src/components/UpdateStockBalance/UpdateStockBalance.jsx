import "./UpdateStockBalance.scss";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export default function UpdateStockBalance() {
  const [warehouse, setWarehouse] = useState("");
  const [products, setProducts] = useState({ productName: "", quantity: "" });
  const [stocks, setStocks] = useState([]);

  const stockListCollectionRef = collection(db, "stockList");

  useEffect(() => {
    try {
      async function getStockList() {
        const data = await getDocs(stockListCollectionRef);
        console.log(data);
        setStocks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
      getStockList();
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  async function handleUpdate(id, productName, quantity) {
    if (warehouse && products.productName && products.quantity) {
      try {
        const stockListDoc = doc(db, "stockList", id);
        console.log(stockListDoc);

        const warehouseDocSnap = await getDoc(stockListDoc);
        console.log(warehouseDocSnap);

        if (warehouseDocSnap.exists()) {
          const data = warehouseDocSnap.data();
          console.log(data);
          console.log(data.products);

          const productQuantity = Number(quantity);
          const productUpdate = data.products.map((product) => {
            if (product.productName === productName) {
              return { ...product, quantity: productQuantity };
            }
            return product;
          });
          console.log(productQuantity);
          console.log(productUpdate);

          const updatedData = {
            ...data,
            products: productUpdate,
          };

          await updateDoc(stockListDoc, updatedData);
          console.log("antalet i podukten är uppdaterad");
        }
      } catch (error) {
        console.log("något fel inträffa", error);
      }
    }
  }

  return (
    <div className="update">
      <h1>Uppdatera Lagersaldo</h1>
      <div className="update__form">
        <label htmlFor="warehouse">Lägg till varulagret</label>
        <select
          id="warehouse"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
        >
          <option value="#">välj varulager</option>
          {stocks.map((stock, index) => (
            <option key={index} value={stock.warehouse}>
              {stock.warehouse}
            </option>
          ))}
        </select>

        <label htmlFor="product">Lägg till produkt</label>
        <select
          id="product"
          value={products.productName}
          onChange={(e) =>
            setProducts({ ...products, productName: e.target.value })
          }
        >
          <option value="#">välj produkt</option>
          {stocks
            .filter((stock) => stock.warehouse === warehouse)
            .map((stock, index) =>
              stock.products.map((product, index) => (
                <option key={index} value={product.productName}>
                  {product.productName}
                </option>
              ))
            )}
        </select>
        <br />
        <label htmlFor="quantity">Skriv in antal enheter</label>
        <input
          type="number"
          id="quantity"
          placeholder="antal enheter..."
          value={products.quantity}
          onChange={(e) =>
            setProducts({ ...products, quantity: e.target.value })
          }
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
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
          <button>Ta bort</button>
        </div>
      </div>
    </div>
  );
}
