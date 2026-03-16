import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=2000"
          className="w-full h-full object-cover scale-105"
          alt="Voiture premium sur la route" />
        
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}>
          
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest text-primary-foreground/90 bg-primary/20 backdrop-blur-sm border border-primary-foreground/10 rounded-full">
             Plus de 500 véhicules disponibles
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground tracking-tight mb-6 leading-[1.1]">
            Location de voitures premium <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              pour votre prochain voyage.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/70 mb-12">
            Gérez vos réservations de flotte et trouvez le véhicule idéal grâce à notre portail ERP intégré. Fiable, rapide et transparent.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}>
          
          <SearchBar />
        </motion.div>
      </div>
    </section>);

}