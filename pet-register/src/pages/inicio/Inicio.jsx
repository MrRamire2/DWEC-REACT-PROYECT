import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import List from "../../components/List";

function Inicio() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      const querySnapshot = await getDocs(collection(db, "mascotas"));
      setMascotas(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchMascotas();
  }, []);

  return (
    <div>
      <List mascotas={mascotas} />
    </div>
  );
}

export default Inicio;
