import { EventItem, MediaItem, NewsArticle, RepertoireRole, ConcertWork, SongCycle, AudioTrack, ReviewQuote } from "./types";

// Artist configuration & biographies matching https://www.deirdrehiggins.com/ format
export const artistData = {
  name: "SARAH LAVERY",
  fullName: "Sarah Guilmartin Lavery",
  voiceType: "Lyric Soprano",
  tagline: "Irish Lyric Soprano",
  headlineQuote: "A voice of luminous warmth, dramatic veracity, and effortless lyrical beauty.",
  location: "Dublin, Ireland & London, UK",
  email: "contact@sarahguilmartinlavery.ie",
  management: {
    agency: "Highland Vocal Artists Management",
    agentName: "Eleanor Vance",
    email: "e.vance@highlandartists.com",
    phone: "+353 (0)1 498 7200",
    territory: "Worldwide Representation"
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    spotify: "https://spotify.com",
    linkedin: "https://linkedin.com",
    appleMusic: "https://music.apple.com"
  },
  shortBio: "Irish lyric soprano Sarah Lavery is celebrated for her radiant vocal warmth, compelling musicality, and magnetic stage presence. A graduate of prestigious conservatoires and recipient of prominent vocal bursaries, she has performed with leading companies including Irish National Opera, Wexford Festival Opera, and the National Symphony Orchestra.",
  bioSections: [
    {
      title: "Artistic Profile",
      paragraphs: [
        "Irish lyric soprano Sarah Lavery is known for her warm, velvety timbre, expressive depth, and engaging stage presence. Her interpretations span the core bel canto and lyric opera repertoire to sublime sacred oratorio, French mélodie, and contemporary Irish vocal compositions.",
        "A former member of the prestigious young artist programs, Sarah has worked closely with renowned conductors, directors, and vocal coaches across Ireland, the UK, and mainland Europe, cultivating an artistic voice praised by critics for its 'crystalline clarity, dramatic conviction, and seamless legato'."
      ]
    },
    {
      title: "Operatic & Concert Highlights",
      paragraphs: [
        "On the operatic stage, Sarah's roles include Mimì in Puccini's La bohème, Marguerite in Gounod's Faust, Contessa Almaviva and Susanna in Mozart's Le nozze di Figaro, Giannetta in Donizetti's L'elisir d'amore, and Rosalinde in Johann Strauss II's Die Fledermaus.",
        "Her concert career includes memorable debuts with the National Symphony Orchestra at the National Concert Hall Dublin, performances at the Wexford Festival Opera, and high-profile gala concerts alongside internationally acclaimed soloists. She is also a passionate interpreter of oratorio, regularly performing as soprano soloist in Handel's Messiah, Mozart's Requiem, and Fauré's Requiem."
      ]
    },
    {
      title: "Awards, Education & Training",
      paragraphs: [
        "Sarah is the recipient of prestigious artistic awards including the Bernadette Greevy Vocal Bursary, the Gervase Elwes Memorial Cup, and top prizes at the Feis Ceoil and international singing competitions.",
        "She holds Master of Music and Bachelor degrees with First Class Honours in Vocal Performance, studying with distinguished teachers and participating in masterclasses with internationally renowned artists."
      ]
    }
  ]
};

