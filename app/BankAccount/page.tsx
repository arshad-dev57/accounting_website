"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

export default function BankAccountsPage() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [activeAccount, setActiveAccount] = useState(0);
    const [showAddAccount, setShowAddAccount] = useState(false);
    const [newAccount, setNewAccount] = useState({
        name: "",
        bank: "",
        accountNumber: "",
        accountType: "Checking",
        balance: "",
    });
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

    const [accounts, setAccounts] = useState([
        {
            id: 1,
            name: "Business Checking",
            number: "•••• 4821",
            balance: "84,200.00",
            available: "82,150.00",
            type: "Checking",
            bank: "Chase",
            gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        },
        {
            id: 2,
            name: "Business Savings",
            number: "•••• 7740",
            balance: "42,600.00",
            available: "42,600.00",
            type: "Savings",
            bank: "Bank of America",
            gradient: "linear-gradient(135deg, #0d7377 0%, #14a085 100%)",
        },
    ]);

    const transactions = [
        { date: "Apr 28", desc: "Acme Corp — Invoice #INV-0088", category: "Revenue", amount: "+8,500.00", type: "credit" },
        { date: "Apr 28", desc: "Office Supplies — Apex Co.", category: "Office Expense", amount: "-1,200.00", type: "debit" },
        { date: "Apr 27", desc: "Google Ads — April Campaign", category: "Marketing", amount: "-2,400.00", type: "debit" },
        { date: "Apr 26", desc: "Payroll — April 2026", category: "Payroll Expense", amount: "-32,000.00", type: "debit" },
        { date: "Apr 25", desc: "Loan Repayment", category: "Loan Payment", amount: "-5,000.00", type: "debit" },
        { date: "Apr 24", desc: "Freelancer — Design Services", category: "Professional Fees", amount: "-850.00", type: "debit" },
    ];

    const active = accounts[activeAccount];
    const totalBalance = accounts.reduce((sum, a) => sum + parseFloat(a.balance.replace(/,/g, "")), 0);

    const handleAddAccount = () => {
        if (newAccount.name && newAccount.bank && newAccount.accountNumber && newAccount.balance) {
            const newId = accounts.length + 1;
            const formattedBalance = parseFloat(newAccount.balance).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            const gradients = [
                "linear-gradient(135deg, #6c63ff 0%, #4d46cc 100%)",
                "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)",
            ];
            const randomGradient = gradients[accounts.length % gradients.length];

            setAccounts([...accounts, {
                id: newId,
                name: newAccount.name,
                number: `•••• ${newAccount.accountNumber.slice(-4)}`,
                balance: formattedBalance,
                available: formattedBalance,
                type: newAccount.accountType,
                bank: newAccount.bank,
                gradient: randomGradient,
            }]);
            setNewAccount({ name: "", bank: "", accountNumber: "", accountType: "Checking", balance: "" });
            setShowAddAccount(false);
        }
    };

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

            {/* ── HERO SECTION (RESPONSIVE) ── */}
            <section style={{ paddingTop: 68, background: "#fff", paddingBottom: 0 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "clamp(40px, 10vw, 80px) 5% 0" }}>
                    <Reveal>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 48 }}>
                            <div style={{ flex: "1 1 300px" }}>
                                <div className="sec-label" style={{ color: "#6c63ff", marginBottom: 20 }}>Bank Accounts</div>
                                <h1 style={{ fontSize: "clamp(32px, 8vw, 66px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111", lineHeight: 1.1, marginBottom: 20 }}>
                                    Your accounts.<br /><span style={{ color: "#6c63ff" }}>One dashboard.</span>
                                </h1>
                                <p style={{ fontSize: "clamp(14px, 4vw, 17px)", color: "#666", maxWidth: 440, lineHeight: 1.65, marginBottom: 28 }}>
                                    Add and manage all your bank accounts in one place. Track balances, view transactions, and stay organized.
                                </p>
                                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                                    <button onClick={() => setShowAddAccount(true)} className="btn-teal" style={{ padding: "clamp(12px, 3vw, 15px) clamp(24px, 5vw, 36px)", fontSize: "clamp(14px, 3.5vw, 15px)" }}>+ Add Account</button>
                                </div>
                            </div>

                            <div style={{ flex: "0 0 auto", background: "#f8fafc", borderRadius: 24, border: "1px solid #eee", padding: "clamp(20px, 5vw, 32px) clamp(24px, 6vw, 40px)", textAlign: "right", minWidth: "clamp(200px, 50vw, 280px)" }}>
                                <div style={{ fontSize: "clamp(10px, 3vw, 11px)", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8 }}>Total Balance</div>
                                <div style={{ fontSize: "clamp(28px, 7vw, 44px)", fontWeight: 900, color: "#111", letterSpacing: "-0.02em", marginBottom: 6 }}>
                                    ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                                </div>
                                <div style={{ display: "flex", gap: 16, justifyContent: "flex-end", marginTop: 12 }}>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: "clamp(14px, 4vw, 16px)", fontWeight: 800, color: "#6c63ff" }}>{accounts.length}</div>
                                        <div style={{ fontSize: "clamp(9px, 2.5vw, 10px)", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase" }}>Accounts</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* ADD ACCOUNT MODAL (RESPONSIVE) */}
                    {showAddAccount && (
                        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
                            <div style={{ background: "#fff", borderRadius: 24, padding: "clamp(24px, 5vw, 32px)", maxWidth: 500, width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
                                <h3 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 800, marginBottom: 20 }}>Add Bank Account</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                    <input type="text" placeholder="Account Name" value={newAccount.name} onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })} style={{ padding: "clamp(10px, 3vw, 12px)", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }} />
                                    <input type="text" placeholder="Bank Name" value={newAccount.bank} onChange={(e) => setNewAccount({ ...newAccount, bank: e.target.value })} style={{ padding: "clamp(10px, 3vw, 12px)", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }} />
                                    <input type="text" placeholder="Account Number" value={newAccount.accountNumber} onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })} style={{ padding: "clamp(10px, 3vw, 12px)", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }} />
                                    <select value={newAccount.accountType} onChange={(e) => setNewAccount({ ...newAccount, accountType: e.target.value })} style={{ padding: "clamp(10px, 3vw, 12px)", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }}>
                                        <option value="Checking">Checking</option>
                                        <option value="Savings">Savings</option>
                                        <option value="Credit Card">Credit Card</option>
                                    </select>
                                    <input type="number" placeholder="Current Balance" value={newAccount.balance} onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })} style={{ padding: "clamp(10px, 3vw, 12px)", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14 }} />
                                    <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
                                        <button onClick={handleAddAccount} style={{ flex: 1, padding: "clamp(10px, 3vw, 12px)", background: "#6c63ff", color: "#fff", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Save Account</button>
                                        <button onClick={() => setShowAddAccount(false)} style={{ flex: 1, padding: "clamp(10px, 3vw, 12px)", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* BANK ACCOUNT CARDS (RESPONSIVE GRID) */}
                    <Reveal delay={0.1}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, paddingBottom: 0 }}>
                            {accounts.map((acc, i) => (
                                <div key={acc.id} onClick={() => setActiveAccount(i)} style={{ 
                                    borderRadius: 24, 
                                    padding: "clamp(20px, 5vw, 28px)", 
                                    background: acc.gradient, 
                                    cursor: "pointer", 
                                    position: "relative", 
                                    overflow: "hidden", 
                                    transition: "transform 0.2s, box-shadow 0.2s", 
                                    transform: activeAccount === i ? "translateY(-4px)" : "none", 
                                    boxShadow: activeAccount === i ? "0 20px 50px rgba(0,0,0,0.25)" : "0 8px 25px rgba(0,0,0,0.1)" 
                                }}>
                                    <div>
                                        <div style={{ marginBottom: 20 }}>
                                            <div style={{ fontSize: "clamp(10px, 3vw, 12px)", fontWeight: 700, color: "rgba(255,255,255,0.5)", marginBottom: 4, textTransform: "uppercase" }}>{acc.bank}</div>
                                            <div style={{ fontSize: "clamp(12px, 3.5vw, 14px)", fontWeight: 700, color: "#fff" }}>{acc.type}</div>
                                        </div>
                                        <div style={{ fontSize: "clamp(22px, 6vw, 26px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>${acc.balance}</div>
                                        <div style={{ fontSize: "clamp(10px, 3vw, 12px)", color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>Available: ${acc.available}</div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                                            <span style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{acc.number}</span>
                                            <span style={{ fontSize: "clamp(12px, 3.5vw, 13px)", fontWeight: 700, color: "#fff" }}>{acc.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* TRANSACTION HISTORY (RESPONSIVE) */}
            {active && (
                <section style={{ padding: "clamp(40px, 8vw, 60px) 5% clamp(60px, 10vw, 100px)", background: "#f8fafc" }}>
                    <Reveal>
                        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                            <div style={{ marginBottom: 28 }}>
                                <h2 style={{ fontSize: "clamp(20px, 5vw, 24px)", fontWeight: 800, color: "#111" }}>{active.name} · Transaction History</h2>
                                <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#94a3b8", marginTop: 4 }}>Recent activity</p>
                            </div>

                            <div style={{ overflowX: "auto" }}>
                                <div style={{ minWidth: 600, background: "#fff", borderRadius: 20, border: "1px solid #eee", overflow: "hidden" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.5fr 1.2fr", padding: "clamp(10px, 3vw, 13px) 16px", background: "#f8fafc", borderBottom: "1px solid #eee", fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 800, color: "#64748b", textTransform: "uppercase" }}>
                                        <span>Date</span><span>Description</span><span>Category</span><span style={{ textAlign: "right" }}>Amount</span>
                                    </div>

                                    {transactions.map((tx, i) => (
                                        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2.5fr 1.5fr 1.2fr", padding: "clamp(12px, 3.5vw, 16px) 16px", borderBottom: i === transactions.length - 1 ? "none" : "1px solid #f8f8f8", fontSize: "clamp(12px, 3.5vw, 13px)", alignItems: "center" }}>
                                            <span style={{ fontSize: "clamp(11px, 3vw, 12px)", color: "#94a3b8" }}>{tx.date}</span>
                                            <span style={{ fontWeight: 600, color: "#111" }}>{tx.desc}</span>
                                            <span>
                                                <span style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, background: "#f1f5f9", color: "#64748b", padding: "3px 10px", borderRadius: 100, display: "inline-block" }}>
                                                    {tx.category}
                                                </span>
                                            </span>
                                            <span style={{ textAlign: "right", fontWeight: 800, fontSize: "clamp(12px, 3.5vw, 14px)", color: tx.type === "credit" ? "#00c9a7" : "#111" }}>
                                                {tx.type === "credit" ? "+" : "-"}${tx.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>
            )}

            {/* FOOTER (RESPONSIVE) */}
            <footer style={{ background: "#fafafa", padding: "clamp(40px, 8vw, 72px) 5% clamp(24px, 5vw, 40px)", borderTop: "1px solid #eee" }}>
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