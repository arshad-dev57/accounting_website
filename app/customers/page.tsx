"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS, TESTIMONIALS, TRUSTED_COMPANIES } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function CustomersPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
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

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const successStories = [
        {
            name: "TechVenture Inc.",
            logo: "TV",
            industry: "SaaS / Technology",
            quote: "LedgerPro cut our month-end close from 5 days to just 4 hours. The automation is incredible.",
            metric: "92%",
            metricLabel: "faster close",
            image: "https://images.unsplash.com/photo-1551434678-e076c2231d2c?w=600&q=80",
            color: "#6c63ff",
        },
        {
            name: "Buildify Construction",
            logo: "BC",
            industry: "Construction",
            quote: "Managing job costs and vendor payments used to be chaos. Now everything is organized and real-time.",
            metric: "$2.4M",
            metricLabel: "costs tracked",
            image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80",
            color: "#00c9a7",
        },
        {
            name: "NovaCPA Firm",
            logo: "NC",
            industry: "Accounting Firm",
            quote: "We manage 30+ clients on LedgerPro. The multi-client view and trial balance exports are game-changers.",
            metric: "500+",
            metricLabel: "clients managed",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
            color: "#f59e0b",
        },
        {
            name: "Bloom Retail Co.",
            logo: "BR",
            industry: "Retail / E-commerce",
            quote: "Bank reconciliation that actually works. LedgerPro saved us 20+ hours every month.",
            metric: "100%",
            metricLabel: "reconciliation accuracy",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
            color: "#3b82f6",
        },
    ];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />

            {/* ── COOKIE BANNER ── */}
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

            {/* ── HERO SECTION ── */}
            <section style={{ paddingTop: 120, paddingBottom: 60, background: "#fff" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#1088dd", justifyContent: "center", marginBottom: 24 }}>Trusted by thousands</div>
                        <h1 style={{ fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
                            Join <span style={{ color: "#02437f" }}>10,000+ businesses</span><br />
                            using BisonTechs
                        </h1>
                        <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 680, margin: "0 auto", lineHeight: 1.65, padding: "0 16px" }}>
                            From startups to accounting firms — see why modern finance teams are switching to BisonTechs.
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* ── TRUSTED COMPANIES ── */}
            <section style={{ padding: "40px 5%", background: "#f8fafc", borderTop: "1px solid #eee", borderBottom: "1px solid #eee" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <p style={{ textAlign: "center", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "2px", color: "#94a3b8", marginBottom: 28 }}>Trusted by industry leaders</p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "clamp(20px, 5vw, 48px)", opacity: 0.7 }}>
                        {TRUSTED_COMPANIES.slice(0, 6).map((company, i) => (
                            <div key={i} style={{ height: 30, display: "flex", alignItems: "center" }}>
                                {company.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS ── */}
            <section style={{ padding: "60px 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, textAlign: "center" }}>
                    {[
                        { label: "Active Businesses", value: "10,000+" },
                        { label: "Accounting Firms", value: "500+" },
                        { label: "Transactions / Month", value: "2.5M+" },
                        { label: "Customer Satisfaction", value: "98%" },
                    ].map((stat, i) => (
                        <Reveal key={i} delay={i * 0.1}>
                            <div>
                                <div style={{ fontSize: "clamp(24px, 5vw, 42px)", fontWeight: 900, color: "#6c63ff", letterSpacing: "-1px" }}>{stat.value}</div>
                                <div style={{ fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 600, color: "#94a3b8", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── SUCCESS STORIES ── */}
            <section style={{ padding: "60px 5%", background: "#f8fafc" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>Success stories</div>
                        <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16 }}>
                            See how businesses win with LedgerPro
                        </h2>
                    </Reveal>

                    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                        {successStories.map((story, idx) => (
                            <Reveal key={idx} delay={idx * 0.1}>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", background: "#fff", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.05)", border: "1px solid #eee" }}>
                                    <div style={{ height: "clamp(200px, 40vw, 280px)" }}>
                                        <img src={story.image} alt={story.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    </div>
                                    <div style={{ padding: "clamp(24px, 5vw, 40px)" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                                            <div style={{ width: 48, height: 48, borderRadius: 12, background: story.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#fff" }}>
                                                {story.logo}
                                            </div>
                                            <div>
                                                <h3 style={{ fontWeight: 800, color: "#111" }}>{story.name}</h3>
                                                <div style={{ fontSize: 12, color: "#94a3b8" }}>{story.industry}</div>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#444", lineHeight: 1.6, marginBottom: 20, fontStyle: "italic" }}>“{story.quote}”</p>
                                        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                                            <span style={{ fontSize: "clamp(24px, 5vw, 32px)", fontWeight: 900, color: story.color }}>{story.metric}</span>
                                            <span style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#666", fontWeight: 500 }}>{story.metricLabel}</span>
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIAL CAROUSEL ── */}
            <section style={{ padding: "60px 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>What our customers say</div>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16, marginBottom: 40 }}>
                            Loved by finance teams everywhere
                        </h2>
                    </Reveal>

                    <div style={{ position: "relative", minHeight: 320 }}>
                        {TESTIMONIALS.map((t, idx) => (
                            <div key={idx} style={{ transition: "opacity 0.5s ease", opacity: activeTestimonial === idx ? 1 : 0, position: activeTestimonial === idx ? "relative" : "absolute", top: 0, left: 0, right: 0, pointerEvents: activeTestimonial === idx ? "auto" : "none" }}>
                                <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px" }}>
                                    <div style={{ fontSize: "clamp(40px, 8vw, 64px)", color: "#6c63ff", opacity: 0.3, marginBottom: 16 }}>“</div>
                                    <p style={{ fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 500, color: "#333", lineHeight: 1.5, marginBottom: 28 }}>{t.text}</p>
                                    <div>
                                        <div style={{ width: "clamp(48px, 12vw, 64px)", height: "clamp(48px, 12vw, 64px)", margin: "0 auto 16px", borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(18px, 5vw, 24px)", fontWeight: 700, color: "#fff" }}>
                                            {t.avatar}
                                        </div>
                                        <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#111" }}>{t.name}</div>
                                        <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#94a3b8" }}>{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 40 }}>
                        {TESTIMONIALS.map((_, idx) => (
                            <button key={idx} onClick={() => setActiveTestimonial(idx)} style={{ width: 8, height: 8, borderRadius: "50%", border: "none", background: activeTestimonial === idx ? "#6c63ff" : "#ddd", cursor: "pointer", padding: 0 }} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CASE STUDY ── */}
            <section style={{ padding: "60px 5%", background: "linear-gradient(135deg, #f5f0ff 0%, #fff 60%)" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <Reveal>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40, alignItems: "center" }}>
                            <div>
                                <div className="sec-label" style={{ color: "#6c63ff" }}>Case study</div>
                                <h2 style={{ fontSize: "clamp(24px, 6vw, 44px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 12, marginBottom: 20 }}>
                                    How NovaCPA scaled from 5 to 30+ clients
                                </h2>
                                <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
                                    Before LedgerPro, NovaCPA spent hours each week on manual data entry. Now they manage over 30 clients in one dashboard.
                                </p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 20, marginBottom: 28 }}>
                                    <div>
                                        <div style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 900, color: "#6c63ff" }}>80%</div>
                                        <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#888" }}>time saved</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 900, color: "#00c9a7" }}>30+</div>
                                        <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#888" }}>clients managed</div>
                                    </div>
                                </div>
                                <button style={{ padding: "clamp(10px, 3vw, 12px) clamp(20px, 5vw, 28px)", borderRadius: 10, background: "#0a0a0a", color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Read full case study →</button>
                            </div>
                            <div style={{ background: "#fff", borderRadius: 24, padding: "clamp(24px, 5vw, 40px)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", border: "1px solid #eee" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: "#6c63ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff" }}>NC</div>
                                    <div>
                                        <div style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 800, color: "#111" }}>NovaCPA Firm</div>
                                        <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#94a3b8" }}>Accounting Firm · 12 team members</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "#666", lineHeight: 1.7, marginBottom: 24 }}>
                                    "LedgerPro gave us the ability to scale without adding headcount. The multi-client dashboard is a game-changer."
                                </div>
                                <div style={{ borderTop: "1px solid #eee", paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: "#6c63ff" }}>★★★★★ 5.0</span>
                                    <span style={{ fontSize: 12, color: "#94a3b8" }}>Migrated from QuickBooks</span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── INTEGRATIONS ── */}
            <section style={{ padding: "60px 5%", background: "#fff" }}>
                <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
                    <Reveal>
                        <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>Ecosystem</div>
                        <h2 style={{ fontSize: "clamp(24px, 6vw, 42px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginBottom: 16 }}>
                            Works with the tools you love
                        </h2>
                        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "clamp(10px, 3vw, 20px)" }}>
                            {["QuickBooks", "Xero", "Plaid", "Stripe", "Salesforce", "HubSpot", "Zapier", "Slack"].map((tool, i) => (
                                <div key={i} style={{ padding: "8px 20px", background: "#f8fafc", borderRadius: 40, fontSize: "clamp(11px, 3.5vw, 13px)", fontWeight: 600, color: "#555", border: "1px solid #eee" }}>
                                    {tool}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ padding: "60px 5%", textAlign: "center", background: "#0a0a0a" }}>
                <Reveal>
                    <h2 style={{ fontSize: "clamp(24px, 6vw, 52px)", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em", padding: "0 16px" }}>
                        Join thousands of happy customers.
                    </h2>
                    <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
                        <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)" }}>Start free trial</button>
                        <button style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>Talk to sales</button>
                    </div>
                </Reveal>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ background: "#f8f8f8", borderTop: "1px solid #efefef", padding: "72px 5% 40px" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 64 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <span style={{ color: "#fff", fontSize: 13, fontWeight: 900 }}>LP</span>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>LedgerPro</span>
                            </div>
                            <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.78, maxWidth: 220 }}>The complete financial operating system for modern businesses and accountants.</p>
                            <div style={{ marginTop: 22 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                    <a href="mailto:info@bisonstechs.com" style={{ fontSize: 14, color: "#aaa", textDecoration: "none" }}>info@bisonstechs.com</a>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <a href="tel:+17867618327" style={{ fontSize: 14, color: "#aaa", textDecoration: "none" }}>+1 (786)-761-8327</a>
                                </div>
                            </div>
                        </div>
                        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                            <div key={section}>
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