import React, { useState } from "react";
import { Mail, Instagram, Youtube, Music, ArrowUp, Send, Check } from "lucide-react";
import { artistData } from "../data";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="main-footer" className="bg-[#FAF8F5] border-t border-stone-200 text-stone-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter & Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-200">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight block">
              {artistData.name}
            </span>
            <p className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold">
              {artistData.tagline} · {artistData.location}
            </p>
            <p className="text-xs font-sans text-stone-600 max-w-md leading-relaxed pt-2">
              For worldwide operatic engagements, orchestral gala concerts, bespoke weddings, sacred services, and masterclasses.
            </p>

            <div className="flex items-center space-x-3 pt-3">
              <a
                href={artistData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-rose-300 hover:text-rose-700 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-rose-300 hover:text-rose-700 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="YouTube"
              >
                <Youtube size={15} />
              </a>
              <a
                href={artistData.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-rose-300 hover:text-rose-700 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Spotify"
              >
                <Music size={15} />
              </a>
              <button
                onClick={() => onNavigate("contact")}
                className="w-9 h-9 rounded-full bg-white border border-stone-200 hover:border-rose-300 hover:text-rose-700 flex items-center justify-center text-stone-600 transition-colors shadow-2xs cursor-pointer"
                aria-label="Email Contact"
              >
                <Mail size={15} />
              </button>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-white border border-stone-200 p-6 sm:p-8 rounded-lg space-y-4 shadow-sm">
            <span className="text-xs font-sans tracking-widest uppercase text-rose-700 font-bold block">
              Concert & Ticket Updates
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Subscribe to Season Diary
            </h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed">
              Receive advance notifications for upcoming opera productions, recital dates, and recording releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded text-xs font-sans text-rose-800 font-bold flex items-center gap-2">
                <Check size={16} />
                <span>Thank you for subscribing to Sarah Lavery's diary!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="flex-1 px-4 py-2.5 bg-[#FAF8F5] border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 shadow-2xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans tracking-wider font-bold uppercase rounded transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Join</span>
                  <Send size={12} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Nav Links & Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500 font-sans">
          <nav className="flex flex-wrap items-center gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "media", label: "Media" },
              { id: "events", label: "Events" },
              { id: "contact", label: "Contact" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="hover:text-rose-700 uppercase tracking-widest text-[11px] font-bold transition-colors cursor-pointer"
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
              className="p-2 bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-700 rounded border border-stone-200 transition-colors shadow-2xs cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
