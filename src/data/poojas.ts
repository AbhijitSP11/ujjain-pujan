import type { POSTERS } from '@/lib/assets'

export type PoojaCategory =
  | 'dosh-nivaran'
  | 'abhishek-jaap'
  | 'pind-daan-shradh'
  | 'vivah'
  | 'general'

export interface Pooja {
  slug: string
  nameEn: string
  nameHi: string
  category: PoojaCategory
  description: string
  fullDescription: string
  duration: string
  priceFrom: number
  priceTo?: number
  temple: string
  bestDay?: string
  benefits: string[]
  includes: string[]
  whoShouldDo: string
  process: string[]
  faq: { q: string; a: string }[]
  relatedSlugs: string[]
  seoTitle: string
  seoDescription: string
  posterKey: keyof typeof POSTERS
}

export const CATEGORIES: { id: PoojaCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'dosh-nivaran', label: 'Dosh Nivaran' },
  { id: 'abhishek-jaap', label: 'Abhishek & Jaap' },
  { id: 'pind-daan-shradh', label: 'Pind Daan & Shradh' },
  { id: 'vivah', label: 'Vivah' },
  { id: 'general', label: 'General' },
]

/** Shared across every package — listed per-pooja so each page reads complete. */
const BASE_INCLUDES = [
  'Complete samagri arranged by the pandit',
  'Sankalp in your name, gotra and nakshatra',
  'Experienced Shastri/Acharya-qualified pandit',
  'Live video call option for remote devotees',
  'Prasad couriered to your address',
]

