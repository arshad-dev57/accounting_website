"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function HelpCenterPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
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

    const helpCategories = [
        { id: "all", name: "All Topics", icon: "📚", color: "#6c63ff" },
        { id: "getting-started", name: "Getting Started", icon: "🚀", color: "#00c9a7" },
        { id: "accounting", name: "Accounting & Books", icon: "📊", color: "#6c63ff" },
        { id: "banking", name: "Banking & Reconciliation", icon: "🏦", color: "#f59e0b" },
        { id: "invoicing", name: "Invoicing & Payments", icon: "📄", color: "#3b82f6" },
        { id: "reports", name: "Reports & Analytics", icon: "📈", color: "#8b5cf6" },
        { id: "accountants", name: "For Accountants", icon: "👥", color: "#ec4899" },
        { id: "security", name: "Security & Privacy", icon: "🔒", color: "#10b981" },
    ];

    const helpArticles = [
        { id: 1, title: "How to create your first company", category: "getting-started", reads: "12.3k", helpful: 98, popular: true },
        { id: 2, title: "Inviting team members and managing roles", category: "getting-started", reads: "8.7k", helpful: 96, popular: true },
        { id: 3, title: "Setting up your chart of accounts", category: "accounting", reads: "15.2k", helpful: 97, popular: true },
        { id: 4, title: "Understanding double-entry bookkeeping", category: "accounting", reads: "6.5k", helpful: 94, popular: false },
        { id: 5, title: "Connecting your bank account via Plaid", category: "banking", reads: "22.1k", helpful: 99, popular: true },
        { id: 7, title: "Creating and sending professional invoices", category: "invoicing", reads: "14.8k", helpful: 98, popular: true },
        { id: 8, title: "Setting up recurring invoices", category: "invoicing", reads: "7.2k", helpful: 93, popular: false },
        { id: 9, title: "Running a Profit & Loss report", category: "reports", reads: "11.3k", helpful: 96, popular: true },
        { id: 10, title: "Exporting financial statements", category: "reports", reads: "5.9k", helpful: 91, popular: false },
        { id: 11, title: "Managing multiple clients as an accountant", category: "accountants", reads: "9.4k", helpful: 97, popular: true },
        { id: 12, title: "Practice analytics and firm insights", category: "accountants", reads: "4.2k", helpful: 92, popular: false },
        { id: 13, title: "Two-factor authentication setup", category: "security", reads: "8.1k", helpful: 95, popular: true },
        { id: 14, title: "Data encryption and SOC2 compliance", category: "security", reads: "3.8k", helpful: 94, popular: false },
        { id: 15, title: "Recording bills and vendor payments", category: "accounting", reads: "10.2k", helpful: 95, popular: false },
        { id: 16, title: "Month-end closing procedure", category: "accounting", reads: "7.8k", helpful: 96, popular: false },
    ];

    const filteredArticles = helpArticles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === "all" || article.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const popularArticles = helpArticles.filter(a => a.popular).slice(0, 6);

    const faqs = [
        { q: "Is there a free trial?", a: "Yes, LedgerPro offers a 14-day free trial with full access to all features. No credit card required." },
        { q: "Can I cancel anytime?", a: "Absolutely. You can cancel your subscription at any time from your account settings." },
        { q: "Does LedgerPro support multi-currency?", a: "Currently we support single-currency businesses. Multi-currency is coming in Q3 2026." },
        { q: "Is my data backed up?", a: "Yes, we perform automated daily backups with point-in-time recovery." },
        { q: "How do I contact support?", a: "Email support@ledgerpro.com or use the live chat widget in your dashboard." },
        { q: "Do you offer onboarding calls?", a: "Yes, all paid plans include a 30-minute onboarding session with our customer success team." },
    ];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

            <CookieBanner />

            {/* ── TOP BANNER ── */}
            <div style={{
                background: "#02113c",
                padding: "7px 5%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
                fontSize: 12,
                color: "#fff",
                fontWeight: 500,
            }}>
                <span style={{ color: "#1088dd", fontWeight: 700 }}>Process is All You Need</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>|</span>
                <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                    Read our whitepaper
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </a>
            </div>

            {/* ── HEADER ── */}
            <header style={{
                position: "fixed",
                top: 32,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: "0 40px",
                height: 60,
                display: "flex",
                alignItems: "center",
            }}>
                {/* Floating pill navbar */}
                <div style={{
                    width: "100%",
                    background: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)",
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "0.5px solid rgba(0,0,0,0.08)",
                    borderRadius: 14,
                    boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.04)",
                    transition: "all .3s ease",
                    padding: "0 20px",
                    height: 54,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                    {/* Logo — using image from public folder */}
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                            <img src="/bisontechs.png" alt="BisonTechs" style={{ height: 55, width: "auto", objectFit: "contain" }} />
                        </div>
                    </Link>

                    {/* Navigation */}
                    <nav className="desktop-nav" ref={dropdownRef} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                        {NAV_LINKS.map((item) => (
                            <div key={item.label} style={{ position: "relative" }}>
                                <button
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: 13.5,
                                        fontWeight: 500,
                                        color: "#222",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        padding: "8px 0",
                                        fontFamily: "inherit",
                                    }}
                                    onClick={() => {
                    if (item.href && item.href !== "#" && !item.dropdown) {
                      window.location.href = item.href;
                    } else {
                      setOpenDropdown(openDropdown === item.label ? null : item.label);
                    }
                  }}
                                    onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                                >
                                    {item.label}
                                    {item.dropdown && (
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                            <path d="M2 3.5L5 6.5L8 3.5" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                                {item.dropdown && openDropdown === item.label && (
                                    <div style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: 0,
                                        background: "#fff",
                                        borderRadius: 12,
                                        boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                                        padding: "8px 0",
                                        minWidth: 220,
                                        zIndex: 1000,
                                        border: "1px solid rgba(0,0,0,0.06)",
                                    }} onMouseLeave={() => setOpenDropdown(null)}>
                                        {item.dropdown.map((d) => (
                                            <Link key={d.title} href={d.href || "#"} style={{ textDecoration: "none" }}>
                                                <div style={{
                                                    padding: "10px 16px",
                                                    transition: "background 0.2s",
                                                    cursor: "pointer",
                                                }} onMouseOver={e => e.currentTarget.style.background = "#f8f9fa"} onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                                                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111", marginBottom: 2 }}>{d.title}</div>
                                                    <div style={{ fontSize: 12, color: "#888" }}>{d.desc}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <button style={{
                            background: "none",
                            border: "none",
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: "#222",
                            cursor: "pointer",
                            padding: "6px 12px",
                            fontFamily: "inherit",
                        }}>Sign In</button>
                        <button style={{
                            background: "#1088dd",
                            color: "#fff",
                            border: "none",
                            fontSize: 13.5,
                            fontWeight: 700,
                            padding: "8px 20px",
                            borderRadius: 8,
                            cursor: "pointer",
                            fontFamily: "inherit",
                            letterSpacing: "-0.2px",
                        }}>Contact</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 8,
                        }}
                        onClick={() => setMenuOpen(o => !o)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18"/>
                        </svg>
                    </button>
                </div>
            </header>

            {/* ── MOBILE MENU ── */}
            {menuOpen && (
                <div style={{
                    position: "fixed", top: 92, left: 0, right: 0,
                    background: "#fff", padding: "24px 5%", zIndex: 99,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                    maxHeight: "calc(100vh - 92px)",
                    overflowY: "auto",
                }}>
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
                        <button style={{ width: "100%", padding: "13px", borderRadius: 100, background: "#1088dd", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
                            Get started
                        </button>
                    </div>
                </div>
            )}

            {/* ── HERO SECTION (RESPONSIVE) ── */}
            <section style={{ paddingTop: "clamp(100px, 15vw, 120px)", background: "linear-gradient(135deg, #f5f0ff 0%, #fff 60%)", paddingBottom: "clamp(40px, 8vw, 60px)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center", marginBottom: 20 }}>Support Center</div>
                        <h1 style={{ fontSize: "clamp(36px, 8vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.1, marginBottom: 20 }}>
                            How can we help?
                        </h1>
                        <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 550, margin: "0 auto 32px", lineHeight: 1.65, padding: "0 16px" }}>
                            Search our knowledge base, browse topics, or contact our support team.
                        </p>

                        <div style={{ maxWidth: 540, margin: "0 auto", padding: "0 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 48, padding: "4px 8px 4px 20px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)", flexWrap: "wrap" }}>
                                <span style={{ fontSize: 18, color: "#94a3b8" }}>🔍</span>
                                <input
                                    type="text"
                                    placeholder="Search for articles, guides, or topics..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ flex: 1, border: "none", padding: "clamp(12px, 3vw, 16px) 12px", fontSize: "clamp(13px, 3.5vw, 15px)", outline: "none", background: "transparent", fontFamily: "inherit", minWidth: "150px" }}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#94a3b8", padding: "0 12px" }}>✕</button>
                                )}
                                <button style={{ background: "#6c63ff", border: "none", padding: "clamp(8px, 2.5vw, 10px) 20px", borderRadius: 40, color: "#fff", fontSize: "clamp(12px, 3vw, 13px)", fontWeight: 600, cursor: "pointer" }}>Search</button>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "center", gap: "clamp(12px, 4vw, 24px)", marginTop: 24, flexWrap: "wrap", padding: "0 16px" }}>
                            <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "#888" }}>Popular:</span>
                            {["Connecting bank", "Invoicing", "Reconciliation", "Reports"].map(tag => (
                                <button key={tag} onClick={() => setSearchQuery(tag)} style={{ background: "none", border: "none", fontSize: "clamp(12px, 3.5vw, 13px)", color: "#6c63ff", fontWeight: 500, cursor: "pointer" }}>{tag}</button>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CATEGORY GRID (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(40px, 8vw, 60px) 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
                        <h2 style={{ fontSize: "clamp(22px, 6vw, 32px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
                            Browse by topic
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", marginTop: 8 }}>
                            Find answers quickly with our categorized help resources
                        </p>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
                        {helpCategories.slice(1).map((category) => (
                            <Reveal key={category.id} delay={0.1}>
                                <button
                                    onClick={() => {
                                        setActiveCategory(category.id);
                                        setSearchQuery("");
                                    }}
                                    style={{
                                        padding: "clamp(20px, 5vw, 28px) 12px",
                                        background: "#f8fafc",
                                        border: activeCategory === category.id ? `2px solid ${category.color}` : "1px solid #eee",
                                        borderRadius: 20,
                                        cursor: "pointer",
                                        textAlign: "center",
                                        width: "100%",
                                        fontFamily: "inherit",
                                    }}
                                >
                                    <span style={{ fontSize: "clamp(28px, 6vw, 36px)", display: "block", marginBottom: 10 }}>{category.icon}</span>
                                    <h3 style={{ fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{category.name}</h3>
                                    <p style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "#94a3b8" }}>
                                        {helpArticles.filter(a => a.category === category.id).length} articles
                                    </p>
                                </button>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SEARCH RESULTS OR CONTENT ── */}
            <section style={{ padding: "clamp(30px, 6vw, 40px) 5% clamp(60px, 10vw, 80px)", background: "#f8fafc" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    {searchQuery ? (
                        <div>
                            <div style={{ marginBottom: 28 }}>
                                <h2 style={{ fontSize: "clamp(20px, 5vw, 22px)", fontWeight: 800, color: "#111", marginBottom: 6 }}>
                                    Search results for "{searchQuery}"
                                </h2>
                                <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666" }}>
                                    Found {filteredArticles.length} articles
                                </p>
                            </div>
                            {filteredArticles.length === 0 ? (
                                <div style={{ textAlign: "center", padding: "clamp(40px, 10vw, 60px)", background: "#fff", borderRadius: 20, border: "1px solid #eee" }}>
                                    <span style={{ fontSize: 48, display: "block", marginBottom: 16 }}>🔍</span>
                                    <h3 style={{ fontSize: "clamp(16px, 4.5vw, 18px)", fontWeight: 700, color: "#111", marginBottom: 8 }}>No results found</h3>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666" }}>Try different keywords or browse categories above.</p>
                                    <button onClick={() => setSearchQuery("")} style={{ marginTop: 20, padding: "clamp(8px, 3vw, 10px) 20px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: "clamp(12px, 3.5vw, 13px)" }}>Clear search</button>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {filteredArticles.map((article) => {
                                        const category = helpCategories.find(c => c.id === article.category);
                                        return (
                                            <div key={article.id} style={{ padding: "clamp(16px, 4vw, 20px) 20px", background: "#fff", borderRadius: 14, border: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                                                        <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>{category?.icon}</span>
                                                        <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, color: category?.color, background: `${category?.color}10`, padding: "3px 8px", borderRadius: 100 }}>
                                                            {category?.name}
                                                        </span>
                                                    </div>
                                                    <h3 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 700, color: "#111", marginBottom: 6 }}>{article.title}</h3>
                                                    <div style={{ display: "flex", gap: 12, fontSize: "clamp(10px, 3vw, 12px)", color: "#94a3b8", flexWrap: "wrap" }}>
                                                        <span>📖 {article.reads} reads</span>
                                                        <span>👍 {article.helpful}% helpful</span>
                                                    </div>
                                                </div>
                                                <span style={{ color: "#6c63ff", fontSize: "clamp(18px, 4vw, 20px)" }}>→</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : activeCategory !== "all" ? (
                        <div>
                            <div style={{ marginBottom: 28 }}>
                                {(() => {
                                    const category = helpCategories.find(c => c.id === activeCategory);
                                    return (
                                        <>
                                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                                                <span style={{ fontSize: "clamp(28px, 6vw, 36px)" }}>{category?.icon}</span>
                                                <h2 style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>{category?.name}</h2>
                                            </div>
                                            <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666" }}>
                                                {filteredArticles.length} articles in this category
                                            </p>
                                        </>
                                    );
                                })()}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {filteredArticles.map((article) => (
                                    <div key={article.id} style={{ padding: "clamp(16px, 4vw, 20px) 20px", background: "#fff", borderRadius: 14, border: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 700, color: "#111", marginBottom: 6 }}>{article.title}</h3>
                                            <div style={{ display: "flex", gap: 12, fontSize: "clamp(10px, 3vw, 12px)", color: "#94a3b8", flexWrap: "wrap" }}>
                                                <span>📖 {article.reads} reads</span>
                                                <span>👍 {article.helpful}% helpful</span>
                                            </div>
                                        </div>
                                        <span style={{ color: "#6c63ff", fontSize: "clamp(18px, 4vw, 20px)" }}>→</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Popular Articles */}
                            <div style={{ marginBottom: 48 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                                    <div>
                                        <span style={{ fontSize: "clamp(24px, 5vw, 28px)", display: "block", marginBottom: 6 }}>⭐</span>
                                        <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 800, color: "#111" }}>Most popular articles</h2>
                                        <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", marginTop: 4 }}>Our most-read help content, loved by thousands</p>
                                    </div>
                                    <Link href="#" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#6c63ff", fontWeight: 600, textDecoration: "none" }}>View all →</Link>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                                    {popularArticles.map((article, idx) => {
                                        const category = helpCategories.find(c => c.id === article.category);
                                        return (
                                            <div key={article.id} style={{ padding: "clamp(16px, 4vw, 20px) 20px", background: "#fff", borderRadius: 14, border: "1px solid #eee" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                                                    <span style={{ fontSize: "clamp(16px, 4vw, 20px)" }}>{category?.icon}</span>
                                                    <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, color: "#fff", background: "#f59e0b", padding: "3px 8px", borderRadius: 100, display: "inline-block" }}>
                                                        #{idx + 1} popular
                                                    </span>
                                                </div>
                                                <h3 style={{ fontSize: "clamp(14px, 4vw, 15px)", fontWeight: 700, color: "#111", marginBottom: 8 }}>{article.title}</h3>
                                                <div style={{ display: "flex", gap: 12, fontSize: "clamp(10px, 3vw, 11px)", color: "#94a3b8", flexWrap: "wrap" }}>
                                                    <span>📖 {article.reads} reads</span>
                                                    <span>👍 {article.helpful}% helpful</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* FAQ Section */}
                            <div style={{ marginBottom: 48 }}>
                                <div style={{ textAlign: "center", marginBottom: 32 }}>
                                    <span style={{ fontSize: "clamp(28px, 6vw, 32px)", display: "block", marginBottom: 6 }}>❓</span>
                                    <h2 style={{ fontSize: "clamp(24px, 6vw, 28px)", fontWeight: 800, color: "#111" }}>Frequently asked questions</h2>
                                    <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", marginTop: 6 }}>Quick answers to common questions</p>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                                    {faqs.map((faq, idx) => (
                                        <div key={idx} style={{ padding: "clamp(20px, 5vw, 24px)", background: "#fff", borderRadius: 16, border: "1px solid #eee" }}>
                                            <h3 style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#111", marginBottom: 10 }}>{faq.q}</h3>
                                            <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", lineHeight: 1.6 }}>{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Video Tutorials */}
                            <div>
                                <div style={{ textAlign: "center", marginBottom: 28 }}>
                                    <span style={{ fontSize: "clamp(28px, 6vw, 32px)", display: "block", marginBottom: 6 }}>🎬</span>
                                    <h2 style={{ fontSize: "clamp(22px, 5vw, 24px)", fontWeight: 800, color: "#111" }}>Video tutorials</h2>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", marginTop: 4 }}>Watch step-by-step guides</p>
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                                    {[
                                        { title: "Getting Started with LedgerPro", duration: "5:23", icon: "🚀" },
                                        { title: "Bank Reconciliation Walkthrough", duration: "8:12", icon: "🏦" },
                                        { title: "Invoicing & Payment Tracking", duration: "4:45", icon: "📄" },
                                    ].map((video, idx) => (
                                        <div key={idx} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #eee" }}>
                                            <div style={{ background: "#0a0a0a", height: "clamp(110px, 25vw, 130px)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                                <span style={{ fontSize: "clamp(32px, 7vw, 40px)" }}>{video.icon}</span>
                                                <div style={{ position: "absolute", bottom: 10, right: 10, background: "rgba(0,0,0,0.7)", padding: "3px 8px", borderRadius: 6, fontSize: "clamp(9px, 2.5vw, 10px)", color: "#fff", fontWeight: 600 }}>{video.duration}</div>
                                            </div>
                                            <div style={{ padding: "clamp(12px, 4vw, 16px)" }}>
                                                <h3 style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 700, color: "#111" }}>{video.title}</h3>
                                                <span style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#6c63ff", fontWeight: 600 }}>Watch tutorial →</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ── CONTACT SUPPORT CARDS (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 10vw, 80px) 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em" }}>
                            Still need help?
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", maxWidth: 500, margin: "10px auto 0", padding: "0 16px" }}>
                            Our support team is available 24/7 to assist you
                        </p>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
                        {[
                            { icon: "💬", title: "Live Chat", desc: "Chat with our support team in real-time", action: "Start chat →", color: "#6c63ff" },
                            { icon: "📧", title: "Email Support", desc: "Get a response within 24 hours", action: "support@ledgerpro.com", color: "#00c9a7" },
                            { icon: "📞", title: "Schedule a Call", desc: "Book a 1-on-1 session with an expert", action: "Book a call →", color: "#f59e0b" },
                        ].map((option, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div style={{ textAlign: "center", padding: "clamp(30px, 6vw, 40px) 20px", background: "#f8fafc", borderRadius: 24, border: "1px solid #eee" }}>
                                    <span style={{ fontSize: "clamp(36px, 8vw, 48px)", display: "block", marginBottom: 14 }}>{option.icon}</span>
                                    <h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 800, color: "#111", marginBottom: 8 }}>{option.title}</h3>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", marginBottom: 18, lineHeight: 1.5 }}>{option.desc}</p>
                                    <span style={{ fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600, color: option.color, cursor: "pointer" }}>{option.action}</span>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── COMMUNITY SECTION (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(50px, 8vw, 60px) 5%", background: "linear-gradient(135deg, #f5f0ff 0%, #fff 60%)" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                    <Reveal>
                        <span style={{ fontSize: "clamp(40px, 8vw, 48px)", display: "block", marginBottom: 14 }}>👥</span>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 38px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 14 }}>
                            Join our community
                        </h2>
                        <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", maxWidth: 550, margin: "0 auto 28px", lineHeight: 1.65, padding: "0 16px" }}>
                            Connect with other LedgerPro users, share tips, and get advice from accounting professionals.
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", padding: "0 16px" }}>
                            <button style={{ padding: "clamp(12px, 3vw, 14px) 28px", borderRadius: 12, background: "#6c63ff", color: "#fff", border: "none", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600, cursor: "pointer" }}>Join Slack Community</button>
                            <button style={{ padding: "clamp(12px, 3vw, 14px) 28px", borderRadius: 12, background: "#fff", color: "#6c63ff", border: "1px solid #e2e8f0", fontSize: "clamp(13px, 3.5vw, 14px)", fontWeight: 600, cursor: "pointer" }}>Visit Forum →</button>
                        </div>
                    </Reveal>
                </div>
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
                            <div style={{ marginTop: 22 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, justifyContent: "center" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                    <a href="mailto:info@bisonstechs.com" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#aaa", textDecoration: "none" }}>info@bisonstechs.com</a>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <a href="tel:+17867618327" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#aaa", textDecoration: "none" }}>+1 (786)-761-8327</a>
                                </div>
                            </div>
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