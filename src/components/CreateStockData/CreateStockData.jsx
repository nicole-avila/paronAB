import "./CreateStockData.scss";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

export default function CreateStockData() {
  const [wearehouse, setWearehouse] = useState("");
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState("");
  const stockListCollectionRef = collection(db, "stockList");

  async function handleForm(e) {
    e.preventDefault();
    if (wearehouse && product && quantity) {
      try {
        await addDoc(stockListCollectionRef, {
          wearehouse,
          product,
          quantity,
          author: { email: auth.currentUser.email, id: auth.currentUser.uid },
        });
        setWearehouse("");
        setProduct("");
        setQuantity("");
        console.log("produkten är tilllagd");
      } catch (error) {
        console.log("något fel inträffa", error);
      }
    }
    e.target.reset();
  }

  return (
    <div className="create">
      <h1>Create</h1>
      <form onSubmit={handleForm} className="create__form">
        <label htmlFor="wearehouse">Lägg till ett Färdigvarulager</label>
        <input
          type="text"
          placeholder="add new wearehouse.."
          id="wearehouse"
          onChange={(e) => setWearehouse(e.target.value)}
        />

        <label htmlFor="product">Lägg till en produkt</label>
        <input
          type="text"
          placeholder="add product.."
          id="product"
          onChange={(e) => setProduct(e.target.value)}
        />

        <label htmlFor="quantity">Lägg in rätt antal enheter</label>
        <input
          type="text"
          placeholder="add quantity.."
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button>create new stock</button>
      </form>
    </div>
  );
}
