"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBuilding,
  FaUser,
  FaEye,
  FaLocationDot,
  FaChartColumn,
  FaUserTie,
  FaGear,
  FaPeopleGroup,
  FaBriefcase,
  FaCheck,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaWandMagicSparkles,
  FaFilePdf,
  FaShareNodes,
  FaLink,
  FaIdBadge,
  FaGem,
  FaImage,
  FaLaptopCode,
} from "react-icons/fa6";
import CardFront from "./CardFront";
import CardBack from "./CardBack";
import { defaultCardData } from "../lib/defaultCardData";

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

const getTheme = (theme) => {
  const T = theme || DEFAULT_THEME;

  return {
    navy: T.primary || DEFAULT_THEME.primary,
    orange: T.accent || DEFAULT_THEME.accent,
    green: T.secondary || DEFAULT_THEME.secondary,
    white: "#FFFFFF",
    page: T.background || DEFAULT_THEME.background,
    surface: T.surface || DEFAULT_THEME.surface,
    border: T.border || DEFAULT_THEME.border,
    muted: T.muted || DEFAULT_THEME.muted,
    text: T.text || DEFAULT_THEME.text,
    navySoft: T.primaryLight || DEFAULT_THEME.primaryLight,
    orangeSoft: T.accentLight || DEFAULT_THEME.accentLight,
    greenSoft: T.secondaryLight || DEFAULT_THEME.secondaryLight,
    gradient: T.gradient || DEFAULT_THEME.gradient,
  };
};

const DEPTS = [
  { id: "Sales", icon: FaChartColumn },
  { id: "Admin", icon: FaUserTie },
  { id: "Operation", label: "Operation", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
  { id: "Digital", label: "Digital", icon: FaLaptopCode },
];

const CARD_STEPS = [
  {
    id: "c-org",
    title: "Organization",
    sub: "Select company & department",
    icon: FaBuilding,
  },
  {
    id: "c-info",
    title: "Personal Information",
    sub: "Add your details",
    icon: FaUser,
  },
  {
    id: "c-out",
    title: "Preview & Download",
    sub: "View and get your card",
    icon: FaEye,
  },
];

const CARD_START = {
  dept: "Sales",
  name: "",
  designation: "",
  phone: "",
  email: "",
  website: "",
  branch: "",
  address: "",
};

const CARD_KEY = "aarambh:studio:card:v3";
const CARD_SIZE = {
  landscape: [1050, 600],
  portrait: [1080, 1920],
};

const enc = (obj) => encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(obj))));
const dec = (str) => JSON.parse(decodeURIComponent(atob(decodeURIComponent(str))));

