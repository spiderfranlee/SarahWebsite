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
    <footer id="main-footer" className="bg-stone-950 border-t border-stone-800 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Newsletter & Brand Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 tracking-widest block">
              {artistData.name}
            </span>
            <p className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold">
              {artistData.tagline} · {artistData.location}
            </p>
            <p className="text-xs font-sans text-stone-400 max-w-md leading-relaxed pt-2">
              For worldwide operatic engagements, orchestral gala concerts, solo recitals, and masterclasses.
            </p>

            <div className="flex items-center space-x-3 pt-3">
              <a
                href={artistData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-accent hover:text-gold-accent flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-accent hover:text-gold-accent flex items-center justify-center text-stone-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
              <a
                href={artistData.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-accent hover:text-gold-accent flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Spotify"
              >
                <Music size={14} />
              </a>
              <button
                onClick={() => onNavigate("contact")}
                className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-accent hover:text-gold-accent flex items-center justify-center text-stone-400 transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={14} />
              </button>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 bg-stone-900/50 border border-stone-800 p-6 sm:p-8 rounded-sm space-y-4">
            <span className="text-xs font-sans tracking-widest uppercase text-gold-accent font-semibold block">
              Concert & Ticket Updates
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-100">
              Subscribe to Season Diary
            </h4>
            <p className="text-xs font-sans text-stone-400 leading-relaxed">
              Receive advance notifications for upcoming opera productions, recital dates, and recording releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-950 border border-gold-accent/40 rounded-sm text-xs font-sans text-gold-accent flex items-center gap-2">
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
                  className="flex-1 px-4 py-2.5 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold-accent hover:bg-[#d8b56f] text-stone-950 text-xs font-sans tracking-wider font-bold uppercase rounded-sm transition-colors flex items-center gap-1.5"
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
            {["home", "biography", "schedule", "repertoire", "media", "reviews", "contact"].map((sec) => (
              <button
                key={sec}
                onClick={() => onNavigate(sec)}
                className="hover:text-stone-300 uppercase tracking-widest text-[11px] transition-colors"
              >
                {sec}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <p className="text-stone-500 text-[11px]">
              © {new Date().getFullYear()} {artistData.fullName}. All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="p-2 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-gold-accent rounded-sm border border-stone-800 transition-colors"
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
