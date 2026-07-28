export const NAV_LINKS = [
  {
    label: "Why Us?",
    dropdown: [
      { title: "Our Story", desc: "How BisonTechs was built", href: "/our-story" },
      { title: "Customers", desc: "10,000+ happy businesses", href: "/customers" },
    ],
  },
  {
    label: "Product",
    dropdown: [
      { title: "Financial Management", desc: "Complete accounting, P&L, and financial reports", href: "/products" },
      { title: "HR & Payroll", desc: "Employee management, payroll, and benefits", href: "/products" },
      { title: "Inventory Management", desc: "Stock control, warehousing, and logistics", href: "/products" },
      { title: "CRM & Sales", desc: "Customer relationships and sales pipeline", href: "/products" },
      { title: "Supply Chain", desc: "Procurement, vendors, and purchase orders", href: "/products" },
      { title: "Manufacturing", desc: "Production planning and shop floor control", href: "/products" },
      { title: "Project Management", desc: "Resource allocation and project tracking", href: "/products" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { title: "User Guide", desc: "Step-by-step ERP documentation", href: "user-guide" },
      { title: "Help Center", desc: "Guides & tutorials", href: "help-center" },
      { title: "Blog", desc: "ERP tips & business insights", href: "blog" },
      { title: "Contact Support", desc: "Reach our team anytime", href: "contact-support" },
    ],
  },
  { label: "Pricing", dropdown: null, href: "/pricing" },
];

export const FEATURES = [
  { icon: "📒", title: "Financial Management", desc: "Complete accounting, general ledger, P&L, balance sheet, and financial reporting." },
  { icon: "�", title: "HR & Payroll", desc: "Employee onboarding, payroll processing, benefits administration, and compliance." },
  { icon: "📦", title: "Inventory Management", desc: "Real-time stock tracking, warehouse management, and automated reorder points." },
  { icon: "🤝", title: "CRM & Sales", desc: "Lead tracking, customer relationships, sales pipeline, and quote management." },
  { icon: "🚚", title: "Supply Chain", desc: "Procurement, vendor management, purchase orders, and logistics optimization." },
  { icon: "🏭", title: "Manufacturing", desc: "Production planning, bill of materials, shop floor control, and quality management." },
  { icon: "�", title: "Business Intelligence", desc: "Real-time dashboards, KPIs, and analytics across all business functions." },
  { icon: "�", title: "Integrations", desc: "Connect with 100+ apps including banks, payment gateways, and productivity tools." },
];

export const PLANS = [
  {
    name: "Starter", price: "$29", period: "/month",
    desc: "Essential ERP modules for small businesses getting started.",
    features: ["Financial Management", "Basic Inventory", "HR & Payroll (up to 10 employees)", "CRM Essentials", "Standard Reports", "Email Support"],
    cta: "Start Starter", highlight: false,
  },
  {
    name: "Professional", price: "$79", period: "/month",
    desc: "Complete ERP solution for growing businesses. Save over 30% annually.",
    features: ["Everything in Starter", "Advanced Manufacturing", "Supply Chain Management", "Business Intelligence", "Multi-location Support", "API Access", "Priority Support"],
    cta: "Start Professional", highlight: true,
  },
];

export const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "CEO, TechVenture Inc.", text: "BisonTechs transformed how we run our entire business. From finance to HR to inventory, everything is now connected and automated.", avatar: "SM", color: "#6c63ff" },
  { name: "Faiq Khan", role: "Operations Director, Buildify", text: "The manufacturing module alone saved us 20 hours per week. Real-time visibility across all departments is a game-changer.", avatar: "RK", color: "#00ffbe" },
  { name: "Priya Nair", role: "CFO, Global Manufacturing Co.", text: "We replaced 5 different systems with BisonTechs. One platform for finance, HR, inventory, and CRM. This is the future of ERP.", avatar: "PN", color: "#ff6b6b" },
];

