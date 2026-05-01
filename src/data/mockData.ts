export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  stars: number;
  forks: number;
  liveUrl: string;
  githubUrl?: string;
  image: string;
  icon: string;
  fileStructure: {
    [key: string]: {
      language: string;
      code: string;
    };
  };
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI & Data' | 'Tools';
  level: number;
  icon: string;
  experience: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  slug: string;
}

export interface Service {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  icon: string;
  tier: 'Standard' | 'Pro' | 'Enterprise';
}

export const SKILLS: Skill[] = [
  { name: 'React', category: 'Frontend', level: 92, icon: 'Atom', experience: '2+ years' },
  { name: 'JavaScript', category: 'Frontend', level: 90, icon: 'Code2', experience: '2+ years' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 88, icon: 'Palette', experience: '2+ years' },
  { name: 'Responsive UI', category: 'Frontend', level: 91, icon: 'Monitor', experience: '2+ years' },
  { name: 'Node.js', category: 'Backend', level: 78, icon: 'Server', experience: '1+ year' },
  { name: 'Express', category: 'Backend', level: 76, icon: 'Network', experience: '1+ year' },
  { name: 'MongoDB', category: 'Backend', level: 74, icon: 'Database', experience: '1+ year' },
  { name: 'REST APIs', category: 'Backend', level: 80, icon: 'Webhook', experience: '1+ year' },
  { name: 'Git & GitHub', category: 'DevOps', level: 84, icon: 'GitBranch', experience: '2+ years' },
  { name: 'Netlify / Vercel', category: 'DevOps', level: 86, icon: 'Cloud', experience: '2+ years' },
  { name: 'Render / OnRender', category: 'DevOps', level: 75, icon: 'Rocket', experience: '1+ year' },
  { name: 'Performance Basics', category: 'DevOps', level: 72, icon: 'Gauge', experience: '1+ year' },
  { name: 'UI Research', category: 'AI & Data', level: 70, icon: 'Search', experience: '1+ year' },
  { name: 'Content Structuring', category: 'AI & Data', level: 73, icon: 'FileText', experience: '1+ year' },
  { name: 'SEO-Friendly Pages', category: 'AI & Data', level: 76, icon: 'Globe', experience: '1+ year' },
  { name: 'Analytics Setup', category: 'AI & Data', level: 68, icon: 'BarChart3', experience: '1+ year' }
];

