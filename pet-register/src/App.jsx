import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio/Inicio';
import Tema from './pages/tema/Tema';
import Formulario from './pages/formulario/Formulario';
import List from './components/List';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/tema/:id" element={<Tema />} />
        <Route path="/nuevo" element={<Formulario />} />
        {/* <Route path="/listado" element={<List />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