// Full Operatic Repertoire List
export const operaticRepertoire: RepertoireRole[] = [
  { id: "op-1", composer: "Giacomo Puccini", work: "La Bohème", role: "Mimì", language: "Italian", status: "Performed" },
  { id: "op-2", composer: "Giacomo Puccini", work: "Madama Butterfly", role: "Cio-Cio-San", language: "Italian", status: "In Preparation" },
  { id: "op-3", composer: "Giacomo Puccini", work: "Gianni Schicchi", role: "Lauretta", language: "Italian", status: "Performed" },
  { id: "op-4", composer: "Giacomo Puccini", work: "La Rondine", role: "Magda de Civry", language: "Italian", status: "In Repertoire" },
  { id: "op-5", composer: "W. A. Mozart", work: "Le Nozze di Figaro", role: "Contessa Almaviva", language: "Italian", status: "Performed" },
  { id: "op-6", composer: "W. A. Mozart", work: "Le Nozze di Figaro", role: "Susanna", language: "Italian", status: "Performed" },
  { id: "op-7", composer: "W. A. Mozart", work: "Don Giovanni", role: "Donna Elvira", language: "Italian", status: "In Repertoire" },
  { id: "op-8", composer: "W. A. Mozart", work: "Die Zauberflöte", role: "Pamina", language: "German", status: "Performed" },
  { id: "op-9", composer: "W. A. Mozart", work: "Così Fan Tutte", role: "Fiordiligi", language: "Italian", status: "In Repertoire" },
  { id: "op-10", composer: "Gaetano Donizetti", work: "L'elisir d'amore", role: "Giannetta", language: "Italian", status: "Performed" },
  { id: "op-11", composer: "Gaetano Donizetti", work: "L'elisir d'amore", role: "Adina", language: "Italian", status: "In Repertoire" },
  { id: "op-12", composer: "Charles Gounod", work: "Faust", role: "Marguerite", language: "French", status: "Covered" },
  { id: "op-13", composer: "Charles Gounod", work: "Roméo et Juliette", role: "Juliette", language: "French", status: "In Preparation" },
  { id: "op-14", composer: "Giuseppe Verdi", work: "La Traviata", role: "Violetta Valéry", language: "Italian", status: "In Repertoire" },
  { id: "op-15", composer: "Johann Strauss II", work: "Die Fledermaus", role: "Rosalinde", language: "German / English", status: "Covered" },
  { id: "op-16", composer: "Tarik O'Regan", work: "Testament (World Premiere)", role: "Martha", language: "English", status: "Performed" },
  { id: "op-17", composer: "Alberto Caruso", work: "Lady Gregory in America", role: "Eileen O'Doherty", language: "English", status: "Performed" }
];

// Concert & Oratorio Works
export const concertRepertoire: ConcertWork[] = [
  { id: "c-1", composer: "G. F. Handel", work: "Messiah, HWV 56", soloPart: "Soprano Soloist" },
  { id: "c-2", composer: "W. A. Mozart", work: "Requiem in D minor, K. 626", soloPart: "Soprano Soloist" },
  { id: "c-3", composer: "W. A. Mozart", work: "Exsultate, jubilate, K. 165", soloPart: "Solo Motet" },
  { id: "c-4", composer: "W. A. Mozart", work: "Great Mass in C minor, K. 427", soloPart: "Soprano I Soloist" },
  { id: "c-5", composer: "Gabriel Fauré", work: "Requiem, Op. 48", soloPart: "Pie Jesu / Soprano" },
  { id: "c-6", composer: "Johannes Brahms", work: "Ein deutsches Requiem, Op. 45", soloPart: "Ihr habt nun Traurigkeit" },
  { id: "c-7", composer: "Antonio Vivaldi", work: "Gloria, RV 589", soloPart: "Soprano Soloist" },
  { id: "c-8", composer: "G. B. Pergolesi", work: "Stabat Mater", soloPart: "Soprano Soloist" },
  { id: "c-9", composer: "Gustav Mahler", work: "Symphony No. 4 in G major", soloPart: "Das himmlische Leben" }
];

// Song Cycles & Recital
export const songCyclesRepertoire: SongCycle[] = [
  {
    id: "sc-1",
    composer: "Claude Debussy",
    cycle: "Ariettes Oubliées & Fêtes Galantes",
    highlights: ["C'est l'extase langoureuse", "Clair de lune", "Fantoches"]
  },
  {
    id: "sc-2",
    composer: "Richard Strauss",
    cycle: "Vier Letzte Lieder & Lieder Op. 27",
    highlights: ["Morgen!", "Cäcilie", "Beim Schlafengehen", "Im Abendrot"]
  },
  {
    id: "sc-3",
    composer: "Gabriel Fauré",
    cycle: "Cinq mélodies 'de Venise', Op. 58",
    highlights: ["Mandoline", "En sourdine", "Green", "A Clymène", "C'est l'extase"]
  },
  {
    id: "sc-4",
    composer: "Traditional Irish / Arr. Herbert Hughes & Hamilton Harty",
    cycle: "Irish Traditional Art Songs & Ballads",
    highlights: ["She Moved Through the Fair", "The Salley Gardens", "I Have a Bonnet Trimmed with Blue", "Oft in the Stilly Night"]
  }
];

