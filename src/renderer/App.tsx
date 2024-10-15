import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './components/css/App.css';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Calendar } from './components/pages/Calendar';
import { Inventory } from './components/pages/Inventory';
import { Settings } from './components/pages/Settings';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Inventory" element={<Inventory />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}
