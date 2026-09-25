"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

import { COMPANY_CONFIG, COMPANY_OPTIONS, DEFAULT_COMPANY_ID } from "../lib/companyConfig";

import {
  FaWhatsapp,
  FaIdCard,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaEye,
  FaLocationDot,
  FaChartColumn,
  FaUserTie,
  FaGear,
  FaPeopleGroup,
  FaBriefcase,
  FaDownload,
  FaArrowRight,
  FaHeart,
  FaPhone,
  FaGlobe,
  FaWandMagicSparkles,
  FaFilePdf,
  FaShareNodes,
  FaLink,
  FaIdBadge,
  FaGem,
  FaCheck,
} from "react-icons/fa6";

import CardFront from "./CardFront";
import CardBack from "./CardBack";
import WhatsAppDPGenerator from "./WhatsAppDPGenerator";
import EmailSignatureGenerator from "./EmailSignatureGenerator";
import { defaultCardData } from "../lib/defaultCardData";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const DEFAULT_THEME = {
  primary: "#00275E",
  secondary: "#159B24",
  accent: "#FA7800",
  primaryLight: "#EAF1F8",
  secondaryLight: "#EAF7EC",
  accentLight: "#FFF3E8",
  background: "#FAFAFA",
  surface: "#FFFFFF",
  text: "#00275E",
  muted: "#64748B",
  border: "#D9E2EC",
  gradient: "linear-gradient(135deg, #00275E, #159B24)",
};

const DEPTS = [
  { id: "Sales", icon: FaChartColumn },
  { id: "Admin", icon: FaUserTie },
  { id: "Operations", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
];

const STEPS = [
  {
    id: "s-org",
    title: "Organization",
    sub: "Select company & department",
    icon: FaBuilding,
  },
  {
    id: "s-info",
    title: "Personal Information",
    sub: "Add your details",
    icon: FaUser,
  },
  {
    id: "s-photo",
    title: "Photo & Appearance",
    sub: "Upload photo & choose theme",
    icon: FaEye,
  },
  {
    id: "s-out",
    title: "Preview & Download",
    sub: "View and get your profile",
    icon: FaEye,
  },
];

const CARD_STEPS = [
  { id: "c-org", title: "Organization", sub: "Select company & department", icon: FaBuilding },
  { id: "c-info", title: "Personal Information", sub: "Add your details", icon: FaUser },
  { id: "c-photo", title: "Photo & Appearance", sub: "Choose card appearance", icon: FaEye },
  { id: "c-out", title: "Preview & Download", sub: "View and get your card", icon: FaEye },
];

const CARD_START = {
  dept: "Sales",
  name: "",
  designation: "",
  phone: "",
  email: "",
  website: "",
  address: "",
};

const CARD_KEY = "aarambh:studio:card:v3";

const CARD_SIZE = {
  landscape: [1050, 600],
  portrait: [1080, 1920],
};

const enc = (o) => encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(o))));
const dec = (s) => JSON.parse(decodeURIComponent(atob(decodeURIComponent(s))));

function Swoosh({ className = "", flip = false, theme = DEFAULT_THEME }) {
  const T = theme || DEFAULT_THEME;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      className={`pointer-events-none absolute ${className}`}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    ></svg>
  );
}

function CardSection({ id, no, title, sub, icon: Icon, right, children, theme = DEFAULT_THEME }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: T.border,
        background: T.surface,
      }}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: T.gradient,
          }}
        >
          <Icon size={20} />
        </span>

        <div className="flex-1">
          <h2
            className="text-lg font-extrabold"
            style={{
              color: T.primary,
            }}
          >
            {no}. {title}
          </h2>

          <p
            className="text-xs"
            style={{
              color: T.muted,
            }}
          >
            {sub}
          </p>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function CardField({ label, optional, icon: Icon, value, onChange, placeholder, type = "text", theme = DEFAULT_THEME }) {
  const T = theme || DEFAULT_THEME;

  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-bold"
        style={{
          color: T.primary,
        }}
      >
        {label}{" "}
        {optional && (
          <span
            className="font-normal"
            style={{
              color: T.muted,
            }}
          >
            (Optional)
          </span>
        )}
      </span>

      <span
        className="flex items-center gap-3 rounded-md border bg-white px-3.5 py-3"
        style={{
          borderColor: T.border,
        }}
      >
        <Icon size={14} color={T.primary} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none"
        />
      </span>
    </label>
  );
}

