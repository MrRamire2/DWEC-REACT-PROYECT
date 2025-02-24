import { useState, useRef } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Formulario.css';

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [imagen, setImagen] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      alert("Por favor, selecciona una imagen.");
      return;
    }

    try {
      await addDoc(collection(db, "mascotas"), {
        nombre,
        tipo,
        raza,
        imagen,
      });
      alert("Mascota agregada correctamente.");
      setNombre("");
      setTipo("");
      setRaza("");
      setImagen(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Error al agregar la mascota: ", error);
      alert("Hubo un error al agregar la mascota.");
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
        placeholder="Tipo de animal"
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
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <button type="submit">Agregar Mascota</button>
    </form>
  );
}

export default Formulario;