export interface EventItem {
  id: string;
  date: string; // e.g. "NOV 02-07, 2026"
  datesDetail?: string; // e.g. "2, 4, 6, 7 November 2026"
  time?: string; // e.g. "19:30"
  title: string; // e.g. "Carmen"
  role: string; // e.g. "Soprano Chorus"
  company: string; // e.g. "Irish National Opera"
  venue: string; // e.g. "Bord Gáis Energy Theatre"
  city: string; // e.g. "Dublin, Ireland"
  conductor?: string;
  director?: string;
  status: "Get Tickets" | "Sold Out" | "Past Performance" | "Free Admission";
  ticketUrl: string;
  category: "Opera" | "Concert" | "Recital" | "Masterclass";
  notes?: string; // e.g. "Sarah will perform as soprano chorus in these productions."
  imageUrl?: string;
  domain?: string; // e.g. "bordgaisenergytheatre.ie"
  originalFilename?: string;
}

export interface RepertoireRole {
  id: string;
  composer: string;
  work: string;
  role: string;
  language: string;
  status: "Performed" | "In Repertoire" | "Covered" | "In Preparation";
}

export interface ConcertWork {
  id: string;
  composer: string;
  work: string;
  soloPart: string;
}

export interface SongCycle {
  id: string;
  composer: string;
  cycle: string;
  highlights: string[];
}

export interface AudioTrack {
  id: string;
  title: string;
  work: string;
  composer: string;
  accompaniment: string;
  duration: string;
  category: "Opera Aria" | "Art Song" | "Concert" | "Sacred / Wedding" | "Musical Theatre";
  audioSrc?: string;
  videoUrl?: string;
  youtubeId?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: "Opera" | "Concert" | "Interview" | "Behind the Scenes" | "Portrait" | "Sacred" | "Recital";
  type: "video" | "image";
  thumbnailUrl: string;
  videoUrl?: string;
  youtubeId?: string;
  description: string;
  year?: string;
  composer?: string;
  work?: string;
}

export interface ReviewQuote {
  id: string;
  quote: string;
  critic: string;
  publication: string;
  production: string;
  year: string;
}

export interface NewsArticle {
  id: string;
  date: string;
  category: "Release" | "Review" | "Feature" | "Announcement";
  title: string;
  excerpt: string;
  imageUrl: string;
  content?: string;
}

export interface ServicePackage {
  id: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  repertoireList: { category: string; pieces: string[] }[];
  accompanimentOptions: string[];
}
