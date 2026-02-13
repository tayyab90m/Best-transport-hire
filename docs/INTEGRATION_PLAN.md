# BVM - Integration Plan

## Project Overview

BVM is a machinery rental website inspired by [qer.ae](https://www.qer.ae/). The application uses Next.js with JSON file storage for data persistence (no database required).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  Pages                    │  Components                         │
│  ├── Homepage             │  ├── Header (with dark mode toggle) │
│  ├── Catalog              │  ├── Footer                         │
│  ├── Machinery/[id]       │  ├── MachinerySlider                │
│  ├── About                │  ├── ReviewSlider                   │
│  ├── Services             │  ├── AvailabilityCheck              │
│  ├── Contact              │  ├── WhatsAppButton (floating)      │
│  ├── Reviews              │  ├── ContactForm                    │
│  ├── Gallery              │  ├── QuoteForm                      │
│  ├── Rental-Terms         │  ├── BookingForm                    │
│  ├── Quote                │  ├── LocationMap                    │
│  ├── Booking              │  ├── ThemeToggle                    │
│  └── Admin/[adminId]      │  └── ReviewForm                     │
├─────────────────────────────────────────────────────────────────┤
│                        API ROUTES                               │
│  ├── /api/machinery       → GET, PATCH (availability)           │
│  ├── /api/reviews         → GET, POST                           │
│  └── /api/admin/reviews   → PATCH (approve/reject)              │
├─────────────────────────────────────────────────────────────────┤
│                        DATA LAYER                               │
│  └── /data                                                      │
│      ├── machinery.json   → All machinery with availability     │
│      └── reviews.json     → User reviews with approval status   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Data Structure & API Routes

### 1.1 Create Data Files

#### `/data/machinery.json`
```json
{
  "categories": [
    "Excavators",
    "Dozers",
    "Articulated Trucks",
    "Motor Graders",
    "Diesel Generators",
    "Boom Lifts",
    "Wheel Loaders",
    "Cranes",
    "Compactors",
    "Backhoe Loaders"
  ],
  "machinery": [
    {
      "id": "exc-001",
      "name": "Caterpillar Excavator 320",
      "slug": "caterpillar-excavator-320",
      "category": "Excavators",
      "brand": "Caterpillar",
      "image": "/images/machinery/excavator-320.jpg",
      "gallery": [
        "/images/machinery/excavator-320-1.jpg",
        "/images/machinery/excavator-320-2.jpg"
      ],
      "description": "Heavy-duty excavator perfect for large construction projects.",
      "specifications": {
        "Operating Weight": "20,000 kg",
        "Engine Power": "162 HP",
        "Bucket Capacity": "1.2 m³",
        "Max Digging Depth": "6.7 m",
        "Max Reach": "9.9 m"
      },
      "rates": {
        "daily": 500,
        "weekly": 3000,
        "monthly": 10000
      },
      "available": true,
      "featured": true,
      "createdAt": "2024-01-01"
    }
  ]
}
```

#### `/data/reviews.json`
```json
{
  "reviews": [
    {
      "id": "rev-001",
      "userName": "Ahmed Al Maktoum",
      "category": "excellent",
      "description": "Outstanding service and quality equipment. The team was professional and the machinery was in perfect condition.",
      "createdAt": "2024-01-15T10:30:00Z",
      "approved": true
    }
  ]
}
```

### 1.2 API Routes Implementation

| Route | Method | Description |
|-------|--------|-------------|
| `/api/machinery` | GET | Fetch all machinery (with filters) |
| `/api/machinery/[id]` | GET | Fetch single machinery details |
| `/api/machinery/[id]/availability` | PATCH | Toggle availability status |
| `/api/reviews` | GET | Fetch approved reviews |
| `/api/reviews` | POST | Submit new review |
| `/api/admin/[adminId]/reviews` | GET | Fetch all reviews (admin) |
| `/api/admin/[adminId]/reviews/[reviewId]` | PATCH | Approve/reject review |

---

## Phase 2: Core Components

### 2.1 Layout Components

| Component | Description |
|-----------|-------------|
| `Header` | Logo, navigation, dark mode toggle, WhatsApp button |
| `Footer` | Links, contact info, social media, copyright |
| `ThemeProvider` | Context for dark/light mode state |
| `ThemeToggle` | Sun/Moon icon button to switch themes |

### 2.2 Machinery Components

| Component | Description |
|-----------|-------------|
| `MachinerySlider` | Horizontal scroll slider for machinery cards |
| `MachineryCard` | Card with image, name, price, availability badge |
| `MachineryGrid` | Grid layout for catalog page |
| `AvailabilityBadge` | Green/Red badge showing availability |
| `AvailabilityCheck` | Button/modal to check availability |
| `SpecificationTable` | Table showing machinery specs |

### 2.3 Form Components

| Component | Description |
|-----------|-------------|
| `ContactForm` | Name, email, phone, message |
| `QuoteForm` | Machinery selection, dates, contact info |
| `BookingForm` | Full booking with dates, delivery options |
| `ReviewForm` | Name, category dropdown, description |

### 2.4 UI Components

| Component | Description |
|-----------|-------------|
| `WhatsAppButton` | Floating button for WhatsApp chat |
| `ReviewSlider` | Horizontal slider for reviews |
| `ReviewCard` | Card showing review with rating badge |
| `LocationMap` | Embedded Google Maps |
| `HeroSlider` | Homepage hero banner slider |
| `StatsSection` | 500+ projects, 16 years experience |
| `BrandsSlider` | Client/brand logos slider |

---

## Phase 3: Pages Implementation

### 3.1 Homepage (`/`)
- Hero slider with CTAs
- Featured machinery horizontal slider
- Stats section (500+ projects, 16 years)
- USPs (Best Equipment, Certified, Cost Effective)
- Reviews slider (approved only)
- Brands/Clients section
- CTA section

### 3.2 Catalog (`/catalog`)
- Category filter sidebar/tabs
- Machinery grid with cards
- Each card shows availability badge
- Click card → machinery details page
- "Check Availability" button on each card

### 3.3 Machinery Details (`/machinery/[id]`)
- Large image gallery
- Full specifications table
- Rental rates (daily/weekly/monthly)
- Availability status with check button
- "Get Quote" button
- "Book Now" button
- WhatsApp contact button
- Related machinery slider

### 3.4 About Us (`/about`)
- Company story
- Mission & Vision
- Team section
- Stats (500+ projects, 16 years)
- Why choose us

### 3.5 Services (`/services`)
- Equipment rental categories
- Operator hire service
- Maintenance support
- Delivery options

### 3.6 Contact (`/contact`)
- Contact form
- Phone numbers
- Email addresses
- Location map (Google Maps embed)
- Office address

### 3.7 Reviews (`/reviews`)
- All approved reviews grid
- Submit review form
- Category filter (bad, good, very good, excellent)

### 3.8 Gallery (`/gallery`)
- Photo grid of projects
- Lightbox on click
- Category filters

### 3.9 Rental Terms (`/rental-terms`)
- Terms and conditions
- Rental policies
- Payment terms
- Insurance requirements

### 3.10 Quote (`/quote`)
- Quote request form
- Machinery multi-select
- Date range picker
- Contact details
- Special requirements

### 3.11 Booking (`/booking`)
- Full booking form
- Machinery selection
- Rental period
- Delivery options
- Payment info
- Terms acceptance

### 3.12 Admin Panel (`/admin/[adminId]`)
- Protected by secret adminId in URL
- View all reviews (approved & pending)
- Approve/reject reviews toggle
- Update machinery availability

---

## Phase 4: Features Implementation

### 4.1 Dark/Light Mode
```
- ThemeProvider context wrapping app
- ThemeToggle component in header
- Persist preference in localStorage
- CSS variables for colors (already set up)
```

### 4.2 WhatsApp Integration
```javascript
const WHATSAPP_NUMBER = "+971XXXXXXXXX";

// Generate WhatsApp link
function getWhatsAppLink(message = "Hello, I'm interested in renting equipment") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// On machinery page, pre-fill with machinery name
function getMachineryWhatsAppLink(machineryName) {
  const message = `Hello, I'm interested in renting: ${machineryName}`;
  return getWhatsAppLink(message);
}
```

### 4.3 Availability Check
```
- Each machinery has `available: boolean` in JSON
- Display green/red badge on cards
- "Check Availability" button opens modal
- Modal shows current status + contact option
- Admin can toggle availability via API
```

### 4.4 Review System
```
Review Categories (dropdown):
- bad
- good  
- very_good
- excellent

