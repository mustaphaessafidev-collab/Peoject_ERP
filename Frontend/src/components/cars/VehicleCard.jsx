import { useEffect, useState } from "react";

export default function VehicleCard({vehicle}) {
    console.log(vehicle)
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      
      <div className="relative bg-slate-50 p-4">
        

                <div className="flex justify-center">
        <div className="h-[200px] w-full overflow-hidden rounded-xl">
            <img
            src={vehicle.image}
            alt={vehicle.name}
            className="h-full w-full object-cover"
            />
        </div>
</div>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {vehicle.brand}
          </p>
          <h3 className="mt-1 text-xl font-bold text-slate-800">
            {vehicle.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
          <span>{vehicle.category}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.seats}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">
            {vehicle.pricePerDay} <span className="text-sm font-normal text-slate-400">/day</span>
          </p>

        {/* safae page  */}
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}