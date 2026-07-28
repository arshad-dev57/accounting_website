"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function UserGuidePage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeSection, setActiveSection] = useState("getting-started");
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const fn = (e: any) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target))
                setOpenDropdown(null);
        };
        document.addEventListener("mousedown", fn);
        return () => document.removeEventListener("mousedown", fn);
    }, []);

    const guideSections = [
        {
            id: "getting-started",
            title: "Getting Started",
            icon: "🚀",
            articles: [
                { title: "Create your account", content: "Sign up with your email or Google account. Verify your email address to activate your workspace." },
                { title: "Set up your company", content: "Enter your business details, fiscal year, and preferred accounting method (cash or accrual)." },
            ]
        },
        {
            id: "chart-of-accounts",
            title: "Chart of Accounts",
            icon: "📊",
            articles: [
                { title: "Understanding your COA", content: "LedgerPro provides a standard COA structure with Assets, Liabilities, Equity, Income, and Expenses." },
                { title: "Adding custom accounts", content: "Navigate to Settings > Chart of Accounts. Click 'Add Account' and choose account type, name, and number." },
                { title: "Editing and deleting accounts", content: "Only accounts with zero balance can be deleted. Edit account names, numbers, or descriptions anytime." },
                { title: "Account hierarchy & grouping", content: "Organize accounts into parent-child relationships for better financial reporting." },
            ]
        },
        {
            id: "journal-entries",
            title: "Journal Entries",
            icon: "📝",
            articles: [
                { title: "Creating a journal entry", content: "Go to General Ledger > New Entry. Add line items with account, debit/credit amounts, and description." },
                { title: "Posting and reversing entries", content: "Review entries before posting. Use auto-reverse for accrual entries to reverse in the next period." },
                { title: "Editing posted entries", content: "Posted entries are locked. Create adjusting entries instead of editing historical ones." },
                { title: "Importing journal entries", content: "Upload CSV files with date, account, debit, credit, and reference columns for bulk entry." },
            ]
        },
        {
            id: "invoicing",
            title: "Invoicing",
            icon: "📄",
            articles: [
                { title: "Creating an invoice", content: "Go to Invoicing > New Invoice. Add customer, line items, rates, and due date. Send via email." },
                { title: "Invoice templates", content: "Customize invoice templates with your logo, colors, payment terms, and custom fields." },
                { title: "Tracking payments", content: "Mark invoices as paid, record partial payments, and send payment reminders automatically." },
                { title: "Recurring invoices", content: "Set up recurring invoices for subscriptions or retainer clients — daily, weekly, or monthly." },
            ]
        },
        {
            id: "bills-purchase-orders",
            title: "Bills & Purchase Orders",
            icon: "📦",
            articles: [
                { title: "Creating a purchase order", content: "Go to Purchase Orders > New PO. Select vendor, add items, quantities, and expected delivery dates." },
                { title: "Entering bills", content: "Record bills from vendors. Attach PDF invoices and set due dates for payment tracking." },
                { title: "Approval workflows", content: "Set up multi-level approval for bills above certain amounts to maintain control." },
                { title: "Paying bills", content: "Mark bills as paid, record payment method and reference number. Track unpaid bills aging." },
            ]
        },
        {
            id: "financial-reports",
            title: "Financial Reports",
            icon: "📈",
            articles: [
                { title: "Profit & Loss statement", content: "View income and expenses for any date range. Filter by account, customer, or project." },
                { title: "Balance sheet", content: "See your assets, liabilities, and equity at a specific point in time." },
                { title: "Cash flow statement", content: "Track operating, investing, and financing cash flows over any period." },
                { title: "Exporting reports", content: "Download reports as PDF, Excel, or CSV. Share securely with your accountant or team." },
            ]
        },
        {
            id: "multi-client",
            title: "Multi-Client (Accountants)",
            icon: "👥",
            articles: [
                { title: "Client permissions", content: "Set view-only or edit access per client. Clients can't see other clients' data." },
                { title: "Consolidated reporting", content: "Run reports across all clients or selected groups. Perfect for firm-wide overviews." },
                { title: "Practice analytics", content: "Track billable hours, client health scores, and engagement status from your dashboard." },
            ]
        },
        {
            id: "settings",
            title: "Settings & Preferences",
            icon: "⚙️",
            articles: [
                { title: "Company settings", content: "Update company name, address, tax ID, fiscal year, and accounting method." },
                { title: "User management", content: "Add or remove users. Assign roles: Admin, Accountant, Viewer, or Custom." },
                { title: "Tax settings", content: "Set up tax rates (GST, VAT, Sales Tax). Apply them automatically to invoices and bills." },
                { title: "Audit log", content: "View all changes made to your data — who did what and when. Export logs for compliance." },
            ]
        },
    ];

    const filteredSections = searchQuery.trim() === ""
        ? guideSections
        : guideSections.map(section => ({
            ...section,
            articles: section.articles.filter(article =>
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.content.toLowerCase().includes(searchQuery.toLowerCase())
            )
        })).filter(section => section.articles.length > 0);

    const activeSectionData = guideSections.find(s => s.id === activeSection);
    const activeArticles = activeSectionData?.articles || [];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

            <CookieBanner />

            {/* ── NAVBAR (EXACT SAME AS OTHER PAGES) ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
                background: scrolled ? "#ffffff" : "transparent",
                transition: "all .35s ease",
                padding: "0 5%", height: 68,
                display: "flex", alignItems: "center", justifyContent: "space-between",
            }} className={scrolled ? "nav-glass" : ""}>
                <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(0,201,167,.35)" }}>
                            <span style={{ color: "#fff", fontSize: 14, fontWeight: 900, fontFamily: "monospace", letterSpacing: "-1px" }}>LP</span>
                        </div>
                        <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.5px" }}>LedgerPro</span>
                    </div>
                </Link>

                <div className="desktop-nav" ref={dropdownRef} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                    {NAV_LINKS.map((item) => (
                        <div key={item.label} style={{ position: "relative" }}>
                            <button
                                className={`nav-link${openDropdown === item.label ? " open" : ""}`}
                                onClick={() => {
                                    if (item.href && item.href !== "#") {
                                        window.location.href = item.href;
                                    } else {
                                        setOpenDropdown(openDropdown === item.label ? null : item.label);
                                    }
                                }}
                                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                            >
                                {item.label}
                                {item.dropdown && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 5 }}>
                                        <path d="M2 4L6 8L10 4" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                            {item.dropdown && openDropdown === item.label && (
                                <div className="dropdown-menu" onMouseLeave={() => setOpenDropdown(null)}>
                                    {item.dropdown.map((d) => (
                                        <Link key={d.title} href={d.href || "#"} style={{ textDecoration: "none" }}>
                                            <div className="dropdown-item">
                                                <span className="dropdown-item-title">{d.title}</span>
                                                <span className="dropdown-item-desc">{d.desc}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <button className="nav-link">Sign in</button>
                    <button className="btn-dark">Get started</button>
                </div>

                <button
                    className="mob-btn"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                    style={{
                        display: "none",
                        background: "none", border: "none", cursor: "pointer",
                        flexDirection: "column", gap: 5, padding: 4,
                    }}
                >
                    {[0, 1, 2].map(i => (
                        <span key={i} style={{
                            display: "block", width: 24, height: 2.5, background: "#111",
                            borderRadius: 2, transition: "all .3s",
                            transform: menuOpen
                                ? (i === 0 ? "rotate(45deg) translate(5px,5px)"
                                    : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                                        : "scaleX(0)")
                                : "none",
                            opacity: menuOpen && i === 1 ? 0 : 1,
                        }} />
                    ))}
                </button>
            </nav>

            {/* ── MOBILE MENU ── */}
            {menuOpen && (
                <div
                    className="mob-menu"
                    style={{
                        position: "fixed", top: 68, left: 0, right: 0,
                        background: "#fff", padding: "24px 5%", zIndex: 99,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        maxHeight: "calc(100vh - 68px)",
                        overflowY: "auto",
                    }}
                >
                    {NAV_LINKS.map(item => (
                        <div key={item.label}>
                            <button
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    font: "600 18px 'DM Sans'", background: "none", border: "none",
                                    textAlign: "left", padding: "14px 0",
                                    borderBottom: "1px solid #f0f0f0",
                                    cursor: "pointer", color: "#111", width: "100%",
                                }}
                            >
                                {item.label}
                            </button>
                            {item.dropdown && (
                                <div style={{ paddingLeft: 16, paddingBottom: 8 }}>
                                    {item.dropdown.map(d => (
                                        <Link key={d.title} href={d.href || "#"} onClick={() => setMenuOpen(false)} style={{ textDecoration: "none" }}>
                                            <div style={{ padding: "8px 0", borderBottom: "1px solid #f8f8f8" }}>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{d.title}</div>
                                                <div style={{ fontSize: 12, color: "#bbb" }}>{d.desc}</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                        <button style={{ width: "100%", padding: "13px", borderRadius: 100, border: "1.5px solid #ddd", background: "transparent", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                            Sign in
                        </button>
                        <button style={{ width: "100%", padding: "13px", borderRadius: 100, background: "#00ffbe", color: "#111", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                            Get started
                        </button>
                    </div>
                </div>
            )}

            {/* ── HERO SECTION (RESPONSIVE) ── */}
            <section style={{ paddingTop: "clamp(100px, 15vw, 120px)", background: "linear-gradient(135deg, #f5f0ff 0%, #fff 60%)", paddingBottom: "clamp(40px, 8vw, 60px)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center", marginBottom: 20 }}>Documentation</div>
                        <h1 style={{ fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.1, marginBottom: 20 }}>
                            User Guide
                        </h1>
                        <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 600, margin: "0 auto 32px", lineHeight: 1.65, padding: "0 16px" }}>
                            Everything you need to know about LedgerPro — from setup to advanced features.
                        </p>

                        <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 48, padding: "4px 8px 4px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                <span style={{ fontSize: 18, color: "#94a3b8" }}>🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ flex: 1, border: "none", padding: "clamp(10px, 3vw, 14px) 12px", fontSize: "clamp(12px, 3.5vw, 14px)", outline: "none", background: "transparent", fontFamily: "inherit" }}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8", padding: "0 12px" }}>✕</button>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── MAIN CONTENT (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(40px, 8vw, 60px) 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>

                    {/* Sidebar Navigation (Responsive) */}
                    <div style={{ position: "sticky", top: 80, height: "fit-content" }}>
                        <div style={{ marginBottom: 24 }}>
                            <h3 style={{ fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 16 }}>Guide sections</h3>
                            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {guideSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 12,
                                            padding: "clamp(8px, 3vw, 10px) 12px",
                                            borderRadius: 10,
                                            border: "none",
                                            background: activeSection === section.id ? "#f0f0ff" : "transparent",
                                            color: activeSection === section.id ? "#6c63ff" : "#555",
                                            fontSize: "clamp(12px, 3.5vw, 14px)",
                                            fontWeight: activeSection === section.id ? 700 : 500,
                                            cursor: "pointer",
                                            width: "100%",
                                            textAlign: "left",
                                            fontFamily: "inherit",
                                        }}
                                    >
                                        <span style={{ fontSize: "clamp(16px, 4vw, 18px)" }}>{section.icon}</span>
                                        <span>{section.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div style={{ paddingTop: 24, borderTop: "1px solid #eee" }}>
                            <h3 style={{ fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Need help?</h3>
                            <p style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "#888", marginBottom: 16, lineHeight: 1.5 }}>Can't find what you're looking for? Reach out to our support team.</p>
                            <button style={{ padding: "clamp(8px, 3vw, 10px) 16px", borderRadius: 10, background: "#6c63ff", color: "#fff", border: "none", fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 600, cursor: "pointer", width: "100%" }}>
                                Contact Support
                            </button>
                        </div>
                    </div>

                    {/* Articles Content (Responsive) */}
                    <div>
                        {searchQuery && filteredSections.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "clamp(40px, 10vw, 60px)", background: "#f8fafc", borderRadius: 20 }}>
                                <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>🔍</span>
                                <h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 700, color: "#111", marginBottom: 8 }}>No results found</h3>
                                <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666" }}>Try different keywords or browse the sections below.</p>
                                <button onClick={() => setSearchQuery("")} style={{ marginTop: 20, padding: "clamp(8px, 3vw, 10px) 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: "clamp(12px, 3.5vw, 13px)" }}>Clear search</button>
                            </div>
                        ) : searchQuery ? (
                            <div>
                                <div style={{ marginBottom: 28 }}>
                                    <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 800, color: "#111", letterSpacing: "-0.5px" }}>Search results</h2>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#888", marginTop: 4 }}>
                                        Found {filteredSections.reduce((acc, s) => acc + s.articles.length, 0)} articles
                                    </p>
                                </div>
                                {filteredSections.map((section) => (
                                    <div key={section.id} style={{ marginBottom: 32 }}>
                                        <h3 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#6c63ff", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                            <span>{section.icon}</span> {section.title}
                                        </h3>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                            {section.articles.map((article, idx) => (
                                                <div key={idx} style={{ padding: "clamp(16px, 4vw, 20px) 16px", background: "#f8fafc", borderRadius: 16, border: "1px solid #eee" }}>
                                                    <h4 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#111", marginBottom: 8 }}>{article.title}</h4>
                                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", lineHeight: 1.6 }}>{article.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div style={{ marginBottom: 28 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: "clamp(28px, 6vw, 32px)" }}>{activeSectionData?.icon}</span>
                                        <h2 style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
                                            {activeSectionData?.title}
                                        </h2>
                                    </div>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#888" }}>
                                        {activeArticles.length} articles in this section
                                    </p>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    {activeArticles.map((article, idx) => (
                                        <Reveal key={idx} delay={idx * 0.05}>
                                            <div style={{ 
                                                padding: "clamp(20px, 5vw, 28px) clamp(16px, 4vw, 32px)", 
                                                background: "#fff", 
                                                borderRadius: 20, 
                                                border: "1px solid #eee", 
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.02)" 
                                            }}>
                                                <h3 style={{ fontSize: "clamp(16px, 4.5vw, 18px)", fontWeight: 800, color: "#111", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ color: "#6c63ff" }}>📘</span> {article.title}
                                                </h3>
                                                <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "#666", lineHeight: 1.7 }}>
                                                    {article.content}
                                                </p>
                                                <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                                    <span style={{ fontSize: "clamp(11px, 3.5vw, 12px)", color: "#6c63ff", fontWeight: 600 }}>Read more →</span>
                                                </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── VIDEO TUTORIALS SECTION (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 10vw, 80px) 5%", background: "#f8fafc" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>Video tutorials</div>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16, padding: "0 16px" }}>
                            Watch and learn
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", maxWidth: 550, margin: "12px auto 0", padding: "0 16px" }}>
                            Prefer video? Check out our tutorial library for step-by-step walkthroughs.
                        </p>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                        {[
                            { title: "Getting started with LedgerPro", duration: "5:23", icon: "🎬" },
                            { title: "How to reconcile bank accounts", duration: "8:12", icon: "🏦" },
                            { title: "Creating and sending invoices", duration: "4:45", icon: "📄" },
                        ].map((video, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #eee", cursor: "pointer" }}>
                                    <div style={{ background: "#111", height: "clamp(120px, 25vw, 140px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <span style={{ fontSize: "clamp(36px, 8vw, 48px)" }}>{video.icon}</span>
                                        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(0,0,0,0.7)", padding: "4px 8px", borderRadius: 6, fontSize: "clamp(10px, 3vw, 11px)", color: "#fff", fontWeight: 600 }}>{video.duration}</div>
                                    </div>
                                    <div style={{ padding: "clamp(16px, 4vw, 20px)" }}>
                                        <h3 style={{ fontSize: "clamp(13px, 4vw, 15px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{video.title}</h3>
                                        <span style={{ fontSize: "clamp(11px, 3.5vw, 12px)", color: "#6c63ff", fontWeight: 600 }}>Watch tutorial →</span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA SECTION (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 12vw, 100px) 5%", textAlign: "center", background: "#0a0a0a" }}>
                <Reveal>
                    <h2 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em", padding: "0 16px" }}>
                        Still have questions?
                    </h2>
                    <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6, padding: "0 16px" }}>
                        Our support team is here to help you 24/7.
                    </p>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
                        <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)" }}>Contact Support</button>
                        <button style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Live Chat</button>
                    </div>
                </Reveal>
            </section>

            {/* ── FOOTER (RESPONSIVE) ── */}
            <footer style={{ background: "#fafafa", padding: "clamp(40px, 8vw, 72px) 5% clamp(24px, 5vw, 40px)", borderTop: "1px solid #eee" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 48 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, justifyContent: "center" }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>LP</span>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>LedgerPro</span>
                            </div>
                            <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#aaa", lineHeight: 1.6, textAlign: "center" }}>The complete financial operating system.</p>
                        </div>
                        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                            <div key={section} style={{ textAlign: "center" }}>
                                <h4 style={{ fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase", color: "#888" }}>{section}</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {links.map(link => (
                                        <li key={link} style={{ marginBottom: 10 }}>
                                            <a href="#" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#bbb", textDecoration: "none" }}>{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 24, textAlign: "center" }}>
                        <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#ccc" }}>© 2026 LedgerPro, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}