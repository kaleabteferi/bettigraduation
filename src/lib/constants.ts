// All photos & videos live in a public Supabase Storage bucket rather than the
// git repo (keeps the repo tiny and pushes fast). Change this base if the
// bucket or project ever moves.
export const MEDIA = "https://sjxkmynbbmqnfxjajgkp.supabase.co/storage/v1/object/public/media";

export const EVENT = {
  graduateName: "Betelhem Abera",
  nickname: "Betty",
  role: "Finance & International Trade",
  degree: "Master's Degree",
  university: "Wuhan Textile University",
  country: "China",
  classOf: "Class of 2026",
  dateLabel: "Saturday, July 18, 2026",
  isoDate: "2026-07-18T12:00:00+03:00",
  timeLabel: "Lunch Gathering — 12:00 PM",
  timeSub: "Addis Ababa time · no end time ∞ · celebrate freely",
  venueLabel: "Urael, Bole — Addis Ababa",
  venueSub: "Ethiopia 🇪🇹 · tap the map for directions",
  hosts: "Dr. Abera, Betelhem & Family",
  inviteZh: "邀请您参加 Betty 的毕业典礼！",
  invitePinyin: "Yāoqǐng nín cānjiā Betty de bìyè diǎnlǐ!",
  inviteEn: "You're invited to Betty's graduation celebration!",
  mapLat: 9.0082319,
  mapLng: 38.7796612,
  mapsUrl: "https://maps.app.goo.gl/oUnSwKoirzs3Denq6",
};

// s1 = 2×2 feature · s2 = 1×2 tall · s3 = 1×1. The pattern sums to full rows
// (24 cells on a 4-column grid) and grid-auto-flow dense fills any holes.
export const GALLERY_IMAGES: { src: string; size: "s1" | "s2" | "s3"; alt: string }[] = [
  { src: MEDIA + "/images/gallery-13.jpg", size: "s1", alt: "Betelhem joyfully running on campus with her cap" },
  { src: MEDIA + "/images/gallery-08.jpg", size: "s3", alt: "Betelhem on the red carpet at the graduation ceremony" },
  { src: MEDIA + "/images/gallery-05.jpg", size: "s2", alt: "Betelhem celebrating on campus after graduation" },
  { src: MEDIA + "/images/gallery-10.jpg", size: "s3", alt: "Congratulations Bethy rooftop celebration" },
  { src: MEDIA + "/images/gallery-09.jpg", size: "s3", alt: "Betelhem with fellow graduates" },
  { src: MEDIA + "/images/gallery-01.jpg", size: "s1", alt: "Betelhem at the graduation arena with fellow graduates" },
  { src: MEDIA + "/images/gallery-11.jpg", size: "s3", alt: "Congrats Bethy graduation cake" },
  { src: MEDIA + "/images/gallery-06.jpg", size: "s2", alt: "Betelhem with a bouquet of roses" },
  { src: MEDIA + "/images/gallery-07.jpg", size: "s3", alt: "Betelhem smiling with flowers" },
  { src: MEDIA + "/images/gallery-12.jpg", size: "s3", alt: "Betelhem on campus with her graduation cap" },
  { src: MEDIA + "/images/gallery-02.jpg", size: "s2", alt: "Betelhem at the graduation arena" },
  { src: MEDIA + "/images/gallery-04.jpg", size: "s1", alt: "Betelhem holding her decorated graduation cap" },
];

// Add more clips here — drop the file in public/videos/ and add an entry.
export const HIGHLIGHT_VIDEOS: { src: string; poster: string; label: string }[] = [
  { src: MEDIA + "/videos/highlight-01.mp4", poster: MEDIA + "/images/gallery-05.jpg", label: "Graduation day" },
  { src: MEDIA + "/videos/highlight-02.mp4", poster: MEDIA + "/images/gallery-01.jpg", label: "The celebration" },
  { src: MEDIA + "/videos/highlight-03.mp4", poster: MEDIA + "/images/gallery-13.jpg", label: "Campus moments" },
  { src: MEDIA + "/videos/highlight-04.mp4", poster: MEDIA + "/images/events/welcome/welcome-08.jpg", label: "Life in China" },
  { src: MEDIA + "/videos/highlight-05.mp4", poster: MEDIA + "/images/events/welcome/welcome-01.jpg", label: "With friends" },
  { src: MEDIA + "/videos/highlight-06.mp4", poster: MEDIA + "/images/events/welcome/welcome-20.jpg", label: "Wuhan days" },
];

