import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleCatalogPage from "./pages/VehicleCatalogPage";
import VehicleDetails from './pages/VehicleDetailsPage';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/VehicleCatalogPage" element={<VehicleCatalogPage />} />
        <Route path="/VehicleDetail/:id" element={<VehicleDetails />} />
        
      </Routes>
    </BrowserRouter>
  );
}