import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Kalenteri } from './components/pages/Kalenteri';
import { Varasto } from './components/pages/Varasto';
import { Asetukset } from './components/pages/Asetukset';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Kalenteri" element={<Kalenteri />} />
          <Route path="/Varasto" element={<Varasto />} />
          <Route path="/Asetukset" element={<Asetukset />} />
        </Routes>
      </div>
    </Router>
  );
}
