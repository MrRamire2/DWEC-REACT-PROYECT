import { useNavigate } from 'react-router-dom';
import EliminarMascota from './EliminarMascota';
import "./Tema.css";

function Tema({ mascota, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editar/${mascota.id}`);
  };

  const formatList = (list) => {
    return list?.length ? list.join(", ") : "No especificado";
  };

  return (
    <section className="tema-container">
      <div className="imagen">
        {mascota.imagen && <img src={mascota.imagen} alt={mascota.nombre} />}
      </div>

      <div className="infomascotas">
        <h2>{mascota.nombre}</h2>

        <div className="datos">
          <h3>Tipo:</h3>
          <p>{mascota.tipo}</p>

          <h3>Raza:</h3>
          <p>{mascota.raza}</p>

          <h3>Personalidad:</h3>
          <p>{formatList(mascota.personalidad)}</p>

          <h3>Enfermedades:</h3>
          <p>{formatList(mascota.enfermedades)}</p>

          <h3>Vacunas:</h3>
          <p>{formatList(mascota.vacunas)}</p>
        </div>
      </div>

      <div className="botones">
        <button onClick={handleEdit}>Editar</button>
        <EliminarMascota id={mascota.id} onDelete={onDelete} />
      </div>
    </section>
  );
}

export default Tema;
