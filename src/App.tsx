import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BiographyView from "./components/BiographyView";
import ScheduleView from "./components/ScheduleView";
import RepertoireView from "./components/RepertoireView";
import MediaView from "./components/MediaView";
import ReviewsView from "./components/ReviewsView";
import ContactView from "./components/ContactView";
import Footer from "./components/Footer";
import MediaModal from "./components/MediaModal";
import PhotoCustomizerModal from "./components/PhotoCustomizerModal";
import FloatingAudioPlayer from "./components/FloatingAudioPlayer";
import { audioRecordings } from "./data";
import { AudioTrack, MediaItem } from "./types";
import { playAriaAudio, stopAriaAudio } from "./utils/audioSynth";

// Default main image: Portrait of Soprano sitting by window in lace gown looking at city skyline
const DEFAULT_MAIN_IMAGE = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [heroImage, setHeroImage] = useState<string>(() => {
    return localStorage.getItem("sarah_lavery_main_image") || DEFAULT_MAIN_IMAGE;
  });

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isPhotoCustomizerOpen, setIsPhotoCustomizerOpen] = useState(false);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(audioRecordings[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState<boolean>(false);

  // Handle section navigation with smooth scrolling
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "biography", "schedule", "repertoire", "media", "reviews", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId === "home" ? "hero-section" : sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Audio Playback handler
  const handleTogglePlayTrack = (track?: AudioTrack) => {
    const targetTrack = track || currentTrack;
    
    if (isPlaying && currentTrack.id === targetTrack.id) {
      stopAriaAudio();
      setIsPlaying(false);
    } else {
      setCurrentTrack(targetTrack);
      setIsPlaying(true);
      setShowFloatingPlayer(true);
      playAriaAudio(targetTrack.title);
    }
  };

  // Save new main image
  const handleSaveMainImage = (newUrl: string) => {
    setHeroImage(newUrl);
    localStorage.setItem("sarah_lavery_main_image", newUrl);
  };

  // Open Media Modal
  const handleSelectMedia = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsMediaModalOpen(true);
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-gold-accent selection:text-stone-950 overflow-x-hidden antialiased">
      {/* Top Header Navigation matching deirdrehiggins.com */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPhotoCustomizer={() => setIsPhotoCustomizerOpen(true)}
      />

      {/* Main Sections Flow */}
      <main>
        {/* 1. Hero Landing Presentation with designated window portrait */}
        <Hero
          heroImage={heroImage}
          onNavigate={handleNavigate}
          onPlayAria={() => handleTogglePlayTrack(audioRecordings[0])}
          onOpenPhotoCustomizer={() => setIsPhotoCustomizerOpen(true)}
        />

        {/* 2. Biography with Editorial Profile & Press Kit */}
        <BiographyView portraitImage={heroImage} />

        {/* 3. Schedule & Engagements (Opera productions, concerts, recitals) */}
        <ScheduleView />

        {/* 4. Complete Repertoire (Opera roles, concert works, song cycles) */}
        <RepertoireView />

        {/* 5. Media & Audio Jukebox Player (Recordings, videos, photos) */}
        <MediaView
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlayTrack}
          onSelectMedia={handleSelectMedia}
        />

        {/* 6. Critical Reviews & Press Acclaim */}
        <ReviewsView />

        {/* 7. Representation & Inquiries Contact Form */}
        <ContactView />
      </main>

      {/* Footer with newsletter and copyright */}
      <Footer onNavigate={handleNavigate} />

      {/* Media Modal Viewer */}
      <MediaModal
        isOpen={isMediaModalOpen}
        item={selectedMedia}
        onClose={() => {
          setIsMediaModalOpen(false);
          setSelectedMedia(null);
        }}
      />

      {/* Main Image Customizer Modal */}
      <PhotoCustomizerModal
        isOpen={isPhotoCustomizerOpen}
        currentImage={heroImage}
        onClose={() => setIsPhotoCustomizerOpen(false)}
        onSaveImage={handleSaveMainImage}
      />

      {/* Floating Audio Player when listening to an aria */}
      {showFloatingPlayer && (
        <FloatingAudioPlayer
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => handleTogglePlayTrack()}
          onClose={() => {
            stopAriaAudio();
            setIsPlaying(false);
            setShowFloatingPlayer(false);
          }}
        />
      )}
    </div>
  );
}
