# CLAUDE CODE BUILD PROMPT — "UJJAIN SEVA" (3-VIDEO VERSION)
### Pooja Booking Platform · Pandit Network · Ujjain, MP
### Next.js (SSG for SEO) · GSAP · Framer Motion · Lenis · 3 videos + poster frames
### Copy everything below the line into Claude Code.

---

Build me a modern, clean, scroll-animated website for a pooja booking platform called **UJJAIN SEVA** (उज्जैन सेवा). This is a real business that connects devotees with verified pandits in Ujjain for traditional Vedic poojas. It must rank on Google, convert via WhatsApp, and look like a premium agency build — not the typical cluttered pandit-ji WordPress site.

**If a `frontend-design` skill or equivalent is available, read and apply it before writing any component code.**

---

## 0. MY ASSETS — THIS IS ALL I HAVE

Three sacred-atmosphere video files + four custom font families. **No stock photos, no icons.** Every visual comes from these 3 videos, their extracted poster frames, or CSS/SVG. Do not invent asset references I don't have.

```
public/videos/
  ujjain-temple-dawn.mp4      → THE AWAKENING (hero — temple emerges from mist at sunrise)
  ujjain-shipra-ghats.mp4     → THE GHATS (camera descends stone steps to Shipra river)
  ujjain-pooja-samagri.mp4    → THE SAMAGRI (close-up pull-back of pooja items)
```

> **I only have 3 videos, not 6.** Design every section to work with these 3 videos plus their extracted poster frames. Some sections will use poster frames as static background images — that's fine. The site should NOT feel empty or repetitive. The 3 video moments are the "wow" beats; the remaining sections are strong typographic/content sections that carry themselves.

Create `src/lib/assets.ts`:

```ts
export const VIDEOS = {
  templeDawn: '/videos/optimized/ujjain-temple-dawn.mp4',
  ghats:      '/videos/optimized/ujjain-shipra-ghats.mp4',
  samagri:    '/videos/optimized/ujjain-pooja-samagri.mp4',
} as const

export const POSTERS = {
  templeDawn:      '/posters/ujjain-temple-dawn.webp',       // temple in mist (frame 0)
  templeDawnFinal: '/posters/ujjain-temple-dawn-final.webp',  // temple revealed in golden light (last frame)
  ghats:           '/posters/ujjain-shipra-ghats.webp',
  ghatsFinal:      '/posters/ujjain-shipra-ghats-final.webp', // water's edge
  samagri:         '/posters/ujjain-pooja-samagri.webp',       // kalash close-up
  samagriFinal:    '/posters/ujjain-pooja-samagri-final.webp', // full spread revealed
} as const
```

### Custom fonts

```
public/fonts/
  Catilya-Regular.woff2    → Hero display ("UJJAIN SEVA", pull-quotes)
  Quorele-Regular.woff2    → Section headings, pooja names
  Graven-Regular.woff2     → Labels, prices, kickers, uppercase tracked
  Conra-Regular.woff2      → Body text, descriptions, nav
```

Load `Tiro Devanagari Hindi` from Google Fonts for Hindi text:
```css
--font-hindi: 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif;
```

Font roles: Catilya = hero/brand display · Quorele = section headings · Graven = labels/prices/kickers · Conra = body/UI · Tiro Devanagari Hindi = all Hindi text.

### Video prep script

Write `scripts/prep-videos.sh` using ffmpeg. For each of the 3 source files:
1. Re-encode with dense keyframes (`-g 15 -keyint_min 15 -sc_threshold 0`)
2. Strip audio (`-an`), cap at 1080p, ~4 Mbps H.264 with `-movflags +faststart`
3. Emit WebM/VP9 variant
4. Extract poster frames:
   - **Frame 0** (initial state) as `{name}.webp`
   - **Last frame** (final state) as `{name}-final.webp`
   - This gives me **6 poster images** from 3 videos — these are my only static images for background sections
5. Generate OG image from `temple-dawn-final.webp` (temple in golden light) at 1200×630

Output to `public/videos/optimized/` and `public/posters/`. Print before/after sizes.

---

## 1. TECH STACK

```bash
npx create-next-app@latest ujjain-seva --typescript --tailwind --eslint --app --src-dir
cd ujjain-seva
npm install gsap @gsap/react motion lenis
npm install -D prettier prettier-plugin-tailwindcss
```

