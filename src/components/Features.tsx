import { Shield, Headphones, Key } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Best Price Guarantee",
    text: "We provide the most competitive rates in the market with no hidden fees or extra charges upon return.",
  },
  {
    icon: Headphones,
    title: "24/7 Roadside Support",
    text: "Our dedicated support team is available around the clock to assist you with any issues during your journey.",
  },
  {
    icon: Key,
    title: "Seamless Digital Access",
    text: "Unlock your vehicle directly through the app. No paperwork, no queues, just pick up and drive.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">Why DriveERP?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">Built for professionals who demand reliability, transparency, and speed.</p>
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