export const POOJAS: Pooja[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // DOSH NIVARAN
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'kaal-sarp-dosh',
    nameEn: 'Kaal Sarp Dosh Nivaran',
    nameHi: 'कालसर्प दोष निवारण पूजा',
    category: 'dosh-nivaran',
    description:
      'Removes the malefic effects of Rahu-Ketu alignment in the kundli. Performed at the Mahakaleshwar Jyotirlinga.',
    fullDescription: `Kaal Sarp Dosh forms when all seven principal planets of a horoscope fall between the shadow planets Rahu and Ketu. The classical texts describe twelve varieties of this yoga — Anant, Kulik, Vasuki, Shankhpal, Padma, Mahapadma, Takshak, Karkotak, Shankhachud, Ghatak, Vishdhar and Sheshnag — each named for the serpent whose position it mirrors, and each producing a distinct pattern of obstruction in the life of the native.

Devotees who carry this dosh often describe the same experience: effort that does not convert into result. Careers stall at the threshold of promotion. Marriage proposals advance and then dissolve without clear reason. Financial gains arrive and drain away. Sleep is disturbed by recurring dreams of serpents. The dosh does not deny what is destined; it delays and complicates the path to it.

Ujjain is the scripturally prescribed location for Kaal Sarp Dosh Nivaran. The Mahakaleshwar Jyotirlinga is the only one of the twelve that is dakshinamukhi — south-facing — and the south is the direction governed by Yama and by the serpent energies. Mahakal is the lord of time itself, and Kaal Sarp Dosh is fundamentally a distortion in the timing of a life. This is why the shastras direct the ritual here rather than to any other Jyotirlinga.

The pooja begins with Ganesh sthapana and a formal sankalp in which the pandit recites your name, your father's name, your gotra and your nakshatra, establishing you as the yajman before the deity. Rahu and Ketu are invoked through their specific beej mantras with the prescribed number of repetitions. A pair of nag pratimas — serpent figures cast in silver or panchdhatu — are consecrated, worshipped and then offered in daan, the symbolic act by which the serpent debt is released. Rudrabhishek follows over the Shivling with panchamrit, and the ritual closes with havan and purnahuti.

The full vidhi runs two to three hours. It is most powerfully performed on Nag Panchami, on Panchami tithi in any month, or on a Tuesday or Saturday. Devotees who cannot travel to Ujjain join by live video call — the sankalp is taken in your name exactly as it would be in person, and the consecrated prasad along with the nag pratima is couriered to your address afterwards. A great many of our Kaal Sarp bookings come from devotees in the United States, the United Kingdom and the Gulf who attend this way.`,
    duration: '2–3 hrs',
    priceFrom: 3100,
    priceTo: 7100,
    temple: 'Mahakaleshwar Temple',
    bestDay: 'Nag Panchami · Panchami tithi · Tue/Sat',
    benefits: [
      'Releases blocked career growth and stalled promotions',
      'Clears repeated obstruction in marriage proposals',
      'Ends the cycle of gains that arrive and drain away',
      'Relieves recurring serpent dreams and disturbed sleep',
      'Restores mental steadiness and confidence in decisions',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Silver / panchdhatu nag pratima for daan',
      'Rahu–Ketu beej mantra jaap as prescribed',
      'Rudrabhishek over the Mahakaleshwar Shivling',
      'Havan with purnahuti',
    ],
    whoShouldDo:
      'Anyone whose horoscope shows all seven planets enclosed between Rahu and Ketu should perform Kaal Sarp Dosh Nivaran. It is especially indicated for those facing repeated failure despite genuine effort, delayed or broken marriage negotiations, chronic instability in business, recurring dreams involving snakes, unexplained health complaints that resist diagnosis, or a sense that progress is always deferred. If you are unsure whether the dosh is present in your kundli, share your birth details on WhatsApp — our pandit will read the chart and confirm at no cost before you book anything.',
    process: [
      'Ganesh sthapana and kalash sthapana to open the ritual',
      'Sankalp taken aloud in your name, gotra and nakshatra',
      'Navgrah sthapana and invocation of the nine planets',
      'Rahu and Ketu beej mantra jaap in the prescribed count',
      'Consecration and worship of the silver nag pratimas',
      'Nag pratima daan — the release of the serpent debt',
      'Rudrabhishek over the Shivling with panchamrit',
      'Havan, purnahuti and aarti',
      'Prasad distribution and dispatch',
    ],
    faq: [
      {
        q: 'How do I know if I have Kaal Sarp Dosh in my kundli?',
        a: 'The dosh is present when every one of the seven principal planets falls on one side of the Rahu–Ketu axis. Send your date, exact time and place of birth on WhatsApp and our pandit will examine the chart and tell you which of the twelve types applies, free of charge.',
      },
      {
        q: 'How many times must this pooja be performed?',
        a: 'Once is sufficient for the great majority of devotees. Where the dosh is severe — a Sheshnag or Takshak configuration, or a chart with additional afflictions — the pandit may advise repeating the vidhi on Nag Panchami for three consecutive years.',
      },
      {
        q: 'Why must it be performed in Ujjain specifically?',
        a: 'Mahakaleshwar is the only south-facing Jyotirlinga among the twelve, and the south is the direction of the serpent energies. Mahakal governs time, and Kaal Sarp Dosh is a distortion of timing. The shastras therefore prescribe Ujjain for this particular ritual.',
      },
      {
        q: 'Can the pooja be done on my behalf if I cannot travel?',
        a: 'Yes. The sankalp is taken in your name, gotra and nakshatra whether or not you are physically present. You may attend over live video call, and the prasad along with the consecrated nag pratima is couriered to your address.',
      },
    ],
    relatedSlugs: ['mangal-dosh', 'navgrah-shanti', 'rudrabhishek', 'narayan-nagbali'],
    seoTitle: 'Kaal Sarp Dosh Nivaran Pooja in Ujjain | Mahakaleshwar | Ujjain Pujan',
    seoDescription:
      'Book Kaal Sarp Dosh Nivaran Pooja in Ujjain at Mahakaleshwar Temple with verified pandits. ₹3,100 onwards, complete samagri, nag pratima daan, live video call for NRI devotees.',
    posterKey: 'templeDawnFinal',
  },

  {
    slug: 'mangal-dosh',
    nameEn: 'Mangal Dosh Bhat Pooja',
    nameHi: 'मंगल दोष भात पूजा',
    category: 'dosh-nivaran',
    description:
      'Pacifies Mangal (Mars) affliction that delays and disturbs marriage. Performed at Mangalnath Mandir, the birthplace of Mars.',
    fullDescription: `Mangal Dosh — known across northern India as Manglik dosh — arises when Mars occupies the first, second, fourth, seventh, eighth or twelfth house of a horoscope. Mars is the planet of heat, force and assertion. Placed in the houses that govern marriage, temperament and domestic life, that force turns inward and expresses itself as friction: engagements that break at the last stage, matches that are rejected after horoscope matching, and marriages that begin well but settle into constant discord.

Mangalnath Mandir in Ujjain is the prescribed place to pacify it. According to the Matsya Purana, Mars was born here — Ujjain is the janmasthal of the planet itself, and the temple stands on the site. No other location carries the same authority for Mangal shanti. The Bhat Pooja performed at Mangalnath is the classical remedy, and it draws devotees from every part of India and from Indian families settled abroad who are searching for a match.

The word bhat refers to the cooked rice that forms the heart of the ritual. Rice is prepared, offered to Mangal Dev, and then distributed — the cooling grain answering the heat of the planet. Around this central offering the pandit performs Ganesh sthapana, kalash sthapana, and a sankalp naming you, your gotra and your nakshatra. Mangal is invoked through the Mangal beej mantra, recited in the count prescribed for the strength of the affliction in your chart. Red items sacred to Mars — masoor dal, red cloth, coral, jaggery — are offered and afterwards given in daan. A havan closes the vidhi.

The ritual runs two to three hours and is most effective on a Tuesday, the weekday ruled by Mars, and particularly on Angarak Chaturthi. Where the dosh is severe, the pandit may recommend Kumbh Vivah beforehand — a symbolic marriage that absorbs the first impact of the dosh — followed by the Bhat Pooja. Our pandit will tell you plainly which of these your chart calls for after reading it, and there is no charge for that reading.

Families frequently book this pooja on behalf of a son or daughter. That is entirely correct practice: the sankalp is taken in the name of the person whose chart carries the dosh, and their physical presence is not required. Many parents attend over video call from one city while the pandit performs the vidhi at Mangalnath, with prasad reaching the family's address a few days later.`,
    duration: '2–3 hrs',
    priceFrom: 3100,
    priceTo: 5100,
    temple: 'Mangalnath Mandir',
    bestDay: 'Tuesday · Angarak Chaturthi',
    benefits: [
      'Clears repeated rejection during horoscope matching',
      'Removes obstruction in finalising a marriage proposal',
      'Reduces friction and short temper within the household',
      'Softens the aggressive expression of an afflicted Mars',
      'Supports marital harmony after the wedding as well',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Bhat (cooked rice) offering to Mangal Dev',
      'Mangal beej mantra jaap in the prescribed count',
      'Red items — masoor dal, coral, red cloth — for daan',
      'Havan with purnahuti at Mangalnath',
    ],
    whoShouldDo:
      'Perform Mangal Dosh Bhat Pooja if Mars sits in the 1st, 2nd, 4th, 7th, 8th or 12th house of your horoscope. It is the standard remedy for anyone whose marriage proposals are repeatedly rejected at the kundli-matching stage, whose engagement has broken off more than once, who is already married and experiencing persistent conflict, or who has been told by an astrologer that they are Manglik. Parents booking on behalf of an unmarried son or daughter should send that person\'s birth details — the sankalp is taken in their name.',
    process: [
      'Ganesh sthapana and kalash sthapana at Mangalnath',
      'Sankalp in the name, gotra and nakshatra of the Manglik native',
      'Invocation of Mangal Dev at his janmasthal',
      'Mangal beej mantra jaap in the prescribed count',
      'Preparation and offering of bhat — the cooked rice',
      'Offering of red items sacred to Mars',
      'Daan of masoor dal, coral and red cloth',
      'Havan, purnahuti and aarti',
      'Distribution and dispatch of prasad',
    ],
    faq: [
      {
        q: 'Why is Mangal Dosh pooja performed at Mangalnath in Ujjain?',
        a: 'The Matsya Purana records Ujjain as the birthplace of Mars, and Mangalnath Mandir stands on that site. Pacification of a planet performed at its janmasthal carries the greatest authority, which is why the shastras direct Mangal shanti here.',
      },
      {
        q: 'Should I do Kumbh Vivah as well?',
        a: 'Only where the dosh is severe. Kumbh Vivah is a symbolic marriage that absorbs the first impact of the affliction, after which the Bhat Pooja is performed. Our pandit will read your chart and tell you whether one or both are indicated — the reading is free.',
      },
      {
        q: 'Can my parents book this pooja for me?',
        a: 'Yes, and it is very commonly done that way. The sankalp is taken in the name and gotra of whoever carries the dosh in their chart, so please send that person\'s birth details. Their physical presence at the temple is not required.',
      },
      {
        q: 'I am already married and we argue constantly. Is this still useful?',
        a: 'Yes. Mangal Dosh does not stop affecting a chart after the wedding — it continues to express itself as friction and short temper in the home. The Bhat Pooja is performed for married couples as often as for those still seeking a match.',
      },
    ],
    relatedSlugs: ['kumbh-vivah', 'kaal-sarp-dosh', 'navgrah-shanti', 'mangalnath-pooja'],
    seoTitle: 'Mangal Dosh Bhat Pooja in Ujjain | Mangalnath Mandir | Ujjain Pujan',
    seoDescription:
      'Book Mangal Dosh Bhat Pooja at Mangalnath Mandir Ujjain — the birthplace of Mars. Manglik dosh nivaran by verified pandits. ₹3,100 onwards, complete samagri, live video call.',
    posterKey: 'templeDawnFinal',
  },

  {
    slug: 'pitra-dosh',
    nameEn: 'Pitra Dosh Nivaran',
    nameHi: 'पितृ दोष निवारण पूजा',
    category: 'dosh-nivaran',
    description:
      'Settles ancestral debt and unrest carried down the family line. Performed on the banks of the Shipra at Ram Ghat.',
    fullDescription: `Pitra Dosh is the affliction that arises when the ancestors of a family have not received their due rites. It is read in a horoscope through the affliction of the Sun, of the ninth house, or of Rahu and Ketu in the paternal houses — but it is recognised in daily life long before anyone consults a chart. Families carrying Pitra Dosh describe a pattern that repeats across generations: children are delayed or do not come, wealth accumulates and then disperses, the family home never quite settles, and the same illnesses recur from one generation to the next.

The Vedic understanding is direct. The pitras — the departed of the family line — remain dependent on the living for tarpan and shradh. Where those rites have been omitted, performed incompletely, or interrupted by migration, conversion or the simple passage of time, the ancestors are said to remain unsatisfied, and their unrest expresses itself in the fortunes of their descendants. The remedy is not appeasement but completion: performing properly what was left undone.

Ram Ghat on the Shipra is where this is done in Ujjain. The Shipra is one of the rivers into which tarpan may be offered with full scriptural authority, and Ram Ghat is its principal ghat — the same steps where the Simhastha Kumbh Mela is held. Water offered here reaches the pitras directly, according to the texts.

The vidhi begins with the pandit taking sankalp in your name and gotra, naming the ancestors for whom the rite is being performed. Tarpan follows: water mixed with black sesame, barley and kusha grass is offered to the pitras with the sacred thread worn over the right shoulder, in the manner prescribed for ancestral rites. Pind daan is performed with rice flour balls representing the departed. Brahmin bhojan and daan complete the sequence — feeding and gifting on behalf of the ancestors is not optional in this ritual, it is the mechanism by which the offering is received.

The ceremony takes two to three hours. Amavasya is the ideal day, and the sixteen days of Pitru Paksha are the most auspicious period in the year for it. If you do not know the names of the ancestors for whom the rite should be performed, that is not an obstacle — the shastras provide for offerings made to the line as a whole, and the pandit will use the appropriate formulation.`,
    duration: '2–3 hrs',
    priceFrom: 3100,
    priceTo: 5100,
    temple: 'Ram Ghat, Shipra',
    bestDay: 'Amavasya · Pitru Paksha',
    benefits: [
      'Settles ancestral debt carried down the family line',
      'Relieves delay and difficulty in having children',
      'Steadies wealth that accumulates and then disperses',
      'Breaks recurring illness patterns repeating each generation',
      'Brings peace to a home that has never quite settled',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Tarpan on the banks of the Shipra at Ram Ghat',
      'Pind daan with rice flour pindas',
      'Black sesame, barley and kusha grass offerings',
      'Brahmin bhojan and daan on behalf of the pitras',
    ],
    whoShouldDo:
      'Pitra Dosh Nivaran is for families where the ancestral rites were never performed, were left incomplete, or lapsed across a generation — a very common situation in families that migrated, or where a death occurred far from home. Perform it if your chart shows an afflicted Sun or ninth house, if children are delayed without medical cause, if wealth in the family never holds, if the same illness recurs across generations, or if departed elders appear repeatedly in your dreams. It is also performed as a matter of duty during Pitru Paksha by families with no particular complaint.',
    process: [
      'Sankalp at Ram Ghat naming you, your gotra and your pitras',
      'Sacred thread placed over the right shoulder as prescribed',
      'Tarpan with water, black sesame, barley and kusha grass',
      'Preparation of the pindas from rice flour',
      'Pind daan offered to the ancestors of the line',
      'Offerings released into the Shipra',
      'Brahmin bhojan performed on behalf of the pitras',
      'Daan of cloth, grain and dakshina',
      'Aarti and dispatch of prasad',
    ],
    faq: [
      {
        q: 'I do not know my ancestors\' names. Can the pooja still be done?',
        a: 'Yes. The shastras provide a formulation for offerings made to the family line as a whole rather than to named individuals. The pandit will use it. Knowing the names is helpful but it has never been a requirement.',
      },
      {
        q: 'When is the best time to perform Pitra Dosh Nivaran?',
        a: 'Amavasya of any month is suitable, and the sixteen days of Pitru Paksha are the most auspicious period in the year. Pitru Paksha books out early — please contact us at least two weeks ahead for those dates.',
      },
      {
        q: 'Can this be performed if the death happened many years ago?',
        a: 'Yes. There is no time limit on ancestral rites. Families regularly perform tarpan and pind daan for ancestors who passed two or three generations earlier, and the texts treat such offerings as fully valid.',
      },
      {
        q: 'Does the eldest son have to be present?',
        a: 'Traditionally the eldest son performs the rite, but where he cannot travel the sankalp is taken in his name and the pandit performs it on his behalf. He may attend over live video call. Any descendant of the line may also perform it.',
      },
    ],
    relatedSlugs: ['pind-daan', 'tripindi-shradh', 'narayan-nagbali', 'navgrah-shanti'],
    seoTitle: 'Pitra Dosh Nivaran Pooja in Ujjain | Ram Ghat Shipra | Ujjain Pujan',
    seoDescription:
      'Book Pitra Dosh Nivaran Pooja at Ram Ghat on the Shipra in Ujjain. Tarpan, pind daan and brahmin bhojan by verified pandits. ₹3,100 onwards, live video call available.',
    posterKey: 'ghatsFinal',
  },

  {
    slug: 'navgrah-shanti',
    nameEn: 'Navgrah Shanti Pooja',
    nameHi: 'नवग्रह शांति पूजा',
    category: 'dosh-nivaran',
    description:
      'Pacifies all nine planets together and steadies an afflicted horoscope. Performed at the Navgrah Mandir on the Shipra.',
    fullDescription: `Navgrah Shanti is the comprehensive planetary remedy. Rather than addressing a single affliction, it worships all nine grahas — Surya, Chandra, Mangal, Budh, Guru, Shukra, Shani, Rahu and Ketu — in one continuous vidhi, strengthening those that are weak and pacifying those that are malefic. Where a chart carries several afflictions at once, or where the devotee does not know which planet is responsible for a difficult period, this is the ritual the pandits recommend.

Ujjain's Navgrah Mandir at Triveni, on the confluence where the Shipra meets, is among the very few temples in India dedicated to all nine planets together, each with its own consecrated murti. Ujjain has been the seat of Indian astronomy for two thousand years — the prime meridian of Hindu astronomy passes through the city, and planetary positions have been calculated from here since Varahamihira. Performing planetary shanti in the city from which the planets themselves are reckoned carries a particular authority.

The vidhi opens with Ganesh sthapana and kalash sthapana, followed by sankalp in your name, gotra and nakshatra. The nine planets are then installed on a navgrah yantra and invoked one after another in their prescribed order. Each receives its own beej mantra jaap, its own colour of cloth, its own grain and its own designated offering — wheat and copper for the Sun, rice and silver for the Moon, masoor and coral for Mars, and so on through all nine. Where the pandit's reading of your chart identifies a particular graha as the source of the current difficulty, the jaap count for that planet is raised accordingly.

A havan follows in which nine different samidha woods are offered, one for each planet, and the ritual closes with purnahuti and aarti. The nine grains and metals are then given in daan. The complete vidhi runs three to four hours — longer than most single-planet remedies, because nine separate invocations are performed in full rather than abbreviated.

Navgrah Shanti is most commonly booked at the start of a major dasha or antardasha, before a significant undertaking such as a new business or a move abroad, during Sade Sati, or simply when a period of life has turned difficult in several directions at once and no single cause is apparent. Amavasya and Saturdays are the preferred days. Devotees abroad attend over live video call, with the sankalp taken in their name and prasad couriered afterwards.`,
    duration: '3–4 hrs',
    priceFrom: 3100,
    priceTo: 5500,
    temple: 'Navgrah Mandir, Triveni',
    bestDay: 'Amavasya · Saturday',
    benefits: [
      'Strengthens weak planets and pacifies malefic ones together',
      'Steadies a life disturbed in several directions at once',
      'Supports a difficult dasha, antardasha or Sade Sati period',
      'Clears obstruction before a major undertaking or move',
      'Restores general health, focus and decision-making',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Navgrah yantra sthapana and invocation of all nine planets',
      'Beej mantra jaap for each graha in prescribed counts',
      'Nine grains, nine cloths and nine metals for offering',
      'Navgrah havan with nine samidha woods and purnahuti',
    ],
    whoShouldDo:
      'Navgrah Shanti suits anyone whose horoscope carries more than one planetary affliction, or who cannot identify which planet is causing a difficult phase. It is standard practice before a major life step — a new business, a house purchase, a move abroad, a wedding — and during Sade Sati or a challenging mahadasha. It is also the right choice when several areas of life have turned unstable at the same time: health, money and relationships together. If you are unsure, send your birth details and our pandit will confirm which remedy your chart actually calls for.',
    process: [
      'Ganesh sthapana and kalash sthapana at Navgrah Mandir',
      'Sankalp in your name, gotra and nakshatra',
      'Navgrah yantra sthapana',
      'Invocation of the nine planets in prescribed order',
      'Beej mantra jaap for each graha, weighted to your chart',
      'Offering of the nine grains, cloths and metals',
      'Navgrah havan with nine samidha woods',
      'Purnahuti, aarti and daan of the nine grains',
      'Prasad distribution and dispatch',
    ],
    faq: [
      {
        q: 'How is this different from a single-planet remedy?',
        a: 'A single-planet pooja such as Mangal or Shani shanti addresses one graha. Navgrah Shanti invokes all nine in one vidhi, strengthening the weak and pacifying the malefic. It is the right choice when several afflictions are present or when the cause of a difficult period is unclear.',
      },
      {
        q: 'Do I need my kundli to book this?',
        a: 'Not strictly — Navgrah Shanti is valid as a general remedy. But sending your birth details lets the pandit weight the jaap counts toward the planets actually troubling your chart, which makes the ritual considerably more targeted. The chart reading is free.',
      },
      {
        q: 'Will this help during Sade Sati?',
        a: 'Yes. Navgrah Shanti includes full Shani invocation and jaap, and is one of the standard remedies for Sade Sati and Shani dhaiya. Where Saturn is the dominant affliction the pandit will raise the Shani jaap count and may add a separate Shani shanti.',
      },
      {
        q: 'Why perform planetary rituals in Ujjain?',
        a: 'The prime meridian of Hindu astronomy passes through Ujjain, and planetary positions have been calculated from this city since Varahamihira. The Navgrah Mandir at Triveni is one of very few temples in India with consecrated murtis of all nine grahas together.',
      },
    ],
    relatedSlugs: ['kaal-sarp-dosh', 'mangal-dosh', 'mahamrityunjay-jaap', 'rudrabhishek'],
    seoTitle: 'Navgrah Shanti Pooja in Ujjain | Navgrah Mandir Triveni | Ujjain Pujan',
    seoDescription:
      'Book Navgrah Shanti Pooja at Navgrah Mandir Ujjain. All nine planets pacified in one vidhi by verified pandits. ₹3,100 onwards, complete samagri, live video call for NRIs.',
    posterKey: 'samagriFinal',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ABHISHEK & JAAP
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'rudrabhishek',
    nameEn: 'Rudrabhishek',
    nameHi: 'रुद्राभिषेक',
    category: 'abhishek-jaap',
    description:
      'The ceremonial bathing of the Shivling with panchamrit while the Rudram is recited. The heart of Shiva worship at Mahakaleshwar.',
    fullDescription: `Rudrabhishek is the abhishek of Shiva in his Rudra form — the ceremonial bathing of the Shivling with a prescribed succession of sacred substances while the Rudram is chanted. It is the most direct and most frequently performed act of Shiva worship in the Vedic tradition, and at Mahakaleshwar in Ujjain it is performed at one of the twelve Jyotirlingas.

The Shri Rudram, drawn from the Yajurveda, is among the oldest continuously recited hymns in the world. Its Namakam and Chamakam sections address Rudra by name and then ask of him — and the abhishek is timed to that recitation, each substance poured as the verses proceed. The panchamrit consists of milk, curd, ghee, honey and sugar, each carrying its own scriptural association: milk for purity of mind, curd for prosperity, ghee for the strength to complete what is begun, honey for sweetness of speech, sugar for contentment. Water from the Shipra, gangajal, sandalwood paste, bhasma and bilva leaves follow.

Mahakaleshwar occupies a particular place among the Jyotirlingas. It is the only one that is swayambhu — self-manifested rather than installed — and the only one that faces south. The Bhasma Aarti performed here at dawn, with ash offered to the lingam, is unique in the whole of India. Abhishek at this shrine is understood to reach Mahakal, the lord of time himself.

The vidhi opens with Ganesh sthapana and kalash sthapana. Sankalp is taken in your name, gotra and nakshatra. Then follows the abhishek proper, each substance poured in sequence as the Rudram is recited, with the number of recitations determined by the package — a single Rudri for the standard vidhi, eleven for a Laghu Rudra. Bilva patra, dhatura and white flowers are offered, and the ritual closes with havan, purnahuti and aarti.

Rudrabhishek runs two to three hours. Mondays are the classical day, Pradosh and Shivratri the most auspicious tithis, and the month of Sawan the most powerful period in the year — Sawan Mondays at Mahakaleshwar book out weeks in advance. Devotees perform it for health, for relief from an afflicted Shani or Chandra, before beginning anything of consequence, on birthdays and anniversaries, or as a standing act of devotion. It is the ritual most often booked by returning devotees, year after year.`,
    duration: '2–3 hrs',
    priceFrom: 2100,
    priceTo: 5100,
    temple: 'Mahakaleshwar Temple',
    bestDay: 'Monday · Pradosh · Shivratri · Sawan',
    benefits: [
      'Improves health and physical vitality',
      'Relieves the pressure of an afflicted Shani or Chandra',
      'Clears obstruction before a major undertaking',
      'Brings mental calm and steadiness of purpose',
      'Recommended for general wellbeing and family peace',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Panchamrit abhishek — milk, curd, ghee, honey, sugar',
      'Shri Rudram recitation during the abhishek',
      'Bilva patra, dhatura and white flower offerings',
      'Gangajal and Shipra jal · bhasma · chandan',
    ],
    whoShouldDo:
      'Rudrabhishek is performed for health and vitality, for relief from an afflicted Saturn or Moon, before any significant undertaking, and as a standing act of devotion. It is appropriate for anyone — there is no dosh or chart condition required. Devotees commonly book it on birthdays, wedding anniversaries, before a surgery or examination, at the start of a business, or on Sawan Mondays as an annual observance. It is also the ritual most often performed on behalf of an unwell family member.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp in your name, gotra and nakshatra',
      'Shivling shringar and preparation of the abhishek',
      'Panchamrit abhishek — milk, curd, ghee, honey, sugar in sequence',
      'Shipra jal and gangajal abhishek',
      'Shri Rudram recited through Namakam and Chamakam',
      'Bilva patra, dhatura and white flower offerings',
      'Bhasma and chandan applied to the lingam',
      'Havan, purnahuti and aarti',
    ],
    faq: [
      {
        q: 'What is the difference between Rudrabhishek and Laghu Rudra?',
        a: 'The difference is the number of Rudram recitations. A standard Rudrabhishek uses one Rudri; Laghu Rudra uses eleven, performed by multiple pandits, and takes four to six hours. Laghu Rudra is chosen where the need is more serious.',
      },
      {
        q: 'When is the best day for Rudrabhishek?',
        a: 'Mondays are the classical day. Pradosh tithi and Mahashivratri are the most auspicious, and the whole month of Sawan is the most powerful period in the year. Sawan Mondays at Mahakaleshwar fill up weeks ahead — book early for those.',
      },
      {
        q: 'Can Rudrabhishek be performed for someone who is unwell?',
        a: 'Yes, and it is one of the most common reasons devotees book it. The sankalp is taken in the name and gotra of the person who is unwell, whether or not they are able to attend. Family members frequently arrange it on their behalf.',
      },
      {
        q: 'Do I need to be present at the temple?',
        a: 'No. You may attend over live video call and watch the full abhishek. The sankalp is recited in your name and gotra exactly as it would be in person, and the prasad and bhasma are couriered to your address afterwards.',
      },
    ],
    relatedSlugs: ['laghu-rudra', 'mahamrityunjay-jaap', 'kaal-sarp-dosh', 'navgrah-shanti'],
    seoTitle: 'Rudrabhishek Pooja in Ujjain | Mahakaleshwar Jyotirlinga | Ujjain Pujan',
    seoDescription:
      'Book Rudrabhishek at Mahakaleshwar Jyotirlinga in Ujjain. Panchamrit abhishek with Shri Rudram by verified pandits. ₹2,100 onwards, complete samagri, live video call.',
    posterKey: 'templeDawnFinal',
  },

  {
    slug: 'mahamrityunjay-jaap',
    nameEn: 'Mahamrityunjay Jaap',
    nameHi: 'महामृत्युंजय जाप',
    category: 'abhishek-jaap',
    description:
      'The great death-conquering mantra, recited 125,000 times for healing, protection and long life.',
    fullDescription: `The Mahamrityunjay mantra — tryambakam yajamahe sugandhim pushtivardhanam — is drawn from the Rigveda and is the mantra the tradition turns to when life itself is under threat. It asks Shiva, the three-eyed one, to release the reciter from death as a ripe cucumber is released from its stem: not by force, but by the natural completion of a bond. It is recited for the critically ill, for those recovering from serious accident or surgery, and for protection during a period when the chart indicates danger.

The full anushthan is 125,000 repetitions — a sava lakh jaap. This is not something one pandit completes alone. A team recites in shifts over several days, maintaining continuity so that the count is unbroken, and for every thousand repetitions a proportional number of ahutis is offered in the closing havan. Shorter observances are also performed: 11,000 repetitions over a single day, or 51,000 over three, depending on the need and the devotee's circumstances.

Mahakaleshwar is the place for it. Mahakal is the lord of time and therefore of death, and the Jyotirlinga here is swayambhu and dakshinamukhi — self-manifested and south-facing, toward the direction of Yama. The Mahamrityunjay mantra recited before this particular lingam is understood by the tradition to carry an authority available nowhere else.

The anushthan begins with Ganesh sthapana, kalash sthapana and a sankalp naming the person for whom protection is sought — very often not the person booking, but a parent, a child or a spouse who is unwell. Rudrabhishek is performed over the lingam. The jaap then proceeds under the pandits' recitation until the prescribed count is reached, and a havan follows in which ahutis are offered at one-tenth the jaap count, closing with purnahuti and aarti. A consecrated Mahamrityunjay yantra is given to the devotee to keep.

Duration depends on the count — one day for 11,000, three for 51,000, and up to seven for the full 125,000. Mondays, Pradosh, Shivratri and the month of Sawan are the preferred times, though for genuine medical urgency the anushthan is begun immediately without waiting for an auspicious date. Families abroad book this for relatives in hospital in India and attend the purnahuti over video call; the yantra and prasad are couriered internationally.`,
    duration: '1–7 days',
    priceFrom: 5100,
    priceTo: 21000,
    temple: 'Mahakaleshwar Temple',
    bestDay: 'Monday · Pradosh · Shivratri · Sawan',
    benefits: [
      'Recited for recovery from serious illness or surgery',
      'Protection during a period of danger indicated in the chart',
      'Supports longevity and physical resilience',
      'Relieves persistent fear, anxiety and disturbed sleep',
      'Performed on behalf of a critically ill family member',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Mahamrityunjay jaap in the chosen count — 11,000 / 51,000 / 125,000',
      'Rudrabhishek over the Mahakaleshwar Shivling',
      'Havan with ahutis at one-tenth the jaap count',
      'Consecrated Mahamrityunjay yantra for the devotee to keep',
    ],
    whoShouldDo:
      'Mahamrityunjay Jaap is performed for anyone facing a serious threat to health or life — a critical illness, a major surgery, recovery from an accident, or a chart showing a mrityu yoga or a dangerous transit. It is also observed for general longevity and protection, particularly for elderly parents and for children with fragile health. Families most often book it on behalf of someone else: the sankalp is taken in the name and gotra of the person needing protection, who need not be present or even aware of it.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp in the name and gotra of the person needing protection',
      'Rudrabhishek over the Mahakaleshwar Shivling',
      'Mahamrityunjay jaap begun by the pandit team',
      'Recitation maintained in unbroken shifts until the count completes',
      'Havan with ahutis at one-tenth the jaap count',
      'Purnahuti and aarti',
      'Consecration of the Mahamrityunjay yantra',
      'Yantra and prasad dispatched to the devotee',
    ],
    faq: [
      {
        q: 'How many repetitions should I choose?',
        a: 'For general protection and wellbeing, 11,000 over a single day is sufficient. For serious illness or a difficult transit, 51,000 over three days is usual. The full 125,000 — sava lakh — is reserved for critical situations and takes up to seven days with a team of pandits.',
      },
      {
        q: 'Can this be performed for a relative who is in hospital?',
        a: 'Yes, and this is the most common reason it is booked. The sankalp is taken in the name and gotra of the person who is unwell. They do not need to be present or even aware that it is being performed. Families abroad regularly arrange this for relatives in India.',
      },
      {
        q: 'Do I have to wait for an auspicious date?',
        a: 'Ordinarily Mondays, Pradosh, Shivratri and the month of Sawan are preferred. But where there is genuine medical urgency the anushthan is begun immediately — the tradition does not require a sick person to wait for a tithi.',
      },
      {
        q: 'What happens to the yantra afterwards?',
        a: 'The consecrated Mahamrityunjay yantra is couriered to you along with the prasad. Keep it in your pooja place or carry it with you. Our pandit will explain how to maintain it on WhatsApp once it reaches you.',
      },
    ],
    relatedSlugs: ['rudrabhishek', 'laghu-rudra', 'navgrah-shanti', 'kaal-sarp-dosh'],
    seoTitle: 'Mahamrityunjay Jaap in Ujjain | 1.25 Lakh Anushthan | Ujjain Pujan',
    seoDescription:
      'Book Mahamrityunjay Jaap at Mahakaleshwar Ujjain — 11,000 to 1,25,000 repetitions for health, protection and longevity. Verified pandits, ₹5,100 onwards, live video call.',
    posterKey: 'samagriFinal',
  },

  {
    slug: 'laghu-rudra',
    nameEn: 'Laghu Rudra',
    nameHi: 'लघु रुद्र',
    category: 'abhishek-jaap',
    description:
      'Eleven Rudri recitations by a team of pandits — the intensified form of Rudrabhishek.',
    fullDescription: `Laghu Rudra is Rudrabhishek performed at eleven times the intensity. Where a standard abhishek uses a single Rudri — one complete recitation of the Shri Rudram through its Namakam and Chamakam — Laghu Rudra uses eleven, recited by a team of pandits with the abhishek continuing throughout. The tradition holds a ladder here: one Rudri is Rudrabhishek, eleven make a Laghu Rudra, eleven Laghu Rudras make a Maha Rudra, and eleven Maha Rudras an Ati Rudra. Laghu Rudra is the rung most devotees reach for when the standard vidhi does not feel proportionate to what they are facing.

At Mahakaleshwar the ritual is performed before the swayambhu Jyotirlinga, the self-manifested and south-facing lingam that makes this shrine distinct among the twelve. Eleven pandits — or a smaller team reciting in rotation — maintain the Rudram continuously while the abhishek proceeds: panchamrit of milk, curd, ghee, honey and sugar, then Shipra jal, gangajal, sandalwood paste, bhasma and a continuous offering of bilva patra. The sound of eleven simultaneous recitations in the sanctum is, for most devotees, the part of the ceremony they remember.

The vidhi opens as all Shiva rituals do, with Ganesh sthapana, kalash sthapana and a sankalp naming you, your gotra and your nakshatra. Navgrah sthapana follows, since Laghu Rudra is frequently performed for planetary relief as well as devotional purpose. The eleven Rudri recitations then proceed with the abhishek. A havan closes the ritual, with ahutis offered in proportion to the recitations, followed by purnahuti and aarti.

Laghu Rudra runs four to six hours and requires more advance notice than most poojas, because a team of pandits has to be assembled for a single continuous sitting. Four to five days' notice is usually enough; during Sawan, longer.

Devotees choose Laghu Rudra for serious illness in the family, for a business or property matter that has resisted every ordinary remedy, during a severe Sade Sati, for house or temple consecration, and as a vow fulfilled after a difficult period has passed. It is also performed annually by families who have made it a tradition — most often during Sawan, on Mahashivratri, or on a Monday falling on Pradosh.`,
    duration: '4–6 hrs',
    priceFrom: 5100,
    priceTo: 11000,
    temple: 'Mahakaleshwar Temple',
    bestDay: 'Sawan · Mahashivratri · Pradosh Monday',
    benefits: [
      'Eleven-fold intensification of the standard Rudrabhishek',
      'Chosen for serious illness or prolonged family difficulty',
      'Relief during a severe Sade Sati or malefic mahadasha',
      'Performed for house, business or temple consecration',
      'Fulfilment of a vow after a difficult period has passed',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Eleven Rudri recitations by a team of pandits',
      'Continuous panchamrit and jal abhishek throughout',
      'Navgrah sthapana and invocation',
      'Havan with proportional ahutis and purnahuti',
    ],
    whoShouldDo:
      'Laghu Rudra is for situations where a standard Rudrabhishek does not feel proportionate — serious illness in the family, a business or property matter that has resisted every ordinary remedy, a severe Sade Sati, or a prolonged period of difficulty affecting the whole household. It is also performed for the consecration of a new house, factory or temple, and as the fulfilment of a vow made during a hard time. Some families observe it annually during Sawan as a standing tradition rather than for any specific need.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp in your name, gotra and nakshatra',
      'Navgrah sthapana and invocation',
      'Shivling shringar and preparation of the abhishek',
      'Eleven Rudri recitations begun by the pandit team',
      'Continuous panchamrit, Shipra jal and gangajal abhishek',
      'Bilva patra, bhasma and chandan offerings throughout',
      'Havan with ahutis in proportion to the recitations',
      'Purnahuti, aarti and prasad dispatch',
    ],
    faq: [
      {
        q: 'How much notice do you need for a Laghu Rudra?',
        a: 'Four to five days ordinarily, because a team of pandits must be assembled for a single continuous sitting. During Sawan and around Mahashivratri, please allow one to two weeks — pandit availability is the binding constraint at those times.',
      },
      {
        q: 'Is Laghu Rudra worth the difference over Rudrabhishek?',
        a: 'It depends entirely on the need. For routine devotion, health and general wellbeing, Rudrabhishek is complete in itself. Laghu Rudra is chosen for serious or prolonged difficulty. Our pandit will tell you honestly which your situation calls for.',
      },
      {
        q: 'How many pandits perform the ritual?',
        a: 'Ideally eleven, one per Rudri, reciting simultaneously. Where eleven are not available a smaller team recites in rotation until all eleven Rudris are complete. Either arrangement satisfies the requirement of the vidhi.',
      },
      {
        q: 'Can I attend a Laghu Rudra over video call?',
        a: 'Yes. Because the ritual runs four to six hours, most remote devotees join for the sankalp at the start and again for the havan and purnahuti at the close. We will share the timings in advance so you can plan around them.',
      },
    ],
    relatedSlugs: ['rudrabhishek', 'mahamrityunjay-jaap', 'navgrah-shanti', 'griha-pravesh'],
    seoTitle: 'Laghu Rudra Pooja in Ujjain | Mahakaleshwar | Ujjain Pujan',
    seoDescription:
      'Book Laghu Rudra at Mahakaleshwar Ujjain — eleven Rudri recitations by a team of verified pandits. ₹5,100 onwards, complete samagri, havan and live video call option.',
    posterKey: 'templeDawnFinal',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PIND DAAN & SHRADH
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'pind-daan',
    nameEn: 'Pind Daan',
    nameHi: 'पिंड दान',
    category: 'pind-daan-shradh',
    description:
      'The offering of pindas to the departed, performed on the banks of the Shipra at Ram Ghat.',
    fullDescription: `Pind daan is the rite by which the living sustain the departed. Balls of rice flour mixed with black sesame, ghee, honey and barley — the pindas — are prepared, consecrated with mantra, offered to the named ancestors, and released into flowing water. In the Vedic understanding a soul that has left the body requires these offerings to complete its passage and to be received among the pitras; without them it is described as remaining unsettled, and that unrest is felt by the descendants.

Ujjain holds a specific authority for this rite. The Shipra is one of the sacred rivers into which pind daan may be offered with full scriptural sanction, and Ram Ghat is its principal ghat — the same steps on which the Simhastha Kumbh Mela is held once every twelve years. Ujjain is also one of the four cities where drops of amrit fell during the churning of the ocean. Offerings made in this water are held by the texts to reach the pitras directly.

The rite is performed by a descendant of the line, traditionally the eldest son, though where he cannot travel the sankalp is taken in his name and the pandit performs it on his behalf. The pandit takes sankalp naming you, your gotra and the departed for whom the offering is made. The sacred thread is placed over the right shoulder in the manner prescribed for ancestral rites. Tarpan follows — water with black sesame, barley and kusha grass. The pindas are then prepared, consecrated, and offered one by one to the named ancestors, and finally released into the Shipra. Brahmin bhojan and daan complete the sequence.

The whole ceremony runs two to three hours. Amavasya is the classical day, and Pitru Paksha — the sixteen-day fortnight in Bhadrapada — is the most auspicious period in the year, when the pitras are said to descend to receive what is offered. Pind daan is also performed on the annual tithi of a death, and on the eleventh, twelfth or thirteenth day following one.

There is no time limit on this rite. Families regularly perform pind daan for ancestors who died decades earlier, or for a line whose rites lapsed entirely across a generation of migration. If names are not known, the shastras provide a formulation addressed to the line as a whole, and the pandit will use it.`,
    duration: '2–3 hrs',
    priceFrom: 3100,
    priceTo: 5100,
    temple: 'Ram Ghat, Shipra',
    bestDay: 'Amavasya · Pitru Paksha · death tithi',
    benefits: [
      'Completes the passage of a departed soul among the pitras',
      'Settles ancestral unrest felt by the living descendants',
      'Fulfils the son\'s duty where rites were never performed',
      'Performed for ancestors whose rites lapsed generations ago',
      'Observed annually on the tithi of a death',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Pindas prepared from rice flour, til, ghee, honey and barley',
      'Tarpan with black sesame, barley and kusha grass',
      'Offering and release of the pindas into the Shipra',
      'Brahmin bhojan and daan on behalf of the departed',
    ],
    whoShouldDo:
      'Pind daan is performed by a descendant of the family line for a departed parent, grandparent or ancestor — most often the eldest son, though any descendant may perform it and daughters do so as well. It is required where the rites were never performed, were interrupted, or lapsed across a generation. It is also observed annually on the tithi of a death, during Pitru Paksha as a matter of duty, and following the eleventh, twelfth or thirteenth day after a death.',
    process: [
      'Sankalp at Ram Ghat naming you, your gotra and the departed',
      'Sacred thread placed over the right shoulder',
      'Tarpan with water, black sesame, barley and kusha grass',
      'Preparation of the pindas from rice flour and til',
      'Consecration of the pindas with mantra',
      'Offering of each pinda to the named ancestors',
      'Release of the pindas into the Shipra',
      'Brahmin bhojan and daan of cloth, grain and dakshina',
      'Aarti and dispatch of prasad',
    ],
    faq: [
      {
        q: 'Can a daughter perform pind daan?',
        a: 'Yes. Tradition names the eldest son first, but the shastras permit any descendant of the line to perform the rite, and daughters do so regularly — particularly where there is no son or where he is unable to travel.',
      },
      {
        q: 'My father died twenty years ago and nothing was done. Is it too late?',
        a: 'No. There is no time limit on pind daan. Families perform it for ancestors who died decades earlier, and for whole lines whose rites lapsed during migration. The offering is treated as fully valid whenever it is finally made.',
      },
      {
        q: 'What is the difference between pind daan and shradh?',
        a: 'Pind daan is the specific act of offering the rice-flour pindas. Shradh is the broader ceremony that contains it, including tarpan, brahmin bhojan and daan. In practice most bookings include both, and our Pind Daan package covers the full sequence.',
      },
      {
        q: 'Can this be arranged from abroad?',
        a: 'Yes. A large share of our pind daan bookings come from NRI families. The sankalp is taken in your name and gotra, you may attend by live video call from Ram Ghat, and prasad is couriered internationally afterwards.',
      },
    ],
    relatedSlugs: ['tripindi-shradh', 'pitra-dosh', 'narayan-nagbali', 'navgrah-shanti'],
    seoTitle: 'Pind Daan in Ujjain | Ram Ghat Shipra River | Ujjain Pujan',
    seoDescription:
      'Book Pind Daan at Ram Ghat on the Shipra river in Ujjain. Tarpan, pinda offering and brahmin bhojan by verified pandits. ₹3,100 onwards, live video call for NRI families.',
    posterKey: 'ghatsFinal',
  },

  {
    slug: 'tripindi-shradh',
    nameEn: 'Tripindi Shradh',
    nameHi: 'त्रिपिंडी श्राद्ध',
    category: 'pind-daan-shradh',
    description:
      'The three-generation shradh for ancestors whose rites were never performed. Offered at Ram Ghat.',
    fullDescription: `Tripindi Shradh is the rite performed for ancestors who have gone three generations or more without receiving their shradh. The name means the shradh of three pindas, and it addresses the three classes of unsettled departed the shastras identify: those who died an untimely or unnatural death, those whose rites were never performed at all, and those whose offerings were made incompletely or with lapses. Where an ordinary shradh serves ancestors already receiving their annual rites, Tripindi is the remedy for a line where the chain broke.

It is the ritual most often prescribed for families showing persistent Pitra Dosh — children delayed without medical cause, wealth that never holds, the same illness recurring across generations, a house that never settles, or repeated appearances of departed elders in dreams. Where an astrologer identifies Pitra Dosh in a chart and the family knows that the ancestral rites lapsed at some point, Tripindi Shradh is the correct and complete response.

Three pindas are offered, one to each of the three classes, in the names of Brahma, Vishnu and Shiva who preside over them. The vidhi begins with sankalp at Ram Ghat naming you, your gotra and the ancestral line. The sacred thread is worn over the right shoulder as ancestral rites require. Tarpan follows with water, black sesame, barley and kusha grass. The three pindas are then prepared and consecrated separately, offered with their respective mantras, and released into the Shipra. Brahmin bhojan and daan of cloth, grain and dakshina complete the ritual — these are not optional additions but the means by which the offering is transmitted.

The ceremony runs three to four hours, longer than a standard pind daan because three complete offerings are made rather than one. Amavasya is suitable, Pitru Paksha is the most auspicious period, and Trayodashi tithi is also traditionally used. Where the affliction is severe, the pandit may advise performing it on three successive years.

Tripindi Shradh is performed once for a family line rather than annually. Once the three classes have received their offering, the family returns to ordinary annual shradh and Pitru Paksha tarpan. Many of our bookings come from families settled abroad who have realised, often on the advice of an astrologer, that nobody in the line has performed these rites for two or three generations.`,
    duration: '3–4 hrs',
    priceFrom: 3100,
    priceTo: 7100,
    temple: 'Ram Ghat, Shipra',
    bestDay: 'Amavasya · Trayodashi · Pitru Paksha',
    benefits: [
      'Completes rites for ancestors neglected across three generations',
      'The prescribed remedy for persistent, diagnosed Pitra Dosh',
      'Addresses untimely deaths and rites left incomplete',
      'Relieves delayed childbirth and recurring family illness',
      'Performed once — it restores the line, it is not annual',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Three pindas offered to the three classes of departed',
      'Invocation of Brahma, Vishnu and Shiva as presiding deities',
      'Tarpan with til, barley and kusha grass at Ram Ghat',
      'Brahmin bhojan and daan of cloth, grain and dakshina',
    ],
    whoShouldDo:
      'Tripindi Shradh is for families whose ancestral rites lapsed three generations ago or more, and for those where an astrologer has diagnosed Pitra Dosh in the chart. It is specifically indicated where there has been an untimely or unnatural death in the line — accident, suicide, a death away from home — or where the last rites were performed incompletely. Families showing delayed childbirth, recurring illness across generations, unstable wealth, or repeated dreams of departed elders are the ones most often advised toward it.',
    process: [
      'Sankalp at Ram Ghat naming you, your gotra and the ancestral line',
      'Sacred thread placed over the right shoulder',
      'Tarpan with water, black sesame, barley and kusha grass',
      'Invocation of Brahma, Vishnu and Shiva as presiding deities',
      'Preparation of the three pindas',
      'First pinda offered for those who died untimely deaths',
      'Second pinda offered for those whose rites were never performed',
      'Third pinda offered for rites performed incompletely',
      'Release into the Shipra, brahmin bhojan, daan and aarti',
    ],
    faq: [
      {
        q: 'How is Tripindi Shradh different from ordinary shradh?',
        a: 'Ordinary shradh is the annual rite for ancestors already receiving offerings. Tripindi is performed where the chain broke — three generations or more without rites. It offers three separate pindas to the three classes of unsettled departed, and is performed once rather than annually.',
      },
      {
        q: 'How often does Tripindi Shradh need to be performed?',
        a: 'Once for the family line is ordinarily sufficient. After it, the family returns to normal annual shradh and Pitru Paksha tarpan. Where the affliction is severe the pandit may advise repeating it on three successive years.',
      },
      {
        q: 'There was a suicide in our family. Is this the right ritual?',
        a: 'Yes. Untimely and unnatural deaths are the first of the three classes Tripindi Shradh specifically addresses. It is the rite the shastras prescribe for exactly that situation, and families come to Ujjain for it for that reason.',
      },
      {
        q: 'Nobody in our family has done any rites for generations. Where do we start?',
        a: 'Tripindi Shradh is where you start — it is designed for precisely that situation. Send us what you know of the family line on WhatsApp; the pandit will advise, and missing names are not an obstacle since the rite can address the line as a whole.',
      },
    ],
    relatedSlugs: ['pind-daan', 'pitra-dosh', 'narayan-nagbali', 'satyanarayan-katha'],
    seoTitle: 'Tripindi Shradh in Ujjain | Ram Ghat Shipra | Ujjain Pujan',
    seoDescription:
      'Book Tripindi Shradh at Ram Ghat Ujjain for ancestors neglected across three generations. The prescribed Pitra Dosh remedy. ₹3,100 onwards, verified pandits, video call.',
    posterKey: 'ghatsFinal',
  },

  {
    slug: 'narayan-nagbali',
    nameEn: 'Narayan Nagbali',
    nameHi: 'नारायण नागबली',
    category: 'pind-daan-shradh',
    description:
      'A three-day rite combining ancestral liberation with atonement for the killing of a serpent.',
    fullDescription: `Narayan Nagbali is two distinct rituals performed together over three days. Narayan Bali is the rite for a soul that departed by unnatural means — accident, suicide, drowning, fire, or a death whose body was never recovered — for whom ordinary last rites could not be completed and who therefore has not been received among the pitras. Nagbali is the atonement for the killing of a serpent, particularly a cobra, an act the shastras treat as carrying consequences down the family line. The two are performed together because the afflictions they address so often appear in the same family.

The rite is prescribed where a family shows a pattern that ordinary remedies have not touched: no male child across a generation, repeated miscarriage, chronic illness that resists diagnosis, mental disturbance without cause, wealth that persistently drains, or recurring dreams of serpents alongside dreams of the departed. Where an astrologer finds both Pitra Dosh and Kaal Sarp Dosh in a chart, Narayan Nagbali is frequently what they prescribe.

The Shipra in Ujjain is one of the authorised locations. The rite unfolds across three days and cannot be compressed. On the first day the pandit takes sankalp, and a symbolic body of darbha grass is prepared for the departed and cremated in the manner of a full antyeshti — the funeral that was never completed. On the second day Narayan Bali proper is performed: pind daan and tarpan, with the soul invoked and offered its passage. On the third day Nagbali is performed — a serpent figure of wheat flour is made, worshipped, and cremated with full rites, and a nag pratima in silver or panchdhatu is given in daan. A havan closes the sequence with purnahuti.

Because the ritual runs three consecutive days, it needs planning. We ask for a week's notice, more during Pitru Paksha and Nag Panchami when both pandit availability and ghat access are stretched. Amavasya and the days of Pitru Paksha are the preferred start dates.

This is among the more demanding rituals we arrange, and it is not one to book casually. Send your family's circumstances to our pandit on WhatsApp first. If your situation calls for a simpler Tripindi Shradh or Pitra Dosh Nivaran instead, that is what we will tell you.`,
    duration: '3 days',
    priceFrom: 11000,
    priceTo: 21000,
    temple: 'Shipra River, Ujjain',
    bestDay: 'Amavasya · Pitru Paksha',
    benefits: [
      'Liberates a soul that departed by unnatural means',
      'Atones for the killing of a serpent in the family line',
      'Prescribed where both Pitra and Kaal Sarp Dosh appear',
      'Addresses childlessness and repeated miscarriage',
      'Relieves chronic undiagnosed illness across a family',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Three-day vidhi performed on the banks of the Shipra',
      'Symbolic antyeshti with a darbha grass body',
      'Narayan Bali — pind daan and tarpan for the departed',
      'Nagbali — serpent figure rites and silver nag pratima daan',
    ],
    whoShouldDo:
      'Narayan Nagbali is prescribed where a family carries both ancestral affliction and serpent debt. Perform it if there has been an unnatural death in the line — accident, suicide, drowning, fire, or a body never recovered — or if a serpent was killed by someone in the family. It is indicated where there is no male child across a generation, repeated miscarriage, chronic illness that resists diagnosis, persistent financial drain, or dreams of both serpents and departed elders. Please speak to our pandit before booking; this is a demanding rite and a simpler one may serve.',
    process: [
      'Day 1 — Sankalp and preparation of the darbha grass body',
      'Day 1 — Symbolic antyeshti, the funeral never completed',
      'Day 2 — Narayan Bali: invocation of the departed soul',
      'Day 2 — Pind daan and tarpan on the banks of the Shipra',
      'Day 3 — Nagbali: preparation of the wheat flour serpent figure',
      'Day 3 — Worship and cremation of the serpent figure with full rites',
      'Day 3 — Daan of the silver or panchdhatu nag pratima',
      'Havan with purnahuti',
      'Aarti, prasad distribution and dispatch',
    ],
    faq: [
      {
        q: 'Can the three days be shortened?',
        a: 'No. The sequence is a symbolic cremation, then Narayan Bali, then Nagbali, and each must be performed on its own day in order. Any pandit offering to compress it into one day is not performing the rite the shastras describe.',
      },
      {
        q: 'Must I be present for all three days?',
        a: 'It is far better if you are, since the yajman participates directly at several points. Where that is impossible the pandit performs it on your behalf with the sankalp in your name, and you attend the key moments of each day over video call.',
      },
      {
        q: 'How is this different from Tripindi Shradh?',
        a: 'Tripindi addresses ancestors neglected across three generations. Narayan Nagbali addresses two specific things: a soul that departed by unnatural means, and the killing of a serpent. Where both afflictions are present, Narayan Nagbali is the more complete remedy.',
      },
      {
        q: 'How much notice do you need?',
        a: 'About a week ordinarily. During Pitru Paksha and around Nag Panchami please allow two weeks or more — both pandit availability and access to the ghats are stretched at those times.',
      },
    ],
    relatedSlugs: ['tripindi-shradh', 'pind-daan', 'kaal-sarp-dosh', 'pitra-dosh'],
    seoTitle: 'Narayan Nagbali Pooja in Ujjain | 3-Day Vidhi on the Shipra | Ujjain Pujan',
    seoDescription:
      'Book Narayan Nagbali in Ujjain — a three-day rite for unnatural death and serpent dosh on the banks of the Shipra. Verified pandits, ₹11,000 onwards, complete samagri.',
    posterKey: 'ghatsFinal',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // VIVAH
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'kumbh-vivah',
    nameEn: 'Kumbh Vivah',
    nameHi: 'कुम्भ विवाह',
    category: 'vivah',
    description:
      'A symbolic marriage that absorbs the first impact of a severe Manglik dosh before the real wedding.',
    fullDescription: `Kumbh Vivah is the symbolic marriage performed before a real one where the horoscope carries a severe Mangal Dosh. The reasoning behind it is specific. Classical astrology holds that in a strongly Manglik chart the first marriage carries the concentrated force of the affliction, which is understood to fall on the spouse. A symbolic marriage is therefore performed first — to a kumbh, a clay or copper pot, and in some traditions to a peepal tree or a Vishnu murti. That union receives the first impact. The subsequent human marriage becomes, in the reckoning of the shastras, the second, and the dosh is substantially neutralised.

The ritual has been performed in India for centuries and is prescribed where Mars occupies the 7th or 8th house with particular strength, where the dosh is unrelieved by any cancelling factor in the chart, or where an astrologer has warned specifically about the wellbeing of a future spouse. It is performed for both men and women, though it is more commonly arranged for daughters.

Mangalnath Mandir in Ujjain is the natural place for it. The Matsya Purana records Ujjain as the birthplace of Mars, and Mangalnath stands on the site — the same authority that makes the city the prescribed location for Mangal Dosh Bhat Pooja.

The vidhi follows the form of an actual wedding. Ganesh sthapana and kalash sthapana open it, then a sankalp naming the native, their gotra and nakshatra. The kumbh is consecrated and installed as the symbolic groom or bride. Mangal Dev is invoked. The marriage rites are then performed in full — varmala, the seven pheras, and the recitation of the vivah mantras — followed by visarjan of the kumbh in the Shipra, which formally dissolves the symbolic union and leaves the native free to marry. A havan closes the ceremony.

It runs two to three hours and is performed on a Tuesday or on Angarak Chaturthi, the days ruled by Mars. Most families arrange it a few weeks before the actual wedding, and many combine it with the Mangal Dosh Bhat Pooja on the same visit, which is what the pandits generally recommend where the dosh is severe. The person whose chart carries the dosh should ideally be present, though where they cannot travel the rite is performed with the sankalp in their name and attended over video call.`,
    duration: '2–3 hrs',
    priceFrom: 5100,
    priceTo: 11000,
    temple: 'Mangalnath Mandir',
    bestDay: 'Tuesday · Angarak Chaturthi',
    benefits: [
      'Absorbs the first impact of a severe Manglik dosh',
      'Protects the wellbeing of the future spouse',
      'Clears repeated rejection at the kundli-matching stage',
      'Frees a stalled marriage negotiation to proceed',
      'Performed for both men and women',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Consecrated kumbh installed as symbolic bride or groom',
      'Full vivah vidhi — varmala, seven pheras, vivah mantras',
      'Mangal Dev invocation at his janmasthal',
      'Kumbh visarjan in the Shipra and closing havan',
    ],
    whoShouldDo:
      'Kumbh Vivah is for anyone whose horoscope carries a severe Mangal Dosh, particularly where Mars sits strongly in the 7th or 8th house with no cancelling factor in the chart. It is prescribed where an astrologer has specifically warned about harm to a future spouse, where marriage proposals are repeatedly rejected after kundli matching, or where an engagement has broken more than once. Families most often arrange it for an unmarried daughter or son a few weeks before a wedding is finalised. Send the birth details and our pandit will confirm whether the chart actually requires it.',
    process: [
      'Ganesh sthapana and kalash sthapana at Mangalnath',
      'Sankalp in the name, gotra and nakshatra of the native',
      'Invocation of Mangal Dev at his janmasthal',
      'Consecration and installation of the kumbh',
      'Varmala — the exchange of garlands',
      'Seven pheras performed around the sacred fire',
      'Recitation of the vivah mantras in full',
      'Visarjan of the kumbh in the Shipra',
      'Havan, purnahuti and aarti',
    ],
    faq: [
      {
        q: 'Does Kumbh Vivah count as a real marriage?',
        a: 'No. It has no legal standing and creates no social or religious bond. The kumbh is consecrated, married and then formally dissolved by visarjan in the Shipra at the close of the same ceremony. The native is entirely free to marry afterwards.',
      },
      {
        q: 'Should Kumbh Vivah or Bhat Pooja be performed first?',
        a: 'Where the dosh is severe, Kumbh Vivah is performed first to absorb the initial impact, and the Mangal Dosh Bhat Pooja follows to pacify the planet. Many families arrange both on the same visit, which is what our pandits generally recommend.',
      },
      {
        q: 'Is this performed for men as well?',
        a: 'Yes. Mangal Dosh affects both charts equally and Kumbh Vivah is performed for men and women alike, though in practice it is more often arranged for daughters. The vidhi differs only in whether the kumbh stands as symbolic bride or groom.',
      },
      {
        q: 'How long before the wedding should it be done?',
        a: 'A few weeks is comfortable. It must be performed before the actual wedding for the reasoning to hold, and on a Tuesday or Angarak Chaturthi. Once your wedding date is fixed, message us and we will find the right day before it.',
      },
    ],
    relatedSlugs: ['mangal-dosh', 'mangalnath-pooja', 'navgrah-shanti', 'satyanarayan-katha'],
    seoTitle: 'Kumbh Vivah in Ujjain | Manglik Dosh Remedy at Mangalnath | Ujjain Pujan',
    seoDescription:
      'Book Kumbh Vivah at Mangalnath Mandir Ujjain — the symbolic marriage for severe Manglik dosh. Full vivah vidhi by verified pandits. ₹5,100 onwards, complete samagri.',
    posterKey: 'samagriFinal',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // GENERAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    slug: 'satyanarayan-katha',
    nameEn: 'Satyanarayan Katha',
    nameHi: 'सत्यनारायण कथा',
    category: 'general',
    description:
      'The auspicious Vishnu katha performed for thanksgiving, new beginnings and family wellbeing.',
    fullDescription: `The Satyanarayan Katha is the most widely performed household ritual in India, and the reason is its simplicity: it asks nothing of the devotee's chart, requires no dosh to justify it, and is appropriate at any moment a family wishes to give thanks or begin something new. It is performed for a new house, a new business, a wedding, a birth, a promotion, a recovery from illness, the fulfilment of a vow, or on a Purnima with no occasion at all beyond the wish to observe it.

The katha itself comes from the Skanda Purana and consists of five chapters, each a story illustrating what follows from keeping or breaking a vow made to Satyanarayan — the form of Vishnu who is truth. A poor brahmin who observes the vrat and prospers. A woodcutter. A merchant who forgets his promise and loses everything, then restores his fortunes by remembering it. The stories are plain, and they are meant to be: the katha is recited aloud for the whole family to hear, children included, and its lessons are deliberately within everyone's reach.

The vidhi opens with Ganesh sthapana and kalash sthapana, followed by sankalp in your name, gotra and nakshatra. Satyanarayan is invoked and worshipped with the sixteen upacharas. The five chapters are then recited in full. The prasad is central to this ritual and is prepared during the ceremony itself — sheera or panjiri made of wheat flour, ghee, sugar and banana, offered to the deity and afterwards distributed to everyone present. Aarti and the closing of the vrat complete it.

The ritual runs two to three hours. Purnima is the classical day, particularly Kartik Purnima and Vaishakh Purnima, and Sankranti is also traditional. Where a family is marking a specific event — a house purchase, a wedding, a birth — the katha is performed on a date convenient to them rather than waiting for a tithi.

In Ujjain the katha carries the added merit of being performed in one of the seven moksha-puri cities. Devotees abroad book it regularly for occasions in their own lives: a child's admission, a new job, a house bought in another country. The sankalp is taken in their name and gotra, they attend over live video call, and the sheera prasad is couriered to their address.`,
    duration: '2–3 hrs',
    priceFrom: 2100,
    priceTo: 3100,
    temple: 'Ujjain · temple or venue of choice',
    bestDay: 'Purnima · Kartik Purnima · Sankranti',
    benefits: [
      'Performed for any new beginning — house, business, job',
      'Thanksgiving after a wish fulfilled or a vow kept',
      'Brings peace, harmony and prosperity to the household',
      'Suitable for weddings, births and family milestones',
      'Requires no dosh or chart condition — open to everyone',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Full recitation of all five chapters of the katha',
      'Shodashopachar pooja of Satyanarayan',
      'Sheera / panjiri prasad prepared during the ceremony',
      'Aarti and formal closing of the vrat',
    ],
    whoShouldDo:
      'Anyone may perform the Satyanarayan Katha — it requires no dosh, no chart reading and no particular qualification. Families perform it when moving into a new house, starting a business, after a wedding or a birth, on receiving a promotion or a visa, following recovery from illness, or in fulfilment of a vow. Many observe it every Purnima as a standing family practice. It is the ritual we most often recommend to devotees who want to begin something well but have no specific affliction to remedy.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp in your name, gotra and nakshatra',
      'Invocation of Satyanarayan',
      'Shodashopachar pooja — the sixteen offerings',
      'Recitation of the five chapters of the katha',
      'Preparation of the sheera prasad during the ceremony',
      'Offering of the prasad to the deity',
      'Aarti and formal closing of the vrat',
      'Distribution and dispatch of prasad',
    ],
    faq: [
      {
        q: 'Do I need a reason to perform Satyanarayan Katha?',
        a: 'No. It is performed for new beginnings and thanksgiving, but equally as a standing observance on Purnima with no particular occasion. Unlike dosh nivaran rituals it requires no chart reading and no qualifying condition.',
      },
      {
        q: 'When is the best day for it?',
        a: 'Purnima is classical, and Kartik and Vaishakh Purnima carry the greatest merit. Sankranti is also traditional. Where the katha marks a specific event — a house purchase, a wedding — it is performed on a date convenient to the family instead.',
      },
      {
        q: 'Can it be performed at my house rather than a temple?',
        a: 'Yes, and it traditionally is a household ritual. If you are in Ujjain, our pandit will come to your home with the full samagri. For devotees elsewhere we perform it at a temple in Ujjain with the sankalp in your name.',
      },
      {
        q: 'What happens to the prasad if I am not in Ujjain?',
        a: 'The sheera prasad is prepared during the ceremony and offered to the deity as the vidhi requires. A portion is then couriered to your address — within India and internationally. Most devotees receive it within a week.',
      },
    ],
    relatedSlugs: ['griha-pravesh', 'sunderkand-path', 'vastu-shanti', 'rudrabhishek'],
    seoTitle: 'Satyanarayan Katha in Ujjain | Book Online | Ujjain Pujan',
    seoDescription:
      'Book Satyanarayan Katha in Ujjain with verified pandits. Full five-chapter recitation, sheera prasad, complete samagri. ₹2,100 onwards, live video call, prasad delivered.',
    posterKey: 'samagriFinal',
  },

  {
    slug: 'vastu-shanti',
    nameEn: 'Vastu Shanti',
    nameHi: 'वास्तु शांति',
    category: 'general',
    description:
      'Pacifies vastu defects in a home, office or factory and settles the energy of the building.',
    fullDescription: `Vastu Shanti is the ritual that settles a building. Vastu Shastra treats a structure as a living body with a presiding spirit — the Vastu Purush — and holds that defects in orientation, proportion or placement disturb that body and, through it, the people who live or work inside. Vastu Shanti pacifies the Vastu Purush and the directional deities, and is performed both as a remedy for an existing problem and as a matter of course before occupying a new building.

Families come to it with a recognisable set of complaints. A house where arguments start without cause. A business that never becomes profitable despite adequate custom. Sleep that does not come in a particular room. Health that declines after a move. Money that flows out faster than any accounting explains. Where structural correction is impossible — a rented flat, a completed building, a plot whose orientation cannot change — Vastu Shanti is the remedy the shastras offer in its place.

The vidhi opens with Ganesh sthapana and kalash sthapana, then a sankalp naming you, your gotra and the property itself. The Vastu Purush is invoked and installed on a vastu mandala, and the directional deities — the dikpalas of the eight directions — are worshipped in turn. Navgrah sthapana follows, since planetary and directional influences are treated together. A havan is then performed with offerings made toward each of the directions, with additional ahutis directed at whichever quarter the pandit identifies as defective. Purnahuti and aarti close it. A consecrated vastu yantra is installed in the building to hold the effect.

The ceremony runs three to four hours. It is performed on an auspicious muhurat determined by the pandit — for a new building, on or just before the day of occupation, which is why Vastu Shanti and Griha Pravesh are so often booked together and performed on the same morning.

For properties within Ujjain our pandit comes to the site with all samagri. For properties elsewhere in India or abroad — and this is a large share of our bookings — the ritual is performed at a temple in Ujjain with sankalp in your name and the address of the property recited in full, and the consecrated vastu yantra is couriered to you with instructions on where in the building to place it.`,
    duration: '3–4 hrs',
    priceFrom: 3100,
    priceTo: 5100,
    temple: 'Ujjain · at site or temple',
    bestDay: 'Auspicious muhurat · with Griha Pravesh',
    benefits: [
      'Pacifies vastu defects that cannot be structurally corrected',
      'Settles a home where arguments start without cause',
      'Supports a business that has never turned profitable',
      'Relieves disturbed sleep and declining health after a move',
      'Performed before occupying any new house, office or factory',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Vastu Purush invocation on a consecrated vastu mandala',
      'Worship of the dikpalas of all eight directions',
      'Navgrah sthapana and havan with directional ahutis',
      'Consecrated vastu yantra installed in the building',
    ],
    whoShouldDo:
      'Vastu Shanti is performed before occupying any new house, office, shop or factory, and as a remedy in an existing building showing vastu-related difficulty. It is indicated where a household argues without apparent cause, where health declined after moving in, where sleep is disturbed in a particular room, where a business has never become profitable despite adequate custom, or where money leaves faster than the accounts explain. It is the standard recourse where the defect is structural and correction is impossible — a rented flat, a finished building, a fixed plot orientation.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp naming you, your gotra and the property',
      'Preparation and consecration of the vastu mandala',
      'Invocation and installation of the Vastu Purush',
      'Worship of the dikpalas of the eight directions',
      'Navgrah sthapana and invocation',
      'Havan with ahutis offered toward each direction',
      'Additional ahutis directed at the defective quarter',
      'Purnahuti, aarti and installation of the vastu yantra',
    ],
    faq: [
      {
        q: 'My flat is rented and I cannot change anything structurally. Will this help?',
        a: 'That is precisely the situation Vastu Shanti is meant for. Where structural correction is impossible, the shastras prescribe pacification of the Vastu Purush and the directional deities instead, with a consecrated yantra installed to hold the effect.',
      },
      {
        q: 'My property is abroad. Can the pooja still be performed?',
        a: 'Yes, and a large share of our Vastu Shanti bookings are for properties outside India. The ritual is performed at a temple in Ujjain with the sankalp in your name and the full property address recited. The vastu yantra is couriered to you with placement instructions.',
      },
      {
        q: 'Should I do Vastu Shanti or Griha Pravesh?',
        a: 'They serve different purposes and are usually done together. Vastu Shanti pacifies defects in the building; Griha Pravesh is the formal entry ceremony. For a new home most families book both and we perform them on the same morning.',
      },
      {
        q: 'Do you provide a vastu consultation as well?',
        a: 'Yes. Share your floor plan on WhatsApp and our pandit will identify the defective directions before the ritual, so the havan ahutis can be weighted toward the quarter that actually needs them. The consultation is free.',
      },
    ],
    relatedSlugs: ['griha-pravesh', 'satyanarayan-katha', 'navgrah-shanti', 'sunderkand-path'],
    seoTitle: 'Vastu Shanti Pooja in Ujjain | Home, Office & Factory | Ujjain Pujan',
    seoDescription:
      'Book Vastu Shanti Pooja in Ujjain with verified pandits. Vastu Purush invocation, dikpala worship, havan and consecrated yantra. ₹3,100 onwards, free floor-plan consultation.',
    posterKey: 'samagriFinal',
  },

  {
    slug: 'sunderkand-path',
    nameEn: 'Sunderkand Path',
    nameHi: 'सुंदरकांड पाठ',
    category: 'general',
    description:
      'The complete recitation of the Sunderkand for courage, protection and removal of obstacles.',
    fullDescription: `The Sunderkand is the fifth book of Tulsidas's Ramcharitmanas and the only one in which Hanuman is the central figure throughout. It narrates his leap across the ocean to Lanka, his search for Sita, his meeting with her in the Ashok Vatika, the burning of the city, and his return with news. Among all sections of the Ramcharitmanas it is the one recited most often as a standalone path, and the reason given by the tradition is that it is the only kand in which everything undertaken succeeds.

That is the character of the recitation. Devotees turn to it when facing something that feels beyond their capacity — a court case, an examination, a hostile situation at work, a journey undertaken with anxiety, a period of fear or persistent negative thought. Hanuman is invoked as the remover of obstacles and the giver of courage, and the Sunderkand is his book. It is also the standard remedy prescribed for an afflicted Shani, since Hanuman is held to be the one before whom Saturn withdraws.

The path is a complete recitation from beginning to end without interruption, performed by pandits in the traditional chanting style with the dohas and chaupais rendered in full. The vidhi opens with Ganesh sthapana and kalash sthapana, then a sankalp in your name, gotra and nakshatra. Hanuman is invoked and worshipped with sindoor, chola and a garland of betel leaves. The recitation then proceeds through the entire Sunderkand. Hanuman Chalisa follows, then aarti, and the ritual closes with the offering and distribution of boondi and gud-chana prasad.

The recitation runs two to three hours. Tuesday and Saturday are the classical days, Hanuman Jayanti the most auspicious, and many families observe it every Tuesday of a difficult period rather than once. Some perform it for forty-one consecutive days as an anushthan when the difficulty is serious.

It is among the least expensive rituals we arrange and among the most frequently booked, which is a fair reflection of how the tradition regards it: available to anyone, requiring no chart and no dosh, appropriate at any time. Devotees abroad join over live video call and receive the boondi prasad by courier.`,
    duration: '2–3 hrs',
    priceFrom: 2100,
    priceTo: 3100,
    temple: 'Ujjain · Hanuman temple or venue of choice',
    bestDay: 'Tuesday · Saturday · Hanuman Jayanti',
    benefits: [
      'Gives courage before a court case, exam or hostile situation',
      'The standard remedy for an afflicted Shani',
      'Relieves persistent fear and negative thought',
      'Protection during travel and periods of uncertainty',
      'Removes obstruction in work that has stalled',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Complete Sunderkand recitation in traditional chanting style',
      'Hanuman pooja with sindoor, chola and betel-leaf garland',
      'Hanuman Chalisa and aarti',
      'Boondi and gud-chana prasad',
    ],
    whoShouldDo:
      'Sunderkand Path suits anyone facing something that feels beyond their own strength — a court case, an examination, a hostile workplace, a journey undertaken with anxiety, or a stretch of persistent fear and negative thought. It is the standard remedy prescribed for an afflicted Saturn and during Sade Sati. It requires no chart reading and no qualifying dosh. Many families observe it every Tuesday through a difficult period, and some undertake a forty-one-day anushthan where the difficulty is serious.',
    process: [
      'Ganesh sthapana and kalash sthapana',
      'Sankalp in your name, gotra and nakshatra',
      'Invocation of Hanuman',
      'Sindoor and chola offered to the murti',
      'Garland of betel leaves offered',
      'Complete recitation of the Sunderkand',
      'Hanuman Chalisa recited',
      'Aarti and offering of boondi and gud-chana',
      'Distribution and dispatch of prasad',
    ],
    faq: [
      {
        q: 'Why is Sunderkand recited rather than the whole Ramcharitmanas?',
        a: 'Sunderkand is the only kand in which every undertaking succeeds — Hanuman crosses the ocean, finds Sita, burns Lanka and returns. The tradition treats it as the section of the text that carries accomplishment, which is why it is recited on its own.',
      },
      {
        q: 'Will this help during Sade Sati?',
        a: 'Yes. Hanuman is held to be the deity before whom Saturn withdraws, and Sunderkand Path is among the standard remedies for an afflicted Shani. Many devotees observe it every Saturday through the Sade Sati period.',
      },
      {
        q: 'Should I do it once or repeatedly?',
        a: 'Once is complete in itself. For an ongoing difficulty many families observe it every Tuesday until the situation resolves, and where the difficulty is serious a forty-one-day anushthan is traditional. Our pandit will suggest what fits your circumstances.',
      },
      {
        q: 'Can it be performed at my home?',
        a: 'Yes. Within Ujjain our pandit will come to your home with the full samagri. For devotees elsewhere the path is recited at a Hanuman temple in Ujjain with the sankalp in your name, and you may join over live video call.',
      },
    ],
    relatedSlugs: ['satyanarayan-katha', 'navgrah-shanti', 'rudrabhishek', 'griha-pravesh'],
    seoTitle: 'Sunderkand Path in Ujjain | Book Online | Ujjain Pujan',
    seoDescription:
      'Book Sunderkand Path in Ujjain with verified pandits. Complete recitation, Hanuman pooja, Chalisa and aarti. ₹2,100 onwards, live video call, boondi prasad delivered.',
    posterKey: 'templeDawnFinal',
  },

  {
    slug: 'griha-pravesh',
    nameEn: 'Griha Pravesh',
    nameHi: 'गृह प्रवेश',
    category: 'general',
    description:
      'The formal entry ceremony for a new home — performed on an auspicious muhurat before you move in.',
    fullDescription: `Griha Pravesh is the ceremony by which a family enters a new home for the first time. The shastras treat this as a threshold that should not be crossed casually: a house is not merely occupied but formally entered, on a determined muhurat, with the household fire kindled and the presiding deities invited to take residence alongside the family. The rite is performed before any belongings are moved in and before the first night is spent there.

The tradition recognises three forms. Apoorva Griha Pravesh is the entry into a newly constructed house. Sapoorva is re-entry after a period of absence — a family returning from abroad, or from a long posting elsewhere. Dwandwah is entry into a house being reoccupied after repair or renovation. The core of the vidhi is the same in each; the sankalp differs.

The muhurat matters more here than in almost any other household ritual. The pandit determines it from the family's charts and the panchang, avoiding the inauspicious months and the periods when Guru or Shukra are combust. Devotees frequently ask us for a date first and book the ceremony afterwards — we are glad to provide it, and there is no charge for the muhurat calculation.

The ceremony begins outside the threshold. Ganesh pooja and kalash sthapana are performed, and a sankalp is taken naming the family, their gotra and the property. The threshold is then crossed for the first time, right foot leading, with the kalash carried in. A cow, where one can be arranged, is led in ahead of the family — the traditional first entry. Vastu Purush is invoked and the directional deities worshipped. Navgrah sthapana follows, then the havan, in which the household fire is formally kindled. Milk is boiled in the new kitchen until it overflows, the sign of abundance entering the house. Purnahuti, aarti and brahmin bhojan close the ceremony.

It runs two to three hours. Most families book Vastu Shanti alongside it and we perform both on the same morning — Vastu Shanti to settle the building, Griha Pravesh to enter it — which is the sequence the pandits recommend.

For homes within Ujjain our pandit comes to the property with all samagri. For homes elsewhere the ritual is performed at a temple in Ujjain with the property address recited in the sankalp, and the consecrated kalash and prasad are couriered to you.`,
    duration: '2–3 hrs',
    priceFrom: 3100,
    priceTo: 5100,
    temple: 'Ujjain · at the property or temple',
    bestDay: 'Auspicious muhurat · with Vastu Shanti',
    benefits: [
      'Formally establishes the household in a new home',
      'Invites the presiding deities to take residence with the family',
      'Kindles the household fire on an auspicious muhurat',
      'Performed for new build, re-entry, or after renovation',
      'Usually combined with Vastu Shanti on the same morning',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Muhurat determined from your charts and the panchang',
      'Threshold entry rites with the consecrated kalash',
      'Vastu Purush invocation and dikpala worship',
      'Havan, milk-boiling ceremony and brahmin bhojan',
    ],
    whoShouldDo:
      'Griha Pravesh is performed by any family entering a new home for the first time — before belongings are moved in and before the first night is spent there. It is equally prescribed for re-entry after a long absence, such as a family returning from abroad, and for reoccupying a house after major renovation. Families buying property in Ujjain book it directly; families buying elsewhere in India or abroad book it performed on their behalf here, with the property address recited in the sankalp.',
    process: [
      'Muhurat determined from the family charts and panchang',
      'Ganesh pooja and kalash sthapana outside the threshold',
      'Sankalp naming the family, gotra and property',
      'First crossing of the threshold, right foot leading',
      'Vastu Purush invocation and dikpala worship',
      'Navgrah sthapana and invocation',
      'Havan — the household fire formally kindled',
      'Milk boiled in the new kitchen until it overflows',
      'Purnahuti, aarti and brahmin bhojan',
    ],
    faq: [
      {
        q: 'Can you give me an auspicious date for Griha Pravesh?',
        a: 'Yes, and there is no charge for it. Send your family\'s birth details and the property details on WhatsApp and our pandit will calculate the muhurat from the panchang, avoiding the inauspicious months and the periods when Guru or Shukra are combust.',
      },
      {
        q: 'We are moving back into a house after renovation. Is Griha Pravesh needed?',
        a: 'Yes — that form is called Dwandwah Griha Pravesh and the shastras prescribe it for reoccupying a house after major repair. The vidhi is the same as for a new house; only the sankalp differs.',
      },
      {
        q: 'Should Vastu Shanti be done as well?',
        a: 'It is strongly recommended and most families book both. Vastu Shanti settles the building and pacifies its defects; Griha Pravesh formally enters it. We perform them on the same morning, Vastu Shanti first.',
      },
      {
        q: 'Our new house is in another city. Can this be arranged?',
        a: 'Yes. The ritual is performed at a temple in Ujjain with the full property address recited in the sankalp, and you join over live video call. The consecrated kalash and prasad are then couriered to your new address.',
      },
    ],
    relatedSlugs: ['vastu-shanti', 'satyanarayan-katha', 'sunderkand-path', 'navgrah-shanti'],
    seoTitle: 'Griha Pravesh Pooja in Ujjain | Muhurat & Vidhi | Ujjain Pujan',
    seoDescription:
      'Book Griha Pravesh Pooja in Ujjain with verified pandits. Free muhurat calculation, threshold rites, havan and complete samagri. ₹3,100 onwards, live video call option.',
    posterKey: 'samagriFinal',
  },

  {
    slug: 'mangalnath-pooja',
    nameEn: 'Mangalnath Temple Pooja',
    nameHi: 'मंगलनाथ मंदिर पूजा',
    category: 'general',
    description:
      'A short abhishek and archana at Mangalnath Mandir, the birthplace of Mars — the accessible Mangal remedy.',
    fullDescription: `Mangalnath Mandir stands on the site the Matsya Purana names as the birthplace of Mars. Ujjain is the janmasthal of the planet, and this temple marks it. That makes any offering here a Mangal remedy by location alone, and it is why the temple sees a steady stream of devotees who have been told their chart carries a Mangal affliction — whether or not it is severe enough to warrant the full Bhat Pooja.

This is the shorter observance at that temple: a Mangal abhishek and archana running one to two hours rather than the two to three of the full Bhat Pooja. It exists for a practical reason. Not every Mangal affliction is severe. Many devotees have Mars placed awkwardly but not destructively, and what they need is regular observance rather than an intensive one-time remedy. Others have already performed the Bhat Pooja and want to maintain the effect with an annual or periodic offering. And some simply wish to make an offering at Mangalnath while in Ujjain without committing to a longer ceremony.

The vidhi opens with Ganesh pooja and a sankalp in your name, gotra and nakshatra. Mangal Dev is invoked at his janmasthal. Abhishek follows with panchamrit — milk, curd, ghee, honey and sugar — then with water. Red items sacred to Mars are offered: sindoor, red cloth, red flowers, masoor dal and jaggery. Mangal beej mantra jaap is performed in a shorter count than the full pooja requires. Archana, aarti and the offering of prasad close it.

The observance takes one to two hours. Tuesday is the day — Mangalnath is busiest on Tuesdays for exactly that reason — and Angarak Chaturthi is the most auspicious tithi in the cycle.

At ₹2,100 this is the most accessible ritual we offer, and it is deliberately priced that way. If your chart carries a serious Manglik dosh our pandit will tell you plainly that the Bhat Pooja is what you need, and will not sell you this instead. But for periodic Mangal observance, for maintaining an earlier remedy, or for an offering made at the birthplace of Mars while visiting Ujjain, this is the appropriate rite. Devotees abroad book it as a recurring monthly or annual observance and join over video call.`,
    duration: '1–2 hrs',
    priceFrom: 2100,
    temple: 'Mangalnath Mandir',
    bestDay: 'Tuesday · Angarak Chaturthi',
    benefits: [
      'A Mangal remedy by virtue of the location itself',
      'Suits a mild Mars affliction not needing the full Bhat Pooja',
      'Maintains the effect of an earlier Mangal Dosh remedy',
      'Reduces short temper, friction and accident-proneness',
      'The most accessible ritual we offer — ₹2,100',
    ],
    includes: [
      ...BASE_INCLUDES,
      'Panchamrit and jal abhishek of Mangal Dev',
      'Offering of sindoor, red cloth, red flowers and masoor dal',
      'Mangal beej mantra jaap in short count',
      'Archana, aarti and prasad',
    ],
    whoShouldDo:
      'Mangalnath Temple Pooja suits devotees with a mild Mars affliction that does not warrant the full Bhat Pooja, those maintaining the effect of a Mangal remedy performed earlier, and anyone wishing to make an offering at the birthplace of Mars while visiting Ujjain. It is also booked as a recurring monthly or annual observance, particularly by devotees abroad. If your chart carries a severe Manglik dosh, our pandit will tell you directly that the Bhat Pooja is the right remedy instead.',
    process: [
      'Ganesh pooja at Mangalnath Mandir',
      'Sankalp in your name, gotra and nakshatra',
      'Invocation of Mangal Dev at his janmasthal',
      'Panchamrit abhishek — milk, curd, ghee, honey, sugar',
      'Jal abhishek',
      'Offering of sindoor, red cloth and red flowers',
      'Offering of masoor dal and jaggery',
      'Mangal beej mantra jaap in short count',
      'Archana, aarti and prasad dispatch',
    ],
    faq: [
      {
        q: 'How is this different from Mangal Dosh Bhat Pooja?',
        a: 'The Bhat Pooja is the full remedy for a diagnosed Manglik dosh — it includes the bhat rice offering, a long jaap count, red-item daan and havan, and runs two to three hours. This is a shorter abhishek and archana for mild affliction or periodic observance.',
      },
      {
        q: 'Which one do I actually need?',
        a: 'Send your birth details on WhatsApp and our pandit will read the chart and tell you. If the dosh is severe he will say so and recommend the Bhat Pooja. The reading costs nothing and there is no obligation to book either.',
      },
      {
        q: 'Why is Mangalnath significant for Mars?',
        a: 'The Matsya Purana records Ujjain as the birthplace of Mars, and Mangalnath Mandir stands on that site. Pacification of a planet performed at its janmasthal carries the greatest scriptural authority, which is why Mangal remedies are directed here.',
      },
      {
        q: 'Can I book this as a regular monthly observance?',
        a: 'Yes, and many devotees do — particularly those abroad who maintain a standing Tuesday or Angarak Chaturthi offering. Message us on WhatsApp and we will set up a recurring booking and send you the video call link each time.',
      },
    ],
    relatedSlugs: ['mangal-dosh', 'kumbh-vivah', 'navgrah-shanti', 'rudrabhishek'],
    seoTitle: 'Mangalnath Temple Pooja in Ujjain | Birthplace of Mars | Ujjain Pujan',
    seoDescription:
      'Book Mangalnath Temple Pooja in Ujjain at the birthplace of Mars. Mangal abhishek, archana and beej mantra jaap. ₹2,100, verified pandits, live video call available.',
    posterKey: 'templeDawnFinal',
  },
]

// ── lookups ────────────────────────────────────────────────────────────────
export const POOJA_SLUGS = POOJAS.map((p) => p.slug)

export function getPooja(slug: string): Pooja | undefined {
  return POOJAS.find((p) => p.slug === slug)
}

export function getRelated(pooja: Pooja): Pooja[] {
  return pooja.relatedSlugs
    .map((slug) => POOJAS.find((p) => p.slug === slug))
    .filter((p): p is Pooja => Boolean(p))
}

export function formatPrice(from: number, to?: number): string {
  const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`
  return to ? `${inr(from)} – ${inr(to)}` : `${inr(from)} onwards`
}

/** Every real category with its poojas — the grouping the navbar's "Pooja
 *  Booking" dropdown and its mobile-sheet equivalent both render from, so
 *  the two never drift out of sync with each other. */
export const POOJA_GROUPS = CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
  id: c.id,
  label: c.label,
  items: POOJAS.filter((p) => p.category === c.id),
}))
