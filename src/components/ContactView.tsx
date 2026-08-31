import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Globe, Building, AlertCircle, Loader2 } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialInquiryType) {
      setFormData(prev => ({ ...prev, inquiryType: initialInquiryType }));
    }
  }, [initialInquiryType]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const formElement = e.currentTarget;
      const formPayload = new FormData(formElement);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formPayload,
        headers: {
          Accept: "application/json"
        }
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          organization: "",
          inquiryType: initialInquiryType || "Wedding Ceremony & Reception",
          message: ""
        });
      } else {
        setErrorMessage(result.message || "Failed to send your inquiry. Please try again or email directly.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection or contact directly via email.");
    } finally {
      setIsSubmitting(false);
    }
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
          {/* Left Column: Direct Contact & Booking Information */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Inquiries Primary Box */}
            <div className="bg-[#FAF8F5] border border-stone-200 p-8 rounded-lg shadow-sm space-y-6">
              <div>
                <span className="text-[10px] font-sans tracking-widest uppercase text-rose-700 font-bold block mb-1">
                  Direct Inquiries & Bookings
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Sarah Lavery
                </h3>
                <p className="text-xs font-sans text-stone-500 font-medium mt-1">
                  Irish Lyric Soprano
                </p>
              </div>

              <div className="space-y-4 text-xs font-sans text-stone-700">
                <div className="flex items-start gap-3 p-3.5 bg-white border border-stone-200 rounded-md">
                  <Mail size={18} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] uppercase font-sans tracking-wider text-stone-500 font-bold mb-0.5">
                      Direct Email Contact
                    </p>
                    <a
                      href={`mailto:${artistData.email}`}
                      className="text-stone-900 hover:text-rose-700 font-bold text-sm underline transition-colors break-all"
                    >
                      {artistData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Base Locations:</p>
                    <p className="font-bold text-stone-900">{artistData.location}</p>
                    <p className="text-[11px] text-stone-500">Available for worldwide engagements & travel</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe size={16} className="text-rose-700 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-stone-500 font-medium">Response Time:</p>
                    <p className="font-bold text-stone-900">Within 24–48 hours</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-200">
                <p className="text-[11px] font-sans uppercase tracking-wider text-stone-500 font-bold mb-2">
                  Engagement Categories
                </p>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-stone-600 font-sans">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>Wedding Ceremonies & Private Receptions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>Operatic Engagements & Guest Roles</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>Orchestral Galas & Oratorio Solos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                    <span>Private Vocal Coaching & Masterclasses</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Management Box (if configured) */}
            {artistData.management.agency && (
              <div className="bg-[#FAF8F5] border border-stone-200 p-6 rounded-lg shadow-sm space-y-4">
                <span className="text-[10px] font-sans tracking-widest uppercase text-stone-500 font-bold block">
                  Representation
                </span>
                <h4 className="font-serif text-lg font-bold text-stone-900">
                  {artistData.management.agency}
                </h4>
                {artistData.management.email && (
                  <p className="text-xs text-stone-600">
                    Email: <a href={`mailto:${artistData.management.email}`} className="font-bold text-stone-900 underline">{artistData.management.email}</a>
                  </p>
                )}
              </div>
            )}
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
              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Web3Forms Access Key & Config */}
                <input
                  type="hidden"
                  name="access_key"
                  value="808b07b3-9b0f-4015-b577-3581231fd89a"
                />
                <input
                  type="hidden"
                  name="subject"
                  value={`Website Inquiry: ${formData.inquiryType} - ${formData.name || "Visitor"}`}
                />
                <input
                  type="hidden"
                  name="from_name"
                  value={formData.name || "Sarah Lavery Website Inquiry"}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-sans tracking-wider uppercase text-stone-700 font-bold mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
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
                      name="email"
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
                      name="organization"
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
                      name="inquiry_type"
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
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide performance dates, proposed venue, repertoire, or details..."
                    className="w-full px-4 py-3 bg-white border border-stone-300 rounded text-xs font-sans text-stone-900 placeholder-stone-400 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-500 transition-colors resize-y shadow-2xs"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded text-rose-800 text-xs font-sans flex items-start gap-2.5">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                    <div>
                      <p className="font-semibold mb-0.5">Submission issue</p>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-rose-700 hover:bg-rose-800 disabled:bg-stone-400 text-white text-xs font-sans tracking-[0.25em] font-bold uppercase transition-all duration-300 rounded shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
