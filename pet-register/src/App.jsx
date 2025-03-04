import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio/Inicio';
import Tema from './pages/tema/Tema';
import EditarMascota from './pages/tema/EditarMascota';
import Formulario from './pages/formulario/Formulario';
import Busqueda from './pages/busqueda/Busqueda';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path="/" element={<Inicio />} />
        <Route path="/tema/:id" element={<Tema />} />
        <Route path="/editar/:id" element={<EditarMascota />} />
        <Route path="/nuevo" element={<Formulario />} />
        <Route path="/buscar" element={<Busqueda />} />
      </Routes>
    </Router>
  );
}

export default App;
