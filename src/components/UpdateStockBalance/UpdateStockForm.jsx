import "./UpdateStockBalance.scss";

export default function UpdateStockForm({
  warehouse,
  setWarehouse,
  products,
  setProducts,
  stocks,
  setMessage,
}) {
  return (
    <div>
      <div className="update__form">
        <select
          id="warehouse"
          value={warehouse}
          onChange={(e) => setWarehouse(e.target.value)}
          onClick={() => setMessage("")}
        >
          <option value="#">välj varulager</option>
          {stocks.map((stock, index) => (
            <option key={index} value={stock.warehouse}>
              {stock.warehouse}
            </option>
          ))}
        </select>

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
            .map((stock) =>
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
      </div>
    </div>
  );
}
