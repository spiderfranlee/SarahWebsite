import React, { useState, useEffect } from "react";
import { Menu, X, Instagram, Youtube, Music, Mail, Image as ImageIcon } from "lucide-react";
import { artistData } from "../data";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenPhotoCustomizer: () => void;
}

export default function Header({ activeSection, onNavigate, onOpenPhotoCustomizer }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "biography", label: "BIOGRAPHY" },
    { id: "schedule", label: "SCHEDULE" },
    { id: "repertoire", label: "REPERTOIRE" },
    { id: "media", label: "MEDIA & AUDIO" },
    { id: "reviews", label: "REVIEWS" },
    { id: "contact", label: "CONTACT" }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 py-3 shadow-2xl"
          : "bg-gradient-to-b from-stone-950/90 via-stone-950/60 to-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo matching deirdrehiggins.com */}
        <button
          id="header-brand-logo"
          onClick={() => handleNavClick("home")}
          className="group text-left focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-stone-100 font-bold block transition-colors group-hover:text-gold-accent">
            {artistData.name}
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-gold-accent uppercase font-sans font-semibold block mt-0.5">
            {artistData.tagline}
          </span>
        </button>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-semibold ${
                  isActive
                    ? "text-gold-accent"
                    : "text-stone-300 hover:text-stone-100"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gold-accent rounded-full animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools: Social Icons & Photo Customizer */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="header-photo-customizer-btn"
            onClick={onOpenPhotoCustomizer}
            title="Customize Photo / Replace Main Image"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900/80 hover:bg-gold-accent hover:text-stone-950 text-stone-300 text-[10px] tracking-widest font-sans font-semibold uppercase border border-stone-800 hover:border-gold-accent transition-all rounded-sm shadow-sm"
          >
            <ImageIcon size={13} />
            <span>Main Image</span>
          </button>

          <div className="flex items-center space-x-2 border-l border-stone-800 pl-4">
            <a
              id="social-instagram"
              href={artistData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-gold-accent transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram size={15} />
            </a>
            <a
              id="social-youtube"
              href={artistData.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-gold-accent transition-colors p-1"
              aria-label="YouTube"
            >
              <Youtube size={15} />
            </a>
            <a
              id="social-spotify"
              href={artistData.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-gold-accent transition-colors p-1"
              aria-label="Spotify"
            >
              <Music size={15} />
            </a>
            <button
              id="social-email-nav"
              onClick={() => handleNavClick("contact")}
              className="text-stone-400 hover:text-gold-accent transition-colors p-1"
              aria-label="Email Contact"
            >
              <Mail size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            id="mobile-photo-tool-btn"
            onClick={onOpenPhotoCustomizer}
            className="p-2 text-stone-300 hover:text-gold-accent border border-stone-800 rounded"
            title="Main Photo"
          >
            <ImageIcon size={16} />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-stone-200 hover:text-gold-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-stone-950/98 backdrop-blur-xl border-b border-stone-800 px-6 py-8 animate-fadeIn"
        >
          <nav className="flex flex-col space-y-5">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-left font-serif text-lg tracking-widest transition-colors py-1 ${
                  activeSection === item.id
                    ? "text-gold-accent font-bold pl-2 border-l-2 border-gold-accent"
                    : "text-stone-300 hover:text-stone-100"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between">
            <div className="flex space-x-4">
              <a href={artistData.socials.instagram} className="text-stone-400 hover:text-gold-accent">
                <Instagram size={18} />
              </a>
              <a href={artistData.socials.youtube} className="text-stone-400 hover:text-gold-accent">
                <Youtube size={18} />
              </a>
              <a href={artistData.socials.spotify} className="text-stone-400 hover:text-gold-accent">
                <Music size={18} />
              </a>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPhotoCustomizer();
              }}
              className="text-xs font-sans tracking-widest text-gold-accent uppercase font-semibold"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