// Performance Schedule (Upcoming & Recent)
export const scheduleData: EventItem[] = [
  {
    id: "sch-1",
    date: "OCT 24, 2026",
    time: "19:30",
    title: "Puccini: La Bohème",
    role: "Mimì",
    company: "Irish National Opera",
    venue: "Bord Gáis Energy Theatre",
    city: "Dublin, Ireland",
    conductor: "Fergus Sheil",
    director: "Orpha Phelan",
    status: "Get Tickets",
    ticketUrl: "https://www.irishnationalopera.ie",
    category: "Opera"
  },
  {
    id: "sch-2",
    date: "NOV 12, 2026",
    time: "20:00",
    title: "Wexford Festival Opera Gala",
    role: "Featured Soloist",
    company: "Wexford Festival Opera",
    venue: "National Opera House",
    city: "Wexford, Ireland",
    conductor: "Michele Spotti",
    status: "Get Tickets",
    ticketUrl: "https://www.wexfordopera.com",
    category: "Concert"
  },
  {
    id: "sch-3",
    date: "DEC 05, 2026",
    time: "19:30",
    title: "Handel: Messiah",
    role: "Soprano Soloist",
    company: "National Symphony Orchestra & Chorus",
    venue: "National Concert Hall",
    city: "Dublin, Ireland",
    conductor: "Peter Whelan",
    status: "Get Tickets",
    ticketUrl: "https://www.nch.ie",
    category: "Concert"
  },
  {
    id: "sch-4",
    date: "JAN 18, 2027",
    time: "13:05",
    title: "National Concert Hall Summer Lunchtime Series",
    role: "Solo Recital with Piano",
    company: "NCH Recital Series",
    venue: "John Field Room, National Concert Hall",
    city: "Dublin, Ireland",
    status: "Get Tickets",
    ticketUrl: "https://www.nch.ie",
    category: "Recital"
  },
  {
    id: "sch-5",
    date: "FEB 14, 2027",
    time: "20:00",
    title: "Valentine's Opera Gala",
    role: "Soloist (Solos & Duets)",
    company: "RTÉ Concert Orchestra",
    venue: "National Concert Hall",
    city: "Dublin, Ireland",
    status: "Get Tickets",
    ticketUrl: "https://www.nch.ie",
    category: "Concert"
  },
  {
    id: "sch-6",
    date: "MAR 26, 2027",
    time: "19:30",
    title: "Mozart: Le Nozze di Figaro",
    role: "Contessa Almaviva",
    company: "Irish National Opera",
    venue: "Cork Opera House",
    city: "Cork, Ireland",
    conductor: "Peter Whelan",
    status: "Get Tickets",
    ticketUrl: "https://www.irishnationalopera.ie",
    category: "Opera"
  },
  {
    id: "sch-7",
    date: "MAY 08, 2026",
    time: "19:30",
    title: "Alberto Caruso: Lady Gregory in America",
    role: "Eileen O'Doherty",
    company: "Wexford Festival Opera Debut",
    venue: "Jerome Hynes Theatre",
    city: "Wexford, Ireland",
    status: "Past Performance",
    ticketUrl: "#",
    category: "Opera"
  },
  {
    id: "sch-8",
    date: "JUNE 19, 2026",
    time: "13:10",
    title: "French Mélodie & Celtic Lieder Recital",
    role: "Soloist",
    company: "Hugh Lane Gallery Sundays @ Noon",
    venue: "Hugh Lane Gallery",
    city: "Dublin, Ireland",
    status: "Past Performance",
    ticketUrl: "#",
    category: "Recital"
  }
];

// Interactive Audio Tracks for Jukebox
export const audioRecordings: AudioTrack[] = [
  {
    id: "aud-1",
    title: "Porgi, amor, qualche ristoro",
    work: "Le nozze di Figaro, K. 492",
    composer: "Wolfgang Amadeus Mozart",
    accompaniment: "National Symphony Orchestra",
    duration: "3:42",
    category: "Opera Aria"
  },
  {
    id: "aud-2",
    title: "O mio babbino caro",
    work: "Gianni Schicchi",
    composer: "Giacomo Puccini",
    accompaniment: "RTÉ Concert Orchestra",
    duration: "2:35",
    category: "Opera Aria"
  },
  {
    id: "aud-3",
    title: "Chi il bel sogno di Doretta",
    work: "La rondine",
    composer: "Giacomo Puccini",
    accompaniment: "Piano & Chamber Ensemble",
    duration: "3:18",
    category: "Opera Aria"
  },
  {
    id: "aud-4",
    title: "She Moved Through the Fair",
    work: "Irish Art Song Collection",
    composer: "Traditional / Arr. Herbert Hughes",
    accompaniment: "Cello & Piano",
    duration: "4:05",
    category: "Art Song"
  },
  {
    id: "aud-5",
    title: "Lascia ch'io pianga",
    work: "Rinaldo, HWV 7",
    composer: "George Frideric Handel",
    accompaniment: "Irish Baroque Orchestra",
    duration: "4:20",
    category: "Opera Aria"
  },
  {
    id: "aud-6",
    title: "Pie Jesu",
    work: "Requiem in D minor, Op. 48",
    composer: "Gabriel Fauré",
    accompaniment: "Organ & Orchestra",
    duration: "3:30",
    category: "Concert"
  }
];

