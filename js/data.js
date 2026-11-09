/* ------------------------------------------------------------------
   PORTFOLIO CONTENT
   Everything on the site is rendered from this one object.
   To add a project, copy one entry in `projects` and edit it.
   ------------------------------------------------------------------ */
window.PORTFOLIO = {
  name: "Abdirahman Farhan Aden",
  role: "Full-stack developer · Payments & commerce",
  location: "Kuala Lumpur, Malaysia",
  email: "abdulrahmanadam1011@gmail.com",
  available: true, // shows "Available for new projects"; set false for "Currently unavailable"
  headline: "Web products for *payments, commerce* and real-time operations.", // *text* is highlighted
  intro:
    "I'm a full-stack developer building checkout and ordering flows, payment verification and the live dashboards businesses run on. Secure by default, fast on any phone.",

  // "What I build": the niche, shown as three cards under the hero.
  services: [
    { icon: "card", title: "Payment & ordering flows", text: "Cart, checkout and order tracking with clear totals, payment status and verification that staff can trust." },
    { icon: "pulse", title: "Real-time dashboards", text: "Orders, stock and payments streamed to staff the moment they happen, with sales analytics built in." },
    { icon: "shield", title: "Secure back ends", text: "Role-based access, hashed credentials, signed tokens and row-level security on every table." }
  ],

  // Shown in the scrolling strip under the hero.
  stack: ["Node.js", "Express", "PostgreSQL", "Supabase", "Server-Sent Events", "Row Level Security", "PWA", "Tailwind CSS", "Render", "REST APIs"],

  about: [
    "I work across the whole stack: the interface customers see, the server and database behind it, and the deployment that keeps it running.",
    "My focus is the money path: ordering, payments and the operational dashboards around them, where accuracy, real-time updates and security matter more than anywhere else."
  ],

  links: [
    { label: "GitHub", href: "https://github.com/" },   // ← add your profile URL
    { label: "LinkedIn", href: "https://linkedin.com/" } // ← add your profile URL
  ],

  projects: [
    {
      id: "aden19",
      title: "Aden Nineteen",
      kind: "Ordering system",
      focus: "Orders · Payments · Live",
      year: "2026",
      tagline: "Table-side ordering with a live admin dashboard for an ice-cream brand.",
      cover: "assets/shots/hero-shakes.webp",
      gallery: ["assets/shots/hero-shakes.webp", "assets/shots/storefront.webp"],
      role: "Design, front end, back end, deployment",
      stack: ["Node.js", "Express", "PostgreSQL", "Supabase", "PWA"],
      summary:
        "Two connected apps. Customers scan a table QR code, build an order and pay. Staff run the shop from an admin dashboard where every order, payment and stock change appears live.",
      highlights: [
        "New orders appear in the dashboard instantly, with the table number, items and total.",
        "Marking an item out of stock updates every open customer menu at once.",
        "Order status and payment confirmation are pushed to the customer's phone in real time.",
        "Installable web app that works offline, with role-based access for staff and the owner.",
        "PostgreSQL on Supabase with row-level security, deployed on Render."
      ]
    },
    {
      id: "vantre",
      title: "VANTRE",
      kind: "E-commerce storefront",
      focus: "Catalogue · Cart",
      year: "2026",
      tagline: "An editorial online store for a premium streetwear label.",
      cover: "assets/shots/vantre.jpg",
      gallery: ["assets/shots/vantre.jpg"],
      role: "UI design, front end",
      stack: ["HTML", "CSS", "JavaScript"],
      summary:
        "A fashion storefront designed like a printed lookbook, with large type, a quiet palette and room for the photography.",
      highlights: [
        "Product listing with category filters and search.",
        "Slide-out shopping bag.",
        "Collections, brand story and newsletter sign-up."
      ]
    },
    {
      id: "laasgeel",
      title: "Café Laasgeel",
      kind: "Restaurant website",
      focus: "Menu · Bookings",
      year: "2026",
      tagline: "A website for one of Hargeisa's best-known cafés.",
      cover: "assets/shots/laasgeel.jpg",
      gallery: ["assets/shots/laasgeel.jpg"],
      role: "UI design, front end",
      stack: ["HTML", "Tailwind CSS", "JavaScript"],
      summary:
        "A website for a café and meeting space with a filterable menu, guest reviews, location details and meeting-room bookings.",
      highlights: [
        "Filterable menu with item details.",
        "Meeting-room enquiries and contact through WhatsApp.",
        "Opening hours, ratings and location visible straight away."
      ]
    },
    {
      id: "gem",
      title: "GemElectronics",
      kind: "Product catalogue",
      focus: "Catalogue · Enquiries",
      year: "2026",
      tagline: "A showroom catalogue that turns browsing into a WhatsApp enquiry.",
      cover: "assets/shots/gem.jpg",
      gallery: ["assets/shots/gem.jpg"],
      role: "UI design, front end",
      stack: ["HTML", "Tailwind CSS", "JavaScript"],
      summary:
        "A catalogue for an electronics showroom with more than 40 devices. Customers filter by category, then tap any product to ask about it on WhatsApp.",
      highlights: [
        "Category browsing and a filterable full catalogue.",
        "One-tap WhatsApp enquiry from every product.",
        "Brands and showroom contact sections."
      ]
    }
  ],

  skills: [
    { group: "Front end", items: ["HTML & CSS", "JavaScript", "Tailwind CSS", "Responsive design"] },
    { group: "Back end", items: ["Node.js", "Express", "REST APIs", "Authentication"] },
    { group: "Data", items: ["PostgreSQL", "Supabase", "Database design"] },
    { group: "Tools", items: ["Git", "Render", "PWAs"] }
  ]
};
