export const NAV_LINKS = [
  {
    label: "Why Us?",
    dropdown: [
      { title: "Our Story", desc: "How LedgerPro was built", href: "/our-story" },
      { title: "Customers", desc: "10,000+ happy businesses", href: "/customers" },
    ],
  },
  {
    label: "Product",
    dropdown: [
      { title: "General Ledger", desc: "Double-entry bookkeeping & journal entries", href: "/general-ledger" },
      { title: "Invoicing", desc: "Send & track invoices", href: "/invoicing" },
      { title: "Bills & Purchase Orders", desc: "Manage payables easily", href: "BillsPurchaseOrderpage" },
      { title: "Bank Accounts", desc: "Add your Bank Account", href: "BankAccount" },
      { title: "Financial Reports", desc: "P&L, Balance Sheet, Cash Flow & more", href: "/financial-reports" },
      { title: "Chart of Accounts", desc: "Organize your full account structure", href: "/chart-of-accounts" },
    ],
  },
  {
    label: "Resources",
    dropdown: [
      { title: "User Guide", desc: "Step-by-step app documentation", href: "user-guide" },
      { title: "Help Center", desc: "Guides & tutorials", href: "help-center" },
      { title: "Blog", desc: "Accounting tips & news", href: "blog" },
      { title: "Contact Support", desc: "Reach our team anytime", href: "contact-support" },
    ],
  },
  { label: "Pricing", dropdown: null, href: "/pricing" },
];

export const FEATURES = [
  { icon: "📒", title: "General Ledger", desc: "Full double-entry general ledger with real-time posting and audit trail." },
  { icon: "💳", title: "Accounts Payable & Receivable", desc: "Manage what you owe and what's owed to you — automated and on time." },
  { icon: "🏦", title: "Bank Accounts", desc: "Connect all your bank account." },
  { icon: "📊", title: "Balance Sheet", desc: "Instant balance sheet, income statement, and cash flow — always up to date." },
  { icon: "🧾", title: "Bills & Purchase Orders", desc: "Upload bills, create POs, approve payments with a single click." },
  { icon: "📈", title: "Reports & Analytics", desc: "Trial Balance, P&L, Vendor Reports, Journal Entries, and custom dashboards." },
  { icon: "👥", title: "Customers & Vendors", desc: "Manage all your customers, vendors, and suppliers in one organized place." },
  { icon: "💹", title: "Capital, Equity & Loans", desc: "Track equity, capital accounts, loan schedules, and payments made/received." },
];

export const PLANS = [
  {
    name: "Monthly", price: "$5", period: "/month",
    desc: "Flexible month-to-month access for growing businesses.",
    features: ["All Core Accounting Features", "Unlimited Bank Accounts", "Real-time Financial Reports", "Customer & Vendor Portals", "Priority Email Support", "API Access"],
    cta: "Start Monthly", highlight: false,
  },
  {
    name: "Yearly", price: "$150", period: "/year",
    desc: "Best value for established firms. Save over 30% annually.",
    features: ["Everything in Monthly", "Dedicated Account Manager", "Multi-user Collaboration", "Custom Report Builder", "Advance Tax Export", "24/7 Priority Support"],
    cta: "Start Yearly", highlight: true,
  },
];

export const TESTIMONIALS = [
  { name: "Sarah Mitchell", role: "CFO, TechVenture Inc.", text: "Finally, accounting software that thinks the way we do. Our month-end close went from 5 days to half a day.", avatar: "SM", color: "#6c63ff" },
  { name: "Faiq Khan", role: "Co-founder, Buildify", text: "The real-time dashboard alone is worth it. I always know exactly where our business stands financially.", avatar: "RK", color: "#00ffbe" },
  { name: "Priya Nair", role: "Senior Accountant, NovaCPA", text: "Managing 30+ clients used to be chaos. Now it's completely streamlined. This is the future of accounting.", avatar: "PN", color: "#ff6b6b" },
];

