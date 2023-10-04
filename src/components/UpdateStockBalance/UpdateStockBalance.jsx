import "./UpdateStockBalance.scss";
import { useState } from "react";

export default function UpdateStockBalance() {
  const [wearehouse, setWearehouse] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleForm(e) {
    e.preventDefault();
    console.log("click");
  }

  return (
    <div className="update">
      <h1>UpdateStockBalance - adding updates</h1>
      <form onSubmit={handleForm} className="update__form">
        <label htmlFor="wearehouse">Lägg till varulagret</label>
        <select id="wearehouse" onChange={(e) => setWearehouse(e.target.value)}>
          <option value="#">välj varulager</option>
          <option value="Cupertino">Cupertino</option>
          <option value="Norrköping">Norrköping</option>
          <option value="Frankurt">Frankurt</option>
        </select>

        <label htmlFor="product">Lägg till produkt</label>
        <select id="product" onChange={(e) => setProduct(e.target.value)}>
          <option value="#">välj produkt</option>
          <option value="jTelefon">jTelefon</option>
          <option value="jPlatta">jPlatta</option>
          <option value="PäronKlocka">PäronKlocka</option>
        </select>
        <label htmlFor="quantity">Skriv in antal enheter</label>
        <input
          type="text"
          id="quantity"
          placeholder="antal enheter..."
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button>Lägg till Saldo</button>
      </form>
    </div>
  );
}