Submit Flow:
1. User fills form (name, category, description)
2. POST to /api/reviews
3. Review saved with approved: false
4. Admin reviews at /admin/[adminId]
5. Admin approves → appears on site

Display:
- Homepage: Latest 5 approved reviews in slider
- Reviews page: All approved reviews
```

### 4.5 SEO Implementation
```javascript
// Each page exports metadata
export const metadata = {
  title: "Page Title | BVM Equipment Rental",
  description: "Page description for search engines",
  keywords: "relevant, keywords, here",
  openGraph: {
    title: "Page Title",
    description: "Description for social sharing",
    images: ["/images/og-image.jpg"],
  },
};
```

---

## Phase 5: File Structure

```
bvm/
├── app/
│   ├── layout.js
│   ├── page.js                    # Homepage
│   ├── globals.css
│   │
│   ├── catalog/
│   │   └── page.js
│   │
│   ├── machinery/
│   │   └── [id]/
│   │       └── page.js
│   │
│   ├── about/
│   │   └── page.js
│   │
│   ├── services/
│   │   └── page.js
│   │
│   ├── contact/
│   │   └── page.js
│   │
│   ├── reviews/
│   │   └── page.js
│   │
│   ├── gallery/
│   │   └── page.js
│   │
│   ├── rental-terms/
│   │   └── page.js
│   │
│   ├── quote/
│   │   └── page.js
│   │
│   ├── booking/
│   │   └── page.js
│   │
│   ├── admin/
│   │   └── [adminId]/
│   │       └── page.js
│   │
│   └── api/
│       ├── machinery/
│       │   ├── route.js           # GET all, POST new
│       │   └── [id]/
│       │       ├── route.js       # GET single
│       │       └── availability/
│       │           └── route.js   # PATCH toggle
│       │
│       ├── reviews/
│       │   └── route.js           # GET approved, POST new
│       │
│       └── admin/
│           └── [adminId]/
│               └── reviews/
│                   ├── route.js   # GET all reviews
│                   └── [reviewId]/
│                       └── route.js # PATCH approve/reject
│
├── components/
│   ├── layout/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Navigation.js
│   │
│   ├── ui/
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Badge.js
│   │   ├── Modal.js
│   │   └── Slider.js
│   │
│   ├── machinery/
│   │   ├── MachineryCard.js
│   │   ├── MachinerySlider.js
│   │   ├── MachineryGrid.js
│   │   ├── AvailabilityBadge.js
│   │   ├── AvailabilityCheck.js
│   │   └── SpecificationTable.js
│   │
│   ├── forms/
│   │   ├── ContactForm.js
│   │   ├── QuoteForm.js
│   │   ├── BookingForm.js
│   │   └── ReviewForm.js
│   │
│   ├── reviews/
│   │   ├── ReviewCard.js
│   │   └── ReviewSlider.js
│   │
│   ├── home/
│   │   ├── HeroSlider.js
│   │   ├── StatsSection.js
│   │   ├── USPSection.js
│   │   └── BrandsSlider.js
│   │
│   └── shared/
│       ├── WhatsAppButton.js
│       ├── ThemeToggle.js
│       ├── LocationMap.js
│       └── SEOHead.js
│
├── context/
│   └── ThemeContext.js
│
├── data/
│   ├── machinery.json
│   └── reviews.json
│
├── lib/
│   ├── utils.js
│   ├── constants.js              # WhatsApp number, admin ID, etc.
│   └── api.js                    # API helper functions
│
├── public/
│   └── images/
│       ├── logo.png
│       ├── og-image.jpg
│       ├── machinery/
│       ├── gallery/
│       └── brands/
│
└── docs/
    └── INTEGRATION_PLAN.md
