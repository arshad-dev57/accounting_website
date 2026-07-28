"use client";
import { useState, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { NAV_LINKS, FOOTER_LINKS } from "../Data";
import { Reveal, GLOBAL_STYLES } from "../Components";
import { CookieBanner } from "@/components/cookie-banner";

type ProductIconProps = {
    name: string;
    color: string;
};

function ProductIcon({ name, color }: ProductIconProps) {
    const commonProps = {
        width: 28,
        height: 28,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        "aria-hidden": true,
    };

    const paths: Record<string, ReactNode> = {
        finance: (
            <>
                <path d="M4 19V9" />
                <path d="M10 19V5" />
                <path d="M16 19v-7" />
                <path d="M22 19H2" />
                <path d="m4 7 5-4 5 4 5-4" />
            </>
        ),
        people: (
            <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </>
        ),
        inventory: (
            <>
                <path d="m21 8-9-5-9 5 9 5 9-5Z" />
                <path d="m3 8 9 5 9-5" />
                <path d="M3 8v8l9 5 9-5V8" />
                <path d="M12 13v8" />
            </>
        ),
        crm: (
            <>
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="m17 11 2 2 4-4" />
            </>
        ),
        supply: (
            <>
                <path d="M10 17h4V5H2v12h3" />
                <path d="M14 9h4l4 4v4h-3" />
                <circle cx="7.5" cy="17.5" r="2.5" />
                <circle cx="16.5" cy="17.5" r="2.5" />
            </>
        ),
        manufacturing: (
            <>
                <path d="M3 21V9l5 3V9l5 3V5l8 4v12H3Z" />
                <path d="M7 21v-4h4v4" />
                <path d="M17 13h.01M17 17h.01" />
            </>
        ),
        project: (
            <>
                <rect x="4" y="3" width="16" height="18" rx="2" />
                <path d="M9 3V1M15 3V1M8 8h8" />
                <path d="m8 13 2 2 4-4" />
            </>
        ),
    };

    return (
        <span
            style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color,
                background: `${color}12`,
                border: `1px solid ${color}20`,
            }}
        >
            <svg {...commonProps}>{paths[name] || paths.project}</svg>
        </span>
    );
}

