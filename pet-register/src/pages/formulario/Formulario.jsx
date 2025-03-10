import { useState, useRef } from 'react';
import { db } from '../../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';
import './Formulario.css';

function Formulario() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [imagen, setImagen] = useState(null);
  const [personalidad, setPersonalidad] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [vacunas, setVacunas] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Crea un objeto FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagen(reader.result);
    };
    if (file) {
      // Convierte la imagen a base64
      reader.readAsDataURL(file);
    }
  };

  const handleMultiSelect = (e, setState) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setState(selectedOptions);
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
        personalidad,
        enfermedades,
        vacunas,
      });
      alert("Mascota agregada correctamente.");
      setNombre("");
      setTipo("");
      setRaza("");
      setImagen(null);
      setPersonalidad([]);
      setEnfermedades([]);
      setVacunas([]);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (error) {
      console.error("Error al agregar la mascota: ", error);
      alert("Hubo un error al agregar la mascota.");
    }
  };

  return (
    <form className='form-reg' onSubmit={handleSubmit}>
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

      <label>Personalidad:</label>
      <select multiple onChange={(e) => handleMultiSelect(e, setPersonalidad)}>
        <option value="Juguetón">Juguetón</option>
        <option value="Tranquilo">Tranquilo</option>
        <option value="Cariñoso">Cariñoso</option>
        <option value="Independiente">Independiente</option>
        <option value="Protector">Protector</option>
      </select>

      <label>Enfermedades:</label>
      <select multiple onChange={(e) => handleMultiSelect(e, setEnfermedades)}>
        <option value="Alergias">Alergias</option>
        <option value="Problemas cardíacos">Problemas cardíacos</option>
        <option value="Artritis">Artritis</option>
        <option value="Diabetes">Diabetes</option>
      </select>

      <label>Vacunas:</label>
      <select multiple onChange={(e) => handleMultiSelect(e, setVacunas)}>
        <option value="Rabia">Rabia</option>
        <option value="Parvovirus">Parvovirus</option>
        <option value="Moquillo">Moquillo</option>
        <option value="Leptospirosis">Leptospirosis</option>
      </select>

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
