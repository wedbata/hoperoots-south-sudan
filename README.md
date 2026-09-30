# HopeRoots South Sudan — Portfolio Site

A complete, production-ready static website for a fictional NGO running a fictional WASH (Water, Sanitation, and Hygiene) program in **Warrap State, South Sudan**.

> **Note:** This is a **portfolio demonstration project by George Gabriel**. All organizations, projects, names, and figures are fictional. Built to showcase design + front-end execution.

---

## ✨ Highlights

- **6 fully designed pages** — Home, About, Projects, Impact & Reports, Get Involved, Contact
- **Zero build step** — pure HTML, CSS, and vanilla JavaScript. No bundler, no framework
- **Mobile-first responsive** — works from 320px phone widths up to 4K monitors
- **Accessibility-conscious** — semantic HTML, skip links, ARIA attributes, focus styles, alt text on placeholders, `prefers-reduced-motion` support, high contrast
- **Fast on slow connections** — one CSS bundle, one JS file, system fonts + Inter via `display=swap`, all icons inline SVG (zero extra requests)
- **Animated stat counters** — scroll-triggered with `IntersectionObserver`
- **Pure-CSS bar charts** — no chart library
- **Form validation** — client-side with accessible error messaging (simulated submit; no backend)
- **Donor-trust aesthetic** — deep blue + white with orange + green accents

---

## 📁 File structure

```
.
├── index.html              # Homepage — hero, stats, mission, story, projects preview
├── about.html              # History timeline, vision/mission, values, team
├── projects.html           # 3 project cards with status badges & funding partners
├── impact.html             # Reports library + CSS bar charts (boreholes/year, financials)
├── get-involved.html       # Donation tiers, volunteer form, newsletter
├── contact.html            # Juba address + contact form + field offices
├── css/
│   ├── base.css            # Design tokens, reset, typography, layout utilities
│   ├── layout.css          # Header, navigation, mobile menu, footer
│   └── components.css      # Buttons, cards, forms, badges, hero, charts, timeline
├── js/
│   └── main.js             # Mobile nav, sticky header, counter animation, form validation
└── README.md
```

### CSS organization

| File | What it contains |
| --- | --- |
| `base.css` | CSS custom properties (colors, spacing, radii, shadows), reset, typography, `.container`, `.section`, utilities |
| `layout.css` | Site header, utility bar, navigation, mobile drawer, footer |
| `components.css` | Reusable components: buttons, badges, cards, forms, hero, charts, timeline, story card, value list, CTA banner |

### JavaScript (`js/main.js`)

A single IIFE that initializes on `DOMContentLoaded` and wires up:

- **Mobile menu** — toggle, esc-to-close, click-outside, focus management
- **Sticky header** — adds shadow once user scrolls past 8px
- **Animated stat counters** — `IntersectionObserver` triggers an `easeOutCubic` count-up to `data-target` (supports `+`, `%` suffixes and decimals; respects `prefers-reduced-motion`)
- **Smooth anchor scrolling** — offsets for the sticky header; non-intrusive fallback
- **Form validation** — required fields + email format; inline error messaging; aria-invalid toggling; simulated success state
- **Footer year** — auto-fills from current year

---

## 🎨 Design system

### Colors

| Token | Value | Use |
| --- | --- | --- |
| `--color-primary` | `#0a2540` | Deep institutional blue (headers, text, primary buttons) |
| `--color-accent-orange` | `#ff6b35` | CTAs, highlights, urgency |
| `--color-accent-green` | `#2ecc71` | Water / growth / positive stats |
| `--color-bg-alt` | `#f5f7fa` | Alternating section backgrounds |
| `--color-border` | `#e5e7eb` | Card / input borders |

All tokens live in `:root` in `css/base.css`. Change a token once; it cascades.

### Typography

- **Font:** Inter (Google Fonts, `display=swap`) with a full system font fallback stack
- **Type scale:** `clamp()`-based responsive sizes (no media queries needed for headlines)
- **Weights:** 400, 500, 600, 700, 800

### Spacing

8px-based scale (`--space-1` … `--space-10`) — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px.

---

## 🚀 Deploying to GitHub Pages

1. **Create a new GitHub repository** (public for free GitHub Pages).

   ```bash
   git init
   git add .
   git commit -m "Initial commit: HopeRoots South Sudan portfolio site"
   git branch -M main
   git remote add origin git@github.com:<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages** in the repository settings:
   - Settings → Pages → Source: `Deploy from a branch`
   - Branch: `main`, folder: `/ (root)`
   - Save

3. **Wait ~1 minute.** Your site will be live at:
   `https://<your-username>.github.io/<your-repo>/`

### Custom domain (optional)

Add a `CNAME` file at the repo root containing your domain, then configure DNS as per GitHub's docs.

---

## 🛠 Local preview

You don't need a build step. Open `index.html` in your browser, or run a tiny static server:

```bash
# Python 3
python -m http.server 8000

# Node
npx serve .

# PHP
php -S localhost:8000
```

Then visit <http://localhost:8000>.

---

## ♿ Accessibility notes

- **Skip link** appears on focus, jumping keyboard users straight to `<main>`
- All interactive controls are reachable by keyboard; mobile menu traps focus and closes on `Esc`
- All form inputs have associated `<label>`s; required fields use `aria-required` (implicit via `required`) and visual `*` markers
- Color contrast meets WCAG AA on body text (deep blue on white, white on deep blue)
- `prefers-reduced-motion: reduce` disables count-up animation, smooth scroll, and CSS transitions
- SVG icons use `aria-hidden="true"`; decorative gradients on image placeholders use `<span>` text labels for screen readers

---

## 📝 Customization checklist

To re-skin the site for a different organization:

1. **Update colors** — change `--color-primary`, `--color-accent-orange`, `--color-accent-green` in `css/base.css`
2. **Update copy** — search the HTML files for the brand name; all copy is inline (no CMS)
3. **Replace image placeholders** — the `[ Image · … ]` and `[ Hero image · … ]` spans are designed to be swapped for `<img>` tags. Style classes (`two-col__visual`, `hero__visual`, `project-card__image`, `story-card__visual`) already exist
4. **Hook up the donate buttons** — currently link to `#`. Replace `href="#"` with your payment processor link (Stripe, Donorbox, etc.)
5. **Connect the forms** — replace the simulated `success` handler in `js/main.js` with a real `fetch()` POST to your backend, Formspree, Netlify Forms, etc.
6. **Replace the favicon** — currently an inline SVG data URL; replace the `<link rel="icon">` in each HTML file with a real `.ico` or `.png` file

---

## 📄 License

This is a personal portfolio piece. Use it as inspiration for your own projects.
# HopeRoots
