"use client";

import { useMemo, useRef, useState, useEffect } from "react";

import {
  FaArrowsRotate,
  FaBuilding,
  FaChartColumn,
  FaDownload,
  FaEye,
  FaGear,
  FaUser,
  FaUserTie,
  FaPeopleGroup,
  FaTag,
  FaVenus,
  FaMars,
  FaCamera,
  FaTrash,
  FaIdBadge,
  FaLaptopCode,
} from "react-icons/fa6";

import { COMPANY_OPTIONS } from "../lib/companyConfig";
import { DEFAULT_MALE_AVATAR, DEFAULT_FEMALE_AVATAR } from "../lib/defaultAvatars";

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
  gender: "Male",
  photo: "",
  logo: "/aarambh2.png",
};

export const DEPARTMENT_THEMES = {
  Sales: {
    id: "Sales",
    label: "Sales",
    colorLabel: "Green",
    colorHex: "#0B4D1E",
    colorDot: "#15803D",
    buttonActiveBg: "linear-gradient(135deg, #0E5E26, #052B10)",
    buttonActiveTextColor: "#FFFFFF",
    theme: {
      primary: "#052B10",
      secondary: "#0D5C1E",
      accent: "#0B4D1E",
      primaryLight: "#EBF5EE",
      secondaryLight: "#D4EADB",
      accentLight: "#E8F5EB",
      border: "#76C795",
      text: "#052B10",
      muted: "#3E6649",
    },
    canvasBgStart: "#EBF5EE",
    canvasBgEnd: "#D4EADB",
    radialEdgeColor: "rgba(11, 77, 30, 0.25)",
    previewBgGradient: "linear-gradient(145deg, #EBF5EE 0%, #D4EADB 55%, #A9D7B7 100%)",
    borderColor: "#0B4D1E",
    badgeRingColor: "#0B4D1E",
    badgeTextColor: "#FFFFFF",
    badgeBg: "#0B4D1E",
    badgeText: "#FFFFFF",
    badgeBorder: "#0B4D1E",
    bgImageAlpha: 0.82,
    description: "Fixed Dark Green badge with matching Dark Green DP background",
  },
  Admin: {
    id: "Admin",
    label: "Admin",
    colorLabel: "Blue",
    colorHex: "#0B306F",
    colorDot: "#1D4ED8",
    buttonActiveBg: "linear-gradient(135deg, #104393, #001B44)",
    buttonActiveTextColor: "#FFFFFF",
    theme: {
      primary: "#001B44",
      secondary: "#0B306F",
      accent: "#104393",
      primaryLight: "#EAF2FC",
      secondaryLight: "#D2E3F9",
      accentLight: "#E9F1FC",
      border: "#8DBBF8",
      text: "#001B44",
      muted: "#3E5780",
    },
    canvasBgStart: "#EAF2FC",
    canvasBgEnd: "#D2E3F9",
    radialEdgeColor: "rgba(11, 48, 111, 0.25)",
    previewBgGradient: "linear-gradient(145deg, #EAF2FC 0%, #D2E3F9 55%, #ABCAFA 100%)",
    borderColor: "#0B306F",
    badgeRingColor: "#0B306F",
    badgeTextColor: "#FFFFFF",
    badgeBg: "#0B306F",
    badgeText: "#FFFFFF",
    badgeBorder: "#0B306F",
    bgImageAlpha: 0.82,
    description: "Fixed Dark Blue badge with matching Dark Blue DP background",
  },
  Operation: {
    id: "Operation",
    label: "Operation",
    colorLabel: "Orange",
    colorHex: "#B83806",
    colorDot: "#C2410C",
    buttonActiveBg: "linear-gradient(135deg, #C2410C, #7C2404)",
    buttonActiveTextColor: "#FFFFFF",
    theme: {
      primary: "#431407",
      secondary: "#B83806",
      accent: "#C2410C",
      primaryLight: "#FDF2EB",
      secondaryLight: "#F9DECA",
      accentLight: "#FDF4EE",
      border: "#E99B77",
      text: "#431407",
      muted: "#78422B",
    },
    canvasBgStart: "#FDF2EB",
    canvasBgEnd: "#F9DECA",
    radialEdgeColor: "rgba(184, 56, 6, 0.25)",
    previewBgGradient: "linear-gradient(145deg, #FDF2EB 0%, #F9DECA 55%, #F0C4A4 100%)",
    borderColor: "#B83806",
    badgeRingColor: "#B83806",
    badgeTextColor: "#FFFFFF",
    badgeBg: "#B83806",
    badgeText: "#FFFFFF",
    badgeBorder: "#B83806",
    bgImageAlpha: 0.82,
    description: "Fixed Dark Orange badge with matching Dark Orange DP background",
  },
  Management: {
    id: "Management",
    label: "Management",
    colorLabel: "White",
    colorHex: "#FFFFFF",
    colorDot: "#E2E8F0",
    buttonActiveBg: "linear-gradient(135deg, #334155, #0F172A)",
    buttonActiveTextColor: "#FFFFFF",
    theme: {
      primary: "#0F172A",
      secondary: "#D97706",
      accent: "#475569",
      primaryLight: "#F8FAFC",
      secondaryLight: "#F1F5F9",
      accentLight: "#FFFFFF",
      border: "#CBD5E1",
      text: "#0F172A",
      muted: "#64748B",
    },
    canvasBgStart: "#FFFFFF",
    canvasBgEnd: "#F1F5F9",
    radialEdgeColor: "rgba(15, 23, 42, 0.08)",
    previewBgGradient: "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 55%, #F1F5F9 100%)",
    borderColor: "#CBD5E1",
    badgeTextColor: "#0F172A",
    badgeBg: "#FFFFFF",
    badgeText: "#0F172A",
    badgeBorder: "#0F172A",
    bgImageAlpha: 0.95,
    description: "Fixed White badge with crisp dark lettering and White DP background",
  },
  Digital: {
    id: "Digital",
    label: "Digital",
    colorLabel: "Purple",
    colorHex: "#6B21A8",
    colorDot: "#9333EA",
    buttonActiveBg: "linear-gradient(135deg, #7E22CE, #4C1D95)",
    buttonActiveTextColor: "#FFFFFF",
    theme: {
      primary: "#3B0764",
      secondary: "#6B21A8",
      accent: "#9333EA",
      primaryLight: "#FAF5FF",
      secondaryLight: "#F3E8FF",
      accentLight: "#FAF5FF",
      border: "#D8B4FE",
      text: "#3B0764",
      muted: "#7E22CE",
    },
    canvasBgStart: "#FAF5FF",
    canvasBgEnd: "#F3E8FF",
    radialEdgeColor: "rgba(107, 33, 168, 0.25)",
    previewBgGradient: "linear-gradient(145deg, #FAF5FF 0%, #F3E8FF 55%, #E9D5FF 100%)",
    borderColor: "#6B21A8",
    badgeRingColor: "#6B21A8",
    badgeTextColor: "#FFFFFF",
    badgeBg: "#6B21A8",
    badgeText: "#FFFFFF",
    badgeBorder: "#6B21A8",
    bgImageAlpha: 0.82,
    description: "Fixed Purple badge with matching Purple DP background",
  },
};

