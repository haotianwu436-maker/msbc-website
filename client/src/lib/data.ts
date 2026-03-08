/**
 * MSBC CMS Data Layer
 * ==================
 * This file simulates a CMS-driven data layer.
 * All content is structured and edition-based, ready to be replaced
 * with a real CMS (Sanity, Strapi, etc.) in the future.
 *
 * Design: "Stage Presence" — Void Black + Electric Blue + Platinum White
 */

// ─── Asset URLs ────────────────────────────────────────────────
export const ASSETS = {
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663282897218/48K9mgtVa6h5enFoNy8tHy/msbc-hero-v2-QTnD2kMnhYXpdyrofnZjVr.webp",
  hackathonBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663282897218/48K9mgtVa6h5enFoNy8tHy/msbc-hackathon-v2-UcWKBe7XuEo5jBZcxdPYWA.webp",
  sponsorsBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663282897218/48K9mgtVa6h5enFoNy8tHy/msbc-sponsors-v2-6YwN7HuP5eDgCvJBQRS3pD.webp",
  aboutVisual: "https://d2xsxph8kpxj0f.cloudfront.net/310519663282897218/48K9mgtVa6h5enFoNy8tHy/msbc-about-v2-Ne9CZXSBwLU4M9PvbzZgxA.webp",
  patternAbstract: "https://d2xsxph8kpxj0f.cloudfront.net/310519663282897218/48K9mgtVa6h5enFoNy8tHy/msbc-hackathon-v2-UcWKBe7XuEo5jBZcxdPYWA.webp",
} as const;

// ─── Site Settings ─────────────────────────────────────────────
export const siteSettings = {
  siteName: "MSBC",
  defaultSeoTitle: "MSBC 2026 — Malaysia Student Blockchain Conference",
  defaultSeoDescription: "Where campus talent meets the Web3 ecosystem. Built in Kuala Lumpur for the next generation of Web3 talent.",
  primaryContactEmail: "hello@msbc.my",
  currentEditionSlug: "2026",
  socialLinks: [
    { platform: "twitter", url: "https://twitter.com/msbc_my", label: "X (Twitter)" },
    { platform: "telegram", url: "https://t.me/msbc_my", label: "Telegram" },
    { platform: "linkedin", url: "https://linkedin.com/company/msbc", label: "LinkedIn" },
    { platform: "instagram", url: "https://instagram.com/msbc_my", label: "Instagram" },
  ],
};

// ─── Event Edition ─────────────────────────────────────────────
export const eventEdition = {
  editionYear: 2026,
  editionSlug: "2026",
  eventTitle: "Malaysia Student Blockchain Conference 2026",
  eventTagline: "Where campus talent meets the Web3 ecosystem.",
  city: "Kuala Lumpur",
  country: "Malaysia",
  startDate: "2026-08-15",
  endDate: "2026-08-17",
  countdownTarget: "2026-08-15T09:00:00+08:00",
  registrationStatus: "open" as const,
  primaryRegistrationUrl: "https://lu.ma/msbc2026",
  themeLabel: "Building the Next Generation",
  homepageNotice: "",
  publishedStatus: true,
};

