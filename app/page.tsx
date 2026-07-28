"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NAV_LINKS, FEATURES, PLANS, TESTIMONIALS,
  TRUSTED_COMPANIES, INTEGRATIONS, FOOTER_LINKS,
  TIMELINE_STEPS, ACCOUNTING_SLIDES,
} from "./Data";
import {
  Reveal, TimelineItem, StickyFinancialsSection, GLOBAL_STYLES,
} from "./Components";
import { CookieBanner } from "@/components/cookie-banner";

function CursorGlow() {
  const blobRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const trails: { x: number; y: number; el: HTMLDivElement }[] = [];
    const TRAIL_COUNT = 12;

    if (trailsRef.current) {
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement("div");
        const size = 8 - i * 0.4;
        dot.style.cssText = `
          position: fixed; pointer-events: none; z-index: 1;
          width: ${size}px; height: ${size}px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,201,167,${0.5 - i * 0.03}) 0%, rgba(108,99,255,${0.3 - i * 0.02}) 100%);
          transition: transform 0.1s ease;
          opacity: ${1 - i * 0.07};
          transform: translate(-50%, -50%);
        `;
        trailsRef.current.appendChild(dot);
        trails.push({ x: 0, y: 0, el: dot });
      }
    }

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (blobRef.current) {
        blobRef.current.style.left = `${e.clientX - 300}px`;
        blobRef.current.style.top = `${e.clientY - 300}px`;
      }
    };

    let animId: number;
    const animate = () => {
      let prevX = mouseX, prevY = mouseY;
      for (const trail of trails) {
        const dx = prevX - trail.x;
        const dy = prevY - trail.y;
        trail.x += dx * 0.35;
        trail.y += dy * 0.35;
        trail.el.style.left = `${trail.x}px`;
        trail.el.style.top = `${trail.y}px`;
        prevX = trail.x;
        prevY = trail.y;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={blobRef} style={{
        position: "fixed", pointerEvents: "none", zIndex: 0,
        width: 600, height: 600, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108,99,255,0.08) 0%, rgba(0,201,167,0.04) 40%, transparent 70%)",
        transition: "left 0.6s ease-out, top 0.6s ease-out",
        mixBlendMode: "difference"
      }} />
      <div ref={trailsRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1 }} />
    </>
  );
}

