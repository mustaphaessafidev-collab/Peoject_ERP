import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleCatalogPage from "./pages/VehicleCatalogPage";
import VehicleDetails from './pages/VehicleDetailsPage';
import Dashboard from './components/dashboard/Dashboard';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/VehicleCatalogPage" element={<VehicleCatalogPage />} />
        <Route path="/VehicleDetail/:id" element={<VehicleDetails />} />
        <Route path='/Dashboard' element={<Dashboard/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}