// ─── Homepage Content ──────────────────────────────────────────
export const homepageContent = {
  hero: {
    title: "Malaysia Student Blockchain Conference 2026",
    headline: "Where campus talent meets the Web3 ecosystem.",
    supportingCopy: "Built in Kuala Lumpur for the next generation of Web3 talent, MSBC brings together students, builders, and ecosystem leaders from across Asia.",
    brandLine: "Built in Kuala Lumpur. Connected across Asia.",
    primaryCta: { label: "Register Now", url: "/2026/tickets" },
    secondaryCta: { label: "Become a Sponsor", url: "/2026/become-a-sponsor" },
  },
  about: {
    sectionTitle: "About MSBC",
    bodyCopy: "MSBC is a university-backed Web3 conference built for the next generation of builders, thinkers, and ecosystem leaders. Held in Kuala Lumpur, the event brings together students, industry voices, emerging talent, and ambitious ideas through conference programming, hackathon experiences, and cross-campus collaboration.",
  },
  stats: [
    { label: "Expected Attendees", value: "700+" },
    { label: "Universities", value: "15+" },
    { label: "Speakers", value: "30+" },
    { label: "Days", value: "3" },
  ],
  speakers: {
    sectionTitle: "Meet the Speakers",
    bodyCopy: "Meet the founders, builders, researchers, and ecosystem leaders shaping the future of Web3.",
    ctaLabel: "View All Speakers",
    ctaUrl: "/2026/speakers",
  },
  agenda: {
    sectionTitle: "Conference Agenda",
    bodyCopy: "Explore a curated program of keynotes, panels, workshops, and conversations designed for the next generation of Web3 talent.",
    ctaLabel: "View Full Agenda",
    ctaUrl: "/2026/agenda",
  },
  hackathon: {
    sectionTitle: "Hackathon & Build at MSBC",
    bodyCopy: "From ideas to prototypes, the MSBC hackathon is where students, builders, and mentors come together to create what's next.",
    ctaLabel: "Explore Hackathon",
    ctaUrl: "/2026/hackathon",
  },
  universities: {
    sectionTitle: "Participating Universities",
    bodyCopy: "MSBC is supported by a growing network of universities, student communities, and campus leaders across Kuala Lumpur.",
    ctaLabel: "See Participating Universities",
    ctaUrl: "/2026/universities",
  },
  sponsors: {
    sectionTitle: "Sponsors & Partners",
    bodyCopy: "Backed by partners across the ecosystem, MSBC brings students, industry, and opportunity into one shared platform.",
    cta1Label: "View Sponsors",
    cta1Url: "/2026/sponsors",
    cta2Label: "Become a Sponsor",
    cta2Url: "/2026/become-a-sponsor",
  },
  faq: {
    sectionTitle: "FAQ",
    bodyCopy: "Find answers to the most common questions about registration, participation, hackathon access, sponsorship, and more.",
    ctaLabel: "View All FAQs",
    ctaUrl: "/2026/faq",
  },
  contact: {
    sectionTitle: "Get in Touch",
    bodyCopy: "Whether you are a student, sponsor, university partner, or community collaborator, we'd love to hear from you.",
    ctaLabel: "Contact the Team",
    ctaUrl: "/2026/contact",
  },
};

// ─── Speakers ──────────────────────────────────────────────────
export interface Speaker {
  speakerId: string;
  fullName: string;
  photo: string;
  title: string;
  organisation: string;
  shortBio: string;
  topicTags: string[];
  socialLinks: { platform: string; url: string }[];
  featured: boolean;
  sortOrder: number;
}

export const speakers: Speaker[] = [
  {
    speakerId: "sp-001",
    fullName: "Dr. Sarah Chen",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    title: "Head of Research",
    organisation: "Ethereum Foundation",
    shortBio: "Leading zero-knowledge proof research and Ethereum scalability initiatives across Asia-Pacific.",
    topicTags: ["ZK Proofs", "Ethereum", "Scalability"],
    socialLinks: [{ platform: "twitter", url: "#" }],
    featured: true,
    sortOrder: 1,
  },
  {
    speakerId: "sp-002",
    fullName: "Marcus Wong",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    title: "Co-Founder & CEO",
    organisation: "ChainBridge Labs",
    shortBio: "Building cross-chain infrastructure for the next billion users in Southeast Asia.",
    topicTags: ["DeFi", "Cross-chain", "Infrastructure"],
    socialLinks: [{ platform: "twitter", url: "#" }],
    featured: true,
    sortOrder: 2,
  },
  {
    speakerId: "sp-003",
    fullName: "Aisha Rahman",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    title: "VP of Ecosystem",
    organisation: "Solana Foundation",
    shortBio: "Driving developer adoption and university partnerships across the Solana ecosystem.",
    topicTags: ["Solana", "Developer Relations", "Ecosystem"],
    socialLinks: [{ platform: "twitter", url: "#" }],
    featured: true,
    sortOrder: 3,
  },
  {
    speakerId: "sp-004",
    fullName: "James Liu",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    title: "Partner",
    organisation: "Paradigm Ventures",
    shortBio: "Investing in early-stage Web3 protocols and infrastructure across emerging markets.",
    topicTags: ["VC", "Investment", "Web3"],
    socialLinks: [{ platform: "twitter", url: "#" }],
    featured: true,
    sortOrder: 4,
  },
  {
    speakerId: "sp-005",
    fullName: "Dr. Priya Nair",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    title: "Professor of Computer Science",
    organisation: "University of Malaya",
    shortBio: "Researching blockchain applications in governance and digital identity systems.",
    topicTags: ["Academic", "Digital Identity", "Governance"],
    socialLinks: [{ platform: "linkedin", url: "#" }],
    featured: true,
    sortOrder: 5,
  },
  {
    speakerId: "sp-006",
    fullName: "Kevin Park",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    title: "CTO",
    organisation: "MetaDAO Protocol",
    shortBio: "Architecting decentralized governance systems for the next generation of DAOs.",
    topicTags: ["DAOs", "Governance", "Smart Contracts"],
    socialLinks: [{ platform: "twitter", url: "#" }],
    featured: false,
    sortOrder: 6,
  },
];

