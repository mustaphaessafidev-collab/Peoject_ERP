import { Shield, Headphones, Key } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Meilleur prix garanti",
    text: "Nous offrons les tarifs les plus compétitifs du marché, sans frais cachés ni suppléments au retour.",
  },
  {
    icon: Headphones,
    title: "Assistance routière 24h/24",
    text: "Notre équipe d'assistance dédiée est disponible à tout moment pour vous aider en cas de problème pendant votre trajet.",
  },
  {
    icon: Key,
    title: "Accès digital simplifié",
    text: "Déverrouillez votre véhicule directement via l'application. Sans paperasse, sans file d'attente, prenez le volant.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Pourquoi DriveERP ?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Conçu pour les professionnels exigeant fiabilité, transparence et rapidité.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-8 rounded-2xl shadow-premium bg-card hover:shadow-hover transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center mb-5">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
