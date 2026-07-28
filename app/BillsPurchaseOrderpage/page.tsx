"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function BillsPurchaseOrdersPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedBill, setSelectedBill] = useState(0);
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

    const bills = [
        {
            id: "BILL-0041", vendor: "Apex Office Supply Co.", amount: "$3,240.00", due: "May 5, 2026", status: "Overdue",
            statusColor: "#ef4444", items: [["Office Paper (10 ream)", "×20", "$480.00"], ["Printer Cartridges", "×12", "$960.00"], ["Desk Organizers", "×8", "$320.00"], ["Packing Tape (bulk)", "×4", "$80.00"]],
            po: "PO-0089", issued: "Apr 10, 2026", terms: "Net 30", total: "$3,240.00",
        },
        {
            id: "BILL-0040", vendor: "CloudHost Solutions", amount: "$1,800.00", due: "May 12, 2026", status: "Pending",
            statusColor: "#f59e0b", items: [["Monthly Hosting — Pro", "×1", "$900.00"], ["CDN Bandwidth Pack", "×2", "$600.00"], ["SSL Certificate", "×1", "$300.00"]],
            po: "PO-0088", issued: "Apr 14, 2026", terms: "Net 30", total: "$1,800.00",
        },
        {
            id: "BILL-0039", vendor: "Swift Logistics Ltd.", amount: "$6,500.00", due: "Apr 30, 2026", status: "Approved",
            statusColor: "#6c63ff", items: [["Freight — Karachi to Lahore", "×3", "$3,900.00"], ["Warehouse Storage (30 days)", "×1", "$1,800.00"], ["Insurance Premium", "×1", "$800.00"]],
            po: "PO-0087", issued: "Apr 2, 2026", terms: "Net 28", total: "$6,500.00",
        },
        {
            id: "BILL-0038", vendor: "TechGear Distributors", amount: "$12,400.00", due: "Apr 20, 2026", status: "Paid",
            statusColor: "#00c9a7", items: [["Laptop — Dell XPS 15", "×4", "$8,000.00"], ["Monitor — 27\" 4K", "×4", "$3,200.00"], ["USB-C Docking Station", "×4", "$1,200.00"]],
            po: "PO-0086", issued: "Mar 22, 2026", terms: "Net 30", total: "$12,400.00",
        },
    ];

    const active = bills[selectedBill];

    const statusConfig: Record<string, { bg: string; text: string }> = {
        Overdue: { bg: "#fff1f2", text: "#ef4444" },
        Pending: { bg: "#fff8f0", text: "#f59e0b" },
        Approved: { bg: "#f5f0ff", text: "#6c63ff" },
        Paid: { bg: "#f0fdf9", text: "#00c9a7" },
    };

    const pipeline = [
        { stage: "Draft", count: 3, icon: "📝", color: "#94a3b8" },
        { stage: "Pending Approval", count: 2, icon: "🔍", color: "#f59e0b" },
        { stage: "Approved", count: 1, icon: "✅", color: "#6c63ff" },
        { stage: "Paid", count: 8, icon: "💸", color: "#00c9a7" },
    ];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

            <CookieBanner />

            {/* ── NAVBAR (EXACT COPY FROM OURSTORY/INVOICING PAGE) ── */}
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

            {/* ── REST OF YOUR PAGE (SAME AS BEFORE) ── */}
            {/* HERO SECTION */}
            <section style={{ paddingTop: "clamp(100px, 15vw, 120px)", paddingBottom: 0, background: "linear-gradient(160deg, #f0fdf9 0%, #fff8f0 50%, #fff 100%)" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 60px)" }}>
                            <div className="sec-label" style={{ justifyContent: "center" }}>Bills & Purchase Orders</div>
                            <h1 style={{ fontSize: "clamp(32px, 8vw, 68px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", marginBottom: 20, lineHeight: 1.1, marginTop: 16, padding: "0 16px" }}>
                                Payables that<br /><span style={{ color: "#00c9a7" }}>never slip through.</span>
                            </h1>
                            <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 580, margin: "0 auto 32px", lineHeight: 1.6, padding: "0 16px" }}>
                                From purchase order to payment — track every vendor bill, manage approvals, and keep your cash flow perfectly in control.
                            </p>
                            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
                                <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)", fontSize: "clamp(14px, 3.5vw, 16px)" }}>Start managing bills</button>
                                <button className="btn-outline" style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)", fontSize: "clamp(14px, 3.5vw, 16px)" }}>Watch demo</button>
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16, marginBottom: 0 }}>
                            {pipeline.map((p, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 8px 32px" }}>
                                    <div style={{ width: "clamp(50px, 12vw, 72px)", height: "clamp(50px, 12vw, 72px)", borderRadius: "50%", background: "#fff", border: `3px solid ${p.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(20px, 5vw, 26px)", marginBottom: 12, boxShadow: `0 8px 24px ${p.color}20` }}>
                                        {p.icon}
                                    </div>
                                    <div style={{ fontSize: "clamp(12px, 3.5vw, 15px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{p.stage}</div>
                                    <div style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 900, color: p.color, letterSpacing: "-1px" }}>{p.count}</div>
                                    <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#aaa", fontWeight: 600 }}>bills</div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* TWO-PANEL BILL MANAGER */}
            <section style={{ padding: "clamp(40px, 8vw, 80px) 5%", background: "#fff" }}>
                <Reveal delay={0.05}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 0, borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.08), 0 0 0 1px #eee" }}>
                        {/* LEFT: Bill list */}
                        <div style={{ background: "#f8fafc" }}>
                            <div style={{ padding: "clamp(16px, 4vw, 20px)", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                                <div>
                                    <div style={{ fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 800, color: "#111" }}>Bills & POs</div>
                                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>April 2026 · 4 shown</div>
                                </div>
                                <button style={{ padding: "7px 16px", borderRadius: 8, background: "#0a0a0a", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ New Bill</button>
                            </div>

                            <div style={{ padding: "12px 16px", borderBottom: "1px solid #eee", display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {["All", "Overdue", "Pending", "Paid"].map((f, i) => (
                                    <span key={f} style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 700, background: i === 0 ? "#0a0a0a" : "#fff", color: i === 0 ? "#fff" : "#999", border: "1px solid #eee", cursor: "pointer" }}>{f}</span>
                                ))}
                            </div>

                            {bills.map((bill, i) => {
                                const sc = statusConfig[bill.status];
                                const isSelected = selectedBill === i;
                                return (
                                    <div key={i} onClick={() => setSelectedBill(i)} style={{ padding: "16px", borderBottom: "1px solid #eee", cursor: "pointer", background: isSelected ? "#fff" : "transparent", borderLeft: isSelected ? `3px solid ${bill.statusColor}` : "3px solid transparent" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap", gap: 8 }}>
                                            <div>
                                                <div style={{ fontSize: 13, fontWeight: 800, color: "#111", marginBottom: 2 }}>{bill.vendor}</div>
                                                <div style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>{bill.id} · {bill.po}</div>
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                <div style={{ fontSize: 14, fontWeight: 900, color: "#111" }}>{bill.amount}</div>
                                                <span style={{ fontSize: 10, fontWeight: 700, background: sc.bg, color: sc.text, padding: "2px 8px", borderRadius: 100, marginTop: 4, display: "inline-block" }}>{bill.status}</span>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: 11, color: "#bbb", fontWeight: 500 }}>Due: {bill.due}</div>
                                    </div>
                                );
                            })}

                            <div style={{ padding: "16px", background: "#f0fdf9", borderTop: "2px solid #eee" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>Total Payable</span>
                                    <span style={{ fontSize: 16, fontWeight: 900, color: "#00c9a7" }}>$23,940.00</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Bill detail */}
                        <div style={{ background: "#fff", padding: "clamp(20px, 5vw, 32px)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, paddingBottom: 20, borderBottom: "1px solid #f0f0f0", flexWrap: "wrap", gap: 16 }}>
                                <div>
                                    <div style={{ fontSize: 11, color: "#bbb", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{active.id}</div>
                                    <h3 style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 800, color: "#111", marginBottom: 6 }}>{active.vendor}</h3>
                                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#999", flexWrap: "wrap" }}>
                                        <span>PO: <b style={{ color: "#6c63ff" }}>{active.po}</b></span>
                                        <span>Issued: {active.issued}</span>
                                        <span>Terms: {active.terms}</span>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, background: statusConfig[active.status].bg, color: statusConfig[active.status].text, padding: "6px 16px", borderRadius: 100, display: "inline-block" }}>{active.status}</span>
                                    <div style={{ fontSize: "clamp(22px, 6vw, 28px)", fontWeight: 900, color: "#111", marginTop: 12, letterSpacing: "-1px" }}>{active.total}</div>
                                    <div style={{ fontSize: 12, color: "#bbb", marginTop: 4 }}>Due {active.due}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: 24, overflowX: "auto" }}>
                                <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>Line Items</div>
                                <div style={{ minWidth: 400, borderRadius: 14, border: "1px solid #eee", overflow: "hidden" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", padding: "10px 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>
                                        <span>Description</span><span style={{ textAlign: "center" }}>Qty</span><span style={{ textAlign: "right" }}>Amount</span>
                                    </div>
                                    {active.items.map(([desc, qty, amt], i) => (
                                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", padding: "12px 16px", borderBottom: i === active.items.length - 1 ? "none" : "1px solid #f8f8f8", fontSize: "clamp(11px, 3.5vw, 13px)" }}>
                                            <span style={{ fontWeight: 500, color: "#333" }}>{desc}</span>
                                            <span style={{ textAlign: "center", color: "#999", fontWeight: 600 }}>{qty}</span>
                                            <span style={{ textAlign: "right", fontWeight: 700, color: "#111" }}>{amt}</span>
                                        </div>
                                    ))}
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto", padding: "14px 16px", background: "#f8fafc", borderTop: "2px solid #eee" }}>
                                        <span style={{ fontWeight: 800, color: "#111" }}>Total</span>
                                        <span />
                                        <span style={{ textAlign: "right", fontWeight: 900, color: "#00c9a7", fontSize: "clamp(14px, 4vw, 16px)" }}>{active.total}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                                {active.status !== "Paid" && (
                                    <button className="btn-teal" style={{ padding: "10px 20px", fontSize: 13 }}>
                                        {active.status === "Approved" ? "💸 Mark as Paid" : "✓ Approve Bill"}
                                    </button>
                                )}
                                <button style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #eee", background: "#f8fafc", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer" }}>↓ Download PDF</button>
                                <button style={{ padding: "10px 16px", borderRadius: 10, border: "1px solid #eee", background: "#f8fafc", fontSize: 13, fontWeight: 600, color: "#555", cursor: "pointer" }}>✉ Email Vendor</button>
                                {active.status === "Paid" && (
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "#f0fdf9", borderRadius: 10, border: "1px solid #dcfce7" }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#00c9a7" }}>✓ Payment Recorded</span>
                                    </div>
                                )}
                            </div>

                            <div style={{ marginTop: 20, padding: "12px 16px", background: "#fafbff", borderRadius: 10, border: "1px solid #eee", fontSize: 12, color: "#aaa", fontWeight: 500 }}>
                                🔒 Logged to General Ledger · Auto-posted to Accounts Payable
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* FEATURES SECTION */}
            <section style={{ padding: "clamp(60px, 10vw, 100px) 5%", background: "#0a0a0a" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal style={{ marginBottom: 48 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 40, alignItems: "end" }}>
                            <div>
                                <div className="sec-label" style={{ color: "#00c9a7" }}>Core capabilities</div>
                                <h2 style={{ fontSize: "clamp(28px, 6vw, 46px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.1, marginTop: 16 }}>
                                    Payables<br /><span style={{ color: "#00c9a7" }}>done right.</span>
                                </h2>
                            </div>
                            <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
                                From the moment you issue a purchase order to the second a bill is paid — every step is tracked, logged, and perfectly organized.
                            </p>
                        </div>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
                        {[
                            { icon: "📄", title: "Purchase Orders", desc: "Create and send POs to vendors with line items, quantities, and delivery terms. Auto-convert to bills on receipt.", accent: "#00c9a7" },
                            { icon: "🧾", title: "Bill Management", desc: "Log vendor bills directly or link them to POs. Track due dates, payment terms, and outstanding balances.", accent: "#f59e0b" },
                            { icon: "✅", title: "Approval Workflows", desc: "Set up multi-step approval flows for bills above thresholds. No payment leaves without the right sign-off.", accent: "#6c63ff" },
                            { icon: "📅", title: "Due Date Tracking", desc: "Get notified before bills go overdue. See aging payables at a glance and never miss a payment deadline.", accent: "#3b82f6" },
                            { icon: "🔗", title: "Auto Ledger Posting", desc: "Every approved bill automatically posts a journal entry to Accounts Payable and the correct expense account.", accent: "#00c9a7" },
                            { icon: "📊", title: "Vendor Spend Reports", desc: "Analyse spending by vendor, category, or time period. Know exactly where your money is going every month.", accent: "#f59e0b" },
                        ].map((f, i) => (
                            <Reveal key={i} delay={i * 0.06}>
                                <div style={{ background: "rgba(255,255,255,0.03)", padding: "clamp(24px, 5vw, 28px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", height: "100%", borderTop: `2px solid ${f.accent}40` }}>
                                    <div style={{ fontSize: "clamp(24px, 6vw, 28px)", marginBottom: 16 }}>{f.icon}</div>
                                    <h3 style={{ fontSize: "clamp(16px, 4vw, 17px)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>{f.title}</h3>
                                    <p style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{f.desc}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section style={{ padding: "clamp(60px, 10vw, 100px) 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
                        <div className="sec-label" style={{ justifyContent: "center" }}>How it works</div>
                        <h2 style={{ fontSize: "clamp(28px, 6vw, 44px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16, padding: "0 16px" }}>
                            PO to payment in <span style={{ color: "#00c9a7" }}>four steps.</span>
                        </h2>
                    </Reveal>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
                        {[
                            { step: "1", title: "Create PO", desc: "Issue a purchase order to your vendor with line items and delivery terms.", color: "#00c9a7" },
                            { step: "2", title: "Receive Bill", desc: "Vendor sends invoice — log it directly or match it to your PO automatically.", color: "#f59e0b" },
                            { step: "3", title: "Approve", desc: "Route through your approval chain. Set limits and required approvers.", color: "#6c63ff" },
                            { step: "4", title: "Pay & Close", desc: "Mark as paid. Journal entry posts automatically to your general ledger.", color: "#00c9a7" },
                        ].map((s, i) => (
                            <Reveal key={i} delay={i * 0.08}>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                    <div style={{ width: "clamp(48px, 12vw, 56px)", height: "clamp(48px, 12vw, 56px)", borderRadius: "50%", background: `${s.color}15`, border: `2px solid ${s.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 900, color: s.color, marginBottom: 16 }}>{s.step}</div>
                                    <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#111", marginBottom: 8 }}>{s.title}</div>
                                    <div style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "#999", lineHeight: 1.6 }}>{s.desc}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: "#00c9a7" }}>
                <Reveal>
                    <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 0 }}>
                        <div style={{ padding: "clamp(40px, 8vw, 80px) 5%" }}>
                            <h2 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, color: "#fff", marginBottom: 14, letterSpacing: "-0.02em" }}>Never miss a payment again.</h2>
                            <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, marginBottom: 28, maxWidth: 360 }}>
                                Manage all your vendor bills and purchase orders from one clean, organized view.
                            </p>
                            <button style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 36px)", fontSize: "clamp(13px, 3.5vw, 15px)", fontWeight: 800, background: "#fff", color: "#00c9a7", border: "none", borderRadius: 12, cursor: "pointer" }}>Start free today →</button>
                        </div>
                        <div style={{ padding: "clamp(40px, 8vw, 80px) 5%", background: "rgba(0,0,0,0.06)" }}>
                            {["Full purchase order creation & tracking", "Multi-step approval workflows", "Auto-post to accounts payable", "Aged payables & vendor spend reports", "PDF export & vendor email integration"].map(item => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                                    <span style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(12px, 3.5vw, 14px)" }}>✓</span>
                                    <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* FOOTER */}
            <footer style={{ background: "#fafafa", padding: "60px 5% 32px", borderTop: "1px solid #eee" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, marginBottom: 48 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, justifyContent: "center" }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>LP</span>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>LedgerPro</span>
                            </div>
                            <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.6, textAlign: "center" }}>The complete financial operating system.</p>
                        </div>
                        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                            <div key={section} style={{ textAlign: "center" }}>
                                <h4 style={{ fontSize: 12, fontWeight: 800, marginBottom: 16, letterSpacing: 1, textTransform: "uppercase", color: "#888" }}>{section}</h4>
                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {links.map(link => (
                                        <li key={link} style={{ marginBottom: 10 }}>
                                            <a href="#" style={{ fontSize: 13, color: "#bbb", textDecoration: "none" }}>{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 24, textAlign: "center" }}>
                        <p style={{ fontSize: 12, color: "#ccc" }}>© 2026 LedgerPro, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}