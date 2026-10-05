// Content for the landing.
// Every department is a door. A door opens when its department has `people`;
// the first person in `people` is always the head of the department.
//
// Person fields (only name is required; empty ones are simply not shown):
//   name, surname, role, roleLines (how the title stacks: small accent line,
//   then a huge line), zodiac, intro, description (blank line = new paragraph),
//   highlight, image (full-body cut-out with a transparent background).

const founders = [
  {
    name: 'Aida',
    surname: 'Vopyan',
    role: 'Co-Founder & CEO',
    roleLines: ['Co-Founder', '& CEO'],
    zodiac: 'Leo',
    intro: "Co-Founder & CEO by title, ProDigi’s heart, engine, and ultimate keeper of the vision by nature.",
    description: `The most hardworking, organized, and devoted person you could ever meet. Aida knows everything about ProDigi — from A to Z, and probably somewhere beyond Z too. ProDigi isn’t just a company to her; it’s her world, and she somehow spends every day making that world bigger, better, and more wonderful.

She’s deeply loved and respected by the team — and for good reason. Aida is the kind of person who genuinely lives for the people around her: her family, siblings, friends, and team. Caring, generous, endlessly giving, and always ready to show up for the people she loves.

She also has two great passions: travel and shopping — preferably combined. And she’s always ready to try something new: a new dish, a new place, a new experience, a new adventure.

And then there’s The Lion King. Aida lives by one simple reminder: “Remember who you are.” No matter what happens, how much things change, or how complicated life gets, she stays grounded in who she is, what she believes in, and the values that brought her here.

Because ultimately, that’s Aida — someone who built a world, takes care of everyone in it, and never forgets who she is.`,
    image: 'assets/ceo/01-aida-vopyan.webp',
  },
  {
    name: 'Boris',
    surname: 'Sahakyan',
    role: 'Co-Founder',
    roleLines: ['Co-Founder', 'Visionary'],
    zodiac: 'Pisces',
    intro: "Co-Founder and ProDigi’s visionary by title, professional adventurer and business-instinct machine by nature.",
    description: `A true visionary in basically everything. Boris has an almost suspiciously strong ability to predict where things are going and somehow notices the tiniest details in business before everyone else does.

He loves creating new things — a new business, a new idea, a new opportunity. He’s built several successful businesses, with a big part of that success coming from his incredible business intuition.

Boris also has a serious weakness for adventures. He loves traveling, discovering new places, experiencing how locals actually live, and, naturally, finding the nearest techno party.

And when it comes to team parties, Boris is basically a different department altogether. The team absolutely loves partying with him — he gets everyone dancing, keeps the energy going, has surprisingly interesting conversations with team.

Basically, Boris doesn’t just see where the world is going — he usually wants to go there first.`,
    image: 'assets/ceo/02-boris-sahakyan.webp',
  },
  {
    name: 'Arsen',
    surname: 'Sultanyan',
    role: 'Co-Founder',
    roleLines: ['Prodigi', 'Co-Founder'],
    zodiac: 'Sagittarius',
    intro: "Co-Founder by title, the true Sultan of Digital by nature.",
    description: `Exceptionally smart and deeply immersed in both digital and business. Arsen is one of the people who helped take digital marketing in Armenia to a whole new level — always looking beyond the obvious and thinking several steps ahead.

He loves diving into new business directions and turning new ideas into products, guided by a powerful combination of expertise and intuition.

Calm, humble, intelligent, and genuinely respectful, Arsen is someone the team deeply respects and trusts. And outside of business, he’s a father of four — and an incredibly devoted and exemplary one.

With a surname like Sultanyan, there was really only one possible title: the true Sultan of Digital.`,
    image: 'assets/ceo/03-arsen-sultanyan.webp',
  },
];