export const JOURNEY = [
  { icon: "🌸", title: "Began the Journey", desc: "A dream takes shape, far from home", img: MEDIA + "/images/gallery-02.jpg" },
  { icon: "✈️", title: "Studied in China", desc: "Wuhan Textile University", img: MEDIA + "/images/gallery-04.jpg" },
  { icon: "📚", title: "Years of Dedication", desc: "Master's studies in Finance & International Trade", img: MEDIA + "/images/gallery-06.jpg" },
  { icon: "🎓", title: "Graduated", desc: "Master's Degree, Class of 2026", img: MEDIA + "/images/gallery-01.jpg" },
  { icon: "🏡", title: "Celebrating with Family", desc: "Addis Ababa, Ethiopia", img: null },
];

// Titles, stories and photos are editable placeholders — swap in the real
// event names, dates and images whenever they're ready. `gallery` entries that
// are null render as elegant "photo coming soon" slots.
export type ChinaEvent = {
  zh: string;
  title: string;
  when: string;
  where: string;
  desc: string;
  story: string;
  highlights: string[];
  videos?: string[]; // play at the top of the modal
  gallery: (string | null)[]; // null entries render as "photo coming soon" slots
};

export const CHINA_EVENTS: ChinaEvent[] = [
  {
    zh: "迎",
    title: "Friends, Firsts & Everyday Wuhan",
    when: "Across the Years",
    where: "Wuhan Textile University & beyond",
    desc: "The friends, firsts and everyday moments that turned a new city into home.",
    story:
      "New city, new language, a room full of strangers — and slowly, a whole life. From the welcome dinner that turned classmates from around the world into family, to podcast recordings, finance presentations, cosplay streets, glass skywalks and late-night city lights: these are the everyday moments that made Wuhan home. Scroll through a few years of firsts, friends and small adventures.",
    highlights: ["Classmates from a dozen countries, one table", "From lecture halls to rooftop city views", "The friends who became family far from home"],
    gallery: [
      MEDIA + "/images/events/welcome/welcome-01.jpg",
      MEDIA + "/images/events/welcome/welcome-02.jpg",
      MEDIA + "/images/events/welcome/welcome-03.jpg",
      MEDIA + "/images/events/welcome/welcome-04.jpg",
      MEDIA + "/images/events/welcome/welcome-05.jpg",
      MEDIA + "/images/events/welcome/welcome-06.jpg",
      MEDIA + "/images/events/welcome/welcome-07.jpg",
      MEDIA + "/images/events/welcome/welcome-08.jpg",
      MEDIA + "/images/events/welcome/welcome-09.jpg",
      MEDIA + "/images/events/welcome/welcome-10.jpg",
      MEDIA + "/images/events/welcome/welcome-11.jpg",
      MEDIA + "/images/events/welcome/welcome-12.jpg",
      MEDIA + "/images/events/welcome/welcome-13.jpg",
      MEDIA + "/images/events/welcome/welcome-14.jpg",
      MEDIA + "/images/events/welcome/welcome-15.jpg",
      MEDIA + "/images/events/welcome/welcome-16.jpg",
      MEDIA + "/images/events/welcome/welcome-17.jpg",
      MEDIA + "/images/events/welcome/welcome-18.jpg",
      MEDIA + "/images/events/welcome/welcome-19.jpg",
      MEDIA + "/images/events/welcome/welcome-20.jpg",
      MEDIA + "/images/events/welcome/welcome-21.jpg",
      MEDIA + "/images/events/welcome/welcome-22.jpg",
      MEDIA + "/images/events/welcome/welcome-23.jpg",
      MEDIA + "/images/events/welcome/welcome-24.jpg",
    ],
  },
  {
    zh: "童",
    title: "The First Kids Connect Event",
    when: "Guangzhou",
    where: "Ethiopian Community in Guangzhou",
    desc: "The first kids event hosted by Ethiopians in China — because every child deserves a place to belong.",
    story:
      "Every child deserves a place to belong. Betty and the Ethiopian Community in Guangzhou hosted their very first Kids Connect event — a day of games, cake and laughter that created joyful memories and meaningful connections for children and families building a life far from home. The first of its kind, hosted by Ethiopians in China.",
    highlights: ["The first Ethiopian-hosted kids event in China", "Games, cake and a whole lot of joy", "Connecting children and families far from home"],
    videos: [MEDIA + "/videos/kids-01.mp4", MEDIA + "/videos/kids-02.mp4", MEDIA + "/videos/kids-03.mp4"],
    gallery: [MEDIA + "/images/events/kids/kids-06.jpg"],
  },
  {
    zh: "友",
    title: "A Graduation, Thrown by Friends",
    when: "Class of 2026",
    where: "Rooftop celebration",
    desc: "The friends who became family surprised Betty with a graduation party to remember.",
    story:
      "Home isn't always a place — sometimes it's the people beside you. Betty's friends surprised her with a full graduation celebration: a “Congratulations Bethy, Class of 2026” backdrop, balloons, flowers, gifts and a rooftop dinner under the city lights. Grateful for the friends who became family and made this milestone even more meaningful.",
    highlights: ["A surprise “Class of 2026” celebration", "Balloons, flowers, gifts and city-light views", "The friends who became family"],
    videos: [MEDIA + "/videos/friends-01.mp4"],
    gallery: [
      MEDIA + "/images/events/friends/friends-01.jpg",
      MEDIA + "/images/events/friends/friends-02.jpg",
      MEDIA + "/images/events/friends/friends-03.jpg",
      MEDIA + "/images/events/friends/friends-04.jpg",
      MEDIA + "/images/events/friends/friends-05.jpg",
      MEDIA + "/images/events/friends/friends-06.jpg",
      MEDIA + "/images/events/friends/friends-07.jpg",
      MEDIA + "/images/events/friends/friends-08.jpg",
      MEDIA + "/images/events/friends/friends-09.jpg",
      MEDIA + "/images/events/friends/friends-10.jpg",
      MEDIA + "/images/events/friends/friends-11.jpg",
    ],
  },
  {
    zh: "谊",
    title: "Ethiopian Day 2026",
    when: "2026",
    where: "Ethiopian Community in Guangzhou",
    desc: "Host and co-organizer of the first Ethiopian Day — a celebration of culture, connection and Ethiopia–China friendship.",
    story:
      "More than an event — it was a celebration of unity, culture and belonging. Betty hosted and co-organized the first Ethiopian Day in Guangzhou: a night discovering Ethiopia, honouring culture and connection, and endorsing the friendship between Ethiopia and China. Proud to have played a part in bringing the community closer together. 🇪🇹",
    highlights: ["Host & co-organizer of the first Ethiopian Day", "A celebration of Ethiopia–China friendship", "Culture, connection and belonging"],
    // Note: this clip is byte-identical to the one on the friends card —
    // shared on both until Betty confirms which event it belongs to.
    videos: [MEDIA + "/videos/friends-01.mp4"],
    gallery: [
      MEDIA + "/images/events/ethiopianday/ethday-01.jpg",
      MEDIA + "/images/events/ethiopianday/ethday-02.jpg",
      MEDIA + "/images/events/ethiopianday/ethday-03.jpg",
      MEDIA + "/images/events/ethiopianday/ethday-04.jpg",
      MEDIA + "/images/events/ethiopianday/ethday-05.jpg",
      MEDIA + "/images/events/ethiopianday/ethday-06.jpg",
    ],
  },
  {
    zh: "宾",
    title: "Guest of the Chamber of Commerce",
    when: "Panyu District, Guangzhou",
    where: "International Parent-Child Friendly Exchange Gathering",
    desc: "Invited by the secretary of the Guangzhou Chamber of Commerce — a huge honor to attend as a guest.",
    story:
      "An invitation that meant the world: Betty attended the International Parent-Child Friendly Exchange Gathering hosted by the secretary of the Guangzhou Chamber of Commerce — a garden afternoon of culture and connection, where she spoke on stage, tried her hand at the guzheng, and stood for the group photo among families from across the world. A huge honor to be a guest there.",
    highlights: ["Personally invited by the Chamber of Commerce secretary", "A first lesson on the guzheng, China's classical zither", "Families from around the world, one garden"],
    videos: [],
    gallery: [
      MEDIA + "/images/events/chamber/chamber-01.jpg",
      MEDIA + "/images/events/chamber/chamber-02.jpg",
      MEDIA + "/images/events/chamber/chamber-03.jpg",
      MEDIA + "/images/events/chamber/chamber-04.jpg",
      MEDIA + "/images/events/chamber/chamber-05.jpg",
    ],
  },
];
