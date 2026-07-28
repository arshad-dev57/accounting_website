"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function ChartOfAccountsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("All");
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

    const categories = ["All", "Assets", "Liabilities", "Equity", "Income", "Expense"];

    const accounts = [
        { code: "1000", name: "Cash", type: "Assets", sub: "Current Asset", balance: "$84,200.00", active: true },
        { code: "1050", name: "Petty Cash", type: "Assets", sub: "Current Asset", balance: "$500.00", active: true },
        { code: "1100", name: "Bank Account — Chase", type: "Assets", sub: "Current Asset", balance: "$62,400.00", active: true },
        { code: "1200", name: "Accounts Receivable", type: "Assets", sub: "Current Asset", balance: "$28,600.00", active: true },
        { code: "1500", name: "Inventory", type: "Assets", sub: "Current Asset", balance: "$14,300.00", active: true },
        { code: "1800", name: "Equipment", type: "Assets", sub: "Fixed Asset", balance: "$60,000.00", active: true },
        { code: "1850", name: "Accumulated Depreciation", type: "Assets", sub: "Fixed Asset", balance: "($12,000.00)", active: true },
        { code: "2000", name: "Accounts Payable", type: "Liabilities", sub: "Current Liability", balance: "$18,400.00", active: true },
        { code: "2100", name: "Payroll Payable", type: "Liabilities", sub: "Current Liability", balance: "$8,200.00", active: true },
        { code: "2500", name: "Loans Payable — Chase Bank", type: "Liabilities", sub: "Long-term Liability", balance: "$45,000.00", active: true },
        { code: "3000", name: "Owner's Capital", type: "Equity", sub: "Owner's Equity", balance: "$105,000.00", active: true },
        { code: "3100", name: "Retained Earnings", type: "Equity", sub: "Owner's Equity", balance: "$43,500.00", active: true },
        { code: "3200", name: "Owner's Drawings", type: "Equity", sub: "Owner's Equity", balance: "($8,000.00)", active: true },
        { code: "4000", name: "Sales Revenue", type: "Income", sub: "Operating Income", balance: "$98,200.00", active: true },
        { code: "4100", name: "Product Sales", type: "Income", sub: "Operating Income", balance: "$26,300.00", active: true },
        { code: "5001", name: "Payroll Expense", type: "Expense", sub: "Operating Expense", balance: "$28,000.00", active: true },
        { code: "5010", name: "Office & Admin Expense", type: "Expense", sub: "Operating Expense", balance: "$6,400.00", active: true },
        { code: "5020", name: "Marketing Expense", type: "Expense", sub: "Operating Expense", balance: "$4,500.00", active: true },
        { code: "5100", name: "Cost of Goods Sold", type: "Expense", sub: "COGS", balance: "$42,100.00", active: true },
        { code: "5200", name: "Depreciation Expense", type: "Expense", sub: "Operating Expense", balance: "$2,000.00", active: true },
    ];

    const typeColors: Record<string, { bg: string; text: string }> = {
        Assets: { bg: "#eff6ff", text: "#3b82f6" },
        Liabilities: { bg: "#fff1f2", text: "#f43f5e" },
        Equity: { bg: "#f5f0ff", text: "#6c63ff" },
        Income: { bg: "#f0fdf9", text: "#00c9a7" },
        Expense: { bg: "#fff8f0", text: "#f59e0b" },
    };

    const filtered = activeCategory === "All" ? accounts : accounts.filter(a => a.type === activeCategory);

    const categoryCounts: Record<string, number> = {};
    accounts.forEach(a => { categoryCounts[a.type] = (categoryCounts[a.type] || 0) + 1; });

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

            {/* ── DASHBOARD-FIRST LAYOUT (RESPONSIVE) ── */}
            <section style={{ 
                paddingTop: 68, 
                minHeight: "100vh", 
                background: "#eff6ff", 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 0
            }}>

                {/* ── LEFT SIDEBAR (RESPONSIVE) ── */}
                <aside style={{ 
                    background: "#fff", 
                    borderRight: "1px solid #e0eaff", 
                    display: "flex", 
                    flexDirection: "column", 
                    position: "sticky", 
                    top: 68, 
                    height: "calc(100vh - 68px)", 
                    overflow: "auto",
                    maxHeight: "calc(100vh - 68px)"
                }}>
                    <div style={{ padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 28px) clamp(20px, 4vw, 28px)" }}>
                        <div className="sec-label" style={{ marginBottom: 12, fontSize: 10 }}>Chart of Accounts</div>
                        <h1 style={{ fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 12 }}>
                            Your accounts.<br /><span style={{ color: "#3b82f6" }}>All in one place.</span>
                        </h1>
                        <p style={{ fontSize: "clamp(11px, 3.5vw, 13px)", color: "#888", lineHeight: 1.6, marginBottom: 20 }}>
                            GAAP-compliant structure. Fully customizable to match your business.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            <button className="btn-teal" style={{ padding: "10px 16px", fontSize: "clamp(11px, 3vw, 13px)", width: "100%" }}>+ New Account</button>
                            <button style={{ padding: "10px 16px", fontSize: "clamp(11px, 3vw, 13px)", fontWeight: 600, color: "#555", background: "#f8fafc", border: "1px solid #eee", borderRadius: 10, cursor: "pointer" }}>↓ Export</button>
                        </div>
                    </div>

                    <div style={{ height: 1, background: "#eef2ff", margin: "0 16px" }} />

                    <div style={{ padding: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 28px)" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Filter by type</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {categories.map(cat => {
                                const col = cat !== "All" ? typeColors[cat] : { bg: "#f1f5f9", text: "#64748b" };
                                const isActive = activeCategory === cat;
                                return (
                                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderRadius: 8, border: "none", background: isActive ? col.bg : "transparent", cursor: "pointer", width: "100%" }}>
                                        <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: isActive ? 700 : 500, color: isActive ? col.text : "#888" }}>{cat}</span>
                                        {cat !== "All" && <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, color: isActive ? col.text : "#ccc", background: isActive ? `${col.text}18` : "#f8fafc", padding: "2px 8px", borderRadius: 100 }}>{categoryCounts[cat] || 0}</span>}
                                        {cat === "All" && <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, color: isActive ? "#64748b" : "#ccc", background: isActive ? "#e2e8f0" : "#f8fafc", padding: "2px 8px", borderRadius: 100 }}>{accounts.length}</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={{ height: 1, background: "#eef2ff", margin: "0 16px" }} />

                    <div style={{ padding: "clamp(16px, 4vw, 24px) clamp(16px, 4vw, 28px)", marginTop: "auto" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 12 }}>Summary</div>
                        {[["Total Accounts", accounts.length.toString()], ["Active", accounts.filter(a => a.active).length.toString()], ["Account Types", "5"]].map(([label, val]) => (
                            <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <span style={{ fontSize: "clamp(11px, 3.5vw, 12px)", color: "#999" }}>{label}</span>
                                <span style={{ fontSize: "clamp(11px, 3.5vw, 12px)", fontWeight: 800, color: "#3b82f6" }}>{val}</span>
                            </div>
                        ))}
                       
                    </div>
                </aside>

                {/* ── MAIN CONTENT (RESPONSIVE) ── */}
                <div style={{ padding: "clamp(20px, 5vw, 40px)", overflow: "auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                        <div>
                            <h2 style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 800, color: "#111" }}>
                                {activeCategory === "All" ? "All Accounts" : `${activeCategory} Accounts`}
                            </h2>
                            <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#94a3b8", marginTop: 4 }}>{filtered.length} accounts · April 2026</p>
                        </div>
                        {activeCategory !== "All" && (
                            <span style={{ padding: "4px 12px", borderRadius: 100, background: typeColors[activeCategory]?.bg, color: typeColors[activeCategory]?.text, fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 700 }}>
                                {activeCategory}
                            </span>
                        )}
                    </div>

                    <Reveal>
                        <div style={{ overflowX: "auto" }}>
                            <div style={{ minWidth: 700, background: "#fff", borderRadius: 20, border: "1px solid #e0eaff", overflow: "hidden", boxShadow: "0 4px 24px rgba(59,130,246,0.06)" }}>
                                <div style={{ display: "grid", gridTemplateColumns: "0.6fr 2.2fr 1fr 1.3fr 1.2fr 0.7fr", padding: "clamp(10px, 3vw, 14px) 16px", background: "#f8fafc", borderBottom: "1px solid #e0eaff", fontSize: "clamp(9px, 2.5vw, 10px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                                    <span>Code</span><span>Account Name</span><span>Type</span><span>Sub-type</span><span style={{ textAlign: "right" }}>Balance</span><span style={{ textAlign: "center" }}>Status</span>
                                </div>
                                {filtered.map((acc, i) => {
                                    const col = typeColors[acc.type];
                                    return (
                                        <div key={i} style={{ display: "grid", gridTemplateColumns: "0.6fr 2.2fr 1fr 1.3fr 1.2fr 0.7fr", padding: "clamp(12px, 3.5vw, 15px) 16px", borderBottom: i === filtered.length - 1 ? "none" : "1px solid #f0f6ff", fontSize: "clamp(11px, 3.5vw, 13px)", alignItems: "center", cursor: "pointer" }}>
                                            <span style={{ fontWeight: 700, color: "#3b82f6", fontSize: "clamp(10px, 3vw, 12px)", fontFamily: "monospace" }}>{acc.code}</span>
                                            <span style={{ fontWeight: 600, color: "#111", fontSize: "clamp(11px, 3.5vw, 13px)" }}>{acc.name}</span>
                                            <span>
                                                <span style={{ background: col.bg, color: col.text, padding: "2px 8px", borderRadius: 100, fontSize: "clamp(9px, 2.5vw, 11px)", fontWeight: 700, display: "inline-block" }}>{acc.type}</span>
                                            </span>
                                            <span style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#999", fontWeight: 500 }}>{acc.sub}</span>
                                            <span style={{ textAlign: "right", fontWeight: 700, color: acc.balance.startsWith("(") ? "#ef4444" : "#111", fontSize: "clamp(11px, 3.5vw, 13px)" }}>{acc.balance}</span>
                                            <span style={{ textAlign: "center" }}>
                                                <span style={{ background: "#f0fdf9", color: "#00c9a7", padding: "2px 8px", borderRadius: 100, fontSize: "clamp(9px, 2.5vw, 10px)", fontWeight: 700, display: "inline-block" }}>Active</span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </Reveal>

                    <div style={{ marginTop: 32, padding: "clamp(20px, 5vw, 28px)", background: "linear-gradient(135deg, #eff6ff, #f5f0ff)", borderRadius: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>Structure your books from day one.</div>
                            <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#888" }}>Set up a professional COA in minutes — no accountant required.</div>
                        </div>
                        <button className="btn-teal" style={{ padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)", fontSize: "clamp(12px, 3.5vw, 13px)", whiteSpace: "nowrap" }}>Start free today</button>
                    </div>
                </div>
            </section>

            {/* ── HERO TEXT SECTION (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 10vw, 100px) 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
                        <div className="sec-label" style={{ color: "#3b82f6", justifyContent: "center" }}>Fully structured</div>
                        <h2 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16, marginBottom: 16, padding: "0 16px" }}>
                            The foundation of<br /><span style={{ color: "#3b82f6" }}>accurate accounting.</span>
                        </h2>
                        <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "#888", maxWidth: 560, margin: "0 auto", lineHeight: 1.65, padding: "0 16px" }}>
                            A structured, GAAP-compliant chart of accounts that powers your entire bookkeeping system — fully customizable to match your business.
                        </p>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 2, borderRadius: 24, overflow: "hidden", border: "1px solid #eee" }}>
                        {[
                            { icon: "🗂️", title: "5 Account Types", desc: "Assets, Liabilities, Equity, Income, and Expenses — all organized with standard account numbering (1000–5999)." },
                            { icon: "✏️", title: "Fully Customizable", desc: "Add, rename, or archive any account. Build a structure that perfectly matches your business model." },
                            { icon: "🔢", title: "Standard Numbering", desc: "Industry-standard account codes make navigation intuitive and reports instantly recognizable to any CPA." },
                            { icon: "📌", title: "Sub-Account Support", desc: "Create parent and child accounts for granular tracking within any category — as deep as you need." },
                            { icon: "🔗", title: "Auto-linked to Ledger", desc: "Every transaction automatically posts to the correct account." },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i * 0.05}>
                                <div style={{ background: i % 4 === 0 || i % 4 === 3 ? "#fafbff" : "#fff", padding: "clamp(24px, 5vw, 36px) clamp(20px, 4vw, 40px)", borderBottom: i < 4 ? "1px solid #eee" : "none", borderRight: i % 2 === 0 ? "1px solid #eee" : "none", height: "100%" }}>
                                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                                        <span style={{ fontSize: "clamp(22px, 5vw, 26px)", flexShrink: 0 }}>{f.icon}</span>
                                        <div>
                                            <h3 style={{ fontSize: "clamp(15px, 4vw, 17px)", fontWeight: 800, color: "#111", marginBottom: 8 }}>{f.title}</h3>
                                            <p style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#888", lineHeight: 1.65 }}>{f.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── DARK HIGHLIGHT (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 10vw, 100px) 5%", background: "#0a0a0a" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#3b82f6" }}>GAAP-Compliant</div>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 16, marginBottom: 20 }}>Built on the principles your firm demands.</h2>
                        <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 24 }}>LedgerPro enforces proper account classification, accrual basis, and full disclosure. Your COA is always audit-ready.</p>
                        {["Accrual & cash basis supported", "Automatic account validation", "Period locking & year-end close", "CPA-ready trial balance output"].map(item => (
                            <div key={item} style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                <span style={{ color: "#3b82f6", fontWeight: 700, fontSize: "clamp(12px, 3.5vw, 14px)" }}>✓</span>
                                <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 500, color: "rgba(255,255,255,0.6)" }}>{item}</span>
                            </div>
                        ))}
                    </Reveal>
                    <Reveal delay={0.1}>
                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
                            <div style={{ padding: "clamp(20px, 4vw, 24px) clamp(20px, 4vw, 28px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                                <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#555", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase" }}>Account Distribution</div>
                            </div>
                            {[
                                { type: "Assets", count: 7, total: 20, color: "#3b82f6" },
                                { type: "Liabilities", count: 3, total: 20, color: "#f43f5e" },
                                { type: "Equity", count: 3, total: 20, color: "#6c63ff" },
                                { type: "Income", count: 2, total: 20, color: "#00c9a7" },
                                { type: "Expense", count: 5, total: 20, color: "#f59e0b" },
                            ].map((item, i) => (
                                <div key={i} style={{ padding: "clamp(16px, 4vw, 20px) clamp(20px, 4vw, 28px)", borderBottom: i === 4 ? "none" : "1px solid rgba(255,255,255,0.04)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>{item.type}</span>
                                        <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 800, color: item.color }}>{item.count} accounts</span>
                                    </div>
                                    <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                                        <div style={{ height: "100%", width: `${(item.count / item.total) * 100}%`, background: item.color, borderRadius: 100 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(60px, 12vw, 120px) 5%", textAlign: "center", background: "#f8fafc" }}>
                <Reveal>
                    <h2 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#111", marginBottom: 16, letterSpacing: "-0.02em", padding: "0 16px" }}>Structure your books from day one.</h2>
                    <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 480, margin: "0 auto 32px", padding: "0 16px" }}>Set up a professional chart of accounts in minutes — no accountant required to get started.</p>
                    <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)" }}>Start free today</button>
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