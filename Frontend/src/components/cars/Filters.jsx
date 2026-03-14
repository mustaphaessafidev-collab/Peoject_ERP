export default function Filters({
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Filters</h2>

        <button
          className="text-sm text-blue-600 hover:underline"
          onClick={() => {
            setSelectedCategory("All Vehicles");
            setSelectedBrand("All Brands");
            setMaxPrice(450);
          }}
        >
          Reset All
        </button>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Category
        </p>

        <div className="space-y-2 text-sm text-slate-600">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "All Vehicles"}
              onChange={() => setSelectedCategory("All Vehicles")}
            />
            All Vehicles
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "SUV"}
              onChange={() => setSelectedCategory("SUV")}
            />
            SUV
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "Sedan"}
              onChange={() => setSelectedCategory("Sedan")}
            />
            Sedan
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "Luxury"}
              onChange={() => setSelectedCategory("Luxury")}
            />
            Luxury
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === "Electric"}
              onChange={() => setSelectedCategory("Electric")}
            />
            Electric
          </label>
        </div>
      </div>

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Price / Day
          </p>

          <span className="text-sm font-semibold text-blue-600">
            $0 - ${maxPrice}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="450"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Brand
        </p>

        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="w-full rounded-lg border border-slate-200 p-2 text-sm"
        >
          <option>All Brands</option>
          <option>TESLA</option>
          <option>BMW</option>
          <option>AUDI</option>
          <option>MERCEDES</option>
          <option>TOYOTA</option>
          <option>VOLKSWAGEN</option>
        </select>
      </div>
    </div>
  );
}