import EliminarMascota from "./EliminarMascota";
import "./Tema.css";

function Tema({ mascota }) {
  return (
    <section>
      <div>
        <h2>{mascota.nombre}</h2>
        <div>
          <p><h3>Tipo: </h3>
          {" " + mascota.tipo}</p>
          <p><h3>Raza: </h3>
          {" " + mascota.raza}</p>
        </div>
        <EliminarMascota id={mascota.id} />
      </div>
      <div>
        {mascota.imagen && <img src={mascota.imagen} alt={mascota.nombre} />}
      </div>
    </section>
  );
}

export default Tema;
