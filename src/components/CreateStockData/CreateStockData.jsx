import "./CreateStockData.scss";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

export default function CreateStockData() {
  const [loading, setLoading] = useState(false);
  const [warehouse, setWarehouse] = useState("");
  const [products, setProducts] = useState([{ productName: "", quantity: "" }]);
  const [message, setMessage] = useState("");
  const [numberMessage, setNumberMessage] = useState("");
  const stockListCollectionRef = collection(db, "stockList");

  function addMoreProduct(e) {
    e.preventDefault();
    setProducts([...products, { productName: "", quantity: "" }]);
  }

  useEffect(() => {}, [products]);

  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    if (warehouse && products.length > 0) {
      try {
        await addDoc(stockListCollectionRef, {
          warehouse: warehouse,
          products,
          author: { email: auth.currentUser.email, id: auth.currentUser.uid },
        });
        setWarehouse("");
        setProducts([{ productName: "", quantity: "" }]);
        setMessage("sparat!");
        console.log("produkten är tilllagd");
      } catch (error) {
        console.error("något fel inträffa", error);
      }
      setLoading(false);
    }
  }

  function handleChange(e, index) {
    const { name, value } = e.target;

    if (name === "quantity" && Number.isNaN(Number(value))) {
      setNumberMessage("Vänligen ange siffror");
      return;
    }

    setProducts((prevProducts) => {
      const updateProducts = [...prevProducts];
      updateProducts[index] = {
        ...updateProducts[index],
        [name]: name === "quantity" ? Number(value) : value,
      };
      return updateProducts;
    });
    setNumberMessage("");
  }

  return (
    <div className="create">
      {/* <div className="create__form"> */}
      <p>{message}</p>
      <span>Lägg till ett färdigvarulager</span>
      <input
        className="create__input"
        type="text"
        id="warehouse"
        value={warehouse}
        onChange={(e) => setWarehouse(e.target.value)}
        onClick={() => setMessage("")}
      />

      <div className="create__container">
        {products.map((product, index) => (
          <div key={index}>
            <label htmlFor="productName">Produkt</label>
            <input
              className="create__input"
              type="text"
              placeholder="add product.."
              name="productName"
              value={product.productName}
              onChange={(e) => handleChange(e, index)}
            />

            <label htmlFor="quantity">Antal enheter</label>
            <input
              className="create__input"
              type="text"
              placeholder="add quantity.."
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
      </div>
      {numberMessage && <p>{numberMessage}</p>}

      <button onClick={addMoreProduct} className="create__add-produkt-btn">
        lägg till en ny produkt
      </button>
      {/* </div> */}
      <button
        onClick={handleForm}
        className="create__save-btn"
        disabled={loading}
      >
        {loading ? "invänta sparandet" : "spara"}
      </button>
    </div>
  );
}
