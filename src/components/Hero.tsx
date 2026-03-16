import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover"
          alt="Voiture premium sur la route"
        />
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tight mb-6">
          Location de voitures premium <br />
          <span className="text-primary">pour votre prochain voyage.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-12">
          Gérez vos réservations de flotte et trouvez le véhicule idéal grâce à notre portail ERP intégré. Fiable, rapide et transparent.
        </p>
        <SearchBar />
      </div>
    </section>
  );
}