// Media Archive (Videos & High-Res Production Images)
export const mediaShowcase: MediaItem[] = [
  {
    id: "med-1",
    title: "Mozart's 'Porgi, amor' - Live Concert Performance",
    category: "Opera",
    type: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Sarah Lavery performs Contessa Almaviva's heart-rending aria 'Porgi, amor' with the National Symphony Orchestra.",
    year: "2026"
  },
  {
    id: "med-2",
    title: "Puccini's 'Si, mi chiamano Mimì' - Rehearsal Stills",
    category: "Opera",
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    description: "On stage production photography during Irish National Opera's staging of Puccini's La bohème.",
    year: "2026"
  },
  {
    id: "med-3",
    title: "Wexford Festival Opera - Artist Spotlight & Interview",
    category: "Interview",
    type: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Sarah discusses stepping into 19th-century Irish heroines and exploring forgotten vocal cantatas.",
    year: "2025"
  },
  {
    id: "med-4",
    title: "Editorial Window Portrait in Lace Evening Gown",
    category: "Portrait",
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
    description: "Official studio portrait session overlooking the skyline. Refined navy lace gown and classical drop earrings.",
    year: "2026"
  },
  {
    id: "med-5",
    title: "Handel's Messiah - 'I Know that My Redeemer Liveth'",
    category: "Concert",
    type: "video",
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Live oratorio performance at the National Concert Hall, Dublin.",
    year: "2025"
  },
  {
    id: "med-6",
    title: "Backstage at the National Opera House",
    category: "Behind the Scenes",
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1200&q=80",
    description: "Final vocal warmups and dressing room preparation before the evening curtain call.",
    year: "2026"
  }
];

// Critical Reviews and Press Praise
export const criticalReviews: ReviewQuote[] = [
  {
    id: "rev-1",
    quote: "Sarah Lavery possesses a lyric soprano of exquisite purity and bloom. Her Mimì was deeply moving, shaped with flawless legato and breathtaking emotional honesty.",
    critic: "Michael Dervan",
    publication: "The Irish Times",
    production: "La Bohème, Irish National Opera",
    year: "2026"
  },
  {
    id: "rev-2",
    quote: "A luminous talent whose vocal warmth fills the hall with effortless resonance. Her performance at Wexford was nothing short of revelatory.",
    critic: "Hugh Canning",
    publication: "Opera Magazine",
    production: "Wexford Festival Opera Debut",
    year: "2025"
  },
  {
    id: "rev-3",
    quote: "Her tone has that rare, honeyed quality that caresses the ear, married to a dramatic intuition that holds the audience utterly spellbound.",
    critic: "Cathy Desmond",
    publication: "GoldenPlec Classical",
    production: "National Symphony Orchestra Gala",
    year: "2025"
  },
  {
    id: "rev-4",
    quote: "Lavery navigated the delicate ornamentations of Mozart with radiant poise and consummate technical mastery.",
    critic: "Paul Kilbey",
    publication: "Bachtrack",
    production: "Le Nozze di Figaro",
    year: "2026"
  }
];

// News and Album Releases
export const newsReleasesData: NewsArticle[] = [
  {
    id: "news-1",
    date: "OCTOBER 2026",
    category: "Announcement",
    title: "Sarah Lavery Announced as Mimì in Irish National Opera's La Bohème",
    excerpt: "Sarah will return to the Bord Gáis Energy Theatre this autumn in a landmark production directed by Orpha Phelan and conducted by Fergus Sheil.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "news-2",
    date: "AUGUST 2026",
    category: "Release",
    title: "New Album: 'Echoes of the Isle' - Classical Irish Songs & Bel Canto Arias",
    excerpt: "Recorded with renowned collaborative pianist and chamber strings, Sarah's debut solo recording will be released internationally on digital and vinyl.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "news-3",
    date: "JUNE 2026",
    category: "Review",
    title: "Bachtrack Praise for National Concert Hall Summer Recital",
    excerpt: "'An artist of singular grace and thrilling vocal range' — read the full five-star review of Sarah's sold-out recital at the John Field Room.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
  }
];
