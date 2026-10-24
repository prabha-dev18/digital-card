"use client";

import { useMemo, useRef, useState, useEffect } from "react";

import {
  FaArrowsRotate,
  FaBuilding,
  FaChartColumn,
  FaDownload,
  FaEye,
  FaGear,
  FaImage,
  FaUser,
  FaUserTie,
  FaPeopleGroup,
  FaCheck,
  FaShareNodes,
} from "react-icons/fa6";

import { COMPANY_OPTIONS, COMPANY_CONFIG } from "../lib/companyConfig";

const BRAND = {
  orange: "#F26522",
  green: "#157327",
  navy: "#03254C",
  white: "#FFFFFF",
  page: "#F4F7FB",
  border: "#E2E8F0",
  muted: "#64748B",
  navySoft: "#EAF1F8",
  orangeSoft: "#FFF1E8",
  greenSoft: "#EAF5EC",
};

const DEFAULT_THEME = {
  background: BRAND.white,
  primary: BRAND.navy,
  secondary: BRAND.green,
  accent: BRAND.orange,
  primaryLight: BRAND.navySoft,
  secondaryLight: BRAND.greenSoft,
  accentLight: BRAND.orangeSoft,
  border: BRAND.border,
  text: "#334155",
  muted: BRAND.muted,
};

const DEFAULT_DATA = {
  dept: "Sales",
  name: "Your Name",
  designation: "Your Designation",
  company: "AarambhGrow Group of Companies",
  logo: "/aarambh2.png",
};

