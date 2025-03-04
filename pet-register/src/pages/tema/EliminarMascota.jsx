import { db } from "../../firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function EliminarMascota({ id, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta mascota?")) {
      try {
        await deleteDoc(doc(db, "mascotas", id));
        alert("Mascota eliminada con éxito.");

        if (onDelete) {
          onDelete(id);
        }

        navigate("/");

      } catch (error) {
        console.error("Error al eliminar la mascota: ", error);
        alert("Hubo un error al eliminar la mascota.");
      }
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
}

export default EliminarMascota;
