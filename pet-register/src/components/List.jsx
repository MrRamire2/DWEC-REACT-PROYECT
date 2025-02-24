import Tema from "../pages/tema/Tema";

function List({ mascotas }) {
  return (
    <>
      <h2>Lista de Mascotas</h2>
      {mascotas.map((mascota) => (
        <Tema key={mascota.id} mascota={mascota} />
      ))}
    </>
  );
}

export default List;