- **Next.js (App Router)** with `output: 'export'` for static generation. Homepage = scroll experience. Each pooja gets its own static page for SEO.
- **GSAP** with ScrollTrigger for scroll-scrubbed video + pinning.
- **Framer Motion** (`motion` package, import from `motion/react`) for UI micro-interactions.
- **Lenis** for smooth scroll synced with GSAP:
  ```ts
  const lenis = new Lenis()
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  ```
- **Tailwind CSS v4** — `@theme {}` tokens, no `tailwind.config.js`.
- Deploy: Vercel. `npm run build` must be clean, zero TS errors.

---

## 2. SCROLL-SCRUBBED VIDEO COMPONENT

Build **one reusable `<ScrollVideo>` component**, used 3 times. Same GSAP ScrollTrigger approach:

```ts
ScrollTrigger.create({
  trigger: outerRef.current,
  start: "top top",
  end: "bottom bottom",
  scrub: true,
  onUpdate: (self) => {
    if (videoRef.current && isFinite(videoRef.current.duration)) {
      videoRef.current.currentTime = self.progress * videoRef.current.duration
    }
  }
})
```

Critical guards: wait for `loadedmetadata`, guard `NaN`/`Infinity` duration, set `playsInline muted preload="auto"`, never call `.play()`, `rAF` throttle. Expose `scrollProgress` to children via context/render prop.

Mobile fallback: below `md`, degrade to autoplay muted loop with the same overlay. Detect via `matchMedia`.

If scroll-scrub is janky after ffmpeg prep, **stop and tell me**.

---

## 3. SECTION-BY-SECTION SPEC (HOMEPAGE)

### Layout overview — 3 videos, 10 sections:

```
A.  Preloader
B.  Navigation (fixed)
C.  HERO — Temple Dawn ← scroll-scrub video ①
D.  Trust Bar
E.  WHY UJJAIN — Ghats ← scroll-scrub video ②
F.  POOJA CATEGORIES ← content grid, no video
G.  THE SACRED PREPARATION — Samagri ← scroll-scrub video ③
H.  HOW IT WORKS ← typographic, poster frame bg
I.  OUR PANDITS ← typographic, no video
J.  TESTIMONIALS ← typographic, poster frame bg
K.  FAQ ← typographic, SEO
L.  BOOKING CTA ← poster frame bg
M.  Footer
```

---

### A. PRELOADER
Percentage counter in Catilya, "ॐ" pulsing at 5% opacity behind it. Cream `#FAF5EB` background. Tie progress to video metadata + `document.fonts.ready`. On complete: scale up + blur away. Under 1.5s.

---

### B. NAVIGATION (fixed, minimal)
- Transparent over hero → cream background after scroll (use GSAP ScrollTrigger to toggle class at hero end).
- Left: **"उज्जैन सेवा"** in `--font-hindi`, saffron. Next to it: **"UJJAIN SEVA"** in Graven tracked, smaller, muted.
- Right: `POOJAS · HOW IT WORKS · PANDITS · CONTACT` in Graven uppercase tracked.
- Far right: **WhatsApp CTA** — green WhatsApp icon (inline SVG, not an image file) + "Book Now" in Graven. Always visible. This is the primary conversion element.
- Mobile: hamburger menu + **sticky bottom WhatsApp bar** (fixed, full-width, green background, "Book Your Pooja on WhatsApp →" — always visible on mobile, always tappable).

---

### C. HERO — THE AWAKENING (`ujjain-temple-dawn`) — scroll-scrub video ①

`<ScrollVideo scrollHeight="350vh">` — mist dissolves to reveal the temple at sunrise. Scrolling down clears the mist; scrolling up brings it back. **This is the hook shot.**

Overlay:
- **"UJJAIN SEVA"** in Catilya, `clamp(3rem, 10vw, 9rem)`, saffron `#D4920B`.
- Below: **"उज्जैन सेवा"** in `--font-hindi`, maroon `#5C1A1B`, smaller.
- Kicker above in Graven tracked: `SACRED RITUALS · VERIFIED PANDITS · DIVINE UJJAIN`
- Title fades up + blurs out as mist clears: progress 0.2–0.5 → `opacity: 0, y: -60, filter: blur(8px)`.
- At progress 0.6–0.8: `"Where tradition meets trust."` fades in, Quorele, centered.
- Scroll indicator: pulsing chevron, bottom-center, fades after 5% progress.

---

### D. TRUST BAR (no video — horizontal strip)

Narrow cream section. 4 trust metrics in a centered row:
- `500+ Poojas Performed` · `25+ Verified Pandits` · `4.9★ Rating` · `Since 2024`
- Numbers in Catilya (large), labels in Graven (small tracked). Stagger-in with Framer Motion `whileInView`.
- Thin hairline top and bottom borders.

