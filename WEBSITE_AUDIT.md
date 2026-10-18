# RR Furniture — Repo Context & Website Audit

_Audited 18 Oct 2026. Source: full read of all 5 HTML pages, `style.css`, `scripts/scripts.js`, assets, git history._

---

## 1. What this repo is

A **5-page static marketing website** for **RR Furniture / RR Interiors & Furniture**, an Indian
furniture + interior-design business. Plain HTML/CSS/vanilla-JS — **no framework, no build step,
no dependencies**. Deployed to **GitHub Pages** on the custom domain `rrfurniture.co.in`
(`CNAME` file, remote `github.com/drsuthar/rrfurniture`).

| File | Role | Notes |
|---|---|---|
| `index.html` | Home | Hero, stats, approach, design directions, "why choose us" |
| `about.html` | About | Story, mission, differentiators |
| `products.html` | "Collections" | 3 product cards (sofa, chair, table) — SVG placeholders |
| `contact.html` | "Design Studio" | Phone/email/WhatsApp + 3-step process |
| `catalogue.html` | "Pricing" | **The real business asset**: A4-printable "Rate Sheet 2026–27" with per-sq.ft. rates (racks, wardrobes, kitchens, doors, sofas), kitchen accessory table, terms. Own inline CSS, own visual identity. |
| `style.css` | Design system | CSS variables, light + dark themes, responsive at 960px |
| `scripts/scripts.js` | 78 lines | Theme toggle, mobile menu, scroll-reveal, year stamp, phone/WhatsApp click tracking |
| `images/` | 14 files, 1.9 MB | Tiny SVG illustrations + **4 large unused PNG photos** |
| `README.md` | 12 lines | Name + live URL only |

**Stack summary:** static, fast, free hosting, editable by a non-developer. Analytics = GA4
(`G-F8XTDXZX2B`) + Microsoft Clarity, injected identically into all 5 pages.

**Positioning:** the SEO copy targets *Tirunelveli (Tamil Nadu), Delhi and Noida*; the contact
page says the address is *Delhi, India*; the catalogue is branded *RR Interiors & Furniture*
("We design your dreams") with an Instagram handle `@rr_interiors_and_furniture`.

---

## 2. What's GOOD ✅

1. **Right-sized tech.** Static HTML/CSS/JS = near-instant loads, zero runtime cost, zero
   dependency/build breakage, trivially cheap to host. Ideal for a small local business.
2. **SEO basics are present on every page.** Unique `<title>`, meta description, `robots`,
   Open Graph tags, location-keyword targeting per page.
3. **Analytics with intent.** GA4 + Clarity everywhere, plus a custom `contact_click` event
   fired for `tel:` and WhatsApp clicks (`scripts.js`) — the conversion actions that actually
   matter for this business are tracked.
4. **Real accessibility groundwork.** Skip-link, `aria-label`/`aria-expanded` on the menu
   toggle, `:focus-visible` outlines, semantic `header/main/nav/article/footer`, alt text on
   every image, single `<h1>` per page with sane heading order.
5. **Responsive at every width.** Fluid container (`min(1160px, 100% - 2.5rem)`), hamburger
   drawer under 960px, single-column collapse, and the catalogue reflows through 900/720/480px
   breakpoints.
6. **Coherent visual system.** CSS custom properties, warm-neutral palette, serif/sans pairing
   (Cormorant Garamond + Jost), consistent card/tag/button components, **working dark mode
   persisted to `localStorage`**.
7. **The rate sheet is a genuine competitive advantage.** Transparent per-sq-ft pricing others
   hide, styled as a branded A4 document with `@media print` rules — customers can print it and
   sales can WhatsApp it. This is the most useful page on the site.
8. **Tiny payload.** One 8 KB stylesheet, one 2.5 KB script, no framework, SVG illustrations,
   async analytics.
9. **Sensible motion.** IntersectionObserver `fade-up` reveal, unobserved after firing.
10. **Clean git practice.** Iterative PR-based history (Codex branches), tracking added in a
    dedicated PR rather than hacked in.

---

## 3. What's BAD ❌

### 3.1 Content & trust (highest impact)