const PRODUCT_PAGE_STYLES = `
    .products-center * { box-sizing: border-box; }

    .products-hero {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        padding: clamp(150px, 14vw, 190px) 5% clamp(78px, 9vw, 118px);
        background:
            radial-gradient(circle at 78% 25%, rgba(16,136,221,.28), transparent 30%),
            radial-gradient(circle at 15% 100%, rgba(20,91,180,.22), transparent 36%),
            linear-gradient(135deg, #020b27 0%, #03194b 52%, #042f69 100%);
    }

    .products-hero::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -2;
        opacity: .22;
        background-image:
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
        background-size: 52px 52px;
        mask-image: linear-gradient(to bottom, black, transparent 90%);
    }

    .products-hero::after {
        content: "";
        position: absolute;
        width: 520px;
        height: 520px;
        right: -180px;
        bottom: -250px;
        z-index: -1;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 50%;
        box-shadow:
            0 0 0 58px rgba(255,255,255,.025),
            0 0 0 116px rgba(255,255,255,.018),
            0 0 0 174px rgba(255,255,255,.012);
    }

    .products-hero-inner {
        width: min(1180px, 100%);
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 1.05fr) minmax(380px, .95fr);
        align-items: center;
        gap: clamp(50px, 8vw, 96px);
    }

    .products-hero-copy { max-width: 680px; }

    .products-kicker {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 22px;
        color: #8ecbff;
        font-size: 12px;
        line-height: 1;
        font-weight: 800;
        letter-spacing: .14em;
        text-transform: uppercase;
    }

    .products-kicker::before {
        content: "";
        width: 27px;
        height: 2px;
        border-radius: 10px;
        background: #1088dd;
        box-shadow: 0 0 18px rgba(16,136,221,.8);
    }

    .products-hero-title {
        margin: 0 0 24px;
        max-width: 760px;
        color: #fff;
        font-size: clamp(43px, 6vw, 76px);
        line-height: 1.02;
        font-weight: 850;
        letter-spacing: -.055em;
    }

    .products-hero-title span {
        color: #58b6ff;
        text-shadow: 0 10px 38px rgba(16,136,221,.22);
    }

    .products-hero-description {
        margin: 0;
        max-width: 625px;
        color: rgba(255,255,255,.72);
        font-size: clamp(16px, 2vw, 19px);
        line-height: 1.75;
    }

    .products-hero-actions {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 13px;
        margin-top: 34px;
    }

    .products-primary-button,
    .products-secondary-button,
    .products-card-link,
    .products-cta-button {
        text-decoration: none;
        transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease;
    }

    .products-primary-button,
    .products-secondary-button {
        min-height: 50px;
        padding: 0 24px;
        border-radius: 11px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 750;
    }

    .products-primary-button {
        color: #03163e;
        background: #fff;
        box-shadow: 0 15px 35px rgba(0,0,0,.2);
    }

    .products-secondary-button {
        color: #fff;
        border: 1px solid rgba(255,255,255,.22);
        background: rgba(255,255,255,.07);
        backdrop-filter: blur(10px);
    }

    .products-primary-button:hover,
    .products-secondary-button:hover,
    .products-cta-button:hover { transform: translateY(-3px); }

    .products-platform-visual {
        position: relative;
        min-height: 440px;
        display: grid;
        place-items: center;
    }

    .products-orbit {
        position: absolute;
        width: min(410px, 100%);
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid rgba(146,202,255,.18);
        box-shadow:
            inset 0 0 80px rgba(16,136,221,.07),
            0 0 60px rgba(16,136,221,.1);
    }

    .products-orbit::before,
    .products-orbit::after {
        content: "";
        position: absolute;
        inset: 13%;
        border-radius: 50%;
        border: 1px dashed rgba(146,202,255,.17);
    }

    .products-orbit::after {
        inset: 29%;
        border-style: solid;
        background: radial-gradient(circle, rgba(16,136,221,.18), rgba(16,136,221,.03) 68%, transparent 70%);
    }

    .products-core {
        position: relative;
        z-index: 2;
        width: 142px;
        height: 142px;
        border-radius: 34px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;
        color: #fff;
        background: linear-gradient(145deg, rgba(255,255,255,.18), rgba(255,255,255,.06));
        border: 1px solid rgba(255,255,255,.24);
        backdrop-filter: blur(20px);
        box-shadow: 0 24px 65px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.2);
    }

    .products-core-mark {
        width: 48px;
        height: 48px;
        border-radius: 15px;
        display: grid;
        place-items: center;
        background: linear-gradient(135deg, #31a8ff, #0b67d3);
        box-shadow: 0 13px 30px rgba(16,136,221,.4);
        font-size: 17px;
        font-weight: 900;
        letter-spacing: -.06em;
    }

    .products-core strong { font-size: 15px; letter-spacing: -.02em; }
    .products-core small { color: rgba(255,255,255,.58); font-size: 10px; text-transform: uppercase; letter-spacing: .14em; }

    .products-floating-module {
        position: absolute;
        z-index: 3;
        width: 148px;
        padding: 13px 15px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        gap: 11px;
        color: #fff;
        background: rgba(3,20,56,.74);
        border: 1px solid rgba(255,255,255,.14);
        backdrop-filter: blur(14px);
        box-shadow: 0 16px 45px rgba(0,0,0,.25);
        animation: productFloat 5s ease-in-out infinite;
    }

    .products-floating-module:nth-of-type(2) { top: 11%; left: 1%; }
    .products-floating-module:nth-of-type(3) { top: 18%; right: -2%; animation-delay: -.8s; }
    .products-floating-module:nth-of-type(4) { bottom: 13%; left: -3%; animation-delay: -1.6s; }
    .products-floating-module:nth-of-type(5) { bottom: 8%; right: 2%; animation-delay: -2.4s; }

    .products-floating-dot {
        width: 34px;
        height: 34px;
        flex: 0 0 34px;
        border-radius: 11px;
        display: grid;
        place-items: center;
        color: #fff;
        background: rgba(16,136,221,.2);
        border: 1px solid rgba(88,182,255,.28);
        font-size: 13px;
        font-weight: 850;
    }

    .products-floating-module strong { display: block; font-size: 11px; line-height: 1.25; }
    .products-floating-module span { display: block; margin-top: 3px; color: rgba(255,255,255,.52); font-size: 9px; }

    @keyframes productFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-9px); }
    }

    .products-suite {
        padding: clamp(82px, 10vw, 126px) 5%;
        background: #fff;
    }

    .products-suite-inner {
        width: min(1180px, 100%);
        margin: 0 auto;
    }

    .products-section-header {
        max-width: 760px;
        margin: 0 auto clamp(44px, 6vw, 66px);
        text-align: center;
    }

    .products-section-header h2 {
        margin: 0 0 17px;
        color: #07162f;
        font-size: clamp(34px, 4.7vw, 54px);
        line-height: 1.08;
        letter-spacing: -.045em;
        font-weight: 850;
    }

    .products-section-header p {
        margin: 0 auto;
        max-width: 670px;
        color: #68758a;
        font-size: 17px;
        line-height: 1.72;
    }

    .products-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
    }

    .product-card {
        position: relative;
        min-height: 100%;
        padding: 28px;
        overflow: hidden;
        border: 1px solid #e7edf5;
        border-radius: 20px;
        background: linear-gradient(180deg, #fff 0%, #fbfdff 100%);
        box-shadow: 0 12px 35px rgba(9,34,70,.055);
        transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease;
    }

    .product-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: var(--product-color);
        transform: scaleX(.36);
        transform-origin: left;
        transition: transform .3s ease;
    }

    .product-card:hover {
        transform: translateY(-8px);
        border-color: color-mix(in srgb, var(--product-color) 28%, #e7edf5);
        box-shadow: 0 24px 60px rgba(9,34,70,.12);
    }

    .product-card:hover::before { transform: scaleX(1); }

    .product-card-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 20px;
        margin-bottom: 24px;
    }

    .product-card-number {
        color: #b6c0cf;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .14em;
    }

    .product-card h3 {
        margin: 0 0 13px;
        color: #0b1b35;
        font-size: 22px;
        line-height: 1.2;
        font-weight: 820;
        letter-spacing: -.025em;
    }

    .product-card-description {
        min-height: 79px;
        margin: 0 0 23px;
        color: #68758a;
        font-size: 14px;
        line-height: 1.7;
    }

    .product-feature-list {
        list-style: none;
        padding: 20px 0 0;
        margin: 0 0 25px;
        border-top: 1px solid #edf1f6;
    }

    .product-feature-list li {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-bottom: 10px;
        color: #344258;
        font-size: 13px;
        line-height: 1.45;
    }

    .product-feature-list li:last-child { margin-bottom: 0; }

    .product-check {
        width: 18px;
        height: 18px;
        flex: 0 0 18px;
        margin-top: 1px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: var(--product-color);
        background: color-mix(in srgb, var(--product-color) 10%, #fff);
        font-size: 10px;
        font-weight: 900;
    }

    .products-card-link {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        color: var(--product-color);
        font-size: 13px;
        font-weight: 800;
    }

    .product-card:hover .products-card-link { gap: 13px; }

    .products-connected {
        padding: 0 5% clamp(86px, 10vw, 126px);
        background: #fff;
    }

    .products-connected-inner {
        width: min(1180px, 100%);
        margin: 0 auto;
        padding: clamp(38px, 6vw, 64px);
        border-radius: 28px;
        display: grid;
        grid-template-columns: .9fr 1.1fr;
        align-items: center;
        gap: clamp(35px, 7vw, 80px);
        overflow: hidden;
        background:
            radial-gradient(circle at 88% 15%, rgba(43,149,231,.16), transparent 35%),
            linear-gradient(135deg, #f1f7ff 0%, #f9fbff 55%, #edf6ff 100%);
        border: 1px solid #ddeaf8;
    }

    .products-connected-copy h2 {
        margin: 0 0 16px;
        color: #07162f;
        font-size: clamp(31px, 4vw, 46px);
        line-height: 1.08;
        letter-spacing: -.04em;
        font-weight: 850;
    }

    .products-connected-copy p {
        margin: 0;
        color: #66758b;
        font-size: 15px;
        line-height: 1.75;
    }

    .products-process {
        position: relative;
        display: grid;
        gap: 14px;
    }

    .products-process::before {
        content: "";
        position: absolute;
        top: 33px;
        bottom: 33px;
        left: 25px;
        width: 1px;
        background: linear-gradient(#1088dd, rgba(16,136,221,.12));
    }

    .products-process-item {
        position: relative;
        z-index: 1;
        padding: 18px 20px;
        display: grid;
        grid-template-columns: 50px 1fr;
        gap: 16px;
        align-items: center;
        border-radius: 16px;
        background: rgba(255,255,255,.84);
        border: 1px solid rgba(193,214,237,.82);
        box-shadow: 0 11px 30px rgba(42,79,119,.07);
    }

    .products-process-number {
        width: 50px;
        height: 50px;
        border-radius: 15px;
        display: grid;
        place-items: center;
        color: #fff;
        background: linear-gradient(135deg, #118bdf, #075bb9);
        box-shadow: 0 11px 24px rgba(16,136,221,.25);
        font-size: 13px;
        font-weight: 850;
    }

    .products-process-item strong {
        display: block;
        margin-bottom: 4px;
        color: #14233a;
        font-size: 15px;
    }

    .products-process-item span {
        color: #788599;
        font-size: 12px;
        line-height: 1.5;
    }

    .products-cta {
        padding: 0 5% clamp(82px, 9vw, 112px);
        background: #fff;
    }

    .products-cta-inner {
        position: relative;
        width: min(1180px, 100%);
        margin: 0 auto;
        padding: clamp(42px, 6vw, 67px);
        overflow: hidden;
        border-radius: 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 35px;
        background:
            radial-gradient(circle at 85% 40%, rgba(57,170,255,.28), transparent 28%),
            linear-gradient(135deg, #021039 0%, #06336d 100%);
        box-shadow: 0 28px 70px rgba(2,17,60,.18);
    }

    .products-cta-inner::after {
        content: "";
        position: absolute;
        width: 280px;
        height: 280px;
        right: -90px;
        top: -130px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.12);
        box-shadow: 0 0 0 45px rgba(255,255,255,.035), 0 0 0 90px rgba(255,255,255,.02);
    }

    .products-cta-copy { position: relative; z-index: 1; max-width: 690px; }

    .products-cta-copy h2 {
        margin: 0 0 13px;
        color: #fff;
        font-size: clamp(31px, 4.2vw, 48px);
        line-height: 1.08;
        letter-spacing: -.045em;
        font-weight: 850;
    }

    .products-cta-copy p {
        margin: 0;
        color: rgba(255,255,255,.68);
        font-size: 15px;
        line-height: 1.7;
    }

    .products-cta-actions {
        position: relative;
        z-index: 1;
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 0 0 auto;
    }

    .products-cta-button {
        min-height: 51px;
        padding: 0 23px;
        border-radius: 11px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        color: #05204b;
        background: #fff;
        box-shadow: 0 14px 34px rgba(0,0,0,.22);
        font-size: 14px;
        font-weight: 800;
    }

    .products-cta-button.secondary {
        color: #fff;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.22);
        box-shadow: none;
    }

    @media (max-width: 1020px) {
        .products-hero-inner { grid-template-columns: 1fr; }
        .products-hero-copy { max-width: 760px; text-align: center; margin: 0 auto; }
        .products-hero-actions { justify-content: center; }
        .products-platform-visual { min-height: 390px; width: min(520px, 100%); margin: 0 auto; }
        .products-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .products-connected-inner { grid-template-columns: 1fr; }
        .products-cta-inner { align-items: flex-start; flex-direction: column; }
    }

    @media (max-width: 680px) {
        .products-hero { padding-top: 135px; }
        .products-hero-title { font-size: clamp(39px, 12vw, 56px); }
        .products-hero-actions,
        .products-cta-actions { width: 100%; flex-direction: column; align-items: stretch; }
        .products-primary-button,
        .products-secondary-button,
        .products-cta-button { width: 100%; }
        .products-platform-visual { min-height: 310px; transform: scale(.88); margin-top: -15px; margin-bottom: -25px; }
        .products-floating-module { width: 132px; padding: 11px; }
        .products-grid { grid-template-columns: 1fr; }
        .product-card { padding: 24px; }
        .product-card-description { min-height: auto; }
        .products-connected-inner,
        .products-cta-inner { border-radius: 22px; padding: 31px 23px; }
        .products-process-item { grid-template-columns: 44px 1fr; padding: 15px; }
        .products-process-number { width: 44px; height: 44px; border-radius: 13px; }
        .products-process::before { left: 22px; }
    }

    @media (prefers-reduced-motion: reduce) {
        .products-floating-module { animation: none; }
        .product-card,
        .products-primary-button,
        .products-secondary-button,
        .products-card-link,
        .products-cta-button { transition: none; }
    }
`;