---

### E. WHY UJJAIN — THE GHATS (`ujjain-shipra-ghats`) — scroll-scrub video ②

`<ScrollVideo scrollHeight="300vh">` — camera descends the ghat steps to the Shipra river.

**The metaphor: scrolling down = descending the sacred steps to the water.** This should feel physical and immersive.

Overlay (fades in at 25%, out at 80%):
- "WHY UJJAIN?" in Quorele, left-aligned, cream color over video.
- 3 reasons staggering in, each as a row with hairline divider, Conra:
  - `Home to the Mahakaleshwar Jyotirlinga — one of only 12 in the world`
  - `The Vedic-prescribed city for Kaal Sarp, Mangal, and Pitra Dosh Nivaran`
  - `Where the Shipra river sanctifies every ritual performed on its banks`
- Gradient scrim: `linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)`.

---

### F. POOJA CATEGORIES (no video — the core content hub)

Cream section. This is the most important functional section on the page.

- Heading: **"OUR POOJAS"** in Quorele, centered, maroon.
- Sub: `"हर समस्या का समाधान, वैदिक विधि से"` in Hindi font, muted saffron.
- Category filter tabs in Graven uppercase tracked: `ALL · DOSH NIVARAN · ABHISHEK & JAAP · PIND DAAN & SHRADH · VIVAH · GENERAL`
- Tabs should filter the grid smoothly (Framer Motion `AnimatePresence` layout animation).

**Pooja card grid** — 2 columns desktop, 1 column mobile:

```
┌──────────────────────────────────────┐
│  KAAL SARP DOSH NIVARAN      Graven │
│  कालसर्प दोष निवारण पूजा    Hindi  │
│                                      │
│  Removes the malefic effects of      │  Conra, 2 lines
│  Rahu-Ketu alignment in kundli.      │
│                                      │
│  ⏱ 2–3 hrs  ·  ₹3,100 onwards      │  Graven, muted + saffron
│  📍 Mahakaleshwar Temple             │  Graven, muted
│                                      │
│  [Book via WhatsApp →]               │  Green WhatsApp CTA
│  View Details →                      │  Text link → /pooja/kaal-sarp-dosh
└──────────────────────────────────────┘
```

- Card: cream bg, 1px hairline border, no border-radius. Hover: subtle lift + saffron left-border accent (3px).
- WhatsApp button: green `#25D366` bg, white text, opens `wa.me` with pre-filled message including the pooja name.
- "View Details →" link goes to the individual pooja page (SEO).
- Cards stagger in with Framer Motion `whileInView`, `staggerChildren: 0.08`.

**Show 8 poojas by default** with a "View All 16 Poojas →" button at the bottom that expands the grid or links to a `/poojas` page.

---

### G. THE SACRED PREPARATION — SAMAGRI (`ujjain-pooja-samagri`) — scroll-scrub video ③

`<ScrollVideo scrollHeight="300vh">` — kalash close-up pulls back to reveal the full pooja preparation.