// ─── Agenda Sessions ───────────────────────────────────────────
export interface AgendaSession {
  sessionId: string;
  title: string;
  shortDescription: string;
  date: string;
  startTime: string;
  endTime: string;
  format: string;
  track: string;
  stage: string;
  speakerIds: string[];
  featured: boolean;
  sortOrder: number;
}

export const agendaSessions: AgendaSession[] = [
  {
    sessionId: "ses-001",
    title: "Opening Keynote: The State of Web3 in Asia",
    shortDescription: "A comprehensive overview of the Web3 landscape across Asia, highlighting key trends, challenges, and opportunities for the next generation.",
    date: "2026-08-15",
    startTime: "09:00",
    endTime: "09:45",
    format: "keynote",
    track: "Main Stage",
    stage: "Main Hall",
    speakerIds: ["sp-001"],
    featured: true,
    sortOrder: 1,
  },
  {
    sessionId: "ses-002",
    title: "Panel: Building Cross-Chain Infrastructure",
    shortDescription: "Industry leaders discuss the future of interoperability and what it means for developers building in a multi-chain world.",
    date: "2026-08-15",
    startTime: "10:00",
    endTime: "10:45",
    format: "panel",
    track: "Main Stage",
    stage: "Main Hall",
    speakerIds: ["sp-002", "sp-004"],
    featured: true,
    sortOrder: 2,
  },
  {
    sessionId: "ses-003",
    title: "Workshop: Smart Contract Security Fundamentals",
    shortDescription: "Hands-on workshop covering common vulnerabilities, auditing techniques, and best practices for secure smart contract development.",
    date: "2026-08-15",
    startTime: "11:00",
    endTime: "12:30",
    format: "workshop",
    track: "Builder Track",
    stage: "Workshop Room A",
    speakerIds: ["sp-006"],
    featured: true,
    sortOrder: 3,
  },
  {
    sessionId: "ses-004",
    title: "Fireside Chat: From Campus to Web3 Career",
    shortDescription: "An intimate conversation about navigating the transition from university to a career in the Web3 ecosystem.",
    date: "2026-08-15",
    startTime: "14:00",
    endTime: "14:45",
    format: "fireside_chat",
    track: "Career Track",
    stage: "Main Hall",
    speakerIds: ["sp-003", "sp-005"],
    featured: false,
    sortOrder: 4,
  },
  {
    sessionId: "ses-005",
    title: "Panel: University Blockchain Research in Southeast Asia",
    shortDescription: "Academic leaders share their perspectives on blockchain research, curriculum development, and student engagement.",
    date: "2026-08-16",
    startTime: "09:30",
    endTime: "10:15",
    format: "panel",
    track: "Academic Track",
    stage: "Main Hall",
    speakerIds: ["sp-005"],
    featured: false,
    sortOrder: 5,
  },
  {
    sessionId: "ses-006",
    title: "Hackathon Kickoff & Team Formation",
    shortDescription: "Official launch of the MSBC hackathon with challenge presentations, mentor introductions, and team formation activities.",
    date: "2026-08-16",
    startTime: "14:00",
    endTime: "15:00",
    format: "hackathon_session",
    track: "Hackathon",
    stage: "Hackathon Arena",
    speakerIds: [],
    featured: true,
    sortOrder: 6,
  },
];

// ─── Sponsors ──────────────────────────────────────────────────
export interface Sponsor {
  sponsorId: string;
  companyName: string;
  logo: string;
  tier: "title" | "platinum" | "gold" | "silver" | "community_partner" | "university_partner" | "media_partner";
  websiteUrl: string;
  shortDescription: string;
  featured: boolean;
  displayOrder: number;
}

