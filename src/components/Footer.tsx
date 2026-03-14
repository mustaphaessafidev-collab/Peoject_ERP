import { Twitter, Linkedin, Mail } from "lucide-react";

const columns = [
  {
    title: "Platform",
    links: ["Browse Fleet", "ERP Integration", "Pricing Plans", "Locations"],
  },
  {
    title: "Support",
    links: ["Help Center", "Safety Info", "Cancellation Policy", "Terms of Service"],
  },
  {
    title: "Company",
    links: ["About Us", "Sustainability", "Careers", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-lg tracking-tight mb-4">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-black">D</span>
              </div>
              DriveERP
            </div>
            <p className="text-background/50 text-sm leading-relaxed mb-6 max-w-xs">
              Integrated enterprise car rental solutions for business and leisure. Streamlining your journey through innovation and reliability.
            </p>
            <div className="flex gap-3">
              {[Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors">
                  <Icon className="w-4 h-4 text-background/60" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-background/10 mt-16 pt-8 text-center">
          <p className="text-xs text-background/40">© 2023 DriveERP Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
