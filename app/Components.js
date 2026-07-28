import { useState, useEffect, useRef } from "react";

// ── Scroll Reveal Hook ──
export function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Reveal wrapper ──
export function Reveal({ children, delay = 0, dir = "up", style: extraStyle = {} }) {
  const [ref, visible] = useReveal();
  const map = { up: "translateY(44px)", left: "translateX(-44px)", right: "translateX(44px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : map[dir] || map.up,
      transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...extraStyle,
    }}>
      {children}
    </div>
  );
}

// ── Timeline item with scroll-based font scaling ──
export function TimelineItem({ step, index }) {
  const ref = useRef(null);
  const [ratio, setRatio] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        setRatio(entry.intersectionRatio);
      },
      { threshold: thresholds, rootMargin: "-5% 0px -5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const active = ratio > 0.35;
  const tagSize = 16 + ratio * 12;
  const titleSize = 32 + ratio * 24;
  const bodySize = 14 + ratio * 4;
  const colorIntensity = `rgba(10,10,10,${0.15 + ratio * 0.85})`;
  const bodyColor = `rgba(80,80,80,${0.15 + ratio * 0.85})`;

  return (
    <div ref={ref} style={{
      display: "flex",
      gap: 48,
      alignItems: "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(40px)",
      transition: `opacity 0.7s ease ${index * 0.15}s, transform 0.7s ease ${index * 0.15}s`,
    }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 6 }}>
        <div style={{
          width: active ? 20 : 14,
          height: active ? 20 : 14,
          borderRadius: "50%",
          background: active ? "#111" : "transparent",
          border: active ? "3px solid #111" : "2px solid #ddd",
          transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: active ? "0 0 0 6px rgba(0,0,0,0.07)" : "none",
        }} />
      </div>

      <div style={{ paddingBottom: 100, flex: 1 }}>
        {step.tag && (
          <div style={{
            fontSize: tagSize,
            fontWeight: 700,
            color: colorIntensity,
            lineHeight: 1.25,
            marginBottom: 14,
            transition: "font-size 0.1s ease",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "-0.3px",
          }}>
            {step.tag}
          </div>
        )}
        {step.title && (
          <h2 style={{
            fontSize: titleSize,
            fontWeight: 900,
            color: colorIntensity,
            lineHeight: 1.08,
            marginBottom: 18,
            letterSpacing: "-2px",
            transition: "font-size 0.1s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {step.title}
          </h2>
        )}
        <p style={{
          fontSize: bodySize,
          color: bodyColor,
          lineHeight: 1.78,
          maxWidth: 580,
          transition: "font-size 0.1s ease",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 400,
        }}>
          {step.body}
        </p>
        <button style={{
          marginTop: 24,
          padding: `${10 + ratio * 6}px ${22 + ratio * 14}px`,
          fontSize: 13 + ratio * 3,
          fontWeight: 700,
          background: active ? "#111" : "transparent",
          color: active ? "#fff" : "#bbb",
          border: active ? "2px solid #111" : "2px solid #ddd",
          borderRadius: 100,
          cursor: "pointer",
          fontFamily: "'DM Sans', sans-serif",
          transition: "all 0.3s ease",
          opacity: 0.3 + ratio * 0.7,
        }}>
          Learn more →
        </button>
      </div>
    </div>
  );
}

const STICKY_SLIDES = [
  {
    title: "Profit & loss",
    desc: "View your company's Profit & Loss for an instant snapshot into your revenue, expenses, and profitability over a specific period. Always on for a live, dynamic view of your business, or run a custom report to analyze any time period.",
    tab: "Profit & Loss",
    icon: "📊",
    insights: [
      { type: "revenue", title: "Revenue Insights", text: 'You earned 1.22% ($120) more from Income in August compared to the prior month due to a $120 increase in Subscription Revenue.', color: "#00897b" },
      { type: "expense", title: "Expense Insights", text: 'You spent 7.19% ($11,920) more on Expenses in August compared to the prior month due to a $11,920 increase in Travel and Software.', color: "#e65100" },
    ],
    tableData: [
      { cols: ["", "Jul", "Aug", "Avg %"] },
      { cols: ["", "$9,887", "$10,008", "+13%"], highlight: true },
      { cols: ["", "$9,887", "$10,008", "+13%"], highlight: true },
      { cols: ["$5,211", "$1,047", "", "-64%"], negative: true },
      { cols: ["$178", "$122", "", "+2%"] },
      { cols: ["$96", "$498", "", "+198%"], highlight: true },
      { cols: ["$5,485", "$1,667", "", "-48%"], negative: true },
      { cols: ["$4,402", "$8,342", "", "+47%"], highlight: true },
    ]
  },
  {
    title: "Balance sheet",
    desc: "Get a comprehensive snapshot of your company's financial standing with the Balance Sheet. View your assets, liabilities, and equity in real time on Digits, or customize reports to evaluate financial health at any point in time.",
    tab: "Balance Sheet",
    icon: "📋",
    insights: [
      { type: "revenue", title: "Asset Growth", text: 'Total assets increased by 12.4% ($45,200) in Q3 driven by a $32,000 increase in Accounts Receivable and $13,200 in Equipment.', color: "#00897b" },
      { type: "expense", title: "Liability Alert", text: 'Short-term liabilities rose 8.7% ($18,400) primarily from a $15,600 increase in Accounts Payable and $2,800 in Accrued Expenses.', color: "#e65100" },
    ],
    tableData: [
      { cols: ["", "Jul", "Aug", "Avg %"] },
      { cols: ["", "$114,167", "$114,167", "+9%"] },
      { cols: ["", "$7,093", "$6,947", "+6%"] },
      { cols: ["$114,167", "$119,705", "$127,500", "+9%"] },
      { cols: ["$7,093", "$7,692", "$7,686", "+6%"] },
    ]
  },
  {
    title: "Cash flow",
    desc: "Track cash moving in and out of your business to maintain a healthy runway and predict future needs. Analyze operating, investing, and financing activities with real-time data.",
    tab: "Cash Flow",
    icon: "💰",
    insights: [
      { type: "revenue", title: "Inflow Summary", text: 'Operating cash inflow increased by 15.3% ($8,720) in August compared to July, driven by a $6,400 increase in Collections from customers.', color: "#00897b" },
      { type: "expense", title: "Outflow Alert", text: 'Cash outflows rose 4.2% ($2,100) due to increased vendor payments of $1,800 and a $300 increase in payroll disbursements.', color: "#e65100" },
    ],
    tableData: [
      { cols: ["", "Jul", "Aug", "Avg %"] },
      { cols: ["", "$56,800", "$65,520", "+15%"], highlight: true },
      { cols: ["", "$48,200", "$50,300", "+4%"] },
      { cols: ["$8,600", "$15,220", "", "+77%"], highlight: true },
    ]
  },
  {
    title: "Custom reports",
    desc: "Stay in sync with your team using Custom Reports. Generate reports for any time period, capturing any combination of financial statements and key metrics for board decks, investor updates, and internal reviews.",
    tab: "Custom Reports",
    icon: "📄",
    insights: [
      { type: "revenue", title: "Report Builder", text: 'Create customized financial reports combining P&L, Balance Sheet, and Cash Flow data for any date range. Export to PDF, Excel, or share directly.', color: "#00897b" },
      { type: "expense", title: "Scheduled Reports", text: 'Automate report delivery to stakeholders on a weekly, monthly, or quarterly basis. Set up alerts for key metric thresholds.', color: "#e65100" },
    ],
    tableData: [
      { cols: ["", "Q1", "Q2", "Avg %"] },
      { cols: ["", "$342,500", "$389,100", "+14%"], highlight: true },
      { cols: ["", "$218,400", "$231,600", "+6%"] },
      { cols: ["$124,100", "$157,500", "", "+27%"], highlight: true },
    ]
  }
];

export function StickyFinancialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section style={{ background: "#eaf3f9", padding: "80px 5%" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 400, color: "#111", marginBottom: 24, letterSpacing: "-1px", lineHeight: 1.2 }}>
            Financial statements that speak your language
          </h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {STICKY_SLIDES.map((s, i) => (
              <button key={i} onClick={() => setActiveIndex(i)} style={{
                padding: "10px 24px",
                background: activeIndex === i ? "#fff" : "rgba(255,255,255,0.5)",
                color: activeIndex === i ? "#111" : "#555",
                borderRadius: 100,
                fontWeight: activeIndex === i ? 700 : 500,
                fontSize: 14,
                boxShadow: activeIndex === i ? "0 4px 16px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                display: "flex", alignItems: "center", gap: 8,
                border: activeIndex === i ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
                cursor: "pointer",
                fontFamily: "inherit",
              }}>
                <span style={{ fontSize: 15 }}>{s.icon}</span> {s.tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", height: "clamp(620px, 75vh, 820px)", overflow: "hidden" }}>
          {STICKY_SLIDES.map((slide, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={i} style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0) scale(1)" : "translateX(60px) scale(0.97)",
                transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
                pointerEvents: isActive ? "auto" : "none",
              }}>
                <div style={{
                  height: "100%",
                  background: "#fff",
                  borderRadius: 28,
                  overflow: "hidden",
                  display: "flex",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)",
                }}>
                  <div style={{
                    width: "28%",
                    padding: "48px 36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRight: "1px solid #f0f0f0",
                    flexShrink: 0,
                  }}>
                    <h3 style={{ fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 400, color: "#111", marginBottom: 20, letterSpacing: "-0.5px", lineHeight: 1.2 }}>
                      {slide.title}
                    </h3>
                    <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7 }}>
                      {slide.desc}
                    </p>
                  </div>

                  <div style={{
                    flex: 1,
                    background: "linear-gradient(145deg, #d6e8f5 0%, #bdd4ea 40%, #a8c4dc 100%)",
                    position: "relative",
                    overflow: "hidden",
                    padding: "40px 32px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                  }}>
                    {slide.insights.map((insight, ii) => (
                      <div key={ii} style={{
                        background: "#fff",
                        borderRadius: 18,
                        padding: "20px 28px",
                        boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
                        maxWidth: ii === 0 ? 360 : 380,
                        marginLeft: ii === 0 ? 0 : 28,
                        position: "relative",
                        zIndex: 2 - ii,
                        transform: isActive ? "translateY(0)" : `translateY(${20 + ii * 15}px)`,
                        opacity: isActive ? 1 : 0.5,
                        transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${ii * 0.12 + 0.1}s`,
                      }}>
                        <div style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: insight.color,
                          marginBottom: 8,
                          letterSpacing: "-0.3px"
                        }}>{insight.title}</div>
                        <p style={{
                          fontSize: 14,
                          color: "#555",
                          lineHeight: 1.55,
                        }}>{insight.text}</p>
                      </div>
                    ))}

                    <div style={{
                      position: "absolute",
                      right: 24,
                      top: 28,
                      bottom: 28,
                      width: "44%",
                      background: "rgba(255,255,255,0.55)",
                      backdropFilter: "blur(8px)",
                      borderRadius: 20,
                      padding: "20px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                      zIndex: 0,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    }}>
                      {slide.tableData.map((row, ri) => (
                        <div key={ri} style={{
                          display: "grid",
                          gridTemplateColumns: `repeat(${row.cols.length}, 1fr)`,
                          gap: 8,
                          padding: "8px 4px",
                          borderBottom: ri === 0 ? "1px solid rgba(0,0,0,0.1)" : "none",
                          fontSize: ri === 0 ? 12 : 13,
                          fontWeight: ri === 0 ? 700 : 400,
                          color: ri === 0 ? "#555" : row.negative ? "#c62828" : row.highlight ? "#00897b" : "#444",
                        }}>
                          {row.cols.map((c, ci) => (
                            <span key={ci} style={{ textAlign: ci === 0 ? "left" : "right" }}>{c}</span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');
  
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif;
  }
  
  section {
    scroll-margin-top: 80px;
  }
  
  .nav-glass {
    background: rgba(255,255,255,0.88) !important;
    backdrop-filter: blur(22px) saturate(190%) !important;
    -webkit-backdrop-filter: blur(22px) saturate(190%) !important;
    border-bottom: 1px solid rgba(0,0,0,0.06) !important;
    box-shadow: 0 2px 24px rgba(0,0,0,0.06) !important;
  }
  
  .nav-link {
    font-size: 15px;
    font-weight: 500;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;
    transition: color .2s;
    padding: 6px 0;
    font-family: inherit;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .nav-link:hover {
    color: #000;
  }
  
  .nav-link svg {
    transition: transform .2s;
  }
  
  .nav-link.open svg {
    transform: rotate(180deg);
  }
  
  .dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 16px;
    padding: 10px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06);
    min-width: 240px;
    z-index: 200;
    animation: dropIn .2s cubic-bezier(0.22,1,0.36,1) both;
  }
  
  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
  
  .dropdown-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: background .15s;
  }
  
  .dropdown-item:hover {
    background: #f6f6f6;
  }
  
  .dropdown-item-title {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }
  
  .dropdown-item-desc {
    font-size: 12px;
    color: #aaa;
    font-weight: 400;
  }
  
  .btn-dark {
    background: #111;
    color: #fff;
    border: none;
    border-radius: 100px;
    padding: 11px 22px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: transform .2s, box-shadow .2s;
  }
  
  .btn-dark:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0,0,0,.22);
  }
  
  .btn-teal {
    background: #00ffbe;
    color: #111;
    border: none;
    border-radius: 100px;
    padding: 15px 36px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: transform .2s, box-shadow .2s, background .2s;
  }
  
  .btn-teal:hover {
    background: #00b894;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,201,167,.4);
  }
  
  .btn-teal-sm {
    background: #00ffbe;
    color: #111;
    border: none;
    border-radius: 100px;
    padding: 12px 28px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    font-family: inherit;
    transition: transform .2s, box-shadow .2s;
  }
  
  .btn-teal-sm:hover {
    background: #00b894;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0,201,167,.35);
  }
  
  .btn-outline {
    background: transparent;
    color: #111;
    border: 2px solid rgba(0,0,0,.22);
    border-radius: 100px;
    padding: 13px 30px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: inherit;
    transition: all .2s;
  }
  
  .btn-outline:hover {
    background: #111;
    color: #fff;
    border-color: #111;
  }
  
  .hero-bg {
    background: linear-gradient(155deg, #fce4f0 0%, #f0e8ff 25%, #e5eeff 55%, #dafbf4 100%);
  }
  
  .feature-card {
    background: #fff;
    border-radius: 20px;
    padding: 26px;
    border: 1.5px solid #efefef;
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
  }
  
  .feature-card:hover,
  .feature-card.active {
    border-color: #00ffbe;
    box-shadow: 0 10px 40px rgba(0,201,167,.13);
    transform: translateY(-5px);
  }
  
  .plan-card {
    background: #fff;
    border-radius: 24px;
    padding: 36px;
    border: 2px solid #f0f0f0;
    transition: all .3s;
    height: 100%;
  }
  
  .plan-card.hl {
    background: #111;
    color: #fff;
    border-color: #111;
  }
  
  .plan-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px rgba(0,0,0,.1);
  }
  
  .plan-card.hl:hover {
    box-shadow: 0 20px 60px rgba(0,0,0,.28);
  }
  
  .check-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
  }
  
  .check-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #00ffbe;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 10px;
    font-weight: 900;
    color: #111;
  }
  
  .tcard {
    background: #fff;
    border-radius: 24px;
    padding: 34px;
    border: 1.5px solid #f0f0f0;
    box-shadow: 0 4px 20px rgba(0,0,0,.04);
    transition: all .3s;
    height: 100%;
  }
  
  .tcard:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 50px rgba(0,0,0,.09);
  }
  
  .sec-label {
    font-size: 12px;
    font-weight: 700;
    color: #6c63ff;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;
  }
  
  .sec-label::before {
    content: '';
    width: 18px;
    height: 2px;
    background: #6c63ff;
    border-radius: 2px;
    display: inline-block;
  }
  
  .co-card {
    background: #fff;
    border-radius: 14px;
    padding: 14px 28px;
    border: 1.5px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 12px rgba(0,0,0,.04);
    transition: all .3s;
    height: 56px;
  }
  
  .co-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,.08);
  }
  
  .int-card {
    background: #fff;
    border-radius: 18px;
    padding: 18px 20px;
    border: 1.5px solid #f0f0f0;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all .3s;
    box-shadow: 0 2px 12px rgba(0,0,0,.04);
  }
  
  .int-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,.09);
    border-color: #e0e0e0;
  }
  
  .stat-card {
    background: rgba(255,255,255,.85);
    backdrop-filter: blur(12px);
    border-radius: 18px;
    padding: 18px 26px;
    text-align: center;
    border: 1px solid rgba(255,255,255,.7);
    box-shadow: 0 4px 24px rgba(0,0,0,.07);
  }
  
  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  
  .marquee-wrap {
    overflow: hidden;
    position: relative;
  }
  
  .marquee-fade-l {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 90px;
    background: linear-gradient(90deg, #fafafa, transparent);
    z-index: 2;
    pointer-events: none;
  }
  
  .marquee-fade-r {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 90px;
    background: linear-gradient(270deg, #fafafa, transparent);
    z-index: 2;
    pointer-events: none;
  }
  
  .marquee-track {
    display: flex;
    gap: 14px;
    animation: ticker 40s linear infinite;
    width: max-content;
    align-items: center;
  }
  
  .marquee-track:hover {
    animation-play-state: paused;
  }
  
  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulseDot {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.55); opacity: .55; }
  }
  
  .fade-up {
    animation: fadeUp .75s cubic-bezier(.22,1,.36,1) both;
  }
  
  .d1 { animation-delay: .1s; }
  .d2 { animation-delay: .25s; }
  .d3 { animation-delay: .4s; }
  .d4 { animation-delay: .58s; }
  
  .float {
    animation: float 5s ease-in-out infinite;
  }
  
  .pulse {
    animation: pulseDot 2.2s ease-in-out infinite;
  }
  
  .mob-menu {
    position: fixed;
    inset: 0;
    background: rgba(255,255,255,.97);
    backdrop-filter: blur(20px);
    z-index: 200;
    padding: 80px 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    overflow-y: auto;
  }
  
  .db-white {
    background: #fff;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 24px 80px rgba(0,0,0,.12);
    border: 1.5px solid #f0f0f0;
  }
  
  .db-metric {
    background: #f8f9fc;
    border-radius: 14px;
    padding: 16px 18px;
    border: 1px solid #efefef;
  }
  
  .db-bar-bg {
    background: #f0f0f0;
    border-radius: 4px;
    height: 7px;
    overflow: hidden;
  }
  
  .db-bar-fill {
    height: 7px;
    border-radius: 4px;
    background: linear-gradient(90deg, #00ffbe, #6c63ff);
  }
  
  section > div::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 900px) {
    .two-col, .two-col-r {
      grid-template-columns: 1fr !important;
    }
    .timeline-section {
      padding: 80px 5% !important;
    }
  }
  
  @media (max-width: 768px) {
    .hero-h1 {
      font-size: 40px !important;
      letter-spacing: -1.5px !important;
    }
    .sec-h2 {
      font-size: 34px !important;
    }
    .desktop-nav {
      display: none !important;
    }
    .mob-btn {
      display: flex !important;
    }
    .fg4 {
      grid-template-columns: 1fr 1fr !important;
    }
    .fg3 {
      grid-template-columns: 1fr !important;
    }
    .fg5 {
      grid-template-columns: 1fr !important;
    }
    .hero-stats {
      flex-wrap: wrap !important;
    }
    .cta-h2 {
      font-size: 34px !important;
    }
    .timeline-title {
      font-size: 34px !important;
    }
  }
  
  @media (max-width: 480px) {
    .fg4 {
      grid-template-columns: 1fr !important;
    }
    .fg5 {
      grid-template-columns: 1fr !important;
    }
    .hero-h1 {
      font-size: 34px !important;
    }
  }
`;

// ============================================
// DATA FILE (Data.tsx or Data.js)
// ============================================

export const NAV_LINKS = [
  {
    label: "Products",
    dropdown: [
      { title: "LedgerCore", desc: "Core accounting engine for businesses" },
      { title: "Analytics", desc: "Real-time financial insights & reporting" },
      { title: "Reports", desc: "Custom & automated financial reports" },
      { title: "Invoicing", desc: "Professional invoice management" },
      { title: "Expense Tracking", desc: "Automated expense categorization" }
    ]
  },
  {
    label: "Solutions",
    dropdown: [
      { title: "For Accountants", desc: "Practice management & client portal" },
      { title: "For Startups", desc: "Scale with smart financial tools" },
      { title: "For Enterprises", desc: "Advanced security & controls" },
      { title: "For Freelancers", desc: "Simple bookkeeping for solopreneurs" },
      { title: "For SMEs", desc: "Complete business finance solution" }
    ]
  },
  {
    label: "Resources",
    dropdown: [
      { title: "Help Center", desc: "Guides, tutorials & documentation" },
      { title: "Blog", desc: "Latest news & accounting tips" },
      { title: "Webinars", desc: "Live & recorded sessions" },
      { title: "Community", desc: "Connect with other users" },
      { title: "API Documentation", desc: "Integrate with your apps" }
    ]
  },
  {
    label: "Pricing",
    dropdown: [
      { title: "Starter Plan", desc: "For freelancers & small businesses" },
      { title: "Professional Plan", desc: "For growing teams & startups" },
      { title: "Enterprise Plan", desc: "Custom solutions for large orgs" },
      { title: "Compare Plans", desc: "Find the right plan for you" }
    ]
  },
  {
    label: "Company",
    dropdown: [
      { title: "About Us", desc: "Our story & mission" },
      { title: "Careers", desc: "Join our growing team" },
      { title: "Press", desc: "News & media coverage" },
      { title: "Contact", desc: "Get in touch with us" },
      { title: "Partners", desc: "Become a LedgerPro partner" }
    ]
  },
];

export const FEATURES = [
  { name: "Real-time Sync", desc: "Connect all your banks and accounts in minutes." },
  { name: "Automated Reports", desc: "Generate P&L, balance sheets, and cash flow statements instantly." },
  { name: "Smart Insights", desc: "AI-powered suggestions to optimize your finances." },
];

export const PLANS = [
  { name: "Starter", price: "$29", period: "/month", desc: "Perfect for freelancers and small businesses.", cta: "Start free trial", features: ["Up to 5 users", "Basic reports", "Email support", "Bank connections"], highlight: false },
  { name: "Professional", price: "$79", period: "/month", desc: "Best for growing teams and startups.", cta: "Get started", features: ["Unlimited users", "Advanced analytics", "Priority support", "API access", "Custom reports"], highlight: true },
];

export const TESTIMONIALS = [
  { text: "LedgerPro transformed how we manage our books. The real-time insights are game-changing!", name: "Sarah Johnson", role: "CFO at TechStart", avatar: "SJ", color: "#6c63ff" },
  { text: "Finally, accounting software that actually understands how businesses work. Highly recommended!", name: "Michael Chen", role: "Founder at OmniHealth", avatar: "MC", color: "#00ffbe" },
  { text: "The automated reports save us hours every week. Our accountant loves it!", name: "Emily Rodriguez", role: "Finance Lead", avatar: "ER", color: "#ff6b6b" },
];

export const TRUSTED_COMPANIES = [
  { logo: <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-1px" }}>STRIPE</span> },
  { logo: <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-1px" }}>NOTION</span> },
  { logo: <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-1px" }}>VERCEL</span> },
  { logo: <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-1px" }}>RAISE</span> },
  { logo: <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-1px" }}>RIBBON</span> },
];

export const INTEGRATIONS = [
  { name: "Stripe", icon: "💳" }, { name: "Shopify", icon: "🛍️" }, { name: "Salesforce", icon: "📊" }, { name: "QuickBooks", icon: "📚" },
];

export const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Integrations", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Help Center", "Community", "Webinars", "Guides"],
  Legal: ["Privacy", "Terms", "Security", "GDPR"],
};

export const TIMELINE_STEPS = [
  { tag: "Step 01", title: "Connect your accounts", body: "Securely link your bank accounts, credit cards, and payment processors in minutes. We support 10,000+ financial institutions worldwide." },
  { tag: "Step 02", title: "Automated categorization", body: "Our AI automatically categorizes transactions with 99% accuracy. Review and approve in bulk, saving hours of manual work each week." },
  { tag: "Step 03", title: "Real-time insights", body: "Watch your financial dashboard come alive with real-time metrics, cash flow projections, and actionable insights to grow your business." },
  { tag: "Step 04", title: "Export & collaborate", body: "Share reports with your team, accountant, or investors. Export to Excel, PDF, or schedule automated delivery to stakeholders." },
];

export const ACCOUNTING_SLIDES = STICKY_SLIDES;

// ===========================