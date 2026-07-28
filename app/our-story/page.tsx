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

      {/* ── NAVBAR (EXACT SAME AS PAGE.TSX) ── */}
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

        {/* Desktop nav links */}
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

        {/* Desktop CTA */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="nav-link">Sign in</button>
          <button className="btn-dark">Get started</button>
        </div>

        {/* Hamburger */}
        <button
          className="mob-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
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

      {/* ── HERO SECTION ── */}
      <section style={{ paddingTop: 120, paddingBottom: 80, background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5%", textAlign: "center" }}>
          <Reveal>
            <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center", marginBottom: 24 }}>Our Story</div>
            <h1 style={{ fontSize: "clamp(32px, 8vw, 72px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.2, marginBottom: 20 }}>
              Built by accountants,<br />
              <span style={{ color: "#6c63ff" }}>for the modern business.</span>
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