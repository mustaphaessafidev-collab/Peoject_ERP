import { useMemo, useState } from "react";
import Filters from "../components/cars/Filters";
import Header from "../components/cars/Header";
import Pagination from "../components/cars/Pagination";
import VehicleGrid from "../components/cars/VehicleGrid";
import vehiclesData from "../fake-data/vehicles.json";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

export default function VehicleCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Vehicles");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [maxPrice, setMaxPrice] = useState(450);
  const [currentPage, setCurrentPage] = useState(1);

  const carsPerPage = 6;

  const filteredVehicles = useMemo(() => {
    return vehiclesData.filter((vehicle) => {
      const matchCategory =
        selectedCategory === "All Vehicles" ||
        vehicle.category === selectedCategory;

      const matchBrand =
        selectedBrand === "All Brands" ||
        vehicle.brand === selectedBrand;

      const matchPrice = vehicle.pricePerDay <= maxPrice;

      return matchCategory && matchBrand && matchPrice;
    });
  }, [selectedCategory, selectedBrand, maxPrice]);

  const totalPages = Math.ceil(filteredVehicles.length / carsPerPage);

  const startIndex = (currentPage - 1) * carsPerPage;
  const endIndex = startIndex + carsPerPage;

  const paginatedVehicles = filteredVehicles.slice(startIndex, endIndex);
  console.log(vehiclesData.length)
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 lg:px-8">
      
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="w-full flex-shrink-0 lg:w-[250px] xl:w-[270px]">
          <Filters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <main className="flex-1">
          <div className="flex flex-col gap-6">
            <Header total={filteredVehicles.length} />

            <VehicleGrid vehicles={paginatedVehicles} />

            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </main>
      </div>
      
    </div>
    <Footer/>
    </>

  );
}