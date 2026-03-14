import cars from "../data/voitures.json";
import CarCard from "./CarCard";

export default function FleetSection() {
  return (
    <section id="catalog" className="py-24 bg-surface-elevated">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">Popular Fleet</h2>
            <p className="text-muted-foreground">Hand-picked vehicles based on your recent searches</p>
          </div>
          <button className="hidden md:block text-sm font-semibold text-primary hover:text-brand-hover transition-colors">
            View all vehicles →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
