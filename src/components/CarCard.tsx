import { motion } from "framer-motion";

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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="group bg-card rounded-2xl p-3 shadow-premium hover:shadow-hover transition-shadow duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary">
        <img
          src={car.image}
          alt={car.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-card/90 backdrop-blur shadow-sm rounded-lg text-foreground">
            {car.category}
          </span>
        </div>
      </div>

      <div className="mt-4 px-1">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">{car.name}</h3>
          <div className="text-right">
            <span className="text-xl font-bold tabular-nums text-foreground">${car.price_per_day}</span>
            <span className="text-muted-foreground text-sm">/day</span>
          </div>
        </div>

        <div className="flex gap-4 mt-3 pb-4 border-b border-border/50">
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            {car.transmission}
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            {car.seats} Places
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="py-2.5 px-4 text-sm font-medium text-muted-foreground hover:bg-secondary rounded-xl transition-colors">
            Détails
          </button>
          <button className="py-2.5 px-4 text-sm font-semibold bg-foreground text-background hover:opacity-90 rounded-xl transition-colors shadow-sm">
            Réserver
          </button>
        </div>
      </div>
    </motion.div>
  );
}