// Clean black/white logos — accounting-industry companies (like the screenshot style)
export const TRUSTED_COMPANIES = [
  {
    name: "Deloitte",
    logo: (
      <svg viewBox="0 0 120 36" width="120" height="36">
        <text x="0" y="27" fontFamily="'Georgia',serif" fontSize="26" fontWeight="700" fill="#111" letterSpacing="-0.5">Deloitte.</text>
      </svg>
    ),
  },
  {
    name: "KPMG",
    logo: (
      <svg viewBox="0 0 90 36" width="90" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="28" fontWeight="900" fill="#111" letterSpacing="2">KPMG</text>
      </svg>
    ),
  },
  {
    name: "PwC",
    logo: (
      <svg viewBox="0 0 70 36" width="70" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="26" fontWeight="800" fill="#111">PwC</text>
      </svg>
    ),
  },
  {
    name: "EY",
    logo: (
      <svg viewBox="0 0 50 36" width="50" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="28" fontWeight="900" fill="#111" letterSpacing="2">EY</text>
      </svg>
    ),
  },
  {
    name: "Intuit",
    logo: (
      <svg viewBox="0 0 80 36" width="80" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="24" fontWeight="700" fill="#111">intuit</text>
      </svg>
    ),
  },
  {
    name: "Xero",
    logo: (
      <svg viewBox="0 0 70 36" width="70" height="36">
        <text x="0" y="27" fontFamily="'Helvetica Neue',sans-serif" fontSize="26" fontWeight="800" fill="#111">xero</text>
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
  Product: ["General Ledger", "Bank Accounts", "Reports", "Bills & POs", "Invoicing"],
  Company: ["About Us", "Careers", "Blog", "Press", "Contact"],
  Resources: ["User Guide", "Help Center", "Changelog", "Status"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export const TIMELINE_STEPS = [
  {
    tag: "Built on GAAP Standards.",
    title: null,
    body: "LedgerPro is built on foundational accounting principles—Double Entry, Accrual Basis, and Full Disclosure. It conforms to the standards of your firm and delivers accurate outputs that meet the professional requirements your clients expect.",
  },
  {
    tag: null,
    title: "Precision in every entry.",
    body: "Maintain absolute control over your General Ledger. Every transaction is tracked with a full audit trail, allowing you to review, approve, and finalize entries with confidence. No more guessing—just pure, verifiable financial data.",
  },
  {
    tag: "Expand your firm's capacity.",
    title: null,
    body: "Streamline your month-end close and year-end reporting. LedgerPro gives your team the capacity to manage more complex engagements and more clients without compromising on the quality of your work product.",
  },
];

// Accounting-related images with Unsplash URLs + text overlay
export const ACCOUNTING_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    tag: "Smart Invoicing",
    title: "Send invoices. Get paid faster.",
    body: "Create professional invoices in seconds. Automated reminders and real-time tracking ensure you never lose a payment again.",
    accent: "#00ffbe",
  },
  {
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tag: "Real-time Analytics",
    title: "Data that drives decisions.",
    body: "Live dashboards with P&L, cash flow, and KPIs. Know exactly where your business stands — at any moment.",
    accent: "#6c63ff",
  },
  {
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    tag: "Bank Reconciliation",
    title: "Every transaction, automatically matched.",
    body: "Connect your bank accounts and watch LedgerPro transactions.",
    accent: "#ff6b6b",
  },
  {
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    tag: "Team Collaboration",
    title: "Work with your accountant, seamlessly.",
    body: "Invite your accountant or team members. Role-based access, audit logs, and real-time collaboration built in.",
    accent: "#f9ca24",
  },
  {
    img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80",
    tag: "Tax Ready",
    title: "Tax season, stress-free.",
    body: "Export tax packages instantly. Organized categories, depreciation schedules, and everything your CPA needs.",
    accent: "#00ffbe",
  },
];

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Cloud Accounting: The Future of Financial Management",
    excerpt: "Discover how cloud-based accounting solutions are revolutionizing the way businesses manage their finances, offering real-time insights and unprecedented accessibility.",
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
    title: "GAAP Compliance Made Simple: A 2026 Guide",
    excerpt: "Navigate the complexities of GAAP compliance with our comprehensive guide. Learn best practices for maintaining accurate financial records and avoiding common pitfalls.",
    image: "/blog/blog_gaap_compliance_1777147847688.png",
    category: "Compliance",
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
    title: "Month-End Close: Streamline Your Process",
    excerpt: "Transform your month-end close from a stressful ordeal into a smooth, efficient process. Expert tips and strategies to save time and improve accuracy.",
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
    title: "Digital Transformation in Accounting",
    excerpt: "How modern accounting firms are leveraging technology to drive efficiency, improve client service, and stay competitive in a rapidly evolving industry.",
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
    title: "Cash Flow Management Best Practices",
    excerpt: "Master the art of cash flow management with proven strategies that help businesses maintain liquidity and make informed financial decisions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    category: "Finance",
    readTime: "5 min read",
    date: "February 20, 2026",
    author: {
      name: "Lisa Martinez",
      avatar: "LM",
      color: "#00c9a7"
    }
  }
];