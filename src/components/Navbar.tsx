import { useState } from "react";
import { Menu, X, User } from "lucide-react";

const navLinks = ["Catalog", "My Bookings", "Support"];

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
              key={link}
              href={link === "Catalog" ? "#catalog" : "#"}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary rounded-lg transition-colors">
            Sign In
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent transition-colors">
            <User className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <a key={link} href="#" className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
              {link}
            </a>
          ))}
          <button className="w-full mt-2 py-2.5 text-sm font-semibold bg-primary text-primary-foreground rounded-lg">
            Sign In
          </button>
        </div>
      )}
    </nav>
  );
}