function CardSection({ id, no, title, sub, icon: Icon, right, children, theme }) {
  const B = getTheme(theme);

  return (
    <section
      id={id}
      className="scroll-mt-24 w-full min-w-0 max-w-full overflow-hidden rounded-md border bg-white p-3 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: B.border,
      }}
    >
      <div className="mb-3.5 flex items-center justify-between sm:mb-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <span
            className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
            style={{
              background: B.gradient,
            }}
          >
            <Icon size={18} className="sm:size-[20px]" />
          </span>
          <div className="flex-1 min-w-0">
            <h2
              className="text-base sm:text-lg font-extrabold truncate"
              style={{
                color: B.navy,
              }}
            >
              {no}. {title}
            </h2>
            <p
              className="text-[11px] sm:text-xs leading-snug"
              style={{
                color: B.muted,
              }}
            >
              {sub}
            </p>
          </div>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function CardField({ label, optional, icon: Icon, value, onChange, placeholder, type = "text", theme }) {
  const B = getTheme(theme);

  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-bold"
        style={{
          color: B.navy,
        }}
      >
        {label}{" "}
        {optional && (
          <span
            className="font-normal"
            style={{
              color: B.muted,
            }}
          >
            (Optional)
          </span>
        )}
      </span>

      <span
        className="flex items-center gap-3 rounded-md border bg-white px-3.5 py-3"
        style={{
          borderColor: B.border,
        }}
      >
        <Icon size={14} color={B.navy} />
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

function Choice({ on, onClick, icon: I, children, theme }) {
  const B = getTheme(theme);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-4 text-xs font-semibold transition"
      style={
        on
          ? {
              background: B.gradient,
              borderColor: B.navy,
              color: "#fff",
            }
          : {
              background: "#fff",
              borderColor: B.border,
              color: B.navy,
            }
      }
    >
      {on && (
        <span
          className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-white"
          style={{
            background: B.green,
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

export default function BusinessCardStudio({ company, profile, theme }) {
  const T = theme || company?.theme || DEFAULT_THEME;
  const B = getTheme(T);

  const [c, setC] = useState(() => ({
    ...CARD_START,
    ...(profile || {}),
  }));

  const setField = (key, value) => {
    setC((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const [orientation, setOrientation] = useState("landscape");
  const [side, setSide] = useState("front");
  const [active, setActive] = useState("c-org");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [mobileTab, setMobileTab] = useState("form");
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [W, H] = CARD_SIZE[orientation];

  const cardData = useMemo(
    () => ({
      ...defaultCardData,
      name: c.name,
      title: c.designation,
      phone: c.phone || profile?.phone || company?.data?.phone || "",
      email: c.email || profile?.email || company?.data?.email || "",
      website: c.website || company?.data?.website || "",
      location: c.address || company?.data?.address || "",
      department: c.dept,
      branch: c.branch || company?.data?.branch || "",
      company: company?.name || "",
      companyFullName: company?.fullName || "",
      companyLogo: company?.logo || "",
      companyWebsite: company?.data?.website || "",
    }),
    [c, profile, company],
  );

  useEffect(() => {
    const defaultBranch = company?.branches?.[0];
    setC((prev) => ({
      ...prev,
      website: company?.data?.website || prev.website || "",
      address: defaultBranch?.address || company?.data?.address || prev.address || "",
      branch: defaultBranch?.name || company?.data?.branch || prev.branch || "",
      phone: prev.phone || defaultBranch?.phone || company?.data?.phone || "",
    }));
  }, [company?.id]);

  useEffect(() => {
    if (!profile) return;

    setC((prev) => ({
      ...prev,
      ...(profile.name !== undefined ? { name: profile.name } : {}),
      ...(profile.designation !== undefined ? { designation: profile.designation } : {}),
      ...(profile.phone !== undefined ? { phone: profile.phone } : {}),
      ...(profile.email !== undefined ? { email: profile.email } : {}),
    }));
  }, [profile?.name, profile?.designation, profile?.phone, profile?.email]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CARD_KEY);

      if (saved) {
        setC((prev) => ({
          ...prev,
          ...JSON.parse(saved),
        }));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const query = new URLSearchParams(window.location.search).get("card");

      if (query) {
        setC((prev) => ({
          ...prev,
          ...dec(query),
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
    const elements = CARD_STEPS.map((step) => document.getElementById(step.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const done = [true, !!c.name && !!c.designation, !!(c.phone || c.email)];
  const goto = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const flash = (message) => {
    setNote(message);
    setTimeout(() => setNote(""), 2200);
  };

  const snap = async (element) => {
    if (!element) {
      throw new Error("Card element not found");
    }
    const { toPng } = await import("html-to-image");
    return toPng(element, {
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
      const element = side === "front" ? frontRef.current : backRef.current;
      const url = await snap(element);
      const link = document.createElement("a");

      link.download = `${fileBase}-${side}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      link.remove();
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
      icon: FaImage,
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
        className="sticky top-20 self-start hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
        style={{
          background: B.gradient,
        }}
      >
        <div className="p-4 pt-6">
          <div className="mb-5 border-b border-white/10 px-2 pb-5 text-white">
            <p className="text-sm opacity-90">Create Your</p>
            <p className="text-xl font-extrabold">Digital Business Card</p>
            <p className="mt-1 text-xs leading-snug text-white/65">Build your identity. Share your profile professionally.</p>
            <div className="mt-4 flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2">
              {company?.logo && <img src={company.logo} alt={company?.fullName || "Company"} className="h-7 w-7 rounded object-contain" />}
              <span className="min-w-0 text-[11px] font-bold leading-tight">{company?.name || "AarambhGrow Group"}</span>
            </div>
          </div>

          <ol className="space-y-2.5">
            {CARD_STEPS.map((step, index) => {
              const on = active === step.id;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => goto(step.id)}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-white transition hover:bg-white/10"
                    style={
                      on
                        ? {
                            background: `linear-gradient(90deg, ${B.green}88, ${B.green}22)`,
                            border: `1px solid ${B.green}`,
                          }
                        : {
                            border: "1px solid transparent",
                          }
                    }
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                      style={{
                        background: on ? B.green : done[index] && index ? B.green : "rgba(255,255,255,.22)",
                      }}
                    >
                      {done[index] && index && !on ? <FaCheck size={12} /> : index + 1}
                    </span>
                    <step.icon size={20} className="shrink-0" />
                    <span>
                      <span className="block text-[13px] font-bold leading-tight">{step.title}</span>
                      <span className="block text-[11px] leading-tight text-white/65">{step.sub}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="relative z-10 m-4 mb-16 rounded-md border border-white/15 bg-white/5 p-4 text-white">
          <p className="text-sm opacity-85">Build Your</p>
          <p className="text-lg font-extrabold leading-tight">Professional Identity</p>
          <p className="text-sm opacity-85">in Just a Few Clicks</p>
          <FaArrowRight className="mt-2" size={16} />
          <div className="mt-3 grid grid-cols-3 gap-1 border-t border-white/15 pt-3 text-center text-[10px]">
            {[
              [FaIdBadge, "Professional Look"],
              [FaShareNodes, "Easy Sharing"],
              [FaGem, "High Quality"],
            ].map(([Icon, label]) => (
              <span key={label} className="flex flex-col items-center gap-1">
                <Icon size={16} />

                {label}
              </span>
            ))}
          </div>
        </div>
      </aside>

      {/* MOBILE STICKY BLUE STEP BAR FOR BUSINESS CARD */}
      <div
        className="sticky top-[86px] sm:top-20 z-30 w-full overflow-x-auto no-scrollbar lg:hidden shadow-sm border-b border-white/10"
        style={{
          background: B.gradient,
        }}
      >
        <div className="flex items-center justify-between gap-1 px-2.5 py-1.5 w-full min-w-full">
          {CARD_STEPS.map((step, index) => {
            const on = active === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => goto(step.id)}
                className="flex-1 flex items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-bold transition whitespace-nowrap active:scale-95"
                style={
                  on
                    ? {
                        background: B.green,
                        color: "#ffffff",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }
                    : {
                        background: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.85)",
                      }
                }
              >
                <span
                  className="grid h-3.5 w-3.5 place-items-center rounded-full text-[8px] font-extrabold"
                  style={{
                    background: on ? "#ffffff" : "rgba(255,255,255,0.25)",
                    color: on ? B.navy : "#ffffff",
                  }}
                >
                  {index + 1}
                </span>
                <Icon size={10} className="shrink-0" />
                <span className="truncate">{step.title.split(" ")[0]}</span>
                {step.id === "c-out" && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="grid grid-cols-1 w-full max-w-full min-w-0 flex-1 items-start gap-3 p-2 sm:gap-5 sm:p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5 lg:pt-3">
        <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5">
          {/* ORGANIZATION */}
          <CardSection
            id="c-org"
            no="1"
            title="Organization"
            sub="Choose your company and department to get started."
            icon={FaBuilding}
            theme={T}
          >
            {/* COMPANY INFO */}
            <div
              className="mb-5 rounded-md border p-4"
              style={{
                background: B.navySoft,
                borderColor: B.border,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-white shadow-sm"
                  style={{
                    border: `1px solid ${B.border}`,
                  }}
                >
                  <img
                    src={company?.logo || "/aarambh.png"}
                    alt={company?.fullName || "Company Logo"}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-[11px] font-semibold"
                    style={{
                      color: B.muted,
                    }}
                  >
                    Selected Company
                  </p>
                  <p
                    className="truncate text-sm font-extrabold"
                    style={{
                      color: B.navy,
                    }}
                  >
                    {company?.fullName || "AarambhGrow Group of Companies"}
                  </p>
                </div>
              </div>
            </div>

            <p
              className="mb-2 flex items-center gap-2 text-xs font-bold"
              style={{
                color: B.navy,
              }}
            >
              <FaBuilding />
              Department Type
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DEPTS.map(({ id, icon }) => (
                <Choice
                  key={id}
                  on={c.dept === id || (id.toLowerCase().startsWith("oper") && (c.dept || "").toLowerCase().startsWith("oper"))}
                  onClick={() => setField("dept", id)}
                  icon={icon}
                  theme={T}
                >
                  {id}
                </Choice>
              ))}
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
                value={c.website || company?.data?.website || ""}
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

              {company?.branches && company.branches.length > 0 && (
                <div
                  className="sm:col-span-2 rounded-md border p-3.5"
                  style={{
                    borderColor: T.border,
                    backgroundColor: T.primaryLight || "#f8fafc",
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span
                      className="text-xs font-bold"
                      style={{
                        color: T.primary,
                      }}
                    >
                      Select Branch
                    </span>
                    <span
                      className="text-[11px] font-medium"
                      style={{
                        color: T.muted,
                      }}
                    >
                      Auto-fills branch address & phone on card
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {company.branches.map((b) => {
                      const isSelected =
                        c.branch === b.name ||
                        (!c.branch && b.id === "ahmedabad");

                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => {
                            setField("branch", b.name);
                            setField("address", b.address);
                            if (b.phone) setField("phone", b.phone);
                          }}
                          className="flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-bold border transition shadow-sm"
                          style={{
                            backgroundColor: isSelected ? T.primary : "#ffffff",
                            borderColor: isSelected ? T.primary : T.border,
                            color: isSelected ? "#ffffff" : T.primary,
                          }}
                        >
                          <FaBuilding size={12} />
                          <span>{b.name}</span>
                          {b.tag && (
                            <span
                              className="rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase"
                              style={{
                                backgroundColor: isSelected
                                  ? "rgba(255,255,255,0.25)"
                                  : "#FEF3C7",
                                color: isSelected ? "#ffffff" : "#92400E",
                              }}
                            >
                              {b.tag}
                            </span>
                          )}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => {
                        setField("branch", "Both Branches");
                        const combined = company.branches
                          .map((b) => `${b.name}: ${b.address}`)
                          .join(" | ");
                        setField("address", combined);
                      }}
                      className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-bold border transition shadow-sm"
                      style={{
                        backgroundColor:
                          c.branch === "Both Branches" ? T.primary : "#ffffff",
                        borderColor:
                          c.branch === "Both Branches" ? T.primary : T.border,
                        color:
                          c.branch === "Both Branches" ? "#ffffff" : T.primary,
                      }}
                    >
                      <span>Both Branches</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CardSection>

          <button
            type="button"
            onClick={() => {
              setSide("front");
              goto("c-out");
            }}
            className="inline-flex w-full items-center justify-center gap-3 rounded-md py-3.5 text-xs font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.99]"
            style={{
              background: B.gradient,
            }}
          >
            <FaWandMagicSparkles size={14} />
            <span>View Live Card Preview ↓</span>
            <FaArrowRight size={13} />
          </button>
        </div>

        <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5 lg:sticky lg:top-20 self-start">
          <section
            id="c-out"
            className="scroll-mt-24 w-full min-w-0 max-w-full overflow-hidden rounded-md border bg-white p-3 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <div className="mb-4 flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-3">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-md max-sm:h-10 max-sm:w-10"
                  style={{
                    color: T.primary,
                  }}
                >
                  <FaEye size={22} />
                </span>

                <div>
                  <h2
                    className="text-lg font-extrabold max-sm:text-base"
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

            {/* CARD */}
            <div
              className="mx-auto w-full"
              style={{
                perspective: "1400px",
                maxWidth: orientation === "portrait" ? 300 : "100%",
              }}
            >
              <div
                className="relative w-full cursor-pointer"
                onClick={() => setSide((prev) => (prev === "front" ? "back" : "front"))}
                style={{
                  aspectRatio: `${W} / ${H}`,
                  transformStyle: "preserve-3d",
                  transition: "transform 0.7s ease-in-out",
                  transform: side === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <CardFront data={cardData} orientation={orientation} company={company} theme={T} />
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <CardBack data={cardData} orientation={orientation} company={company} theme={T} />
                </div>
              </div>
            </div>

            {/* DIRECT MOBILE ACTION BUTTONS (MOBILE ONLY) */}
            <div className="mt-3.5 sm:hidden space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={downloadPNG}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 rounded-md p-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
                  style={{ background: B.gradient }}
                >
                  <FaDownload size={13} />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={downloadPDF}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 rounded-md p-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
                  style={{ background: `linear-gradient(90deg, ${B.green}, ${B.navy})` }}
                >
                  <FaFilePdf size={13} />
                  <span>Download PDF</span>
                </button>
              </div>

              {(note || busy) && (
                <p
                  className="pt-1 text-center text-[11px] font-semibold"
                  style={{
                    color: B.green,
                  }}
                >
                  {busy ? "Preparing file…" : note}
                </p>
              )}
            </div>
          </section>

          <section
            className="rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: B.border,
            }}
          >
            <div
              className="flex items-center gap-2 border-b pb-3 text-sm font-extrabold"
              style={{
                color: B.navy,
                borderColor: B.border,
              }}
            >
              <FaBuilding />
              {company?.fullName || "AarambhGrow Company Portal"}
            </div>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p
                  className="text-sm font-extrabold"
                  style={{
                    color: B.navy,
                  }}
                >
                  {company?.fullName || "AarambhGrow Group of Companies"}
                </p>
                <p
                  className="text-xs"
                  style={{
                    color: B.muted,
                  }}
                >
                  Full-Stack Support & Business Solutions
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {/* COMPANY BADGE */}
                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background: B.navySoft,
                      color: B.navy,
                    }}
                  >
                    {company?.name || "AarambhGrow Group"}
                  </span>

                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background: B.greenSoft,
                      color: B.green,
                    }}
                  >
                    {c.dept}
                  </span>
                </div>
              </div>

              <div
                className="h-16 w-16 shrink-0 rounded-full bg-white p-1.5 shadow-md"
                style={{
                  border: `1px solid ${B.border}`,
                }}
              >
                <img
                  src={company?.logo || "/aarambh.png"}
                  alt={company?.fullName || "AarambhGrow"}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </section>

          <section
            className="rounded-md border bg-white p-2 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: B.border,
            }}
          >
            <div className="grid grid-cols-2 divide-x sm:grid-cols-4">
              {actions.map(({ label, icon: Icon, fn }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  disabled={busy}
                  className="flex items-center justify-center gap-2 px-2 py-3 text-xs font-semibold transition hover:bg-slate-50 disabled:opacity-50"
                  style={{
                    color: B.navy,
                  }}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
            {(note || busy) && (
              <p
                className="px-3 pb-2 text-center text-[11px] font-semibold"
                style={{
                  color: B.green,
                }}
              >
                {busy ? "Preparing file…" : note}
              </p>
            )}
          </section>
        </div>
      </main>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          left: -30000,
          top: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            width: W,
            height: H,
          }}
        >
          <CardFront data={cardData} orientation={orientation} innerRef={frontRef} company={company} theme={T} />
        </div>
        <div
          style={{
            position: "relative",
            width: W,
            height: H,
          }}
        >
          <CardBack data={cardData} orientation={orientation} innerRef={backRef} company={company} theme={T} />
        </div>
      </div>

      {/* MOBILE FLOATING QUICK PREVIEW BUTTON */}
      <div className="fixed bottom-5 right-4 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => {
            const outElem = document.getElementById("c-out");
            outElem?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-1.5 rounded-full py-2.5 px-4 text-xs font-bold text-white shadow-2xl transition active:scale-95"
          style={{
            background: B.navy,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          <FaEye size={13} />
          <span>Card Preview</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </>
  );
}
