import Tema from "../pages/tema/Tema";
import './list.css';

function List({ mascotas }) {
  return (
    <div className="list-container">
      <h2>Lista de Mascotas</h2>
      {mascotas.map((mascota) => (
        <Tema key={mascota.id} mascota={mascota} />
      ))}
    </div>
  );
}

export default List;