export const PROJECTS: Project[] = [
  {
    id: 'travel-lp',
    title: 'Travel Landing',
    description: 'A vibrant tourism-style landing page built to sell destinations with strong visuals and clear calls to action.',
    longDescription: 'This project focuses on conversion-first layout, responsive design, and travel storytelling. It is a strong fit for Nepali travel agencies, trekking operators, and local tour businesses that need a modern online presence.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    stars: 24,
    forks: 7,
    liveUrl: 'https://77kingo.github.io/travel_landing/',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'Globe',
    fileStructure: {
      'index.html': {
        language: 'html',
        code: `<section class="hero">
  <nav class="navbar">
    <a class="brand" href="/">Travel Nepal</a>
    <a class="cta" href="#packages">Book Now</a>
  </nav>

  <div class="hero-copy">
    <p class="eyebrow">Explore Nepal</p>
    <h1>Discover mountain trails, culture, and unforgettable journeys.</h1>
    <p>Designed for travel businesses that want more inquiries and better first impressions.</p>
  </div>
</section>`
      },
      'styles/main.css': {
        language: 'css',
        code: `.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, rgba(6, 95, 70, 0.85), rgba(15, 23, 42, 0.7)),
    url('/images/himalaya.jpg') center/cover;
  color: white;
}

.hero-copy h1 {
  max-width: 12ch;
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.05;
}`
      },
      'scripts/app.js': {
        language: 'javascript',
        code: `const ctaButtons = document.querySelectorAll('[data-scroll]');

ctaButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.querySelector(button.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});`
      },
      'README.md': {
        language: 'markdown',
        code: `# Travel Landing

Single-page marketing site for destination campaigns.

## Highlights
- Strong hero section
- Mobile-friendly layout
- CTA-first page structure
- Good fit for Nepali travel brands`
      }
    }
  },
  {
    id: 'quiz-app',
    title: 'Quiz App',
    description: 'An interactive quiz experience with scoring, question flow, and clean UI.',
    longDescription: 'This app can be adapted for schools, training institutes, and online learning products in Nepal. It demonstrates interactive state handling, simple gamification, and an easy-to-understand user experience.',
    tags: ['React', 'JavaScript', 'Quiz Logic', 'UI'],
    stars: 18,
    forks: 5,
    liveUrl: 'https://77kingo.github.io/quiz_app/',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'Brain',
    fileStructure: {
      'src/App.jsx': {
        language: 'javascript',
        code: `const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);

function handleAnswer(selected) {
  if (selected.isCorrect) {
    setScore((prev) => prev + 1);
  }

  setCurrentQuestion((prev) => prev + 1);
}`
      },
      'src/data/questions.js': {
        language: 'javascript',
        code: `export const questions = [
  {
    prompt: 'What is the capital of Nepal?',
    answers: [
      { text: 'Kathmandu', isCorrect: true },
      { text: 'Pokhara', isCorrect: false }
    ]
  }
];`
      },
      'src/components/ResultCard.jsx': {
        language: 'javascript',
        code: `export function ResultCard({ score, total }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="result-card">
      <h2>Your Score: {score}/{total}</h2>
      <p>You completed the quiz with {percentage}%.</p>
    </div>
  );
}`
      },
      'README.md': {
        language: 'markdown',
        code: `# Quiz App

Interactive quiz project built for learning-focused interfaces.

## Use cases
- School practice tests
- Entrance preparation
- Employee training modules`
      }
    }
  },
  {
    id: 'foodie-app',
    title: 'Foodie App',
    description: 'A food ordering style interface that showcases menus, offers, and user-friendly browsing.',
    longDescription: 'This concept works well for restaurants, cafes, cloud kitchens, and food brands in Kathmandu and beyond. It highlights visual hierarchy, product cards, and ordering-focused interaction patterns.',
    tags: ['React', 'Food UI', 'Cards', 'Responsive'],
    stars: 22,
    forks: 6,
    liveUrl: 'https://77kingo.github.io/foodie-app/',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'UtensilsCrossed',
    fileStructure: {
      'src/components/MenuGrid.jsx': {
        language: 'javascript',
        code: `export function MenuGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <article key={item.id} className="menu-card">
          <img src={item.image} alt={item.name} />
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <strong>Rs. {item.price}</strong>
        </article>
      ))}
    </div>
  );
}`
      },
      'src/data/menu.js': {
        language: 'javascript',
        code: `export const menu = [
  {
    id: 1,
    name: 'Chicken Momo',
    description: 'Steamed dumplings with house chutney',
    price: 220
  }
];`
      },
      'src/styles/app.css': {
        language: 'css',
        code: `.menu-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 1rem;
}

.menu-card img {
  border-radius: 18px;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}`
      },
      'README.md': {
        language: 'markdown',
        code: `# Foodie App

Food ordering concept tailored for restaurants and cafes.

## Focus
- Menu presentation
- Offer sections
- Mobile-first product cards`
      }
    }
  },
  {
    id: 'music-player',
    title: 'Music Player',
    description: 'A custom music player interface with playback controls and polished visual interaction.',
    longDescription: 'This project shows attention to animation, interface rhythm, and user-friendly controls. It is useful as a portfolio piece to demonstrate frontend polish and component-driven thinking.',
    tags: ['JavaScript', 'Audio', 'UI', 'Frontend'],
    stars: 20,
    forks: 4,
    liveUrl: 'https://77kingo.github.io/MusicPlayer/',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'Music',
    fileStructure: {
      'src/player.js': {
        language: 'javascript',
        code: `const audio = document.querySelector('audio');
const progress = document.querySelector('#progress');

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
});

function togglePlayback() {
  if (audio.paused) audio.play();
  else audio.pause();
}`
      },
      'src/ui.js': {
        language: 'javascript',
        code: `export function renderTrackMeta(track) {
  title.textContent = track.title;
  artist.textContent = track.artist;
  cover.src = track.cover;
}`
      },
      'styles/player.css': {
        language: 'css',
        code: `.player-shell {
  max-width: 420px;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 28px;
  background: linear-gradient(180deg, #1f2937, #0f172a);
}`
      },
      'README.md': {
        language: 'markdown',
        code: `# Music Player

Frontend UI experiment built around audio controls and visual polish.

## What it shows
- State-driven controls
- Custom progress handling
- Styled media interface`
      }
    }
  },
  {
    id: 'hamro-khet',
    title: 'Hamro Khet',
    description: 'A local agriculture-focused web product designed around farming visibility and simple information access.',
    longDescription: 'Hamro Khet is the strongest example of a Nepal-focused digital product in this portfolio. It reflects practical thinking for local audiences, simple navigation, and a service concept that can grow into a useful marketplace or agriculture platform.',
    tags: ['Local Product', 'Agriculture', 'Responsive', 'Branding'],
    stars: 26,
    forks: 8,
    liveUrl: 'https://kingo-hamrokhet.lovestoblog.com/?i=1',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'Leaf',
    fileStructure: {
      'pages/home.html': {
        language: 'html',
        code: `<section class="farm-hero">
  <p class="eyebrow">Hamro Khet</p>
  <h1>Digital presence for local agriculture and farming communities.</h1>
  <p>Simple design, practical sections, and a clear message for Nepali users.</p>
</section>`
      },
      'assets/theme.css': {
        language: 'css',
        code: `:root {
  --brand: #3f6212;
  --surface: #f7fee7;
}

.farm-card {
  background: white;
  border: 1px solid rgba(63, 98, 18, 0.18);
  border-radius: 20px;
}`
      },
      'content/sections.js': {
        language: 'javascript',
        code: `export const sections = [
  'Featured crops',
  'Farmer stories',
  'Why choose local produce',
  'Contact and inquiries'
];`
      },
      'README.md': {
        language: 'markdown',
        code: `# Hamro Khet

Local-market concept project with an agriculture focus.

## Good fit for
- Agro startups
- Farming communities
- Local service discovery`
      }
    }
  },
  {
    id: 'janseva',
    title: 'Janseva',
    description: 'A service-oriented web app concept for organized forms, records, and public-facing workflows.',
    longDescription: 'Janseva represents a more practical utility-driven build. It can suit cooperatives, service centers, local organizations, or internal admin workflows where clarity and task completion matter more than heavy visual effects.',
    tags: ['React', 'Forms', 'Utility App', 'Admin Flow'],
    stars: 19,
    forks: 5,
    liveUrl: 'https://janseva-tzex.onrender.com/',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&h=630&q=80',
    icon: 'Briefcase',
    fileStructure: {
      'src/pages/Dashboard.jsx': {
        language: 'javascript',
        code: `export default function Dashboard() {
  return (
    <main className="dashboard">
      <h1>Janseva Service Panel</h1>
      <p>Track requests, manage records, and keep workflows simple.</p>
    </main>
  );
}`
      },
      'src/components/ServiceForm.jsx': {
        language: 'javascript',
        code: `export function ServiceForm() {
  return (
    <form className="service-form">
      <input placeholder="Full name" />
      <input placeholder="Phone number" />
      <select>
        <option>Choose service</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}`
      },
      'src/lib/api.js': {
        language: 'javascript',
        code: `export async function createRequest(payload) {
  const response = await fetch('/api/requests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return response.json();
}`
      },
      'README.md': {
        language: 'markdown',
        code: `# Janseva

Service workflow concept for local organizations and admin-heavy use cases.

## Useful for
- Cooperatives
- Public service desks
- Internal request management`
      }
    }
  }
];