function Choice({ on, onClick, icon: I, children, theme = DEFAULT_THEME }) {
  const T = theme || DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-4 text-xs font-semibold transition"
      style={
        on
          ? {
              background: T.gradient,
              borderColor: T.primary,
              color: "#fff",
            }
          : {
              background: T.surface,
              borderColor: T.border,
              color: T.primary,
            }
      }
    >
      {on && (
        <span
          className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-white"
          style={{
            background: T.accent,
          }}
        >
          <FaCheck size={9} />
        </span>
      )}
      <I size={20} />
      {children}
    </button>
  );
}

function BusinessCardStudio({ company, profile, theme }) {
  const T = theme || company?.theme || DEFAULT_THEME;
  const companyData = company?.data || {};
  const [c, setC] = useState(CARD_START);
  const setField = (k, v) =>
    setC((p) => ({
      ...p,
      [k]: v,
    }));

  const [orientation, setOrientation] = useState("landscape");
  const [side, setSide] = useState("front");
  const [active, setActive] = useState("c-org");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [W, H] = CARD_SIZE[orientation];
  const cardData = useMemo(
    () => ({
      ...defaultCardData,
      company: company?.fullName || profile?.company || defaultCardData.company,
      logo: company?.logo || defaultCardData.logo,
      website: companyData.website || c.website || defaultCardData.website,
      location: companyData.address || c.address || defaultCardData.location,
      name: c.name,
      title: c.designation,
      phone: c.phone,
      email: c.email,
      department: c.dept,
    }),
    [c, company, companyData, profile],
  );

  useEffect(() => {
    setC((previous) => ({
      ...previous,
      website: companyData.website || "",
      address: companyData.address || "",
    }));
  }, [company?.id, companyData.website, companyData.address]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CARD_KEY);

      if (saved) {
        setC((p) => ({
          ...p,
          ...JSON.parse(saved),
        }));
      }
    } catch {}

    try {
      const q = new URLSearchParams(window.location.search).get("card");

      if (q) {
        setC((p) => ({
          ...p,
          ...dec(q),
        }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CARD_KEY, JSON.stringify(c));
    } catch {}
  }, [c]);

  useEffect(() => {
    const els = CARD_STEPS.map((s) => document.getElementById(s.id)).filter(Boolean);

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) {
          setActive(hit.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    els.forEach((e) => io.observe(e));

    return () => io.disconnect();
  }, []);

  const done = [true, !!c.name && !!c.designation, true, !!(c.phone || c.email)];
  const goto = (id) => {
    setActive(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const flash = (m) => {
    setNote(m);
    setTimeout(() => setNote(""), 2200);
  };

  const snap = async (el) => {
    if (!el) {
      throw new Error("Card element not found");
    }
    const { toPng } = await import("html-to-image");
    return toPng(el, {
      pixelRatio: 2,
      cacheBust: true,

      style: {
        transform: "none",
        backfaceVisibility: "visible",
        WebkitBackfaceVisibility: "visible",
      },
    });
  };

  const fileBase = (c.name || "business-card").trim().replace(/\s+/g, "-");
  const downloadPNG = async () => {
    setBusy(true);

    try {
      const el = side === "front" ? document.querySelector("[data-card-front-export]") : document.querySelector("[data-card-back-export]");
      const url = await snap(el);
      const a = document.createElement("a");

      a.download = `${fileBase}-${side}.png`;
      a.href = url;
      a.click();
    } catch {
      flash("Could not create PNG");
    }
    setBusy(false);
  };

  const downloadPDF = async () => {
    setBusy(true);

    try {
      const { jsPDF } = await import("jspdf");

      const frontEl = document.querySelector("[data-card-front-export]");

      const backEl = document.querySelector("[data-card-back-export]");

      if (!frontEl || !backEl) {
        throw new Error("Card export elements not found");
      }

      await new Promise((resolve) => requestAnimationFrame(() => resolve()));

      const [front, back] = await Promise.all([snap(frontEl), snap(backEl)]);

      const pdf = new jsPDF({
        orientation: W > H ? "landscape" : "portrait",
        unit: "px",
        format: [W, H],
      });

      pdf.addImage(front, "PNG", 0, 0, W, H);

      pdf.addPage([W, H], W > H ? "landscape" : "portrait");

      pdf.addImage(back, "PNG", 0, 0, W, H);

      pdf.save(`${fileBase}.pdf`);

      flash("PDF downloaded");
    } catch (error) {
      console.error("PDF export failed:", error);
      flash("Could not create PDF");
    } finally {
      setBusy(false);
    }
  };

  const shareLink = () => `${window.location.origin}${window.location.pathname}?card=${enc(c)}`;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink());
      flash("Link copied");
    } catch {
      flash("Copy blocked by browser");
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${c.name || "My"} — Digital Business Card`,
          url: shareLink(),
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  const actions = [
    {
      label: "Download PNG",
      icon: FaDownload,
      fn: downloadPNG,
    },
    {
      label: "Download PDF",
      icon: FaFilePdf,
      fn: downloadPDF,
    },
    {
      label: "Share",
      icon: FaShareNodes,
      fn: share,
    },
    {
      label: "Copy Link",
      icon: FaLink,
      fn: copyLink,
    },
  ];

  return (
    <>
      <aside
        className="sticky top-20 hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
        style={{
          background: `linear-gradient(180deg, ${T.primary}, ${T.primary})`,
        }}
      >
        <div className="p-4 pt-6">
          <div className="mb-5 border-b border-white/10 px-2 pb-5 text-white">
            <p className="text-sm opacity-90">Create Your</p>
            <p className="text-xl font-extrabold">Digital Business Card</p>
            <p className="mt-1 text-xs leading-snug text-white/65">Build your identity. Share your profile professionally.</p>
          </div>

          <ol className="space-y-2.5">
            {CARD_STEPS.map((s, i) => {
              const on = active === s.id;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => goto(s.id)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-white transition hover:bg-white/10"
                    style={
                      on
                        ? {
                            background: `${T.secondary}55`,
                            border: `1px solid ${T.secondary}`,
                          }
                        : {
                            border: "1px solid transparent",
                          }
                    }
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                      style={{
                        background: on ? T.accent : done[i] && i ? T.secondary : "rgba(255,255,255,.22)",
                      }}
                    >
                      {done[i] && i && !on ? <FaCheck size={12} /> : i + 1}
                    </span>
                    <s.icon size={20} className="shrink-0" />
                    <span>
                      <span className="block text-[13px] font-bold leading-tight">{s.title}</span>
                      <span className="block text-[11px] leading-tight text-white/65">{s.sub}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <Swoosh className="-bottom-2 -left-4 h-36 w-72" theme={T} />
      </aside>

      <main className="grid min-w-0 flex-1 gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5">
        <div className="space-y-5">
          <CardSection
            id="c-org"
            no="1"
            title="Organization"
            sub="Choose your company and department to get started."
            icon={FaBuilding}
            theme={T}
            right={
              <div className="hidden gap-1.5 sm:flex">
                {done.map((d, i) => (
                  <span
                    key={i}
                    className="h-1 w-8 rounded"
                    style={{
                      background: d ? T.secondary : T.border,
                    }}
                  />
                ))}
              </div>
            }
          >
            <p
              className="mb-2 flex items-center gap-2 text-xs font-bold"
              style={{
                color: T.primary,
              }}
            >
              <FaBuilding />
              Department Type
            </p>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DEPTS.map(({ id, icon }) => (
                <Choice key={id} on={c.dept === id} onClick={() => setField("dept", id)} icon={icon} theme={T}>
                  {id}
                </Choice>
              ))}
            </div>

            <div
              className="mt-5 rounded-md border p-4"
              style={{
                borderColor: T.border,
                background: T.primaryLight,
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={company?.logo || "/aarambh.png"}
                  alt={company?.fullName || "Company"}
                  className="h-10 w-auto max-w-[170px] object-contain"
                />

                <div className="min-w-0">
                  <p
                    className="text-[11px] font-semibold"
                    style={{
                      color: T.muted,
                    }}
                  >
                    Selected Company
                  </p>

                  <p
                    className="truncate text-sm font-extrabold"
                    style={{
                      color: T.primary,
                    }}
                  >
                    {company?.fullName || "AarambhGrow Group of Companies"}
                  </p>
                </div>
              </div>
            </div>
          </CardSection>

          <CardSection id="c-info" no="2" title="Personal Information" sub="Enter your details" icon={FaUser} theme={T}>
            <div className="grid gap-4 sm:grid-cols-2">
              <CardField
                label="Full Name"
                icon={FaUser}
                value={c.name}
                onChange={(v) => setField("name", v)}
                placeholder="Your Name"
                theme={T}
              />

              <CardField
                label="Designation"
                icon={FaBriefcase}
                value={c.designation}
                onChange={(v) => setField("designation", v)}
                placeholder="Your Designation"
                theme={T}
              />

              <CardField
                label="Phone Number"
                icon={FaPhone}
                type="tel"
                value={c.phone}
                onChange={(v) => setField("phone", v)}
                placeholder="+91 98765 43210"
                theme={T}
              />

              <CardField
                label="Email Address"
                icon={FaEnvelope}
                type="email"
                value={c.email}
                onChange={(v) => setField("email", v)}
                placeholder="you@domain.com"
                theme={T}
              />

              <CardField
                label="Website"
                optional
                icon={FaGlobe}
                value={c.website}
                onChange={(v) => setField("website", v)}
                placeholder="www.yourwebsite.com"
                theme={T}
              />

              <CardField
                label="Address"
                optional
                icon={FaLocationDot}
                value={c.address}
                onChange={(v) => setField("address", v)}
                placeholder="Your Address"
                theme={T}
              />
            </div>
          </CardSection>

          <CardSection id="c-photo" no="3" title="Photo & Appearance" sub="Choose your card appearance" icon={FaEye} theme={T}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-bold" style={{ color: T.primary }}>
                  Card Orientation
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Choice on={orientation === "landscape"} onClick={() => setOrientation("landscape")} icon={FaIdCard} theme={T}>
                    Landscape
                  </Choice>
                  <Choice on={orientation === "portrait"} onClick={() => setOrientation("portrait")} icon={FaIdBadge} theme={T}>
                    Portrait
                  </Choice>
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-bold" style={{ color: T.primary }}>
                  Card Side
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Choice on={side === "front"} onClick={() => setSide("front")} icon={FaIdCard} theme={T}>
                    Front
                  </Choice>
                  <Choice on={side === "back"} onClick={() => setSide("back")} icon={FaIdBadge} theme={T}>
                    Back
                  </Choice>
                </div>
              </div>
            </div>
          </CardSection>

          <button
            type="button"
            onClick={() => goto("c-out")}
            className="inline-flex w-full items-center justify-center gap-3 rounded-md py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            style={{
              background: T.gradient,
            }}
          >
            <FaWandMagicSparkles size={15} />
            Generate Preview
            <FaArrowRight size={14} />
          </button>

          <p
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px]"
            style={{
              color: T.muted,
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <FaCheck color={T.accent} size={10} />
              High-resolution PNG &amp; PDF
            </span>

            <span className="inline-flex items-center gap-1.5">
              <FaCheck color={T.secondary} size={10} />
              Company Certified
            </span>
          </p>
        </div>

        <div className="space-y-5">
          <section
            id="c-out"
            className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-md"
                  style={{
                    color: T.primary,
                  }}
                >
                  <FaEye size={22} />
                </span>

                <div>
                  <h2
                    className="text-lg font-extrabold"
                    style={{
                      color: T.primary,
                    }}
                  >
                    Live Preview
                  </h2>

                  <p
                    className="text-xs"
                    style={{
                      color: T.muted,
                    }}
                  >
                    Your profile will appear like this
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold"
                style={{
                  background: T.secondaryLight,
                  color: T.secondary,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: T.accent,
                  }}
                />
                REAL-TIME
              </span>
            </div>

            <div
              className="mx-auto w-full"
              style={{
                perspective: 1400,
                maxWidth: orientation === "portrait" ? 300 : "100%",
              }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: `${W} / ${H}`,
                  transformStyle: "preserve-3d",
                }}
              >
                <CardFront data={cardData} orientation={orientation} company={company} theme={T} />
                <CardBack data={cardData} orientation={orientation} company={company} theme={T} />
              </div>
            </div>
          </section>

          <section
            className="rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <div
              className="flex items-center gap-2 border-b pb-3 text-sm font-extrabold"
              style={{
                color: T.primary,
                borderColor: T.border,
              }}
            >
              <FaBuilding />
              {company?.name || "Company"} Portal
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p
                  className="text-sm font-extrabold"
                  style={{
                    color: T.primary,
                  }}
                >
                  {company?.fullName || "AarambhGrow Group of Companies"}
                </p>

                <p
                  className="text-xs"
                  style={{
                    color: T.muted,
                  }}
                >
                  Full-Stack Support &amp; Business Solutions
                </p>

                <div className="mt-3 flex gap-2">
                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background: T.primaryLight,
                      color: T.primary,
                    }}
                  >
                    {company?.name || "Company"}
                  </span>

                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background: T.secondaryLight,
                      color: T.secondary,
                    }}
                  >
                    {c.dept}
                  </span>
                </div>
              </div>

              <div
                className="h-16 w-16 shrink-0 rounded-full bg-white p-1.5 shadow-md"
                style={{
                  border: `1px solid ${T.border}`,
                }}
              >
                <img src={company?.logo || "/aarambh.png"} alt={company?.fullName || "Company"} className="h-full w-full object-contain" />
              </div>
            </div>

            <p
              className="mt-3 text-[11px]"
              style={{
                color: T.muted,
              }}
            >
              Your profile appears across all company platforms
            </p>
          </section>

          <section
            className="rounded-md border bg-white p-2 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <div
              className="grid grid-cols-2 divide-x sm:grid-cols-4"
              style={{
                borderColor: T.border,
              }}
            >
              {actions.map(({ label, icon: I, fn }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  disabled={busy}
                  className="flex items-center justify-center gap-2 px-2 py-3 text-xs font-semibold transition hover:bg-slate-50 disabled:opacity-50"
                  style={{
                    color: T.primary,
                  }}
                >
                  <I size={16} />
                  {label}
                </button>
              ))}
            </div>

            {(note || busy) && (
              <p
                className="px-3 pb-2 text-center text-[11px] font-semibold"
                style={{
                  color: T.secondary,
                }}
              >
                {busy ? "Preparing file…" : note}
              </p>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default function HomeShell() {
  const defaultCompany = COMPANY_CONFIG[DEFAULT_COMPANY_ID] || COMPANY_OPTIONS[0];
  const [mode, setMode] = useState("dp");
  const [profile, setProfile] = useState({
    company: DEFAULT_COMPANY_ID,
    dept: "Sales",
    name: "",
    designation: "",
    photo: "",
    gender: "Male",
    theme: "Navy",
    phone: "",
    email: "",
    website: defaultCompany?.data?.website || "",
    address: defaultCompany?.data?.address || "",
    logo: defaultCompany?.logo || "",
  });

  const selectedCompany = COMPANY_CONFIG[profile.company] || defaultCompany;
  const T = selectedCompany?.theme || DEFAULT_THEME;
  const setProfileField = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const changeCompany = (companyId) => {
    const next = COMPANY_CONFIG[companyId] || defaultCompany;

    setProfile((prev) => ({
      ...prev,
      company: next.id || companyId,
      website: next?.data?.website || "",
      address: next?.data?.address || "",
      logo: next?.logo || "",
    }));

    setReady(false);
  };

  const [active, setActive] = useState("s-org");
  const [ready, setReady] = useState(false);
  const [cardOrientation, setCardOrientation] = useState("landscape");

  useEffect(() => {
    const steps = mode === "card" ? CARD_STEPS : STEPS;
    const els = steps.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) {
          setActive(hit.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode]);

  const goto = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setReady(false);
    if (nextMode === "card") {
      setActive("c-org");
    } else {
      setActive("s-org");
    }
  };

  const MODES = useMemo(
    () => [
      {
        id: "dp",
        label: "WhatsApp DP",
        icon: FaWhatsapp,
        bg: `linear-gradient(90deg,${T.secondary},${T.secondary})`,
      },
      {
        id: "card",
        label: "Business Card",
        icon: FaIdCard,
        bg: `linear-gradient(90deg,${T.primary},${T.primary})`,
      },
      {
        id: "sig",
        label: "Email Signature",
        icon: FaEnvelope,
        bg: `linear-gradient(90deg,${T.accent},${T.accent})`,
      },
    ],
    [T],
  );

  return (
    <div
      className={`min-h-screen ${plusJakartaSans.className}`}
      style={{
        background: T.background,
        color: T.text,
      }}
    >
      <header
        className="sticky top-0 z-40 overflow-hidden border-b bg-white shadow-sm"
        style={{
          borderColor: T.border,
          background: T.surface,
        }}
      >
        <Swoosh className="right-0 top-0 h-full w-56 opacity-50" theme={T} />
        <div className="relative z-10 flex min-h-20 flex-wrap items-center justify-between gap-3 px-5 py-2">
          <div className="flex items-center gap-4">
            <img src={selectedCompany.headerLogo} alt={selectedCompany.fullName} className="h-14 w-auto object-contain" />
            <span className="hidden h-12 w-px bg-slate-200 sm:block" />
            <div className="hidden sm:block">
              <p
                className="text-2xl font-extrabold leading-tight"
                style={{
                  color: T.primary,
                }}
              >
                Digital Profile Studio
              </p>

              <p
                className="text-sm"
                style={{
                  color: T.muted,
                }}
              >
                Your Professional Identity, Instantly
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3">
            <div
              className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 shadow-sm"
              style={{
                borderColor: T.border,
              }}
            >
              <FaBuilding size={14} color={T.primary} />

              <select
                value={profile.company}
                onChange={(e) => changeCompany(e.target.value)}
                className="max-w-[190px] bg-transparent text-xs font-bold outline-none"
                style={{
                  color: T.primary,
                }}
                aria-label="Select company"
              >
                {COMPANY_OPTIONS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {MODES.map(({ id, label, icon: I, bg }) => (
              <button
                key={id}
                type="button"
                onClick={() => changeMode(id)}
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5"
                style={{
                  background: bg,
                  opacity: mode === id ? 1 : 0.85,
                  boxShadow: mode === id ? `0 0 0 2px #fff, 0 0 0 4px ${T.primary}33` : undefined,
                }}
              >
                <I size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {mode === "card" ? (
        <div className="flex">
          <BusinessCardStudio company={selectedCompany} profile={profile} theme={T} />
        </div>
      ) : (
        <div className="flex min-w-0">
          <aside
            className="sticky top-20 hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
            style={{
              background: `linear-gradient(180deg, ${T.primary}, ${T.primary})`,
            }}
          >
            <ol className="relative space-y-2 p-3 pt-6">
              {STEPS.map((s, i) => {
                const on = active === s.id;
                return (
                  <li key={s.id} className="relative">
                    <button
                      type="button"
                      onClick={() => goto(s.id)}
                      className="flex w-full items-center gap-3 rounded-md px-2.5 py-3 text-left text-white transition hover:bg-white/10"
                      style={
                        on
                          ? {
                              background: `${T.secondary}55`,
                              borderLeft: `4px solid ${T.accent}`,
                            }
                          : {
                              borderLeft: "4px solid transparent",
                            }
                      }
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                        style={{
                          background: on ? T.accent : "rgba(255,255,255,.25)",
                          color: "#fff",
                        }}
                      >
                        {i + 1}
                      </span>
                      <s.icon size={18} className="shrink-0 opacity-90" />
                      <span>
                        <span className="block text-[13px] font-bold leading-tight">{s.title}</span>
                        <span className="block text-[11px] leading-tight text-white/65">{s.sub}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="relative p-6 pb-10 text-white">
              <p className="text-lg opacity-85">Build Your</p>
              <p className="text-xl font-extrabold leading-tight">Professional Identity</p>
              <p className="opacity-85">in Just a Few Clicks</p>
              <div
                className="mt-3 h-1 w-16 rounded"
                style={{
                  background: `linear-gradient(90deg,${T.secondary},${T.accent})`,
                }}
              />
            </div>
            <Swoosh className="-bottom-2 -left-4 h-36 w-72" theme={T} />
          </aside>

          <main className="min-w-0 flex-1">
            {mode === "dp" && (
              <WhatsAppDPGenerator
                data={profile}
                setData={setProfileField}
                onReady={() => {
                  setReady(true);
                  goto("s-out");
                }}
                ready={ready}
                brand={selectedCompany.theme}
                company={selectedCompany}
                theme={T}
              />
            )}

            {mode === "sig" && (
              <EmailSignatureGenerator
                data={profile}
                setData={setProfileField}
                onReady={() => {
                  setReady(true);
                  goto("s-out");
                }}
                ready={ready}
                brand={selectedCompany.theme}
                company={selectedCompany}
                theme={T}
              />
            )}
          </main>
        </div>
      )}

      <footer
        className="grid items-center gap-3 border-t bg-white px-6 py-4 text-[11px] md:grid-cols-3"
        style={{
          borderColor: T.border,
          color: T.muted,
          background: T.surface,
        }}
      >
        <img src={selectedCompany.headerLogo} alt={selectedCompany.fullName} className="h-11 w-auto object-contain" />
        <p className="text-center italic">
          Developed with <FaHeart className="inline" color={T.accent} size={10} /> by Digital Team
          <br />
          at {selectedCompany.fullName}
        </p>

        <p className="text-right">
          © {new Date().getFullYear()} {selectedCompany.fullName}
          . All rights reserved.
          <br />
          <span
            style={{
              color: T.secondary,
            }}
          >
            Digital Business Card Studio v1.0 • For internal company use only
          </span>
        </p>
      </footer>
    </div>
  );
}