const DEPTS = [
  { id: "Sales", icon: FaChartColumn },
  { id: "Admin", icon: FaUserTie },
  { id: "Operations", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
];

const COMPANY_BACKGROUNDS = {
  aarambhgrow: "/dp-bg1.png",
  "aarambhgrow group of companies": "/dp-bg1.png",
  "aarambhgrow group": "/dp-bg1.png",

  advisory: "/dp-bg1.png",
  "aarambhgrow advisory private limited": "/dp-bg1.png",
  "aarambhgrow advisory": "/dp-bg1.png",

  services: "/dp-bg1.png",
  "aarambhgrow services private limited": "/dp-bg1.png",
  "aarambhgrow services": "/dp-bg1.png",

  infinity: "/infinity-bg.png",
  "aarambhgrow infinity": "/infinity-bg.png",
  "aarambhgrow infinity private limited": "/infinity-bg.png",

  nexera: "/nexera-bg.png",
  "nexera consultancy": "/nexera-bg.png",
  "nexera consultancy private limited": "/nexera-bg.png",

  euroasia: "/euroasia-bg.png",
  "euroasia aquatic private limited": "/euroasia-bg.png",
  "euroasia aquatic": "/euroasia-bg.png",
};

const COMPANY_LOGOS = {
  aarambhgrow: "/aarambh2.png",
  "aarambhgrow group of companies": "/aarambh2.png",
  "aarambhgrow group": "/aarambh2.png",

  advisory: "/advisory2.png",
  "aarambhgrow advisory": "/advisory2.png",
  "aarambhgrow advisory private limited": "/advisory2.png",

  services: "/service2.png",
  "aarambhgrow services": "/service2.png",
  "aarambhgrow services private limited": "/service2.png",

  infinity: "/infinity.png",
  "aarambhgrow infinity": "/infinity.png",
  "aarambhgrow infinity private limited": "/infinity.png",

  nexera: "/nexera2.png",
  "nexera consultancy": "/nexera2.png",
  "nexera consultancy private limited": "/nexera2.png",

  euroasia: "/euroasia.png",
  "euroasia aquatic": "/euroasia.png",
  "euroasia aquatic private limited": "/euroasia.png",
};

const COMPANY_LOGO_VARIANTS = {
  aarambhgrow: [
    { label: "Wide Banner", src: "/aarambh2.png" },
    { label: "Stacked Icon", src: "/aarambh.png" },
  ],
  advisory: [
    { label: "Wide Banner", src: "/advisory2.png" },
    { label: "Stacked Icon", src: "/advisory.png" },
  ],
  services: [
    { label: "Wide Banner", src: "/service2.png" },
    { label: "Stacked Icon", src: "/service.png" },
  ],
  infinity: [
    { label: "Compact Logo", src: "/infinity.png" },
    { label: "Wide Banner", src: "/infinity2.png" },
  ],
  nexera: [
    { label: "Wide Banner", src: "/nexera2.png" },
    { label: "Stacked Icon", src: "/nexera.png" },
  ],
  euroasia: [{ label: "Standard Logo", src: "/euroasia.png" }],
};

/* =========================================================
   PER-COMPANY DP LOGO SIZING & POSITIONING
   - AarambhGrow Group: Increased to match visual presence of Services/Advisory
   - Services: Benchmark reference sizing (balanced & crisp)
   - Advisory: Matched with Services
   - Nexera Consultancy: Decreased to eliminate overpowering size
   - EuroAsia Aquatic: Decreased to prevent wide stretching
   - Infinity: Balanced proportions
   ========================================================= */
const DP_LOGO_LAYOUT = {
  aarambhgrow: {
    // Increased canvas box to offset transparent padding inside aarambh2.png
    boxW: 760,
    boxH: 500,
    offsetY: 25,
    previewStyle: {
      maxWidth: "70cqw",
      maxHeight: "100%",
      transform: "scale(1.30)",
    },
  },
  services: {
    // Benchmark size
    boxW: 510,
    boxH: 240,
    offsetY: 120,
    previewStyle: {
      maxWidth: "50cqw",
      maxHeight: "82%",
      transform: "none",
    },
  },
  advisory: {
    // Balanced with services
    boxW: 490,
    boxH: 250,
    offsetY: 115,
    previewStyle: {
      maxWidth: "46cqw",
      maxHeight: "80%",
      transform: "none",
    },
  },
  infinity: {
    boxW: 440,
    boxH: 270,
    offsetY: 100,
    previewStyle: {
      maxWidth: "42cqw",
      maxHeight: "85%",
      transform: "none",
    },
  },
  nexera: {
    // Decreased size as requested
    boxW: 410,
    boxH: 195,
    offsetY: 145,
    previewStyle: {
      maxWidth: "39cqw",
      maxHeight: "72%",
      transform: "none",
    },
  },
  euroasia: {
    // Decreased size as requested
    boxW: 420,
    boxH: 135,
    offsetY: 175,
    previewStyle: {
      maxWidth: "39cqw",
      maxHeight: "65%",
      transform: "none",
    },
  },
};

function resolveCompanyKey(company, rawKey) {
  const key = String(company?.id || rawKey || "")
    .trim()
    .toLowerCase();

  if (key === "infinity" || key.includes("infinity")) return "infinity";
  if (key === "nexera" || key.includes("nexera")) return "nexera";
  if (key === "euroasia" || key.includes("euroasia")) return "euroasia";
  if (key === "advisory" || key.includes("advisory")) return "advisory";
  if (key === "services" || key.includes("services")) return "services";
  return "aarambhgrow";
}

const DEFAULT_DP_BACKGROUND = "/dp-bg1.png";

function getCompanyBackground(company, companyName) {
  if (company?.dpBackground) {
    return company.dpBackground;
  }
  if (company?.background) {
    return company.background;
  }
  if (company?.backgroundImage) {
    return company.backgroundImage;
  }

  const name = String(company?.id || company?.fullName || company?.name || companyName || "")
    .trim()
    .toLowerCase();

  if (COMPANY_BACKGROUNDS[name]) {
    return COMPANY_BACKGROUNDS[name];
  }

  if (name.includes("infinity")) {
    return "/infinity-bg.png";
  }
  if (name.includes("nexera")) {
    return "/nexera-bg.png";
  }
  if (name.includes("euroasia")) {
    return "/euroasia-bg.png";
  }
  if (name.includes("advisory")) {
    return "/dp-bg1.png";
  }
  if (name.includes("services")) {
    return "/dp-bg1.png";
  }
  if (name.includes("aarambhgrow") || name.includes("aarambh")) {
    return "/dp-bg1.png";
  }

  return DEFAULT_DP_BACKGROUND;
}

function getCompanyDefaultLogo(company, companyName) {
  if (company?.dpLogo) {
    return company.dpLogo;
  }
  if (company?.cardLogo) {
    return company.cardLogo;
  }

  const name = String(company?.id || company?.fullName || company?.name || companyName || "")
    .trim()
    .toLowerCase();

  if (COMPANY_LOGOS[name]) {
    return COMPANY_LOGOS[name];
  }

  if (name.includes("infinity")) {
    return "/infinity.png";
  }
  if (name.includes("nexera")) {
    return "/nexera2.png";
  }
  if (name.includes("euroasia")) {
    return "/euroasia.png";
  }
  if (name.includes("advisory")) {
    return "/advisory2.png";
  }
  if (name.includes("services")) {
    return "/service2.png";
  }
  if (name.includes("aarambh")) {
    return "/aarambh2.png";
  }

  return company?.logo || "/aarambh2.png";
}

function drawLeaf(ctx, x, y, s, leftColor, rightColor) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.55);
  ctx.quadraticCurveTo(x - s, y + s * 0.05, x - s * 0.5, y - s * 0.6);
  ctx.quadraticCurveTo(x - s * 0.02, y - s * 0.45, x, y + s * 0.55);
  ctx.closePath();
  ctx.fillStyle = leftColor;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x, y + s * 0.55);
  ctx.quadraticCurveTo(x + s, y + s * 0.05, x + s * 0.5, y - s * 0.6);
  ctx.quadraticCurveTo(x + s * 0.02, y - s * 0.45, x, y + s * 0.55);
  ctx.closePath();
  ctx.fillStyle = rightColor;
  ctx.fill();
  ctx.restore();  
}

function loadCanvasImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => resolve(img);
    img.onerror = () => {
      const fallback = new Image();
      fallback.onload = () => resolve(fallback);
      fallback.onerror = (err) => {
        console.warn("Failed to load canvas image:", src, err);
        resolve(null);
      };
      fallback.src = src;
    };

    if (src.startsWith("data:") || src.startsWith("blob:")) {
      img.src = src;
    } else {
      const sep = src.includes("?") ? "&" : "?";
      img.src = `${src}${sep}_v=${Date.now()}`;
    }
  });
}

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-lg border bg-white p-4 shadow-[0_4px_20px_rgba(3,37,76,.06)] sm:p-5"
      style={{
        borderColor: T.border || BRAND.border,
      }}
    >
      <div className="mb-3.5 flex items-center gap-3 sm:mb-4 sm:gap-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-white shadow-md sm:h-12 sm:w-12"
          style={{
            background: `linear-gradient(135deg,${T.primary},${T.secondary})`,
          }}
        >
          <Icon size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <h2
            className="truncate text-base font-extrabold sm:text-lg"
            style={{
              color: T.primary,
            }}
          >
            {no}. {title}
          </h2>

          <p
            className="text-[11px] sm:text-xs leading-snug"
            style={{
              color: T.muted || BRAND.muted,
            }}
          >
            {sub}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function Choice({ selected, onClick, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-w-0 min-h-[64px] sm:min-h-[74px] flex-col items-center justify-center gap-1 rounded-md border-2 p-2.5 sm:py-3.5 text-xs font-semibold transition active:scale-[0.98]"
      style={
        selected
          ? {
              background: `linear-gradient(135deg,${T.primary},${T.secondary})`,
              borderColor: T.primary,
              color: "#FFFFFF",
            }
          : {
              background: "#FFFFFF",
              borderColor: T.border || BRAND.border,
              color: T.primary,
            }
      }
    >
      {selected && (
        <span
          className="absolute right-1.5 top-1.5 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full text-[10px] text-white"
          style={{
            background: T.secondary,
          }}
        >
          ✓
        </span>
      )}

      {Icon && <Icon size={18} className="shrink-0" />}

      <span className="truncate">{children}</span>
    </button>
  );
}

function Field({ label, icon: Icon, value, onChange, placeholder, type = "text", theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <label className="block min-w-0">
      <span
        className="mb-1.5 block text-xs font-bold"
        style={{
          color: T.primary,
        }}
      >
        {label}
      </span>

      <span
        className="flex min-w-0 items-center gap-2.5 rounded-md border bg-white px-3 py-2.5 sm:px-3.5 sm:py-3"
        style={{
          borderColor: T.border || BRAND.border,
        }}
      >
        <Icon size={14} color={T.primary} className="shrink-0" />

        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          style={{
            color: T.text || "#334155",
          }}
        />
      </span>
    </label>
  );
}

