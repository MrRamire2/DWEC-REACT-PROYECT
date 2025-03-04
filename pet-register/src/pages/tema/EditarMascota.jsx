import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import '../formulario/Formulario.css';
import './EditarMascota.css';

function EditarMascota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("");
  const [raza, setRaza] = useState("");
  const [imagen, setImagen] = useState("");
  const [personalidad, setPersonalidad] = useState([]);
  const [enfermedades, setEnfermedades] = useState([]);
  const [vacunas, setVacunas] = useState([]);

  useEffect(() => {
    const fetchMascota = async () => {
      const docRef = doc(db, "mascotas", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const mascota = docSnap.data();
        setNombre(mascota.nombre);
        setTipo(mascota.tipo);
        setRaza(mascota.raza);
        setImagen(mascota.imagen);
        setPersonalidad(mascota.personalidad || []);
        setEnfermedades(mascota.enfermedades || []);
        setVacunas(mascota.vacunas || []);
      } else {
        console.log("No existe el documento");
      }
    };
    fetchMascota();
  }, [id]);

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

  const handleMultiSelect = (e, setState) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setState(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mascotaRef = doc(db, "mascotas", id);
    try {
      await updateDoc(mascotaRef, {
        nombre,
        tipo,
        raza,
        imagen,
        personalidad,
        enfermedades,
        vacunas,
      });
      alert("Mascota actualizada correctamente.");
      navigate(`/`);
    } catch (error) {
      console.error("Error al actualizar la mascota", error);
      alert("Hubo un error al actualizar la mascota.");
    }
  };

  return (
    <form className="form-reg" onSubmit={handleSubmit}>
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
      <select
        multiple
        value={personalidad}
        onChange={(e) => handleMultiSelect(e, setPersonalidad)}
      >
        <option value="Juguetón">Juguetón</option>
        <option value="Tranquilo">Tranquilo</option>
        <option value="Cariñoso">Cariñoso</option>
        <option value="Independiente">Independiente</option>
        <option value="Protector">Protector</option>
      </select>

      <label>Enfermedades:</label>
      <select
        multiple
        value={enfermedades}
        onChange={(e) => handleMultiSelect(e, setEnfermedades)}
      >
        <option value="Ninguna">Ninguna</option>
        <option value="Alergias">Alergias</option>
        <option value="Problemas cardíacos">Problemas cardíacos</option>
        <option value="Artritis">Artritis</option>
        <option value="Diabetes">Diabetes</option>
      </select>

      <label>Vacunas:</label>
      <select
        multiple
        value={vacunas}
        onChange={(e) => handleMultiSelect(e, setVacunas)}
      >
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

      <div className="edit-img">
        {imagen && <img src={imagen} alt="Imagen de la mascota" />}
      </div>

      <button type="submit">Actualizar Mascota</button>
    </form>
  );
}

export default EditarMascota;