export default function ProductsPage() {
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

    const products = [
        {
            id: "financial-management",
            title: "Financial Management",
            description: "Complete accounting, reporting, budgeting, and financial control in one connected workspace.",
            features: [
                "General Ledger & Chart of Accounts",
                "Automated Bank Reconciliation",
                "P&L & Balance Sheet Reports",
                "Multi-Currency Support",
                "Budget Planning & Forecasting",
                "Tax Compliance & Filing"
            ],
            icon: "finance",
            color: "#1088dd"
        },
        {
            id: "hr-payroll",
            title: "HR & Payroll",
            description: "Simplify employee management, payroll, attendance, benefits, and workforce compliance.",
            features: [
                "Employee Onboarding & Profiles",
                "Automated Payroll Processing",
                "Benefits Administration",
                "Time & Attendance Tracking",
                "Performance Management",
                "Compliance & Reporting"
            ],
            icon: "people",
            color: "#1267c4"
        },
        {
            id: "inventory",
            title: "Inventory Management",
            description: "Maintain accurate stock visibility across warehouses, locations, products, and reorder cycles.",
            features: [
                "Real-Time Stock Tracking",
                "Warehouse Management",
                "Automated Reorder Points",
                "Barcode & QR Scanning",
                "Multi-Location Support",
                "Inventory Valuation"
            ],
            icon: "inventory",
            color: "#5945c7"
        },
        {
            id: "crm",
            title: "CRM & Sales",
            description: "Give sales teams a complete customer view and a faster path from qualified lead to closed deal.",
            features: [
                "Lead & Opportunity Management",
                "Customer 360° View",
                "Sales Pipeline Tracking",
                "Quote & Invoice Generation",
                "Email Integration",
                "Sales Analytics"
            ],
            icon: "crm",
            color: "#139a70"
        },
        {
            id: "supply-chain",
            title: "Supply Chain",
            description: "Coordinate purchasing, suppliers, orders, logistics, and cost control from one operational hub.",
            features: [
                "Procurement Management",
                "Vendor Portal",
                "Purchase Orders",
                "Logistics Tracking",
                "Supplier Performance",
                "Cost Analysis"
            ],
            icon: "supply",
            color: "#e77b17"
        },
        {
            id: "manufacturing",
            title: "Manufacturing",
            description: "Plan production, control shop-floor activity, and maintain consistent quality at every stage.",
            features: [
                "Production Planning",
                "Bill of Materials",
                "Shop Floor Control",
                "Quality Management",
                "Work Order Management",
                "Capacity Planning"
            ],
            icon: "manufacturing",
            color: "#db4a5a"
        },
        {
            id: "project-management",
            title: "Project Management",
            description: "Align tasks, resources, milestones, and time tracking so teams can deliver with confidence.",
            features: [
                "Project Planning & Scheduling",
                "Resource Allocation",
                "Task Management",
                "Time Tracking",
                "Milestone Tracking",
                "Project Analytics"
            ],
            icon: "project",
            color: "#7351df"
        }
    ];

    return (
        <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "#fff", color: "#111", overflowX: "hidden" }}>
            <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />
            <style dangerouslySetInnerHTML={{ __html: PRODUCT_PAGE_STYLES }} />

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
            <main className="products-center">
                <section className="products-hero">
                    <div className="products-hero-inner">
                        <Reveal>
                            <div className="products-hero-copy">
                                <div className="products-kicker">Complete ERP Platform</div>
                                <h1 className="products-hero-title">
                                    One connected system for your <span>entire business.</span>
                                </h1>
                                <p className="products-hero-description">
                                    Bring finance, people, inventory, sales, supply chain, manufacturing, and projects together in one intelligent platform built for clearer decisions and smoother operations.
                                </p>
                                <div className="products-hero-actions">
                                    <a className="products-primary-button" href="#product-suite">
                                        Explore Products
                                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </a>
                                    <Link className="products-secondary-button" href="/contact">
                                        Talk to an Expert
                                    </Link>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal>
                            <div className="products-platform-visual" aria-hidden="true">
                                <div className="products-orbit" />
                                <div className="products-core">
                                    <div className="products-core-mark">BT</div>
                                    <strong>BisonTechs ERP</strong>
                                    <small>Connected Core</small>
                                </div>

                                <div className="products-floating-module">
                                    <div className="products-floating-dot">FI</div>
                                    <div><strong>Financials</strong><span>Control & reporting</span></div>
                                </div>
                                <div className="products-floating-module">
                                    <div className="products-floating-dot">HR</div>
                                    <div><strong>People</strong><span>Payroll & workforce</span></div>
                                </div>
                                <div className="products-floating-module">
                                    <div className="products-floating-dot">IN</div>
                                    <div><strong>Inventory</strong><span>Stock & warehouses</span></div>
                                </div>
                                <div className="products-floating-module">
                                    <div className="products-floating-dot">CRM</div>
                                    <div><strong>Sales</strong><span>Leads & customers</span></div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── PRODUCTS SECTION ── */}
                <section className="products-suite" id="product-suite">
                    <div className="products-suite-inner">
                        <Reveal>
                            <div className="products-section-header">
                                <h2>Everything your operation needs, working together.</h2>
                                <p>
                                    Choose the modules your business needs today and keep every department aligned through one consistent ERP experience.
                                </p>
                            </div>
                        </Reveal>

                        <div className="products-grid">
                            {products.map((product, index) => (
                                <Reveal key={product.id}>
                                    <article
                                        id={product.id}
                                        className="product-card"
                                        style={{ "--product-color": product.color } as CSSProperties}
                                    >
                                        <div className="product-card-top">
                                            <ProductIcon name={product.icon} color={product.color} />
                                            <span className="product-card-number">0{index + 1}</span>
                                        </div>

                                        <h3>{product.title}</h3>
                                        <p className="product-card-description">{product.description}</p>

                                        <ul className="product-feature-list">
                                            {product.features.map((feature) => (
                                                <li key={feature}>
                                                    <span className="product-check">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <a className="products-card-link" href={`#${product.id}`} aria-label={`Learn more about ${product.title}`}>
                                            Learn more
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </a>
                                    </article>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── CONNECTED PLATFORM SECTION ── */}
                <section className="products-connected">
                    <Reveal>
                        <div className="products-connected-inner">
                            <div className="products-connected-copy">
                                <div className="products-kicker" style={{ color: "#0874ca" }}>Built to Work as One</div>
                                <h2>Replace disconnected tools with a single operational flow.</h2>
                                <p>
                                    BisonTechs helps teams share the same business information, automate repeatable work, and act on real-time insight without moving between separate systems.
                                </p>
                            </div>

                            <div className="products-process">
                                <div className="products-process-item">
                                    <div className="products-process-number">01</div>
                                    <div><strong>Connect every department</strong><span>Keep finance, operations, sales, and workforce data aligned.</span></div>
                                </div>
                                <div className="products-process-item">
                                    <div className="products-process-number">02</div>
                                    <div><strong>Automate everyday workflows</strong><span>Reduce repetitive administration and improve process consistency.</span></div>
                                </div>
                                <div className="products-process-item">
                                    <div className="products-process-number">03</div>
                                    <div><strong>Make informed decisions</strong><span>Use live operational visibility to move with greater confidence.</span></div>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </section>

                {/* ── CTA SECTION ── */}
                <section className="products-cta">
                    <Reveal>
                        <div className="products-cta-inner">
                            <div className="products-cta-copy">
                                <h2>Build a smarter foundation for your business.</h2>
                                <p>
                                    Explore how BisonTechs ERP can bring your teams, workflows, and business data into one connected environment.
                                </p>
                            </div>
                            <div className="products-cta-actions">
                                <Link className="products-cta-button" href="/contact">
                                    Contact Sales
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </Link>
                                <a className="products-cta-button secondary" href="#product-suite">View Products</a>
                            </div>
                        </div>
                    </Reveal>
                </section>
            </main>

            {/* ── FOOTER ── */}
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
                            <div style={{ marginTop: 22 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, justifyContent: "center" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                        <path d="M22 6l-10 7L2 6"/>
                                    </svg>
                                    <a href="mailto:info@bisonstechs.com" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#aaa", textDecoration: "none" }}>info@bisonstechs.com</a>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <a href="tel:+17867618327" style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "#aaa", textDecoration: "none" }}>+1 (786)-761-8327</a>
                                </div>
                            </div>
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
                    <div style={{ borderTop: "1px solid #ebebeb", paddingTop: 28, textAlign: "center" }}>
                        <p style={{ fontSize: "clamp(11px, 3vw, 13px)", color: "#ccc" }}>© 2026 BisonTechs, Inc. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
