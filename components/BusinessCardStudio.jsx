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
  { id: "Operations", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
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
      className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: B.border,
      }}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: B.gradient,
          }}
        >
          <Icon size={20} />
        </span>
        <div className="flex-1">
          <h2
            className="text-lg font-extrabold"
            style={{
              color: B.navy,
            }}
          >
            {no}. {title}
          </h2>
          <p
            className="text-xs"
            style={{
              color: B.muted,
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

export default function BusinessCardStudio({ company, profile }) {
  const T = company?.theme || DEFAULT_THEME;
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
      company: company?.name || "",
      companyFullName: company?.fullName || "",
      companyLogo: company?.logo || "",
      companyWebsite: company?.data?.website || "",
    }),
    [c, profile, company],
  );

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
        className="sticky top-20 hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
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

      <main className="grid min-w-0 flex-1 gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5">
        <div className="space-y-5">
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
                  <img src={company?.logo || "/aarambh.png"} alt={company?.fullName || "Company Logo"} className="h-8 w-8 object-contain" />
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

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {DEPTS.map(({ id, icon }) => (
                <Choice key={id} on={c.dept === id} onClick={() => setField("dept", id)} icon={icon} theme={T}>
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
            </div>
          </CardSection>

          <button
            type="button"
            onClick={() => {
              setSide("front");
              goto("c-out");
            }}
            className="inline-flex w-full items-center justify-center gap-3 rounded-md py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110"
            style={{
              background: B.gradient,
            }}
          >
            <FaWandMagicSparkles size={15} />
            Generate Preview
            <FaArrowRight size={14} />
          </button>
        </div>

        <div className="space-y-5">
          <section
            id="c-out"
            className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: B.border,
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-md"
                  style={{
                    color: B.navy,
                    border: `1px solid ${B.border}`,
                  }}
                >
                  <FaEye size={22} />
                </span>
                <div>
                  <h2
                    className="text-lg font-extrabold"
                    style={{
                      color: B.navy,
                    }}
                  >
                    Live Preview
                  </h2>
                  <p
                    className="text-xs"
                    style={{
                      color: B.muted,
                    }}
                  >
                    Your profile will appear like this
                  </p>
                </div>
              </div>

              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold"
                style={{
                  background: B.greenSoft,
                  color: B.green,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: B.green,
                  }}
                />
                REAL-TIME
              </span>
            </div>
            <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
              <div
                className="inline-flex overflow-hidden rounded-md border"
                style={{
                  borderColor: B.border,
                }}
              >
                {[
                  ["landscape", "Landscape"],
                  ["portrait", "Portrait"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setOrientation(value)}
                    className="px-4 py-2 text-xs font-bold"
                    style={
                      orientation === value
                        ? {
                            background: B.navy,
                            color: "#fff",
                          }
                        : {
                            background: "#fff",
                            color: B.text,
                          }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div
                className="inline-flex overflow-hidden rounded-md border"
                style={{
                  borderColor: B.border,
                }}
              >
                {[
                  ["front", "Front"],
                  ["back", "Back"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSide(value)}
                    className="px-4 py-2 text-xs font-bold"
                    style={
                      side === value
                        ? {
                            background: B.navy,
                            color: "#fff",
                          }
                        : {
                            background: "#fff",
                            color: B.text,
                          }
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="mx-auto w-full"
              style={{
                perspective: "1400px",
                WebkitPerspective: "1400px",
                maxWidth: orientation === "portrait" ? 300 : "100%",
              }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: `${W} / ${H}`,
                  transformStyle: "preserve-3d",
                  WebkitTransformStyle: "preserve-3d",
                  transition: "transform 0.7s ease",
                  transform: side === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
                  WebkitTransform: side === "back" ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                    WebkitTransform: "rotateY(0deg)",
                  }}
                >
                  <CardFront data={cardData} orientation={orientation} company={company} theme={T} />
                </div>

                <div
                  className="absolute inset-0 h-full w-full"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    WebkitTransform: "rotateY(180deg)",
                  }}
                >
                  <CardBack data={cardData} orientation={orientation} company={company} theme={T} />
                </div>
              </div>
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
    </>
  );
}
