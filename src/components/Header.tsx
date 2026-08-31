import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Instagram, Youtube, Music, Mail, Image as ImageIcon, ChevronDown, Calendar, Heart, Feather, Building2 } from "lucide-react";
import { artistData } from "../data";
import { EventTabType } from "./EventsView";

interface HeaderProps {
  activeSection: string;
  activeEventTab?: EventTabType;
  onNavigate: (section: string, eventTab?: EventTabType) => void;
  onOpenPhotoCustomizer: () => void;
}

export default function Header({
  activeSection,
  activeEventTab = "upcoming",
  onNavigate,
  onOpenPhotoCustomizer
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEventsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (sectionId: string, eventTab?: EventTabType) => {
    onNavigate(sectionId, eventTab);
    setIsMobileMenuOpen(false);
    setIsEventsDropdownOpen(false);
  };

  const isEventsActive = activeSection === "events" || activeSection === "schedule";

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-stone-200/90 py-3 shadow-md shadow-stone-200/40"
          : "bg-gradient-to-b from-white/95 via-white/80 to-white/0 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          id="header-brand-logo"
          onClick={() => handleNavClick("home")}
          className="group text-left focus:outline-none"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-stone-900 font-bold block transition-colors group-hover:text-rose-700">
            {artistData.name}
          </span>
          <span className="text-[10px] sm:text-[11px] tracking-[0.35em] text-amber-700 uppercase font-sans font-bold block mt-0.5">
            {artistData.tagline}
          </span>
        </button>

        {/* Desktop Navigation Links (Exact requested headings) */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
          {/* 1. Home */}
          <button
            id="nav-link-home"
            onClick={() => handleNavClick("home")}
            className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
              activeSection === "home"
                ? "text-rose-700"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            HOME
            {activeSection === "home" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600 rounded-full" />
            )}
          </button>

          {/* 2. About */}
          <button
            id="nav-link-about"
            onClick={() => handleNavClick("about")}
            className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
              activeSection === "about" || activeSection === "biography"
                ? "text-rose-700"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            ABOUT
            {(activeSection === "about" || activeSection === "biography") && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600 rounded-full" />
            )}
          </button>

          {/* 3. Media */}
          <button
            id="nav-link-media"
            onClick={() => handleNavClick("media")}
            className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
              activeSection === "media"
                ? "text-rose-700"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            MEDIA
            {activeSection === "media" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600 rounded-full" />
            )}
          </button>

          {/* 4. Events with Dropdown (Upcoming Performances, Weddings, Funeral, Corporate) */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsEventsDropdownOpen(true)}
            onMouseLeave={() => setIsEventsDropdownOpen(false)}
          >
            <button
              id="nav-link-events"
              onClick={() => handleNavClick("events", "upcoming")}
              className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold flex items-center gap-1.5 ${
                isEventsActive
                  ? "text-rose-700"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              <span>EVENTS</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${isEventsDropdownOpen ? "rotate-180 text-rose-700" : "text-stone-500"}`}
              />
              {isEventsActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600 rounded-full" />
              )}
            </button>

            {/* Dropdown Menu Panel */}
            {isEventsDropdownOpen && (
              <div
                id="events-dropdown-menu"
                className="absolute top-full left-0 w-64 pt-2 animate-fadeIn z-50"
              >
                <div className="bg-white/98 backdrop-blur-xl border border-stone-200 rounded-md shadow-xl p-2 space-y-1">
                  <button
                    id="dropdown-events-upcoming"
                    onClick={() => handleNavClick("events", "upcoming")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors ${
                      isEventsActive && activeEventTab === "upcoming"
                        ? "bg-rose-50 text-rose-700 font-bold"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Calendar size={13} className="text-amber-600 shrink-0" />
                    <span>Upcoming performances</span>
                  </button>

                  <button
                    id="dropdown-events-weddings"
                    onClick={() => handleNavClick("events", "weddings")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors ${
                      isEventsActive && activeEventTab === "weddings"
                        ? "bg-rose-50 text-rose-700 font-bold"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Heart size={13} className="text-rose-600 shrink-0" />
                    <span>Weddings</span>
                  </button>

                  <button
                    id="dropdown-events-funeral"
                    onClick={() => handleNavClick("events", "funeral")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors ${
                      isEventsActive && activeEventTab === "funeral"
                        ? "bg-rose-50 text-rose-700 font-bold"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Feather size={13} className="text-amber-600 shrink-0" />
                    <span>Funeral</span>
                  </button>

                  <button
                    id="dropdown-events-corporate"
                    onClick={() => handleNavClick("events", "corporate")}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors ${
                      isEventsActive && activeEventTab === "corporate"
                        ? "bg-rose-50 text-rose-700 font-bold"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                    }`}
                  >
                    <Building2 size={13} className="text-amber-600 shrink-0" />
                    <span>Corporate</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 5. Contact */}
          <button
            id="nav-link-contact"
            onClick={() => handleNavClick("contact")}
            className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
              activeSection === "contact"
                ? "text-rose-700"
                : "text-stone-700 hover:text-stone-950"
            }`}
          >
            CONTACT
            {activeSection === "contact" && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-600 rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Action Tools: Social Icons & Photo Customizer */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            id="header-photo-customizer-btn"
            onClick={onOpenPhotoCustomizer}
            title="Customize Photo / Replace Main Image"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-rose-700 hover:text-white text-stone-700 text-[10px] tracking-widest font-sans font-bold uppercase border border-stone-300 hover:border-rose-700 transition-all rounded shadow-sm"
          >
            <ImageIcon size={13} />
            <span>Main Image</span>
          </button>

          <div className="flex items-center space-x-2 border-l border-stone-300 pl-4">
            <a
              id="social-instagram"
              href={artistData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-rose-700 transition-colors p-1"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              id="social-youtube"
              href={artistData.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-rose-700 transition-colors p-1"
              aria-label="YouTube"
            >
              <Youtube size={16} />
            </a>
            <a
              id="social-spotify"
              href={artistData.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-600 hover:text-rose-700 transition-colors p-1"
              aria-label="Spotify"
            >
              <Music size={16} />
            </a>
            <button
              id="social-email-nav"
              onClick={() => handleNavClick("contact")}
              className="text-stone-600 hover:text-rose-700 transition-colors p-1"
              aria-label="Email Contact"
            >
              <Mail size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center space-x-2 lg:hidden">
          <button
            id="mobile-photo-tool-btn"
            onClick={onOpenPhotoCustomizer}
            className="p-2 text-stone-700 hover:text-rose-700 border border-stone-300 bg-white rounded"
            title="Main Photo"
          >
            <ImageIcon size={16} />
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-rose-700 transition-colors flex items-center gap-1.5"
            aria-label="Toggle navigation menu"
          >
            <span className="text-xs font-sans tracking-widest uppercase font-bold text-stone-700">
              Menu
            </span>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Hierarchical exact matching requested headings) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-6 py-6 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-xl"
        >
          <div className="text-xs font-sans tracking-[0.25em] text-rose-700 font-bold uppercase pb-3 border-b border-stone-200 mb-4">
            Menu
          </div>

          <nav className="flex flex-col space-y-4">
            {/* 1. Home */}
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick("home")}
              className={`text-left font-serif text-lg tracking-widest transition-colors py-1 ${
                activeSection === "home"
                  ? "text-rose-700 font-bold pl-2 border-l-2 border-rose-600"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Home
            </button>

            {/* 2. About */}
            <button
              id="mobile-nav-about"
              onClick={() => handleNavClick("about")}
              className={`text-left font-serif text-lg tracking-widest transition-colors py-1 ${
                activeSection === "about" || activeSection === "biography"
                  ? "text-rose-700 font-bold pl-2 border-l-2 border-rose-600"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              About
            </button>

            {/* 3. Media */}
            <button
              id="mobile-nav-media"
              onClick={() => handleNavClick("media")}
              className={`text-left font-serif text-lg tracking-widest transition-colors py-1 ${
                activeSection === "media"
                  ? "text-rose-700 font-bold pl-2 border-l-2 border-rose-600"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Media
            </button>

            {/* 4. Events & Nested Sub-items */}
            <div className="space-y-2 pt-1 pb-1">
              <button
                id="mobile-nav-events"
                onClick={() => handleNavClick("events", "upcoming")}
                className={`text-left font-serif text-lg tracking-widest transition-colors py-1 block w-full ${
                  isEventsActive
                    ? "text-rose-700 font-bold pl-2 border-l-2 border-rose-600"
                    : "text-stone-800 hover:text-stone-950 font-medium"
                }`}
              >
                Events
              </button>

              {/* Sub-items list matching prompt indentation */}
              <div className="pl-5 border-l border-stone-200 ml-2 space-y-2.5 py-1">
                <button
                  id="mobile-subnav-upcoming"
                  onClick={() => handleNavClick("events", "upcoming")}
                  className={`text-left text-sm font-sans tracking-wider block w-full transition-colors flex items-center gap-2 ${
                    isEventsActive && activeEventTab === "upcoming"
                      ? "text-rose-700 font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span className="text-amber-600">•</span>
                  <span>upcoming performances</span>
                </button>

                <button
                  id="mobile-subnav-weddings"
                  onClick={() => handleNavClick("events", "weddings")}
                  className={`text-left text-sm font-sans tracking-wider block w-full transition-colors flex items-center gap-2 ${
                    isEventsActive && activeEventTab === "weddings"
                      ? "text-rose-700 font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span className="text-rose-600">•</span>
                  <span>weddings</span>
                </button>

                <button
                  id="mobile-subnav-funeral"
                  onClick={() => handleNavClick("events", "funeral")}
                  className={`text-left text-sm font-sans tracking-wider block w-full transition-colors flex items-center gap-2 ${
                    isEventsActive && activeEventTab === "funeral"
                      ? "text-rose-700 font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span className="text-amber-600">•</span>
                  <span>funeral</span>
                </button>

                <button
                  id="mobile-subnav-corporate"
                  onClick={() => handleNavClick("events", "corporate")}
                  className={`text-left text-sm font-sans tracking-wider block w-full transition-colors flex items-center gap-2 ${
                    isEventsActive && activeEventTab === "corporate"
                      ? "text-rose-700 font-bold"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span className="text-amber-600">•</span>
                  <span>corporate</span>
                </button>
              </div>
            </div>

            {/* 5. Contact */}
            <button
              id="mobile-nav-contact"
              onClick={() => handleNavClick("contact")}
              className={`text-left font-serif text-lg tracking-widest transition-colors py-1 ${
                activeSection === "contact"
                  ? "text-rose-700 font-bold pl-2 border-l-2 border-rose-600"
                  : "text-stone-700 hover:text-stone-900"
              }`}
            >
              Contact
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between">
            <div className="flex space-x-4">
              <a href={artistData.socials.instagram} className="text-stone-600 hover:text-rose-700">
                <Instagram size={18} />
              </a>
              <a href={artistData.socials.youtube} className="text-stone-600 hover:text-rose-700">
                <Youtube size={18} />
              </a>
              <a href={artistData.socials.spotify} className="text-stone-600 hover:text-rose-700">
                <Music size={18} />
              </a>
            </div>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPhotoCustomizer();
              }}
              className="text-xs font-sans tracking-widest text-rose-700 uppercase font-bold"
            >
              Change Photo
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
