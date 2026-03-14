import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VehicleCatalogPage from "./pages/VehicleCatalogPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/VehicleCatalogPage" element={<VehicleCatalogPage />} />
      </Routes>
    </BrowserRouter>
  );
}