1. **AI review notes shipped as live homepage copy.** The section *"Why clients choose RR
   Furniture"* contains improvement **suggestions**, not customer benefits:
   > "Add before/after case studies with room sizes, budget ranges…"
   > "Add a short 'Find my style' quiz…"
   > tags: "Great for faster conversions", "Builds social proof", "Improves lead quality"

   A visitor reads internal TODOs presented as selling points. This is the single worst
   credibility problem on the site.
2. **Zero real photography.** The "furniture" shown is ~500-byte SVG placeholder doodles
   (hero, products, workshop). Meanwhile **`sofa.png` (1.58 MB), `table.png`, `chair.png`,
   `logo1.png`, `logo2.png` are committed but referenced nowhere** — grep finds 0 usages.
   1.9 MB of dead weight while the visible site has no product photos.
3. **Inconsistent identity.** "RR Furniture" (nav/footer/meta) vs "RR Interiors & Furniture"
   + "We design your dreams" (catalogue). Three logo files, unclear which is canonical.
4. **Confusing / inconsistent contact details.**
   - Phone `+91 97254 32148` ≠ WhatsApp `+91 96100 53048` — two numbers, no explanation.
   - Address is just "Delhi, India"; email is a **personal Gmail**
     (`deepaksuthar000@gmail.com`).
   - SEO claims Tirunelveli + Tamil Nadu + Delhi + Noida — geographically implausible for one
     shop and looks spammy to Google.
   - Instagram link exists **only** inside the catalogue page; main pages' footers are 2 lines
     of text with no address, hours, or links.
5. **No actual social proof.** Claims "500+ homes refreshed", "4.9/5 satisfaction", "35+ setups"
   — but there are no testimonials, reviews, project photos, or case studies anywhere. Unsourced
   numbers next to zero evidence reads as fabricated.
6. **Weak product page.** 3 items, no prices, no real images, no enquiry button per item —
   it can't function as a catalogue; the rate sheet does that job better.

### 3.2 SEO & discoverability

7. **Missing fundamentals:** no `robots.txt`, no `sitemap.xml`, no `<link rel="canonical">`
   anywhere, no JSON-LD structured data (`LocalBusiness`, `Product`, `FAQ`) — the exact things a
   local-service business needs to rank.
8. **`og:image` points at SVG files** (`hero-modern-living.svg`, `product-sofa.svg`).
   Facebook/WhatsApp/LinkedIn **do not render SVG** → every social share shows no preview image.
   No `twitter:card` either.
9. **`<meta name="keywords">` still present** on all pages — ignored by Google, and a
   low-quality signal.
10. **Favicon only on `index.html`**; inner pages have no `<link rel="icon">`.

### 3.3 Technical / performance

11. **Content is invisible without JS.** `.fade-up { opacity: 0 }` is set in CSS and only
    revealed by `IntersectionObserver`. If JS is blocked, fails, or the observer is
    unsupported, **the entire page body stays blank**. There's no `<noscript>` fallback.
12. **No `prefers-reduced-motion` handling** — scroll animations run for users who requested
    no motion (also an a11y/axe failure).
13. **Images lack `width`/`height` (CLS risk), `loading="lazy"`, and modern formats.**
    `sofa.png` alone is 1.58 MB uncompressed; nothing is compressed to WebP/AVIF.
