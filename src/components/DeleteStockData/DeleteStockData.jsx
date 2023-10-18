import trashCan from "../../assets/trash-can.svg";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase-config";
import { useMutation, useQueryClient } from "react-query";

export default function DeleteStockData({ stockId }) {
  const queryClient = useQueryClient();

  async function deleteStock(stockId) {
    if (!stockId) {
      console.error("går ej att hitta sotckId");
      return;
    }
    try {
      console.log("STOCK ID:", stockId);

      const stockListDocRef = doc(db, "stockList", stockId);
      console.log("STOCKLIST DOC", stockListDocRef);
      await deleteDoc(stockListDocRef);
    } catch (error) {
      console.error("error removing doc: ", error);
    }
  }

  const deleteStockMutation = useMutation(() => deleteStock(stockId), {
    onSuccess: () => {
      queryClient.invalidateQueries("stockList");
    },
  });

  return (
    <div>
      <img
        style={{ cursor: "pointer" }}
        className="stock__delete"
        src={trashCan}
        alt="trash can in black color"
        onClick={() => deleteStockMutation.mutate()}
      />
    </div>
  );
}
