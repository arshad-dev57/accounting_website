"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function FinancialReportsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState(0);
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

    const tabs = ["Profit & Loss", "Balance Sheet", "Cash Flow", "Trial Balance"];

    const plRows = [
        { label: "Revenue", value: "$124,500", bold: true, indent: 0, color: "#111" },
        { label: "Service Income", value: "$98,200", indent: 1 },
        { label: "Product Sales", value: "$26,300", indent: 1 },
        { label: "Cost of Goods Sold", value: "($42,100)", bold: true, indent: 0, color: "#ef4444" },
        { label: "Gross Profit", value: "$82,400", bold: true, indent: 0, color: "#111", border: true },
        { label: "Operating Expenses", value: "$38,900", bold: true, indent: 0 },
        { label: "Payroll", value: "$28,000", indent: 1 },
        { label: "Office & Admin", value: "$6,400", indent: 1 },
        { label: "Marketing", value: "$4,500", indent: 1 },
        { label: "Net Operating Income", value: "$43,500", bold: true, indent: 0, border: true, color: "#111" },
        { label: "Net Income", value: "$43,500", bold: true, indent: 0, color: "#00c9a7", bg: "#f0fdf9" },
    ];

    const bsRows = {
        assets: [
            { label: "Current Assets", bold: true },
            { label: "Cash & Equivalents", value: "$84,200", indent: 1 },
            { label: "Accounts Receivable", value: "$28,600", indent: 1 },
            { label: "Inventory", value: "$14,300", indent: 1 },
            { label: "Total Current Assets", value: "$127,100", bold: true, color: "#111" },
            { label: "Fixed Assets", bold: true },
            { label: "Equipment (Net)", value: "$48,000", indent: 1 },
            { label: "Total Assets", value: "$175,100", bold: true, color: "#6c63ff", bg: "#f5f0ff" },
        ],
        liabilities: [
            { label: "Current Liabilities", bold: true },
            { label: "Accounts Payable", value: "$18,400", indent: 1 },
            { label: "Payroll Payable", value: "$8,200", indent: 1 },
            { label: "Total Liabilities", value: "$26,600", bold: true, color: "#ef4444" },
            { label: "Equity", bold: true },
            { label: "Owner's Capital", value: "$105,000", indent: 1 },
            { label: "Retained Earnings", value: "$43,500", indent: 1 },
            { label: "Total Equity", value: "$148,500", bold: true, color: "#111" },
            { label: "Total Liabilities + Equity", value: "$175,100", bold: true, color: "#6c63ff", bg: "#f5f0ff" },
        ],
    };

    const reportFeatures = [
        {
            icon: "📈", title: "Profit & Loss", color: "#f59e0b",
            desc: "See exactly what you earned vs. spent in any period. Compare months, quarters, or years side-by-side with automatic variance highlighting.",
            stats: [["$124,500", "Revenue"], ["$43,500", "Net Income"], ["35%", "Margin"]],
        },
        {
            icon: "⚖️", title: "Balance Sheet", color: "#6c63ff",
            desc: "A complete snapshot of your assets, liabilities, and equity at any point in time. Auto-verified to ensure it always balances to the penny.",
            stats: [["$175,100", "Total Assets"], ["$26,600", "Liabilities"], ["$148,500", "Equity"]],
        },
        {
            icon: "💧", title: "Cash Flow Statement", color: "#00c9a7",
            desc: "Track where your cash is going across operating, investing, and financing activities. Know your true liquidity position at any moment.",
            stats: [["$43,100", "From Operations"], ["$18,100", "Net Change"], ["+26%", "vs Last Month"]],
        },
        {
            icon: "📋", title: "Trial Balance", color: "#3b82f6",
            desc: "Verify your books balance perfectly before closing any period. One-click generation with export to Excel, PDF, or direct share with your CPA.",
            stats: [["$256,100", "Total Debits"], ["$256,100", "Total Credits"], ["✓", "Balanced"]],
        },
    ];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

            <CookieBanner />

            {/* ── NAVBAR (EXACT SAME AS OURSTORY PAGE) ── */}
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
            <section style={{ paddingTop: 100, background: "#fff8f0" }}>
                <div style={{ padding: "clamp(40px, 8vw, 60px) 5% 0", maxWidth: 1400, margin: "0 auto" }}>
                    <Reveal>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
                            <div style={{ flex: "1 1 300px" }}>
                                <div className="sec-label" style={{ marginBottom: 20 }}>Financial Reports</div>
                                <h1 style={{ fontSize: "clamp(36px, 8vw, 80px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 0.95 }}>
                                    Reports that<br />tell the<br /><span style={{ color: "#f59e0b" }}>full story.</span>
                                </h1>
                            </div>
                            <div style={{ flex: "1 1 280px", maxWidth: 420 }}>
                                <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "#666", lineHeight: 1.65, marginBottom: 28 }}>
                                    Profit & Loss, Balance Sheet, Cash Flow Statement, and Trial Balance — generated instantly, always accurate, ready to share with your board or CPA.
                                </p>
                                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                                    <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 15px) clamp(24px, 5vw, 36px)", fontSize: "clamp(14px, 3.5vw, 15px)" }}>Run a report</button>
                                    <button className="btn-outline" style={{ padding: "clamp(12px, 3vw, 15px) clamp(24px, 5vw, 36px)", fontSize: "clamp(14px, 3.5vw, 15px)" }}>Watch demo</button>
                                </div>
                                <div style={{ display: "flex", gap: 28, marginTop: 36, paddingTop: 28, borderTop: "1px solid #e5d8c5", flexWrap: "wrap" }}>
                                    {[["6+", "Report Types"], ["1-click", "PDF Export"], ["Real-time", "Data"]].map(([v, l]) => (
                                        <div key={l}>
                                            <div style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 900, color: "#f59e0b", letterSpacing: "-0.5px" }}>{v}</div>
                                            <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 2 }}>{l}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Full-width report preview */}
                <div style={{ padding: "clamp(32px, 6vw, 48px) 5% 0" }}>
                    <Reveal delay={0.1}>
                        <div style={{ maxWidth: 1200, margin: "0 auto", background: "#fff", borderRadius: "28px 28px 0 0", boxShadow: "0 -8px 60px rgba(245,158,11,0.08), 0 0 0 1px #eee", overflow: "hidden" }}>
                            {/* Tab bar - responsive */}
                            <div style={{ background: "#f8fafc", borderBottom: "1px solid #eee", padding: "0 16px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                <div style={{ display: "flex", overflowX: "auto", flex: 1 }}>
                                    {tabs.map((tab, i) => (
                                        <button key={tab} onClick={() => setActiveTab(i)} style={{ padding: "clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px)", fontSize: "clamp(11px, 3vw, 13px)", fontWeight: i === activeTab ? 700 : 500, color: i === activeTab ? "#111" : "#999", background: "none", border: "none", borderBottom: i === activeTab ? "2.5px solid #f59e0b" : "2.5px solid transparent", cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: 10, paddingBottom: 12, flexShrink: 0 }}>
                                    <span style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "#888", fontWeight: 600, padding: "6px 12px", background: "#eef0f5", borderRadius: 8, cursor: "pointer" }}>Apr 2026</span>
                                    <span style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "#888", fontWeight: 600, padding: "6px 12px", background: "#eef0f5", borderRadius: 8, cursor: "pointer" }}>↓ Export PDF</span>
                                </div>
                            </div>

                            <div style={{ padding: "clamp(20px, 5vw, 40px)", overflowX: "auto" }}>
                                {activeTab === 0 && (
                                    <div>
                                        <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 800, color: "#111" }}>Profit & Loss Statement</h3><p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#aaa" }}>For the period ending April 30, 2026</p></div>
                                        <div style={{ minWidth: 400, borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                                            {plRows.map((row, i) => (
                                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `${row.indent === 1 ? "clamp(10px, 3vw, 12px) 16px clamp(10px, 3vw, 12px) 40px" : "clamp(12px, 3.5vw, 16px) 16px"}`, borderBottom: i === plRows.length - 1 ? "none" : "1px solid #f8f8f8", background: row.bg || (row.border ? "#fafbff" : "transparent"), borderTop: row.border ? "2px solid #eee" : "none" }}>
                                                    <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: row.bold ? 800 : 400, color: row.color || "#555" }}>{row.label}</span>
                                                    {row.value && <span style={{ fontSize: "clamp(12px, 3.5vw, 15px)", fontWeight: row.bold ? 900 : 500, color: row.color || "#333" }}>{row.value}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {activeTab === 1 && (
                                    <div>
                                        <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 800, color: "#111" }}>Balance Sheet</h3><p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#aaa" }}>As of April 30, 2026</p></div>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                                            <div style={{ borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                                                <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Assets</div>
                                                {bsRows.assets.map((row, i) => (
                                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: `${(row as any).indent ? "clamp(10px, 3vw, 11px) 16px clamp(10px, 3vw, 11px) 40px" : "clamp(12px, 3.5vw, 14px) 16px"}`, borderBottom: i === bsRows.assets.length - 1 ? "none" : "1px solid #f8f8f8", background: (row as any).bg || "transparent" }}>
                                                        <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: (row as any).bold ? 800 : 400, color: (row as any).color || "#555" }}>{row.label}</span>
                                                        {(row as any).value && <span style={{ fontWeight: (row as any).bold ? 900 : 500, color: (row as any).color || "#333", fontSize: "clamp(12px, 3.5vw, 13px)" }}>{(row as any).value}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                            <div style={{ borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                                                <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>Liabilities & Equity</div>
                                                {bsRows.liabilities.map((row, i) => (
                                                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: `${(row as any).indent ? "clamp(10px, 3vw, 11px) 16px clamp(10px, 3vw, 11px) 40px" : "clamp(12px, 3.5vw, 14px) 16px"}`, borderBottom: i === bsRows.liabilities.length - 1 ? "none" : "1px solid #f8f8f8", background: (row as any).bg || "transparent" }}>
                                                        <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: (row as any).bold ? 800 : 400, color: (row as any).color || "#555" }}>{row.label}</span>
                                                        {(row as any).value && <span style={{ fontWeight: (row as any).bold ? 900 : 500, color: (row as any).color || "#333", fontSize: "clamp(12px, 3.5vw, 13px)" }}>{(row as any).value}</span>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 2 && (
                                    <div>
                                        <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 800, color: "#111" }}>Cash Flow Statement</h3><p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#aaa" }}>For the period ending April 30, 2026</p></div>
                                        <div style={{ minWidth: 400 }}>
                                            {[
                                                { section: "Operating Activities", rows: [["Net Income", "$43,500"], ["Depreciation", "$2,000"], ["Change in A/R", "($4,200)"], ["Change in A/P", "$1,800"], ["Net Cash from Operations", "$43,100"]], color: "#00c9a7" },
                                                { section: "Investing Activities", rows: [["Equipment Purchase", "($12,000)"], ["Net Cash from Investing", "($12,000)"]], color: "#f59e0b" },
                                                { section: "Financing Activities", rows: [["Loan Repayment", "($5,000)"], ["Owner Drawings", "($8,000)"], ["Net Cash from Financing", "($13,000)"]], color: "#ef4444" },
                                            ].map((section, si) => (
                                                <div key={si} style={{ marginBottom: 20, borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                                                    <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(11px, 3vw, 12px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>{section.section}</div>
                                                    {section.rows.map(([l, v], i) => (
                                                        <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "clamp(10px, 3vw, 13px) 16px", borderBottom: i === section.rows.length - 1 ? "none" : "1px solid #f8f8f8", background: i === section.rows.length - 1 ? "#fafbff" : "transparent" }}>
                                                            <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: i === section.rows.length - 1 ? 800 : 400, color: i === section.rows.length - 1 ? "#111" : "#555" }}>{l}</span>
                                                            <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: i === section.rows.length - 1 ? 900 : 500, color: i === section.rows.length - 1 ? section.color : "#333" }}>{v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                            <div style={{ padding: "clamp(16px, 4vw, 20px) 16px", background: "#f0fdf9", borderRadius: 14, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                                <span style={{ fontWeight: 800, color: "#111", fontSize: "clamp(13px, 4vw, 14px)" }}>Net Change in Cash</span>
                                                <span style={{ fontWeight: 900, color: "#00c9a7", fontSize: "clamp(14px, 4vw, 16px)" }}>$18,100</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 3 && (
                                    <div>
                                        <div style={{ marginBottom: 20 }}><h3 style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 800, color: "#111" }}>Trial Balance</h3><p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#aaa" }}>As of April 30, 2026</p></div>
                                        <div style={{ minWidth: 500, borderRadius: 16, border: "1px solid #eee", overflow: "hidden" }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr", padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                                                <span>Account</span><span style={{ textAlign: "right" }}>Debit</span><span style={{ textAlign: "right" }}>Credit</span>
                                            </div>
                                            {[["1000 · Cash", "$84,200", ""], ["1200 · Accounts Receivable", "$28,600", ""], ["1500 · Inventory", "$14,300", ""], ["1800 · Equipment (Net)", "$48,000", ""], ["2000 · Accounts Payable", "", "$18,400"], ["2100 · Payroll Payable", "", "$8,200"], ["3000 · Owner's Capital", "", "$105,000"], ["3100 · Retained Earnings", "", "$43,500"], ["4000 · Sales Revenue", "", "$124,500"], ["5001 · Payroll Expense", "$28,000", ""], ["5010 · Office Expense", "$6,400", ""], ["5020 · Marketing", "$4,500", ""], ["5100 · COGS", "$42,100", ""]].map(([account, dr, cr], i) => (
                                                <div key={i} style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr", padding: "clamp(10px, 3vw, 12px) 16px", borderBottom: i === 12 ? "none" : "1px solid #f8f8f8", fontSize: "clamp(11px, 3.5vw, 13px)" }}>
                                                    <span style={{ color: "#444", fontWeight: 500 }}>{account}</span>
                                                    <span style={{ textAlign: "right", fontWeight: 600, color: dr ? "#111" : "#ddd" }}>{dr || "—"}</span>
                                                    <span style={{ textAlign: "right", fontWeight: 600, color: cr ? "#00c9a7" : "#ddd" }}>{cr || "—"}</span>
                                                </div>
                                            ))}
                                            <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr 1fr", padding: "clamp(14px, 4vw, 18px) 16px", background: "#f0fdf9", borderTop: "2px solid #eee" }}>
                                                <span style={{ fontWeight: 800, color: "#111", fontSize: "clamp(12px, 3.5vw, 14px)" }}>Totals</span>
                                                <span style={{ textAlign: "right", fontWeight: 900, color: "#111", fontSize: "clamp(12px, 3.5vw, 14px)" }}>$256,100</span>
                                                <span style={{ textAlign: "right", fontWeight: 900, color: "#00c9a7", fontSize: "clamp(12px, 3.5vw, 14px)" }}>$256,100 ✓</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── FEATURE ROWS (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(40px, 8vw, 80px) 5% 0", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
                        <div className="sec-label" style={{ color: "#f59e0b", justifyContent: "center" }}>All your reports</div>
                        <h2 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16, padding: "0 16px" }}>
                            One platform.<br /><span style={{ color: "#f59e0b" }}>Every report you need.</span>
                        </h2>
                    </Reveal>

                    {reportFeatures.map((feature, i) => (
                        <Reveal key={i} delay={0.05}>
                            <div style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                                gap: 40,
                                alignItems: "center",
                                padding: "clamp(40px, 8vw, 72px) 0",
                                borderBottom: i === reportFeatures.length - 1 ? "none" : "1px solid #f0f0f0",
                            }}>
                                <div>
                                    <div style={{ width: 48, height: 48, borderRadius: 14, background: `${feature.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>{feature.icon}</div>
                                    <h3 style={{ fontSize: "clamp(22px, 5vw, 34px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 16 }}>{feature.title}</h3>
                                    <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#777", lineHeight: 1.7, marginBottom: 28 }}>{feature.desc}</p>
                                    <button style={{ padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)", borderRadius: 10, border: `2px solid ${feature.color}`, background: "transparent", color: feature.color, fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 800, cursor: "pointer" }}>
                                        View {feature.title} →
                                    </button>
                                </div>
                                <div>
                                    <div style={{ background: "#0a0a0a", borderRadius: 24, padding: "clamp(24px, 5vw, 36px)" }}>
                                        <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#555", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 20 }}>April 2026 Snapshot</div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                            {feature.stats.map(([val, label], si) => (
                                                <div key={si} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "clamp(14px, 4vw, 18px) 0", borderBottom: si === feature.stats.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
                                                    <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
                                                    <span style={{ fontSize: "clamp(18px, 5vw, 20px)", fontWeight: 900, color: feature.color, letterSpacing: "-0.5px" }}>{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: 20, padding: "clamp(10px, 3vw, 12px) 16px", background: `${feature.color}18`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: feature.color, display: "inline-block" }} />
                                            <span style={{ fontSize: "clamp(11px, 3vw, 12px)", color: feature.color, fontWeight: 700 }}>Live data · Updated just now</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── EXTRA REPORTS (RESPONSIVE) ── */}
            <section style={{ padding: "clamp(40px, 8vw, 80px) 5%", background: "#f8fafc" }}>
                <Reveal>
                    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                        <h3 style={{ fontSize: "clamp(14px, 4vw, 18px)", fontWeight: 800, color: "#888", marginBottom: 20, textTransform: "uppercase", letterSpacing: "1px" }}>Also included</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
                            {[["🧾", "Aged Receivables", "Track overdue invoices by days outstanding"], ["📊", "Vendor Reports", "Spending by vendor & payment history"], ["📉", "Expense Breakdown", "Category-level expense analysis"], ["📬", "AR Aging Summary", "Quick snapshot of outstanding balances"]].map(([icon, title, desc]) => (
                                <div key={title as string} style={{ background: "#fff", borderRadius: 16, padding: "clamp(16px, 4vw, 24px)", border: "1px solid #eee", display: "flex", gap: 16, alignItems: "flex-start" }}>
                                    <span style={{ fontSize: "clamp(20px, 5vw, 22px)", flexShrink: 0 }}>{icon}</span>
                                    <div>
                                        <div style={{ fontSize: "clamp(13px, 4vw, 14px)", fontWeight: 800, color: "#111", marginBottom: 6 }}>{title}</div>
                                        <div style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#999", lineHeight: 1.5 }}>{desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ── CTA (RESPONSIVE) ── */}
            <section style={{ background: "#0a0a0a" }}>
                <Reveal>
                    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0 }}>
                        <div style={{ padding: "clamp(40px, 8vw, 80px) 5%", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                            <h2 style={{ fontSize: "clamp(24px, 6vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>Your financials. Instantly.</h2>
                            <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.65, marginBottom: 28, maxWidth: 340 }}>Run every financial report your business needs in seconds — no spreadsheets required.</p>
                            <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 36px)", fontSize: "clamp(13px, 3.5vw, 15px)" }}>Start free today</button>
                        </div>
                        <div style={{ padding: "clamp(40px, 8vw, 80px) 5%", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
                            {["No credit card required", "Export to PDF or Excel in one click", "Share directly with your CPA", "GAAP-compliant from day one"].map(item => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                    <span style={{ color: "#f59e0b", fontWeight: 800, fontSize: "clamp(12px, 3.5vw, 14px)" }}>✓</span>
                                    <span style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
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