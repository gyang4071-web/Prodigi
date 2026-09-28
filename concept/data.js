// Content for the doors prototype.
// To add a department: append to `departments`. Only entries with `open: true`
// are clickable; the rest render as quiet "future" doors.
// To add or replace people: edit `characters` below.

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
  pillars: ['Expos', 'Deals', 'Partners', 'Markets'],
};

// International team, in the agreed order.
// roleLines: how the job title stacks (first line small + yellow, second line huge).
// description: blank line = new paragraph, single newline = line break.
// image: full-body cut-out with a transparent background. Until the file exists
// the stage shows an "Image slot" frame with the expected file name.
export const characters = [
  {
    name: 'Taron',
    surname: 'Sargsyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Scorpio',
    intro: 'International Sales Manager by title, professional deal-maker by instinct.',
    description: `In iGaming, he can sell absolutely anything — even a product he discovered three hours ago and already explains like he invented it.

He lives for expos, new connections, and conversations that somehow end with a deal.

Add perfect Russian, signature curly hair, and a gym-built body — basically, unfair competition.`,
    highlight: '“Give Taron a product, a badge, and one coffee break at an expo… he’ll come back with leads.”',
    image: 'assets/international/01-taron-sargsyan.webp',
  },
  {
    name: 'Eduard',
    surname: 'Saghatelyan',
    role: 'iGaming Media Partnerships Manager',
    roleLines: ['iGaming Media', 'Partnerships Manager'],
    zodiac: 'Scorpio',
    intro: 'iGaming Media Partnerships Manager by title, full-time researcher by nature.',
    description: `New product, audit, research, random idea — Eduard wants to understand everything. Preferably deeper than anyone asked.

His gesticulation deserves its own championship — honestly, he could probably explain an entire media plan without saying a word.

He’s caring, focused, and somehow always the unofficial guide for every new team member.`,
    highlight: '“When it comes to work, the calendar is mostly decorative — weekdays, weekends, after-hours… same energy.”',
    image: 'assets/international/02-eduard-saghatelyan.webp',
  },
  {
    name: 'Gor',
    surname: 'Avetisyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Aries',
    intro: 'International Sales Manager by day, future superstar by destiny.',
    description: `Always chasing bigger deals, bigger dreams, and eventually, a very big bank account.

His favorite word? “HaVVai eli”. Nobody knows exactly what it means, but Gor says it with confidence — and that’s what matters.

And then there’s his hair — basically sacred territory. The world may collapse, markets may crash, but Gor is NOT cutting it short.`,
    highlight: '“Big deals. Big dreams. Long hair. Priorities.”',
    image: 'assets/international/03-gor-avetisyan.webp',
  },
  {
    name: 'Michael',
    surname: 'Gabrielyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Sagittarius',
    intro: 'International Sales Manager by title, everyone’s favorite by default.',
    description: `Charismatic, always smiling, with cat-like eyes that could probably close a deal before the pitch even starts.

He’s a Real Madrid fan, easygoing and fun — but notices everything: every typo, every tiny mistake, every detail you hoped nobody would see.

He doesn’t make much noise about his work. One minute he’s just smiling, the next there’s a big-budget deal on the table like it appeared by magic.`,
    highlight: '“Smiles quietly. Spots everything. Somehow comes back with the big deal.”',
    image: 'assets/international/04-michael-gabrielyan.webp',
  },
  {
    name: 'Karen',
    surname: 'Vopyan',
    role: 'Marketing Assistant',
    roleLines: ['Marketing', 'Assistant'],
    zodiac: 'Capricorn',
    intro: 'Marketing Assistant by title, youngest in the team, but definitely not in ambition.',
    description: `At first, he may seem quiet and serious. Then, out of nowhere, he drops one perfectly timed joke and the whole team forgets what they were working on.

He’s good at Belote, suspiciously committed to energy drinks, and probably running on 20% sleep, 30% curiosity, 50% caffeine.

After work, when everyone else is ready to disappear, Karen starts his second shift: asking questions about the team, the company, the processes — basically conducting his own internal audit.`,
    highlight: '“20% sleep. 30% curiosity. 50% caffeine.”',
    image: 'assets/international/05-karen-vopyan.webp',
  },
  {
    name: 'Elina',
    surname: 'Manukyan',
    role: 'Business Development Lead',
    roleLines: ['Business Development', 'Lead'],
    zodiac: 'Taurus',
    intro: 'Business Development Lead by title, Mafia queen by reputation.',
    description: `She loves good food, strong opinions, great outfits, and winning at Mafia.

Her music taste goes from Michael Jackson to Lilit Hovhannisyan with zero warning.

Stylish, beautiful, unapologetically feminist — and then there’s Aida. Elina loves her very, very much. If you’re standing suspiciously close to Aida… Elina has already noticed.`,
    highlight: '“Mafia queen. Style on point. Aida under protection.”',
    image: 'assets/international/06-elina-manukyan.webp',
  },
];

export const zodiacSigns = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};
