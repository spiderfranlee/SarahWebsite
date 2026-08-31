import { EventItem, MediaItem, NewsArticle, RepertoireRole, ConcertWork, SongCycle, AudioTrack, ReviewQuote } from "./types";

// Artist configuration & biographies
export const artistData = {
  name: "SARAH LAVERY",
  fullName: "Sarah Guilmartin Lavery",
  voiceType: "Lyric Soprano",
  tagline: "Irish Lyric Soprano",
  headlineQuote: "A voice of luminous warmth, dramatic veracity, and effortless lyrical beauty.",
  location: "Dublin, Ireland & London, UK",
  email: "contact@sarahguilmartinlavery.ie",
  management: {
    agency: "",
    agentName: "",
    email: "",
    phone: "",
    territory: "Worldwide Representation"
  },
  socials: {
    instagram: "https://instagram.com",
    youtube: "https://www.youtube.com/@SarahGuilmartinLavery-soprano",
    spotify: "https://spotify.com",
    linkedin: "https://linkedin.com",
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
  { id: "op-17", composer: "Alberto Caruso", work: "Lady Gregory in America", role: "Eileen O'Doherty", language: "English", status: "Performed" },
  { id: "op-18", composer: "Erich Wolfgang Korngold", work: "Die tote Stadt", role: "Marietta / Marie", language: "German", status: "In Repertoire" },
  { id: "op-19", composer: "André Previn", work: "A Streetcar Named Desire", role: "Blanche DuBois", language: "English", status: "In Repertoire" }
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
    id: "sch-carmen",
    date: "NOV 02-07, 2026",
    datesDetail: "2, 4, 6, 7 November 2026",
    time: "19:30",
    title: "Carmen",
    role: "Soprano Chorus",
    company: "Irish National Opera",
    venue: "Bord Gáis Energy Theatre",
    city: "Dublin, Ireland",
    conductor: "Paul Curran (Dir.) / INO Orchestra",
    director: "Paul Curran",
    status: "Get Tickets",
    ticketUrl: "https://www.bordgaisenergytheatre.ie",
    category: "Opera",
    notes: "Sarah will perform as soprano chorus in these productions.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    domain: "bordgaisenergytheatre.ie",
    originalFilename: "Carmen-2026_HERO_2880px-w-x-1800px-h.jpg"
  },
  {
    id: "sch-magic-musicals",
    date: "NOV 20-21, 2026",
    datesDetail: "20 & 21 November 2026",
    time: "20:00",
    title: "Magic of the Musicals",
    role: "Soprano Soloist",
    company: "R&R Musical Society (Rathmines & Rathgar)",
    venue: "National Concert Hall (NCH)",
    city: "Dublin, Ireland",
    status: "Get Tickets",
    ticketUrl: "https://www.nch.ie",
    category: "Concert",
    notes: "Sarah will perform as soprano soloist for these concerts.",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    domain: "nch.ie",
    originalFilename: "26_11_20-Magic-of-the-Musicals.jpg"
  },
  {
    id: "sch-turandot",
    date: "APR 04-10, 2027",
    datesDetail: "4, 7, 10 April 2027",
    time: "19:30",
    title: "Turandot",
    role: "Soprano Chorus",
    company: "Irish National Opera",
    venue: "Bord Gáis Energy Theatre",
    city: "Dublin, Ireland",
    conductor: "Valerio Galli",
    director: "David McVicar",
    status: "Get Tickets",
    ticketUrl: "https://www.bordgaisenergytheatre.ie",
    category: "Opera",
    notes: "Sarah will perform as soprano chorus in these productions.",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    domain: "bordgaisenergytheatre.ie",
    originalFilename: "INO-Turnadot_Hero_2880px-w-x-1800px-h.jpg"
  },
  {
    id: "sch-eugene-onegin",
    date: "MAY 23-29, 2027",
    datesDetail: "23, 25, 27, 29 May 2027",
    time: "19:30",
    title: "Eugene Onegin",
    role: "Soprano Chorus",
    company: "Irish National Opera",
    venue: "Gaiety Theatre",
    city: "Dublin, Ireland",
    status: "Get Tickets",
    ticketUrl: "https://www.gaietytheatre.ie",
    category: "Opera",
    notes: "Sarah will perform as soprano chorus in these productions.",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    domain: "gaietytheatre.ie",
    originalFilename: "cropped-Favicon-Gaiety-180x180.png"
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

// Interactive Audio Tracks for Jukebox & Media
export const audioRecordings: AudioTrack[] = [
  {
    id: "aud-korngold",
    title: "Glück, das mir verblieb (Marietta's Lied)",
    work: "Die tote Stadt, Op. 12",
    composer: "Erich Wolfgang Korngold",
    accompaniment: "Piano & Vocal Recording",
    duration: "5:12",
    category: "Opera Aria",
    youtubeId: "UBx3agwNmB0",
    videoUrl: "https://www.youtube.com/watch?v=UBx3agwNmB0"
  },
  {
    id: "aud-ave-maria",
    title: "Ave Maria",
    work: "Sacred Classical Repertoire",
    composer: "Franz Schubert / Sacred",
    accompaniment: "Organ & Piano",
    duration: "4:45",
    category: "Sacred / Wedding",
    youtubeId: "ZbaF-iFgMzw",
    videoUrl: "https://www.youtube.com/watch?v=ZbaF-iFgMzw"
  },
  {
    id: "aud-previn",
    title: "I can smell the sea air",
    work: "A Streetcar Named Desire",
    composer: "André Previn",
    accompaniment: "Soprano & Piano",
    duration: "3:58",
    category: "Opera Aria",
    youtubeId: "xa0fVPR613I",
    videoUrl: "https://www.youtube.com/watch?v=xa0fVPR613I"
  },
  {
    id: "aud-my-fair-lady",
    title: "I Could Have Danced All Night",
    work: "My Fair Lady",
    composer: "Frederick Loewe & Alan Jay Lerner",
    accompaniment: "Orchestral Ensemble & Piano",
    duration: "3:30",
    category: "Musical Theatre",
    youtubeId: "zQ1eus1CR-Q",
    videoUrl: "https://www.youtube.com/watch?v=zQ1eus1CR-Q"
  },
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
  }
];

// Media Archive (Videos & High-Res Production Images)
export const mediaShowcase: MediaItem[] = [
  {
    id: "med-yt-1",
    title: "Glück, das mir verblieb | Korngold | Soprano Sarah Lavery",
    category: "Opera",
    type: "video",
    thumbnailUrl: "https://i.ytimg.com/vi/UBx3agwNmB0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=UBx3agwNmB0",
    youtubeId: "UBx3agwNmB0",
    composer: "Erich Wolfgang Korngold",
    work: "Die tote Stadt (Marietta's Lied)",
    description: "Soprano Sarah Lavery performs the luminous Marietta's Lied 'Glück, das mir verblieb' from Korngold's Die tote Stadt, showcasing shimmering high notes and velvety lyrical phrasing.",
    year: "2026"
  },
  {
    id: "med-yt-2",
    title: "Ave Maria | Soprano Sarah Lavery",
    category: "Sacred",
    type: "video",
    thumbnailUrl: "https://i.ytimg.com/vi/ZbaF-iFgMzw/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=ZbaF-iFgMzw",
    youtubeId: "ZbaF-iFgMzw",
    composer: "Franz Schubert / Sacred",
    work: "Sacred Vocal Repertoire",
    description: "A devotional performance of 'Ave Maria', beloved for church wedding ceremonies, sacred memorial masses, and gala recitals.",
    year: "2026"
  },
  {
    id: "med-yt-3",
    title: "I could have danced all night (My Fair Lady) | Soprano Sarah Lavery",
    category: "Recital",
    type: "video",
    thumbnailUrl: "https://i.ytimg.com/vi/zQ1eus1CR-Q/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=zQ1eus1CR-Q",
    youtubeId: "zQ1eus1CR-Q",
    composer: "Frederick Loewe & Alan Jay Lerner",
    work: "My Fair Lady (Eliza Doolittle)",
    description: "A sparkling, exuberant rendition of Eliza Doolittle's signature showpiece 'I Could Have Danced All Night' from Lerner & Loewe's My Fair Lady.",
    year: "2026"
  },
  {
    id: "med-yt-4",
    title: "I can smell the sea air | Andre Previn | Soprano Sarah Lavery",
    category: "Opera",
    type: "video",
    thumbnailUrl: "https://i.ytimg.com/vi/xa0fVPR613I/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=xa0fVPR613I",
    youtubeId: "xa0fVPR613I",
    composer: "André Previn",
    work: "A Streetcar Named Desire (Blanche DuBois)",
    description: "Sarah Lavery delivers a poignant, emotionally resonant interpretation of Blanche DuBois's aria 'I can smell the sea air' from André Previn's modern operatic triumph.",
    year: "2026"
  },
  {
    id: "med-5",
    title: "Editorial Window Portrait in Lace Evening Gown",
    category: "Portrait",
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
    description: "Official studio portrait session overlooking the skyline in a navy lace gown and classical drop earrings.",
    year: "2026"
  },
  {
    id: "med-6",
    title: "On-Stage Opera Production Performance",
    category: "Opera",
    type: "image",
    thumbnailUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    description: "Stage performance capturing dramatic storytelling and luminous vocal projection in lyric opera repertoire.",
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

// Specialised Event Offerings: Weddings, Funeral & Memorials, Corporate & Galas
export const weddingEventData = {
  title: "Wedding Music & Ceremony Solos",
  subtitle: "Exquisite sacred and classical music creating unforgettable, emotional moments for your special day.",
  description: "Sarah brings world-class vocal artistry, radiant warmth, and seamless professionalism to your wedding ceremony. Whether you are planning a traditional church celebration, a civil ceremony, or an intimate humanist gathering, Sarah collaborates closely with couples to curate a bespoke musical programme that reflects their unique love story.",
  ceremonyTypes: [
    {
      type: "Church & Religious Ceremonies",
      details: "Comprehensive musical curation spanning the Processional entrance, Responsorial Psalm, Gospel Acclamation, Offertory, Sign of Peace, Communion, Signing of the Register, and the celebratory Recessional."
    },
    {
      type: "Civil & Humanist Ceremonies",
      details: "Romantic classical arias, modern love ballads, acoustic crossovers, and timeless Irish melodies tailored to non-religious or spiritualist wedding settings."
    },
    {
      type: "Drinks Reception & Canapés",
      details: "Elegant background vocal serenades, jazz standards, bel canto favourites, and light classical pieces as your guests arrive and celebrate."
    }
  ],
  repertoireCategories: [
    {
      category: "Entrance & Processional",
      pieces: ["Pachelbel's Canon in D (Vocal)", "Nella Fantasia (Ennio Morricone)", "How Long Will I Love You", "A Thousand Years", "Laudate Dominum (Mozart)"]
    },
    {
      category: "Sacred & Classical Solos",
      pieces: ["Ave Maria (Schubert / Bach-Gounod / Caccini)", "Panis Angelicus (César Franck)", "Pie Jesu (Fauré / Lloyd Webber)", "The Prayer (Bocelli / Dion)", "Laudate Dominum (Mozart)"]
    },
    {
      category: "Communion & Reflection",
      pieces: ["O Mio Babbino Caro (Puccini)", "Songbird (Eva Cassidy)", "The First Time Ever I Saw Your Face", "Ag Críost an Síol (Seán Ó Riada)", "Be Thou My Vision"]
    },
    {
      category: "Signing of the Register",
      pieces: ["She Moved Through the Fair", "Mo Ghille Mear", "Fields of Gold", "Make You Feel My Love", "Can't Help Falling in Love"]
    },
    {
      category: "Recessional & Exit",
      pieces: ["Ode to Joy (Beethoven)", "Hallelujah (Handel / Cohen)", "Signed, Sealed, Delivered (Acoustic Classical)", "All You Need Is Love", "Rejoice Greatly (Handel)"]
    }
  ],
  accompaniment: ["Church Organ / Classical Keyboard", "Concert Celtic Harp", "Classical String Duo / Quartet", "Classical Guitar & Cello", "Acoustic Grand Piano"]
};

export const funeralEventData = {
  title: "Funeral & Memorial Service Music",
  subtitle: "Compassionate, comforting sacred hymns and classical arias celebrating a cherished life.",
  description: "During times of grief, music provides solace, dignity, and a profound emotional tribute. Sarah offers a compassionate, supportive service, helping families choose meaningful hymns, classical reflections, and traditional Irish farewells to honour their loved one with deep sensitivity and grace.",
  serviceTypes: [
    {
      type: "Requiem Mass & Church Funerals",
      details: "Dignified sacred vocal music fulfilling all liturgical moments: Entrance hymn, Responsorial Psalm, Offertory procession, Communion, Final Commendation, and Recessional blessing."
    },
    {
      type: "Crematorium & Non-Religious Memorials",
      details: "Comforting acoustic ballads, classical melodies, and gentle poetic songs tailored for memorial services, crematorium chapels, and celebrations of life."
    },
    {
      type: "Month's Mind & Anniversary Masses",
      details: "Intimate vocal performances dedicated to remembrance and family gatherings."
    }
  ],
  repertoireCategories: [
    {
      category: "Sacred Liturgy & Hymns",
      pieces: ["Pie Jesu (Fauré / Lloyd Webber)", "Ave Maria (Schubert / Bach-Gounod)", "Panis Angelicus (Franck)", "Amazing Grace", "I Heard the Voice of Jesus Say", "Abide With Me", "Here I Am, Lord"]
    },
    {
      category: "Comforting Classical Reflections",
      pieces: ["Bist du bei mir (J. S. Bach)", "Lascia ch'io pianga (Handel)", "May the Road Rise to Meet You", "In Paradisum (Fauré)", "Caelum (Deep Peace)"]
    },
    {
      category: "Traditional Irish Farewells",
      pieces: ["Ag Críost an Síol (Seán Ó Riada)", "The Parting Glass", "Mo Ghille Mear", "Oft in the Stilly Night", "The Isle of Hope, Isle of Tears", "The Salley Gardens"]
    }
  ],
  accompaniment: ["Church Organist / Cathedral Organ", "Acoustic Piano", "Celtic Harp", "Solo Cello"]
};

export const corporateEventData = {
  title: "Corporate Events, Galas & Private Recitals",
  subtitle: "World-class operatic entertainment, VIP recitals, and unforgettable classical showcase performances.",
  description: "Elevate your corporate banquet, international conference, charity gala, or private soirée with the electrifying presence of a premier Irish lyric soprano. Sarah delivers show-stopping operatic highlights, sophisticated crossover melodies, and customized performances that captivate high-profile audiences and leave a lasting impression.",
  eventTypes: [
    {
      type: "Gala Dinners & Award Ceremonies",
      details: "Thrilling opening or mid-dinner musical interludes featuring iconic Puccini, Verdi, and Bizet arias that create an atmosphere of opulence and celebration."
    },
    {
      type: "Private Soirées & Ambassadorial Receptions",
      details: "Intimate salon recitals pairing French chanson, bel canto masterpieces, and evocative Irish art songs for distinguished international guests and private patrons."
    },
    {
      type: "Brand Launches & Cultural Showcases",
      details: "Customized artistic collaborations, themed musical suites, and dramatic vocal performances tailored to client branding and venue acoustics."
    },
    {
      type: "Festival & Open-Air Symphony Galas",
      details: "Guest soloist appearances with full orchestras, chamber ensembles, and prestigious choral societies."
    }
  ],
  repertoireCategories: [
    {
      category: "Show-Stopping Opera Arias",
      pieces: ["O mio babbino caro (Gianni Schicchi)", "Quando m'en vo (La Bohème)", "Sempre Libera (La Traviata)", "Habanera (Carmen)", "Chi il bel sogno di Doretta (La Rondine)"]
    },
    {
      category: "Classical Crossover & Musical Theatre",
      pieces: ["Time to Say Goodbye (Con te partirò)", "Nella Fantasia (Gabriel's Oboe)", "Music of the Night / Think of Me", "Somewhere (West Side Story)", "Summertime (Porgy & Bess)"]
    },
    {
      category: "Irish & Celtic Masterpieces",
      pieces: ["She Moved Through the Fair", "The Last Rose of Summer", "Danny Boy / Londonderry Air", "Mo Ghille Mear (Gaelic Choral Solo)", "Down by the Salley Gardens"]
    }
  ],
  features: [
    "Flexible ensemble setups from solo with grand piano to full orchestra accompaniment",
    "Bespoke setlist curation tailored to the event schedule, theme, and audience profile",
    "Flawless sound check coordination with venue AV and lighting teams",
    "Worldwide travel availability with representation management support"
  ]
};

