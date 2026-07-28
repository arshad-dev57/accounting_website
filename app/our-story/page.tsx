"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NAV_LINKS, FOOTER_LINKS,
} from "../Data";
import {
  Reveal, GLOBAL_STYLES,
} from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function OurStoryPage() {
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const milestones = [
    { year: "2021", title: "The idea takes root", desc: "While juggling spreadsheets and disconnected tools, our founders saw a glaring gap: accounting software that's truly built for both business owners AND professional accountants.", icon: "🌱" },
    { year: "2022", title: "Building the core", desc: "We assembled a team of accountants and engineers to rebuild the ledger from scratch — double-entry, real-time posting, audit trails, and GAAP compliance baked in.", icon: "🏗️" },
    { year: "2023", title: "Private beta launch", desc: "Over 200 accounting firms and businesses tested LedgerPro. Their feedback shaped everything — from bank reconciliation flows to multi-client management.", icon: "🧪" },
    { year: "2024", title: "Public launch + open banking", desc: "LedgerPro launched to the world with native bank connectivity, automated reconciliation, and real-time financial reporting.", icon: "🚀" },
    { year: "2025", title: "Scale & enterprise", desc: "Now trusted by over 10,000 businesses and 500+ accounting firms. LedgerPro is becoming the operating system for modern finance teams.", icon: "📈" },
    { year: "2026+", title: "The future", desc: "AI-powered insights, deeper integrations, and global expansion. We're just getting started.", icon: "✨" },
  ];

  const values = [
    { title: "Accuracy first", desc: "Every number must be traceable, auditable, and correct. We don't compromise on the math.", icon: "🎯" },
    { title: "Built for pros", desc: "Whether you're a business owner or a CPA, the tools need to work the way you work.", icon: "🧠" },
    { title: "Automation with control", desc: "Automate the mundane, but never take away the accountant's ability to review and adjust.", icon: "⚙️" },
    { title: "Radical transparency", desc: "No hidden fees, no lock-in, no tricks. Just honest software that works.", icon: "🔓" },
  ];

  const team = [
    { name: "Farukh Masood", role: "CEO & Co-founder", bio: "Former CPA and fintech product lead. Saw the pain of legacy accounting software firsthand.", avatar: "FM", color: "#6c63ff" },
    { name: "Faiq Ahmed", role: "CTO & Co-founder", bio: "Engineer with a passion for double-entry systems. Built the first prototype in 3 months.", avatar: "FA", color: "#00c9a7" },
    { name: "Arshad Nasir", role: "Head of Product", bio: "Product leader with 10+ years in accounting SaaS. Ensures LedgerPro solves real problems.", avatar: "AN", color: "#f59e0b" },
    { name: "Danish Khan", role: "Lead Architect", bio: "Database expert and open-source contributor. Designed the audit trail system.", avatar: "DK", color: "#3b82f6" },
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
        <div
          className="mob-menu"
          style={{
            position: "fixed", top: 92, left: 0, right: 0,
            background: "#fff", padding: "24px 5%", zIndex: 99,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            maxHeight: "calc(100vh - 92px)",
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
            <button style={{ width: "100%", padding: "13px", borderRadius: 100, background: "#1088dd", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
              Get started
            </button>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
          <Reveal>
            <div className="sec-label" style={{ color: "#1088dd", justifyContent: "center", marginBottom: 24 }}>Our Story</div>
            <h1 style={{ fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
              Built by accountants,<br />
              <span style={{ color: "#02437f" }}>for the modern business.</span>
            </h1>
            <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 680, margin: "0 auto", lineHeight: 1.65, padding: "0 16px" }}>
              LedgerPro started with a simple idea: accounting software shouldn't be painful.
              It should be powerful, intuitive, and built on professional principles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section style={{ padding: "40px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24, textAlign: "center" }}>
          {[
            { label: "Businesses Trust Us", value: "10,000+", suffix: "" },
            { label: "Accounting Firms", value: "500+", suffix: "" },
            { label: "Bank Connections", value: "2.5M", suffix: "+" },
            { label: "Transactions Processed", value: "$12B", suffix: "+" },
          ].map((stat, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <div style={{ fontSize: "clamp(24px, 5vw, 42px)", fontWeight: 900, color: "#6c63ff", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ fontSize: "clamp(10px, 3vw, 13px)", fontWeight: 600, color: "#94a3b8", marginTop: 8, textTransform: "uppercase", letterSpacing: "0.5px" }}>{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>The journey</div>
            <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16 }}>How we got here</h2>
          </Reveal>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "19px", top: 20, bottom: 20, width: 2, background: "linear-gradient(180deg, #6c63ff 0%, #00c9a7 100%)", borderRadius: 2 }} />
            
            {milestones.map((milestone, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div style={{ display: "flex", gap: "clamp(16px, 4vw, 28px)", marginBottom: 40, position: "relative" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 40, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0, border: "2px solid #6c63ff" }}>
                    {milestone.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#6c63ff", marginBottom: 6 }}>{milestone.year}</div>
                    <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "#111", marginBottom: 8 }}>{milestone.title}</h3>
                    <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#666", lineHeight: 1.65 }}>{milestone.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "80px 5%", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>What guides us</div>
            <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16 }}>Our core values</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            {values.map((value, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div style={{ padding: "clamp(20px, 4vw, 32px)", background: "#fff", borderRadius: 20, border: "1px solid #eee", height: "100%" }}>
                  <div style={{ fontSize: "clamp(28px, 6vw, 36px)", marginBottom: 16 }}>{value.icon}</div>
                  <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: 800, color: "#111", marginBottom: 12 }}>{value.title}</h3>
                  <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "#666", lineHeight: 1.65 }}>{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "80px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>The people</div>
            <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, color: "#111", letterSpacing: "-0.02em", marginTop: 16 }}>Meet the team</h2>
            <p style={{ fontSize: "clamp(13px, 4vw, 16px)", color: "#666", maxWidth: 600, margin: "16px auto 0" }}>
              Passionate builders, accountants, and designers united by a mission to fix accounting software.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 32 }}>
            {team.map((member, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: "clamp(80px, 20vw, 120px)", height: "clamp(80px, 20vw, 120px)", margin: "0 auto 20px", borderRadius: "50%", background: member.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(20px, 5vw, 32px)", fontWeight: 700, color: "#fff" }}>
                    {member.avatar}
                  </div>
                  <h3 style={{ fontSize: "clamp(16px, 4vw, 18px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{member.name}</h3>
                  <div style={{ fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 700, color: member.color, marginBottom: 12 }}>{member.role}</div>
                  <p style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "#777", lineHeight: 1.6, padding: "0 12px" }}>{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "80px 5%", textAlign: "center", background: "#0a0a0a" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(24px, 6vw, 52px)", fontWeight: 800, color: "#fff", marginBottom: 20, letterSpacing: "-0.02em", padding: "0 16px" }}>
            Join the future of accounting.
          </h2>
          <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "rgba(255,255,255,0.5)", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6, padding: "0 16px" }}>
            Start your journey with LedgerPro today. Free trial, no credit card required.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
            <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)", borderRadius: 100, background: "#00ffbe", color: "#111", fontWeight: 700, border: "none", cursor: "pointer" }}>
              Start free trial
            </button>
            <button style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 17px)", border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", borderRadius: 12, fontWeight: 600, cursor: "pointer" }}>
              Contact sales
            </button>
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