const international = [
  {
    name: 'Elina',
    surname: 'Manukyan',
    role: 'Business Development Lead',
    roleLines: ['Business Development', 'Lead'],
    zodiac: 'Taurus',
    intro: 'Business Development Lead by title, Mafia queen by reputation.',
    description: `She loves good food, strong opinions, great outfits, and winning at Mafia. Her music taste goes from Michael Jackson to Lilit Hovhannisyan with zero warning.

Stylish, beautiful, unapologetically feminist — and then there’s Aida. Elina loves her very, very much. If you’re standing suspiciously close to Aida… Elina has already noticed.`,
    image: 'assets/international/06-elina-manukyan.webp',
  },
  {
    name: 'Taron',
    surname: 'Sargsyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Scorpio',
    intro: 'International Sales Manager by title, professional deal-maker by instinct.',
    description: `In iGaming, he can sell absolutely anything — even a product he discovered three hours ago and already explains like he invented it.

He lives for expos, new connections, and conversations that somehow end with a deal. Add perfect Russian, signature curly hair, and a gym-built body — basically, unfair competition.

Give Taron a product, a badge, and one coffee break at an expo… he’ll come back with leads.`,
    image: 'assets/international/01-taron-sargsyan.webp',
  },
  {
    name: 'Eduard',
    surname: 'Saghatelyan',
    role: 'iGaming Media Partnerships Manager',
    roleLines: ['iGaming Media', 'Partnerships Manager'],
    zodiac: 'Scorpio',
    intro: 'iGaming Media Partnerships Manager by title, full-time researcher by nature 🔍',
    description: `New product, audit, research, random idea — Eduard wants to understand everything. Preferably deeper than anyone asked.

His gesticulation deserves its own championship — honestly, he could probably explain an entire media plan without saying a word. He’s caring, focused, and somehow always the unofficial guide for every new team member. And when it comes to work, the calendar is mostly decorative — weekdays, weekends, after-hours… same energy.`,
    image: 'assets/international/02-eduard-saghatelyan.webp',
  },
  {
    name: 'Gor',
    surname: 'Avetisyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Aries',
    intro: 'International Sales Manager by day, future superstar by destiny.',
    description: `Always chasing bigger deals, bigger dreams, and eventually, a very big bank account. His favorite word? “HaVVai eli”.

Nobody knows exactly what it means, but Gor says it with confidence — and that’s what matters.

And then there’s his hair — basically sacred territory. The world may collapse, markets may crash, but Gor is not cutting it short. Priorities.`,
    image: 'assets/international/03-gor-avetisyan.webp',
  },
  {
    name: 'Michael',
    surname: 'Gabrielyan',
    role: 'International Sales Manager',
    roleLines: ['International', 'Sales Manager'],
    zodiac: 'Sagittarius',
    intro: 'International Sales Manager by title, everyone’s favorite by default.',
    description: `Charismatic, always smiling, with cat-like eyes that could probably close a deal before the pitch even starts. He’s a Real Madrid fan, easygoing, fun — but notices everything: every typo, every tiny mistake, every detail you hoped nobody would see.

He doesn’t make much noise about his work — one minute he’s just smiling, the next there’s a big-budget deal on the table like it appeared by magic.`,
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

He’s good at Belote, suspiciously committed to energy drinks, and probably running on 20% sleep, 30% curiosity, and 50% caffeine.

After work, when everyone else is ready to disappear, Karen starts his second shift: asking questions about the team, the company, the processes — basically conducting his own internal audit.`,
    image: 'assets/international/05-karen-vopyan.webp',
  },
];

const digital = [
  {
    name: 'Lilit',
    surname: 'Vardanyan',
    role: 'Head of Digital',
    roleLines: ['Head of', 'Digital'],
    zodiac: 'Virgo',
    intro: 'Head of Digital by title, presentation goddess and team bestie by default.',
    description: `She loves Russian rock, movies, series, board games — and is the undisputed office Belote queen.

From the outside: calm, chill, almost “whatever.” Inside: professional overthinker, running 48 scenarios for something that probably needed two.

She does impressions, tells legendary stories, and after 9 years at Prodigi has made 9,000+ presentations. At this point, PowerPoint and Canva should list her as a co-founder.`,
    image: 'assets/digital/01-lilit-vardanyan.webp',
  },
  {
    name: 'Maria',
    surname: 'Petrosyan',
    role: 'Paid Ads Projects Lead',
    roleLines: ['Paid Ads', 'Projects Lead'],
    zodiac: 'Cancer',
    intro: 'Paid Ads Projects Lead by title, professional chaos manager by nature.',
    description: `She loves books, theatre, concerts, hiking — and dreams of someone treating her with the same level of care she gives Rob. Standards are high. Very high.

She also plans to somehow own a house in every region of Armenia and, ideally, finance the whole thing with one absurdly lucky casino win.

At work, Maria is all in: big responsibility, big fuckups, and preferably even bigger comebacks.`,
    image: 'assets/digital/02-maria-petrosyan.webp',
  },
  {
    name: 'Albert',
    surname: 'Azaryan',
    role: 'Digital Marketing Specialist',
    roleLines: ['Digital Marketing', 'Specialist'],
    zodiac: 'Sagittarius',
    intro: 'Digital Marketing Specialist by title, Barça loyalist by religion.',
    description: `His essentials are simple: Messi, K-pop, Naruto, ramen and Cola. Challenge him at work and he somehow unlocks a new performance level — apparently, peace was never the strategy.

He loves animals and regularly feeds street cats and dogs. He loves the letter W so much that V basically has no job in his alphabet.

His long-term plan is very specific: move to Spain, have four kids, and make sure one of the boys is named Felix. Valera calls him “the Viking.” Nobody knows why. Albert included. At this point, asking would ruin the mystery.`,
    image: 'assets/digital/03-albert-azaryan.webp',
  },
  {
    name: 'Stepan',
    surname: 'Petrosyan',
    role: 'Digital Marketing Specialist',
    roleLines: ['Digital Marketing', 'Specialist'],
    zodiac: 'Cancer',
    intro: 'Digital Marketing Specialist by title, office detective by instinct.',
    description: `He’s been at Prodigi for just a few months, yet somehow already knows more about the team, clients, projects, and company history than people who’ve been here for years.

He loves games, follows every rule like it’s written into law, and gets personally offended when someone else doesn’t.

Super social, endlessly curious, and somehow capable of making even the quietest person talk.

And while everyone else wants bigger budgets, Stepan actually enjoys the small ones — because apparently, normal difficulty is just too boring.`,
    image: 'assets/digital/04-stepan-petrosyan.webp',
  },
  {
    name: 'Gevorg',
    surname: 'Gasparyan',
    role: 'Digital Marketing Specialist',
    roleLines: ['Digital Marketing', 'Specialist'],
    zodiac: 'Sagittarius',
    intro: 'Digital Marketing Specialist by title, “let me figure this out properly” person by nature.',
    description: `Responsible, hardworking, and the kind of person who never stops at “good enough.” Thanks to his Russian education, his vocabulary also occasionally comes with some very creative Russian-Armenian combinations.

He loves working with AI tools, plays football well, and also makes leather goods by hand — especially bags. Because apparently one skill set wasn’t enough.

He’s only been at Prodigi for a few months, but has already become a favorite of both the team and the clients.`,
    image: 'assets/digital/05-gevorg-gasparyan.webp',
  },
];

const seo = [
  {
    name: 'Seyran',
    surname: 'Yaylakhanyan',
    role: 'SEO Department Head',
    roleLines: ['SEO Department', 'Head'],
    zodiac: 'Sagittarius',
    intro: 'SEO Department Head by title, Gyumri’s tech ambassador by nature.',
    description: `A true SEO expert and enthusiast, fluent in rankings, algorithms, and authentic Gyumri dialect — sometimes all in the same sentence.

Apple evangelist, hardcore technocrat, and a man who probably trusts an iPhone more than most people. He knows every iconic comedy reel and Kargin Haghordum episode by heart, so there’s a very real chance your joke is already in his database.

Seyran is also genuinely one of the kindest people around — the type who helps literally EVERYONE, and somehow even has his own charitable humanitarian organization.`,
    image: 'assets/seo/01-seyran-yaylakhanyan.webp',
  },
  {
    name: 'Tatul',
    surname: 'Baghdasaryan',
    role: 'SEO Specialist',
    roleLines: ['SEO', 'Specialist'],
    zodiac: 'Pisces',
    intro: 'SEO Specialist by title, gentleman by default.',
    description: `Polite, well-mannered, and somehow capable of explaining even the most complicated SEO process without making the client regret asking the question.

He can find common ground with almost any client, translate technical SEO into normal human language, and keep his calm even when the conversation starts with, “Why aren’t we #1 on Google yet?”

But Tatul’s strongest sense of optimization may have nothing to do with search engines. He also has excellent taste in women — proven by choosing Iren from our SMM team and officially creating Prodigi’s very first office love story.`,
    image: 'assets/seo/02-tatul-baghdasaryan.webp',
  },
  { name: 'SEO', surname: 'Team', roleLines: ['Name', 'coming soon'], image: 'assets/seo/03-seo-team.webp' },
  { name: 'SEO', surname: 'Team', roleLines: ['Name', 'coming soon'], image: 'assets/seo/04-seo-team.webp' },
];

const production = [
  {
    name: 'Siranush',
    surname: 'Tovmasyan',
    role: 'Head of Production',
    roleLines: ['Head of', 'Production'],
    zodiac: 'Gemini',
    intro: 'Head of Production by title, tech witch by skill set, future farmer by life plan.',
    description: `She knows marketing, understands AI suspiciously well, and at this point treats AI agents less like tools and more like unpaid members of her department.

Cats, dogs, cooking, cute anime, vegetables from her own garden — basically, half production head, half cottage-core final boss. At first she may seem a little spiky. Plot twist: she’s actually very cute. Just check the weather before approaching — her mood may already have synced with it.`,
    // character render not supplied yet: the stage shows an image slot
    image: 'assets/production/01-siranush-tovmasyan.webp',
  },
  {
    name: 'Anna',
    surname: 'Hovhannisyan',
    role: 'Senior Graphic Designer',
    roleLines: ['Senior Graphic', 'Designer'],
    zodiac: 'Pisces',
    intro: 'Senior Graphic Designer by title, branding superstar and unofficial taste police by nature.',
    description: `Clothes, interiors, music, movies — Anna has an opinion on everything, and annoyingly, it’s usually right. With a past in cinema, bad composition has no chance. She loves Zemfira, Okean Elzy, traveling, and making brands look expensive.

At first, she may seem “a little complicated.” Later, people somehow can’t imagine life without her.

And yes, Anna has compromising videos from almost every corporate party. So basically, everyone should stay on her good side.`,
    image: 'assets/production/02-anna-hovhannisyan.webp',
  },
  {
    name: 'Tigran',
    surname: 'Hovhannisyan',
    role: 'Motion Graphic Designer',
    roleLines: ['Motion Graphic', 'Designer'],
    zodiac: 'Leo',
    intro: 'Motion Graphic Designer by title, cinema encyclopedia by default.',
    description: `Dolly, shooting, character animation — he knows the whole game. He climbed Mount Ararat with the Prodigi flag and has literally worked from a mountain, because apparently altitude is not an excuse.

He loves rabiz, can stretch one bag of chips for two weeks, and owns basically every vehicle known to mankind. Bike, moto, car, off-roader…probably a helicopter and a private jet too. No proof. But we all know.`,
    image: 'assets/production/03-tigran-hovhannisyan.webp',
  },
];

// People whose names have not arrived yet: the department name stands in.
const team = (label, folder, count) => Array.from({ length: count }, (_, i) => ({
  name: label, surname: 'Team', roleLines: ['Name', 'coming soon'],
  image: `assets/${folder}/0${i + 1}-member.webp`,
}));

// Order follows the company structure.
export const departments = [
  { id: 'ceo', name: 'Founders', lead: 'Aida', people: founders },
  {
    id: 'business-dev', name: 'Business Development',
    people: [
      {
      name: 'Anahit', surname: 'Vopyan', role: 'Partnerships Director', roleLines: ['Partnerships', 'Director'],
      zodiac: 'Cancer',
      intro: 'Partnerships Director by title, aesthetic director of literally everything by nature.',
      description: `An absolute aesthetic connoisseur who can turn basically anything into content-worthy material. A meal, a cocktail, a random street corner — her first thought is always “How will this look on social?”

Exceptionally hardworking, a phenomenal project manager, and basically a human reminder system. Her memory is freakishly good — she remembers everything, down to the smallest detail, date, and sometimes even the exact hour.

And if something in your life is suddenly perfectly organized, beautifully presented, and somehow already remembered three weeks in advance… there’s a very good chance Anahit had something to do with it.`,
      image: 'assets/business-development/01-anahit-vopyan.webp',
    },
      {
      name: 'Anna', surname: 'Tshartaryan', role: 'Commercial Director', roleLines: ['Commercial', 'Director'],
      zodiac: 'Virgo',
      intro: 'Commercial Director by title, explorer of the world and lover of everything extraordinary by nature.',
      description: `Anna loves to travel and explore the world — from ancient cities and European architecture to the most exotic places on the planet. She simply loves to do things differently — and you can check her wedding photos for proof. 😉

She loves the extraordinary in everything: food, decorations, client gifts, Christmas trees… basically, if there’s a way to make something more interesting, Anna will find it.

A genuinely nice person, a brilliant communicator, and a sales powerhouse with BIG experience. Many, many ProDigi clients are Anna’s clients — so at this point, she’s practically a walking client portfolio.`,
      image: 'assets/business-development/02-anna-tchartaryan.webp',
    },
      {
      name: 'Taguhi', surname: 'Petrosyan', role: 'Director of Operations', roleLines: ['Director of', 'Operations'],
      zodiac: 'Sagittarius',
      intro: 'Director of Operations by title, ProDigi’s unofficial problem-solving headquarters by nature.',
      description: `An exceptionally funny person and the comfort zone of many employees — the person you go to when you need to figure something out, fix something, or simply make sense of a complicated situation.

Strong, independent, goal-oriented, organized, and hardworking — Taguhi can probably figure out almost anything if you give her enough time and a laptop.

A former accountant with an almost suspiciously good command of accounting and legal processes. These days, she’s busy localizing businesses and traveling the world for work — because apparently solving problems in one country wasn’t challenging enough.

Basically, if something is complicated, involves paperwork, numbers, legal processes, or international business… there’s a very good chance Taguhi already knows what to do.`,
      image: 'assets/business-development/03-taguhi-petrosyan.webp',
    },
    ],
  },
  { id: 'digital', name: 'Digital', lead: 'Lilit', people: digital },
  {
    id: 'international', name: 'International', lead: 'Elina', tag: 'iGaming',
    tagline: 'International connects Prodigi with markets, partners and opportunities beyond borders.',
    pillars: ['Expos', 'Deals', 'Partners', 'Markets'],
    people: international,
  },
  {
    id: 'native-arm', name: 'Native ARM', lead: 'Hermine',
    people: [
      {
      name: 'Hermine', surname: 'Ghazaryan', role: 'Native Network ARM Director', roleLines: ['Native Network', 'ARM Director'],
      zodiac: 'Leo',
      intro: 'Native Network ARM Director by title, master of keeping things perfectly under control by nature.',
      description: `Probably the most rational person at ProDigi. Emotions? She has them maybe — she just doesn’t let them interfere with the decision-making process. 😄

Extremely organized and incredibly fast, Hermine somehow manages to handle work, her kids, and approximately a thousand other things without making it look like a crisis.

One of her strongest superpowers? Money. Counting it, managing it, pricing, margins, budgets — if numbers need to make sense, Hermine will make them make sense.

Calm, straightforward, and completely drama-free. No unnecessary emotions, no complicated stories — just a clear plan, the right numbers, and somehow everything gets done.`,
      image: 'assets/native-arm/01-hermine-ghazaryan.webp',
    },
      {
      name: 'Meri', surname: 'Ratevosyan', role: 'Customer Service Specialist', roleLines: ['Customer Service', 'Specialist'],
      zodiac: 'Virgo',
      intro: 'Customer Service Specialist by title, ProDigi’s chief organizer, fixer, and unofficial office commander by nature.',
      description: `Probably the most organized person in the world. Meri notices everything, fixes everything, and can help with almost any task — often before you even realize you need help.

A former Office Administrator, she knows every little detail of the office and exactly how everything is supposed to work.

She’s incredibly caring and always looks after everyone — but don’t let the kindness fool you. Meri is also very bossy. Office service providers are afraid of her. The team is slightly afraid of her. And honestly, that’s probably why everything works so well.

If something is broken, missing, or disorganized… Meri already knows about it.`,
      image: 'assets/native-arm/02-meri-ratevosyan.webp',
    },
    ],
  },
  { id: 'native-uzb', name: 'Native UZB', lead: 'Valera', people: team('Native UZB', 'native-uzb', 4) },
  { id: 'production', name: 'Production', lead: 'Siranush', people: production },
  { id: 'seo', name: 'SEO', lead: 'Seyran', people: seo },
  { id: 'smm', name: 'SMM', people: team('SMM', 'smm', 5) },
  { id: 'operations-sales', name: 'Operations & Sales', people: team('Ops & Sales', 'operations-sales', 5) },
  {
    id: 'accounting', name: 'Accounting', lead: 'Gevorg',
    people: [
      {
      name: 'Gevorg', surname: 'Nazaretyan', role: 'Chief Accountant', roleLines: ['Chief', 'Accountant'],
      intro: 'Chief Accountant by title, surprisingly relaxed human by nature.',
      description: `Flexible, practical, easy to communicate with, and proof that accounting doesn’t always have to come with stress and a serious face. He’s smart, well-mannered, genuinely caring, and somehow integrated into the team almost instantly.

Outside spreadsheets and numbers, Gevorg has great taste in music, is a certified party animal, and can switch from financial logic to Katibe-style dancing with absolutely no transition.

He also has a mysteriously complicated relationship with Georgia — but that’s probably a story for another office party.

Apparently, spreadsheets and Katibe moves can live in perfect harmony.`,
      image: 'assets/accounting/02-gevorg-nazaretyan.webp',
    },
      { name: 'Arpi', surname: 'Zaqaryan', role: 'Accounting', roleLines: ['Prodigi', 'Accounting'], image: 'assets/accounting/01-arpi-zaqaryan.webp' },
      { name: 'Lusik', surname: 'Melqonyan', role: 'Accounting', roleLines: ['Prodigi', 'Accounting'], image: 'assets/accounting/03-lusik-melqonyan.webp' },
    ],
  },
].map((d, i) => ({ index: String(i + 1).padStart(2, '0'), ...d, people: d.people || [], open: !!d.people?.length }));

export const zodiacSigns = {
  aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋', leo: '♌', virgo: '♍',
  libra: '♎', scorpio: '♏', sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓',
};