export const DEPTS = [
  { id: "Sales", label: "Sales", icon: FaChartColumn },
  { id: "Admin", label: "Admin", icon: FaUserTie },
  { id: "Operation", label: "Operation", icon: FaGear },
  { id: "Management", label: "Management", icon: FaPeopleGroup },
  { id: "Digital", label: "Digital", icon: FaLaptopCode },
];

export function resolveDeptKey(dept) {
  const d = String(dept || "")
    .trim()
    .toLowerCase();
  if (d.includes("admin")) return "Admin";
  if (d.includes("oper")) return "Operation";
  if (d.includes("manage")) return "Management";
  if (d.includes("digit")) return "Digital";
  return "Sales";
}

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

export function getCompanySideText(company, canonicalKey) {
  const key = String(company?.id || canonicalKey || "")
    .trim()
    .toLowerCase();

  if (key === "infinity" || key.includes("infinity")) {
    return { name: "AARAMBHGROW INFINITY", left: "AARAMBHGROW INFINITY", right: "AARAMBHGROW INFINITY" };
  }
  if (key === "nexera" || key.includes("nexera")) {
    return { name: "NEXERA CONSULTANCY", left: "NEXERA CONSULTANCY", right: "NEXERA CONSULTANCY" };
  }
  if (key === "euroasia" || key.includes("euroasia")) {
    return { name: "EUROASIA AQUATIC", left: "EUROASIA AQUATIC", right: "EUROASIA AQUATIC" };
  }
  if (key === "advisory" || key.includes("advisory")) {
    return { name: "AARAMBHGROW ADVISORY", left: "AARAMBHGROW ADVISORY", right: "AARAMBHGROW ADVISORY" };
  }
  if (key === "services" || key.includes("services")) {
    return { name: "AARAMBHGROW SERVICES", left: "AARAMBHGROW SERVICES", right: "AARAMBHGROW SERVICES" };
  }
  return { name: "AARAMBHGROW GROUP", left: "AARAMBHGROW GROUP", right: "AARAMBHGROW GROUP" };
}

