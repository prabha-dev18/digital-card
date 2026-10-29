"use client";

import { useMemo, useState } from "react";
import {
  FaArrowsRotate,
  FaBuilding,
  FaCheck,
  FaCopy,
  FaEnvelope,
  FaEye,
  FaFacebookF,
  FaGlobe,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaUser,
  FaUserTie,
} from "react-icons/fa6";

const BRAND = {
  white: "#FFFFFF",
  border: "#E2E8F0",
  muted: "#64748B",
};

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

const DEFAULT_DATA = {
  dept: "Sales",

  name: "Your Name",
  designation: "Your Designation",

  company: "Company Name",

  phone: "",
  email: "",

  website: "https://www.example.com",

  branch: "Your Branch",

  address: "Your Business Address",

  facebook: "",
  linkedin: "",
  instagram: "",

  disclaimer:
    "We are a professional start-up consulting firm based in India, specializing in guiding and supporting emerging enterprises with their unique requirements. Please note that we operate solely as an independent consultancy service provider. We are not affiliated, associated, or in collaboration with any Government, Non-Government agency, institution, organization, or department.",

  logo: "/aarambh.png",
};

const DEPTS = [
  {
    id: "Sales",
    icon: "Sales",
  },
  {
    id: "Admin",
    icon: "Admin",
  },
  {
    id: "Operation",
    icon: "Operations",
  },
  {
    id: "Management",
    icon: "Management",
  },
  {
    id: "Digital",
    icon: "Digital",
  },
];

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 w-full min-w-0 max-w-full overflow-hidden rounded-md border bg-white p-3 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: T.border || BRAND.border,
        background: T.surface || BRAND.white,
      }}
    >
      <div className="mb-3.5 flex items-center gap-3 sm:mb-4 sm:gap-4">
        <span
          className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: T.gradient || T.primary,
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

function Choice({ selected, onClick, label, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex flex-col items-center justify-center gap-1.5 rounded-md border-2 py-4 text-xs font-semibold transition"
      style={
        selected
          ? {
              background: T.gradient || T.primary,
              borderColor: T.primary,
              color: BRAND.white,
            }
          : {
              background: T.surface || BRAND.white,
              borderColor: T.border || BRAND.border,
              color: T.primary,
            }
      }
    >
      {selected && (
        <span
          className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full text-[10px] font-black text-white"
          style={{
            background: T.secondary,
          }}
        >
          <FaCheck size={9} />
        </span>
      )}

      <FaBuilding size={18} />

      {label}
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
        className="flex items-center gap-3 rounded-md border px-3.5 py-3 focus-within:border-[var(--field-focus)]"
        style={{
          borderColor: T.border || BRAND.border,
          background: T.surface || BRAND.white,
          "--field-focus": T.secondary,
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
            color: T.text || T.primary,
          }}
        />
      </span>
    </label>
  );
}

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[char],
  );
}

function normalizeWebsite(value = "") {
  const website = value.trim();

  if (!website) return "";

  return /^https?:\/\//i.test(website) ? website : `https://${website}`;
}

function normalizePhone(value = "") {
  return value.replace(/[^\d+]/g, "");
}

/* =========================================================
   EMAIL SIGNATURE LOGO SIZING
   Decreased dimensions for all 6 companies to create a sleek,
   balanced, and compact email signature layout.
========================================================= */
function getEmailLogoDimensions(company, logoUrl) {
  const compId = String(company?.id || company?.name || "").toLowerCase();
  const url = String(logoUrl || "").toLowerCase();

  // Wide banner variants:
  if (url.includes("euroasia") || compId.includes("euroasia")) {
    return { width: 140, height: 34, tdWidth: 150 };
  }
  if (url.includes("aarambh2")) {
    return { width: 135, height: 90, tdWidth: 145 };
  }
  if (url.includes("service2")) {
    return { width: 130, height: 48, tdWidth: 140 };
  }
  if (url.includes("advisory2")) {
    return { width: 125, height: 62, tdWidth: 135 };
  }
  if (url.includes("infinity2")) {
    return { width: 130, height: 53, tdWidth: 140 };
  }
  if (url.includes("nexera2")) {
    return { width: 125, height: 51, tdWidth: 135 };
  }

  // Standard company stacked/badge logos (company.logo):
  if (compId === "infinity" || compId.includes("infinity") || url.includes("infinity")) {
    return { width: 110, height: 73, tdWidth: 120 };
  }
  if (compId === "nexera" || compId.includes("nexera") || url.includes("nexera")) {
    return { width: 98, height: 73, tdWidth: 110 };
  }
  if (compId === "services" || compId.includes("service") || url.includes("service")) {
    return { width: 98, height: 74, tdWidth: 110 };
  }
  if (compId === "advisory" || compId.includes("advisory") || url.includes("advisory")) {
    return { width: 96, height: 74, tdWidth: 110 };
  }

  // aarambhgrow / default:
  return { width: 90, height: 78, tdWidth: 105 };
}

