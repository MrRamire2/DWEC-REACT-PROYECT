import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/buscar?q=${query}`);
  };
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar mascota..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <Link to="/nuevo">Agregar Mascota</Link>
    </nav>
  );
}

export default Navbar;