export const sponsors: Sponsor[] = [
  { sponsorId: "spo-001", companyName: "Ethereum Foundation", logo: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=200&h=200&fit=crop", tier: "title", websiteUrl: "#", shortDescription: "Supporting the Ethereum ecosystem", featured: true, displayOrder: 1 },
  { sponsorId: "spo-002", companyName: "Solana Foundation", logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=200&h=200&fit=crop", tier: "platinum", websiteUrl: "#", shortDescription: "Powering fast, scalable blockchain", featured: true, displayOrder: 2 },
  { sponsorId: "spo-003", companyName: "Polygon Labs", logo: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=200&h=200&fit=crop", tier: "gold", websiteUrl: "#", shortDescription: "Scaling Ethereum for all", featured: true, displayOrder: 3 },
  { sponsorId: "spo-004", companyName: "Chainlink", logo: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=200&h=200&fit=crop", tier: "gold", websiteUrl: "#", shortDescription: "Decentralized oracle networks", featured: false, displayOrder: 4 },
  { sponsorId: "spo-005", companyName: "Binance Academy", logo: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=200&h=200&fit=crop", tier: "silver", websiteUrl: "#", shortDescription: "Blockchain education platform", featured: false, displayOrder: 5 },
  { sponsorId: "spo-006", companyName: "University of Malaya", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", tier: "university_partner", websiteUrl: "#", shortDescription: "Leading research university", featured: false, displayOrder: 6 },
];

// ─── Universities ──────────────────────────────────────────────
export interface University {
  universityId: string;
  universityName: string;
  logo: string;
  category: "organising" | "participating" | "student_club";
  roleDescription: string;
  websiteUrl: string;
  city: string;
  displayOrder: number;
}

export const universities: University[] = [
  { universityId: "uni-001", universityName: "University of Malaya", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop", category: "organising", roleDescription: "Lead organising university", websiteUrl: "#", city: "Kuala Lumpur", displayOrder: 1 },
  { universityId: "uni-002", universityName: "Universiti Teknologi Malaysia", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=200&fit=crop", category: "organising", roleDescription: "Co-organising university", websiteUrl: "#", city: "Kuala Lumpur", displayOrder: 2 },
  { universityId: "uni-003", universityName: "Monash University Malaysia", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop&crop=center", category: "participating", roleDescription: "Participating university", websiteUrl: "#", city: "Subang Jaya", displayOrder: 3 },
  { universityId: "uni-004", universityName: "Taylor's University", logo: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=200&h=200&fit=crop", category: "participating", roleDescription: "Participating university", websiteUrl: "#", city: "Subang Jaya", displayOrder: 4 },
  { universityId: "uni-005", universityName: "INTI International University", logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=200&fit=crop", category: "participating", roleDescription: "Participating university", websiteUrl: "#", city: "Nilai", displayOrder: 5 },
  { universityId: "uni-006", universityName: "Asia Pacific University", logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=200&fit=crop", category: "participating", roleDescription: "Participating university", websiteUrl: "#", city: "Kuala Lumpur", displayOrder: 6 },
];

// ─── FAQ Items ─────────────────────────────────────────────────
export interface FaqItem {
  faqId: string;
  category: "general" | "registration" | "hackathon" | "sponsorship" | "university";
  question: string;
  answer: string;
  sortOrder: number;
}

export const faqItems: FaqItem[] = [
  { faqId: "faq-001", category: "general", question: "What is MSBC?", answer: "MSBC, or Malaysia Student Blockchain Conference, is a university-backed Web3 conference designed for the next generation of builders, thinkers, and ecosystem leaders. It brings together students, industry voices, emerging talent, and ambitious ideas through talks, collaboration, and hackathon experiences.", sortOrder: 1 },
  { faqId: "faq-002", category: "general", question: "Who is MSBC for?", answer: "MSBC is designed for students, builders, developers, university communities, ecosystem partners, and anyone interested in the future of Web3. Whether you are exploring the space or already building in it, the event is designed to create meaningful connections and opportunities.", sortOrder: 2 },
  { faqId: "faq-003", category: "registration", question: "How do I register for the event?", answer: "Registration for MSBC will be handled through Luma. You will be able to access the registration link directly from the website.", sortOrder: 3 },
  { faqId: "faq-004", category: "registration", question: "Do I need a ticket to attend?", answer: "Attendance and registration details will be shared on the Tickets page. Depending on the event format, different access types or registration flows may apply.", sortOrder: 4 },
  { faqId: "faq-005", category: "hackathon", question: "Is there a hackathon?", answer: "Yes. MSBC includes a hackathon experience designed for students and emerging builders who want to turn ideas into real projects, collaborate with others, and engage with mentors and the wider ecosystem.", sortOrder: 5 },
  { faqId: "faq-006", category: "hackathon", question: "How do I join the hackathon?", answer: "Hackathon applications or registration will be shared through the official Hackathon page. Details such as application status, timelines, and participation requirements will be updated there.", sortOrder: 6 },
  { faqId: "faq-007", category: "hackathon", question: "Can beginners join MSBC or the hackathon?", answer: "Yes. MSBC is designed to welcome both experienced builders and newcomers who want to learn, explore, and connect with the Web3 ecosystem.", sortOrder: 7 },
  { faqId: "faq-008", category: "general", question: "Who will be speaking at the event?", answer: "MSBC will feature speakers from across the Web3 ecosystem, including builders, founders, researchers, and industry leaders. The full lineup will be published on the Speakers page.", sortOrder: 8 },
  { faqId: "faq-009", category: "general", question: "What can I expect from the agenda?", answer: "The agenda will include keynotes, panels, workshops, and other program formats designed to bring together students, builders, and ecosystem participants in one shared conference experience.", sortOrder: 9 },
  { faqId: "faq-010", category: "university", question: "Which universities are participating?", answer: "MSBC is supported by participating universities, student communities, and campus leaders, with more details available on the Participating Universities page.", sortOrder: 10 },
  { faqId: "faq-011", category: "university", question: "Can my university or student organisation get involved?", answer: "Yes. Universities, student societies, and campus communities interested in participating or collaborating can reach out through the Contact page.", sortOrder: 11 },
  { faqId: "faq-012", category: "sponsorship", question: "How can a company sponsor MSBC?", answer: "Companies and ecosystem partners interested in supporting the event can visit the Become a Sponsor page to learn more about sponsorship opportunities and get in touch with the team.", sortOrder: 12 },
  { faqId: "faq-013", category: "sponsorship", question: "What kinds of sponsorship opportunities are available?", answer: "Sponsorship opportunities may include brand visibility, ecosystem engagement, hackathon support, and other partnership formats. Full details will be shared through the sponsor inquiry process or sponsor deck.", sortOrder: 13 },
  { faqId: "faq-014", category: "general", question: "How can I contact the organisers?", answer: "You can reach the MSBC team through the Contact page, where dedicated contact options for general inquiries, sponsorship, partnerships, and other questions will be provided.", sortOrder: 14 },
];

// ─── Contact Methods ───────────────────────────────────────────
export interface ContactMethod {
  contactId: string;
  contactType: "sponsorship" | "media" | "community" | "general";
  label: string;
  description: string;
  ctaLabel: string;
  email: string;
  displayOrder: number;
}

export const contactMethods: ContactMethod[] = [
  { contactId: "ct-001", contactType: "sponsorship", label: "Sponsorship", description: "If your organisation is interested in supporting MSBC through sponsorship or partnership, we'd be glad to explore the right fit together.", ctaLabel: "Contact Sponsorship Team", email: "sponsors@msbc.my", displayOrder: 1 },
  { contactId: "ct-002", contactType: "media", label: "Media", description: "Journalists, media partners, and content platforms interested in covering MSBC are welcome to get in touch.", ctaLabel: "Contact Media Team", email: "media@msbc.my", displayOrder: 2 },
  { contactId: "ct-003", contactType: "community", label: "Community Collaboration", description: "If you are part of a student community, builder group, or ecosystem network and would like to collaborate with MSBC, we'd love to connect.", ctaLabel: "Explore Collaboration", email: "community@msbc.my", displayOrder: 3 },
  { contactId: "ct-004", contactType: "general", label: "Other Inquiries", description: "For all other questions related to MSBC, feel free to reach out and the team will direct your message to the right contact.", ctaLabel: "General Contact", email: "hello@msbc.my", displayOrder: 4 },
];

// ─── Hackathon Content ─────────────────────────────────────────
export const hackathonContent = {
  pageTitle: "Build at MSBC 2026",
  heroHeadline: "Where ambitious builders begin.",
  heroSupportingCopy: "The MSBC hackathon is built for students and emerging builders ready to turn ideas into real projects, connect with mentors, and step into the wider Web3 ecosystem.",
  heroPrimaryCta: { label: "Start Building", url: "https://lu.ma/msbc2026-hackathon" },
  whyJoin: {
    title: "Why Build at MSBC",
    bodyCopy: "More than a competition, the MSBC hackathon is a platform for students to explore ideas, build with others, and gain exposure to the people and opportunities shaping Web3.",
  },
  tracks: {
    title: "Build Tracks",
    introCopy: "Explore challenge areas designed to inspire new ideas, practical experimentation, and meaningful projects across the Web3 ecosystem.",
    items: [
      { name: "DeFi & Financial Infrastructure", description: "Build tools, protocols, or interfaces that reimagine financial systems using decentralized technology.", icon: "coins" },
      { name: "Social & Identity", description: "Create solutions for digital identity, reputation systems, or decentralized social platforms.", icon: "users" },
      { name: "Public Goods & Governance", description: "Design mechanisms for community coordination, voting, or public goods funding.", icon: "landmark" },
      { name: "Open Track", description: "Build anything that pushes the boundaries of what's possible with blockchain technology.", icon: "rocket" },
    ],
  },
  opportunities: {
    title: "Opportunities Beyond the Build",
    bodyCopy: "From project exposure to mentorship and ecosystem connections, the hackathon is designed to help students turn building into momentum.",
  },
  mentorsJudges: {
    title: "Mentors & Judges",
    bodyCopy: "Learn from builders, founders, and ecosystem leaders who bring experience, feedback, and perspective to the hackathon journey.",
  },
  timeline: {
    title: "Hackathon Timeline",
    introCopy: "Follow the journey from registration and team formation to building, submission, and final presentations.",
    items: [
      { phase: "Registration Opens", date: "June 2026", description: "Sign up and form your team" },
      { phase: "Kickoff & Team Formation", date: "August 16, 2026", description: "Official launch with challenge presentations" },
      { phase: "Building Phase", date: "August 16–17, 2026", description: "48 hours of building and mentorship" },
      { phase: "Submissions Due", date: "August 17, 2026", description: "Submit your project for judging" },
      { phase: "Demo Day & Awards", date: "August 17, 2026", description: "Present to judges and the community" },
    ],
  },
  rules: {
    title: "Rules & Eligibility",
    introCopy: "Everything you need to know before you start building, including eligibility, team requirements, submission rules, and participation guidelines.",
  },
  faq: {
    title: "Hackathon FAQ",
    introCopy: "Find answers to the most common questions about eligibility, teams, submissions, and how the hackathon works.",
  },
  finalCta: {
    title: "Ready to Build?",
    bodyCopy: "Start building with ambitious students and take your first step into a bigger Web3 ecosystem.",
    ctaLabel: "Start Building",
    ctaUrl: "https://lu.ma/msbc2026-hackathon",
  },
};

// ─── Become a Sponsor Content ──────────────────────────────────
export const becomeSponsorContent = {
  pageTitle: "Become a Sponsor",
  heroHeadline: "Back the builders of tomorrow.",
  heroSupportingCopy: "MSBC offers sponsors a premium platform for brand visibility, ecosystem credibility, and meaningful engagement with the next generation of Web3 talent.",
  heroPrimaryCta: { label: "Become a Sponsor", url: "mailto:sponsors@msbc.my" },
  whySponsor: {
    title: "Why Sponsor MSBC",
    bodyCopy: "MSBC brings together students, builders, universities, and ecosystem voices in one ambitious conference experience. Sponsoring the event means more than visibility — it means showing up where future talent, ideas, and momentum are being shaped.",
  },
  audience: {
    title: "A Platform Built for Visibility and Credibility",
    bodyCopy: "From Kuala Lumpur to the wider Asian Web3 ecosystem, MSBC creates a space where sponsors can engage with emerging talent, strengthen ecosystem presence, and be seen alongside universities, builders, and industry leaders.",
  },
  opportunities: {
    title: "Sponsorship Opportunities",
    introCopy: "MSBC offers flexible ways for partners to contribute to the conference experience, support student talent, and build meaningful visibility across the ecosystem.",
    tiers: [
      { name: "Title Sponsor", benefits: ["Exclusive naming rights", "Main stage branding", "VIP access & speaking slot", "Premium booth placement", "All digital & print materials"] },
      { name: "Platinum", benefits: ["Main stage branding", "Speaking opportunity", "Premium booth", "Digital materials", "Social media features"] },
      { name: "Gold", benefits: ["Stage branding", "Booth space", "Digital materials", "Social media mention"] },
      { name: "Silver", benefits: ["Logo placement", "Digital materials", "Social media mention"] },
      { name: "Community Partner", benefits: ["Logo on website", "Community cross-promotion", "Event access"] },
    ],
  },
  whyItMatters: {
    title: "Why It Matters",
    bodyCopy: "The strongest brands in Web3 are not only seen — they are trusted. Sponsoring MSBC helps place your brand within a credible ecosystem shaped by universities, builders, and future-facing collaboration.",
  },
  sponsorDeck: {
    title: "Request Sponsorship Details",
    bodyCopy: "Get the full overview of sponsor packages, visibility opportunities, and collaboration options.",
  },
  inquiry: {
    title: "Start the Conversation",
    bodyCopy: "If your team is interested in supporting MSBC, we'd love to explore how we can build a meaningful partnership together.",
    ctaLabel: "Become a Sponsor",
    ctaUrl: "mailto:sponsors@msbc.my",
  },
  finalCta: {
    title: "Partner with the Next Generation",
    bodyCopy: "Join MSBC and help shape a conference where visibility, credibility, and future talent come together.",
    ctaLabel: "Become a Sponsor",
    ctaUrl: "mailto:sponsors@msbc.my",
  },
};

// ─── Contact Page Content ──────────────────────────────────────
export const contactPageContent = {
  pageTitle: "Get in Touch",
  heroHeadline: "Let's build something meaningful together.",
  heroSupportingCopy: "Whether you are exploring sponsorship, media collaboration, or community partnership opportunities, we'd love to hear from you.",
  intro: {
    title: "Connect With the MSBC Team",
    bodyCopy: "If you are interested in working with MSBC, covering the event, or building a meaningful collaboration, the team can be reached through the contact options below.",
  },
  social: {
    title: "Follow the Journey",
    bodyCopy: "Stay connected with MSBC through our official channels for updates, announcements, and community activity.",
  },
  finalCta: {
    title: "Start the Conversation",
    bodyCopy: "Let's build something meaningful together through ideas, partnerships, and shared momentum.",
    ctaLabel: "Get in Touch",
    ctaUrl: "mailto:hello@msbc.my",
  },
};

// ─── Tickets Page Content ──────────────────────────────────────
export const ticketsContent = {
  pageTitle: "Tickets & Registration",
  heroHeadline: "Secure your spot at MSBC 2026.",
  heroSupportingCopy: "Join 700+ students, builders, and ecosystem leaders in Kuala Lumpur for three days of talks, workshops, hackathon experiences, and meaningful connections.",
  registrationStatus: eventEdition.registrationStatus,
  primaryRegistrationUrl: eventEdition.primaryRegistrationUrl,
  ticketTypes: [
    { name: "General Admission", price: "Free", description: "Full access to all conference sessions, networking events, and community activities.", status: "open" as const, ctaLabel: "Register Now", ctaUrl: eventEdition.primaryRegistrationUrl },
    { name: "Hackathon Participant", price: "Free", description: "Includes conference access plus hackathon participation, mentorship sessions, and demo day.", status: "open" as const, ctaLabel: "Apply Now", ctaUrl: "https://lu.ma/msbc2026-hackathon" },
    { name: "VIP / Speaker Pass", price: "Invite Only", description: "Reserved for speakers, judges, mentors, and special guests. Includes all access plus VIP networking.", status: "coming_soon" as const, ctaLabel: "Coming Soon", ctaUrl: "#" },
  ],
};

// ─── Navigation ────────────────────────────────────────────────
export const navigation = {
  mainNav: [
    { label: "About", url: "/2026#about" },
    { label: "Agenda", url: "/2026/agenda" },
    { label: "Speakers", url: "/2026/speakers" },
    { label: "Hackathon", url: "/2026/hackathon" },
    { label: "Sponsors", url: "/2026/sponsors" },
    { label: "Universities", url: "/2026/universities" },
    { label: "FAQ", url: "/2026/faq" },
    { label: "Contact", url: "/2026/contact" },
  ],
  registerCta: { label: "Register", url: "/2026/tickets" },
};
