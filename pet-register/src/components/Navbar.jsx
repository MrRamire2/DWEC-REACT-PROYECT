import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/nuevo">Nuevo Tema</Link>
    </nav>
  );
}

export default Navbar;