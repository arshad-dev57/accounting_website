"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function GeneralLedgerPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
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

    const entries = [
        { date: "Apr 28, 2026", ref: "JE-1042", desc: "Office Supplies — Expense", debit: "$1,200.00", credit: "", account: "5010 · Office Expense" },
        { date: "Apr 28, 2026", ref: "JE-1042", desc: "Cash — Credit", debit: "", credit: "$1,200.00", account: "1000 · Cash" },
        { date: "Apr 27, 2026", ref: "JE-1041", desc: "Invoice #INV-0088 — Acme Corp", debit: "$8,500.00", credit: "", account: "1200 · Accounts Receivable" },
        { date: "Apr 27, 2026", ref: "JE-1041", desc: "Revenue — Service Income", debit: "", credit: "$8,500.00", account: "4000 · Sales Revenue" },
        { date: "Apr 26, 2026", ref: "JE-1040", desc: "Payroll — April 2026", debit: "$32,000.00", credit: "", account: "5001 · Payroll Expense" },
        { date: "Apr 26, 2026", ref: "JE-1040", desc: "Payroll Payable — April 2026", debit: "", credit: "$32,000.00", account: "2100 · Payroll Payable" },
        { date: "Apr 25, 2026", ref: "JE-1039", desc: "Loan Repayment — Chase Bank", debit: "$5,000.00", credit: "", account: "2500 · Loans Payable" },
        { date: "Apr 25, 2026", ref: "JE-1039", desc: "Cash — Loan Repayment", debit: "", credit: "$5,000.00", account: "1000 · Cash" },
    ];

    const features = [
        { num: "01", icon: "⚖️", title: "Double-Entry System", desc: "Every transaction is balanced. Debits always equal credits — no exceptions, no errors." },
        { num: "02", icon: "📋", title: "Journal Entries", desc: "Create, review, and post journal entries with full descriptions, dates, and reference numbers." },
        { num: "03", icon: "🔍", title: "Audit Trail", desc: "Every edit, post, and reversal is logged with timestamp and user — fully immutable." },
        { num: "04", icon: "📅", title: "Period Management", desc: "Open and close accounting periods. Lock historical entries to prevent accidental changes." },
        { num: "05", icon: "🔄", title: "Reversing Entries", desc: "Auto-reverse accrual entries at the start of the next period with a single toggle." },
        { num: "06", icon: "📊", title: "Trial Balance Export", desc: "Generate a trial balance at any date. Export to Excel, PDF, or share with your CPA." },
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

            {/* ── MOBILE MENU (EXACT SAME AS OURSTORY) ── */}
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

            {/* ── SPLIT-SCREEN HERO (DESIGN JO THA) ── */}
            <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", background: "#fff" }}>
                {/* Left panel */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5% 80px 8%", background: "linear-gradient(160deg, #f5f0ff 0%, #fff 60%)", borderRight: "1px solid #eee", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 80, right: -20, fontSize: 280, fontWeight: 900, color: "rgba(108,99,255,0.04)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>GL</div>

                    <Reveal dir="left">
                        <div className="sec-label" style={{ marginBottom: 28 }}>General Ledger</div>
                        <h1 style={{ fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 800, letterSpacing: "-2.5px", color: "#111", marginBottom: 24, lineHeight: 1.08 }}>
                            Every transaction.<br /><span style={{ color: "#6c63ff" }}>Perfectly recorded.</span>
                        </h1>
                        <p style={{ fontSize: 17, color: "#666", maxWidth: 460, marginBottom: 40, lineHeight: 1.65 }}>
                            A full double-entry general ledger with real-time posting, complete journal entries, and an immutable audit trail — built to meet GAAP standards.
                        </p>

                        <div style={{ display: "flex", gap: 32, marginBottom: 40, flexWrap: "wrap" }}>
                            {[["$46,700", "Debits Posted"], ["$46,700", "Credits Matched"], ["100%", "Balanced"]].map(([val, label]) => (
                                <div key={label}>
                                    <div style={{ fontSize: 22, fontWeight: 900, color: "#6c63ff", letterSpacing: "-1px" }}>{val}</div>
                                    <div style={{ fontSize: 11, color: "#999", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 3 }}>{label}</div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <button className="btn-teal" style={{ padding: "15px 36px" }}>Start for free</button>
                            <button className="btn-outline" style={{ padding: "15px 36px" }}>Watch demo</button>
                        </div>
                    </Reveal>
                </div>

                {/* Right panel — mini ledger preview */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5% 80px", background: "#fafbff" }}>
                    <Reveal dir="right" delay={0.15}>
                        <div style={{ background: "#fff", borderRadius: 20, boxShadow: "0 24px 64px rgba(108,99,255,0.10), 0 0 0 1px #eee", overflow: "hidden" }}>
                            <div style={{ padding: "18px 24px", background: "#f8fafc", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 800, color: "#111" }}>General Ledger</div>
                                    <div style={{ fontSize: 11, color: "#aaa" }}>April 2026 · All Accounts</div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fee2e2", display: "inline-block" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fef9c3", display: "inline-block" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#dcfce7", display: "inline-block" }} />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1, background: "#eee" }}>
                                {[["Total Debits", "$46,700.00", "#6c63ff"], ["Total Credits", "$46,700.00", "#00c9a7"], ["Journal Entries", "4 entries", "#f59e0b"], ["Accounts Used", "8 accounts", "#64748b"]].map(([l, v, c], i) => (
                                    <div key={i} style={{ background: "#fff", padding: "16px 20px" }}>
                                        <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", marginBottom: 6 }}>{l}</div>
                                        <div style={{ fontSize: 18, fontWeight: 900, color: c, letterSpacing: "-0.5px" }}>{v}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 2fr 1fr 1fr", padding: "10px 20px", background: "#f8fafc", borderTop: "1px solid #eee", fontSize: 9, fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                                <span>Date</span><span>Ref</span><span>Description</span><span style={{ textAlign: "right" }}>Debit</span><span style={{ textAlign: "right" }}>Credit</span>
                            </div>

                            {entries.slice(0, 4).map((row, i) => (
                                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 0.7fr 2fr 1fr 1fr", padding: "12px 20px", borderBottom: i === 3 ? "none" : "1px solid #f8f8f8", fontSize: 11, alignItems: "center", background: i % 2 === 0 ? "#fff" : "#fafbff" }}>
                                    <span style={{ color: "#999", fontWeight: 500 }}>{row.date}</span>
                                    <span style={{ color: "#6c63ff", fontWeight: 700, fontSize: 10 }}>{row.ref}</span>
                                    <span style={{ color: "#333", fontWeight: 500 }}>{row.desc.length > 22 ? row.desc.slice(0, 22) + "…" : row.desc}</span>
                                    <span style={{ textAlign: "right", fontWeight: 700, color: row.debit ? "#111" : "#ddd" }}>{row.debit || "—"}</span>
                                    <span style={{ textAlign: "right", fontWeight: 700, color: row.credit ? "#00c9a7" : "#ddd" }}>{row.credit || "—"}</span>
                                </div>
                            ))}

                            <div style={{ padding: "14px 20px", background: "#f0fdf9", borderTop: "2px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#555" }}>Period Balance</span>
                                <span style={{ fontSize: 14, fontWeight: 900, color: "#6c63ff" }}>$0.00 ✓ Balanced</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── FULL-WIDTH TABLE SECTION ── */}
            <section style={{ padding: "80px 5%", background: "#fff" }}>
                <Reveal>
                    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 20 }}>
                            <div>
                                <div className="sec-label">Live Ledger</div>
                                <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#111", marginTop: 8 }}>April 2026 · All Accounts</h2>
                            </div>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                <button style={{ padding: "10px 20px", borderRadius: 10, border: "1px solid #eee", background: "#f8fafc", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer" }}>↓ Export</button>
                                <button className="btn-dark" style={{ padding: "10px 24px" }}>+ Journal Entry</button>
                            </div>
                        </div>

                        <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #eee", overflowX: "auto" }}>
                            <div style={{ minWidth: 800 }}>
                                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 2.5fr 1.2fr 1.2fr 1.8fr", padding: "14px 28px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                                    <span>Date</span><span>Ref #</span><span>Description</span><span style={{ textAlign: "right" }}>Debit</span><span style={{ textAlign: "right" }}>Credit</span><span>Account</span>
                                </div>
                                {entries.map((row, i) => (
                                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 2.5fr 1.2fr 1.2fr 1.8fr", padding: "18px 28px", borderBottom: i === entries.length - 1 ? "none" : "1px solid #f8f8f8", fontSize: 13, alignItems: "center", background: i % 4 < 2 ? "#fff" : "#fafbff" }}>
                                        <span style={{ color: "#888", fontWeight: 500 }}>{row.date}</span>
                                        <span style={{ color: "#6c63ff", fontWeight: 700, fontSize: 12 }}>{row.ref}</span>
                                        <span style={{ color: "#333", fontWeight: 500 }}>{row.desc}</span>
                                        <span style={{ textAlign: "right", fontWeight: 700, color: row.debit ? "#111" : "#ddd" }}>{row.debit || "—"}</span>
                                        <span style={{ textAlign: "right", fontWeight: 700, color: row.credit ? "#00c9a7" : "#ddd" }}>{row.credit || "—"}</span>
                                        <span style={{ fontSize: 12, color: "#888", fontWeight: 600 }}>{row.account}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 16, padding: "20px 28px", background: "#f0fdf9", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                            <span style={{ fontSize: 14, fontWeight: 700, color: "#555" }}>Period Balance</span>
                            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, marginBottom: 3 }}>TOTAL DEBIT</div><div style={{ fontSize: 18, fontWeight: 900, color: "#111" }}>$46,700.00</div></div>
                                <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, marginBottom: 3 }}>TOTAL CREDIT</div><div style={{ fontSize: 18, fontWeight: 900, color: "#00c9a7" }}>$46,700.00</div></div>
                                <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#aaa", fontWeight: 600, marginBottom: 3 }}>BALANCE</div><div style={{ fontSize: 18, fontWeight: 900, color: "#6c63ff" }}>$0.00 ✓</div></div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* ── FEATURES ── */}
            <section style={{ padding: "100px 5%", background: "#0a0a0a" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal style={{ marginBottom: 64 }}>
                        <div className="sec-label" style={{ color: "#6c63ff" }}>Core capabilities</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 12, flexWrap: "wrap", gap: 20 }}>
                            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1 }}>
                                The ledger at the<br /><span style={{ color: "#6c63ff" }}>heart of your books.</span>
                            </h2>
                            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 300, textAlign: "right", lineHeight: 1.6 }}>Everything you need for GAAP-compliant double-entry bookkeeping.</p>
                        </div>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {features.map((f, i) => (
                            <Reveal key={i} delay={i * 0.06}>
                                <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", alignItems: "center", padding: "32px 0", borderBottom: i === features.length - 1 ? "none" : "1px solid rgba(255,255,255,0.06)", gap: 40 }} className="feature-grid">
                                    <span style={{ fontSize: 13, fontWeight: 900, color: "rgba(108,99,255,0.5)", fontFamily: "monospace", letterSpacing: "1px" }}>{f.num}</span>
                                    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                                        <span style={{ fontSize: 28 }}>{f.icon}</span>
                                        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{f.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GAAP HIGHLIGHT ── */}
            <section style={{ padding: "120px 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 80, alignItems: "center" }}>
                    <Reveal dir="left">
                        <div style={{ background: "#0a0a0a", borderRadius: 28, padding: 36 }}>
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 11, color: "#555", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Journal Entry · JE-1042</div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Office Supplies Expense</div>
                                <div style={{ fontSize: 13, color: "#666" }}>April 28, 2026 · Posted by admin@company.com</div>
                            </div>
                            {[
                                { account: "5010 · Office Expense", type: "DR", amount: "$1,200.00", color: "#fff" },
                                { account: "1000 · Cash", type: "CR", amount: "$1,200.00", color: "#00c9a7" },
                            ].map((row, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                                        <span style={{ background: i === 0 ? "rgba(108,99,255,0.2)" : "rgba(0,201,167,0.15)", color: i === 0 ? "#6c63ff" : "#00c9a7", fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 6, letterSpacing: 1 }}>{row.type}</span>
                                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{row.account}</span>
                                    </div>
                                    <span style={{ fontSize: 15, fontWeight: 800, color: row.color }}>{row.amount}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(108,99,255,0.1)", borderRadius: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                <span style={{ fontSize: 13, color: "#888", fontWeight: 600 }}>Balance Check</span>
                                <span style={{ fontSize: 14, fontWeight: 800, color: "#6c63ff" }}>✓ Balanced · $0.00</span>
                            </div>
                            <div style={{ marginTop: 12, padding: "10px 18px", background: "rgba(255,255,255,0.03)", borderRadius: 10, fontSize: 11, color: "#555", fontWeight: 500 }}>🔒 Locked · Audit trail updated at 11:42 AM</div>
                        </div>
                    </Reveal>

                    <Reveal dir="right" delay={0.1}>
                        <div className="sec-label">GAAP-Compliant</div>
                        <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 20, color: "#0a0a0a", marginTop: 16 }}>Built on the principles your firm demands.</h2>
                        <p style={{ fontSize: 16, color: "#777", lineHeight: 1.78, marginBottom: 28 }}>LedgerPro enforces double-entry bookkeeping, accrual basis accounting, and full disclosure at every step. No shortcuts, no workarounds — just clean, professional financials.</p>
                        <ul style={{ listStyle: "none", padding: 0 }}>
                            {["Accrual & cash basis supported", "Automatic debit/credit validation", "Period locking & year-end close", "CPA-ready trial balance output"].map(item => (
                                <li key={item} style={{ marginBottom: 13, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                                    <span style={{ color: "#6c63ff", fontWeight: 700, fontSize: 16 }}>✓</span>
                                    <span style={{ fontSize: 15, fontWeight: 500, color: "#333" }}>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: "0", background: "#6c63ff" }}>
                <Reveal>
                    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "center", padding: "60px 5%", gap: 40 }}>
                        <div>
                            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-1.5px" }}>Clean books start here.</h2>
                            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 480 }}>Join thousands of businesses using LedgerPro for accurate, GAAP-compliant bookkeeping.</p>
                        </div>
                        <button style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: 16, fontWeight: 800, background: "#fff", color: "#6c63ff", border: "none", borderRadius: 14, cursor: "pointer", fontFamily: "inherit", justifySelf: "flex-end" }}>Start free today →</button>
                    </div>
                </Reveal>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#f8f8f8", borderTop: "1px solid #efefef", padding: "72px 5% 40px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 64 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, justifyContent: "center" }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>LP</span>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>LedgerPro</span>
                            </div>
                            <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.78, textAlign: "center" }}>The complete financial operating system.</p>
                        </div>
                        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                            <div key={section} style={{ textAlign: "center" }}>
                                <h4 style={{ fontSize: 12, fontWeight: 800, marginBottom: 18, letterSpacing: 1, textTransform: "uppercase", color: "#888" }}>{section}</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {links.map(link => (
                                        <li key={link} style={{ marginBottom: 11 }}>
                                            <a href="#" style={{ fontSize: 14, color: "#bbb", textDecoration: "none" }}>{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 28, textAlign: "center" }}>
                        <p style={{ fontSize: 13, color: "#ccc" }}>© 2026 LedgerPro, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}