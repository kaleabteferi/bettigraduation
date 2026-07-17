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
  { src: "/images/gallery-13.jpg", size: "s1", alt: "Betelhem joyfully running on campus with her cap" },
  { src: "/images/gallery-08.jpg", size: "s3", alt: "Betelhem on the red carpet at the graduation ceremony" },
  { src: "/images/gallery-05.jpg", size: "s2", alt: "Betelhem celebrating on campus after graduation" },
  { src: "/images/gallery-10.jpg", size: "s3", alt: "Congratulations Bethy rooftop celebration" },
  { src: "/images/gallery-09.jpg", size: "s3", alt: "Betelhem with fellow graduates" },
  { src: "/images/gallery-01.jpg", size: "s1", alt: "Betelhem at the graduation arena with fellow graduates" },
  { src: "/images/gallery-11.jpg", size: "s3", alt: "Congrats Bethy graduation cake" },
  { src: "/images/gallery-06.jpg", size: "s2", alt: "Betelhem with a bouquet of roses" },
  { src: "/images/gallery-07.jpg", size: "s3", alt: "Betelhem smiling with flowers" },
  { src: "/images/gallery-12.jpg", size: "s3", alt: "Betelhem on campus with her graduation cap" },
  { src: "/images/gallery-02.jpg", size: "s2", alt: "Betelhem at the graduation arena" },
  { src: "/images/gallery-04.jpg", size: "s1", alt: "Betelhem holding her decorated graduation cap" },
];

// Add more clips here — drop the file in public/videos/ and add an entry.
export const HIGHLIGHT_VIDEOS: { src: string; poster: string; label: string }[] = [
  { src: "/videos/highlight-01.mp4", poster: "/images/gallery-05.jpg", label: "Graduation day" },
  { src: "/videos/highlight-02.mp4", poster: "/images/gallery-01.jpg", label: "The celebration" },
  { src: "/videos/highlight-03.mp4", poster: "/images/gallery-13.jpg", label: "Campus moments" },
];

export const JOURNEY = [
  { icon: "🌸", title: "Began the Journey", desc: "A dream takes shape, far from home", img: "/images/gallery-02.jpg" },
  { icon: "✈️", title: "Studied in China", desc: "Wuhan Textile University", img: "/images/gallery-04.jpg" },
  { icon: "📚", title: "Years of Dedication", desc: "Master's studies in Finance & International Trade", img: "/images/gallery-06.jpg" },
  { icon: "🎓", title: "Graduated", desc: "Master's Degree, Class of 2026", img: "/images/gallery-01.jpg" },
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
  img: string | null;
  gallery: (string | null)[];
};

export const CHINA_EVENTS: ChinaEvent[] = [
  {
    zh: "迎",
    title: "Welcome Gathering",
    when: "Autumn",
    where: "Wuhan Textile University",
    desc: "The dinner that turned classmates from around the world into family.",
    story:
      "New city, new language, a room full of strangers — so Betty set a table. What began as a simple welcome dinner for international students became the night everyone still talks about: shared dishes from five continents, phone numbers exchanged, and the beginning of friendships that carried her through every exam season after.",
    highlights: ["Students from 12+ countries at one table", "Home-cooked dishes from five continents", "The group chat that never went quiet again"],
    img: null,
    gallery: [null, null, null],
  },
  {
    zh: "樱",
    title: "Blossom Picnic at East Lake",
    when: "Spring",
    where: "East Lake Cherry Blossom Garden, Wuhan",
    desc: "An afternoon under Wuhan's famous cherry blossoms, petals in everyone's hair.",
    story:
      "Wuhan's cherry blossoms are famous across China, and East Lake in full bloom looks like a painting. Betty organized a picnic under the trees — blankets, tea, music, and petals drifting into everything. It's the day this invitation's falling petals are borrowed from.",
    highlights: ["East Lake's 10,000 cherry trees in bloom", "Tea and snacks under the petals", "The photo album everyone kept"],
    img: null,
    gallery: [null, null, null],
  },
  {
    zh: "礼",
    title: "Ethiopian Coffee Ceremony",
    when: "International Cultural Week",
    where: "Campus Cultural Hall",
    desc: "Betty brought a taste of home to campus — buna, incense and open doors.",
    story:
      "For cultural week, Betty staged a full Ethiopian coffee ceremony — green beans roasted over flame, the room filling with incense, three rounds poured the traditional way. For many classmates it was their first taste of Ethiopia, and the line for a cup stretched out the door.",
    highlights: ["Beans roasted fresh, the traditional way", "Three rounds: abol, tona, baraka", "A line out the door for a taste of Ethiopia"],
    img: null,
    gallery: [null, null, null],
  },
  {
    zh: "别",
    title: "Farewell Banquet",
    when: "Summer 2026",
    where: "Wuhan",
    desc: "One last toast with professors and friends before the flight home.",
    story:
      "Degree in hand, bags half-packed, Betty gathered everyone one final time — the professors who pushed her, the friends who became family, the city that became a second home. There were speeches, there were tears, and there was a promise: the celebration continues in Addis Ababa.",
    highlights: ["Toasts from professors and friends", "Gifts, speeches and a few happy tears", "A promise: see you in Addis Ababa"],
    img: null,
    gallery: [null, null, null],
  },
];