export const BLOGS: Blog[] = [
  {
    id: 'nepali-business-websites',
    title: 'Why Nepali Businesses Need Fast, Clear Landing Pages',
    excerpt: 'A good landing page is not only about looking modern. It should help local customers understand, trust, and contact you quickly.',
    content: `Many businesses in Nepal still rely heavily on social media pages alone. That can work at the start, but a proper landing page helps customers trust the brand faster and gives them one clear place to learn about services.

### What matters most
1. Clear offer and service summary
2. Mobile-friendly layout for phone users
3. Fast loading on average internet connections
4. Contact buttons that are easy to find

A landing page should be simple, direct, and built around the way local customers browse. When the page is too complex, people leave. When it is clear, they inquire.`,
    date: 'April 24, 2026',
    readTime: '4 min read',
    tags: ['Nepal', 'Landing Page', 'Business'],
    likes: 39,
    slug: 'nepali-business-websites'
  },
  {
    id: 'hamro-khet-case-study',
    title: 'Hamro Khet: Designing for a Local-First Product Idea',
    excerpt: 'This concept project explores how simple language, approachable design, and practical sections can make a local idea feel more real.',
    content: `Hamro Khet is one of the most relevant projects in this portfolio because it speaks directly to a local audience.

### Key ideas behind the project
1. Use familiar wording instead of technical language
2. Keep navigation simple for first-time visitors
3. Build trust with clear sections and real use cases

The goal was not only to make it look clean. The goal was to make it feel usable for people who may not spend all day on digital products.`,
    date: 'April 10, 2026',
    readTime: '3 min read',
    tags: ['Case Study', 'Local Product', 'Nepal'],
    likes: 28,
    slug: 'hamro-khet-case-study'
  },
  {
    id: 'portfolio-project-selection',
    title: 'Choosing the Right Project Style for Different Clients',
    excerpt: 'A travel brand, a cafe, and a service office do not need the same interface. Matching the design to the audience matters.',
    content: `One lesson from building multiple portfolio projects is that style should follow business need.

### Examples
1. Travel pages need atmosphere and strong visuals
2. Food pages need product cards and quick scanning
3. Service apps need clarity, forms, and structure

The best result comes when the website matches the customer journey instead of following random trends.`,
    date: 'March 29, 2026',
    readTime: '3 min read',
    tags: ['Portfolio', 'UI', 'Client Work'],
    likes: 21,
    slug: 'portfolio-project-selection'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'business-landing-page',
    title: 'Business Landing Page',
    subtitle: 'Best for local shops, agencies, and personal brands',
    price: 'Rs. 15,000+',
    period: 'per project',
    description: 'A modern one-page website focused on trust, mobile layout, and getting inquiries from Nepali customers.',
    features: [
      'Custom hero section and branding',
      'Mobile responsive layout',
      'Service or product sections',
      'Contact section with CTA buttons',
      'Fast loading frontend',
      'Deployment support'
    ],
    popular: true,
    icon: 'Rocket',
    tier: 'Pro'
  },
  {
    id: 'portfolio-or-restaurant-site',
    title: 'Portfolio or Restaurant Website',
    subtitle: 'Ideal for creators, cafes, food brands, and freelancers',
    price: 'Rs. 20,000+',
    period: 'per project',
    description: 'A more visual and content-rich website designed to show services, menus, work samples, or brand personality.',
    features: [
      'Custom sections based on your business',
      'Menu or project showcase cards',
      'Responsive design for all screen sizes',
      'Simple animations and polished UI',
      'Content placement guidance',
      'Launch-ready frontend'
    ],
    popular: false,
    icon: 'Brain',
    tier: 'Standard'
  },
  {
    id: 'custom-web-app',
    title: 'Custom Web App',
    subtitle: 'For forms, dashboards, internal tools, or startup ideas',
    price: 'Rs. 35,000+',
    period: 'per project',
    description: 'For businesses or teams that need more than a static page, including forms, admin flow, or practical workflow screens.',
    features: [
      'Frontend application setup',
      'Custom forms and workflow screens',
      'Basic backend/API integration',
      'User-focused dashboard layouts',
      'Project-based planning',
      'Post-delivery support window'
    ],
    popular: false,
    icon: 'ShieldAlert',
    tier: 'Enterprise'
  }
];

export const COMMANDS_HELP = [
  { cmd: 'help', desc: 'Display all available commands' },
  { cmd: 'about', desc: 'Read Saurav Singh profile summary' },
  { cmd: 'skills', desc: 'List current stack and strengths' },
  { cmd: 'projects', desc: 'Explore portfolio projects' },
  { cmd: 'services', desc: 'View website and app offerings' },
  { cmd: 'blog', desc: 'Browse short notes and case studies' },
  { cmd: 'contact', desc: 'Open the contact area' },
  { cmd: 'neofetch', desc: 'Quick developer profile snapshot' },
  { cmd: 'clear', desc: 'Clear the terminal screen' },
  { cmd: 'theme [dark|matrix|cyber]', desc: 'Change terminal visual theme' },
  { cmd: 'coffee', desc: 'Boost the builder energy meter' },
  { cmd: 'hack', desc: 'Fun terminal easter egg' }
];
