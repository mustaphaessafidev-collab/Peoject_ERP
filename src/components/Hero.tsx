import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover"
          alt="Premium car on road"
        />
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tight mb-6">
          Premium Car Rentals <br />
          <span className="text-primary">for Your Next Journey.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/80 mb-12">
          Manage your fleet bookings and discover the perfect ride with our integrated ERP portal. Reliable, fast, and transparent.
        </p>
        <SearchBar />
      </div>
    </section>
  );
}
