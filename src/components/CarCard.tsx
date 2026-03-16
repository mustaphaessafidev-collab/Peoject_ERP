import { motion } from "framer-motion";
import { Fuel, Users } from "lucide-react";

interface Car {
  id: number;
  name: string;
  category: string;
  price_per_day: number;
  transmission: string;
  seats: number;
  location: string;
  available: boolean;
  image: string;
}

export default function CarCard({ car }: { car: Car }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-card rounded-2xl p-3 shadow-premium hover:shadow-hover transition-all duration-300 border border-border/50 hover:border-primary/20"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
        <img
          src={car.image}
          alt={car.name}
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-card/90 backdrop-blur-md shadow-sm rounded-lg text-foreground">
            {car.category}
          </span>
        </div>
        {car.available && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-green-500/90 backdrop-blur-md rounded-md text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Disponible
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 px-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-base font-semibold tracking-tight text-foreground">{car.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{car.location}</p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold tabular-nums text-foreground">{car.price_per_day}€</span>
            <span className="text-muted-foreground text-xs">/jour</span>
          </div>
        </div>

        <div className="flex gap-4 mt-3 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Fuel className="w-3.5 h-3.5" />
            {car.transmission}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <Users className="w-3.5 h-3.5" />
            {car.seats} Places
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="py-2.5 px-4 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground rounded-xl transition-all duration-200">
            Détails
          </button>
          <button className="py-2.5 px-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-brand-hover rounded-xl transition-all duration-200 shadow-sm">
            Réserver
          </button>
        </div>
      </div>
    </motion.div>
  );
}
