import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Building } from "lucide-react";
import { artistData } from "../data";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: "Engagement / Booking",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-stone-950 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
            REPRESENTATION & INQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Contact & Management
          </h2>
          <div className="w-16 h-[2px] bg-gold-accent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Management & Direct Information */}
          <div className="lg:col-span-5 space-y-8">
            {/* Worldwide Representation Box */}
            <div className="bg-stone-900/60 border border-stone-800 p-8 rounded-sm shadow-xl space-y-6">
              <div>
                <span className="text-[10px] font-sans tracking-widest uppercase text-gold-accent font-bold block mb-1">
                  Worldwide Representation
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-100">
                  {artistData.management.agency}
                </h3>
              </div>

              <div className="space-y-4 text-xs font-sans text-stone-300">
                <div className="flex items-start gap-3">
                  <Building size={16} className="text-gold-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-400">Artist Manager:</p>
                    <p className="font-semibold text-stone-200">{artistData.management.agentName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-gold-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-400">Management Email:</p>
                    <a
                      href={`mailto:${artistData.management.email}`}
                      className="text-stone-200 hover:text-gold-accent underline transition-colors"
                    >
                      {artistData.management.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-gold-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-400">Telephone:</p>
                    <p className="text-stone-200">{artistData.management.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe size={16} className="text-gold-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-400">Territory:</p>
                    <p className="text-stone-200">{artistData.management.territory}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Artist Contact */}
            <div className="bg-stone-900/40 border border-stone-800 p-8 rounded-sm space-y-4">
              <span className="text-[10px] font-sans tracking-widest uppercase text-gold-accent font-bold block">
                Direct Inquiries & Masterclasses
              </span>
              <p className="text-xs text-stone-400 font-sans leading-relaxed">
                For private coaching, masterclass engagements, and direct artistic collaborations:
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-300">
                <Mail size={15} className="text-gold-accent" />
                <a
                  href={`mailto:${artistData.email}`}
                  className="text-stone-200 hover:text-gold-accent font-semibold underline transition-colors"
                >
                  {artistData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-400">
                <MapPin size={15} className="text-stone-500" />
                <span>{artistData.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-stone-900/40 border border-stone-800 p-8 md:p-10 rounded-sm shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-stone-100 mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs font-sans text-stone-400 mb-8">
              Please include production dates, repertoire details, or casting inquiries.
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-stone-950 border border-gold-accent/50 rounded-sm text-center space-y-4 animate-fadeIn">
                <CheckCircle size={40} className="text-gold-accent mx-auto" />
                <h4 className="font-serif text-xl font-bold text-stone-100">
                  Thank You for Your Inquiry
                </h4>
                <p className="text-xs font-sans text-stone-300 max-w-md mx-auto leading-relaxed">
                  Your message has been received. Sarah's management will review the engagement details and respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-gold-accent text-xs font-sans tracking-widest uppercase font-semibold border border-stone-800 rounded-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-400 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-400 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. promoter@opera.org"
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-400 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Festival Opera / Symphony"
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-400 mb-2">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 focus:outline-none focus:border-gold-accent transition-colors"
                    >
                      <option>Operatic Role Booking</option>
                      <option>Concert / Oratorio Soloist</option>
                      <option>Solo Recital / Festival</option>
                      <option>Masterclass / Vocal Workshop</option>
                      <option>Media & Press Interview</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-400 mb-2">
                    Message / Engagement Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide performance dates, proposed venue, repertoire, or details..."
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-sm text-xs font-sans text-stone-200 placeholder-stone-600 focus:outline-none focus:border-gold-accent transition-colors resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-gold-accent hover:bg-[#d8b56f] text-stone-950 text-xs font-sans tracking-[0.25em] font-bold uppercase transition-all duration-300 rounded-sm shadow-xl flex items-center justify-center gap-2 group"
                >
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
