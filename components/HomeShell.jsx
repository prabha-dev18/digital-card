"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

import {
  COMPANY_CONFIG,
  COMPANY_OPTIONS,
  DEFAULT_COMPANY_ID,
} from "../lib/companyConfig";

import {
  FaWhatsapp,
  FaIdCard,
  FaEnvelope,
  FaBuilding,
  FaUser,
  FaEye,
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
  FaCheck,
  FaLocationDot,
  FaLaptopCode,
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

/* =========================================================
   DEFAULT THEME
========================================================= */

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

/* =========================================================
   DEPARTMENTS
========================================================= */

const DEPTS = [
  {
    id: "Sales",
    icon: FaChartColumn,
  },
  {
    id: "Admin",
    icon: FaUserTie,
  },
  {
    id: "Operation",
    icon: FaGear,
  },
  {
    id: "Management",
    icon: FaPeopleGroup,
  },
  {
    id: "Digital",
    icon: FaLaptopCode,
  },
];

/* =========================================================
   GENERAL STEPS
========================================================= */

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

/* =========================================================
   BUSINESS CARD STEPS
========================================================= */

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
    id: "c-photo",
    title: "Photo & Appearance",
    sub: "Choose card appearance",
    icon: FaEye,
  },
  {
    id: "c-out",
    title: "Preview & Download",
    sub: "View and get your card",
    icon: FaEye,
  },
];

/* =========================================================
   INITIAL CARD DATA
========================================================= */

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

/* =========================================================
   CARD SIZE
========================================================= */

const CARD_SIZE = {
  landscape: [1050, 600],
  portrait: [1080, 1920],
};

/* =========================================================
   SHARE ENCODING
========================================================= */

const enc = (object) =>
  encodeURIComponent(
    btoa(encodeURIComponent(JSON.stringify(object))),
  );

const dec = (value) =>
  JSON.parse(
    decodeURIComponent(atob(decodeURIComponent(value))),
  );

/* =========================================================
   DECORATIVE SWOOSH
========================================================= */

function Swoosh({ className = "", flip = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 140"
      className={`pointer-events-none absolute ${className}`}
      style={{
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  );
}

/* =========================================================
   CARD SECTION
========================================================= */

function CardSection({
  id,
  no,
  title,
  sub,
  icon: Icon,
  right,
  children,
  theme = DEFAULT_THEME,
}) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-md border bg-white p-3.5 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: T.border,
        background: T.surface,
      }}
    >
      <div className="mb-3.5 flex items-center gap-3 sm:mb-4 sm:gap-4">
        <span
          className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: T.gradient,
          }}
        >
          <Icon size={18} className="sm:size-[20px]" />
        </span>

        <div className="flex-1 min-w-0">
          <h2
            className="text-base sm:text-lg font-extrabold truncate"
            style={{
              color: T.primary,
            }}
          >
            {no}. {title}
          </h2>

          <p
            className="text-[11px] sm:text-xs leading-snug"
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

/* =========================================================
   CARD FIELD
========================================================= */

function CardField({
  label,
  optional,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  theme = DEFAULT_THEME,
}) {
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
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none"
        />
      </span>
    </label>
  );
}

/* =========================================================
   CHOICE
========================================================= */

function Choice({
  on,
  onClick,
  icon: Icon,
  children,
  theme = DEFAULT_THEME,
}) {
  const T = theme || DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-4 text-xs font-semibold transition hover:-translate-y-0.5"
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

      <Icon size={20} />

      {children}
    </button>
  );
}

/* =========================================================
   BUSINESS CARD STUDIO
========================================================= */