// ── Scrolling pill tags row (marquee effect) ──
function MarqueeRow({ tags, reverse = false }: { tags: { label: string; color: string }[]; reverse?: boolean }) {
  return (
    <div style={{
      overflow: "hidden",
      width: "100%",
      maskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
    }}>
      <div style={{
        display: "flex",
        gap: 10,
        width: "max-content",
        animation: `marquee${reverse ? "R" : ""} 32s linear infinite`,
      }}>
        {[...tags, ...tags].map((t, i) => (
          <span key={i} style={{
            fontSize: 12,
            fontWeight: 500,
            color: "#444",
            background: "rgba(255,255,255,0.55)",
            border: "0.5px solid rgba(0,0,0,0.09)",
            borderRadius: 100,
            padding: "6px 14px",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.color, flexShrink: 0, display: "inline-block" }} />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [darkSection, setDarkSection] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 24);
      setShowScrollTop(window.scrollY > 100);
      if (featuresRef.current) {
        const top = featuresRef.current.getBoundingClientRect().top;
        setDarkSection(top < window.innerHeight * 0.75);
      }
    };
    window.addEventListener("scroll", fn);
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveFeature(p => (p + 1) % FEATURES.length), 2600);
    return () => clearInterval(t);
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

  useEffect(() => {
    document.body.style.transition = "background-color 0.7s ease";
    document.body.style.backgroundColor = darkSection ? "#2a2d41" : "#eeecea";
    return () => { document.body.style.backgroundColor = ""; };
  }, [darkSection]);

  const row1Tags = [
    { label: "inventory management", color: "#888" },
    { label: "Unify financial reporting", color: "#4caf50" },
    { label: "Optimize supply chain", color: "#f9a825" },
    { label: "Master project finances", color: "#5c6bc0" },
    { label: "Streamline production scheduling", color: "#ef5350" },
    { label: "Enhance quality management", color: "#26a69a" },
  ];
  const row2Tags = [
    { label: "Transform BOM management", color: "#888" },
    { label: "Accelerate sales conversions", color: "#f9a825" },
    { label: "Elevate customer support", color: "#ef5350" },
    { label: "Streamline new hires", color: "#4caf50" },
    { label: "Transform talent management", color: "#ef5350" },
    { label: "Transform BOM management", color: "#ce93d8" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "transparent", color: "#111", overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        ${GLOBAL_STYLES}

        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeR {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      ` }} />

      {/* ── COOKIE BANNER ── */}
      <CookieBanner />

      <CursorGlow />

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
          position: "fixed", top: 100, left: 0, right: 0,
          background: "#fff", padding: "24px 5%", zIndex: 99,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          maxHeight: "calc(100vh - 100px)",
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
            <button style={{ width: "100%", padding: "13px", borderRadius: 8, border: "1.5px solid #ddd", background: "transparent", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
              Sign in
            </button>
            <button style={{ width: "100%", padding: "13px", borderRadius: 8, background: "#1088dd", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15 }}>
              Contact
            </button>
          </div>
        </div>
      )}

      {/* ── HERO SECTION ── */}
      <section style={{
        paddingTop: 150,
        paddingBottom: 80,
        textAlign: "center",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#eeecea",
      }}>
        {/* Announce pill */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.68)",
          border: "0.5px solid rgba(0,0,0,0.1)",
          borderRadius: 100,
          padding: "6px 16px",
          fontSize: 12.5,
          color: "#444",
          fontWeight: 500,
          marginBottom: 28,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1088dd" strokeWidth="2">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span style={{ fontWeight: 700, color: "#02437f" }}>Introducing BisonTechs:</span>
          <span>The Future of Enterprise</span>
        </div>

        {/* Main heading — DM Serif Display with italic mixed */}
        <h1 style={{
          fontFamily: "'DM Serif Display', 'Georgia', serif",
          fontSize: "clamp(52px, 6.5vw, 82px)",
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: "-2px",
          maxWidth: 860,
          margin: "0 auto 22px",
          color: "#1a1a1a",
          padding: "0 20px",
        }}>
          Complete ERP
          <br />
          <em style={{ fontStyle: "italic", color: "#1088dd" }}>Transforming</em>
          {" "}how you{" "}
          <em style={{ fontStyle: "italic", color: "#02437f" }}>Operate</em>
        </h1>

        {/* Sub heading */}
        <p style={{
          fontSize: 16,
          color: "#555",
          maxWidth: 520,
          margin: "0 auto 44px",
          lineHeight: 1.7,
          fontWeight: 400,
          padding: "0 20px",
        }}>
          Build, deploy, and manage your entire business operations from one unified platform.
        </p>

        {/* CTA Card */}
        <div style={{
          background: "rgba(255,255,255,0.7)",
          border: "0.5px solid rgba(0,0,0,0.1)",
          borderRadius: 16,
          padding: "22px 24px 22px",
          maxWidth: 560,
          width: "calc(100% - 40px)",
          margin: "0 auto 36px",
          textAlign: "left",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          position: "relative",
          minHeight: 110,
        }}>
          <div style={{
            fontSize: 14,
            color: "#333",
            lineHeight: 1.55,
            marginBottom: 48,
            fontWeight: 400,
            maxWidth: "70%",
          }}>
            Build a complete ERP system that integrates finance, HR, inventory, CRM, and operations into one unified platform for your entire business.
          </div>
          <button style={{
            position: "absolute",
            bottom: 22,
            right: 22,
            background: "#1088dd",
            color: "#fff",
            border: "none",
            fontSize: 13.5,
            fontWeight: 700,
            padding: "10px 18px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontFamily: "inherit",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}>
            Build Now with BisonTechs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>

        {/* Marquee tag rows */}
        <div style={{ width: "100%", maxWidth: 900, display: "flex", flexDirection: "column", gap: 10, padding: "0 0px" }}>
          <MarqueeRow tags={row1Tags} />
          <MarqueeRow tags={row2Tags} reverse />
        </div>
      </section>

      {/* ── TRUSTED BY SECTION ── */}
      <section style={{ background: "#fff", paddingBottom: 0 }}>
        <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "60px 5% 0" }}>
          <Reveal delay={0.1}>
            <div style={{ position: "absolute", inset: "20px 30px -30px", background: "radial-gradient(ellipse at 50% 100%, rgba(108,99,255,0.08) 0%, rgba(0,201,167,0.04) 50%, transparent 80%)", filter: "blur(25px)", zIndex: 0, pointerEvents: "none", borderRadius: 28 }} />
            <div style={{ position: "relative", zIndex: 1, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 5px rgba(0,0,0,0.03), 0 6px 12px rgba(0,0,0,0.05), 0 24px 48px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)", background: "#fff", transform: "perspective(1200px) rotateX(1.5deg)", transformOrigin: "bottom center" }}>
              <div style={{ background: "#f8f9fc", padding: "14px 28px 0", display: "flex", alignItems: "flex-end", justifyContent: "space-between", borderBottom: "1px solid #eee", overflowX: "auto" }}>
                <div style={{ display: "flex", gap: 0 }}>
                  {[{ icon: "📊", label: "Profit & Loss", active: false }, { icon: "📋", label: "Balance Sheet", active: false }, { icon: "💰", label: "Cash Flow", active: true }, { icon: "📄", label: "Reports", active: false }].map((tab) => (
                    <div key={tab.label} style={{ padding: "10px 20px 12px", fontSize: 13, fontWeight: tab.active ? 700 : 500, color: tab.active ? "#0a0a0a" : "#999", borderBottom: tab.active ? "2.5px solid #1088dd" : "2.5px solid transparent", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", transition: "all 0.2s ease", marginBottom: -1, whiteSpace: "nowrap" }}>
                      <span style={{ fontSize: 14 }}>{tab.icon}</span> {tab.label}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 12, paddingBottom: 10, flexShrink: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#555", cursor: "pointer" }}>Average Deltas</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#555", cursor: "pointer", background: "#eef0f5", padding: "6px 14px", borderRadius: 8 }}>↓ Export</div>
                </div>
              </div>
              <div style={{ padding: "28px 32px 32px", overflowX: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
                  <div><h3 style={{ fontSize: 22, fontWeight: 800, color: "#111", letterSpacing: "-0.5px", marginBottom: 4 }}>Cash Flow</h3></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 28, fontWeight: 900, color: "#111", letterSpacing: "-1px" }}>$757,040.10</div></div>
                </div>
                <div style={{ position: "relative", marginBottom: 28 }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    {["$50K", "$40K", "$30K", "$0", "-$50K"].map(label => (<span key={label} style={{ fontSize: 9, color: "#bbb", fontWeight: 600 }}>{label}</span>))}
                  </div>
                  <div style={{ marginLeft: 45, marginRight: 45 }}>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 180, position: "relative" }}>
                      {[0, 25, 50, 75, 100].map((pct, idx) => (<div key={idx} style={{ position: "absolute", left: 0, right: 0, bottom: `${pct}%`, height: 1, background: idx === 2 ? "#ddd" : "#f0f0f0", zIndex: 0 }} />))}
                      {[{ month: "DEC", bars: [{ h: 55, c: "#b8f0e0" }, { h: 12, c: "#ffcfb8" }] }, { month: "JAN", bars: [{ h: 40, c: "#b8f0e0" }, { h: 15, c: "#ffcfb8" }] }, { month: "FEB", bars: [{ h: 65, c: "#7de8c9" }, { h: 8, c: "#ffcfb8" }] }, { month: "MAR", bars: [{ h: 70, c: "#7de8c9" }, { h: 30, c: "#ff9b7b" }] }, { month: "MAY", bars: [{ h: 50, c: "#b8f0e0" }, { h: 12, c: "#ffcfb8" }] }, { month: "JUN", bars: [{ h: 45, c: "#b8f0e0" }, { h: 10, c: "#ffcfb8" }] }, { month: "JUL", bars: [{ h: 50, c: "#b8f0e0" }, { h: 14, c: "#ffcfb8" }] }, { month: "AUG", bars: [{ h: 42, c: "#b8f0e0" }, { h: 11, c: "#ffcfb8" }] }, { month: "SEP", bars: [{ h: 55, c: "#b8f0e0" }, { h: 13, c: "#ffcfb8" }] }].map((group, gi) => (
                        <div key={gi} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative", zIndex: 1 }}>
                          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: "100%" }}>
                            {group.bars.map((bar, bi) => (<div key={bi} style={{ width: bi === 0 ? 22 : 14, height: `${bar.h}%`, background: bar.c, borderRadius: "4px 4px 2px 2px", transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)" }} />))}
                          </div>
                          <span style={{ fontSize: 9, color: "#bbb", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{group.month}</span>
                        </div>
                      ))}
                      <svg viewBox="0 0 400 180" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, pointerEvents: "none" }}>
                        <path d="M20,80 C50,75 80,65 120,55 C160,45 180,40 220,50 C260,60 300,55 340,45 C360,40 380,35 400,30" fill="none" stroke="#c5a0ff" strokeWidth="2" strokeDasharray="6,4" opacity="0.6" />
                        <path d="M20,90 C50,85 80,80 120,60 C160,50 180,55 220,65 C260,70 300,60 340,50 C360,45 380,40 400,35" fill="none" stroke="#1088dd" strokeWidth="2.5" opacity="0.5" />
                      </svg>
                    </div>
                  </div>
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", textAlign: "right" }}>
                    {["$60M", "$30M", "$0", "$500K", ""].map(label => (<span key={label} style={{ fontSize: 9, color: "#bbb", fontWeight: 600 }}>{label}</span>))}
                  </div>
                </div>
                <div style={{ borderTop: "1px solid #eee", paddingTop: 20, overflowX: "auto" }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: "#888", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 14 }}>Operating Activities</div>
                  <div style={{ minWidth: 560 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2.5fr repeat(4, 1fr) 0.8fr", gap: 8, paddingBottom: 10, borderBottom: "1px solid #f0f0f0", marginBottom: 2 }}>
                      <span style={{ fontSize: 10, color: "#ccc", fontWeight: 600 }}></span>
                      {["Jan '24", "Feb '24", "Mar '24", "Apr '24", "Δ Avg (%)"].map(h => (<span key={h} style={{ fontSize: 10, color: "#aaa", fontWeight: 600, textAlign: "right" }}>{h}</span>))}
                    </div>
                    {[{ label: "Net Income", vals: ["-$4,617", "$3,793", "$2,643", "$5,796"], delta: "+856%", positive: true }, { label: "Accounts Receivable (A/R)", vals: ["$4,500", "-$4,500", "-$4,500", "-$4,500"], delta: "+200%", positive: true, indent: true, sub: "Adjustments to Net Income" }, { label: "Chase Credit Cards", vals: ["-$1,682", "-$778", "-$677", "-$435"], delta: "-59%", positive: false, indent: true }, { label: "Chase Credit Cards (Other)", vals: ["-$1,682", "-$778", "-$677", "-$435"], delta: "-59%", positive: false, indent: true, small: true }, { label: "Total Chase Credit Cards", vals: ["-$1,682", "-$778", "-$677", "-$435"], delta: "-59%", positive: false, bold: true }].map((row, ri) => (
                      <div key={ri}>
                        {row.sub && (<div style={{ fontSize: 10, color: "#bbb", fontWeight: 500, fontStyle: "italic", padding: "8px 0 4px", paddingLeft: row.indent ? 16 : 0 }}>{row.sub}</div>)}
                        <div style={{ display: "grid", gridTemplateColumns: "2.5fr repeat(4, 1fr) 0.8fr", gap: 8, padding: "8px 0", borderBottom: ri < 4 ? "1px solid #f8f8f8" : "none", alignItems: "center" }}>
                          <span style={{ fontSize: 12, color: row.bold ? "#111" : "#555", fontWeight: row.bold ? 700 : row.small ? 400 : 500, paddingLeft: row.indent || row.small ? 16 : 0 }}>{row.label}</span>
                          {row.vals.map((v, vi) => (<span key={vi} style={{ fontSize: 12, color: v.startsWith("-") ? "#555" : "#333", fontWeight: row.bold ? 700 : 400, textAlign: "right" }}>{v}</span>))}
                          <span style={{ fontSize: 12, fontWeight: 700, color: row.positive ? "#1088dd" : "#ff6b6b", textAlign: "right" }}>{row.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div style={{ padding: "60px 5% 80px", background: "#fff", overflow: "hidden" }}>
          <Reveal>
            <p style={{ textAlign: "center", fontSize: 12, color: "#888", fontWeight: 600, marginBottom: 50, letterSpacing: 1.5, textTransform: "uppercase" }}>Trusted by industry leaders</p>
          </Reveal>
          <div style={{ 
            position: "relative",
            width: "100%",
            overflow: "hidden",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "60px",
              width: "max-content",
              animation: "marquee 30s linear infinite",
            }}>
              {[...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES, ...TRUSTED_COMPANIES].map((co, i) => (
                <div key={i} style={{ 
                  opacity: 0.4, 
                  transition: "all 0.3s ease", 
                  cursor: "default",
                  filter: "grayscale(100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }} 
                onMouseOver={e => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.filter = "grayscale(0%)";
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.animationPlayState = "paused";
                }} 
                onMouseOut={e => {
                  e.currentTarget.style.opacity = "0.4";
                  e.currentTarget.style.filter = "grayscale(100%)";
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.animationPlayState = "running";
                }}>
                  {co.logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE SECTION ── */}
      <section className="timeline-section" style={{ padding: "120px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 10 }}>
            <div className="sec-label">How it works</div>
            <h2 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px", color: "#0a0a0a", lineHeight: 1.1 }}>Built for the way<br />modern businesses operate.</h2>
          </Reveal>
          <div style={{ position: "relative", paddingLeft: 40 }}>
            <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 1.5, background: "linear-gradient(180deg,#e8e8e8 0%,#e8e8e8 100%)" }} />
            {TIMELINE_STEPS.map((step, i) => (<TimelineItem key={i} step={step} index={i} />))}
          </div>
        </div>
      </section>

      {/* ── STICKY FINANCIALS SECTION ── */}
      <StickyFinancialsSection />

      {/* ── CORE ACCOUNTING CTA ── */}
      <section ref={featuresRef} style={{ padding: "100px 5%", background: "#fff" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, letterSpacing: "-1.5px", lineHeight: 1.15, color: "#0a0a0a" }}>Experience the power of<br /><em style={{ fontStyle: "italic", color: "#1088dd", fontWeight: 700 }}>unified business management</em> today.</h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ maxWidth: 1100, margin: "0 auto", background: "#1a1b2e", borderRadius: 28, overflow: "hidden", display: "flex", minHeight: 480, position: "relative", flexWrap: "wrap" }}>
            <div style={{ width: "min(30%, 320px)", minWidth: 260, padding: "48px 36px", display: "flex", flexDirection: "column", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, position: "relative", zIndex: 2 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1088dd", borderRadius: 6, padding: "6px 12px", marginBottom: 28, width: "fit-content" }}>
                <span style={{ fontWeight: 900, fontSize: 12, color: "#111", letterSpacing: "-0.3px" }}>BT</span>
                <span style={{ fontWeight: 700, fontSize: 11, color: "#111" }}>BisonTechs</span>
              </div>
              <h3 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 16 }}>Built for<br />Business Growth</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: 28 }}>BisonTechs delivers <strong style={{ color: "#fff" }}>100%</strong> integrated business operations</p>
              <input type="email" placeholder="Enter email" style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.06)", color: "#fff", fontSize: 13, fontFamily: "inherit", outline: "none", marginBottom: 12 }} />
              <button style={{ width: "100%", padding: "13px 20px", borderRadius: 10, border: "none", background: "#1088dd", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>Download whitepaper</button>
            </div>
            <div style={{ flex: 1, minWidth: 200, padding: "40px 32px 40px 24px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "#1088dd", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontWeight: 900, fontSize: 10, color: "#fff" }}>BT</span></div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>BisonTechs</span>
                </div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)", margin: "0 16px" }} />
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 3, paddingBottom: 30, overflowX: "auto" }}>
                {[{ label: "Finance", h: 98 }, { label: "HR & Payroll", h: 95 }, { label: "Inventory", h: 92 }, { label: "CRM", h: 89 }, { label: "Manufacturing", h: 86 }, { label: "Supply Chain", h: 83 }, { label: "Projects", h: 80 }, { label: "Analytics", h: 77 }, { label: "Procurement", h: 74 }, { label: "Quality Mgmt", h: 71 }, { label: "Warehouse", h: 68 }, { label: "Sales", h: 65 }, { label: "Purchasing", h: 62 }, { label: "Reporting", h: 59 }, { label: "Compliance", h: 56 }, { label: "Multi-location", h: 53 }, { label: "API Access", h: 50 }, { label: "Multi-user", h: 47 }, { label: "Custom Fields", h: 44 }, { label: "Workflows", h: 41 }, { label: "Automation", h: 38 }, { label: "Mobile App", h: 35 }, { label: "Integrations", h: 32 }, { label: "Security", h: 29 }].map((bar, bi) => (
                  <div key={bi} style={{ flex: 1, minWidth: 18, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ width: "100%", height: `${bar.h * 2.8}px`, background: "#1088dd", borderRadius: "3px 3px 0 0", transition: "all 0.3s ease", position: "relative" }}>
                      <div style={{ position: "absolute", top: -2, left: 0, right: 0, height: 3, background: "#1088dd", borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 7, color: "#1088dd", fontWeight: 700, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap", maxHeight: 75, overflow: "hidden" }}>{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.25}><p style={{ textAlign: "center", fontSize: 13, color: "#aaa", marginTop: 32, fontWeight: 500, letterSpacing: "0.3px" }}>Trusted by thousands of startups, SMBs, and enterprises worldwide</p></Reveal>
      </section>

      {/* ── WHITE DASHBOARD PREVIEW ── */}
      <section style={{ padding: "90px 5%", background: "#f6f7fb" }}>
        <div className="two-col" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 72, alignItems: "center" }}>
          <Reveal dir="left">
            <div className="sec-label">Live Dashboard</div>
            <h2 className="sec-h2" style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1.12, marginBottom: 20, color: "#0a0a0a" }}>Your entire business,<br />at a glance.</h2>
            <p style={{ fontSize: 16, color: "#777", lineHeight: 1.78, marginBottom: 32 }}>See real-time data across finance, HR, inventory, sales, and operations — all on one beautiful unified dashboard.</p>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {["Real-time financial & operational metrics", "Cross-departmental KPIs and analytics", "Inventory levels and supply chain status", "HR and payroll insights"].map(item => (<li key={item} className="check-row" style={{ marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}><span className="check-icon" style={{ color: "#1088dd", fontWeight: 700 }}>✓</span><span style={{ fontSize: 15, fontWeight: 500, color: "#333" }}>{item}</span></li>))}
            </ul>
            <button className="btn-teal-sm" style={{ marginTop: 36, padding: "12px 24px", borderRadius: 100, background: "#1088dd", color: "#fff", fontWeight: 600, border: "none", cursor: "pointer" }}>Explore the dashboard</button>
          </Reveal>
          <Reveal dir="right" delay={0.12}>
            <div className="db-white float" style={{ background: "#fff", borderRadius: 24, padding: 24, boxShadow: "0 20px 40px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                <div><div style={{ fontSize: 11, color: "#bbb", fontWeight: 600, letterSpacing: .9, textTransform: "uppercase", marginBottom: 4 }}>Overview</div><div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: "#111" }}>April 2026</div></div>
                <div style={{ background: "#e8f4fc", border: "1px solid rgba(16,136,221,.25)", borderRadius: 100, padding: "6px 14px", fontSize: 12, fontWeight: 700, color: "#1088dd" }}>↑ 18% vs last month</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[["Revenue", "$124,500", "+18%", "#1088dd"], ["Expenses", "$68,200", "+5%", "#ff6b6b"], ["Net Profit", "$56,300", "+34%", "#02437f"], ["Cash Flow", "$12,100", "+9%", "#f9ca24"]].map(([label, val, pct, col]) => (<div key={label} className="db-metric" style={{ background: "#f8f9fc", padding: 12, borderRadius: 12 }}><div style={{ fontSize: 10, color: "#ccc", fontWeight: 600, letterSpacing: .8, textTransform: "uppercase", marginBottom: 8 }}>{label}</div><div style={{ fontSize: 20, fontWeight: 900, color: "#111", letterSpacing: "-0.8px", marginBottom: 5 }}>{val}</div><div style={{ fontSize: 12, fontWeight: 700, color: col }}>{pct} <span style={{ color: "#ddd", fontWeight: 400 }}>vs last mo</span></div></div>))}
              </div>
              <div style={{ background: "#f8f9fc", borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}><span style={{ fontSize: 12, fontWeight: 700, color: "#555" }}>Monthly Revenue</span><span style={{ fontSize: 11, color: "#ccc" }}>Jan – Dec 2026</span></div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60 }}>{[32, 50, 40, 68, 60, 80, 68, 86, 75, 92, 80, 100].map((h, i) => (<div key={i} style={{ flex: 1, height: `${h}%`, background: i === 11 ? "linear-gradient(180deg,#1088dd,#02437f)" : i >= 9 ? "#d4f5ee" : "#f0f0f0", borderRadius: "4px 4px 0 0", transition: "height .5s", position: "relative" }}>{i === 11 && <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 800, color: "#1088dd", whiteSpace: "nowrap" }}>Apr</div>}</div>))}</div>
              </div>
              <div><div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 10 }}>Top Expenses</div>{[["Payroll", 68, "#02437f"], ["Software", 22, "#1088dd"], ["Marketing", 10, "#ff6b6b"]].map(([label, pct, col]) => (<div key={String(label)} style={{ marginBottom: 10 }}><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 12, color: "#aaa", fontWeight: 500 }}>{label}</span><span style={{ fontSize: 12, color: "#555", fontWeight: 700 }}>{pct}%</span></div><div style={{ background: "#f0f0f0", height: 6, borderRadius: 3, overflow: "hidden" }}><div style={{ width: `${pct}%`, background: String(col), height: "100%" }} /></div></div>))}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "110px 5%", background: darkSection ? "transparent" : "linear-gradient(155deg,#f0fdf9 0%,#f5f0ff 100%)", transition: "background 0.7s ease" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          <div className="sec-label" style={{ justifyContent: "center" }}>What people say</div>
          <h2 className="sec-h2" style={{ fontSize: "clamp(32px, 5vw, 44px)", fontWeight: 800, letterSpacing: "-1.5px", color: darkSection ? "#fff" : "#0a0a0a" }}>Loved by businesses<br />and accountants alike.</h2>
        </Reveal>
        <div className="fg3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {TESTIMONIALS.map((t, i) => (<Reveal key={i} delay={i * 0.1}><div className="tcard" style={{ background: "#fff", padding: 28, borderRadius: 24, boxShadow: "0 8px 24px rgba(0,0,0,0.04)" }}><div style={{ fontSize: 54, color: "#00ffbe", lineHeight: 1, marginBottom: 16, fontWeight: 900, fontFamily: "Georgia,serif" }}>"</div><p style={{ fontSize: 16, lineHeight: 1.75, color: "#333", marginBottom: 28, fontWeight: 400 }}>{t.text}</p><div style={{ display: "flex", alignItems: "center", gap: 14 }}><div style={{ width: 46, height: 46, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", flexShrink: 0 }}>{t.avatar}</div><div><div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{t.name}</div><div style={{ fontSize: 13, color: "#bbb", marginTop: 2 }}>{t.role}</div></div></div></div></Reveal>))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: "110px 5%", background: darkSection ? "transparent" : "#fff", transition: "background 0.7s ease" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="sec-label" style={{ justifyContent: "center" }}>Simple pricing</div>
          <h2 className="sec-h2" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16, color: darkSection ? "#fff" : "#0a0a0a" }}>Plans for every stage<br />of your business.</h2>
          <p style={{ fontSize: 17, color: darkSection ? "#aaa" : "#999", maxWidth: 440, margin: "0 auto" }}>No hidden fees. No per-transaction costs. Cancel anytime.</p>
        </Reveal>
        <div className="fg2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 450px))", justifyContent: "center", gap: 32, maxWidth: 1000, margin: "0 auto" }}>
          {PLANS.map((plan, i) => (<Reveal key={i} delay={i * 0.1}><div className={`plan-card${plan.highlight ? " hl" : ""}`} style={{ padding: 44, borderRadius: 28, background: plan.highlight ? "#1088dd" : "#0a0a0a", border: "none", boxShadow: plan.highlight ? "0 20px 50px rgba(16,136,221,0.25)" : "0 20px 40px rgba(0,0,0,0.15)", color: plan.highlight ? "#fff" : "#fff", position: "relative", overflow: "hidden", transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease" }}>
            {plan.highlight ? (<div style={{ background: "#0a0a0a", color: "#1088dd", fontSize: 11, fontWeight: 800, letterSpacing: 1.2, padding: "6px 16px", borderRadius: 100, display: "inline-block", marginBottom: 24, textTransform: "uppercase" }}>Best Value</div>) : (<div style={{ background: "rgba(16,136,221,0.15)", color: "#1088dd", fontSize: 11, fontWeight: 800, letterSpacing: 1.2, padding: "6px 16px", borderRadius: 100, display: "inline-block", marginBottom: 24, textTransform: "uppercase" }}>Flexible</div>)}
            <h3 style={{ fontSize: 26, fontWeight: 900, marginBottom: 10, color: "inherit", letterSpacing: "-0.5px" }}>{plan.name}</h3>
            <p style={{ fontSize: 15, color: plan.highlight ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)", marginBottom: 32, lineHeight: 1.6 }}>{plan.desc}</p>
            <div style={{ marginBottom: 36, display: "flex", alignItems: "flex-end", gap: 6 }}><span style={{ fontSize: 60, fontWeight: 900, letterSpacing: "-3px", color: "inherit", lineHeight: 1 }}>{plan.price}</span><span style={{ fontSize: 16, color: plan.highlight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)", paddingBottom: 10 }}>{plan.period}</span></div>
            <button style={{ width: "100%", marginBottom: 36, textAlign: "center", padding: "16px", borderRadius: 14, border: "none", cursor: "pointer", fontWeight: 800, fontSize: 16, background: plan.highlight ? "#0a0a0a" : "#1088dd", color: plan.highlight ? "#fff" : "#fff", boxShadow: plan.highlight ? "0 10px 25px rgba(0,0,0,0.2)" : "0 10px 25px rgba(16,136,221,0.3)", transition: "all 0.3s ease", fontFamily: "inherit" }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>{plan.cta}</button>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{plan.features.map((f, j) => (<div key={j} style={{ display: "flex", alignItems: "center", gap: 12 }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: plan.highlight ? "rgba(0,0,0,0.08)" : "rgba(16,136,221,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span style={{ color: plan.highlight ? "#0a0a0a" : "#1088dd", fontSize: 11, fontWeight: 900 }}>✓</span></div><span style={{ fontSize: 14, color: plan.highlight ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)", fontWeight: 500 }}>{f}</span></div>))}</div>
            <div style={{ position: "absolute", bottom: -20, right: -20, width: 120, height: 120, background: plan.highlight ? "radial-gradient(circle, rgba(0,0,0,0.05) 0%, transparent 70%)" : "radial-gradient(circle, rgba(16,136,221,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
          </div></Reveal>))}
        </div>
        <Reveal><p style={{ textAlign: "center", marginTop: 44, fontSize: 14, color: "#ccc" }}>Need a custom plan for your enterprise or accounting firm? <span style={{ color: "#1088dd", fontWeight: 700, cursor: "pointer" }}>Contact us →</span></p></Reveal>
      </section>

      {/* ── CTA BANNER ── */}
      <Reveal style={{ margin: "0 5% 90px" }}>
        <section style={{ background: "#0a0a0a", borderRadius: 32, padding: "90px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,136,221,.18),transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(2,67,127,.18),transparent 70%)" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#1088dd", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>Get started today</div>
            <h2 className="cta-h2" style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, color: "#fff", letterSpacing: "-1.8px", marginBottom: 18, lineHeight: 1.1 }}>Ready to take control<br />of your business?</h2>
            <p style={{ fontSize: 17, color: "#555", marginBottom: 44, maxWidth: 460, margin: "0 auto 44px" }}>Join thousands of businesses using BisonTechs to run their entire operation effortlessly.</p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-teal" style={{ fontSize: 17, padding: "17px 44px", borderRadius: 100, background: "#1088dd", color: "#fff", fontWeight: 700, border: "none", cursor: "pointer" }}>Get started for free</button>
              <button style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "17px 34px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all .3s ease" }} onMouseOver={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.borderColor = "#fff"; }} onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,.18)"; }}>Book a demo</button>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FOOTER ── */}
      <footer style={{ background: darkSection ? "transparent" : "#f8f8f8", borderTop: darkSection ? "1px solid rgba(255,255,255,0.05)" : "1px solid #efefef", padding: "72px 5% 40px", transition: "all 0.7s ease" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="fg5" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 48, marginBottom: 64 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}><div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#00ffbe,#6c63ff)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#fff", fontSize: 13, fontWeight: 900, fontFamily: "monospace", letterSpacing: "-1px" }}>BT</span></div><span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.5px", color: darkSection ? "#fff" : "#111" }}>BisonTechs</span></div>
              <p style={{ fontSize: 14, color: darkSection ? "rgba(255,255,255,0.6)" : "#aaa", lineHeight: 1.78, maxWidth: 220 }}>The complete ERP platform for modern businesses — finance, HR, inventory, and more.</p>
              <div style={{ marginTop: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={darkSection ? "rgba(255,255,255,0.6)" : "#aaa"} strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <path d="M22 6l-10 7L2 6"/>
                  </svg>
                  <a href="mailto:info@bisonstechs.com" style={{ fontSize: 14, color: darkSection ? "rgba(255,255,255,0.6)" : "#aaa", textDecoration: "none" }}>info@bisonstechs.com</a>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={darkSection ? "rgba(255,255,255,0.6)" : "#aaa"} strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a href="tel:+17867618327" style={{ fontSize: 14, color: darkSection ? "rgba(255,255,255,0.6)" : "#aaa", textDecoration: "none" }}>+1 (786)-761-8327</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>{[["𝕏", "#111"], ["in", "#0077b5"], ["▶", "#ff0000"]].map(([icon, col]) => (<button key={icon} style={{ width: 36, height: 36, borderRadius: "50%", background: "#efefef", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }} onMouseOver={e => { e.currentTarget.style.background = col; e.currentTarget.style.color = "#fff"; }} onMouseOut={e => { e.currentTarget.style.background = "#efefef"; e.currentTarget.style.color = "#111"; }}>{icon}</button>))}</div>
            </div>
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (<div key={section}><h4 style={{ fontSize: 12, fontWeight: 800, marginBottom: 18, letterSpacing: 1, textTransform: "uppercase", color: "#888" }}>{section}</h4><ul style={{ listStyle: "none", padding: 0 }}>{links.map(link => (<li key={link} style={{ marginBottom: 11 }}><a href="#" style={{ fontSize: 14, color: "#bbb", textDecoration: "none", fontWeight: 400, transition: "color .2s" }} onMouseOver={e => e.currentTarget.style.color = darkSection ? "#fff" : "#111"} onMouseOut={e => e.currentTarget.style.color = darkSection ? "rgba(255,255,255,0.6)" : "#bbb"}>{link}</a></li>))}</ul></div>))}
          </div>
          <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <p style={{ fontSize: 13, color: "#ccc" }}>© 2026 BisonTechs, Inc. All rights reserved.</p>
            <p style={{ fontSize: 13, color: "#ccc" }}>Built for businesses that mean business. 🚀</p>
          </div>
        </div>
      </footer>

      {/* ── SCROLL TO TOP BUTTON ── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: 30,
          right: 30,
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: "#1088dd",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          display: showScrollTop ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(16,136,221,0.4)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
        onMouseOver={e => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = "0 6px 25px rgba(16,136,221,0.5)";
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(16,136,221,0.4)";
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>
    </div>
  );
}