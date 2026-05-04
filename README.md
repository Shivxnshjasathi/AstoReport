# 🌟 AstroReport — Vedic Astrology SaaS Platform

> A premium, bilingual (English/Hindi) Vedic astrology platform offering free Kundli generation, personalized reports, gemstone recommendations, and expert consultations — powered by WhatsApp-first lead capture and conversion.

---

## 🚀 Live Demo

**URL:** [https://astro-report.vercel.app](https://astro-report.vercel.app)

---

## ✨ Features

### 🔭 Free Kundli Generator
- Enter name, date of birth, time of birth, and place of birth
- Auto geocoding via location search (lat/lon/timezone detection)
- Generates accurate **D1 (Lagna)** and **D9 (Navamsa)** Kundli charts
- Displays **Vimshottari Dasha** (Maha Dasha + Antar Dasha)
- Full **Planetary Positions** table (Planet, Longitude, Rashi, Nakshatra)
- **Completely free** — no signup, no paywall

### 📄 PDF Report Download
- One-click download of the full Kundli as a styled PDF
- Includes **both D1 and D9 charts** rendered as SVG grids inside the PDF
- Works on **mobile** (iOS Safari, Android Chrome) using `pdf().toBlob()`

### 🛒 Premium Reports Store
- Browse and add multiple reports to cart
- Reports include: Full Kundli, Marriage Compatibility, Career Blueprint, Annual Forecast, Numerology, Baby Name, Vastu
- Flash sale system with countdown timer
- Gemstone recommendations page

### 💳 WhatsApp-First Checkout
- Customer fills order details (name, DOB, TOB, place of birth)
- Order is dispatched as a **structured WhatsApp message** to the business number
- Includes all birth details, reports ordered, and total amount
- **4–5 day delivery note** included automatically in message
- No payment gateway needed — ideal for India-first WhatsApp-based businesses

### 🎁 Referral System
- After placing an order, customers receive their **personal referral code** (e.g. `ASTRO-PRIYA-20`)
- One-tap **WhatsApp Share button** with a pre-written referral message
- At checkout, customers can enter **"Referred by"** (friend's name/code)
- That referrer's name appears in the WhatsApp order message → you give them a discount next time
- **Zero backend needed** — fully manual, honor-based system

### 🌐 Bilingual — English & Hindi
- Every single string on every page is fully localized
- Language toggle in the footer (persists via context)
- Covers: Homepage, Kundli Report, Store, Checkout, Contact, Gemstones, Astrology pages
- Hindi text includes Devanagari across all CTAs, labels, modals, and messages

### 🪐 Cosmic UI & Animations
- Solar system parallax background (4 orbiting rings with glowing planets)
- Scroll-linked parallax with `framer-motion` (`useScroll` + `useTransform`)
- Subtle opacity fade on scroll so content stays readable
- Dark cosmic palette: `#121212` base, `#B78E28` gold, `#E5D6C8` cream

### 📱 Mobile Responsive
- All form inputs use `flex` layout with `min-w-0` to prevent native date/time input overflow
- Hero section stacks properly on small screens
- Bottom navigation bar for mobile
- Font sizes scale correctly across breakpoints

### 📞 WhatsApp Contact Button
- Floating WhatsApp button on all pages
- Business number: **+91 6366 105 204**
- All CTAs (Contact, Checkout, Share) route through WhatsApp

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **PDF Generation** | `@react-pdf/renderer` |
| **Icons** | Lucide React |
| **Language** | TypeScript |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
astro-report/
├── app/
│   ├── page.tsx                    # Homepage (Hero, Store, Experts, Testimonials, Footer)
│   ├── layout.tsx                  # Root layout (providers, nav, WhatsApp button)
│   ├── report/page.tsx             # Free Kundli Report page
│   ├── store/page.tsx              # Premium Reports Store
│   ├── checkout/page.tsx           # Checkout with WhatsApp order dispatch
│   ├── gemstones/page.tsx          # Gemstone recommendations
│   ├── astrology/page.tsx          # Horoscope / Astrology tools
│   ├── contact/page.tsx            # Contact page
│   ├── success/page.tsx            # Order success page
│   ├── components/
│   │   ├── Chart/KundliChart.tsx   # SVG North Indian Kundli chart
│   │   ├── Form/BirthInputForm.tsx # Birth details form
│   │   ├── Form/LocationSearch.tsx # Geocoding location search
│   │   ├── PDF/ReportPDF.tsx       # PDF document with D1/D9 charts
│   │   ├── Navigation/             # Navbar, mobile bottom nav
│   │   └── Marketing/              # Sale banner, promotional components
│   └── context/
│       ├── LanguageContext.tsx     # EN/HI language toggle
│       ├── CartContext.tsx         # Shopping cart state
│       └── SaleContext.tsx         # Flash sale activation
├── lib/
│   ├── astro/actions.ts            # Kundli calculation engine
│   └── services/geocoding.ts      # Location → lat/lon/timezone
└── public/                         # Static assets
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Shivxnshjasathi/AstoReport.git

# Install dependencies
cd astro-report
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Business WhatsApp Number
Update the number in two places:

**`app/checkout/page.tsx`** — order dispatch:
```ts
window.open(`https://wa.me/916366105204?text=${message}`, '_blank');
```

**`app/layout.tsx`** — floating contact button:
```ts
href="https://wa.me/916366105204"
```

Replace `916366105204` with your number (country code + number, no `+` or spaces).

---

## 💰 Monetization Strategy

| Revenue Stream | Status |
|---|---|
| Premium PDF Reports (₹299–₹1499) | ✅ Store live |
| WhatsApp Consultation Booking | ✅ Contact flow live |
| Gemstone Shop | ✅ Page live |
| Referral Program | ✅ Post-order code generation |
| Flash Sales | ✅ Sale banner with timer |
| Payment Gateway (Razorpay) | 🔜 Planned |
| Database / User Accounts (Supabase) | 🔜 Planned |
| Live Astrologer Booking Calendar | 🔜 Planned |

---

## 📦 Key Dependencies

```json
{
  "next": "^15.x",
  "framer-motion": "^11.x",
  "@react-pdf/renderer": "^4.x",
  "lucide-react": "^0.x",
  "tailwindcss": "^4.x"
}
```

---

## 🌟 Business Contact

- **WhatsApp:** +91 6366 105 204
- **Platform:** [astro-report.vercel.app](https://astro-report.vercel.app)

---

*Built with ❤️ for the Indian astrology market. Powered by Vedic wisdom and modern web technology.*
