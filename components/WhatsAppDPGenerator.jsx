"use client";

import { useMemo, useRef, useState } from "react";
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
} from "react-icons/fa6";

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
  logo: "/aarambh.png",
};

const DEPTS = [
  { id: "Sales", icon: FaChartColumn },
  { id: "Admin", icon: FaUserTie },
  { id: "Operations", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
];

const COMPANY_BACKGROUNDS = {
  "aarambhgrow group of companies": "/dp-bg1.png",
  "aarambhgrow group": "/dp-bg1.png",

  "aarambhgrow advisory private limited": "/dp-bg1.png",
  "aarambhgrow advisory": "/dp-bg1.png",

  "aarambhgrow services private limited": "/dp-bg1.png",
  "aarambhgrow services": "/dp-bg1.png",

  "aarambhgrow infinity": "/infinity-bg.png",
  "aarambhgrow infinity private limited": "/infinity-bg.png",

  "nexera consultancy": "/nexera-bg.png",
  "nexera consultancy private limited": "/nexera-bg.png",

  "euroasia aquatic private limited": "/euroasia-bg.png",
  "euroasia aquatic": "/euroasia-bg.png",
};

const DEFAULT_DP_BACKGROUND = "/dp-bg1.png";
function getCompanyBackground(company, companyName) {
  if (company?.background) {
    return company.background;
  }

  if (company?.dpBackground) {
    return company.dpBackground;
  }

  if (company?.backgroundImage) {
    return company.backgroundImage;
  }

  const name = String(company?.fullName || company?.name || companyName || "")
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

  if (name.includes("aarambhgrow")) {
    return "/dp-bg1.png";
  }

  return DEFAULT_DP_BACKGROUND;
}

function hexToRgb(hex) {
  const h = String(hex || "")
    .trim()
    .replace("#", "");

  if (!/^[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(h)) {
    return null;
  }
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(v, 16);

  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mixColor(c1, c2, t) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  if (!a || !b) return c1;
  const m = (i) => Math.round(a[i] + (b[i] - a[i]) * t);
  return `rgb(${m(0)}, ${m(1)}, ${m(2)})`;
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

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: T.border || BRAND.border,
      }}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: `linear-gradient(135deg,${T.primary},${T.secondary})`,
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
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-4 text-xs font-semibold transition"
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
          className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-white"
          style={{
            background: T.secondary,
          }}
        >
          ✓
        </span>
      )}
      <Icon size={20} />
      {children}
    </button>
  );
}

