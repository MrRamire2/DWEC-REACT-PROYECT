import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      {/* <Link to="/listado">Mascotas</Link> */}
      <Link to="/nuevo">Agregar Mascota</Link>
    </nav>
  );
}

export default Navbar;
