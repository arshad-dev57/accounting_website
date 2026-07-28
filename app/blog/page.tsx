"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  NAV_LINKS, BLOG_POSTS, FOOTER_LINKS
} from "../Data";
import {
  Reveal, GLOBAL_STYLES,
} from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function BlogPage() {
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

      {/* ── BLOG HERO (RESPONSIVE) ── */}
      <section style={{ paddingTop: "clamp(120px, 18vw, 160px)", paddingBottom: "clamp(40px, 8vw, 80px)", background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)", textAlign: "center" }}>
        <Reveal>
          <div className="sec-label" style={{ justifyContent: "center" }}>Our Blog</div>
          <h1 style={{ fontSize: "clamp(32px, 8vw, 64px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", marginBottom: 20, lineHeight: 1.2, padding: "0 16px" }}>
            Insights for the <br /> <span style={{ color: "#00c9a7" }}>Modern Accountant.</span>
          </h1>
          <p style={{ fontSize: "clamp(14px, 4vw, 18px)", color: "#666", maxWidth: 600, margin: "0 auto", lineHeight: 1.6, padding: "0 16px" }}>
            Stay ahead of the curve with our latest thinking on accounting standards, tax strategy, and financial technology.
          </p>
        </Reveal>
      </section>

      {/* ── FEATURED POST (RESPONSIVE) ── */}
      <section style={{ padding: "0 5% 60px" }}>
        <Reveal delay={0.1}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "#111", borderRadius: 32, overflow: "hidden",
            display: "flex", flexDirection: "row",
            flexWrap: "wrap",
            boxShadow: "0 40px 100px rgba(0,0,0,0.15)"
          }}>
            <div style={{ flex: "1 1 400px", minHeight: "clamp(280px, 40vw, 400px)", position: "relative" }}>
              <img src={BLOG_POSTS[0].image} alt="Featured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: 20, left: 20, background: "#00c9a7", color: "#111", fontWeight: 800, fontSize: "clamp(10px, 3vw, 12px)", padding: "6px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 1 }}>Featured</div>
            </div>
            <div style={{ flex: "1 1 350px", padding: "clamp(32px, 6vw, 60px) clamp(24px, 5vw, 50px)" }}>
              <div style={{ color: "#00c9a7", fontWeight: 700, fontSize: "clamp(12px, 3.5vw, 14px)", marginBottom: 14 }}>{BLOG_POSTS[0].category} • {BLOG_POSTS[0].readTime}</div>
              <h2 style={{ fontSize: "clamp(24px, 6vw, 32px)", fontWeight: 800, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>{BLOG_POSTS[0].title}</h2>
              <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "rgba(255,255,255,0.6)", marginBottom: 28, lineHeight: 1.6 }}>{BLOG_POSTS[0].excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: BLOG_POSTS[0].author.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12 }}>{BLOG_POSTS[0].author.avatar}</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: "clamp(13px, 3.5vw, 14px)" }}>{BLOG_POSTS[0].author.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(11px, 3vw, 12px)" }}>{BLOG_POSTS[0].date}</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── BLOG GRID (RESPONSIVE) ── */}
      <section style={{ padding: "clamp(40px, 8vw, 80px) 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "clamp(24px, 5vw, 40px)" }}>
            {BLOG_POSTS.slice(1).map((post, i) => (
              <Reveal key={post.id} delay={i * 0.1}>
                <div style={{ cursor: "pointer" }}>
                  <div style={{ borderRadius: 24, overflow: "hidden", height: "clamp(200px, 30vw, 240px)", marginBottom: 20, position: "relative" }}>
                    <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ color: "#6c63ff", fontWeight: 700, fontSize: "clamp(10px, 3vw, 12px)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>{post.category} • {post.readTime}</div>
                  <h3 style={{ fontSize: "clamp(18px, 5vw, 22px)", fontWeight: 800, color: "#111", marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h3>
                  <p style={{ fontSize: "clamp(13px, 4vw, 15px)", color: "#777", marginBottom: 16, lineHeight: 1.6 }}>{post.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: post.author.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 10 }}>{post.author.avatar}</div>
                    <div style={{ fontSize: "clamp(12px, 3.5vw, 13px)", color: "#111", fontWeight: 600 }}>{post.author.name}</div>
                    <div style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#bbb", marginLeft: "auto" }}>{post.date}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER (RESPONSIVE) ── */}
      <section style={{ padding: "clamp(60px, 12vw, 100px) 5% clamp(80px, 15vw, 140px)" }}>
        <Reveal>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            background: "#f8fafc", borderRadius: 40, padding: "clamp(40px, 8vw, 80px) clamp(24px, 5vw, 40px)",
            textAlign: "center", border: "1px solid #e2e8f0"
          }}>
            <h2 style={{ fontSize: "clamp(28px, 6vw, 36px)", fontWeight: 800, color: "#111", marginBottom: 14, padding: "0 16px" }}>Get the LedgerPro newsletter.</h2>
            <p style={{ fontSize: "clamp(14px, 4vw, 16px)", color: "#666", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px", padding: "0 16px" }}>
              The latest financial news, technical guides, and accounting strategy delivered to your inbox every Tuesday.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", maxWidth: 500, margin: "0 auto", padding: "0 16px" }}>
              <input type="email" placeholder="Your email address" style={{
                flex: 1, minWidth: 240, padding: "clamp(14px, 3.5vw, 16px) 20px",
                borderRadius: 100, border: "1px solid #ddd", fontSize: "clamp(13px, 3.5vw, 15px)", outline: "none"
              }} />
              <button className="btn-dark" style={{ padding: "clamp(14px, 3.5vw, 16px) clamp(24px, 5vw, 32px)", fontSize: "clamp(13px, 3.5vw, 15px)" }}>Subscribe</button>
            </div>
            <p style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#aaa", marginTop: 18 }}>No spam. Unsubscribe at any time.</p>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER (RESPONSIVE) ── */}
      <footer style={{ background: "#fafafa", padding: "clamp(40px, 8vw, 80px) 5% clamp(24px, 5vw, 40px)", borderTop: "1px solid #eee" }}>
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