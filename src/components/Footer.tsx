import React from "react";
import { Mail, Facebook, Instagram, Youtube, ArrowUp } from "lucide-react";
import { artistData } from "../data";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-[#FAF8F5] border-t border-stone-200 text-stone-700 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Brand & Direct Inquiries Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-stone-200">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              {artistData.logo && (
                <img
                  src={artistData.logo}
                  alt="Sarah Guilmartin Lavery Logo"
                  className="h-14 w-14 sm:h-16 sm:w-16 object-contain mix-blend-multiply shrink-0"
                  referrerPolicy="no-referrer"
                />
              )}
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight block">
                  {artistData.name}
                </span>
                <p className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold">
                  {artistData.tagline} · {artistData.location}
                </p>
              </div>
            </div>
          </div>

          {/* Social & Contact Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
            <div className="flex items-center space-x-3">
              <a
                id="footer-facebook"
                href={artistData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-gold-400 hover:text-navy-900 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                id="footer-instagram"
                href={artistData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-gold-400 hover:text-navy-900 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-gold-400 hover:text-navy-900 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <button
                onClick={() => onNavigate("contact")}
                className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:border-gold-400 hover:text-navy-900 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Email Contact"
              >
                <Mail size={16} />
              </button>
            </div>

            <button
              onClick={() => onNavigate("contact")}
              className="px-5 py-2.5 bg-navy-900 hover:bg-navy-850 text-gold-300 text-xs font-sans tracking-wider uppercase font-bold rounded-md transition-colors shadow-xs cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Footer Nav Links & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500 font-sans">
          <nav className="flex flex-wrap items-center gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "media", label: "Media" },
              { id: "engagements", label: "Engagements" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="hover:text-gold-700 uppercase tracking-widest text-[11px] font-bold transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-stone-500 text-[11px] font-medium">
              © {new Date().getFullYear()} {artistData.fullName}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 bg-white hover:bg-gold-50 text-stone-600 hover:text-gold-700 rounded border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Website Creator Credit */}
        <div className="mt-8 pt-4 border-t border-stone-200/70">
          <p style={{ fontSize: "12px", opacity: 0.7, textAlign: "center" }} className="text-stone-600">
            Website by Fran Lee ·{" "}
            <a
              href="https://spiderfranlee.github.io/FranLeePortfolio/?utm_source=friendsite&utm_medium=footer&utm_campaign=credit"
              target="_blank"
              rel="noopener"
              className="underline hover:text-navy-900 transition-colors"
            >
              Get in Touch
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
