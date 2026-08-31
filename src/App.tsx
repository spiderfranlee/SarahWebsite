import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BiographyView from "./components/BiographyView";
import EventsView, { EventTabType } from "./components/EventsView";
import RepertoireView from "./components/RepertoireView";
import MediaView from "./components/MediaView";
import ReviewsView from "./components/ReviewsView";
import ContactView from "./components/ContactView";
import Footer from "./components/Footer";
import MediaModal from "./components/MediaModal";
import FloatingAudioPlayer from "./components/FloatingAudioPlayer";
import { audioRecordings, mediaShowcase } from "./data";
import { AudioTrack, MediaItem } from "./types";
import { playAriaAudio, stopAriaAudio } from "./utils/audioSynth";

// Main Sarah Lavery Hero Image
const HERO_IMAGE = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1920&q=85";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [activeEventTab, setActiveEventTab] = useState<EventTabType>("upcoming");
  const [contactInquiryType, setContactInquiryType] = useState<string>("Wedding Ceremony & Reception");

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  // Audio Player State
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(audioRecordings[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showFloatingPlayer, setShowFloatingPlayer] = useState<boolean>(false);

  // Handle section navigation with smooth scrolling and tab switching
  const handleNavigate = (sectionId: string, eventTab?: EventTabType) => {
    // Normalize aliases
    const targetId = sectionId === "biography" ? "about" : sectionId === "schedule" ? "events" : sectionId;
    setActiveSection(targetId);

    if (eventTab) {
      setActiveEventTab(eventTab);
    }

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -75; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleNavigateToContactWithInquiry = (inquiryType?: string) => {
    if (inquiryType) {
      setContactInquiryType(inquiryType);
    }
    handleNavigate("contact");
  };

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "media", "events", "repertoire", "reviews", "contact"];
      const scrollPosition = window.scrollY + 140;

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

  // Open Media Modal
  const handleSelectMedia = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsMediaModalOpen(true);
  };

  return (
    <div className="bg-[#FAF8F5] text-stone-900 min-h-screen font-sans selection:bg-rose-100 selection:text-rose-900 overflow-x-hidden antialiased">
      {/* Top Header Navigation matching requested headings */}
      <Header
        activeSection={activeSection}
        activeEventTab={activeEventTab}
        onNavigate={handleNavigate}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Home - Hero Presentation */}
        <Hero
          heroImage={HERO_IMAGE}
          onNavigate={handleNavigate}
          onPlayAria={() => handleTogglePlayTrack(audioRecordings[0])}
        />

        {/* 2. About - Artistic Profile, Education & Press Kit */}
        <BiographyView portraitImage={HERO_IMAGE} />

        {/* 3. Media - Audio Jukebox Player, Videos & Gallery */}
        <MediaView
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlayTrack}
          onSelectMedia={handleSelectMedia}
        />

        {/* 4. Events - Upcoming Performances, Weddings, Funeral, Corporate */}
        <EventsView
          activeTab={activeEventTab}
          onTabChange={(tab) => setActiveEventTab(tab)}
          onNavigateToContact={handleNavigateToContactWithInquiry}
        />

        {/* Complete Operatic & Concert Repertoire Index */}
        <RepertoireView />

        {/* Critical Reviews & Press Acclaim */}
        <ReviewsView />

        {/* 5. Contact - Worldwide Representation & Booking Form */}
        <ContactView initialInquiryType={contactInquiryType} />
      </main>

      {/* Footer */}
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
          onOpenVideo={() => {
            const matchedMedia = mediaShowcase.find(
              (m) => (currentTrack.youtubeId && m.youtubeId === currentTrack.youtubeId) || m.title.toLowerCase().includes(currentTrack.title.toLowerCase())
            );
            if (matchedMedia) {
              handleSelectMedia(matchedMedia);
            } else if (currentTrack.youtubeId || currentTrack.videoUrl) {
              handleSelectMedia({
                id: `track-${currentTrack.id}`,
                title: currentTrack.title,
                category: "Opera",
                type: "video",
                thumbnailUrl: currentTrack.youtubeId ? `https://i.ytimg.com/vi/${currentTrack.youtubeId}/hqdefault.jpg` : "",
                videoUrl: currentTrack.videoUrl,
                youtubeId: currentTrack.youtubeId,
                composer: currentTrack.composer,
                work: currentTrack.work,
                description: `Live vocal performance of ${currentTrack.title} (${currentTrack.work}) by soprano Sarah Lavery.`
              });
            }
          }}
        />
      )}
    </div>
  );
}