export default function EmailSignatureGenerator({
  initialData = DEFAULT_DATA,
  data: externalData,
  setData: externalSetData,
  onReady,
  ready = false,
  company,
  brand,
  theme,
}) {
  const [localData, setLocalData] = useState({
    ...DEFAULT_DATA,
    ...initialData,
  });

  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState("");
  const [mobileTab, setMobileTab] = useState("card");
  const [mobileSectionTab, setMobileSectionTab] = useState("form");

  const T = theme || company?.theme || DEFAULT_THEME;

  const companyData = company?.data || {};

  const data = {
    ...DEFAULT_DATA,
    ...(externalData || localData),

    company: company?.fullName || company?.name || (externalData || localData)?.company || DEFAULT_DATA.company,

    logo: company?.logo || (externalData || localData)?.logo || DEFAULT_DATA.logo,

    website: (externalData || localData)?.website || companyData.website || DEFAULT_DATA.website,

    address: (externalData || localData)?.address || companyData.address || DEFAULT_DATA.address,

    email: (externalData || localData)?.email || companyData.email || DEFAULT_DATA.email,

    phone: (externalData || localData)?.phone || companyData.phone || DEFAULT_DATA.phone,

    branch: (externalData || localData)?.branch || companyData.branch || DEFAULT_DATA.branch,

    facebook: (externalData || localData)?.facebook || companyData.facebook || DEFAULT_DATA.facebook,

    linkedin: (externalData || localData)?.linkedin || companyData.linkedin || DEFAULT_DATA.linkedin,

    instagram: (externalData || localData)?.instagram || companyData.instagram || DEFAULT_DATA.instagram,

    disclaimer: (externalData || localData)?.disclaimer || companyData.disclaimer || DEFAULT_DATA.disclaimer,
  };

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

  const signatureHtml = useMemo(() => {
    const name = escapeHtml(data.name || "Your Name");

    const designation = escapeHtml(data.designation || "Your Designation");

    const companyName = escapeHtml(data.company || "AarambhGrow Group of Companies");

    const phone = escapeHtml(data.phone || "");
    const email = escapeHtml(data.email || "");
    const website = escapeHtml(data.website || "");
    const branch = escapeHtml(data.branch || "");
    const address = escapeHtml(data.address || "");

    const facebook = escapeHtml(data.facebook || "");
    const linkedin = escapeHtml(data.linkedin || "");
    const instagram = escapeHtml(data.instagram || "");

    const disclaimer = escapeHtml(data.disclaimer || "");

    const logo = escapeHtml(data.logo || "/aarambh.png");
    const logoDim = getEmailLogoDimensions(company, data.logo);

    const primary = T.primary || DEFAULT_THEME.primary;

    const secondary = T.secondary || DEFAULT_THEME.secondary;

    const accent = T.accent || DEFAULT_THEME.accent;

    const muted = T.muted || DEFAULT_THEME.muted;

    const border = T.border || DEFAULT_THEME.border;

    const websiteUrl = escapeHtml(normalizeWebsite(data.website || ""));

    const phoneUrl = escapeHtml(normalizePhone(data.phone || ""));

    const facebookUrl = escapeHtml(normalizeWebsite(data.facebook || ""));

    const linkedinUrl = escapeHtml(normalizeWebsite(data.linkedin || ""));

    const instagramUrl = escapeHtml(normalizeWebsite(data.instagram || ""));

    return `
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          border-collapse:collapse;
          width:100%;
          max-width:760px;
          font-family:Arial,Helvetica,sans-serif;
          color:${primary};
        "
      >
        <tbody>

          <!-- TOP CONTENT -->
          <tr>

            <!-- MAIN CONTENT -->
            <td
              valign="top"
              style="
                padding:0 18px 0 0;
                vertical-align:top;
              "
            >

              <!-- NAME -->
              <div
                style="
                  margin:0;
                  padding:0;
                  font-size:27px;
                  line-height:32px;
                  font-weight:700;
                  color:${primary};
                "
              >
                ${name}
              </div>

              <!-- DESIGNATION + COMPANY -->
              <div
                style="
                  margin:4px 0 12px 0;
                  padding:0;
                  font-size:15px;
                  line-height:21px;
                  color:#333333;
                "
              >
                ${designation}

                <span
                  style="
                    padding:0 7px;
                    color:#777777;
                  "
                >
                  |
                </span>

                <strong
                  style="
                    color:${primary};
                  "
                >
                  ${companyName}
                </strong>
              </div>

              <!-- BLUE LINE -->
              <div
                style="
                  width:100%;
                  height:1px;
                  background:${primary};
                  font-size:0;
                  line-height:0;
                  margin:0 0 10px 0;
                "
              >
                &nbsp;
              </div>

              ${
                phone
                  ? `
                    <div
                      style="
                        margin:5px 0;
                        font-size:14px;
                        line-height:20px;
                        color:#222222;
                      "
                    >
                      <strong
                        style="
                          color:#111111;
                        "
                      >
                        Phone:
                      </strong>

                      <span style="padding-left:8px;">
                        <a
                          href="tel:${phoneUrl}"
                          style="
                            color:#222222;
                            text-decoration:none;
                          "
                        >
                          ${phone}
                        </a>
                      </span>
                    </div>
                  `
                  : ""
              }

              ${
                email
                  ? `
                    <div
                      style="
                        margin:5px 0;
                        font-size:14px;
                        line-height:20px;
                        color:#222222;
                      "
                    >
                      <strong
                        style="
                          color:#111111;
                        "
                      >
                        Email:
                      </strong>

                      <span style="padding-left:8px;">
                        <a
                          href="mailto:${email}"
                          style="
                            color:${primary};
                            text-decoration:none;
                          "
                        >
                          ${email}
                        </a>
                      </span>
                    </div>
                  `
                  : ""
              }

              ${
                branch || address
                  ? `
                    <div
                      style="
                        margin:12px 0 5px 0;
                        font-size:12px;
                        line-height:18px;
                        letter-spacing:2px;
                        color:${muted};
                        font-weight:600;
                      "
                    >
                      ${branch === "Both Branches" ? "BRANCHES" : "BRANCH"}
                    </div>

                    <div
                      style="
                        margin:3px 0;
                        font-size:14px;
                        line-height:21px;
                        color:#222222;
                      "
                    >
                      ${
                        branch && branch !== "Both Branches"
                          ? `
                            <strong
                              style="
                                color:${primary};
                              "
                            >
                              ${branch}:
                            </strong>
                          `
                          : ""
                      }

                      ${
                        address
                          ? `
                            <span style="${branch && branch !== "Both Branches" ? "padding-left:8px;" : ""}">
                              ${address.replace(/\n/g, "<br/>")}
                            </span>
                          `
                          : ""
                      }
                    </div>
                  `
                  : ""
              }

              ${
                website
                  ? `
                    <div
                      style="
                        margin:14px 0 5px 0;
                        font-size:14px;
                        line-height:20px;
                        font-weight:700;
                      "
                    >
                      <a
                        href="${websiteUrl}"
                        style="
                          color:${primary};
                          text-decoration:none;
                        "
                      >
                        ${website}
                      </a>
                    </div>
                  `
                  : ""
              }

            </td>

            <!-- LOGO -->
            <td
              valign="top"
              align="right"
              style="
                width:${logoDim.tdWidth}px;
                min-width:${logoDim.tdWidth}px;
                padding:0 0 0 16px;
                vertical-align:top;
                text-align:right;
              "
            >
              <img
                src="${logo}"
                alt="${companyName}"
                width="${logoDim.width}"
                height="${logoDim.height}"
                style="
                  display:inline-block;
                  width:${logoDim.width}px;
                  max-width:${logoDim.width}px;
                  height:${logoDim.height}px;
                  max-height:${logoDim.height}px;
                  border:0;
                  outline:none;
                  text-decoration:none;
                  vertical-align:top;
                "
              />
            </td>

          </tr>

          <!-- SOCIAL ICONS -->
          <tr>
            <td
              colspan="2"
              style="
                padding:4px 0 7px 0;
                text-align:right;
              "
            >

              ${
                facebook
                  ? `
                    <a
                      href="${facebookUrl}"
                      style="
                        display:inline-block;
                        width:28px;
                        height:28px;
                        margin-left:6px;
                        background:#1877F2;
                        color:#FFFFFF;
                        text-decoration:none;
                        text-align:center;
                        line-height:28px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:18px;
                        font-weight:bold;
                      "
                    >
                      f
                    </a>
                  `
                  : ""
              }

              ${
                linkedin
                  ? `
                    <a
                      href="${linkedinUrl}"
                      style="
                        display:inline-block;
                        width:28px;
                        height:28px;
                        margin-left:6px;
                        background:#0A66C2;
                        color:#FFFFFF;
                        text-decoration:none;
                        text-align:center;
                        line-height:28px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:17px;
                        font-weight:bold;
                      "
                    >
                      in
                    </a>
                  `
                  : ""
              }

              ${
                instagram
                  ? `
                    <a
                      href="${instagramUrl}"
                      style="
                        display:inline-block;
                        width:28px;
                        height:28px;
                        margin-left:6px;
                        background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4);
                        color:#FFFFFF;
                        text-decoration:none;
                        text-align:center;
                        line-height:28px;
                        font-family:Arial,Helvetica,sans-serif;
                        font-size:17px;
                        font-weight:bold;
                      "
                    >
                      ◎
                    </a>
                  `
                  : ""
              }

            </td>
          </tr>

          <!-- DISCLAIMER -->
          ${
            disclaimer
              ? `
                <tr>
                  <td
                    colspan="2"
                    style="
                      border-top:1px solid ${border};
                      padding:12px 0 0 0;
                    "
                  >
                    <div
                      style="
                        font-size:12px;
                        line-height:19px;
                        color:#555555;
                        text-align:left;
                      "
                    >
                      <strong
                        style="
                          color:#333333;
                        "
                      >
                        Disclaimer:
                      </strong>

                      ${disclaimer}
                    </div>
                  </td>
                </tr>
              `
              : ""
          }

        </tbody>
      </table>
    `;
  }, [data, T]);

  /*
   * =========================================================
   * COPY SIGNATURE
   * =========================================================
   */

  const copySignature = async () => {
    try {
      const plainText = [
        data.name,
        data.designation,
        data.company,
        data.phone ? `Phone: ${data.phone}` : "",
        data.email ? `Email: ${data.email}` : "",
        data.branch ? `BRANCH: ${data.branch}` : "",
        data.address,
        data.website,
        data.facebook,
        data.linkedin,
        data.instagram,
        data.disclaimer ? `Disclaimer: ${data.disclaimer}` : "",
      ]
        .filter(Boolean)
        .join("\n");

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/html": new Blob([signatureHtml], {
              type: "text/html",
            }),

            "text/plain": new Blob([plainText], {
              type: "text/plain",
            }),
          }),
        ]);
      } else {
        const container = document.createElement("div");

        container.innerHTML = signatureHtml;

        container.style.position = "fixed";
        container.style.left = "-99999px";

        document.body.appendChild(container);

        const selection = window.getSelection();

        const range = document.createRange();

        range.selectNodeContents(container);

        selection.removeAllRanges();

        selection.addRange(range);

        const successful = document.execCommand("copy");

        selection.removeAllRanges();

        document.body.removeChild(container);

        if (!successful) {
          throw new Error("Copy failed");
        }
      }

      setCopied(true);

      setNote("Signature copied successfully");

      setTimeout(() => {
        setCopied(false);
        setNote("");
      }, 2500);
    } catch (error) {
      console.error("Signature copy failed:", error);

      setNote("Copy was blocked by the browser");
    }
  };

  /*
   * =========================================================
   * RESET
   * =========================================================
   */

  const reset = () => {
    const resetData = {
      ...DEFAULT_DATA,
      ...initialData,

      company: company?.fullName || company?.name || DEFAULT_DATA.company,

      logo: company?.logo || DEFAULT_DATA.logo,

      website: initialData?.website || companyData.website || DEFAULT_DATA.website,

      address: initialData?.address || companyData.address || company?.branches?.[0]?.address || DEFAULT_DATA.address,

      email: initialData?.email || companyData.email || DEFAULT_DATA.email,

      phone: initialData?.phone || companyData.phone || company?.branches?.[0]?.phone || DEFAULT_DATA.phone,

      branch: initialData?.branch || companyData.branch || company?.branches?.[0]?.name || DEFAULT_DATA.branch,

      facebook: initialData?.facebook || companyData.facebook || DEFAULT_DATA.facebook,

      linkedin: initialData?.linkedin || companyData.linkedin || DEFAULT_DATA.linkedin,

      instagram: initialData?.instagram || companyData.instagram || DEFAULT_DATA.instagram,

      disclaimer: initialData?.disclaimer || companyData.disclaimer || DEFAULT_DATA.disclaimer,
    };

    if (externalSetData) {
      Object.entries(resetData).forEach(([key, value]) => {
        externalSetData(key, value);
      });
    } else {
      setLocalData(resetData);
    }

    setCopied(false);
    setNote("");
  };

  /*
   * =========================================================
   * GENERATE PREVIEW
   * =========================================================
   */

  const generatePreview = () => {
    setMobileSectionTab("preview");
    if (typeof onReady === "function") {
      onReady();
    }
  };

  return (
    <div
      className="grid grid-cols-1 w-full max-w-full min-w-0 items-start gap-3 p-2 sm:gap-5 sm:p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5 lg:pt-3"
      style={{
        background: T.background || DEFAULT_THEME.background,
      }}
    >
      {/* LEFT SIDE */}
      <div className="w-full min-w-0 max-w-full space-y-3.5 sm:space-y-5">
        {/* ORGANIZATION */}

        <Section
          id="s-org"
          no="1"
          title="Organization"
          sub="Choose your company and department to get started."
          icon={FaBuilding}
          theme={T}
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
            {DEPTS.map((item) => (
              <Choice
                key={item.id}
                label={item.id}
                selected={
                  data.dept === item.id || (item.id.toLowerCase().startsWith("oper") && (data.dept || "").toLowerCase().startsWith("oper"))
                }
                onClick={() => updateData("dept", item.id)}
                theme={T}
              />
            ))}
          </div>

          {/* SELECTED COMPANY */}

          <div
            className="mt-5 flex items-center gap-3 rounded-md border p-4"
            style={{
              borderColor: T.border || BRAND.border,

              background: T.primaryLight || T.surface || BRAND.white,
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md"
              style={{
                background: T.surface || BRAND.white,
              }}
            >
              <img
                src={company?.logo || data.logo || "/aarambh.png"}
                alt={company?.fullName || company?.name || "Company"}
                className="max-h-10 max-w-[44px] object-contain"
              />
            </div>

            <div className="min-w-0">
              <p
                className="text-[11px] font-semibold"
                style={{
                  color: T.muted || BRAND.muted,
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
                {company?.fullName || data.company}
              </p>

              {companyData.website && (
                <p
                  className="mt-0.5 truncate text-[10px]"
                  style={{
                    color: T.secondary,
                  }}
                >
                  {companyData.website}
                </p>
              )}
            </div>
          </div>
        </Section>

        {/* PERSONAL INFORMATION */}

        <Section id="s-info" no="2" title="Personal Information" sub="Enter your details." icon={FaUser} theme={T}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full Name"
              icon={FaUser}
              value={data.name}
              onChange={(v) => updateData("name", v)}
              placeholder="Full Name"
              theme={T}
            />

            <Field
              label="Designation"
              icon={FaUserTie}
              value={data.designation}
              onChange={(v) => updateData("designation", v)}
              placeholder="Designation"
              theme={T}
            />

            <Field
              label="Phone Number"
              icon={FaPhone}
              type="tel"
              value={data.phone}
              onChange={(v) => updateData("phone", v)}
              placeholder="9898787856"
              theme={T}
            />

            <Field
              label="Email Address"
              icon={FaEnvelope}
              type="email"
              value={data.email}
              onChange={(v) => updateData("email", v)}
              placeholder="Your Email"
              theme={T}
            />

            <Field
              label="Website"
              icon={FaGlobe}
              value={data.website}
              onChange={(v) => updateData("website", v)}
              placeholder="https://www..."
              theme={T}
            />

            <Field
              label="Branch"
              icon={FaBuilding}
              value={data.branch}
              onChange={(v) => updateData("branch", v)}
              placeholder="Ahmedabad"
              theme={T}
            />

            {company?.branches && company.branches.length > 0 && (
              <div
                className="col-span-full rounded-md border p-3.5"
                style={{
                  borderColor: T.border || BRAND.border,
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
                    Auto-fills branch, address & contact
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {company.branches.map((b) => {
                    const isSelected = data.branch === b.name || (!data.branch && b.id === "ahmedabad");

                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          updateData("branch", b.name);
                          updateData("address", b.address);
                          if (b.phone) updateData("phone", b.phone);
                        }}
                        className="flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-bold border transition shadow-sm"
                        style={{
                          backgroundColor: isSelected ? T.primary : "#ffffff",
                          borderColor: isSelected ? T.primary : T.border || BRAND.border,
                          color: isSelected ? "#ffffff" : T.primary,
                        }}
                      >
                        <FaBuilding size={12} />
                        <span>{b.name}</span>
                        {b.tag && (
                          <span
                            className="rounded px-1.5 py-0.5 text-[10px] font-extrabold uppercase"
                            style={{
                              backgroundColor: isSelected ? "rgba(255,255,255,0.25)" : "#FEF3C7",
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
                      updateData("branch", "Both Branches");
                      updateData(
                        "address",
                        company.branches
                          .map((b) => `${b.name}${b.tag ? ` (${b.tag})` : ""}: ${b.address}${b.phone ? ` | Tel: ${b.phone}` : ""}`)
                          .join("\n"),
                      );
                    }}
                    className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-xs font-bold border transition shadow-sm"
                    style={{
                      backgroundColor: data.branch === "Both Branches" ? T.primary : "#ffffff",
                      borderColor: data.branch === "Both Branches" ? T.primary : T.border || BRAND.border,
                      color: data.branch === "Both Branches" ? "#ffffff" : T.primary,
                    }}
                  >
                    <span>Both Branches</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* EMAIL SIGNATURE */}

        <Section
          id="s-photo"
          no="3"
          title="Email Signature"
          sub="Add your business address and prepare your professional signature."
          icon={FaEnvelope}
          theme={T}
        >
          {/* BUSINESS ADDRESS */}

          <label className="block">
            <span
              className="mb-1.5 block text-xs font-bold"
              style={{
                color: T.primary,
              }}
            >
              Business Address
            </span>

            <span
              className="flex items-start gap-3 rounded-md border px-3.5 py-3 focus-within:border-[var(--field-focus)]"
              style={{
                borderColor: T.border || BRAND.border,

                background: T.surface || BRAND.white,

                "--field-focus": T.secondary,
              }}
            >
              <FaLocationDot size={14} color={T.primary} className="mt-1" />

              <textarea
                value={data.address || ""}
                onChange={(e) => updateData("address", e.target.value)}
                rows={4}
                placeholder="2nd Floor, President Plaza, SG Highway Thaltej Ahmedabad 380054"
                className="w-full resize-none bg-transparent text-sm outline-none"
                style={{
                  color: T.text || T.primary,
                }}
              />
            </span>
          </label>

          {/* SOCIAL LINKS */}

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Field
              label="Facebook"
              icon={FaFacebookF}
              value={data.facebook}
              onChange={(v) => updateData("facebook", v)}
              placeholder="Facebook URL"
              theme={T}
            />

            <Field
              label="LinkedIn"
              icon={FaLinkedinIn}
              value={data.linkedin}
              onChange={(v) => updateData("linkedin", v)}
              placeholder="LinkedIn URL"
              theme={T}
            />

            <Field
              label="Instagram"
              icon={FaInstagram}
              value={data.instagram}
              onChange={(v) => updateData("instagram", v)}
              placeholder="Instagram URL"
              theme={T}
            />
          </div>

          {/* DISCLAIMER */}

          <label className="mt-4 block">
            <span
              className="mb-1.5 block text-xs font-bold"
              style={{
                color: T.primary,
              }}
            >
              Disclaimer
            </span>

            <span
              className="flex items-start gap-3 rounded-md border px-3.5 py-3"
              style={{
                borderColor: T.border || BRAND.border,

                background: T.surface || BRAND.white,
              }}
            >
              <FaEnvelope size={14} color={T.primary} className="mt-1" />

              <textarea
                value={data.disclaimer || ""}
                onChange={(e) => updateData("disclaimer", e.target.value)}
                rows={6}
                placeholder="Enter email disclaimer"
                className="w-full resize-none bg-transparent text-sm outline-none"
                style={{
                  color: T.text || T.primary,
                }}
              />
            </span>
          </label>

          {/* INFORMATION BOX */}

          <div
            className="mt-4 rounded-md border p-4"
            style={{
              borderColor: T.primaryLight || BRAND.border,

              background: T.primaryLight || BRAND.white,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="grid h-9 w-9 place-items-center rounded-md"
                style={{
                  background: T.accentLight || BRAND.white,

                  color: T.accent,
                }}
              >
                <FaEnvelope />
              </div>

              <div>
                <p
                  className="text-sm font-bold"
                  style={{
                    color: T.primary,
                  }}
                >
                  Email Signature
                </p>

                <p
                  className="text-xs"
                  style={{
                    color: T.muted || BRAND.muted,
                  }}
                >
                  HTML signature with clickable phone, email, website and social links.
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
              background: T.gradient || T.primary,
            }}
          >
            <FaEye />
            Generate Email Signature
          </button>
        )}

        {/* ACTIONS */}

        <div className="grid grid-cols-[1fr_auto] gap-3">
          <button
            type="button"
            onClick={copied ? undefined : copySignature}
            className="flex items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5"
            style={{
              background: copied ? T.secondary : T.primary,
            }}
          >
            {copied ? (
              <>
                <FaCheck />
                Copied Successfully
              </>
            ) : (
              <>
                <FaCopy />
                Copy Signature
              </>
            )}
          </button>

          <button
            type="button"
            onClick={reset}
            className="grid min-w-12 place-items-center rounded-md border"
            style={{
              borderColor: T.border || BRAND.border,

              background: T.surface || BRAND.white,

              color: T.primary,
            }}
            title="Reset"
            aria-label="Reset signature"
          >
            <FaArrowsRotate size={15} />
          </button>
        </div>

        {/* TIP */}

        {/* TIP + GMAIL INSTRUCTIONS */}

        <div
          className="rounded-md border p-4 text-xs leading-relaxed"
          style={{
            borderColor: T.accentLight || BRAND.border,
            background: T.accentLight || BRAND.white,
            color: T.muted || BRAND.muted,
          }}
        >
          <strong
            style={{
              color: T.primary,
            }}
          >
            Tip:
          </strong>{" "}
          Click <strong>Copy Signature</strong> and paste it directly into Gmail, or your email signature settings.
          <div
            className="mt-3 border-t pt-3"
            style={{
              borderColor: T.border || BRAND.border,
            }}
          >
            <div>
              <strong style={{ color: T.primary }}>Gmail:</strong> Settings ⚙ → See all settings → Signature → New → paste with{" "}
              <code
                className="rounded px-1.5 py-0.5 font-mono"
                style={{
                  background: T.surface || BRAND.white,
                  color: T.primary,
                  border: `1px solid ${T.border || BRAND.border}`,
                }}
              >
                Ctrl+V
              </code>
            </div>
          </div>
        </div>

        {/* NOTE */}

        {note && (
          <div
            className="rounded-md border p-3 text-center text-xs font-bold"
            style={{
              borderColor: T.secondary,

              background: T.secondaryLight || BRAND.white,

              color: T.secondary,
            }}
          >
            {note}
          </div>
        )}
      </div>

      {/* =====================================================
          RIGHT SIDE / LIVE PREVIEW
          ===================================================== */}

      <section
        id="s-out"
        className="scroll-mt-24 w-full min-w-0 max-w-full overflow-hidden rounded-md border p-3 sm:p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)] lg:sticky lg:top-20 self-start"
        style={{
          borderColor: T.border || BRAND.border,

          background: T.surface || BRAND.white,
        }}
      >
        {/* PREVIEW HEADER */}

        <div className="mb-4 sm:mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full shadow-md"
              style={{
                background: T.accentLight || BRAND.white,

                color: T.accent,
              }}
            >
              <FaEnvelope size={18} className="sm:size-[20px]" />
            </div>

            <div>
              <h2
                className="text-base sm:text-lg font-extrabold"
                style={{
                  color: T.primary,
                }}
              >
                Live Preview
              </h2>

              <p
                className="text-xs"
                style={{
                  color: T.muted || BRAND.muted,
                }}
              >
                Your email signature
              </p>
            </div>
          </div>

          <span
            className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold sm:inline-flex"
            style={{
              background: T.secondaryLight || BRAND.white,

              color: T.secondary,
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: T.secondary,
              }}
            />
            LIVE PREVIEW
          </span>
        </div>

        {/* MOBILE VIEW SELECTOR TABS (MOBILE ONLY) */}
        <div className="mb-3.5 flex items-center gap-1.5 rounded-md bg-slate-100 p-1 sm:hidden">
          <button
            type="button"
            onClick={() => setMobileTab("card")}
            className="flex-1 rounded-md py-1.5 px-2.5 text-xs font-bold transition shadow-xs"
            style={
              mobileTab === "card"
                ? {
                    background: T.primary,
                    color: "#ffffff",
                  }
                : {
                    background: "transparent",
                    color: T.muted || BRAND.muted,
                  }
            }
          >
            Mobile Template
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("table")}
            className="flex-1 rounded-md py-1.5 px-2.5 text-xs font-bold transition shadow-xs"
            style={
              mobileTab === "table"
                ? {
                    background: T.primary,
                    color: "#ffffff",
                  }
                : {
                    background: "transparent",
                    color: T.muted || BRAND.muted,
                  }
            }
          >
            Full HTML Table
          </button>
        </div>

        {/* DESKTOP TABLE PREVIEW (DEFAULT ON DESKTOP/LAPTOP, ACCESSIBLE ON MOBILE VIA TAB) */}

        <div
          className={`${
            mobileTab === "table" ? "flex flex-col" : "hidden sm:flex"
          } min-h-[380px] sm:min-h-[420px] items-center justify-center overflow-hidden rounded-md border p-3 sm:p-8`}
          style={{
            borderColor: T.border || BRAND.border,

            background: T.background || "#F8FAFC",
          }}
        >
          {mobileTab === "table" && (
            <p className="mb-2 text-center text-[10px] font-bold text-slate-500 sm:hidden">↔ Swipe horizontally to view full table</p>
          )}

          <div className="w-full max-w-[850px]">
            <div
              className="overflow-x-auto rounded-md border p-3.5 shadow-sm sm:p-10"
              style={{
                borderColor: T.border || BRAND.border,

                background: T.surface || BRAND.white,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: signatureHtml,
                }}
              />
            </div>
          </div>
        </div>

        {/* MOBILE TEMPLATE PREVIEW (DEFAULT ON MOBILE, HIDDEN ON DESKTOP/LAPTOP) */}

        <div
          className={`${mobileTab === "card" ? "block" : "hidden"} sm:hidden rounded-md border p-4 shadow-sm`}
          style={{
            borderColor: T.border || BRAND.border,

            background: T.surface || BRAND.white,
          }}
        >
          <div className="mb-3 flex items-center justify-between pb-2.5 border-b" style={{ borderColor: T.border || BRAND.border }}>
            <div className="flex items-center gap-2">
              <FaEnvelope color={T.accent} size={14} />
              <span
                className="text-xs font-bold"
                style={{
                  color: T.primary,
                }}
              >
                Mobile Template Preview
              </span>
            </div>

            <button
              type="button"
              onClick={copied ? undefined : copySignature}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-xs"
              style={{ background: copied ? T.secondary : T.primary }}
            >
              {copied ? <FaCheck size={10} /> : <FaCopy size={10} />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div
                  className="text-base font-extrabold truncate"
                  style={{
                    color: T.primary,
                  }}
                >
                  {data.name || "Your Name"}
                </div>

                <div
                  className="text-xs font-semibold"
                  style={{
                    color: T.secondary,
                  }}
                >
                  {data.designation || "Your Designation"}
                </div>

                <div
                  className="text-xs font-bold truncate"
                  style={{
                    color: T.primary,
                  }}
                >
                  {data.company || "Company"}
                </div>
              </div>

              {(data.logo || company?.logo) && (
                <div className="h-10 w-24 shrink-0 flex items-center justify-end">
                  <img
                    src={data.logo || company?.logo}
                    alt={data.company || "Company Logo"}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div
              className="h-0.5 w-full rounded"
              style={{
                background: T.gradient || T.primary,
              }}
            />

            <div
              className="space-y-1.5 text-xs"
              style={{
                color: T.text || T.primary,
              }}
            >
              {data.phone && (
                <div className="flex items-center gap-2">
                  <strong className="text-[11px] text-slate-500 min-w-[55px]">Phone:</strong>
                  <a
                    href={`tel:${data.phone.replace(/[^+\d]/g, "")}`}
                    className="hover:underline font-semibold"
                    style={{ color: T.primary }}
                  >
                    {data.phone}
                  </a>
                </div>
              )}

              {data.email && (
                <div className="flex items-center gap-2">
                  <strong className="text-[11px] text-slate-500 min-w-[55px]">Email:</strong>
                  <a href={`mailto:${data.email}`} className="hover:underline font-semibold truncate" style={{ color: T.accent }}>
                    {data.email}
                  </a>
                </div>
              )}

              {(data.branch || data.address) && (
                <div className="pt-1.5 border-t" style={{ borderColor: T.border || BRAND.border }}>
                  <div className="text-[10px] font-extrabold tracking-wider uppercase mb-0.5" style={{ color: T.muted || BRAND.muted }}>
                    {data.branch === "Both Branches" ? "BRANCHES" : "BRANCH"}
                  </div>
                  <div className="whitespace-pre-line text-xs leading-relaxed">
                    {data.branch && data.branch !== "Both Branches" && <strong style={{ color: T.primary }}>{data.branch}: </strong>}
                    <span>{data.address}</span>
                  </div>
                </div>
              )}

              {data.website && (
                <div className="flex items-center gap-2 pt-1">
                  <strong className="text-[11px] text-slate-500 min-w-[55px]">Website:</strong>
                  <a
                    href={data.website.startsWith("http") ? data.website : `https://${data.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold hover:underline"
                    style={{ color: T.primary }}
                  >
                    {data.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div>

            {/* MOBILE SOCIAL */}
            {(data.facebook || data.linkedin || data.instagram) && (
              <div className="mt-2 flex gap-2 pt-2 border-t" style={{ borderColor: T.border || BRAND.border }}>
                {data.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-7 w-7 place-items-center rounded-md text-white"
                    style={{ background: "#1877F2" }}
                  >
                    <FaFacebookF size={12} />
                  </a>
                )}

                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-7 w-7 place-items-center rounded-md text-white"
                    style={{ background: "#0A66C2" }}
                  >
                    <FaLinkedinIn size={12} />
                  </a>
                )}

                {data.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-7 w-7 place-items-center rounded-md text-white"
                    style={{ background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)" }}
                  >
                    <FaInstagram size={12} />
                  </a>
                )}
              </div>
            )}

            {/* MOBILE DISCLAIMER */}
            {data.disclaimer && (
              <div
                className="mt-2 border-t pt-2 text-[10px] leading-relaxed"
                style={{
                  borderColor: T.border || BRAND.border,
                  color: T.muted || BRAND.muted,
                }}
              >
                <strong>Disclaimer:</strong> {data.disclaimer}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE DIRECT ACTION BUTTON UNDER PREVIEW */}
        <div className="mt-4 sm:hidden">
          <button
            type="button"
            onClick={copied ? undefined : copySignature}
            className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-xs font-bold text-white shadow-md transition active:scale-[0.99]"
            style={{
              background: copied ? T.secondary : T.primary,
            }}
          >
            {copied ? (
              <>
                <FaCheck />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <FaCopy />
                <span>Copy Signature to Clipboard</span>
              </>
            )}
          </button>
        </div>

        {/* SUCCESS MESSAGE */}

        {copied && (
          <div
            className="mt-5 flex items-start gap-3 rounded-md border p-4"
            style={{
              borderColor: T.secondaryLight || BRAND.border,

              background: T.secondaryLight || BRAND.white,

              color: T.secondary,
            }}
          >
            <FaCheck className="mt-0.5" size={14} />

            <div>
              <p className="text-sm font-bold">Signature copied successfully</p>

              <p className="mt-0.5 text-xs">Open Gmail, or your email settings and paste the signature into the signature section.</p>
            </div>
          </div>
        )}
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
            background: T.primary,
            boxShadow: "0 6px 20px rgba(0,0,0,0.35)",
          }}
        >
          <FaEye size={13} />
          <span>Live Signature</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>
    </div>
  );
}
