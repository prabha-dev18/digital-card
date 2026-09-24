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
  FaPhone,
  FaUpload,
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
  phone: "+91 99987 15799",
  logo: "/aarambh.png",
};

const DEPTS = [
  { id: "Sales", icon: FaChartColumn },
  { id: "Admin", icon: FaUserTie },
  { id: "Operations", icon: FaGear },
  { id: "Management", icon: FaPeopleGroup },
];

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
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
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-lg border-2 py-4 text-xs font-semibold transition"
      style={
        selected
          ? {
              background: `linear-gradient(135deg,${T.primary},${T.secondary})`,
              borderColor: T.primary,
              color: T.background === "#FFFFFF" ? "#FFFFFF" : "#FFFFFF",
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
        className="flex items-center gap-3 rounded-lg border bg-white px-3.5 py-3"
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
  /*
   * Selected company theme
   *
   * HomeShell passes:
   * theme={T}
   *
   * If theme is not available, use the theme from company.
   */
  const T = theme || company?.theme || DEFAULT_THEME;

  const canvasRef = useRef(null);

  const [localData, setLocalData] = useState({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [note, setNote] = useState("");

  /*
   * Merge external profile data with local data.
   * Company information always comes from selected company.
   */
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

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUploadedPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const drawCanvas = async () => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return null;
    }

    const size = 1080;

    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    ctx.clearRect(0, 0, size, size);

    /*
     * Background
     */
    ctx.fillStyle = activeTheme.background;
    ctx.fillRect(0, 0, size, size);

    /*
     * Decorative circles
     */
    ctx.globalAlpha = 0.08;

    ctx.beginPath();
    ctx.arc(1000, 80, 250, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.secondary;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(50, 1030, 220, 0, Math.PI * 2);
    ctx.fillStyle = activeTheme.accent;
    ctx.fill();

    ctx.globalAlpha = 1;

    /*
     * Outer border
     */
    ctx.strokeStyle = activeTheme.secondary;
    ctx.lineWidth = 8;

    ctx.strokeRect(30, 30, size - 60, size - 60);

    /*
     * Company logo
     */
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
          const logoWidth = 400;

          const ratio = logo.naturalHeight / logo.naturalWidth;

          const logoHeight = logoWidth * ratio;

          ctx.drawImage(logo, (size - logoWidth) / 2, 100, logoWidth, logoHeight);
        }
      } catch {
        /* ignore logo loading errors */
      }
    }

    /*
     * Uploaded profile photo
     */
    if (uploadedPhoto) {
      try {
        const photo = new Image();

        await new Promise((resolve) => {
          photo.onload = resolve;
          photo.onerror = resolve;
          photo.src = uploadedPhoto;
        });

        if (photo.complete && photo.naturalWidth) {
          const x = 390;
          const y = 300;
          const photoSize = 300;

          ctx.save();

          ctx.beginPath();

          ctx.arc(x + photoSize / 2, y + photoSize / 2, photoSize / 2, 0, Math.PI * 2);

          ctx.clip();

          const ratio = Math.max(photoSize / photo.naturalWidth, photoSize / photo.naturalHeight);

          const width = photo.naturalWidth * ratio;

          const height = photo.naturalHeight * ratio;

          ctx.drawImage(photo, x + (photoSize - width) / 2, y + (photoSize - height) / 2, width, height);

          ctx.restore();

          /*
           * Photo border
           */
          ctx.beginPath();

          ctx.arc(x + photoSize / 2, y + photoSize / 2, photoSize / 2 + 8, 0, Math.PI * 2);

          ctx.strokeStyle = activeTheme.secondary;

          ctx.lineWidth = 8;

          ctx.stroke();
        }
      } catch {
        /* ignore photo loading errors */
      }
    }

    /*
     * Name
     */
    ctx.textAlign = "center";

    ctx.fillStyle = activeTheme.primary;

    ctx.font = '700 68px "Plus Jakarta Sans", Arial, sans-serif';

    ctx.fillText(data.name || "Your Name", size / 2, 680);

    /*
     * Designation
     */
    ctx.fillStyle = activeTheme.secondary;

    ctx.font = '600 38px "Plus Jakarta Sans", Arial, sans-serif';

    ctx.fillText(data.designation || "Your Designation", size / 2, 745);

    /*
     * Company
     */
    ctx.fillStyle = activeTheme.primary;

    ctx.font = '500 34px "Plus Jakarta Sans", Arial, sans-serif';

    ctx.fillText(data.company || "AarambhGrow Group of Companies", size / 2, 805);

    /*
     * Phone
     */
    ctx.fillStyle = activeTheme.accent;

    ctx.font = '600 30px "Plus Jakarta Sans", Arial, sans-serif';

    ctx.fillText(data.phone || "+91 99987 15799", size / 2, 875);

    return canvas;
  };

  const downloadDP = async () => {
    try {
      const canvas = await drawCanvas();

      if (!canvas) {
        return;
      }

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

      setTimeout(() => setNote(""), 2200);
    } catch (error) {
      console.error("WhatsApp DP download failed:", error);

      setNote("Could not create PNG");
    }
  };

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

    setUploadedPhoto(null);
    setNote("");
  };

  const generatePreview = () => {
    if (typeof onReady === "function") {
      onReady();
    }
  };

  return (
    <div className="grid min-w-0 gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5">
      {/* ============================================================ */}
      {/* LEFT SIDE                                                     */}
      {/* ============================================================ */}

      <div className="space-y-5">
        {/* ===================== ORGANIZATION ===================== */}

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

          <div
            className="mt-5 flex items-center gap-3 rounded-xl border p-4"
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

        {/* ===================== PERSONAL INFORMATION ===================== */}

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

            <Field
              label="Phone Number"
              icon={FaPhone}
              type="tel"
              value={data.phone}
              onChange={(value) => updateData("phone", value)}
              placeholder="+91 99987 15799"
              theme={activeTheme}
            />
          </div>
        </Section>

        {/* ===================== PHOTO & APPEARANCE ===================== */}

        <Section
          id="s-photo"
          no="3"
          title="Photo & Appearance"
          sub="Upload your photo and choose your WhatsApp DP theme."
          icon={FaImage}
          theme={activeTheme}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Upload photo */}

            <div>
              <label
                className="mb-1.5 block text-xs font-bold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                Upload Professional Photo
              </label>

              <label
                className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 text-center transition"
                style={{
                  borderColor: activeTheme.border,
                  background: activeTheme.background,
                }}
              >
                <FaUpload size={22} color={activeTheme.accent} />

                <span
                  className="mt-3 text-sm font-bold"
                  style={{
                    color: activeTheme.primary,
                  }}
                >
                  {uploadedPhoto ? "Change Photo" : "Click to upload"}
                </span>

                <span
                  className="mt-1 text-xs"
                  style={{
                    color: activeTheme.muted,
                  }}
                >
                  PNG, JPG or WEBP
                </span>

                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
              </label>

              {uploadedPhoto && (
                <button
                  type="button"
                  onClick={() => setUploadedPhoto(null)}
                  className="mt-2 text-xs font-bold"
                  style={{
                    color: activeTheme.accent,
                  }}
                >
                  Remove Photo
                </button>
              )}
            </div>

            {/* Company theme */}

            <div>
              <label
                className="mb-1.5 block text-xs font-bold"
                style={{
                  color: activeTheme.primary,
                }}
              >
                Company Theme
              </label>

              <div
                className="rounded-xl border p-4"
                style={{
                  borderColor: activeTheme.border,
                  background: activeTheme.background,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-full"
                    style={{
                      background: activeTheme.background,
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
                      Theme and colors are automatically loaded from the selected company.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ===================== GENERATE PREVIEW ===================== */}

        {!ready && (
          <button
            type="button"
            onClick={generatePreview}
            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
            style={{
              background: `linear-gradient(90deg,${activeTheme.secondary},${activeTheme.primary})`,
            }}
          >
            <FaEye />
            Generate WhatsApp DP Preview
          </button>
        )}

        {/* ===================== ACTIONS ===================== */}

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button
            type="button"
            onClick={downloadDP}
            className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
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
            className="grid min-w-12 place-items-center rounded-xl border bg-white"
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

        {/* ===================== NOTE ===================== */}

        {note && (
          <div
            className="rounded-xl border p-3 text-center text-xs font-bold"
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

      {/* ============================================================ */}
      {/* RIGHT SIDE - LIVE PREVIEW                                    */}
      {/* ============================================================ */}

      <section
        id="s-out"
        className="scroll-mt-24 min-w-0 rounded-2xl border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
        style={{
          borderColor: activeTheme.border,
        }}
      >
        {/* ===================== PREVIEW HEADER ===================== */}

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

        {/* ===================== DP PREVIEW ===================== */}

        <div
          className="flex min-h-[620px] items-center justify-center overflow-hidden rounded-2xl border p-6"
          style={{
            borderColor: activeTheme.border,
            background: activeTheme.primaryLight,
          }}
        >
          <div className="w-full max-w-[540px]">
            <div
              className="mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-full shadow-2xl"
              style={{
                background: activeTheme.background,

                border: `6px solid ${activeTheme.secondary}`,
              }}
            >
              <div className="relative flex h-full w-full flex-col items-center justify-center p-10 text-center">
                {/* Decorative top-right circle */}

                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-10"
                  style={{
                    background: activeTheme.secondary,
                  }}
                />

                {/* Decorative bottom-left circle */}

                <div
                  className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full opacity-10"
                  style={{
                    background: activeTheme.accent,
                  }}
                />

                {/* Company logo */}

                {data.logo && (
                  <img
                    src={data.logo}
                    alt={company?.fullName || "AarambhGrow"}
                    className="relative z-10 mb-4 h-auto w-[58%] object-contain"
                  />
                )}

                {/* Profile photo */}

                {uploadedPhoto && (
                  <img
                    src={uploadedPhoto}
                    alt="Profile"
                    className="relative z-10 mb-4 h-28 w-28 rounded-full border-4 object-cover"
                    style={{
                      borderColor: activeTheme.accent,
                    }}
                  />
                )}

                {/* Name */}

                <h3
                  className="relative z-10 text-3xl font-extrabold"
                  style={{
                    color: activeTheme.primary,
                  }}
                >
                  {data.name || "Your Name"}
                </h3>

                {/* Designation */}

                <p
                  className="relative z-10 mt-2 text-lg font-semibold"
                  style={{
                    color: activeTheme.secondary,
                  }}
                >
                  {data.designation || "Your Designation"}
                </p>

                {/* Company */}

                <p
                  className="relative z-10 mt-2 text-base font-semibold"
                  style={{
                    color: activeTheme.primary,
                  }}
                >
                  {data.company || "AarambhGrow Group of Companies"}
                </p>

                {/* Phone */}

                <p
                  className="relative z-10 mt-4 text-sm font-bold"
                  style={{
                    color: activeTheme.accent,
                  }}
                >
                  {data.phone || "+91 99987 15799"}
                </p>
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

        {/* ===================== INFORMATION ===================== */}

        <div
          className="mt-5 rounded-xl border p-4"
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

        {/* Hidden canvas used for PNG export */}

        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
}