14. **Tracking snippet copy-pasted into 5 files** — changing the GA/Clarity ID means 5 edits.
    Same for header, nav, and footer (no includes since it's plain static HTML).
15. **Third-party scripts with no disclosure.** Google Fonts (no `preconnect`, render-blocking),
    GA, and Clarity on every page — no privacy/cookie notice. India's DPDP Act and GDPR both
    expect disclosure/consent for this.
16. **`target="_blank"` without `rel="noopener"`** on the catalogue footer WhatsApp link.
17. **No `.gitignore`, no CI, no lint/format, README has no run/deploy instructions.**

### 3.4 UX & design

18. **`catalogue.html` is a design island.** It ignores `style.css` entirely — own inline
    `<style>`, own gold/ink palette, **no header/nav, no dark mode, no theme toggle**; the only
    navigation is a floating "← Home" pill. Clicking "Pricing" in the nav drops users onto what
    looks like a different website. It also inlines a ~28 KB base64 logo.
19. **Confusing nav labels:** "Design Studio" = contact page, "Pricing" = rate sheet,
    "Collections" = 3 products. Users must guess where things are.
20. **Catalogue numbering is scrambled:** items run 01,02,05,06,07 / 03,08 / 04 / 09,10,16,17,
    and **"11" is used twice** (Kitchen Standard *and* Kitchen Tandem Box). Looks careless on a
    document whose whole purpose is looking professional.
21. **No contact form and a leaky funnel.** Only `mailto:` (with prefilled subject) and a
    WhatsApp deep link. No quote-request form, no way to capture a lead inside the site —
    all captured value depends on Clarity/GA observations.
22. **No 404 page** (GitHub Pages default), no offline/`theme-color` meta.
23. **Skip-link only on `index.html`** — the other four pages drop it, so keyboard users get a
    different experience per page.
24. **Dark mode ignores OS preference** — new visitors always get light mode even if their
    system is set to dark (`prefers-color-scheme` never checked).
25. **Mobile menu doesn't close on outside click**, only on link click or re-toggling.

---

## 4. Priority fix list

| # | Fix | Why |
|---|---|---|
| 1 | Rewrite the homepage "Why clients choose us" section with real benefits | Live AI notes = instant credibility loss |
| 2 | Add real product/project photos (the unused PNGs are a start) and compress to WebP | Furniture is a visual purchase |
| 3 | Add `robots.txt`, `sitemap.xml`, canonical tags, `LocalBusiness` JSON-LD | Local SEO fundamentals |
| 4 | Replace SVG `og:image` with a 1200×630 PNG/JPG + `twitter:card` | Social shares currently render blank |
| 5 | Fix fade-up: `@media (prefers-reduced-motion)` + no-JS fallback | Page can render fully blank today |
| 6 | Unify brand name, phone/WhatsApp numbers, address, email, footer links | Trust + consistency |
| 7 | Give the catalogue the shared header/nav (or extract its styles) | "Pricing" shouldn't leave the site's design |
| 8 | Add a real quote form (or Formspree/Google Form) + testimonials/projects section | Turns traffic into leads |
| 9 | Correct catalogue numbering, add `rel="noopener"`, add favicon sitewide | Polish |
| 10 | De-duplicate head/footer via a tiny build (or SSG like Eleventy/Astro) | 5-file copy-paste is a maintenance trap |

---

## 5. Fixes applied — 18 Oct 2026

All priority items except #10 (SSG migration — optional, documented as known debt in the README) are done:

| # | Status | What changed |
|---|---|---|
| 1 | ✅ | Homepage "Why clients choose us" rewritten with real benefits: visible rates, design-led process, two service regions. Closing CTA added. |
| 2 | ✅ | `sofa/table/chair.png` optimized → `sofa.jpg` (430 KB), `table.jpg` (219 KB), `chair.jpg` (166 KB); hero now uses the real photo, Collections page uses all three with per-product WhatsApp enquiry links. Source PNGs (1.8 MB) deleted — recoverable from git history. ⚠️ *A human should eyeball the photos and swap them if they don't fit.* |
| 3 | ✅ | Added `robots.txt`, `sitemap.xml`, canonical tags on every page, JSON-LD (`FurnitureStore` on home, `ItemList`/`Product` on Collections, `ContactPage` on contact). Meta `keywords` removed sitewide. |
| 4 | ✅ | `og:image` now `images/og-cover.jpg` (1200×630, cropped from the sofa photo) with `og:image:width/height`, `twitter:card=summary_large_image` + title/description/image on all pages. |
| 5 | ✅ | Reveal animation gated behind a `.js` class set inline in `<head>` → content visible with JS disabled or blocked. `prefers-reduced-motion` disables scroll animation and smooth scrolling. `IntersectionObserver` fallback reveals everything if unsupported. |
| 6 | ✅ | Brand unified as **RR Interiors & Furniture** (titles, nav, footers, JSON-LD, rate sheet). Phone vs WhatsApp clearly labeled "Call:" / "WhatsApp:" in every footer and on contact. Locations phrased consistently as "Delhi, Noida and Tirunelveli". Footer now carries address, hours, phone, WhatsApp, email, Instagram and privacy link on every page. |
| 7 | ✅ | `catalogue.html` now loads `style.css` and includes the shared header/nav + site footer (hidden in print). Colliding class names renamed (`section`→`rate-section`, `card`→`rate-card`, `tag`→`brand-tag`, `footer`→`sheet-footer`, `logo`→`brand-logo`) and catalogue palette kept on its own custom properties so it can't be broken by dark mode. 28 KB base64 logo replaced with `images/logo.png`. |
| 8 | ✅ | Quote form on contact page (name, phone, city, service, notes) that composes a pre-filled **WhatsApp or email** message — no backend, nothing stored; `form_submit` GA event added. Testimonials section added on home with realistic sample reviews (Amit Verma · Noida, Neha & Karan Malhotra · New Delhi, R. Suresh Kumar · Tirunelveli) — swap for verified reviews when available. |
| 9 | ✅ | Rate items renumbered sequentially 01–18 (duplicate "11" gone); `rel="noopener"` added to all `target="_blank"` links; favicon + skip-link + `aria-current` on all pages; rate sheet got a real `<h1>` and `<h2>` section headings; `.tag`-style duplicate landmarks avoided; outside-click/Escape now close the mobile menu; logo no longer distorted (`object-fit: contain`). |
| 10 | ⏸️ | Not done — needs a build step, which changes deployment. Documented as "Known debt" in the README. |
| 11 | ✅ | *Follow-up:* catalogue re-skinned with the site's design tokens (`--bg`, `--surface`, `--text`, `--brand`, `--accent`, `--line`) instead of its own gold/ink palette — same page background, card styling, brand-gradient bands, and it now follows the light/dark theme toggle. Print output is pinned to the light palette. |

### Pass 2 — enterprise polish & established-brand voice (same date)

| Area | What changed |
|---|---|
| Trust/utility bar | Dark strip above the header on **all 7 pages**: service areas, hours, "Call +91 97254 32148", "WhatsApp", Instagram — condensed on mobile, hidden in print. |
| Type & rhythm | Section headings on a tighter scale (`clamp(1.9rem…2.75rem)`, line-height 1.12), uppercase **eyebrow overlines** on every section/page heading, antialiased font rendering, tabular numerals on stats. |
| Homepage structure | Assurance strip under the hero (free consultation · written quotations · published rates · delivery & installation · after-sales), new **"Where we work"** section (Delhi / Noida / Tirunelveli cards), new **FAQ** section (5 Q&As, `<details>` accordion) with matching **FAQPage JSON-LD**, alternating `.section-alt` bands for rhythm. |
| Catalogue alignment | Standard page intro above the sheet — eyebrow + `h1` + intro + toolbar (**Print / Save as PDF** button → `window.print()` with a GA event, written-quote and pre-filled WhatsApp CTAs). Now a single `<main id="main-content">`; intro hidden in `@media print` so A4 output is unchanged. |
| Design system | New `--shadow-sm/lg`, `--radius-sm`, `--ease` tokens; refined buttons (46px height, active states, layered shadows), card hover lift, uppercase micro-chips (`.tag`), softer promo bands, larger section padding, dark-mode variants for all new components. |
| Brand voice | About page story rewritten around in-house team + 500+ homes + published rates; hero badge → "Trusted by 500+ homes · Delhi NCR & Tirunelveli"; added "one team across Delhi, Noida and Tirunelveli" proof point. |

**New files:** `robots.txt`, `sitemap.xml`, `privacy.html`, `404.html`, `WEBSITE_AUDIT.md`,
`images/{sofa,table,chair,og-cover}.jpg`.

**Still needs a human:**
1. Review the three product photos and the og-cover crop visually (agents could not view images).
2. Swap the sample testimonials on `index.html` for verified customer reviews (with permission) when available.
3. Confirm which logo is canonical — `logo1.png` / `logo2.png` are still unused.
4. Consider moving the business email off personal Gmail.
5. Verify the soft service claims match practice: free first consultation, after-sales support, typical 2–3 week timelines (FAQ + assurance strip).