// Professional company logos — accounting/ERP industry leaders
export const TRUSTED_COMPANIES = [
  {
    name: "Deloitte",
    logo: (
      <svg viewBox="0 0 140 40" width="140" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="28" fontWeight="700" fill="#111" letterSpacing="-0.5">Deloitte</text>
        <circle cx="128" cy="12" r="6" fill="#86bc25" />
      </svg>
    ),
  },
  {
    name: "KPMG",
    logo: (
      <svg viewBox="0 0 100 40" width="100" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="32" fontWeight="900" fill="#111" letterSpacing="1">KPMG</text>
        <rect x="0" y="34" width="100" height="3" fill="#00338d" />
      </svg>
    ),
  },
  {
    name: "PwC",
    logo: (
      <svg viewBox="0 0 80 40" width="80" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="28" fontWeight="800" fill="#111">PwC</text>
        <path d="M50 10 L60 25 L70 10" stroke="#d32f2f" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "EY",
    logo: (
      <svg viewBox="0 0 60 40" width="60" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="32" fontWeight="900" fill="#111" letterSpacing="2">EY</text>
        <rect x="0" y="34" width="60" height="3" fill="#ffe600" />
      </svg>
    ),
  },
  {
    name: "Intuit",
    logo: (
      <svg viewBox="0 0 90 40" width="90" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="26" fontWeight="700" fill="#365ebf">intuit</text>
        <circle cx="75" cy="12" r="5" fill="#365ebf" />
      </svg>
    ),
  },
  {
    name: "Xero",
    logo: (
      <svg viewBox="0 0 80 40" width="80" height="40">
        <text x="0" y="30" fontFamily="'Arial',sans-serif" fontSize="28" fontWeight="800" fill="#13b5ea">xero</text>
        <path d="M50 8 L58 16 L50 24" stroke="#13b5ea" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "Sage",
    logo: (
      <svg viewBox="0 0 70 36" width="70" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="26" fontWeight="700" fill="#111">Sage</text>
      </svg>
    ),
  },
  {
    name: "Freshbooks",
    logo: (
      <svg viewBox="0 0 140 36" width="140" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="22" fontWeight="700" fill="#111">FreshBooks</text>
      </svg>
    ),
  },
];

export const INTEGRATIONS = [
  { name: "QuickBooks", abbr: "QB", color: "#2CA01C", desc: "Import existing data" },
  { name: "Xero", abbr: "XR", color: "#13B5EA", desc: "Sync chart of accounts" },
  { name: "Plaid", abbr: "PL", color: "#111827", desc: "Bank connectivity" },
  { name: "Zapier", abbr: "ZP", color: "#FF4A00", desc: "Workflow automation" },
  { name: "Slack", abbr: "SL", color: "#611f69", desc: "Alerts & notifications" },
  { name: "Google Sheets", abbr: "GS", color: "#34A853", desc: "Export & reporting" },
];

export const FOOTER_LINKS = {
  Product: ["Financial Management", "HR & Payroll", "Inventory", "CRM", "Manufacturing"],
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Resources: ["User Guide", "Help Center", "Changelog", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export const TIMELINE_STEPS = [
  {
    tag: "All-in-One Business Platform.",
    title: null,
    body: "BisonTechs unifies every aspect of your business — finance, HR, inventory, sales, manufacturing, and more. One system, one source of truth, complete visibility across your entire organization.",
  },
  {
    tag: null,
    title: "Automate across departments.",
    body: "Eliminate silos and manual data entry. When sales close, inventory updates automatically. When inventory moves, financials reflect it instantly. Every department works in harmony.",
  },
  {
    tag: "Scale without complexity.",
    title: null,
    body: "Grow your business without adding complexity. BisonTechs scales with you — from startup to enterprise. Add modules, users, and locations as needed, all within the same unified platform.",
  },
];

// ERP-related images with Unsplash URLs + text overlay
export const ACCOUNTING_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tag: "Unified Operations",
    title: "One platform for your entire business.",
    body: "Finance, HR, inventory, CRM, manufacturing — all connected in real-time. No more silos, just seamless operations.",
    accent: "#00ffbe",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tag: "Real-time Analytics",
    title: "Data that drives decisions.",
    body: "Live dashboards with cross-departmental KPIs. Know exactly where your business stands — finance, operations, and growth.",
    accent: "#6c63ff",
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    tag: "Supply Chain Automation",
    title: "From procurement to delivery, automated.",
    body: "Connect vendors, manage inventory, and optimize logistics. When inventory moves, everything updates automatically.",
    accent: "#ff6b6b",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    tag: "Team Collaboration",
    title: "Every department, working together.",
    body: "Finance, HR, sales, and operations teams collaborate in real-time. Role-based access, audit logs, and unified workflows.",
    accent: "#f9ca24",
  },
  {
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    tag: "Scale Without Limits",
    title: "Grow without adding complexity.",
    body: "Add modules, users, and locations as needed. From startup to enterprise, BisonTechs scales with your business.",
    accent: "#00ffbe",
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Cloud ERP: The Future of Business Management",
    excerpt: "Discover how cloud-based ERP solutions are revolutionizing the way businesses operate, offering real-time insights and unprecedented accessibility across all departments.",
    image: "/blog/blog_cloud_accounting_1777147772479.png",
    category: "Technology",
    readTime: "5 min read",
    date: "March 15, 2026",
    author: {
      name: "Sarah Chen",
      avatar: "SC",
      color: "#6c63ff"
    }
  },
  {
    id: 2,
    title: "ERP Implementation Guide: A 2026 Roadmap",
    excerpt: "Navigate the complexities of ERP implementation with our comprehensive guide. Learn best practices for seamless deployment and maximizing ROI across your organization.",
    image: "/blog/blog_gaap_compliance_1777147847688.png",
    category: "Implementation",
    readTime: "8 min read",
    date: "March 10, 2026",
    author: {
      name: "Michael Roberts",
      avatar: "MR",
      color: "#00ffbe"
    }
  },
  {
    id: 3,
    title: "Supply Chain Optimization with ERP",
    excerpt: "Transform your supply chain from a cost center into a competitive advantage. Expert tips and strategies to streamline procurement, inventory, and logistics.",
    image: "/blog/blog_month_end_close_1777147813967.png",
    category: "Operations",
    readTime: "6 min read",
    date: "March 5, 2026",
    author: {
      name: "Emily Johnson",
      avatar: "EJ",
      color: "#ff6b6b"
    }
  },
  {
    id: 4,
    title: "Digital Transformation in Business Operations",
    excerpt: "How modern companies are leveraging ERP technology to drive efficiency, improve collaboration, and stay competitive in a rapidly evolving market.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    category: "Strategy",
    readTime: "7 min read",
    date: "February 28, 2026",
    author: {
      name: "David Park",
      avatar: "DP",
      color: "#f9ca24"
    }
  },
  {
    id: 5,
    title: "Unified Data: Breaking Down Business Silos",
    excerpt: "Master the art of unified business management with proven strategies that help organizations eliminate data silos and make informed decisions across all departments.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Management",
    readTime: "5 min read",
    date: "February 20, 2026",
    author: {
      name: "Lisa Martinez",
      avatar: "LM",
      color: "#00c9a7"
    }
  }
];