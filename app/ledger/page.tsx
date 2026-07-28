"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NAV_LINKS, FOOTER_LINKS
} from "../Data";
import {
  Reveal, GLOBAL_STYLES,
} from "../Components";

export default function LedgerPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <main style={{ background: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
      
      {/* ── NAVIGATION ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 5%", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
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
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onClick={() => {
                  if (item.href && item.href !== "#") window.location.href = item.href;
                }}
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

        <button className="mob-btn" onClick={() => setMenuOpen(o => !o)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 2.5, background: "#111", borderRadius: 2, transition: "all .3s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none",
              opacity: menuOpen && i === 1 ? 0 : 1
            }} />
          ))}
        </button>
      </nav>

      {/* ── HERO SECTION ── */}
      <section style={{ paddingTop: 160, paddingBottom: 80, background: "linear-gradient(180deg, #f5f3ff 0%, #fff 100%)", textAlign: "center" }}>
        <Reveal>
          <div className="sec-label" style={{ color: "#6c63ff", justifyContent: "center" }}>General Ledger</div>
          <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, letterSpacing: "-2.5px", color: "#111", marginBottom: 24, lineHeight: 1.1 }}>
            The immutable <span style={{ color: "#6c63ff" }}>source of truth</span> <br /> for your business.
          </h1>
          <p style={{ fontSize: 18, color: "#666", maxWidth: 650, margin: "0 auto 40px", lineHeight: 1.6 }}>
            LedgerPro provides a robust, double-entry general ledger that keeps your financial records accurate, organized, and audit-ready at all times.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button className="btn-dark" style={{ padding: "16px 40px", background: "#6c63ff" }}>Explore LedgerCore</button>
            <button className="btn-outline" style={{ padding: "16px 40px" }}>Book a demo</button>
          </div>
        </Reveal>
      </section>

      {/* ── LEDGER UI PREVIEW ── */}
      <section style={{ padding: "0 5% 100px" }}>
        <Reveal delay={0.1}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "#111", borderRadius: 32, overflow: "hidden",
            boxShadow: "0 60px 120px rgba(108,99,255,0.15)",
            padding: "40px", color: "#fff"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>Journal Entries</h2>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Live audit trail of every transaction.</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ padding: "8px 16px", borderRadius: 10, background: "rgba(255,255,255,0.05)", fontSize: 13, color: "#aaa", border: "1px solid rgba(255,255,255,0.1)" }}>Filter: All Entities</div>
                <button style={{ padding: "8px 20px", borderRadius: 10, background: "#6c63ff", color: "#fff", border: "none", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Post Entry</button>
              </div>
            </div>

            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr", padding: "16px 24px", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>
                <span>Date / Ref</span>
                <span>Description / Account</span>
                <span style={{ textAlign: "right" }}>Debit</span>
                <span style={{ textAlign: "right" }}>Credit</span>
                <span style={{ textAlign: "right" }}>Balance</span>
              </div>
              {[
                { date: "Apr 25, 2026", ref: "JE-1042", desc: "Software Subscription Rev", acc: "4000 - Revenue", debit: "", credit: "$12,400.00", bal: "$12,400.00", color: "#00ffbe" },
                { date: "Apr 25, 2026", ref: "JE-1042", desc: "Accounts Receivable", acc: "1100 - Assets", debit: "$12,400.00", credit: "", bal: "$0.00", color: "#fff" },
                { date: "Apr 24, 2026", ref: "JE-1041", desc: "Office Rent - May", acc: "6000 - Expenses", debit: "$4,500.00", credit: "", bal: "$4,500.00", color: "#ff6b6b" },
                { date: "Apr 24, 2026", ref: "JE-1041", desc: "Cash at Bank", acc: "1000 - Assets", debit: "", credit: "$4,500.00", bal: "$0.00", color: "#fff" },
                { date: "Apr 22, 2026", ref: "JE-1040", desc: "Equipment Purchase", acc: "1500 - Fixed Assets", debit: "$2,850.00", credit: "", bal: "$2,850.00", color: "#00ffbe" },
              ].map((entry, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr 1fr 1fr 1fr", padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: 13, alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>{entry.date}</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{entry.ref}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ color: entry.color, fontWeight: 700 }}>{entry.desc}</span>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>{entry.acc}</span>
                  </div>
                  <span style={{ textAlign: "right", color: "#fff", fontWeight: 600 }}>{entry.debit}</span>
                  <span style={{ textAlign: "right", color: "#fff", fontWeight: 600 }}>{entry.credit}</span>
                  <span style={{ textAlign: "right", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{entry.bal}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: "flex", gap: 40, padding: "0 24px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", marginBottom: 12, textTransform: "uppercase" }}>Total Debits</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>$19,750.00</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", marginBottom: 12, textTransform: "uppercase" }}>Total Credits</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#fff" }}>$19,750.00</div>
              </div>
              <div style={{ flex: 1, textAlign: "right" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#00ffbe", marginBottom: 12, textTransform: "uppercase" }}>Status</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#00ffbe" }}>● Balanced</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: "100px 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 80 }}>
            <div className="sec-label" style={{ justifyContent: "center" }}>Enterprise Grade</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "#111", letterSpacing: "-1.5px" }}>The foundation of your <br /> <span style={{ color: "#6c63ff" }}>financial integrity.</span></h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40 }}>
            {[
              { title: "Double-Entry Bookkeeping", desc: "Every transaction is balanced automatically across multiple accounts for total accuracy." },
              { title: "Real-Time Trial Balance", desc: "Instant visibility into your account balances. Ensure your books are always in sync." },
              { title: "Immutable Audit Trail", desc: "Every change is logged with a timestamp and user ID. Perfect for compliance and audits." },
              { title: "Multi-Entity Support", desc: "Manage multiple companies or subsidiaries with consolidated general ledger views." },
              { title: "Smart Chart of Accounts", desc: "Pre-configured templates for your industry, fully customizable to your needs." },
              { title: "Automated Closing", desc: "Close your months and years with confidence using our automated verification tools." },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div style={{ padding: "0 0 40px", borderBottom: "1px solid #eee" }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 14 }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#fafafa", padding: "80px 5% 40px", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="fg5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 900, fontFamily: "monospace", letterSpacing: "-1px" }}>LP</span>
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
                      <a href="#" style={{ fontSize: 14, color: "#bbb", textDecoration: "none", fontWeight: 400, transition: "color .2s" }}>{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "#ccc" }}>© 2026 LedgerPro, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
