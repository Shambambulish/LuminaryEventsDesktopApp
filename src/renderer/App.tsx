import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './components/css/App.css';
import { CssBaseline } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Home } from './components/pages/Home';
import { Calendar } from './components/pages/Calendar';
import { Inventory } from './components/pages/Inventory';
import { Settings } from './components/pages/Settings';
import { AllProducts } from './components/pages/AllProducts';
import { InventoryProducts } from './components/pages/InventoryProducts';
import { EventProducts } from './components/pages/EventProducts';
import { History } from './components/pages/History';
import { Scan } from './components/pages/Scan';
import { CreateProduct } from './components/pages/CreateProduct';

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
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/InventoryProducts" element={<InventoryProducts />} />
          <Route path="/EventProducts" element={<EventProducts />} />
          <Route path="/History" element={<History />} />
          <Route path="/Scan" element={<Scan />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
        </Routes>
      </div>
    </Router>
  );
}
