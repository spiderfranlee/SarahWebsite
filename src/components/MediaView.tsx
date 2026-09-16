import React, { useState, useEffect } from "react";
import { Play, Youtube, ExternalLink, Image as ImageIcon, Maximize2, ChevronDown, ChevronUp } from "lucide-react";
import { mediaShowcase, galleryPhotos, artistData } from "../data";
import { AudioTrack, MediaItem, GalleryPhoto } from "../types";
import VideoFacade from "./VideoFacade";
import PhotoLightbox from "./PhotoLightbox";

export type MediaTabType = "all" | "recordings" | "gallery" | "opera" | "sacred" | "recital";

interface MediaViewProps {
  currentTrack?: AudioTrack;
  isPlaying?: boolean;
  activeMediaTab?: MediaTabType;
  onTabChange?: (tab: MediaTabType) => void;
  onTogglePlay?: (track: AudioTrack) => void;
  onSelectMedia: (item: MediaItem) => void;
}

export default function MediaView({
  activeMediaTab = "all",
  onTabChange,
  onSelectMedia
}: MediaViewProps) {
  const [currentTab, setCurrentTab] = useState<MediaTabType>(activeMediaTab);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [photoCategory, setPhotoCategory] = useState<string>("all");
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (activeMediaTab) {
      setCurrentTab(activeMediaTab);
      if (activeMediaTab === "gallery") {
        setShowAllPhotos(true);
      }
    }
  }, [activeMediaTab]);

  const handleTabChange = (tab: MediaTabType) => {
    setCurrentTab(tab);
    if (tab === "gallery") {
      setShowAllPhotos(true);
    }
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const filteredMedia = mediaShowcase.filter((item) => {
    if (currentTab === "all" || currentTab === "recordings" || currentTab === "gallery") return true;
    return item.category.toLowerCase() === currentTab.toLowerCase();
  });

  const photoCategories = [
    { id: "all", label: "All Photos" },
    { id: "opera", label: "Opera" },
    { id: "performance", label: "Performance" },
    { id: "recital", label: "Recital" },
    { id: "portrait", label: "Portraits" }
  ];

  const filteredPhotos = galleryPhotos.filter((photo) => {
    if (photoCategory === "all") return true;
    return photo.category.toLowerCase() === photoCategory.toLowerCase();
  });

  const displayedPhotos = showAllPhotos || photoCategory !== "all" || currentTab === "gallery"
    ? filteredPhotos
    : filteredPhotos.slice(0, 8);

  return (
    <section id="media" className="py-24 bg-[#FAF8F5] border-t border-stone-200 relative">
      <div id="recordings" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-sans tracking-[0.3em] text-gold-700 uppercase font-bold">
                RECORDINGS & PERFORMANCES
              </span>
              <a
                href={artistData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 rounded text-[11px] font-sans font-bold transition-colors cursor-pointer"
              >
                <Youtube size={13} className="text-red-600" />
                <span>YouTube Channel</span>
                <ExternalLink size={10} />
              </a>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight">
              Media
            </h2>
            <div className="w-16 h-[2px] bg-gold-500 mt-4" />
          </div>

          {/* Genre Category Filter */}
          <div className="flex items-center gap-1 bg-white p-1 border border-stone-200 rounded-md shadow-2xs">
            {[
              { id: "all", label: "All" },
              { id: "opera", label: "Opera" },
              { id: "sacred", label: "Sacred" },
              { id: "recital", label: "Recital" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as MediaTabType)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider uppercase font-bold rounded transition-all cursor-pointer ${
                  currentTab === tab.id || (tab.id === "all" && (currentTab === "recordings" || currentTab === "gallery"))
                    ? "bg-navy-900 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Gallery & Video Recordings */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-gold-700 block mb-1">
                VOCAL HIGHLIGHTS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Gallery & Video Performances
              </h3>
            </div>
          </div>

          {/* Video Cards Grid - 4-Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-stone-200 hover:border-gold-400/80 rounded-xl overflow-hidden transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between"
              >
                {/* Video Thumbnail with Clean Framing */}
                {item.type === "video" ? (
                  <VideoFacade
                    youtubeId={item.youtubeId}
                    title={item.title}
                    thumbnailUrl={item.thumbnailUrl}
                    aspectRatio="wide"
                    showBottomBanner={false}
                    onOpenModal={() => onSelectMedia(item)}
                  />
                ) : (
                  <div
                    onClick={() => onSelectMedia(item)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View photo: ${item.title}`}
                    className="group relative aspect-[16/9] overflow-hidden bg-stone-900 cursor-pointer"
                  >
                    <img
                      src={item.thumbnailUrl}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded border border-stone-200 text-[10px] tracking-wider uppercase font-bold text-navy-900 shadow-2xs">
                      <ImageIcon size={11} />
                      <span>{item.category}</span>
                    </div>
                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 flex items-center justify-center transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/90 text-stone-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Card Information Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Composer & Category Pill */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {item.composer ? (
                        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-gold-700 font-bold block truncate">
                          {item.composer}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="shrink-0 text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 rounded">
                        {item.category}
                      </span>
                    </div>

                    {/* Main Title */}
                    <h4
                      onClick={() => onSelectMedia(item)}
                      className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-navy-950 transition-colors cursor-pointer leading-snug line-clamp-2"
                    >
                      {item.title}
                    </h4>

                    {/* Work/Role */}
                    {item.work && (
                      <p className="text-xs font-sans text-stone-500 font-medium italic mt-1 line-clamp-1">
                        {item.work}
                      </p>
                    )}

                    {/* Musical Synopsis */}
                    <p className="text-xs sm:text-sm font-sans text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs font-sans">
                    <button
                      onClick={() => onSelectMedia(item)}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-navy-900 hover:bg-navy-850 text-gold-300 hover:text-white rounded-md font-bold tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer group-hover:bg-gold-600 group-hover:text-white"
                    >
                      <Play size={12} className="fill-current" />
                      <span>Watch Video</span>
                    </button>

                    <div className="flex items-center gap-3">
                      {item.youtubeId && (
                        <a
                          href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-stone-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-stone-50"
                          title="Open directly on YouTube"
                          aria-label="Open on YouTube"
                        >
                          <Youtube size={17} />
                        </a>
                      )}
                      {item.year && (
                        <span className="font-mono text-xs text-stone-400 font-medium">
                          {item.year}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Production & Performance Photography Gallery */}
        <div id="gallery" className="mt-20 pt-16 border-t border-stone-300/80 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-gold-700 block mb-1">
                PORTRAITS & PRODUCTIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Photo Gallery
              </h3>
            </div>

            {/* Photo Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 border border-stone-200 rounded-md shadow-2xs">
              {photoCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setPhotoCategory(cat.id);
                    setShowAllPhotos(true);
                  }}
                  className={`px-3 py-1 text-xs font-sans tracking-wider uppercase font-bold rounded transition-all cursor-pointer ${
                    photoCategory === cat.id
                      ? "bg-navy-900 text-white shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayedPhotos.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => {
                  setActivePhotoIndex(idx);
                  setLightboxOpen(true);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setActivePhotoIndex(idx);
                    setLightboxOpen(true);
                  }
                }}
                aria-label={`View photo: ${photo.title}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-900 border border-stone-200 hover:border-gold-400/80 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <img
                  src={photo.url}
                  alt={photo.title || `Performance photograph ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />

                {/* Slick hover overlay with gradient and badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 sm:p-4">
                  <div className="flex justify-end">
                    <div className="w-8 h-8 rounded-full bg-white/95 text-navy-950 flex items-center justify-center shadow-md transform translate-y-1 group-hover:translate-y-0 transition-transform">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-gold-500/90 text-navy-950 text-[10px] font-sans font-bold uppercase tracking-wider rounded mb-1">
                      {photo.category}
                    </span>
                    <p className="text-white text-xs sm:text-sm font-serif font-bold line-clamp-1">
                      {photo.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Toggle Button */}
          {photoCategory === "all" && filteredPhotos.length > 8 && currentTab !== "gallery" && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAllPhotos(!showAllPhotos)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-navy-900 text-stone-800 hover:text-gold-300 border border-stone-300 hover:border-navy-900 rounded-md text-xs font-sans uppercase tracking-[0.2em] font-bold transition-all duration-200 shadow-2xs cursor-pointer"
              >
                <span>{showAllPhotos ? "Show Fewer Photos" : `View All ${filteredPhotos.length} Photos`}</span>
                {showAllPhotos ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Photo Lightbox Modal */}
      <PhotoLightbox
        isOpen={lightboxOpen}
        photos={displayedPhotos}
        currentIndex={activePhotoIndex}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={(newIdx) => setActivePhotoIndex(newIdx)}
      />
    </section>
  );
}
