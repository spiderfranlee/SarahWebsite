import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Facebook, Instagram, Youtube, Mail, ChevronDown, Calendar, Heart, Feather, Building2, Disc, Image as ImageIcon } from "lucide-react";
import { artistData } from "../data";
import { EventTabType } from "./EventsView";
import { MediaTabType } from "./MediaView";

interface HeaderProps {
  activeSection: string;
  activeEventTab?: EventTabType;
  activeMediaTab?: MediaTabType;
  onNavigate: (section: string, eventTab?: EventTabType, mediaTab?: MediaTabType) => void;
}

export default function Header({
  activeSection,
  activeEventTab = "upcoming",
  activeMediaTab = "all",
  onNavigate
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMediaDropdownOpen, setIsMediaDropdownOpen] = useState(false);
  const [isEventsDropdownOpen, setIsEventsDropdownOpen] = useState(false);
  const mediaDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsEventsDropdownOpen(false);
        setIsMediaDropdownOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsEventsDropdownOpen(false);
      }
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target as Node)) {
        setIsMediaDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = (sectionId: string, eventTab?: EventTabType, mediaTab?: MediaTabType) => {
    onNavigate(sectionId, eventTab, mediaTab);
    setIsMobileMenuOpen(false);
    setIsEventsDropdownOpen(false);
    setIsMediaDropdownOpen(false);
  };

  const isMediaActive = activeSection === "media";
  const isEngagementsActive = activeSection === "engagements" || activeSection === "events" || activeSection === "schedule";

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/98 backdrop-blur-md border-b border-stone-200/90 shadow-xs shadow-stone-200/40"
            : "bg-white/90 backdrop-blur-sm sm:bg-gradient-to-b sm:from-white/95 sm:via-white/85 sm:to-white/0 border-b border-stone-200/40 sm:border-b-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand / Logo */}
          <button
            id="header-brand-logo"
            onClick={() => handleNavClick("home")}
            className="group flex items-center gap-2.5 sm:gap-3.5 text-left focus:outline-none cursor-pointer min-w-0 pr-2"
          >
            {artistData.logo && (
              <img
                src={artistData.logo}
                alt="Sarah Guilmartin Lavery Logo"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105 shrink-0"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="min-w-0">
              <span className="font-serif text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.06em] sm:tracking-[0.14em] text-stone-900 font-bold block transition-colors group-hover:text-navy-800 truncate">
                {artistData.name}
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] text-gold-700 uppercase font-sans font-bold block mt-0.5 truncate">
                {artistData.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {/* 1. Home */}
            <button
              id="nav-link-home"
              onClick={() => handleNavClick("home")}
              className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
                activeSection === "home"
                  ? "text-navy-900"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              HOME
              {activeSection === "home" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />
              )}
            </button>

            {/* 2. About */}
            <button
              id="nav-link-about"
              onClick={() => handleNavClick("about")}
              className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold ${
                activeSection === "about" || activeSection === "biography"
                  ? "text-navy-900"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              ABOUT
              {(activeSection === "about" || activeSection === "biography") && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />
              )}
            </button>

            {/* 3. Media with Dropdown (Recordings, Gallery) */}
            <div
              ref={mediaDropdownRef}
              className="relative"
              onMouseEnter={() => setIsMediaDropdownOpen(true)}
              onMouseLeave={() => setIsMediaDropdownOpen(false)}
            >
              <button
                id="nav-link-media"
                onClick={() => handleNavClick("media")}
                className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold flex items-center gap-1.5 cursor-pointer ${
                  isMediaActive
                    ? "text-navy-900"
                    : "text-stone-700 hover:text-stone-950"
                }`}
              >
                <span>MEDIA</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${isMediaDropdownOpen ? "rotate-180 text-gold-600" : "text-stone-500"}`}
                />
                {isMediaActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />
                )}
              </button>

              {/* Media Dropdown Menu */}
              {isMediaDropdownOpen && (
                <div
                  id="media-dropdown-menu"
                  className="absolute top-full left-0 w-56 pt-2 animate-fadeIn z-50"
                >
                  <div className="bg-white/98 backdrop-blur-xl border border-stone-200 rounded-md shadow-xl p-2 space-y-1">
                    <button
                      id="dropdown-media-recordings"
                      onClick={() => handleNavClick("media", undefined, "recordings")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isMediaActive && activeMediaTab === "recordings"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Disc size={13} className="text-gold-600 shrink-0" />
                      <span>Recordings</span>
                    </button>

                    <button
                      id="dropdown-media-gallery"
                      onClick={() => handleNavClick("media", undefined, "gallery")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isMediaActive && activeMediaTab === "gallery"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <ImageIcon size={13} className="text-gold-600 shrink-0" />
                      <span>Gallery</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Engagements with Dropdown (Upcoming performances, Weddings, Funerals, Corporate) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsEventsDropdownOpen(true)}
              onMouseLeave={() => setIsEventsDropdownOpen(false)}
            >
              <button
                id="nav-link-engagements"
                onClick={() => handleNavClick("engagements", "upcoming")}
                className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold flex items-center gap-1.5 cursor-pointer ${
                  isEngagementsActive
                    ? "text-navy-900"
                    : "text-stone-700 hover:text-stone-950"
                }`}
              >
                <span>ENGAGEMENTS</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-300 ${isEventsDropdownOpen ? "rotate-180 text-gold-600" : "text-stone-500"}`}
                />
                {isEngagementsActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />
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
                      onClick={() => handleNavClick("engagements", "upcoming")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isEngagementsActive && activeEventTab === "upcoming"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Calendar size={13} className="text-gold-600 shrink-0" />
                      <span>Upcoming performances</span>
                    </button>

                    <button
                      id="dropdown-events-weddings"
                      onClick={() => handleNavClick("engagements", "weddings")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isEngagementsActive && activeEventTab === "weddings"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Heart size={13} className="text-gold-600 shrink-0" />
                      <span>Weddings</span>
                    </button>

                    <button
                      id="dropdown-events-funeral"
                      onClick={() => handleNavClick("engagements", "funeral")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isEngagementsActive && activeEventTab === "funeral"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Feather size={13} className="text-gold-600 shrink-0" />
                      <span>Funerals</span>
                    </button>

                    <button
                      id="dropdown-events-corporate"
                      onClick={() => handleNavClick("engagements", "corporate")}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs font-sans tracking-wider rounded transition-colors cursor-pointer ${
                        isEngagementsActive && activeEventTab === "corporate"
                          ? "bg-gold-50 text-navy-900 font-bold"
                          : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                      }`}
                    >
                      <Building2 size={13} className="text-gold-600 shrink-0" />
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
              className={`relative font-sans text-[11px] tracking-[0.25em] transition-all py-1 font-bold cursor-pointer ${
                activeSection === "contact"
                  ? "text-navy-900"
                  : "text-stone-700 hover:text-stone-950"
              }`}
            >
              CONTACT
              {activeSection === "contact" && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500 rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Action Tools: Social Icons (Desktop & Tablet) */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <a
                id="social-facebook"
                href={artistData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-navy-800 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                id="social-instagram"
                href={artistData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-navy-800 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                id="social-youtube"
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-600 hover:text-navy-800 transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
              <button
                id="social-email-nav"
                onClick={() => handleNavClick("contact")}
                className="text-stone-600 hover:text-navy-800 transition-colors p-1 cursor-pointer"
                aria-label="Email Contact"
              >
                <Mail size={16} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-1 lg:hidden shrink-0">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] px-3 py-2 text-stone-800 hover:text-navy-950 bg-stone-100/90 hover:bg-stone-200/90 border border-stone-300/80 rounded-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-drawer"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="text-xs font-sans tracking-wider uppercase font-bold text-stone-800">
                {isMobileMenuOpen ? "Close" : "Menu"}
              </span>
              {isMobileMenuOpen ? <X size={18} className="text-stone-900" /> : <Menu size={18} className="text-stone-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop (click outside to dismiss) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-backdrop"
          className="fixed inset-0 top-16 sm:top-20 bg-stone-950/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu-drawer"
        className={`fixed inset-x-0 top-16 sm:top-20 z-50 lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 shadow-2xl transition-all duration-300 origin-top overflow-y-auto max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-5rem)] flex flex-col ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-2 pointer-events-none invisible"
        }`}
      >
        <div className="px-5 py-6 flex-1 flex flex-col justify-between">
          <nav className="flex flex-col space-y-3">
            {/* 1. Home */}
            <button
              id="mobile-nav-home"
              onClick={() => handleNavClick("home")}
              className={`min-h-[44px] flex items-center px-3.5 py-2 rounded-lg text-left font-serif text-lg tracking-wider transition-colors cursor-pointer ${
                activeSection === "home"
                  ? "bg-gold-50/80 text-navy-950 font-bold border-l-3 border-gold-600 pl-3"
                  : "text-stone-800 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              Home
            </button>

            {/* 2. About */}
            <button
              id="mobile-nav-about"
              onClick={() => handleNavClick("about")}
              className={`min-h-[44px] flex items-center px-3.5 py-2 rounded-lg text-left font-serif text-lg tracking-wider transition-colors cursor-pointer ${
                activeSection === "about" || activeSection === "biography"
                  ? "bg-gold-50/80 text-navy-950 font-bold border-l-3 border-gold-600 pl-3"
                  : "text-stone-800 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              About
            </button>

            {/* 3. Media & Sub-sections */}
            <div className="space-y-1.5 pt-1">
              <button
                id="mobile-nav-media"
                onClick={() => handleNavClick("media")}
                className={`min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-lg text-left font-serif text-lg tracking-wider transition-colors w-full cursor-pointer ${
                  isMediaActive
                    ? "bg-gold-50/80 text-navy-950 font-bold border-l-3 border-gold-600 pl-3"
                    : "text-stone-800 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <span>Media</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-700 bg-white/80 border border-gold-200 px-2 py-0.5 rounded">
                  Performances
                </span>
              </button>

              {/* Sub-items: Recordings, Gallery */}
              <div className="pl-3.5 pr-1 space-y-1 py-1 border-l-2 border-stone-200/80 ml-4">
                <button
                  id="mobile-subnav-recordings"
                  onClick={() => handleNavClick("media", undefined, "recordings")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isMediaActive && activeMediaTab === "recordings"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Disc size={14} className={isMediaActive && activeMediaTab === "recordings" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Recordings & Aorias</span>
                </button>

                <button
                  id="mobile-subnav-gallery"
                  onClick={() => handleNavClick("media", undefined, "gallery")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isMediaActive && activeMediaTab === "gallery"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <ImageIcon size={14} className={isMediaActive && activeMediaTab === "gallery" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Photo Gallery (21 Images)</span>
                </button>
              </div>
            </div>

            {/* 4. Engagements & Sub-sections */}
            <div className="space-y-1.5 pt-1">
              <button
                id="mobile-nav-engagements"
                onClick={() => handleNavClick("engagements", "upcoming")}
                className={`min-h-[44px] flex items-center justify-between px-3.5 py-2 rounded-lg text-left font-serif text-lg tracking-wider transition-colors w-full cursor-pointer ${
                  isEngagementsActive
                    ? "bg-gold-50/80 text-navy-950 font-bold border-l-3 border-gold-600 pl-3"
                    : "text-stone-800 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                <span>Engagements</span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold-700 bg-white/80 border border-gold-200 px-2 py-0.5 rounded">
                  Bookings
                </span>
              </button>

              {/* Sub-items: Upcoming, Weddings, Funerals, Corporate */}
              <div className="pl-3.5 pr-1 space-y-1 py-1 border-l-2 border-stone-200/80 ml-4">
                <button
                  id="mobile-subnav-upcoming"
                  onClick={() => handleNavClick("engagements", "upcoming")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isEngagementsActive && activeEventTab === "upcoming"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Calendar size={14} className={isEngagementsActive && activeEventTab === "upcoming" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Upcoming Performances</span>
                </button>

                <button
                  id="mobile-subnav-weddings"
                  onClick={() => handleNavClick("engagements", "weddings")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isEngagementsActive && activeEventTab === "weddings"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Heart size={14} className={isEngagementsActive && activeEventTab === "weddings" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Weddings</span>
                </button>

                <button
                  id="mobile-subnav-funeral"
                  onClick={() => handleNavClick("engagements", "funeral")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isEngagementsActive && activeEventTab === "funeral"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Feather size={14} className={isEngagementsActive && activeEventTab === "funeral" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Funerals</span>
                </button>

                <button
                  id="mobile-subnav-corporate"
                  onClick={() => handleNavClick("engagements", "corporate")}
                  className={`min-h-[42px] w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm font-sans tracking-wide rounded-md transition-colors cursor-pointer ${
                    isEngagementsActive && activeEventTab === "corporate"
                      ? "bg-navy-900 text-gold-300 font-bold shadow-xs"
                      : "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <Building2 size={14} className={isEngagementsActive && activeEventTab === "corporate" ? "text-gold-300 shrink-0" : "text-gold-600 shrink-0"} />
                  <span className="font-medium">Corporate Events</span>
                </button>
              </div>
            </div>

            {/* 5. Contact */}
            <button
              id="mobile-nav-contact"
              onClick={() => handleNavClick("contact")}
              className={`min-h-[44px] flex items-center px-3.5 py-2 rounded-lg text-left font-serif text-lg tracking-wider transition-colors cursor-pointer ${
                activeSection === "contact"
                  ? "bg-gold-50/80 text-navy-950 font-bold border-l-3 border-gold-600 pl-3"
                  : "text-stone-800 hover:text-stone-950 hover:bg-stone-50"
              }`}
            >
              Contact & Representation
            </button>
          </nav>

          {/* Bottom Drawer Actions & Socials */}
          <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col gap-4">
            <button
              id="mobile-drawer-book-btn"
              onClick={() => handleNavClick("contact")}
              className="w-full py-3 px-4 bg-navy-900 hover:bg-navy-850 active:bg-gold-600 text-gold-300 hover:text-white rounded-lg font-sans text-xs uppercase tracking-[0.2em] font-bold text-center transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail size={15} />
              <span>Book Sarah / Inquire</span>
            </button>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-3">
                <a
                  href={artistData.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-navy-900 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={19} />
                </a>
                <a
                  href={artistData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-navy-900 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={19} />
                </a>
                <a
                  href={artistData.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-navy-900 hover:bg-stone-100 rounded-full transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={19} />
                </a>
              </div>

              <span className="text-[11px] font-sans tracking-widest text-stone-500 font-medium uppercase">
                Dublin, Ireland
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