function BusinessCardStudio({ company, profile, theme }) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const companyData = company?.data || {};

  const [c, setC] = useState(CARD_START);
  const [orientation, setOrientation] = useState("landscape");
  const [side, setSide] = useState("front");
  const [active, setActive] = useState("c-org");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const [W, H] = CARD_SIZE[orientation];

  /* =====================================================
     FIELD UPDATE
  ===================================================== */

  const setField = (key, value) => {
    setC((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  /* =====================================================
     CARD DATA
  ===================================================== */

  const cardData = useMemo(
    () => ({
      ...defaultCardData,

      company:
        company?.fullName ||
        profile?.company ||
        defaultCardData.company,

      logo: company?.logo || defaultCardData.logo,

      website:
        c.website ||
        companyData.website ||
        defaultCardData.website,

      location:
        c.address ||
        companyData.address ||
        defaultCardData.location,

      name: c.name,
      title: c.designation,
      phone: c.phone || companyData.phone || "",
      email: c.email || companyData.email || "",
      department: c.dept,
      branch: c.branch || companyData.branch || "",
    }),
    [c, company, companyData, profile],
  );

  /* =====================================================
     COMPANY WEBSITE / ADDRESS SYNC
  ===================================================== */

  useEffect(() => {
    const defaultBranch = company?.branches?.[0];
    setC((previous) => ({
      ...previous,
      website: companyData.website || "",
      address: defaultBranch?.address || companyData.address || "",
      branch: defaultBranch?.name || companyData.branch || "",
      phone:
        previous.phone && previous.phone !== "+91 98765 43210"
          ? previous.phone
          : (defaultBranch?.phone || companyData.phone || ""),
    }));
  }, [
    company?.id,
    companyData.website,
    companyData.address,
    companyData.phone,
    companyData.branch,
  ]);

  /* =====================================================
     LOAD SAVED CARD
  ===================================================== */

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CARD_KEY);

      if (saved) {
        setC((previous) => ({
          ...previous,
          ...JSON.parse(saved),
        }));
      }
    } catch {}

    try {
      const query = new URLSearchParams(
        window.location.search,
      ).get("card");

      if (query) {
        setC((previous) => ({
          ...previous,
          ...dec(query),
        }));
      }
    } catch {}
  }, []);

  /* =====================================================
     SAVE CARD
  ===================================================== */

  useEffect(() => {
    try {
      localStorage.setItem(
        CARD_KEY,
        JSON.stringify(c),
      );
    } catch {}
  }, [c]);

  /* =====================================================
     ACTIVE SECTION OBSERVER
  ===================================================== */

  useEffect(() => {
    const elements = CARD_STEPS.map((step) =>
      document.getElementById(step.id),
    ).filter(Boolean);

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting,
        );

        if (visible) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    elements.forEach((element) =>
      observer.observe(element),
    );

    return () => observer.disconnect();
  }, []);

  /* =====================================================
     STEP STATUS
  ===================================================== */

  const done = [
    true,
    Boolean(c.name && c.designation),
    true,
    Boolean(c.phone || c.email),
  ];

  /* =====================================================
     SCROLL
  ===================================================== */

  const goto = (id) => {
    setActive(id);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =====================================================
     MESSAGE
  ===================================================== */

  const flash = (message) => {
    setNote(message);

    setTimeout(() => {
      setNote("");
    }, 2200);
  };

  /* =====================================================
     HTML TO IMAGE
  ===================================================== */

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

  /* =====================================================
     FILE NAME
  ===================================================== */

  const fileBase = (c.name || "business-card")
    .trim()
    .replace(/\s+/g, "-");

  /* =====================================================
     LOAD IMAGE HELPER
  ===================================================== */

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const image = new Image();

      image.onload = () => resolve(image);
      image.onerror = () =>
        reject(
          new Error("Could not load generated card image"),
        );

      image.src = src;
    });

  /* =====================================================
     DOWNLOAD PNG

     ONE PNG CONTAINS:
     FRONT
     +
     BACK
  ===================================================== */

  const downloadPNG = async () => {
    setBusy(true);

    try {
      const frontElement = document.querySelector(
        "[data-card-export-front]",
      );

      const backElement = document.querySelector(
        "[data-card-export-back]",
      );

      if (!frontElement || !backElement) {
        throw new Error("Export cards not found");
      }

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      const [frontImage, backImage] =
        await Promise.all([
          snap(frontElement),
          snap(backElement),
        ]);

      const [frontImg, backImg] =
        await Promise.all([
          loadImage(frontImage),
          loadImage(backImage),
        ]);

      /*
        Keep the actual generated image resolution.
      */
      const frontWidth =
        frontImg.naturalWidth || frontImg.width;

      const frontHeight =
        frontImg.naturalHeight || frontImg.height;

      const backWidth =
        backImg.naturalWidth || backImg.width;

      const backHeight =
        backImg.naturalHeight || backImg.height;

      const canvasWidth = Math.max(
        frontWidth,
        backWidth,
      );

      const gap = Math.round(
        40 * 2,
      );

      const canvasHeight =
        frontHeight +
        gap +
        backHeight;

      const canvas =
        document.createElement("canvas");

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const context =
        canvas.getContext("2d");

      if (!context) {
        throw new Error(
          "Could not create canvas",
        );
      }

      /*
        White background.
      */
      context.fillStyle = "#FFFFFF";

      context.fillRect(
        0,
        0,
        canvasWidth,
        canvasHeight,
      );

      /*
        Center FRONT.
      */
      const frontX =
        Math.round(
          (canvasWidth - frontWidth) / 2,
        );

      context.drawImage(
        frontImg,
        frontX,
        0,
        frontWidth,
        frontHeight,
      );

      /*
        Center BACK.
      */
      const backX =
        Math.round(
          (canvasWidth - backWidth) / 2,
        );

      context.drawImage(
        backImg,
        backX,
        frontHeight + gap,
        backWidth,
        backHeight,
      );

      /*
        Convert BOTH cards into ONE PNG.
      */
      const combinedPNG =
        canvas.toDataURL(
          "image/png",
          1,
        );

      /*
        Download one file only.
      */
      const anchor =
        document.createElement("a");

      anchor.href = combinedPNG;

      anchor.download =
        `${fileBase}-front-back.png`;

      document.body.appendChild(anchor);

      anchor.click();

      anchor.remove();

      flash(
        "Front & back combined PNG downloaded",
      );
    } catch (error) {
      console.error(
        "Combined PNG export failed:",
        error,
      );

      flash(
        "Could not create combined PNG",
      );
    } finally {
      setBusy(false);
    }
  };

  /* =====================================================
     DOWNLOAD PDF

     ONE PDF CONTAINS:
     PAGE 1 = FRONT
     PAGE 2 = BACK
  ===================================================== */

  const downloadPDF = async () => {
    setBusy(true);

    try {
      const { jsPDF } =
        await import("jspdf");

      const frontElement =
        document.querySelector(
          "[data-card-export-front]",
        );

      const backElement =
        document.querySelector(
          "[data-card-export-back]",
        );

      if (
        !frontElement ||
        !backElement
      ) {
        throw new Error(
          "Export cards not found",
        );
      }

      await new Promise((resolve) =>
        requestAnimationFrame(resolve),
      );

      const [frontImage, backImage] =
        await Promise.all([
          snap(frontElement),
          snap(backElement),
        ]);

      const pdf = new jsPDF({
        orientation:
          W > H
            ? "landscape"
            : "portrait",

        unit: "px",

        format: [W, H],
      });

      pdf.addImage(
        frontImage,
        "PNG",
        0,
        0,
        W,
        H,
      );

      pdf.addPage(
        [W, H],
        W > H
          ? "landscape"
          : "portrait",
      );

      pdf.addImage(
        backImage,
        "PNG",
        0,
        0,
        W,
        H,
      );

      pdf.save(
        `${fileBase}-front-back.pdf`,
      );

      flash(
        "Front & back PDF downloaded",
      );
    } catch (error) {
      console.error(
        "PDF export failed:",
        error,
      );

      flash(
        "Could not create PDF",
      );
    } finally {
      setBusy(false);
    }
  };

  /* =====================================================
     SHARE LINK
  ===================================================== */

  const shareLink = () =>
    `${window.location.origin}${window.location.pathname}?card=${enc(c)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        shareLink(),
      );

      flash("Link copied");
    } catch {
      flash("Copy blocked by browser");
    }
  };

  /* =====================================================
     SHARE
  ===================================================== */

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${
            c.name || "My"
          } — Digital Business Card`,
          url: shareLink(),
        });
      } catch {}
    } else {
      copyLink();
    }
  };

  /* =====================================================
     ACTIONS
  ===================================================== */

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

  /* =====================================================
     SWITCH CARD SIDE
  ===================================================== */

  const toggleSide = () => {
    setSide((current) =>
      current === "front"
        ? "back"
        : "front",
    );
  };

  return (
    <>
      {/* =================================================
          LEFT SIDEBAR
      ================================================= */}

      <aside
        className="sticky top-20 self-start hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
        style={{
          background: `linear-gradient(180deg, ${T.primary}, ${T.primary})`,
        }}
      >
        <div className="p-4 pt-6">
          <div className="mb-5 border-b border-white/10 px-2 pb-5 text-white">
            <p className="text-sm opacity-90">
              Create Your
            </p>

            <p className="text-xl font-extrabold">
              Digital Business Card
            </p>

            <p className="mt-1 text-xs leading-snug text-white/65">
              Build your identity. Share your profile
              professionally.
            </p>
          </div>

          <ol className="space-y-2.5">
            {CARD_STEPS.map(
              (step, index) => {
                const on =
                  active === step.id;

                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() =>
                        goto(step.id)
                      }
                      className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-white transition hover:bg-white/10"
                      style={
                        on
                          ? {
                              background: `${T.secondary}55`,
                              border: `1px solid ${T.secondary}`,
                            }
                          : {
                              border:
                                "1px solid transparent",
                            }
                      }
                    >
                      <span
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                        style={{
                          background:
                            on
                              ? T.accent
                              : done[index] &&
                                  index
                                ? T.secondary
                                : "rgba(255,255,255,.22)",
                        }}
                      >
                        {done[index] &&
                        index &&
                        !on ? (
                          <FaCheck
                            size={12}
                          />
                        ) : (
                          index + 1
                        )}
                      </span>

                      <step.icon
                        size={20}
                        className="shrink-0"
                      />

                      <span>
                        <span className="block text-[13px] font-bold leading-tight">
                          {step.title}
                        </span>

                        <span className="block text-[11px] leading-tight text-white/65">
                          {step.sub}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              },
            )}
          </ol>
        </div>

        <Swoosh className="-bottom-2 -left-4 h-36 w-72" />
      </aside>

      {/* =================================================
          MAIN BUSINESS CARD CONTENT
      ================================================= */}

      <main className="grid grid-cols-1 w-full max-w-full min-w-0 flex-1 items-start gap-3 p-2 sm:gap-5 sm:p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5 lg:pt-3">
        {/* CENTER FORM COLUMN */}
        <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5">
          {/* =================================================
              SECTION 1
          ================================================= */}

          <CardSection
            id="c-org"
            no="1"
            title="Organization"
            sub="Choose your company and department to get started."
            icon={FaBuilding}
            theme={T}
            right={
              <div className="hidden gap-1.5 sm:flex">
                {done.map(
                  (
                    complete,
                    index,
                  ) => (
                    <span
                      key={index}
                      className="h-1 w-8 rounded"
                      style={{
                        background:
                          complete
                            ? T.secondary
                            : T.border,
                      }}
                    />
                  ),
                )}
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

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DEPTS.map(
                ({ id, icon }) => (
                  <Choice
                    key={id}
                    on={
                      c.dept === id ||
                      (id.toLowerCase().startsWith("oper") && (c.dept || "").toLowerCase().startsWith("oper"))
                    }
                    onClick={() =>
                      setField(
                        "dept",
                        id,
                      )
                    }
                    icon={icon}
                    theme={T}
                  >
                    {id}
                  </Choice>
                ),
              )}
            </div>

            <div
              className="mt-5 rounded-md border p-4"
              style={{
                borderColor:
                  T.border,
                background:
                  T.primaryLight,
              }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    company?.logo ||
                    "/aarambh.png"
                  }
                  alt={
                    company?.fullName ||
                    "Company"
                  }
                  className="h-12 w-auto max-w-[190px] object-contain"
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
                    {company?.fullName ||
                      "AarambhGrow Group of Companies"}
                  </p>
                </div>
              </div>
            </div>
          </CardSection>

          {/* =================================================
              SECTION 2
          ================================================= */}

          <CardSection
            id="c-info"
            no="2"
            title="Personal Information"
            sub="Enter your details"
            icon={FaUser}
            theme={T}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <CardField
                label="Full Name"
                icon={FaUser}
                value={c.name}
                onChange={(value) =>
                  setField(
                    "name",
                    value,
                  )
                }
                placeholder="Your Name"
                theme={T}
              />

              <CardField
                label="Designation"
                icon={FaBriefcase}
                value={c.designation}
                onChange={(value) =>
                  setField(
                    "designation",
                    value,
                  )
                }
                placeholder="Your Designation"
                theme={T}
              />

              <CardField
                label="Phone Number"
                icon={FaPhone}
                type="tel"
                value={c.phone}
                onChange={(value) =>
                  setField(
                    "phone",
                    value,
                  )
                }
                placeholder="+91 98765 43210"
                theme={T}
              />

              <CardField
                label="Email Address"
                icon={FaEnvelope}
                type="email"
                value={c.email}
                onChange={(value) =>
                  setField(
                    "email",
                    value,
                  )
                }
                placeholder="you@domain.com"
                theme={T}
              />

              <CardField
                label="Website"
                optional
                icon={FaGlobe}
                value={c.website}
                onChange={(value) =>
                  setField(
                    "website",
                    value,
                  )
                }
                placeholder="www.yourwebsite.com"
                theme={T}
              />

              <CardField
                label="Address"
                optional
                icon={FaLocationDot}
                value={c.address}
                onChange={(value) =>
                  setField(
                    "address",
                    value,
                  )
                }
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

          {/* =================================================
              SECTION 3
          ================================================= */}

          <CardSection
            id="c-photo"
            no="3"
            title="Photo & Appearance"
            sub="Choose your card appearance"
            icon={FaEye}
            theme={T}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p
                  className="mb-2 text-xs font-bold"
                  style={{
                    color: T.primary,
                  }}
                >
                  Card Orientation
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <Choice
                    on={
                      orientation ===
                      "landscape"
                    }
                    onClick={() =>
                      setOrientation(
                        "landscape",
                      )
                    }
                    icon={FaIdCard}
                    theme={T}
                  >
                    Landscape
                  </Choice>

                  <Choice
                    on={
                      orientation ===
                      "portrait"
                    }
                    onClick={() =>
                      setOrientation(
                        "portrait",
                      )
                    }
                    icon={FaIdBadge}
                    theme={T}
                  >
                    Portrait
                  </Choice>
                </div>
              </div>

              <div>
                <p
                  className="mb-2 text-xs font-bold"
                  style={{
                    color: T.primary,
                  }}
                >
                  Card Side
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <Choice
                    on={
                      side === "front"
                    }
                    onClick={() =>
                      setSide("front")
                    }
                    icon={FaIdCard}
                    theme={T}
                  >
                    Front
                  </Choice>

                  <Choice
                    on={
                      side === "back"
                    }
                    onClick={() =>
                      setSide("back")
                    }
                    icon={FaIdBadge}
                    theme={T}
                  >
                    Back
                  </Choice>
                </div>
              </div>
            </div>
          </CardSection>

          {/* =================================================
              GENERATE PREVIEW
          ================================================= */}

          <button
            type="button"
            onClick={() => {
              goto("c-out");
            }}
            className="inline-flex w-full items-center justify-center gap-3 rounded-md py-4 text-sm font-bold text-white shadow-lg transition hover:brightness-110 active:scale-[0.99]"
            style={{
              background: T.gradient,
            }}
          >
            <FaWandMagicSparkles
              size={15}
            />
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
              <FaCheck
                color={T.accent}
                size={10}
              />
              High-resolution PNG &amp;
              PDF
            </span>

            <span className="inline-flex items-center gap-1.5">
              <FaCheck
                color={T.secondary}
                size={10}
              />
              Company Certified
            </span>
          </p>
        </div>

        {/* =================================================
            RIGHT PREVIEW COLUMN
        ================================================= */}

        <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5 lg:sticky lg:top-20 self-start">
          {/* =================================================
              LIVE PREVIEW
          ================================================= */}

          <section
            id="c-out"
            className="scroll-mt-24 rounded-md border bg-white p-3.5 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
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
                  background:
                    T.secondaryLight,
                  color:
                    T.secondary,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background:
                      T.accent,
                  }}
                />
                REAL-TIME
              </span>
            </div>

            {/* SIDE INDICATOR */}

            <div className="mb-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setSide("front")
                }
                className="rounded-full px-4 py-1.5 text-[11px] font-bold transition"
                style={
                  side === "front"
                    ? {
                        background:
                          T.primary,
                        color:
                          "#fff",
                      }
                    : {
                        background:
                          T.primaryLight,
                        color:
                          T.primary,
                      }
                }
              >
                Front
              </button>

              <button
                type="button"
                onClick={() =>
                  setSide("back")
                }
                className="rounded-full px-4 py-1.5 text-[11px] font-bold transition"
                style={
                  side === "back"
                    ? {
                        background:
                          T.primary,
                        color:
                          "#fff",
                      }
                    : {
                        background:
                          T.primaryLight,
                        color:
                          T.primary,
                      }
                }
              >
                Back
              </button>
            </div>

            {/* CARD PREVIEW */}

            <div
              className="mx-auto w-full"
              style={{
                maxWidth:
                  orientation ===
                  "portrait"
                    ? 300
                    : "100%",
              }}
            >
              <div
                style={{
                  position:
                    "relative",
                  width: "100%",
                  aspectRatio: `${W} / ${H}`,
                  overflow:
                    "hidden",
                  borderRadius:
                    "8px",
                  cursor:
                    "pointer",
                  background:
                    "#fff",
                }}
                onClick={
                  toggleSide
                }
                title="Click card to switch side"
              >
                {side ===
                  "front" && (
                  <div
                    key="preview-front"
                    data-card-preview-front
                    className="absolute inset-0 h-full w-full"
                    style={{
                      animation:
                        "cardSideIn .28s ease-out",
                    }}
                  >
                    <CardFront
                      data={
                        cardData
                      }
                      orientation={
                        orientation
                      }
                      company={
                        company
                      }
                      theme={T}
                    />
                  </div>
                )}

                {side ===
                  "back" && (
                  <div
                    key="preview-back"
                    data-card-preview-back
                    className="absolute inset-0 h-full w-full"
                    style={{
                      animation:
                        "cardSideIn .28s ease-out",
                    }}
                  >
                    <CardBack
                      data={
                        cardData
                      }
                      orientation={
                        orientation
                      }
                      company={
                        company
                      }
                      theme={T}
                    />
                  </div>
                )}
              </div>
            </div>

            <p
              className="mt-3 text-center text-[10px]"
              style={{
                color: T.muted,
              }}
            >
              Click the card or use Front /
              Back to switch sides
            </p>

            {/* DIRECT MOBILE ACTION BUTTONS (MOBILE ONLY) */}
            <div className="mt-3 sm:hidden space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={downloadPNG}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 rounded-md p-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
                  style={{ background: T.primary }}
                >
                  <FaDownload size={13} />
                  <span>Download PNG</span>
                </button>
                <button
                  type="button"
                  onClick={downloadPDF}
                  disabled={busy}
                  className="flex items-center justify-center gap-1.5 rounded-md p-2.5 text-xs font-bold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-50"
                  style={{ background: `linear-gradient(90deg, ${T.secondary}, ${T.primary})` }}
                >
                  <FaFilePdf size={13} />
                  <span>Download PDF</span>
                </button>
              </div>

              {(note || busy) && (
                <p
                  className="pt-1 text-center text-[11px] font-semibold"
                  style={{
                    color: T.secondary,
                  }}
                >
                  {busy ? "Preparing file…" : note}
                </p>
              )}
            </div>
          </section>

          {/* =================================================
              COMPANY PORTAL
          ================================================= */}

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
                borderColor:
                  T.border,
              }}
            >
              <FaBuilding />
              {company?.name ||
                "Company"}{" "}
              Portal
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <p
                  className="text-sm font-extrabold"
                  style={{
                    color:
                      T.primary,
                  }}
                >
                  {company?.fullName ||
                    "AarambhGrow Group of Companies"}
                </p>

                <p
                  className="text-xs"
                  style={{
                    color:
                      T.muted,
                  }}
                >
                  Full-Stack Support &amp;
                  Business Solutions
                </p>

                <div className="mt-3 flex gap-2">
                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background:
                        T.primaryLight,
                      color:
                        T.primary,
                    }}
                  >
                    {company?.name ||
                      "Company"}
                  </span>

                  <span
                    className="rounded-full px-4 py-1 text-[11px] font-semibold"
                    style={{
                      background:
                        T.secondaryLight,
                      color:
                        T.secondary,
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
                <img
                  src={
                    company?.logo ||
                    "/aarambh.png"
                  }
                  alt={
                    company?.fullName ||
                    "Company"
                  }
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <p
              className="mt-3 text-[11px]"
              style={{
                color: T.muted,
              }}
            >
              Your profile appears across all
              company platforms
            </p>
          </section>

          {/* =================================================
              DOWNLOAD ACTIONS
          ================================================= */}

          <section
            className="rounded-md border bg-white p-2 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
            style={{
              borderColor: T.border,
              background: T.surface,
            }}
          >
            <div
              className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-0 sm:divide-x"
              style={{
                borderColor: T.border,
              }}
            >
              {actions.map(
                ({
                  label,
                  icon: Icon,
                  fn,
                }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={fn}
                    disabled={busy}
                    className="flex items-center justify-center gap-1.5 rounded p-2 sm:px-2 sm:py-3 text-[11px] sm:text-xs font-semibold transition hover:bg-slate-50 disabled:opacity-50 border sm:border-0"
                    style={{
                      borderColor: T.border,
                      color:
                        T.primary,
                    }}
                  >
                    <Icon size={15} className="shrink-0" />
                    <span className="truncate">{label}</span>
                  </button>
                ),
              )}
            </div>

            {(note || busy) && (
              <p
                className="px-3 pb-2 text-center text-[11px] font-semibold"
                style={{
                  color:
                    T.secondary,
                }}
              >
                {busy
                  ? "Preparing file…"
                  : note}
              </p>
            )}
          </section>
        </div>
      </main>

      {/* QUICK JUMP TO LIVE PREVIEW (MOBILE ONLY) */}
      <div className="lg:hidden sticky bottom-4 z-30 flex justify-end px-3 pointer-events-none">
        <button
          type="button"
          onClick={() => {
            const outElem = document.getElementById("c-out");
            outElem?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="pointer-events-auto flex items-center gap-1.5 rounded-full py-2.5 px-4 text-xs font-bold text-white shadow-2xl transition active:scale-95"
          style={{
            background: T.primary,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          <FaEye size={13} />
          <span>View Preview</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* =====================================================
          HIDDEN EXPORT STAGE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed"
        style={{
          left: "-12000px",
          top: 0,
          width: W,
          minHeight:
            H * 2 + 40,
          overflow:
            "visible",
          zIndex: -1000,
        }}
      >
        {/* FRONT */}

        <div
          data-card-export-front
          style={{
            position:
              "relative",
            width: W,
            height: H,
            overflow:
              "hidden",
            background:
              "#fff",
          }}
        >
          <CardFront
            data={cardData}
            orientation={
              orientation
            }
            company={
              company
            }
            theme={T}
          />
        </div>

        {/* BACK */}

        <div
          data-card-export-back
          style={{
            position:
              "relative",
            width: W,
            height: H,
            marginTop: 20,
            overflow:
              "hidden",
            background:
              "#fff",
          }}
        >
          <CardBack
            data={cardData}
            orientation={
              orientation
            }
            company={
              company
            }
            theme={T}
          />
        </div>
      </div>

      {/* ANIMATION */}

      <style jsx>{`
        @keyframes cardSideIn {
          0% {
            opacity: 0;
            transform: scale(0.985)
              translateY(4px);
          }

          100% {
            opacity: 1;
            transform: scale(1)
              translateY(0);
          }
        }
      `}</style>
    </>
  );
}

/* =========================================================
   MAIN HOME SHELL
========================================================= */

export default function HomeShell() {
  const defaultCompany =
    COMPANY_CONFIG[
      DEFAULT_COMPANY_ID
    ] || COMPANY_OPTIONS[0];

  const [mode, setMode] =
    useState("dp");

  const [profile, setProfile] =
    useState({
      company:
        DEFAULT_COMPANY_ID,

      dept: "Sales",

      name: "",

      designation: "",

      photo: "",

      gender: "Male",

      theme: "Navy",

      phone: "",

      email: "",

      website:
        defaultCompany?.data
          ?.website || "",

      branch:
        defaultCompany?.branches?.[0]?.name ||
        defaultCompany?.data
          ?.branch ||
        "",

      address:
        defaultCompany?.branches?.[0]?.address ||
        defaultCompany?.data
          ?.address ||
        "",

      logo:
        defaultCompany?.logo ||
        "",
    });

  const selectedCompany =
    COMPANY_CONFIG[
      profile.company
    ] || defaultCompany;

  const T =
    selectedCompany?.theme ||
    DEFAULT_THEME;

  /* =====================================================
     PROFILE UPDATE
  ===================================================== */

  const setProfileField = (
    key,
    value,
  ) => {
    setProfile(
      (previous) => ({
        ...previous,
        [key]: value,
      }),
    );
  };

  /* =====================================================
     COMPANY CHANGE
  ===================================================== */

  const changeCompany = (
    companyId,
  ) => {
    const next =
      COMPANY_CONFIG[
        companyId
      ] || defaultCompany;

    const defaultBranch = next?.branches?.[0];

    setProfile(
      (previous) => ({
        ...previous,

        company:
          next.id ||
          companyId,

        website:
          next?.data
            ?.website || "",

        branch:
          defaultBranch?.name ||
          next?.data
            ?.branch ||
          "",

        address:
          defaultBranch?.address ||
          next?.data
            ?.address ||
          "",

        phone:
          defaultBranch?.phone ||
          next?.data
            ?.phone ||
          previous.phone ||
          "",

        logo:
          next?.logo || "",
      }),
    );

    setReady(false);
  };

  const [active, setActive] =
    useState("s-org");

  const [ready, setReady] =
    useState(false);

  const [cardOrientation, setCardOrientation] =
    useState("landscape");

  /* =====================================================
     ACTIVE STEP OBSERVER
  ===================================================== */

  useEffect(() => {
    const steps =
      mode === "card"
        ? CARD_STEPS
        : STEPS;

    const elements = steps
      .map((step) =>
        document.getElementById(
          step.id,
        ),
      )
      .filter(Boolean);

    if (!elements.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          const visible =
            entries.find(
              (entry) =>
                entry.isIntersecting,
            );

          if (visible) {
            setActive(
              visible.target.id,
            );
          }
        },
        {
          rootMargin:
            "-20% 0px -60% 0px",
        },
      );

    elements.forEach((element) =>
      observer.observe(element),
    );

    return () =>
      observer.disconnect();
  }, [mode]);

  /* =====================================================
     GOTO
  ===================================================== */

  const goto = (id) => {
    setActive(id);

    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /* =====================================================
     MODE CHANGE
  ===================================================== */

  const changeMode = (
    nextMode,
  ) => {
    setMode(nextMode);

    setReady(false);

    if (nextMode === "card") {
      setActive("c-org");
    } else {
      setActive("s-org");
    }
  };

  /* =====================================================
     MODES
  ===================================================== */

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
      className={`min-h-screen w-full max-w-full ${plusJakartaSans.className}`}
      style={{
        background:
          T.background,
        color: T.text,
      }}
    >
      {/* ===================================================
          HEADER
      =================================================== */}

      <header
        className="sticky top-0 z-40 w-full max-w-full border-b bg-white/95 backdrop-blur-md shadow-sm relative overflow-hidden"
        style={{
          borderColor: T.border,
          background: T.surface,
        }}
      >
        <Swoosh className="right-0 top-0 h-full w-56 opacity-50 pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2 px-3 py-2 sm:min-h-20 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
          {/* LOGO & TITLE */}
          <div className="flex items-center justify-between gap-2.5 w-full sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <img
                src={selectedCompany.headerLogo}
                alt={selectedCompany.fullName}
                className="h-7 sm:h-12 w-auto max-w-[110px] sm:max-w-[180px] object-contain shrink-0"
              />

              <span className="hidden h-10 w-px bg-slate-200 sm:block" />

              <div className="min-w-0">
                <p
                  className="truncate text-sm sm:text-xl lg:text-2xl font-extrabold leading-tight"
                  style={{
                    color: T.primary,
                  }}
                >
                  Digital Profile Studio
                </p>

                <p
                  className="hidden text-xs sm:block leading-snug"
                  style={{
                    color: T.muted,
                  }}
                >
                  Your Professional Identity, Instantly
                </p>
              </div>
            </div>

            {/* MOBILE ONLY COMPANY SELECTOR */}
            <div className="flex items-center sm:hidden shrink-0">
              <div
                className="flex items-center gap-1 rounded-md border bg-white px-2 py-1 shadow-xs"
                style={{
                  borderColor: T.border,
                }}
              >
                <FaBuilding size={11} color={T.primary} />
                <select
                  value={profile.company}
                  onChange={(event) => changeCompany(event.target.value)}
                  className="max-w-[135px] bg-transparent text-[11px] font-bold outline-none cursor-pointer"
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
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-2 w-full sm:w-auto">
            {/* DESKTOP COMPANY SELECTOR */}
            <div
              className="hidden sm:flex items-center gap-2 rounded-md border bg-white px-3 py-2 shadow-sm shrink-0"
              style={{
                borderColor: T.border,
              }}
            >
              <FaBuilding size={14} color={T.primary} />

              <select
                value={profile.company}
                onChange={(event) => changeCompany(event.target.value)}
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

            {/* MODES */}
            <div className="grid grid-cols-3 gap-1.5 w-full sm:flex sm:w-auto sm:gap-2">
              {MODES.map(({ id, label, icon: Icon, bg }) => {
                const isCurrent = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => changeMode(id)}
                    className="inline-flex items-center justify-center gap-1 sm:gap-2 rounded-md px-1.5 py-2 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs font-bold text-white shadow-sm transition active:scale-[0.98]"
                    style={{
                      background: bg,
                      opacity: isCurrent ? 1 : 0.8,
                      boxShadow: isCurrent ? `0 0 0 2px #fff, 0 0 0 3.5px ${T.primary}` : undefined,
                    }}
                  >
                    <Icon size={13} className="shrink-0 sm:size-[14px]" />
                    <span className="truncate">{label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* MOBILE STICKY BLUE STEP BAR (MATCHING DESKTOP ASIDE) */}
      <div
        className="sticky top-[86px] sm:top-20 z-30 w-full overflow-x-auto no-scrollbar lg:hidden shadow-sm border-b border-white/10"
        style={{
          background: `linear-gradient(90deg, ${T.primary}, ${T.primary})`,
        }}
      >
        <div className="flex items-center justify-between gap-1 px-2.5 py-1.5 w-full min-w-full">
          {(mode === "card" ? CARD_STEPS : STEPS).map((step, index) => {
            const on = active === step.id || (step.id === "s-photo" && active === "s-avatar");
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  const targetId = step.id === "s-photo" && !document.getElementById("s-photo") ? "s-avatar" : step.id;
                  goto(targetId);
                }}
                className="flex-1 flex items-center justify-center gap-1 rounded-md px-1.5 py-1 text-[10px] font-bold transition whitespace-nowrap active:scale-95"
                style={
                  on
                    ? {
                        background: T.accent,
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
                    color: on ? T.primary : "#ffffff",
                  }}
                >
                  {index + 1}
                </span>
                <Icon size={10} className="shrink-0" />
                <span className="truncate">{step.title.split(" ")[0]}</span>
                {(step.id === "s-out" || step.id === "c-out") && (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ===================================================
          BUSINESS CARD MODE
      =================================================== */}

      {mode ===
      "card" ? (
        <div className="flex flex-col lg:flex-row w-full max-w-full min-w-0 items-start">
          <BusinessCardStudio
            company={
              selectedCompany
            }
            profile={
              profile
            }
            theme={T}
          />
        </div>
      ) : (
        <div className="flex w-full max-w-full min-w-0 items-start">
          {/* LEFT SIDEBAR */}

          <aside
            className="sticky top-20 self-start hidden h-[calc(100vh-5rem)] w-72 shrink-0 flex-col justify-between overflow-hidden lg:flex"
            style={{
              background: `linear-gradient(180deg, ${T.primary}, ${T.primary})`,
            }}
          >
            <ol className="relative space-y-2 p-3 pt-6">
              {STEPS.map(
                (
                  step,
                  index,
                ) => {
                  const on =
                    active ===
                    step.id;

                  return (
                    <li
                      key={
                        step.id
                      }
                      className="relative"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          goto(
                            step.id,
                          )
                        }
                        className="flex w-full items-center gap-3 rounded-md px-2.5 py-3 text-left text-white transition hover:bg-white/10"
                        style={
                          on
                            ? {
                                background: `${T.secondary}55`,
                                borderLeft: `4px solid ${T.accent}`,
                              }
                            : {
                                borderLeft:
                                  "4px solid transparent",
                              }
                        }
                      >
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold"
                          style={{
                            background:
                              on
                                ? T.accent
                                : "rgba(255,255,255,.25)",
                            color:
                              "#fff",
                          }}
                        >
                          {
                            index +
                              1
                          }
                        </span>

                        <step.icon
                          size={18}
                          className="shrink-0 opacity-90"
                        />

                        <span>
                          <span className="block text-[13px] font-bold leading-tight">
                            {
                              step.title
                            }
                          </span>

                          <span className="block text-[11px] leading-tight text-white/65">
                            {
                              step.sub
                            }
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                },
              )}
            </ol>

            <div className="relative p-6 pb-10 text-white">
              <p className="text-lg opacity-85">
                Build Your
              </p>

              <p className="text-xl font-extrabold leading-tight">
                Professional
                Identity
              </p>

              <p className="opacity-85">
                in Just a Few
                Clicks
              </p>

              <div
                className="mt-3 h-1 w-16 rounded"
                style={{
                  background: `linear-gradient(90deg,${T.secondary},${T.accent})`,
                }}
              />
            </div>

            <Swoosh className="-bottom-2 -left-4 h-36 w-72" />
          </aside>

          {/* GENERATOR */}

          <main className="w-full max-w-full min-w-0 flex-1">
            {mode ===
              "dp" && (
              <WhatsAppDPGenerator
                data={
                  profile
                }
                setData={
                  setProfileField
                }
                onReady={() => {
                  setReady(
                    true,
                  );

                  goto(
                    "s-out",
                  );
                }}
                ready={
                  ready
                }
                brand={
                  selectedCompany.theme
                }
                company={
                  selectedCompany
                }
                theme={T}
                onCompanyChange={changeCompany}
              />
            )}

            {mode ===
              "sig" && (
              <EmailSignatureGenerator
                data={
                  profile
                }
                setData={
                  setProfileField
                }
                onReady={() => {
                  setReady(
                    true,
                  );

                  goto(
                    "s-out",
                  );
                }}
                ready={
                  ready
                }
                brand={
                  selectedCompany.theme
                }
                company={
                  selectedCompany
                }
                theme={T}
              />
            )}
          </main>
        </div>
      )}

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer
        className="flex flex-col items-center justify-center gap-3 border-t bg-white px-4 py-4 text-center text-[11px] md:grid md:grid-cols-3 md:text-left md:px-6 lg:hidden"
        style={{
          borderColor:
            T.border,
          color: T.muted,
          background:
            T.surface,
        }}
      >
        <img
          src={
            selectedCompany.headerLogo
          }
          alt={
            selectedCompany.fullName
          }
          className="mx-auto md:mx-0 h-9 sm:h-11 w-auto object-contain"
        />

        <p className="text-center italic">
          Developed with{" "}
          <FaHeart
            className="inline"
            color={
              T.accent
            }
            size={10}
          />{" "}
          by Digital Team
          <br />
          at{" "}
          {
            selectedCompany.fullName
          }
        </p>

        <p className="text-center md:text-right">
          ©{" "}
          {new Date().getFullYear()}{" "}
          {
            selectedCompany.fullName
          }
          . All rights reserved.
          <br />

          <span
            style={{
              color:
                T.secondary,
            }}
          >
            Digital Business Card
            Studio v1.0 • For
            internal company use
            only
          </span>
        </p>
      </footer>
    </div>
  );
}