function escapeXml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildBadgeSvg({
  name = "YOUR NAME",
  designation = "YOUR DESIGNATION",
  deptKey = "Sales",
  deptColor = "#0B4D1E",
  companyName = "AARAMBHGROW",
  companyKey = "aarambhgrow",
  gender = "Male",
  photo = null,
  isWhiteRing = false,
  showSideText = true,
  sideLeftText = "",
  sideRightText = "",
}) {
  const safeName = escapeXml((name || "YOUR NAME").trim().toUpperCase());
  const safeRole = escapeXml((designation || "YOUR DESIGNATION").trim().toUpperCase());
  const compSide = getCompanySideText({ id: companyKey, name: companyName }, companyKey);
  const companyFullName = compSide.name || "AARAMBHGROW GROUP";
  const safeLeft = escapeXml((sideLeftText || companyFullName).trim().toUpperCase());
  const safeRight = escapeXml((sideRightText || companyFullName).trim().toUpperCase());

  // Dynamic font sizing for smooth arc fitting (Increased sizes)
  const nameLen = safeName.length;
  let nameSize = 52;
  let nameSpacing = 3;
  if (nameLen > 24) {
    nameSize = 34;
    nameSpacing = 2;
  } else if (nameLen > 18) {
    nameSize = 40;
    nameSpacing = 2.5;
  } else if (nameLen > 12) {
    nameSize = 46;
    nameSpacing = 3;
  }

  const roleLen = safeRole.length;
  let roleSize = 54;
  let roleSpacing = 3;
  if (roleLen > 26) {
    roleSize = 38;
    roleSpacing = 1.5;
  } else if (roleLen > 20) {
    roleSize = 44;
    roleSpacing = 2;
  } else if (roleLen > 14) {
    roleSize = 48;
    roleSpacing = 2.5;
  }

  // Font sizing for company name on side arcs (Increased size)
  const compLen = Math.max(safeLeft.length, safeRight.length);
  let sideSize = 28;
  let sideSpacing = 2.5;
  if (compLen > 24) {
    sideSize = 20;
    sideSpacing = 1.2;
  } else if (compLen > 18) {
    sideSize = 24;
    sideSpacing = 1.8;
  } else if (compLen > 12) {
    sideSize = 26;
    sideSpacing = 2;
  }

  // Sleek, refined medium-bold font style (not excessively bold)
  const FONT_FAMILY = "'Montserrat', 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";
  const FONT_WEIGHT = "600";

  const ringFill = isWhiteRing ? "#FFFFFF" : deptColor;
  const ringTextColor = isWhiteRing ? "#0F172A" : "#FFFFFF";
  const ringLineStroke = isWhiteRing ? "#0F172A" : "#FFFFFF";
  const innerBg = isWhiteRing ? "#FFFFFF" : "#F6F2EE";

  // Use user's personal uploaded photo if available, otherwise use EXACT default avatar
  const avatarSrc = photo || (gender === "Female" ? DEFAULT_FEMALE_AVATAR : DEFAULT_MALE_AVATAR);

  return `<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Top Arc (Designation): Clockwise from left to right along top (R=430) -->
    <path id="badge-top-arc" d="M 110,540 A 430,430 0 0,1 970,540" fill="none" />
    
    <!-- Bottom Arc (Full Name): Optical center in lower curve (R=466) -->
    <path id="badge-bottom-arc" d="M 74,540 A 466,466 0 0,0 1006,540" fill="none" />

    <!-- Left Arc (Company name): Spans left 90 degrees (R=440) -->
    <path id="badge-left-arc" d="M 229,851 A 440,440 0 0,1 229,229" fill="none" />
    <!-- Right Arc (Company name): Spans right 90 degrees (R=440) -->
    <path id="badge-right-arc" d="M 851,229 A 440,440 0 0,1 851,851" fill="none" />

    <!-- Inner circle clip path for avatar (R=353) -->
    <clipPath id="avatar-clip">
      <circle cx="540" cy="540" r="353" />
    </clipPath>
  </defs>

  <!-- Outer circle with department color (Edge-to-edge pure circular DP, R=540) -->
  <circle cx="540" cy="540" r="540" fill="${ringFill}" />

  <!-- ONLY ONE clean white ring framing the avatar -->
  <circle cx="540" cy="540" r="356" fill="${innerBg}" stroke="${ringLineStroke}" stroke-width="${isWhiteRing ? "5" : "6"}" />

  <!-- Avatar clipped inside the inner circle -->
  <g clip-path="url(#avatar-clip)">
    <image href="${avatarSrc}" x="187" y="187" width="706" height="706" preserveAspectRatio="xMidYMid slice" />
  </g>

  <!-- TOP DESIGNATION (ARCUATE TEXT) -->
  <text fill="${ringTextColor}" font-family="${FONT_FAMILY}" font-weight="${FONT_WEIGHT}" font-size="${roleSize}" letter-spacing="${roleSpacing}">
    <textPath href="#badge-top-arc" startOffset="50%" text-anchor="middle">
      ${safeRole}
    </textPath>
  </text>

  <!-- BOTTOM FULL NAME (ARCUATE TEXT) -->
  <text fill="${ringTextColor}" font-family="${FONT_FAMILY}" font-weight="${FONT_WEIGHT}" font-size="${nameSize}" letter-spacing="${nameSpacing}">
    <textPath href="#badge-bottom-arc" startOffset="50%" text-anchor="middle">
      ${safeName}
    </textPath>
  </text>

  <!-- BOTH SIDES: Full Company Name -->
  ${
    showSideText
      ? `
  <text fill="${ringTextColor}" font-family="${FONT_FAMILY}" font-weight="${FONT_WEIGHT}" font-size="${sideSize}" letter-spacing="${sideSpacing}" opacity="${isWhiteRing ? "0.85" : "0.92"}">
    <textPath href="#badge-left-arc" startOffset="50%" text-anchor="middle">
      ${safeLeft}
    </textPath>
  </text>
  <text fill="${ringTextColor}" font-family="${FONT_FAMILY}" font-weight="${FONT_WEIGHT}" font-size="${sideSize}" letter-spacing="${sideSpacing}" opacity="${isWhiteRing ? "0.85" : "0.92"}">
    <textPath href="#badge-right-arc" startOffset="50%" text-anchor="middle">
      ${safeRight}
    </textPath>
  </text>
  `
      : ""
  }
</svg>`;
}

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 w-full min-w-0 max-w-full overflow-hidden rounded-lg border bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgba(3,37,76,.06)]"
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
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [localData, setLocalData] = useState({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [showSideText, setShowSideText] = useState(true);

  const companyKey = useMemo(() => {
    return String(company?.id || externalData?.company || localData.company || "aarambhgrow")
      .trim()
      .toLowerCase();
  }, [company?.id, externalData?.company, localData.company]);

  const canonicalKey = useMemo(() => {
    return resolveCompanyKey(company, companyKey);
  }, [company, companyKey]);

  const defaultSide = useMemo(() => {
    return getCompanySideText(company, canonicalKey);
  }, [company, canonicalKey]);

  const [sideLeftCustom, setSideLeftCustom] = useState("");
  const [sideRightCustom, setSideRightCustom] = useState("");
  const [mobileTab, setMobileTab] = useState("form");

  // Keep side text in sync with company-wise branding
  useEffect(() => {
    const s = getCompanySideText(company, canonicalKey);
    setSideLeftCustom(s.left);
    setSideRightCustom(s.right);
  }, [canonicalKey, company]);

  const data = {
    ...DEFAULT_DATA,
    ...(externalData || localData),
    gender: (externalData && externalData.gender) || localData.gender || "Male",
    photo: (externalData && externalData.photo) || localData.photo || "",
    company: company?.fullName || externalData?.company || localData.company || DEFAULT_DATA.company,
  };

  const activeDeptKey = resolveDeptKey(data.dept);
  const activeDeptConfig = DEPARTMENT_THEMES[activeDeptKey] || DEPARTMENT_THEMES.Sales;
  const activeTheme = theme || DEFAULT_THEME;

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

  const handleSelectDept = (deptId) => {
    updateData("dept", deptId);
  };

  const handleSelectGender = (gender) => {
    updateData("gender", gender);
  };

  // Personal photo upload: ONLY changes photo, leaves company, designation, department color untouched!
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setNote("Personal photo should be less than 10MB");
      setTimeout(() => setNote(""), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        updateData("photo", base64);
        setNote("Personal photo uploaded! Crest structure, designation & colors preserved.");
        setTimeout(() => setNote(""), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  // Revert back to default Male or Female profile picture
  const handleRemovePhoto = () => {
    updateData("photo", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setNote(`Reverted to default ${data.gender || "Male"} profile picture`);
    setTimeout(() => setNote(""), 2400);
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
    const s = getCompanySideText(comp, comp.id);
    setSideLeftCustom(s.left);
    setSideRightCustom(s.right);
  };

  const badgeSvgString = useMemo(() => {
    return buildBadgeSvg({
      name: data.name || "YOUR NAME",
      designation: data.designation || "YOUR DESIGNATION",
      deptKey: activeDeptKey,
      deptColor: activeDeptConfig.badgeRingColor || activeDeptConfig.colorHex,
      companyName: company?.name || company?.fullName || "AARAMBHGROW",
      companyKey: canonicalKey,
      gender: data.gender || "Male",
      photo: data.photo || null,
      isWhiteRing: activeDeptKey === "Management",
      showSideText: showSideText,
      sideLeftText: sideLeftCustom || defaultSide.left,
      sideRightText: sideRightCustom || defaultSide.right,
    });
  }, [
    data.name,
    data.designation,
    activeDeptKey,
    activeDeptConfig,
    company?.name,
    company?.fullName,
    canonicalKey,
    data.gender,
    data.photo,
    showSideText,
    sideLeftCustom,
    sideRightCustom,
    defaultSide.left,
    defaultSide.right,
  ]);

  const drawCanvas = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, size, size);

    const encodedSvg = encodeURIComponent(badgeSvgString).replace(/'/g, "%27").replace(/"/g, "%22");
    const dataUri = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

    const img = new Image();
    img.crossOrigin = "anonymous";

    await new Promise((resolve) => {
      img.onload = () => resolve(img);
      img.onerror = (err) => {
        console.warn("SVG loading warning, drawing fallback:", err);
        resolve(null);
      };
      img.src = dataUri;
    });

    if (img && img.naturalWidth) {
      ctx.drawImage(img, 0, 0, size, size);
    }

    return canvas;
  };

  const downloadDP = async () => {
    setBusy(true);
    setNote("Generating high-resolution 1080×1080 PNG…");

    try {
      const canvas = await drawCanvas();
      if (!canvas) throw new Error("Could not initialize canvas");
      const fileName = (data.name || "whatsapp-dp")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-_]/g, "");

      const link = document.createElement("a");
      link.download = `${fileName || "whatsapp-dp"}-${activeDeptConfig.id.toLowerCase()}-crest.png`;
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

  const reset = () => {
    if (externalSetData) {
      externalSetData("dept", "Sales");
      externalSetData("gender", "Male");
      externalSetData("photo", "");
      externalSetData("name", "Your Name");
      externalSetData("designation", "Your Designation");
    } else {
      setLocalData((prev) => ({
        ...prev,
        dept: "Sales",
        gender: "Male",
        photo: "",
        name: "Your Name",
        designation: "Your Designation",
      }));
    }
    const defSide = getCompanySideText(company, canonicalKey);
    setSideLeftCustom(defSide.left);
    setSideRightCustom(defSide.right);
    setShowSideText(true);
    setNote("Reset to default Sales crest with Male avatar");
    setTimeout(() => setNote(""), 2000);
  };

  const generatePreview = () => {
    setMobileTab("preview");
    if (typeof onReady === "function") {
      onReady();
    }
    const outElem = document.getElementById("s-out");
    if (outElem) {
      outElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="grid grid-cols-1 w-full max-w-full min-w-0 items-start gap-3 p-2 sm:gap-5 sm:p-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:p-6 lg:pt-3">
      <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5">
        {/* SECTION 1: DEPARTMENT & ORGANIZATION */}
        <Section
          id="s-org"
          no="1"
          title="Department & Organization"
          sub="Choose your department and company."
          icon={FaBuilding}
          theme={activeTheme}
        >
          {/* 4 FIXED DEPARTMENT SELECTORS */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
                <FaPeopleGroup size={13} />
                Department Type
              </p>
              <span
                className="text-[10px] sm:text-[11px] font-bold"
                style={{
                  color: activeDeptConfig.badgeBg === "#FFFFFF" ? "#0F172A" : activeDeptConfig.badgeBg,
                }}
              >
                Active: {activeDeptConfig.label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {DEPTS.map(({ id, label, icon: DeptIcon }) => {
                const isSelected = resolveDeptKey(data.dept) === resolveDeptKey(id);
                const deptConf = DEPARTMENT_THEMES[id] || DEPARTMENT_THEMES.Sales;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSelectDept(id)}
                    className="relative flex min-w-0 min-h-[58px] sm:min-h-[72px] flex-col items-center justify-center gap-1 rounded-md border-2 p-1.5 sm:p-2.5 transition active:scale-[0.98]"
                    style={
                      isSelected
                        ? {
                            background: deptConf.buttonActiveBg,
                            borderColor: deptConf.borderColor,
                            color: deptConf.buttonActiveTextColor,
                            boxShadow: "0 4px 14px rgba(0,0,0,0.14)",
                          }
                        : {
                            background: "#FFFFFF",
                            borderColor: activeTheme.border,
                            color: deptConf.colorHex === "#FFFFFF" ? "#0F172A" : deptConf.colorHex,
                          }
                    }
                  >
                    {isSelected && (
                      <span
                        className="absolute right-1 top-1 grid h-4 w-4 sm:h-5 sm:w-5 place-items-center rounded-full text-[9px] sm:text-[10px] text-white shadow-sm"
                        style={{
                          background: deptConf.colorHex === "#FFFFFF" ? "#0F172A" : deptConf.accent,
                        }}
                      >
                        ✓
                      </span>
                    )}

                    <DeptIcon size={16} className="shrink-0 sm:size-[18px]" />

                    <div className="w-full text-center px-0.5 min-w-0">
                      <span className="block truncate text-[11px] sm:text-xs font-extrabold leading-tight">{label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COMPANY SELECTOR CARDS */}
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
              <FaBuilding size={12} />
              Select Company Name
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {COMPANY_OPTIONS.map((c) => {
                const isSelected = (company?.id || "").toLowerCase() === c.id.toLowerCase() || canonicalKey === c.id.toLowerCase();

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectCompany(c)}
                    className="flex min-w-0 min-h-[52px] sm:min-h-[62px] flex-col items-center justify-center rounded-md border-2 p-1.5 sm:p-2 text-center transition active:scale-[0.98]"
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
                    <img src={c.headerLogo || c.logo} alt={c.name} className="h-4 sm:h-6 w-auto max-w-[75px] sm:max-w-[85px] object-contain mb-1 shrink-0" />
                    <span className="truncate text-[10px] sm:text-[11px] font-bold w-full block min-w-0" style={{ color: isSelected ? activeTheme.primary : undefined }}>
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* SECTION 2: PERSONAL INFORMATION */}
        <Section
          id="s-info"
          no="2"
          title="Personal Information"
          sub="Enter your name (bottom arc) and designation (top arc)."
          icon={FaUser}
          theme={activeTheme}
        >
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            <Field
              label="Full Name (Bottom Arc)"
              icon={FaUser}
              value={data.name}
              onChange={(value) => updateData("name", value)}
              placeholder="Your Name"
              theme={activeTheme}
            />

            <Field
              label="Designation / Role (Top Arc)"
              icon={FaUserTie}
              value={data.designation}
              onChange={(value) => updateData("designation", value)}
              placeholder="Your Designation"
              theme={activeTheme}
            />
          </div>
        </Section>

        {/* SECTION 3: DEFAULT AVATARS (SAME-TO-SAME) & PERSONAL PHOTO UPLOAD */}
        <Section
          id="s-avatar"
          no="3"
          title="Profile Picture (Default Male/Female or Personal Pic)"
          sub="Same-to-same default avatars from screenshot, or upload personal picture."
          icon={FaIdBadge}
          theme={activeTheme}
        >
          {/* DEFAULT AVATAR SELECTION BUTTONS (SAME-TO-SAME AS SCREENSHOT) */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <p className="flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
                Default Profile Picture (Same as screenshot)
              </p>
              {!data.photo && (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Active as Default
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* DEFAULT MALE AVATAR */}
              <button
                type="button"
                onClick={() => handleSelectGender("Male")}
                className="relative flex min-w-0 min-h-[66px] sm:min-h-[84px] items-center gap-2 sm:gap-3 rounded-lg border-2 p-2 sm:p-3 text-left transition active:scale-[0.98]"
                style={
                  data.gender === "Male" && !data.photo
                    ? {
                        borderColor: activeTheme.primary,
                        background: activeTheme.primaryLight,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                      }
                    : {
                        borderColor: activeTheme.border,
                        background: "#FFFFFF",
                      }
                }
              >
                <img
                  src={DEFAULT_MALE_AVATAR}
                  alt="Default Male Avatar"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 shadow-xs shrink-0"
                  style={{
                    borderColor: data.gender === "Male" && !data.photo ? activeTheme.primary : "#CBD5E1",
                  }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-extrabold truncate" style={{ color: activeTheme.primary }}>
                      Male 
                    </span>
                    {data.gender === "Male" && !data.photo && (
                      <span className="text-xs font-bold" style={{ color: activeTheme.secondary }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* DEFAULT FEMALE AVATAR */}
              <button
                type="button"
                onClick={() => handleSelectGender("Female")}
                className="relative flex min-w-0 min-h-[66px] sm:min-h-[84px] items-center gap-2 sm:gap-3 rounded-lg border-2 p-2 sm:p-3 text-left transition active:scale-[0.98]"
                style={
                  data.gender === "Female" && !data.photo
                    ? {
                        borderColor: activeTheme.primary,
                        background: activeTheme.primaryLight,
                        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                      }
                    : {
                        borderColor: activeTheme.border,
                        background: "#FFFFFF",
                      }
                }
              >
                <img
                  src={DEFAULT_FEMALE_AVATAR}
                  alt="Default Female Avatar"
                  className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border-2 shadow-xs shrink-0"
                  style={{
                    borderColor: data.gender === "Female" && !data.photo ? activeTheme.primary : "#CBD5E1",
                  }}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm font-extrabold truncate" style={{ color: activeTheme.primary }}>
                      Female
                    </span>
                    {data.gender === "Female" && !data.photo && (
                      <span className="text-xs font-bold" style={{ color: activeTheme.secondary }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* PERSONAL PIC UPLOAD (ONLY REPLACES PIC, NEVER TOUCHES NAME/ROLE/COLOR) */}
          <div
            className="rounded-lg border p-2.5 sm:p-4 min-w-0 max-w-full"
            style={{
              borderColor: activeTheme.border,
              background: data.photo ? activeTheme.primaryLight : "#FFFFFF",
            }}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: activeTheme.primary }}>
                <FaCamera size={13} />
                Upload Personal Profile Picture
              </span>

              {data.photo && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 hover:text-red-700 transition"
                >
                  <FaTrash size={10} />
                  Remove &amp; Use Default {data.gender || "Male"}
                </button>
              )}
            </div>

            {data.photo ? (
              <div className="flex items-center gap-3">
                <img
                  src={data.photo}
                  alt="Personal uploaded profile picture"
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border-2 shadow-sm shrink-0"
                  style={{ borderColor: activeTheme.primary }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-extrabold text-slate-800 truncate">Personal Picture Active</p>
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-sm shrink-0">Custom</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-tight mt-0.5">
                    ✓ Preserved: Designation, Name, Department, and Company branding remain 100% intact.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <label className="flex flex-col sm:flex-row cursor-pointer items-center justify-center gap-1 sm:gap-2 rounded-md border-2 border-dashed p-2.5 sm:p-3 text-center transition hover:bg-slate-50 min-w-0">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <FaCamera size={14} className="text-slate-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 break-words text-center">Click here to upload personal photo (PNG, JPG, WebP)</span>
                </label>
                <p className="mt-1.5 text-[10px] text-slate-500 text-center leading-tight">
                  If not uploaded, the <strong>same-to-same default {data.gender || "Male"} avatar</strong> is automatically applied.
                </p>
              </div>
            )}
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
            {busy ? "Preparing…" : "Download"}
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

        {/* MOBILE DIRECT PREVIEW SWITCHER BUTTON */}
        <button
          type="button"
          onClick={() => {
            const outElem = document.getElementById("s-out");
            outElem?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="lg:hidden flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold text-white shadow-lg transition active:scale-[0.99]"
          style={{
            background: `linear-gradient(90deg,${activeTheme.secondary},${activeTheme.primary})`,
          }}
        >
          <FaEye size={14} />
          <span>View Live Preview &amp; Download ↓</span>
        </button>
      </div>

      <section
        id="s-out"
        className="scroll-mt-24 w-full min-w-0 max-w-full rounded-lg border bg-white p-3 sm:p-5 shadow-[0_4px_20px_rgba(3,37,76,.06)] lg:sticky lg:top-20 self-start"
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

        {/* PREVIEW CONTAINER */}
        <div
          className="flex min-h-[290px] sm:min-h-[460px] items-center justify-center rounded-xl border p-3 sm:p-6"
          style={{
            borderColor: activeTheme.border,
            background: "#FAFAFA",
          }}
        >
          <div className="w-full max-w-[420px]">
            {/* CIRCULAR DP BADGE (PURE CIRCULAR PROFILE PICTURE) */}
            <div
              className="mx-auto aspect-square w-full max-w-[250px] xs:max-w-[275px] sm:max-w-[340px] md:max-w-[380px] rounded-full overflow-hidden transition-all shadow-xl"
            >
              {/* REACTIVE SVG BADGE */}
              <div
                dangerouslySetInnerHTML={{ __html: badgeSvgString }}
                className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
              />
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

            {/* BADGE METADATA INDICATORS */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center">
              <span
                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                style={{
                  background: activeDeptConfig.badgeRingColor === "#FFFFFF" ? "#0F172A" : activeDeptConfig.badgeRingColor,
                  color: "#FFFFFF",
                }}
              >
                ● {activeDeptConfig.label}
              </span>
            </div>
          </div>
        </div>

        {/* HIDDEN CANVAS FOR EXPORT */}
        <canvas ref={canvasRef} className="hidden" />
      </section>

      {/* MOBILE FLOATING QUICK PREVIEW BUTTON */}
      <div className="fixed bottom-5 right-4 z-40 lg:hidden">
        <button
          type="button"
          onClick={() => {
            const outElem = document.getElementById("s-out");
            outElem?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex items-center gap-1.5 rounded-full py-2.5 px-4 text-xs font-bold text-white shadow-2xl transition active:scale-95"
          style={{
            background: activeTheme.primary,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          <FaEye size={13} />
          <span>Live Preview</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}
