export default function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto bg-card/95 backdrop-blur-xl p-2 md:p-3 rounded-[24px] shadow-search border border-white/10 flex flex-col md:flex-row gap-2 items-center">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 px-4">
        <div className="flex flex-col items-start py-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Lieu de prise en charge</label>
           <input type="text" placeholder="Rechercher une ville..." className="w-full text-sm font-medium bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground/50" />
         </div>
         <div className="flex flex-col items-start py-2 border-y md:border-y-0 md:border-x border-border/50 md:px-6">
           <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Date de départ</label>
           <input type="date" className="w-full text-sm font-medium bg-transparent focus:outline-none text-foreground" />
         </div>
         <div className="flex flex-col items-start py-2 md:pl-6">
           <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Date de retour</label>
          <input type="date" className="w-full text-sm font-medium bg-transparent focus:outline-none text-foreground" />
        </div>
      </div>
      <button className="w-full md:w-auto whitespace-nowrap bg-primary hover:bg-brand-hover text-primary-foreground px-8 py-4 rounded-[18px] font-bold transition-all active:scale-95">
        Rechercher
      </button>
    </div>
  );
}
