import React from "react";
import { Quote, Star } from "lucide-react";
import { criticalReviews } from "../data";

export default function ReviewsView() {
  return (
    <section id="reviews" className="py-24 bg-stone-900/50 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans tracking-[0.3em] text-gold-accent uppercase font-semibold block mb-2">
            CRITICAL ACCLAIM
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-100 tracking-tight">
            Press & Reviews
          </h2>
          <div className="w-16 h-[2px] bg-gold-accent mx-auto mt-4" />
        </div>

        {/* Featured Big Quote */}
        <div className="mb-14 p-8 md:p-12 bg-stone-950 border border-stone-800 rounded-sm shadow-2xl relative overflow-hidden">
          <Quote size={80} className="absolute -right-4 -bottom-4 text-stone-800/30 pointer-events-none" />
          
          <div className="flex items-center gap-1 text-gold-accent mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} className="fill-gold-accent" />
            ))}
          </div>

          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-stone-100 leading-relaxed max-w-4xl">
            "{criticalReviews[0].quote}"
          </p>

          <div className="mt-6 pt-6 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-sans font-bold text-sm text-stone-200">
                {criticalReviews[0].critic}
              </p>
              <p className="text-xs font-sans text-gold-accent tracking-wider font-semibold">
                {criticalReviews[0].publication}
              </p>
            </div>
            <span className="text-xs font-sans text-stone-400">
              {criticalReviews[0].production} ({criticalReviews[0].year})
            </span>
          </div>
        </div>

        {/* Grid of Other Critical Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criticalReviews.slice(1).map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-950/80 border border-stone-800 p-6 md:p-8 rounded-sm hover:border-gold-accent/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center gap-1 text-gold-accent mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-gold-accent" />
                  ))}
                </div>
                <p className="font-serif italic text-stone-300 text-sm sm:text-base leading-relaxed mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80">
                <p className="font-sans font-bold text-xs text-stone-200">
                  {rev.critic}
                </p>
                <p className="text-[11px] font-sans text-gold-accent tracking-wider font-semibold">
                  {rev.publication}
                </p>
                <p className="text-[10px] font-sans text-stone-500 mt-0.5">
                  {rev.production}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