This section bridges the pooja list (what you're booking) with how it works (what happens next). The visual message: "This is the devotion and precision behind every booking."

Overlay:
- No text for the first 25% — let the kalash close-up breathe.
- At 30% progress: heading fades in — `"COMPLETE VEDIC VIDHI"` in Quorele, cream, left side.
- Below it, a kicker in Graven: `"सम्पूर्ण सामग्री और मंत्रोच्चार के साथ"`
- At 50%, 58%, 66% — three detail lines stagger in, Conra, cream, with hairline dividers:
  - `Every pooja includes samagri arranged by the pandit`
  - `Sankalp taken in your name, gotra, and nakshatra`
  - `Prasad delivered to your doorstep after the ceremony`
- All text fades out by 85%. Last 15%: the full samagri spread, no text, visual closing.

---

### H. HOW IT WORKS (no video — poster frame background)

**Background:** Use `posters/ujjain-temple-dawn-final.webp` (temple in golden light) as a fixed `background-image` with a heavy dark overlay `rgba(26, 18, 16, 0.85)` — so the temple is visible but heavily muted behind the content. Apply `background-attachment: fixed` for a parallax-scroll effect on desktop.

- Heading: "HOW IT WORKS" in Quorele, cream, centered.
- Hindi sub: `"तीन आसान चरणों में अपनी पूजा बुक करें"` in Hindi font, muted cream.

3 steps in a row (stacked on mobile), each a numbered card with a semi-transparent cream background:

**Step 1:** `CHOOSE YOUR POOJA`
Select from our 16+ authentic Vedic poojas. Need guidance? Our pandit will consult your kundli — free of cost.

**Step 2:** `CONNECT ON WHATSAPP`
Chat directly with our team. We confirm your date, explain the vidhi, assign a verified pandit, and arrange complete samagri.

**Step 3:** `ATTEND OR JOIN LIVE`
Visit Ujjain for the full experience, or join via live video call from anywhere in the world. Prasad delivered to your address.

- Step numbers: Catilya, huge (80px+), saffron, low opacity (0.2) positioned behind the card as a watermark.
- Step titles: Graven tracked.
- Step descriptions: Conra.
- Thin connecting lines between steps (desktop, horizontal dotted line).
- Stagger in with Framer Motion.

---

### I. OUR PANDITS (no video)

Cream section.

- Heading: "OUR PANDITS" in Quorele.
- Sub: `"अनुभवी · प्रमाणित · श्रद्धालु"` in Hindi font.

3–4 pandit cards in a row (horizontal scroll on mobile):

```
┌────────────────────────┐
│   ┌──────┐             │
│   │  र.श. │ ← Initials │  Catilya on saffron circle
│   └──────┘             │
│                        │
│   Pt. Ramesh Shastri   │  Quorele
│   Acharya, 20+ yrs     │  Conra, muted
│                        │
│   Kaal Sarp Dosh       │  Graven, saffron tags
│   Rudrabhishek         │
│   Navgrah Shanti       │
│                        │
│   ★★★★★ 127 reviews   │  Graven, muted
└────────────────────────┘
```

- No real photos needed — initial avatars (CSS circles, initials in Catilya on saffron `#D4920B` background, cream text). Placeholder-ready for real photos later.
- Below the cards: trust badges row in Graven tracked muted: `SHASTRI / ACHARYA QUALIFIED · TEMPLE-AFFILIATED · 500+ POOJAS PERFORMED`

---

### J. TESTIMONIALS (no video — poster frame background)

**Background:** Use `posters/ujjain-shipra-ghats-final.webp` (Shipra river at ghat base) with dark overlay `rgba(26, 18, 16, 0.8)`.

- Heading: "DEVOTEE EXPERIENCES" in Quorele, cream.

3 testimonial cards in a horizontal scroll / auto-carousel:

Each card: semi-transparent cream background with `backdrop-filter: blur(8px)`:
- Quote in Conra (English) or Hindi font (Hindi testimonials).
- Name + city in Graven: e.g., `— PRIYA M., MUMBAI`
- Star rating: ★★★★★
- Pooja name tag in Graven tracked: `KAAL SARP DOSH NIVARAN`

Sample testimonials (replace with real ones later):
1. `"Pandit ji performed the pooja with such devotion. I felt an immense sense of peace and positive energy. The entire process was smooth and well-organized."` — Rajesh K., Delhi · Rudrabhishek
2. `"पंडित जी ने पूरी विधि से कालसर्प दोष पूजा कराई। बहुत अच्छा अनुभव रहा, सब कुछ व्यवस्थित था।"` — Sunita D., Pune · Kaal Sarp Dosh
3. `"We joined via video call from the US. The pandit explained every step, recited our names in the sankalp, and even sent prasad to our US address. Incredible service."` — Amit P., California · Navgrah Shanti

Stagger-in with Framer Motion.

---

### K. FAQ (critical for SEO — no video)

Cream section.

- Heading: "FREQUENTLY ASKED" in Quorele.
- Sub: `"अक्सर पूछे जाने वाले प्रश्न"` in Hindi font.
- Accordion FAQ items: question in Graven (bold), answer in Conra. Open/close with Framer Motion `AnimatePresence`.
- **Implement `FAQPage` JSON-LD schema** — highest-impact SEO element.

**FAQ content (include ALL of these):**

1. **Which poojas can be performed in Ujjain?**
Ujjain is the Vedic-prescribed location for Kaal Sarp Dosh Nivaran, Mangal Dosh Bhat Pooja, Pitra Dosh Nivaran, Navgrah Shanti, Rudrabhishek, Mahamrityunjay Jaap, Pind Daan, Tripindi Shradh, Narayan Nagbali, Kumbh Vivah, and more. Each pooja is performed at the specific temple prescribed by the shastras.

2. **How much does a pooja cost in Ujjain?**
Pooja costs start from ₹2,100 and go up to ₹21,000+ depending on the ritual, duration, and number of pandits. Our pricing is fully transparent — the amount includes samagri, pandit dakshina, and all temple arrangements. No hidden charges.

3. **Can I attend the pooja via video call?**
Yes. We offer live video call for every pooja. Your name and gotra are included in the sankalp. Prasad is couriered to your address after the ceremony. This is especially popular with NRI devotees.

4. **How do I book a pooja?**
Click any "Book via WhatsApp" button. Our team will understand your requirements, suggest the right pooja based on your kundli (free consultation), confirm the date, and assign a verified pandit. No advance payment is needed for the consultation.

5. **Which temple is each pooja performed at?**
Each pooja follows the scriptural prescription: Kaal Sarp Dosh at Mahakaleshwar, Mangal Dosh at Mangalnath Mandir, Pitra Dosh at Ram Ghat (Shipra), Navgrah Shanti at Navgrah Mandir, and so on.

6. **Is Ujjain the best place for Kaal Sarp Dosh Pooja?**
According to Vedic tradition, Ujjain — home to the Mahakaleshwar Jyotirlinga — is the most auspicious location for Kaal Sarp Dosh Nivaran. The presence of the south-facing, self-manifested Jyotirlinga amplifies the ritual's power.

7. **Do you provide all samagri for the pooja?**
Yes. Every package includes complete samagri — kalash, flowers, dhoop, diya, kumkum, akshat, and all ritual-specific items. You don't need to arrange anything.

8. **Can NRI devotees book poojas from outside India?**
Absolutely. A large portion of our devotees are NRIs from the US, UK, Canada, UAE, and Australia. We offer full remote services with live video, sankalp in your name, and international prasad delivery.

9. **How far in advance should I book?**
For regular days, 2–3 days in advance is sufficient. For auspicious dates (Sawan, Shivratri, Navratri, Amavasya), book at least 1–2 weeks early as pandit availability is limited.

10. **Do you offer kundli consultation before the pooja?**
Yes, free of cost. Share your birth details on WhatsApp and our pandit will analyze your kundli and recommend the appropriate pooja.

---

### L. BOOKING CTA (no video — poster frame background, final conversion)

**Background:** Use `posters/ujjain-pooja-samagri-final.webp` (full pooja spread) with a warm saffron-tinted overlay `rgba(212, 146, 11, 0.12)` on top of a dark overlay `rgba(26, 18, 16, 0.75)`. This gives a warm sacred tone.

- Heading in Catilya: `"Begin Your Spiritual Journey"`
- Hindi sub in Hindi font: `"अभी अपनी पूजा बुक करें — निःशुल्क परामर्श"` (Book your pooja now — free consultation)
- **Large WhatsApp button** — green `#25D366`, Graven uppercase: `BOOK YOUR POOJA ON WHATSAPP`. On hover: gold fill sweep from left.
- Below: phone number in Conra, underline-draw hover.
- Reassurance in Graven tracked muted: `FREE CONSULTATION · NO ADVANCE PAYMENT · VERIFIED PANDITS · COMPLETE SAMAGRI`
- Stagger-in with Framer Motion.

---

### M. FOOTER

Dark section: `#1A1210`.
- **"UJJAIN SEVA"** in Catilya, cream. **"उज्जैन सेवा"** in Hindi font below.
- Address: `Near Mahakaleshwar Temple, Ujjain, Madhya Pradesh 456001`
- **Quick links** (SEO internal links): list all 16 pooja page URLs in two columns:
  - Kaal Sarp Dosh Pooja · Mangal Dosh Pooja · Pitra Dosh Pooja · Navgrah Shanti...
- Social: `WHATSAPP · INSTAGRAM · YOUTUBE` — Graven tracked, underline-draw hover.
- Hairline divider.
- **`BR | Built By Ruturaj`** — Graven tracked, visible, cream. Not a tiny afterthought.
- `© 2024 Ujjain Seva · All rights reserved.`

---

## 4. INDIVIDUAL POOJA PAGES (SEO WORKHORSES)

Route: `/pooja/[slug]`. Statically generated from `src/data/poojas.ts` via `generateStaticParams`. These pages are where 80% of organic traffic lands.

### Page layout:

```
Breadcrumb: Home > Poojas > Kaal Sarp Dosh Nivaran
H1: "Kaal Sarp Dosh Nivaran Pooja in Ujjain"
Hindi: "कालसर्प दोष निवारण पूजा उज्जैन"

┌─ Hero banner ──────────────────────────────────────┐
│  Background: one of the 6 poster frames             │
│  (rotate across pooja pages — e.g., dosh nivaran    │
│  poojas use temple poster, shradh poojas use ghat   │
│  poster, general poojas use samagri poster)          │
│  Dark overlay + pooja name large in Quorele          │
└────────────────────────────────────────────────────┘

Quick facts strip:
  ⏱ 2–3 hours  ·  ₹3,100 – ₹7,100  ·  📍 Mahakaleshwar Temple  ·  📅 Tue/Sat/Panchami

[Book This Pooja on WhatsApp →]  ← green CTA, prominent

Full description (300–500 words, SEO-optimized prose)

What's included:
  ✓ Complete samagri  ✓ Experienced pandit  ✓ Sankalp in your name
  ✓ Nag pratima daan  ✓ Prasad  ✓ Live video call option

The ritual process (step-by-step numbered list)

Who should perform this pooja? (paragraph, SEO keywords)

Best time / auspicious dates (paragraph)

[Book This Pooja on WhatsApp →]  ← second CTA

Related poojas (internal links to 3–4 related pooja pages)

FAQ specific to this pooja (2–4 questions, FAQ Schema)

Testimonial (1–2 relevant)

[Book Now →]  ← final CTA
```

### Schema markup per page:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Kaal Sarp Dosh Nivaran Pooja in Ujjain",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Ujjain Seva",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Near Mahakaleshwar Temple",
      "addressLocality": "Ujjain",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "456001",
      "addressCountry": "IN"
    },
    "telephone": "+91-XXXXXXXXXX",
    "url": "https://ujjainseva.com"
  },
  "areaServed": { "@type": "City", "name": "Ujjain" },
  "offers": { "@type": "Offer", "price": "3100", "priceCurrency": "INR" }
}
```

Also add `FAQPage` and `BreadcrumbList` schemas.

---

## 5. POOJA DATABASE

Create `src/data/poojas.ts` — the full typed array. Each pooja page generates from this. Full data included below for the 16 poojas. Use the TypeScript interface:

```ts
export interface Pooja {
  slug: string
  nameEn: string
  nameHi: string
  category: 'dosh-nivaran' | 'abhishek-jaap' | 'pind-daan-shradh' | 'vivah' | 'general'
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
  posterKey: keyof typeof POSTERS  // which poster frame to use as hero bg
}
```

### Pooja entries:

**DOSH NIVARAN:**
1. `kaal-sarp-dosh` — Kaal Sarp Dosh Nivaran / कालसर्प दोष निवारण — ₹3,100–₹7,100 — 2–3 hrs — Mahakaleshwar Temple — posterKey: `templeDawnFinal`
2. `mangal-dosh` — Mangal Dosh Bhat Pooja / मंगल दोष भात पूजा — ₹3,100–₹5,100 — 2–3 hrs — Mangalnath Mandir — posterKey: `templeDawnFinal`
3. `pitra-dosh` — Pitra Dosh Nivaran / पितृ दोष निवारण — ₹3,100–₹5,100 — 2–3 hrs — Ram Ghat, Shipra — posterKey: `ghatsFinal`
4. `navgrah-shanti` — Navgrah Shanti Pooja / नवग्रह शांति पूजा — ₹3,100–₹5,500 — 3–4 hrs — Navgrah Mandir — posterKey: `samagriFinal`

**ABHISHEK & JAAP:**
5. `rudrabhishek` — Rudrabhishek / रुद्राभिषेक — ₹2,100–₹5,100 — 2–3 hrs — Mahakaleshwar Temple — posterKey: `templeDawnFinal`
6. `mahamrityunjay-jaap` — Mahamrityunjay Jaap / महामृत्युंजय जाप — ₹5,100–₹21,000 — 1–7 days — Mahakaleshwar — posterKey: `samagriFinal`
7. `laghu-rudra` — Laghu Rudra / लघु रुद्र — ₹5,100–₹11,000 — 4–6 hrs — Mahakaleshwar — posterKey: `templeDawnFinal`

**PIND DAAN & SHRADH:**
8. `pind-daan` — Pind Daan / पिंड दान — ₹3,100–₹5,100 — 2–3 hrs — Ram Ghat, Shipra — posterKey: `ghatsFinal`
9. `tripindi-shradh` — Tripindi Shradh / त्रिपिंडी श्राद्ध — ₹3,100–₹7,100 — 3–4 hrs — Ram Ghat — posterKey: `ghatsFinal`
10. `narayan-nagbali` — Narayan Nagbali / नारायण नागबली — ₹11,000–₹21,000 — 3 days — Shipra River — posterKey: `ghatsFinal`

**VIVAH:**
11. `kumbh-vivah` — Kumbh Vivah / कुम्भ विवाह — ₹5,100–₹11,000 — 2–3 hrs — Mangalnath Mandir — posterKey: `samagriFinal`

**GENERAL:**
12. `satyanarayan-katha` — Satyanarayan Katha / सत्यनारायण कथा — ₹2,100–₹3,100 — 2–3 hrs — posterKey: `samagriFinal`
13. `vastu-shanti` — Vastu Shanti / वास्तु शांति — ₹3,100–₹5,100 — 3–4 hrs — posterKey: `samagriFinal`
14. `sunderkand-path` — Sunderkand Path / सुंदरकांड पाठ — ₹2,100–₹3,100 — 2–3 hrs — posterKey: `templeDawnFinal`
15. `griha-pravesh` — Griha Pravesh / गृह प्रवेश — ₹3,100–₹5,100 — 2–3 hrs — posterKey: `samagriFinal`
16. `mangalnath-pooja` — Mangalnath Temple Pooja / मंगलनाथ मंदिर पूजा — ₹2,100 — 1–2 hrs — Mangalnath Mandir — posterKey: `templeDawnFinal`

> Write full `description`, `fullDescription`, `benefits`, `includes`, `whoShouldDo`, `process`, and `faq` for each pooja. The `fullDescription` should be 300–500 words of SEO-optimized content including natural keyword usage. Write them as a knowledgeable pandit would describe the pooja — authentic, informative, respectful.

---

## 6. WHATSAPP INTEGRATION

```ts
// src/lib/whatsapp.ts
const PHONE = '91XXXXXXXXXX'