export default function WhatsAppDPGenerator({
  initialData = DEFAULT_DATA,
  data: externalData,
  setData: externalSetData,
  onReady,
  ready = false,
  company,
  theme,
  onCompanyChange,
}) {
  const T = theme || company?.theme || DEFAULT_THEME;
  const canvasRef = useRef(null);

  const [localData, setLocalData] = useState({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const [customLogo, setCustomLogo] = useState(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const companyKey = useMemo(() => {
    return String(company?.id || externalData?.company || localData.company || "aarambhgrow")
      .trim()
      .toLowerCase();
  }, [company?.id, externalData?.company, localData.company]);

  const canonicalKey = useMemo(() => {
    return resolveCompanyKey(company, companyKey);
  }, [company, companyKey]);

  const activeLogoLayout = DP_LOGO_LAYOUT[canonicalKey] || DP_LOGO_LAYOUT.aarambhgrow;

  const defaultCompanyLogo = useMemo(() => {
    return getCompanyDefaultLogo(company, canonicalKey);
  }, [company, canonicalKey]);

  const activeLogo = customLogo || defaultCompanyLogo;

  useEffect(() => {
    setCustomLogo(null);
  }, [companyKey]);

  const data = {
    ...DEFAULT_DATA,
    ...(externalData || localData),
    company: company?.fullName || externalData?.company || localData.company || DEFAULT_DATA.company,
    logo: activeLogo,
  };

  const activeTheme = useMemo(
    () => ({
      background: T.background || "#FFFFFF",
      primary: T.primary || BRAND.navy,
      secondary: T.secondary || BRAND.green,
      accent: T.accent || BRAND.orange,
      primaryLight: T.primaryLight || BRAND.navySoft,
      secondaryLight: T.secondaryLight || BRAND.greenSoft,
      accentLight: T.accentLight || BRAND.orangeSoft,
      border: T.border || BRAND.border,
      text: T.text || "#334155",
      muted: T.muted || BRAND.muted,
    }),
    [T],
  );

  const DP_BACKGROUND = useMemo(() => {
    return getCompanyBackground(company, data.company);
  }, [company, data.company]);

  const updateData = (key, value) => {
    if (externalSetData) {
      externalSetData(key, value);
    } else {
      setLocalData((previous) => ({
        ...previous,
        [key]: value,
      }));
    }
  };

  const handleSelectCompany = (comp) => {
    if (typeof onCompanyChange === "function") {
      onCompanyChange(comp.id);
    } else if (externalSetData) {
      externalSetData("company", comp.id);
    } else {
      setLocalData((prev) => ({
        ...prev,
        company: comp.fullName,
      }));
    }
    setCustomLogo(null);
  };

  /*
   * =========================================================
   * DRAW DOWNLOAD CANVAS (1080 x 1080)
   * =========================================================
   */
  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const cx = size / 2;
    const ORANGE = activeTheme.accent || BRAND.orange;
    const GREEN = activeTheme.secondary || BRAND.green;
    const NAVY = activeTheme.primary || BRAND.navy;
    const CREAM = "#FBFBF7";

    ctx.clearRect(0, 0, size, size);

    // 1. Background Fill & Image
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, size, size);

    try {
      const bgImage = await loadCanvasImage(DP_BACKGROUND);
      if (bgImage && bgImage.naturalWidth) {
        const bgRatio = Math.max(size / bgImage.naturalWidth, size / bgImage.naturalHeight);
        const bgWidth = bgImage.naturalWidth * bgRatio;
        const bgHeight = bgImage.naturalHeight * bgRatio;
        ctx.drawImage(bgImage, (size - bgWidth) / 2, (size - bgHeight) / 2, bgWidth, bgHeight);
      }
    } catch (err) {
      console.warn("Background drawing fallback applied:", err);
    }

    // 2. Company Logo (Per-company responsive bounding box & positioning)
    if (activeLogo) {
      try {
        const logo = await loadCanvasImage(activeLogo);
        if (logo && logo.naturalWidth) {
          const layout = DP_LOGO_LAYOUT[canonicalKey] || DP_LOGO_LAYOUT.aarambhgrow;
          const boxW = layout.boxW;
          const boxH = layout.boxH;
          const ratio = Math.min(boxW / logo.naturalWidth, boxH / logo.naturalHeight);
          const w = logo.naturalWidth * ratio;
          const h = logo.naturalHeight * ratio;

          const logoX = (size - w) / 2;
          const logoY = layout.offsetY + (boxH - h) / 2;
          ctx.drawImage(logo, logoX, logoY, w, h);
        }
      } catch (error) {
        console.error("Logo canvas drawing failed:", error);
      }
    }

    // 3. Member Name
    const memberName = data.name || "Your Name";
    let nameSize = 98;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = `800 ${nameSize}px "Plus Jakarta Sans", Arial, sans-serif`;

    while (ctx.measureText(memberName).width > 760 && nameSize > 48) {
      nameSize -= 4;
      ctx.font = `800 ${nameSize}px "Plus Jakarta Sans", Arial, sans-serif`;
    }

    ctx.fillStyle = NAVY;
    ctx.fillText(memberName, cx, 555);

    // 4. Accent Divider Lines & Center Leaf
    const dy = 595;
    ctx.lineCap = "round";
    ctx.lineWidth = 7;

    // Left orange line
    ctx.strokeStyle = ORANGE;
    ctx.beginPath();
    ctx.moveTo(cx - 180, dy);
    ctx.lineTo(cx - 52, dy);
    ctx.stroke();

    // Right green line
    ctx.strokeStyle = GREEN;
    ctx.beginPath();
    ctx.moveTo(cx + 52, dy);
    ctx.lineTo(cx + 180, dy);
    ctx.stroke();

    // Center leaf emblem
    drawLeaf(ctx, cx, dy, 26, ORANGE, GREEN);

    // 5. Designation / Role
    const memberRole = data.designation || "Your Designation";
    let roleSize = 42;
    ctx.font = `600 ${roleSize}px "Plus Jakarta Sans", Arial, sans-serif`;

    while (ctx.measureText(memberRole).width > 640 && roleSize > 24) {
      roleSize -= 2;
      ctx.font = `600 ${roleSize}px "Plus Jakarta Sans", Arial, sans-serif`;
    }

    ctx.fillStyle = NAVY;
    ctx.fillText(memberRole, cx, 665);

    return canvas;
  };

  /*
   * =========================================================
   * DOWNLOAD DP AS PNG
   * =========================================================
   */
  const downloadDP = async () => {
    setBusy(true);
    setNote("Generating high-resolution PNG…");

    try {
      const canvas = await drawCanvas();
      if (!canvas) throw new Error("Could not initialize canvas");

      const fileName = (data.name || "whatsapp-dp")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");

      const link = document.createElement("a");
      link.download = `${fileName || "whatsapp-dp"}-dp.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setNote("WhatsApp DP downloaded successfully!");
      setTimeout(() => setNote(""), 2600);
    } catch (error) {
      console.error("WhatsApp DP download failed:", error);
      setNote("Download failed. Please try again.");
      setTimeout(() => setNote(""), 3000);
    } finally {
      setBusy(false);
    }
  };

  /*
   * =========================================================
   * RESET
   * =========================================================
   */
  const reset = () => {
    if (externalSetData) {
      externalSetData("dept", "Sales");
      externalSetData("name", "");
      externalSetData("designation", "");
    } else {
      setLocalData((prev) => ({
        ...prev,
        dept: "Sales",
        name: "",
        designation: "",
      }));
    }
    setCustomLogo(null);
    setNote("Fields reset");
    setTimeout(() => setNote(""), 2000);
  };

  const generatePreview = () => {
    if (typeof onReady === "function") {
      onReady();
    }
    const outElem = document.getElementById("s-out");
    if (outElem) {
      outElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Available logo variants for the active company
  const logoVariants = COMPANY_LOGO_VARIANTS[canonicalKey] || [{ label: "Company Logo", src: defaultCompanyLogo }];

  return (
    <div className="grid min-w-0 gap-4 p-3 sm:gap-5 sm:p-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:p-6">
      {/* =====================================================
          LEFT COLUMN: FORM & CONTROLS
          ===================================================== */}
      <div className="space-y-4 sm:space-y-5">
        {/* SECTION 1: ORGANIZATION */}
        <Section id="s-org" no="1" title="Organization" sub="Choose your company and department." icon={FaBuilding} theme={activeTheme}>
          {/* COMPANY SELECTOR CARDS */}
          <div className="mb-4">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
              <FaBuilding size={12} />
              Select Company
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COMPANY_OPTIONS.map((c) => {
                const isSelected = (company?.id || "").toLowerCase() === c.id.toLowerCase() || canonicalKey === c.id.toLowerCase();

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCompany(c)}
                    className="flex min-h-[58px] sm:min-h-[64px] flex-col items-center justify-center rounded-md border-2 p-2 text-center transition active:scale-[0.98]"
                    style={
                      isSelected
                        ? {
                            borderColor: activeTheme.primary,
                            background: activeTheme.primaryLight,
                            color: activeTheme.primary,
                          }
                        : {
                            borderColor: activeTheme.border,
                            background: "#FFFFFF",
                            color: activeTheme.muted,
                          }
                    }
                  >
                    <img src={c.headerLogo || c.logo} alt={c.name} className="h-6 sm:h-7 w-auto max-w-[90px] object-contain mb-1" />
                    <span className="truncate text-[11px] font-bold w-full" style={{ color: isSelected ? activeTheme.primary : undefined }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DEPARTMENT TYPE */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
              <FaPeopleGroup size={13} />
              Department Type
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {DEPTS.map(({ id, icon }) => (
                <Choice key={id} selected={data.dept === id} onClick={() => updateData("dept", id)} icon={icon} theme={activeTheme}>
                  {id}
                </Choice>
              ))}
            </div>
          </div>

          {/* CURRENT ACTIVE COMPANY CARD */}
          <div
            className="mt-4 flex items-center gap-3 rounded-md border p-3 sm:p-4"
            style={{
              borderColor: activeTheme.border,
              background: activeTheme.primaryLight,
            }}
          >
            <img
              src={activeLogo}
              alt={company?.fullName || "Selected Company"}
              className="h-9 sm:h-11 w-auto max-w-[120px] sm:max-w-[150px] object-contain shrink-0"
            />

            <div className="min-w-0 flex-1">
              <span className="text-[10px] sm:text-[11px] font-semibold block" style={{ color: activeTheme.muted }}>
                Selected Company
              </span>

              <p className="truncate text-xs sm:text-sm font-extrabold" style={{ color: activeTheme.primary }}>
                {company?.fullName || data.company}
              </p>
            </div>
          </div>
        </Section>

        {/* SECTION 2: PERSONAL INFORMATION */}
        <Section
          id="s-info"
          no="2"
          title="Personal Information"
          sub="Enter your full name and designation."
          icon={FaUser}
          theme={activeTheme}
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <Field
              label="Full Name"
              icon={FaUser}
              value={data.name}
              onChange={(value) => updateData("name", value)}
              placeholder="e.g. John Doe"
              theme={activeTheme}
            />

            <Field
              label="Designation / Role"
              icon={FaUserTie}
              value={data.designation}
              onChange={(value) => updateData("designation", value)}
              placeholder="e.g. Senior Business Advisor"
              theme={activeTheme}
            />
          </div>
        </Section>

        {/* SECTION 3: BRANDING & LOGO SELECTION */}
        <Section
          id="s-theme"
          no="3"
          title="Branding & Logo"
          sub="Company theme, background, and logo are automatically configured."
          icon={FaImage}
          theme={activeTheme}
        >
          {/* LOGO VARIANT SELECTION (IF MULTIPLE LOGOS EXIST) */}
          {logoVariants.length > 1 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-bold" style={{ color: activeTheme.primary }}>
                Logo Variant on DP
              </p>

              <div className="grid grid-cols-2 gap-2">
                {logoVariants.map((variant) => {
                  const isCurrent = activeLogo === variant.src;
                  return (
                    <button
                      key={variant.src}
                      type="button"
                      onClick={() => setCustomLogo(variant.src)}
                      className="flex items-center gap-2.5 rounded-md border-2 p-2 sm:p-3 transition active:scale-[0.98]"
                      style={
                        isCurrent
                          ? {
                              borderColor: activeTheme.secondary,
                              background: activeTheme.secondaryLight,
                            }
                          : {
                              borderColor: activeTheme.border,
                              background: "#FFFFFF",
                            }
                      }
                    >
                      <img src={variant.src} alt={variant.label} className="h-7 w-auto max-w-[65px] object-contain shrink-0" />
                      <div className="min-w-0 text-left">
                        <span className="block text-xs font-bold truncate" style={{ color: activeTheme.primary }}>
                          {variant.label}
                        </span>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold" style={{ color: activeTheme.secondary }}>
                            <FaCheck size={9} /> Active
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIVE BRANDING SUMMARY */}
          <div
            className="rounded-md border p-3 sm:p-4"
            style={{
              borderColor: activeTheme.border,
              background: activeTheme.background,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-11 w-11 shrink-0 rounded-full shadow-inner"
                style={{
                  backgroundImage: `url("${DP_BACKGROUND}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: `3px solid ${activeTheme.secondary}`,
                }}
              />

              <div className="min-w-0">
                <p className="truncate text-xs sm:text-sm font-extrabold" style={{ color: activeTheme.primary }}>
                  {company?.name || "AarambhGrow"} Theme & Background
                </p>

                <p className="text-[11px] leading-tight" style={{ color: activeTheme.muted }}>
                  Background asset and brand colors are dynamically matched to your company.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* GENERATE PREVIEW BUTTON */}
        {!ready && (
          <button
            type="button"
            onClick={generatePreview}
            className="flex w-full items-center justify-center gap-2 rounded-md py-3.5 sm:py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:brightness-105 active:scale-[0.99]"
            style={{
              background: `linear-gradient(90deg,${activeTheme.secondary},${activeTheme.primary})`,
            }}
          >
            <FaEye />
            Generate WhatsApp DP Preview
          </button>
        )}

        {/* ACTION BUTTONS (DOWNLOAD & RESET) */}
        <div className="grid grid-cols-[1fr_auto] gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={downloadDP}
            disabled={busy}
            className="flex items-center justify-center gap-2 rounded-md px-4 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
            style={{
              background: activeTheme.primary,
            }}
          >
            <FaDownload />
            {busy ? "Preparing…" : "Download 1080×1080 PNG"}
          </button>

          <button
            type="button"
            onClick={reset}
            className="grid min-w-[48px] sm:min-w-[54px] place-items-center rounded-md border bg-white transition hover:bg-slate-50 active:scale-[0.98]"
            style={{
              borderColor: activeTheme.border,
              color: activeTheme.primary,
            }}
            title="Reset Information"
            aria-label="Reset Information"
          >
            <FaArrowsRotate size={16} />
          </button>
        </div>

        {/* STATUS NOTE */}
        {note && (
          <div
            className="rounded-md border p-3 text-center text-xs font-bold animate-in fade-in"
            style={{
              borderColor: activeTheme.secondary,
              background: activeTheme.secondaryLight,
              color: activeTheme.secondary,
            }}
          >
            {note}
          </div>
        )}
      </div>

      {/* =====================================================
          RIGHT COLUMN: LIVE PREVIEW
          ===================================================== */}
      <section
        id="s-out"
        className="scroll-mt-24 min-w-0 rounded-lg border bg-white p-4 shadow-[0_4px_20px_rgba(3,37,76,.06)] sm:p-5"
        style={{
          borderColor: activeTheme.border,
        }}
      >
        {/* PREVIEW HEADER */}
        <div className="mb-3.5 flex items-center justify-between gap-3 sm:mb-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full shadow-md sm:h-12 sm:w-12"
              style={{
                background: activeTheme.secondaryLight,
                color: activeTheme.secondary,
              }}
            >
              <FaEye size={18} />
            </div>

            <div className="min-w-0">
              <h2
                className="text-base font-extrabold sm:text-lg"
                style={{
                  color: activeTheme.primary,
                }}
              >
                Live Preview
              </h2>

              <p
                className="text-[11px] sm:text-xs leading-snug"
                style={{
                  color: activeTheme.muted,
                }}
              >
                Your WhatsApp DP will appear like this
              </p>
            </div>
          </div>

          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold"
            style={{
              background: activeTheme.secondaryLight,
              color: activeTheme.secondary,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full animate-pulse"
              style={{
                background: activeTheme.secondary,
              }}
            />
            REAL-TIME
          </span>
        </div>

        {/* PREVIEW CANVAS CONTAINER */}
        <div
          className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-md border p-3 sm:min-h-[520px] sm:p-6"
          style={{
            borderColor: activeTheme.border,
            background: activeTheme.primaryLight,
          }}
        >
          <div className="w-full max-w-[480px]">
            {/* SQUARE WHATSAPP DP CONTAINER (RESPONSIVE CONTAINER QUERIES) */}
            <div
              className="mx-auto aspect-square w-full max-w-[480px] overflow-hidden rounded-xl shadow-2xl transition-all"
              style={{
                backgroundImage: `url("${DP_BACKGROUND}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                containerType: "inline-size",
              }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <div
                  className="relative z-10 flex w-full flex-col items-center text-center"
                  style={{
                    height: "74%",
                    paddingTop: "8%",
                  }}
                >
                  {/* LOGO (SCALES SAFELY VIA CONTAINER QUERIES & BALANCED PER-COMPANY TUNING) */}
                  {activeLogo && (
                    <div
                      className="flex w-full items-center justify-center px-4"
                      style={{
                        height: "52%",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={activeLogo}
                        alt={company?.fullName || "Company logo"}
                        className="max-h-full w-auto h-auto object-contain drop-shadow-sm transition-all"
                        style={{
                          maxHeight: activeLogoLayout.previewStyle.maxHeight,
                          maxWidth: activeLogoLayout.previewStyle.maxWidth,
                          transform: activeLogoLayout.previewStyle.transform || "none",
                        }}
                      />
                    </div>
                  )}

                  {/* MEMBER NAME */}
                  <div
                    className="flex w-full items-center justify-center px-3"
                    style={{
                      height: "17%",
                      flexShrink: 0,
                    }}
                  >
                    <h3
                      className="break-words font-extrabold leading-tight"
                      style={{
                        color: activeTheme.primary,
                        fontSize: "9.2cqw",
                        maxWidth: "85cqw",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {data.name || "Your Name"}
                    </h3>
                  </div>

                  {/* ORANGE & GREEN DIVIDER + LEAF */}
                  <div
                    className="flex w-full items-center justify-center"
                    style={{
                      height: "7%",
                      gap: "2cqw",
                      padding: 0,
                      margin: 0,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        width: "18cqw",
                        height: "0.65cqw",
                        borderRadius: 999,
                        background: activeTheme.accent,
                      }}
                    />

                    <svg
                      viewBox="0 0 40 40"
                      style={{
                        width: "5cqw",
                        height: "5cqw",
                        flexShrink: 0,
                      }}
                    >
                      <path d="M20 34 C6 26 6 14 13 5 C19 12 20 22 20 34 Z" fill={activeTheme.accent} />
                      <path d="M20 34 C34 26 34 14 27 5 C21 12 20 22 20 34 Z" fill={activeTheme.secondary} />
                    </svg>

                    <span
                      style={{
                        width: "18cqw",
                        height: "0.65cqw",
                        borderRadius: 999,
                        background: activeTheme.secondary,
                      }}
                    />
                  </div>

                  {/* DESIGNATION */}
                  <div
                    className="flex w-full items-center justify-center px-3"
                    style={{
                      height: "10%",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      className="font-semibold"
                      style={{
                        color: activeTheme.primary,
                        fontSize: "3.9cqw",
                        maxWidth: "85cqw",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {data.designation || "Your Designation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* DIRECT MOBILE DOWNLOAD BUTTON BELOW PREVIEW */}
            <div className="mt-3.5 sm:hidden">
              <button
                type="button"
                onClick={downloadDP}
                disabled={busy}
                className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold text-white shadow-md transition active:scale-[0.99] disabled:opacity-50"
                style={{
                  background: activeTheme.primary,
                }}
              >
                <FaDownload />
                {busy ? "Generating…" : "Download 1080×1080 DP"}
              </button>
            </div>

            <p
              className="mt-3 text-center text-[11px] font-semibold sm:mt-4 sm:text-xs"
              style={{
                color: activeTheme.muted,
              }}
            >
              1080 × 1080 px • Ready for WhatsApp Profile use
            </p>
          </div>
        </div>

        {/* METADATA / INFO FOOTER */}
        <div
          className="mt-4 rounded-md border p-3 sm:p-4"
          style={{
            borderColor: activeTheme.border,
            background: activeTheme.background,
          }}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <FaImage color={activeTheme.accent} size={16} className="shrink-0" />

            <div>
              <p
                className="text-xs sm:text-sm font-bold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                WhatsApp Profile Identity
              </p>

              <p
                className="text-[10px] sm:text-xs"
                style={{
                  color: activeTheme.muted,
                }}
              >
                Formatted for square &amp; circular WhatsApp avatars • Ultra high-res PNG export
              </p>
            </div>
          </div>
        </div>

        {/* HIDDEN CANVAS FOR EXPORT */}
        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
}