```

---

## Phase 6: Implementation Order

### Week 1: Foundation
- [ ] Create data files with sample data
- [ ] Implement API routes for machinery
- [ ] Implement API routes for reviews
- [ ] Create base UI components (Button, Card, Badge)
- [ ] Create Header with navigation
- [ ] Create Footer
- [ ] Implement ThemeToggle

### Week 2: Core Pages
- [ ] Build Homepage with all sections
- [ ] Build Catalog page with grid
- [ ] Build Machinery details page
- [ ] Implement MachinerySlider component
- [ ] Implement AvailabilityCheck feature

### Week 3: Forms & Interactions
- [ ] Build Contact page with form
- [ ] Build Quote page with form
- [ ] Build Booking page with form
- [ ] Implement WhatsApp floating button
- [ ] Implement LocationMap component

### Week 4: Reviews & Admin
- [ ] Build Reviews page
- [ ] Implement ReviewForm
- [ ] Build Admin panel
- [ ] Implement review approval flow
- [ ] Add machinery availability toggle

### Week 5: Polish
- [ ] Build About page
- [ ] Build Services page
- [ ] Build Gallery page
- [ ] Build Rental Terms page
- [ ] SEO optimization for all pages
- [ ] Mobile responsiveness testing
- [ ] Final testing & bug fixes

---

## Configuration Constants

Create `/lib/constants.js`:

```javascript
export const SITE_CONFIG = {
  name: "BVM",
  tagline: "Quality Equipment Rental",
  description: "Premium construction equipment rental services",
  
  contact: {
    phone: "+971 800 XXX",
    email: "info@bvm.ae",
    whatsapp: "+971XXXXXXXXX",
    address: "Dubai, UAE",
  },
  
  stats: {
    projects: "500+",
    experience: "16+",
  },
  
  social: {
    facebook: "https://facebook.com/bvm",
    instagram: "https://instagram.com/bvm",
    linkedin: "https://linkedin.com/company/bvm",
  },
  
  // Secret admin ID for admin panel access
  adminId: "bvm-admin-2024-secure",
  
  reviewCategories: [
    { value: "bad", label: "Bad", color: "red" },
    { value: "good", label: "Good", color: "yellow" },
    { value: "very_good", label: "Very Good", color: "blue" },
    { value: "excellent", label: "Excellent", color: "green" },
  ],
};
```

---

## Notes

1. **No Database**: All data stored in JSON files, read/written via Node.js fs module
2. **Admin Access**: Via secret URL `/admin/[adminId]` - adminId stored in constants
3. **Reviews Moderation**: All reviews require admin approval before displaying
4. **Availability**: Simple boolean toggle, admin can update via admin panel
5. **WhatsApp**: Direct link integration, no API needed
6. **Images**: Store in `/public/images/` - use Next.js Image component
7. **SEO**: Each page has its own metadata export
8. **Mobile**: Tailwind responsive classes throughout

---

## Ready to Start?

Begin with Phase 1: Create data files and API routes, then proceed to components and pages.