export function getWhatsAppURL(poojaName?: string, poojaNameHi?: string): string {
  const base = `https://wa.me/${PHONE}`
  if (!poojaName) {
    return `${base}?text=${encodeURIComponent(
      '🙏 नमस्ते! I would like to enquire about pooja booking in Ujjain.\nPlease guide me.'
    )}`
  }
  return `${base}?text=${encodeURIComponent(
    `🙏 नमस्ते!\n\nI am interested in *${poojaName}*${poojaNameHi ? ` (${poojaNameHi})` : ''} in Ujjain.\n\nPlease share:\n• Available dates\n• Complete cost\n• Samagri & vidhi details\n• Video call option\n\nThank you 🙏`
  )}`
}
```

### WhatsApp CTA placements (minimum 7 touchpoints):
1. Fixed nav bar (always visible)
2. Below hero (after mist clears)
3. On every pooja card in the grid
4. On every individual pooja page (3× per page: top, middle, bottom)
5. In "How It Works" step 2
6. Finale CTA section
7. **Mobile: sticky bottom bar** — never scrolls away, always tappable
8. Footer

---

## 7. DESIGN SYSTEM

```css
@import "tailwindcss";

@theme {
  --color-cream: #FAF5EB;
  --color-cream-dark: #F0E8D8;
  --color-saffron: #D4920B;
  --color-saffron-light: #F0C040;
  --color-saffron-deep: #B87A08;
  --color-maroon: #5C1A1B;
  --color-maroon-light: #7A2E2E;
  --color-copper: #B87333;
  --color-brown-dark: #2C1810;
  --color-brown-warm: #4A3020;
  --color-footer-dark: #1A1210;
  --color-whatsapp: #25D366;
  --color-whatsapp-dark: #1EBE57;

  --font-hero: 'Catilya', 'Playfair Display', Georgia, serif;
  --font-heading: 'Quorele', 'Instrument Serif', Georgia, serif;
  --font-label: 'Graven', 'Inter', system-ui, sans-serif;
  --font-body: 'Conra', 'DM Sans', system-ui, sans-serif;
  --font-hindi: 'Tiro Devanagari Hindi', 'Noto Sans Devanagari', serif;
}
```

- Background: `#FAF5EB` — warm parchment
- Text: `#2C1810` — dark brown
- Headings: saffron `#D4920B` or maroon `#5C1A1B`
- Accent: copper `#B87333`
- CTA: WhatsApp green `#25D366`
- Noise grain: 2% opacity `feTurbulence`
- Hairline dividers: maroon at 12% opacity
- No border-radius except buttons (2px) and avatar circles
- Gradient scrim on video/poster sections
- Custom cursor: saffron dot → copper ring
- Scroll progress: thin saffron line, viewport top

