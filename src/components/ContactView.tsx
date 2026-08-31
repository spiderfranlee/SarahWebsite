import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Building } from "lucide-react";
import { artistData } from "../data";

interface ContactViewProps {
  initialInquiryType?: string;
}

export default function ContactView({ initialInquiryType }: ContactViewProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: initialInquiryType || "Wedding Ceremony & Reception",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialInquiryType) {
      setFormData(prev => ({ ...prev, inquiryType: initialInquiryType }));
    }
  }, [initialInquiryType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // Keep feedback visible
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 bg-white border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold block mb-2">
            REPRESENTATION & INQUIRIES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Contact & Management
          </h2>
          <div className="w-16 h-[2px] bg-rose-600 mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Management & Direct Information */}
          <div className="lg:col-span-5 space-y-8">
            {/* Worldwide Representation Box */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-sans tracking-widest uppercase text-rose-700 font-bold block mb-1">
                  Worldwide Representation
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {artistData.management.agency}
                </h3>
              </div>

              <div className="space-y-4 text-xs font-sans text-stone-700">
                <div className="flex items-start gap-3">
                  <Building size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Artist Manager:</p>
                    <p className="font-bold text-stone-900">{artistData.management.agentName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Management Email:</p>
                    <a
                      href={`mailto:${artistData.management.email}`}
                      className="text-stone-900 hover:text-rose-700 font-bold underline transition-colors"
                    >
                      {artistData.management.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Telephone:</p>
                    <p className="font-bold text-stone-900">{artistData.management.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Territory:</p>
                    <p className="font-bold text-stone-900">{artistData.management.territory}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Artist Contact */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg shadow-sm space-y-4">
              <span className="text-[10px] font-sans tracking-widest uppercase text-amber-800 font-bold block">
                Direct Inquiries & Masterclasses
              </span>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                For private coaching, wedding consultations, and direct artistic collaborations:
              </p>
              <div className="flex items-center gap-3 text-xs text-stone-700">
                <Mail size={15} className="text-rose-700" />
                <a
                  href={`mailto:${artistData.email}`}
                  className="text-stone-900 hover:text-rose-700 font-bold underline transition-colors"
                >
                  {artistData.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                <MapPin size={15} className="text-rose-700" />
                <span>{artistData.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 p-8 md:p-10 rounded-lg shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Send an Inquiry
            </h3>
            <p className="text-xs font-sans text-stone-600 mb-8">
              Please include performance dates, event location, proposed repertoire, or booking details.
            </p>

            {isSubmitted ? (
              <div className="p-8 bg-white border border-rose-200 rounded-lg text-center space-y-4 shadow-sm animate-fadeIn">
                <CheckCircle size={40} className="text-rose-700 mx-auto" />
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  Thank You for Your Inquiry
                </h4>
                <p className="text-xs font-sans text-stone-700 max-w-md mx-auto leading-relaxed">
                  Your message has been received. Sarah and management will review the engagement details and respond promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-sans tracking-widest uppercase font-bold border border-rose-200 rounded transition cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Rigby"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. promoter@opera.org"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="e.g. Festival Opera / Symphony"
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 font-medium focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors shadow-2xs"
                    >
                      <option>Wedding Ceremony & Reception</option>
                      <option>Funeral & Memorial Service</option>
                      <option>Corporate Gala & Private Recital</option>
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
                  <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                    Message / Engagement Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide performance dates, proposed venue, repertoire, or details..."
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors resize-y shadow-2xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 text-white text-xs font-sans tracking-[0.25em] font-bold uppercase transition-all duration-300 rounded shadow-md flex items-center justify-center gap-2 group cursor-pointer"
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
