export default function CTA() {
  return (
    <section className="py-24 container mx-auto px-6">
      <div className="bg-gradient-to-br from-primary to-brand-hover rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-primary-foreground">
            Prêt à démarrer votre prochaine aventure ?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-10 max-w-xl mx-auto">
            Parcourez notre flotte de plus de 500 véhicules premium et réservez en moins de 60 secondes.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-card text-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-colors shadow-lg">
              Réserver
            </button>
            <button className="bg-primary-foreground/10 backdrop-blur text-primary-foreground border border-primary-foreground/20 px-8 py-4 rounded-xl font-bold hover:bg-primary-foreground/20 transition-colors">
              Voir le catalogue
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl -mr-48 -mt-48" />
      </div>
    </section>
  );
}
