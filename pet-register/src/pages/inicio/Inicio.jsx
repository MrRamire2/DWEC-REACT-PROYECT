import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Inicio.css';

function Inicio() {
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      const querySnapshot = await getDocs(collection(db, 'mascotas'));
      setMascotas(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchMascotas();
  }, []);

  return (
    <div className='inicio'>
      <h1>Lista de Mascotas</h1>
      <ul>
        {mascotas.map(mascota => (
          <li key={mascota.id}>
            {mascota.nombre} - {mascota.tipo} - {mascota.raza}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inicio;
