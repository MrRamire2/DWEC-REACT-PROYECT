import { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import List from "../../components/List";
import logo from '../../assets/logo.png';
import './Inicio.css';

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
    <>
      <div className="inicio">
        <img src={logo} alt="Logo" />
        <h1>Registro de mascotas</h1>
      </div>
      <List mascotas={mascotas} />
    </>
  );
}

export default Inicio;
