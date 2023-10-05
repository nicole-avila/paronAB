import "./CreateStockData.scss";
import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";

export default function CreateStockData() {
  const [wearehouse, setWearehouse] = useState("");
  const [products, setProducts] = useState([{ productName: "", quantity: "" }]);

  const stockListCollectionRef = collection(db, "stockList");

  function addMoreProduct(e) {
    e.preventDefault();
    setProducts([...products, { productName: "", quantity: "" }]);
    console.log(products);
  }

  useEffect(() => {
    console.log(products);
  }, [products]);

  async function handleForm(e) {
    e.preventDefault();
    if (wearehouse && products.length > 0) {
      try {
        await addDoc(stockListCollectionRef, {
          wearehouse,
          products,
          author: { email: auth.currentUser.email, id: auth.currentUser.uid },
        });
        setWearehouse("");
        setProducts([{ productName: "", quantity: "" }]); // [{ productName: "", quantity: "" }] ??

        console.log("produkten är tilllagd");
      } catch (error) {
        console.log("något fel inträffa", error);
      }
    }
    e.target.reset();
  }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   const newProducts = [...products];
  //   const index = newProducts.findIndex(
  //     (product) => product.productName === name
  //   );

  //   if (index !== -1) newProducts[index][name] = value;
  //   setProducts(newProducts);
  // }

  // function handleChange(e, index) {
  //   setProducts((prevProducts) => {
  //     return prevProducts.map((product, i) => {
  //       if (i === index) {
  //         return {
  //           ...product,
  //           [e.target.name]: e.target.value,
  //         };
  //       } else {
  //         return product;
  //       }
  //     });
  //   });
  // }

  function handleChange(e, index) {
    const { name, value } = e.target;

    setProducts((prevProducts) => {
      const updateProducts = [...prevProducts];
      updateProducts[index] = {
        ...updateProducts[index],
        [name]: value,
      };
      return updateProducts;
    });
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

        {products.map((product, index) => (
          <div
            className="create__container"
            key={index}
            style={{ background: "#ffffff", margin: "1rem" }}
          >
            <label htmlFor="productName">Lägg till en produkt</label>
            <input
              type="text"
              placeholder="add product.."
              name="productName"
              value={product.productName}
              onChange={(e) => handleChange(e, index)}
            />
            <br />
            <label htmlFor="quantity">Lägg in rätt antal enheter</label>
            <input
              type="text"
              placeholder="add quantity.."
              name="quantity"
              value={product.quantity}
              onChange={(e) => handleChange(e, index)}
            />
          </div>
        ))}
        <button onClick={addMoreProduct}>add more product</button>

        <button>create new stock</button>
      </form>
    </div>
  );
}
