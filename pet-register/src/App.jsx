import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/inicio/Inicio';
import Formulario from './pages/formulario/Formulario';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nuevo" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;
