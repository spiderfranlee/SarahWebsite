import React from "react";
import { Quote } from "lucide-react";
import { criticalReviews } from "../data";

export default function ReviewsView() {
  return (
    <section id="reviews" className="py-24 bg-[#FAF8F5] border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-rose-700 uppercase font-bold block mb-2">
            CRITICAL ACCLAIM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
            Press & Reviews
          </h2>
          <div className="w-16 h-[2px] bg-rose-600 mx-auto mt-4" />
        </div>

        {/* 3 Balanced Critical Press Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {criticalReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-stone-200 p-8 sm:p-10 rounded-xl hover:border-rose-300 transition-all flex flex-col justify-between shadow-xs hover:shadow-md relative overflow-hidden group"
            >
              {/* Background decorative quote watermark */}
              <Quote
                size={72}
                className="absolute -right-2 -bottom-2 text-stone-100 pointer-events-none group-hover:text-rose-50 transition-colors"
              />

              <div className="relative z-10">
                <Quote size={28} className="text-rose-700/80 mb-6" />
                <blockquote className="font-serif italic text-stone-900 text-lg sm:text-xl leading-relaxed">
                  “{rev.quote.replace(/^[“"']|[”"']$/g, "")}”
                </blockquote>
              </div>

              <div className="pt-6 mt-8 border-t border-stone-200/80 relative z-10">
                <p className="font-sans font-bold text-sm tracking-wide text-rose-800">
                  — {rev.publication}
                </p>
                {rev.critic && (
                  <p className="text-xs font-sans text-stone-600 mt-1">
                    {rev.critic}
                  </p>
                )}
                {rev.production && (
                  <p className="text-[11px] font-sans text-stone-500 mt-0.5">
                    {rev.production} {rev.year ? `(${rev.year})` : ""}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
