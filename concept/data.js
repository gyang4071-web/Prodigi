// Content for the doors prototype.
// To add a department: append to `departments`. Only entries with `open: true`
// are clickable; the rest render as quiet "future" doors.
// To add or replace people: edit `characters`. `image` is a path to a
// transparent PNG/WebP (full body, ~1:2.2 ratio works best). Leave it empty
// and the stage shows a neutral "portrait pending" frame instead.

export const departments = [
  { id: 'digital',       name: 'Digital',       index: '01' },
  { id: 'paid-ads',      name: 'Paid Ads',      index: '02' },
  { id: 'international', name: 'International', index: '03', open: true },
  { id: 'creative',      name: 'Creative',      index: '04' },
  { id: 'production',    name: 'Production',    index: '05' },
];

export const international = {
  title: 'International',
  lead: 'International connects Prodigi with markets, partners and opportunities beyond borders.',
  pillars: ['Markets', 'Partners', 'Opportunities'],
};

// Placeholder people. Text is temporary; images are the existing cut-outs
// from /assets/team and will be swapped for the new art.
export const characters = [
  {
    name: 'Maria',
    surname: 'Petrosyan',
    role: 'International Account Manager',
    zodiac: 'leo',
    description: 'Works across markets, clients and time zones.',
    funFact: 'Answer a message before you finish typing it.',
    image: '../assets/team/maria_01.png',
  },
  {
    name: 'Albert',
    surname: 'Azaryan',
    role: 'Partnerships Lead',
    zodiac: 'gemini',
    description: 'Turns a first call into a long-term partner, usually in two languages at once.',
    funFact: 'Know someone in every city you mention.',
    image: '../assets/team/albert_01.png',
  },
  {
    name: 'Lilit',
    surname: '',
    role: 'Head of International',
    zodiac: 'capricorn',
    description: 'Sets the direction for new markets and keeps every launch on one calendar.',
    funFact: 'Plan a market entry while the plane is still boarding.',
    image: '../assets/team/lilit_01.png',
  },
  {
    name: 'Gevorg',
    surname: 'Gasparyan',
    role: 'Market Research Lead',
    zodiac: 'scorpio',
    description: 'Reads a new market the way other people read a menu.',
    funFact: 'Explain a whole region with his hands before opening the deck.',
    image: '../assets/team/gevorg_01.png',
  },
  {
    name: 'Stepan',
    surname: '',
    role: 'Business Development Manager',
    zodiac: 'aries',
    description: 'Opens doors, literally and on LinkedIn.',
    funFact: 'Have fourteen time zones open in his browser.',
    image: '../assets/team/stepan_01.png',
  },
];

export const zodiacSigns = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};
