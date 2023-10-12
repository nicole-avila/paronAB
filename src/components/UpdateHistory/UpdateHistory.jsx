import { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { getDocs, collection } from "firebase/firestore";

export default function UpdateHistory() {
  const [historys, setHistorys] = useState([]);
  const updatedHistoryCollectionRef = collection(db, "updatedHistory");

  useEffect(() => {
    try {
      async function getUpdatesHistory() {
        const data = await getDocs(updatedHistoryCollectionRef);
        console.log(data);
        setHistorys(data.docs.map((doc) => ({ ...doc.data() })));
        console.log(historys);
      }
      getUpdatesHistory();
    } catch (error) {
      console.log("error", error);
    }
  }, []);
  return (
    <div>
      {Array.isArray(historys) &&
        historys.map((history, index) => {
          console.log(history);
          return (
            <div key={index}>
              <h5>Author</h5>
            </div>
          );
        })}
    </div>
  );
}