---

## 8. SEO CHECKLIST (non-negotiable)

- [ ] Static generation of all 16 pooja pages + homepage
- [ ] Unique `<title>` and `<meta description>` per page
- [ ] `FAQPage` JSON-LD on homepage + each pooja page
- [ ] `Service` JSON-LD on each pooja page
- [ ] `LocalBusiness` JSON-LD on homepage
- [ ] `BreadcrumbList` JSON-LD on pooja pages
- [ ] `WebSite` JSON-LD with `SearchAction` on homepage
- [ ] Auto-generated `sitemap.xml`
- [ ] `robots.txt` allowing all
- [ ] Canonical URLs
- [ ] OG image + Twitter card meta tags
- [ ] Alt text on all poster images
- [ ] Heading hierarchy: one `h1` per page, proper `h2`–`h3`
- [ ] Internal linking: every pooja page links to 3–4 related poojas
- [ ] Footer links to all 16 pooja pages
- [ ] `lang="en"` on HTML, `lang="hi"` on Hindi elements
- [ ] Mobile-friendly: passes Google Mobile-Friendly Test

---

## 9. PERFORMANCE

- Only hero video preloads (`preload="auto"`). Other 2 videos lazy-mount via `IntersectionObserver` at 200vh margin.
- Poster frames on every `<video>` — no blank flashes.
- Poster frames used as section backgrounds are loaded via CSS `background-image` — lazy-load with `loading="lazy"` if using `<img>`, or use `IntersectionObserver` to add the `background-image` class.
- `will-change` only during animation, removed after.
- `prefers-reduced-motion`: static posters + fades only.
- `font-display: swap` on all custom fonts.
- Core Web Vitals: target LCP < 2.5s, CLS < 0.1.
- Lighthouse: 90+ desktop, 80+ mobile.

