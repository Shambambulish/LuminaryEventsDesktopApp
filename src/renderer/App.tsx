import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/home';
import { Testisivu } from './components/pages/testisivu';

export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Testisivu" element={<Testisivu />} />
        </Routes>
      </div>
    </Router>
  );
}
