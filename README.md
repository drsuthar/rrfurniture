# RR Interiors & Furniture — Website

Source code for the official **RR Interiors & Furniture** website (live at
[https://rrfurniture.co.in](https://rrfurniture.co.in)) — a static site built with plain
HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies: fast to
load, free to host, easy to edit.

## Pages

| File | Nav label | Purpose |
|---|---|---|
| `index.html` | Home | Hero, approach, design directions, benefits, testimonial slots, CTAs |
| `about.html` | About | Story, mission, differentiators |
| `products.html` | Collections | Product cards with photo + WhatsApp enquiry links |
| `catalogue.html` | Pricing | A4-printable **Rate Sheet 2026–27** (per sq. ft. rates) |
| `contact.html` | Contact | Contact details, process, quote form (WhatsApp / email) |
| `privacy.html` | — | Privacy & analytics cookie disclosure |
| `404.html` | — | Custom not-found page (GitHub Pages picks it up automatically) |

Supporting files: `style.css` (design system, light/dark themes), `scripts/scripts.js`
(theme, mobile menu, scroll reveal, quote form, analytics events), `robots.txt`,
`sitemap.xml`, `WEBSITE_AUDIT.md` (full site audit).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Or just open `index.html` in a browser.)

## Deploy

Pushed to `main` → **GitHub Pages** serves the repo root. Custom domain comes from `CNAME`
(`rrfurniture.co.in`); keep the DNS records pointed at GitHub Pages.

## Editing content

- **Phone / WhatsApp / email** appear in every page footer and on `contact.html`, plus
  `scripts/scripts.js` (WhatsApp number used by the quote form). Search-and-replace if they
  change — see "Known debt" below.
- **Rates** live only in `catalogue.html` (items are numbered 01–18).
- **Testimonials**: `index.html` "What our customers say" has sample testimonial copy
  written for this project. Swap in verified customer reviews (with permission) as soon
  as real ones are available.
- **Analytics**: GA4 (`G-F8XTDXZX2B`) and Microsoft Clarity (`w9dj1jw7l2`) snippets are
  duplicated in every `<head>`.

## Known debt / next steps

- Head/footer/header markup is duplicated per page (no templating). A tiny SSG
  (Eleventy/Astro) would remove that duplication if the site ever grows.
- `images/logo1.png` and `images/logo2.png` are unused alternates — confirm which logo is
  canonical, then delete the rest.
