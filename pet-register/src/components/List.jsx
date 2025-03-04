import React, { useState, useEffect } from "react";
import Tema from "../pages/tema/Tema";
import './list.css';

function List({ mascotas }) {
  const [mascotasList, setMascotasList] = useState(mascotas);

  useEffect(() => {
    setMascotasList(mascotas);
  }, [mascotas]);

  const handleDelete = (id) => {
    setMascotasList((prevMascotas) => prevMascotas.filter((mascota) => mascota.id !== id));
  };

  return (
    <div className="list-container">
      <h2>Lista de Mascotas</h2>
      {mascotasList.length > 0 ? (
        mascotasList.map((mascota) => (
          <Tema key={mascota.id} mascota={mascota} onDelete={handleDelete} />
        ))
      ) : (
        <p>No hay mascotas disponibles.</p>
      )}
    </div>
  );
}

export default List;
