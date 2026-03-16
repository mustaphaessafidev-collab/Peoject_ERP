import { useState } from "react";
import { Menu, X, User } from "lucide-react";

const navLinks = [
  { label: "Catalogue", href: "#catalog" },
  { label: "Mes Réservations", href: "#" },
  { label: "Support", href: "#" },
];

const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (href.startsWith("#")) {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-bold text-lg tracking-tight text-foreground">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-black">D</span>
          </div>
          DriveERP
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary rounded-lg transition-colors">
            Connexion
          </button>
          <button className="px-5 py-2 text-sm font-semibold bg-primary text-primary-foreground rounded-lg hover:bg-brand-hover transition-colors">
            Se connecter
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { scrollToSection(e, link.href); setOpen(false); }}
              className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <button className="w-full mt-2 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
            Se connecter
          </button>
        </div>
      )}
    </nav>
  );
}