function Field({ label, icon: Icon, value, onChange, placeholder, type = "text", theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <label className="block">
      <span
        className="mb-1.5 block text-xs font-bold"
        style={{
          color: T.primary,
        }}
      >
        {label}
      </span>

      <span
        className="flex items-center gap-3 rounded-md border bg-white px-3.5 py-3"
        style={{
          borderColor: T.border || BRAND.border,
        }}
      >
        <Icon size={14} color={T.primary} />

        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none"
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
}) {
  const T = theme || company?.theme || DEFAULT_THEME;
  const canvasRef = useRef(null);
  const [localData, setLocalData] = useState({
    ...DEFAULT_DATA,
    ...initialData,
  });
  const [note, setNote] = useState("");
  const data = {
    ...DEFAULT_DATA,
    ...(externalData || localData),
    company: company?.fullName || externalData?.company || localData.company || DEFAULT_DATA.company,
    logo: company?.logo || externalData?.logo || localData.logo || DEFAULT_DATA.logo,
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
  }, [company?.background, company?.dpBackground, company?.backgroundImage, company?.fullName, company?.name, data.company]);

  const companyWords = useMemo(() => (data.company || "").trim().split(/\s+/).filter(Boolean), [data.company]);
  const brandWord = companyWords[0] || "";
  const companyRest = companyWords.slice(1).join(" ");
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

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const size = 1080;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const cx = size / 2;
    const cy = size / 2;
    const ORANGE = activeTheme.accent || BRAND.orange;
    const GREEN = activeTheme.secondary || BRAND.green;
    const NAVY = activeTheme.primary || BRAND.navy;
    const CREAM = "#FBFBF7";
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, size, size);

    try {
      const bgImage = new Image();
      bgImage.crossOrigin = "anonymous";
      await new Promise((resolve) => {
        bgImage.onload = resolve;
        bgImage.onerror = resolve;
        bgImage.src = DP_BACKGROUND;
      });

      if (bgImage.complete && bgImage.naturalWidth) {
        const bgRatio = Math.max(size / bgImage.naturalWidth, size / bgImage.naturalHeight);
        const bgWidth = bgImage.naturalWidth * bgRatio;
        const bgHeight = bgImage.naturalHeight * bgRatio;
        ctx.drawImage(bgImage, (size - bgWidth) / 2, (size - bgHeight) / 2, bgWidth, bgHeight);
      }
    } catch {
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, size, size);
    }

    ctx.strokeStyle = "rgba(140, 155, 140, 0.10)";
    ctx.lineCap = "round";
    ctx.lineWidth = 120;
    ctx.beginPath();
    ctx.moveTo(940, -80);
    ctx.bezierCurveTo(720, 330, 360, 500, -90, 640);
    ctx.stroke();
    ctx.lineWidth = 95;
    ctx.beginPath();
    ctx.moveTo(1130, 250);
    ctx.bezierCurveTo(820, 430, 540, 720, 400, 1140);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-20, 760);
    ctx.bezierCurveTo(220, 800, 420, 940, 640, 988);
    ctx.bezierCurveTo(830, 1020, 990, 1000, 1100, 935);
    ctx.lineTo(1100, 1120);
    ctx.lineTo(-20, 1120);
    ctx.closePath();
    ctx.fillStyle = ORANGE;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-20, 830);
    ctx.bezierCurveTo(220, 870, 420, 1010, 640, 1055);
    ctx.bezierCurveTo(830, 1085, 990, 1065, 1100, 1005);
    ctx.lineTo(1100, 1120);
    ctx.lineTo(-20, 1120);
    ctx.closePath();
    ctx.fillStyle = NAVY;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-20, 830);
    ctx.bezierCurveTo(220, 870, 420, 1010, 640, 1055);
    ctx.bezierCurveTo(830, 1085, 990, 1065, 1100, 1005);
    ctx.strokeStyle = CREAM;
    ctx.lineWidth = 16;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1100, 780);
    ctx.bezierCurveTo(880, 835, 740, 960, 500, 1000);
    ctx.bezierCurveTo(320, 1035, 140, 1030, -20, 975);
    ctx.lineTo(-20, 1120);
    ctx.lineTo(1100, 1120);
    ctx.closePath();
    ctx.fillStyle = GREEN;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(1100, 780);
    ctx.bezierCurveTo(880, 835, 740, 960, 500, 1000);
    ctx.bezierCurveTo(320, 1035, 140, 1030, -20, 975);
    ctx.strokeStyle = CREAM;
    ctx.lineWidth = 16;
    ctx.stroke();

    if (data.logo) {
      try {
        const logo = new Image();
        logo.crossOrigin = "anonymous";
        await new Promise((resolve) => {
          logo.onload = resolve;
          logo.onerror = resolve;
          logo.src = data.logo;
        });

        if (logo.complete && logo.naturalWidth) {
          const boxW = 290;
          const boxH = 235;
          const ratio = Math.min(boxW / logo.naturalWidth, boxH / logo.naturalHeight);
          const w = logo.naturalWidth * ratio;
          const h = logo.naturalHeight * ratio;
          ctx.drawImage(logo, (size - w) / 2, 150 + (boxH - h) / 2, w, h);
        }
      } catch {}
    }

    ctx.textAlign = "center";

    if (brandWord) {
      ctx.fillStyle = NAVY;
      ctx.font = '800 56px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillText(brandWord, cx, 452);
    }

    if (companyRest) {
      ctx.font = '600 25px "Plus Jakarta Sans", Arial, sans-serif';
      const label = companyRest.toUpperCase().split("").join(" ");
      const labelWidth = ctx.measureText(label).width;
      ctx.fillStyle = NAVY;
      ctx.fillText(label, cx, 500);
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.strokeStyle = ORANGE;
      ctx.beginPath();
      ctx.moveTo(cx - labelWidth / 2 - 62, 491);
      ctx.lineTo(cx - labelWidth / 2 - 26, 491);
      ctx.stroke();
      ctx.strokeStyle = GREEN;
      ctx.beginPath();
      ctx.moveTo(cx + labelWidth / 2 + 26, 491);
      ctx.lineTo(cx + labelWidth / 2 + 62, 491);
      ctx.stroke();
    }

    const memberName = data.name || "Your Name";
    let nameSize = 98;
    ctx.font = `800 ${nameSize}px "Plus Jakarta Sans", Arial, sans-serif`;
    while (ctx.measureText(memberName).width > 760 && nameSize > 52) {
      nameSize -= 4;
      ctx.font = `800 ${nameSize}px "Plus Jakarta Sans", Arial, sans-serif`;
    }

    ctx.fillStyle = NAVY;

    ctx.fillText(memberName, cx, 612);

    /* =====================================================
       ORANGE / GREEN DIVIDER
       ===================================================== */

    const dy = 668;

    ctx.lineCap = "round";

    ctx.lineWidth = 7;

    /* Orange */

    ctx.strokeStyle = ORANGE;

    ctx.beginPath();

    ctx.moveTo(cx - 250, dy);

    ctx.lineTo(cx - 52, dy);

    ctx.stroke();

    /* Green */

    ctx.strokeStyle = GREEN;

    ctx.beginPath();

    ctx.moveTo(cx + 52, dy);

    ctx.lineTo(cx + 250, dy);

    ctx.stroke();

    /* Leaf */

    drawLeaf(ctx, cx, dy, 26, ORANGE, GREEN);

    /* =====================================================
       DESIGNATION
       ===================================================== */

    const memberRole = data.designation || "Your Designation";

    let roleSize = 42;

    ctx.font = `600 ${roleSize}px "Plus Jakarta Sans", Arial, sans-serif`;

    while (ctx.measureText(memberRole).width > 640 && roleSize > 26) {
      roleSize -= 2;

      ctx.font = `600 ${roleSize}px "Plus Jakarta Sans", Arial, sans-serif`;
    }

    ctx.fillStyle = NAVY;

    ctx.fillText(memberRole, cx, 736);

    return canvas;
  };

  /* =========================================================
     DOWNLOAD
     ========================================================= */

  const downloadDP = async () => {
    try {
      const canvas = await drawCanvas();

      if (!canvas) return;

      const fileName = (data.name || "whatsapp-dp")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");

      const link = document.createElement("a");

      link.download = `${fileName || "whatsapp-dp"}-whatsapp-dp.png`;

      link.href = canvas.toDataURL("image/png");

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      setNote("PNG downloaded successfully");

      setTimeout(() => {
        setNote("");
      }, 2200);
    } catch (error) {
      console.error("WhatsApp DP download failed:", error);

      setNote("Could not create PNG");
    }
  };

  /* =========================================================
     RESET
     ========================================================= */

  const reset = () => {
    const resetData = {
      ...DEFAULT_DATA,
      ...initialData,
    };

    if (externalSetData) {
      Object.entries(resetData).forEach(([key, value]) => {
        externalSetData(key, value);
      });
    } else {
      setLocalData(resetData);
    }

    setNote("");
  };

  /* =========================================================
     GENERATE PREVIEW
     ========================================================= */

  const generatePreview = () => {
    if (typeof onReady === "function") {
      onReady();
    }
  };

  /* =========================================================
     UI
     ========================================================= */

  return (
    <div className="grid min-w-0 gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5">
      {/* =====================================================
          LEFT SIDE
          ===================================================== */}

      <div className="space-y-5">
        {/* ORGANIZATION */}

        <Section
          id="s-org"
          no="1"
          title="Organization"
          sub="Choose your company and department to get started."
          icon={FaBuilding}
          theme={activeTheme}
        >
          <p
            className="mb-2 flex items-center gap-2 text-xs font-bold"
            style={{
              color: activeTheme.primary,
            }}
          >
            <FaBuilding />
            Department Type
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DEPTS.map(({ id, icon }) => (
              <Choice key={id} selected={data.dept === id} onClick={() => updateData("dept", id)} icon={icon} theme={activeTheme}>
                {id}
              </Choice>
            ))}
          </div>

          {/* SELECTED COMPANY */}

          <div
            className="mt-5 flex items-center gap-3 rounded-md border p-4"
            style={{
              borderColor: activeTheme.border,

              background: activeTheme.primaryLight,
            }}
          >
            <img
              src={company?.logo || "/aarambh.png"}
              alt={company?.fullName || "Company"}
              className="h-10 w-auto max-w-[170px] object-contain"
            />

            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold"
                style={{
                  color: activeTheme.muted,
                }}
              >
                Selected Company
              </p>

              <p
                className="truncate text-sm font-extrabold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                {company?.fullName || data.company}
              </p>
            </div>
          </div>
        </Section>

        {/* PERSONAL INFORMATION */}

        <Section id="s-info" no="2" title="Personal Information" sub="Enter your details." icon={FaUser} theme={activeTheme}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              icon={FaUser}
              value={data.name}
              onChange={(value) => updateData("name", value)}
              placeholder="Your Name"
              theme={activeTheme}
            />

            <Field
              label="Designation"
              icon={FaUserTie}
              value={data.designation}
              onChange={(value) => updateData("designation", value)}
              placeholder="Your Designation"
              theme={activeTheme}
            />
          </div>
        </Section>

        {/* BRANDING */}

        <Section
          id="s-theme"
          no="3"
          title="Branding & Theme"
          sub="Your company theme colors and background are applied to the DP automatically."
          icon={FaImage}
          theme={activeTheme}
        >
          <div
            className="rounded-md border p-4"
            style={{
              borderColor: activeTheme.border,

              background: activeTheme.background,
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-10 w-10 rounded-full"
                style={{
                  backgroundImage: `url("${DP_BACKGROUND}")`,

                  backgroundSize: "cover",

                  backgroundPosition: "center",

                  border: `5px solid ${activeTheme.secondary}`,
                }}
              />

              <div>
                <p
                  className="text-sm font-extrabold"
                  style={{
                    color: activeTheme.primary,
                  }}
                >
                  {company?.name || "AarambhGrow"}
                </p>

                <p
                  className="text-xs"
                  style={{
                    color: activeTheme.muted,
                  }}
                >
                  Company-specific theme and background are automatically loaded.
                </p>

                <p
                  className="mt-1 text-[10px] font-semibold"
                  style={{
                    color: activeTheme.secondary,
                  }}
                >
                  
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* GENERATE */}

        {!ready && (
          <button
            type="button"
            onClick={generatePreview}
            className="flex w-full items-center justify-center gap-2 rounded-md py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: `linear-gradient(90deg,${activeTheme.secondary},${activeTheme.primary})`,
            }}
          >
            <FaEye />
            Generate WhatsApp DP Preview
          </button>
        )}

        {/* ACTIONS */}

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button
            type="button"
            onClick={downloadDP}
            className="flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
            style={{
              background: activeTheme.primary,
            }}
          >
            <FaDownload />
            Download PNG
          </button>

          <button
            type="button"
            onClick={reset}
            className="grid min-w-12 place-items-center rounded-md border bg-white"
            style={{
              borderColor: activeTheme.border,

              color: activeTheme.primary,
            }}
            title="Reset"
            aria-label="Reset"
          >
            <FaArrowsRotate size={15} />
          </button>
        </div>

        {/* NOTE */}

        {note && (
          <div
            className="rounded-md border p-3 text-center text-xs font-bold"
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
          RIGHT SIDE / PREVIEW
          ===================================================== */}

      <section
        id="s-out"
        className="scroll-mt-24 min-w-0 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
        style={{
          borderColor: activeTheme.border,
        }}
      >
        {/* PREVIEW HEADER */}

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full shadow-md"
              style={{
                background: activeTheme.secondaryLight,

                color: activeTheme.secondary,
              }}
            >
              <FaEye size={20} />
            </div>

            <div>
              <h2
                className="text-lg font-extrabold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                Live Preview
              </h2>

              <p
                className="text-xs"
                style={{
                  color: activeTheme.muted,
                }}
              >
                Your WhatsApp DP will appear like this
              </p>
            </div>
          </div>

          <span
            className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold sm:inline-flex"
            style={{
              background: activeTheme.secondaryLight,

              color: activeTheme.secondary,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: activeTheme.secondary,
              }}
            />
            REAL-TIME
          </span>
        </div>

        {/* PREVIEW AREA */}

        <div
          className="flex min-h-[620px] items-center justify-center overflow-hidden rounded-md border p-6"
          style={{
            borderColor: activeTheme.border,

            background: activeTheme.primaryLight,
          }}
        >
          <div className="w-full max-w-[540px]">
            {/* SQUARE DP */}

            <div
              className="mx-auto aspect-square w-full max-w-[500px] overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url("${DP_BACKGROUND}")`,

                backgroundSize: "cover",

                backgroundPosition: "center",

                backgroundRepeat: "no-repeat",

                containerType: "inline-size",
              }}
            >
              <div className="relative h-full w-full overflow-hidden">
                {/* CONTENT */}

                <div
                  className="relative z-10 flex h-full flex-col items-center justify-center text-center"
                  style={{
                    paddingBottom: "17cqw",
                  }}
                >
                  {/* LOGO */}

                  {data.logo && (
                    <img
                      src={data.logo}
                      alt={company?.fullName || "Company logo"}
                      className="object-contain"
                      style={{
                        width: "27cqw",
                        marginBottom: "2cqw",
                      }}
                    />
                  )}

                  {/* NAME */}

                  <h3
                    className="break-words font-extrabold leading-tight"
                    style={{
                      color: activeTheme.primary,

                      fontSize: "9.2cqw",

                      marginTop: "4cqw",

                      maxWidth: "82cqw",
                    }}
                  >
                    {data.name || "Your Name"}
                  </h3>

                  {/* DIVIDER */}

                  <div
                    className="flex items-center"
                    style={{
                      marginTop: "3cqw",

                      gap: "2.5cqw",
                    }}
                  >
                    {/* ORANGE */}

                    <span
                      style={{
                        width: "18cqw",

                        height: "0.65cqw",

                        borderRadius: 999,

                        background: activeTheme.accent,
                      }}
                    />

                    {/* LEAF */}

                    <svg
                      viewBox="0 0 40 40"
                      style={{
                        width: "5cqw",

                        height: "5cqw",
                      }}
                    >
                      <path d="M20 34 C6 26 6 14 13 5 C19 12 20 22 20 34 Z" fill={activeTheme.accent} />

                      <path d="M20 34 C34 26 34 14 27 5 C21 12 20 22 20 34 Z" fill={activeTheme.secondary} />
                    </svg>

                    {/* GREEN */}

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

                  <p
                    className="font-semibold"
                    style={{
                      color: activeTheme.primary,

                      fontSize: "3.9cqw",

                      marginTop: "3cqw",
                    }}
                  >
                    {data.designation || "Your Designation"}
                  </p>
                </div>
              </div>
            </div>

            <p
              className="mt-4 text-center text-xs font-semibold"
              style={{
                color: activeTheme.muted,
              }}
            >
              1080 × 1080 px • Ready for WhatsApp profile use
            </p>
          </div>
        </div>

        {/* INFO */}

        <div
          className="mt-5 rounded-md border p-4"
          style={{
            borderColor: activeTheme.border,

            background: activeTheme.background,
          }}
        >
          <div className="flex items-center gap-3">
            <FaImage color={activeTheme.accent} />

            <div>
              <p
                className="text-sm font-bold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                WhatsApp DP
              </p>

              <p
                className="text-xs"
                style={{
                  color: activeTheme.muted,
                }}
              >
                Professional profile identity • PNG export
              </p>
            </div>
          </div>
        </div>

        {/* HIDDEN CANVAS */}

        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
}
