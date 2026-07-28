"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NAV_LINKS, FOOTER_LINKS
} from "../Data";
import {
  Reveal, GLOBAL_STYLES,
} from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function InvoicingPage() {
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

      {/* ── HERO SECTION (RESPONSIVE) ── */}
      <section style={{ paddingTop: "clamp(120px, 15vw, 160px)", paddingBottom: "clamp(60px, 10vw, 100px)", background: "linear-gradient(180deg, #f0fdf9 0%, #fff 100%)", textAlign: "center" }}>
        <Reveal>
          <div className="sec-label" style={{ justifyContent: "center" }}>Invoicing</div>
          <h1 style={{ fontSize: "clamp(32px, 8vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", marginBottom: 20, lineHeight: 1.2, padding: "0 16px" }}>
            Get paid <span style={{ color: "#00c9a7" }}>faster</span> with <br /> beautiful invoices.
          </h1>
          <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 650, margin: "0 auto 32px", lineHeight: 1.6, padding: "0 16px" }}>
            Professional invoices, automated reminders, and seamless payments. LedgerPro Invoicing is built for businesses that value time and professional appearance.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", padding: "0 16px" }}>
            <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)", fontSize: "clamp(14px, 3.5vw, 16px)" }}>Create free invoice</button>
            <button className="btn-outline" style={{ padding: "clamp(12px, 3vw, 16px) clamp(24px, 5vw, 40px)", fontSize: "clamp(14px, 3.5vw, 16px)" }}>Watch demo</button>
          </div>
        </Reveal>
      </section>

      {/* ── DASHBOARD PREVIEW (RESPONSIVE) ── */}
      <section style={{ padding: "0 5% 80px" }}>
        <Reveal delay={0.1}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "#fff", borderRadius: 32, overflow: "hidden",
            boxShadow: "0 50px 100px rgba(0,0,0,0.08), 0 0 0 1px #eee",
            padding: "clamp(20px, 5vw, 40px)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
              <div>
                <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 800, color: "#111" }}>Invoices</h2>
                <p style={{ fontSize: 14, color: "#888" }}>Manage your client billing effortlessly.</p>
              </div>
              <button className="btn-dark" style={{ padding: "10px 24px", fontSize: "clamp(12px, 3vw, 14px)" }}>+ New Invoice</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
              {[["Total Revenue", "$128,450", "+12%"], ["Pending", "$24,200", "5 invoices"], ["Paid", "$104,250", "92% rate"], ["Overdue", "$1,400", "2 invoices"]].map(([l, v, s], i) => (
                <div key={i} style={{ background: "#f8fafc", padding: "clamp(16px, 4vw, 24px)", borderRadius: 20, border: "1px solid #f1f5f9" }}>
                  <div style={{ fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: 8 }}>{l}</div>
                  <div style={{ fontSize: "clamp(22px, 5vw, 28px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{v}</div>
                  <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: i === 0 ? "#10b981" : "#94a3b8", fontWeight: 600 }}>{s}</div>
                </div>
              ))}
            </div>

            {/* Table - Responsive with overflow */}
            <div style={{ overflowX: "auto" }}>
              <div style={{ minWidth: 600 }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "16px 20px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                  <span>Client</span><span>Date</span><span>Amount</span><span>Status</span><span style={{ textAlign: "right" }}>Action</span>
                </div>
                {[
                  { name: "Acme Corp", date: "Apr 24, 2026", amount: "$4,500.00", status: "Paid", color: "#10b981" },
                  { name: "Global Tech", date: "Apr 22, 2026", amount: "$12,200.00", status: "Pending", color: "#f59e0b" },
                  { name: "Nexus Design", date: "Apr 20, 2026", amount: "$850.00", status: "Paid", color: "#10b981" },
                  { name: "Stellar Cloud", date: "Apr 18, 2026", amount: "$3,400.00", status: "Overdue", color: "#ef4444" },
                  { name: "Urban Bloom", date: "Apr 15, 2026", amount: "$1,250.00", status: "Paid", color: "#10b981" },
                ].map((inv, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "16px 20px", borderBottom: i === 4 ? "none" : "1px solid #f8f8f8", fontSize: "clamp(12px, 3.5vw, 14px)", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: "#111" }}>{inv.name}</span>
                    <span style={{ color: "#666" }}>{inv.date}</span>
                    <span style={{ fontWeight: 600 }}>{inv.amount}</span>
                    <span>
                      <span style={{ background: inv.color + "15", color: inv.color, padding: "4px 12px", borderRadius: 100, fontSize: "clamp(10px, 2.5vw, 11px)", fontWeight: 800, display: "inline-block" }}>{inv.status}</span>
                    </span>
                    <span style={{ textAlign: "right", color: "#6c63ff", fontWeight: 700, cursor: "pointer" }}>View →</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES (RESPONSIVE GRID) ── */}
      <section style={{ padding: "80px 5%", background: "#111" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="sec-label" style={{ color: "#00c9a7", justifyContent: "center" }}>Built for speed</div>
            <h2 style={{ fontSize: "clamp(28px, 6vw, 48px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", padding: "0 16px" }}>
              Everything you need to <br /> <span style={{ color: "#00c9a7" }}>get paid today.</span>
            </h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              { icon: "✨", title: "Custom Templates", desc: "Choose from beautiful, professional templates and add your own branding." },
              { icon: "💳", title: "Global Payments", desc: "Accept credit cards, ACH, and bank transfers with one-click integration." },
              { icon: "🔄", title: "Recurring Billing", desc: "Automate your monthly subscriptions and retainers with ease." },
              { icon: "🔔", title: "Smart Reminders", desc: "Automatically notify clients about upcoming or overdue payments." },
              { icon: "🌍", title: "Multi-Currency", desc: "Send invoices in 135+ currencies with real-time conversion." },
              { icon: "📄", title: "Partial Payments", desc: "Allow clients to pay in installments or make down payments." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "clamp(24px, 5vw, 32px)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.06)", height: "100%" }}>
                  <div style={{ fontSize: "clamp(28px, 6vw, 32px)", marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: "clamp(18px, 4vw, 20px)", fontWeight: 800, color: "#fff", marginBottom: 12 }}>{f.title}</h3>
                  <p style={{ fontSize: "clamp(13px, 3.5vw, 15px)", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (RESPONSIVE) ── */}
      <section style={{ padding: "clamp(60px, 12vw, 140px) 5%", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(28px, 6vw, 52px)", fontWeight: 800, color: "#111", marginBottom: 20, letterSpacing: "-0.02em", padding: "0 16px" }}>
            Stop chasing, start growing.
          </h2>
          <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 500, margin: "0 auto 32px", padding: "0 16px" }}>
            Join 10,000+ businesses using LedgerPro to automate their billing.
          </p>
          <button className="btn-teal" style={{ padding: "clamp(12px, 3vw, 18px) clamp(24px, 5vw, 48px)", fontSize: "clamp(14px, 3.5vw, 18px)" }}>Start for free</button>
        </Reveal>
      </section>

      {/* ── FOOTER (RESPONSIVE) ── */}
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