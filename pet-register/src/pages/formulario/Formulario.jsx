import { useState } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [raza, setRaza] = useState('');
  const [imagen, setImagen] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'mascotas'), {
        nombre,
        tipo,
        raza,
        imagen
      });
      navigate('/');
    } catch (error) {
      console.error('Error al agregar mascota: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo"
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Raza"
        value={raza}
        onChange={(e) => setRaza(e.target.value)}
      />
      <input
        type="text"
        placeholder="Imagen (URL)"
        value={imagen}
        onChange={(e) => setImagen(e.target.value)}
      />
      <button type="submit">Agregar Mascota</button>
    </form>
  );
}

export default Formulario;