---

## 10. BUILD ORDER

1. Scaffold Next.js + Tailwind v4 `@theme` + fonts + `assets.ts` + `poojas.ts`
2. FFmpeg prep script — run, confirm 3 optimized videos + 6 poster frames + OG image
3. Lenis + GSAP ScrollTrigger + `<ScrollVideo>` component
4. **Hero temple-dawn section** — verify scroll-scrub. If janky, stop and tell me.
5. Ghats section (scroll-scrub) + Trust bar
6. Pooja categories grid with filter tabs + WhatsApp CTAs
7. Samagri section (scroll-scrub) + How it Works (poster bg)
8. Pandits + Testimonials (poster bg) + FAQ with schema
9. CTA + Footer
10. Individual pooja page template + `generateStaticParams` → all 16 pages
11. WhatsApp integration everywhere
12. SEO: sitemap, robots, schemas, meta tags, OG images
13. Polish: cursor, micro-interactions, mobile bottom bar, reduced-motion
14. Lighthouse audit + Google Mobile-Friendly test

`npm run dev` clean at every stage. `npm run build` zero errors at the end.

---

## 11. FILE STRUCTURE

```
ujjain-seva/
├── next.config.js              ← output: 'export'
├── package.json
├── scripts/
│   └── prep-videos.sh
├── public/
│   ├── fonts/                  ← 4 custom .woff2 files
│   ├── videos/                 ← 3 source videos
│   ├── videos/optimized/       ← generated
│   ├── posters/                ← 6 poster frames (generated)
│   └── og-image.webp           ← generated
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← fonts, global meta, JSON-LD
│   │   ├── page.tsx            ← homepage (scroll sections)
│   │   ├── pooja/
│   │   │   └── [slug]/
│   │   │       └── page.tsx    ← individual pooja pages
│   │   ├── sitemap.ts          ← auto-generated sitemap
│   │   └── robots.ts
│   ├── components/
│   │   ├── ScrollVideo.tsx
│   │   ├── PoojaCard.tsx
│   │   ├── PoojaGrid.tsx
│   │   ├── WhatsAppButton.tsx
│   │   ├── WhatsAppBottomBar.tsx  ← mobile sticky
│   │   ├── FAQAccordion.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   ├── PanditCard.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── GrainOverlay.tsx
│   │   ├── Preloader.tsx
│   │   └── Navigation.tsx
│   ├── sections/               ← homepage sections
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── WhyUjjain.tsx
│   │   ├── PoojaCategories.tsx
│   │   ├── SacredPrep.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Pandits.tsx
│   │   ├── Testimonials.tsx
│   │   ├── FAQ.tsx
│   │   ├── BookingCTA.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── poojas.ts           ← all 16 poojas
│   └── lib/
│       ├── assets.ts           ← video/poster paths
│       ├── whatsapp.ts         ← WhatsApp URL generator
│       └── schemas.ts          ← JSON-LD generators
```

---

*UJJAIN SEVA · उज्जैन सेवा · BR | Built By Abhijit*s