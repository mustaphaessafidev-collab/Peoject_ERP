import { motion } from "framer-motion";
import { Car, Users, MapPin, Star } from "lucide-react";

const stats = [
  { icon: Car, value: "500+", label: "Véhicules premium" },
  { icon: Users, value: "10K+", label: "Clients satisfaits" },
  { icon: MapPin, value: "50+", label: "Emplacements" },
  { icon: Star, value: "4.9", label: "Note moyenne" },
];

const testimonials = [
  {
    name: "Karim B.",
    role: "Directeur commercial",
    text: "Service impeccable et véhicules toujours en excellent état. DriveERP a simplifié toute la gestion de notre flotte d'entreprise.",
    avatar: "KB",
  },
  {
    name: "Sophie M.",
    role: "Consultante indépendante",
    text: "J'utilise DriveERP pour chaque déplacement professionnel. La réservation est rapide et le support client est exceptionnel.",
    avatar: "SM",
  },
  {
    name: "Youssef A.",
    role: "Chef de projet",
    text: "Les prix sont transparents et compétitifs. Plus de mauvaises surprises au retour du véhicule. Je recommande vivement.",
    avatar: "YA",
  },
];

export default function Stats() {
  return (
    <section className="py-28 bg-background">
      <div className="container mx-auto px-6">
        {/* Stats counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center p-8 rounded-2xl bg-card border border-border/50 shadow-premium hover:shadow-hover transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">Témoignages</span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">Ce que disent nos clients</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Des milliers de professionnels nous font confiance au quotidien.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-8 rounded-2xl bg-card border border-border/50 shadow-premium hover:shadow-hover transition-all duration-300"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
