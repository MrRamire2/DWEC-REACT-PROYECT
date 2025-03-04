import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import EliminarMascota from "../tema/EliminarMascota";
import "../tema/Tema.css";
import "./Busqueda.css";

function Busqueda() {
  const [mascotas, setMascotas] = useState([]);
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q") || "";

  useEffect(() => {
    const fetchMascotas = async () => {
      const querySnapshot = await getDocs(collection(db, "mascotas"));
      const allMascotas = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setMascotas(allMascotas);

      const filtered = allMascotas.filter(mascota => {
        return (
          mascota.nombre.toLowerCase().includes(query.toLowerCase()) ||
          mascota.tipo.toLowerCase().includes(query.toLowerCase()) ||
          mascota.raza.toLowerCase().includes(query.toLowerCase())
        );
      });

      setFilteredMascotas(filtered);
    };

    fetchMascotas();
  }, [query]);

  return (
    <div className="contenedor">
  <h2 className="resultado">Resultados de la búsqueda</h2>
  {filteredMascotas.length === 0 ? (
    <p className="error">No se encontraron mascotas.</p>
  ) : (
    <div className="mascotas-list">
      {filteredMascotas.map((mascota) => (
        <section key={mascota.id} className="tema-container">
          <div className="imagen">
            {mascota.imagen && <img src={mascota.imagen} alt={mascota.nombre} />}
          </div>

          <div className="infomascotas">
            <h2>{mascota.nombre}</h2>
            <div className="datos">
              <p><strong>Tipo:</strong> {mascota.tipo}</p>
              <p><strong>Raza:</strong> {mascota.raza}</p>
              <p><strong>Personalidad:</strong> {mascota.personalidad?.length ? mascota.personalidad.join(", ") : "No especificado"}</p>
              <p><strong>Enfermedades:</strong> {mascota.enfermedades?.length ? mascota.enfermedades.join(", ") : "No tiene enfermedades registradas"}</p>
              <p><strong>Vacunas:</strong> {mascota.vacunas?.length ? mascota.vacunas.join(", ") : "No tiene vacunas registradas"}</p>
            </div>
          </div>

          <div className="botones">
            <button onClick={() => navigate(`/editar/${mascota.id}`)}>Editar</button>
            <EliminarMascota id={mascota.id} />
          </div>
        </section>
      ))}
    </div>
  )}
</div>
  );
}

export default Busqueda;
