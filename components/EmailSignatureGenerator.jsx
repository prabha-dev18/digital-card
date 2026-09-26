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
    id: "Operations",
    icon: "Operations",
  },
  {
    id: "Management",
    icon: "Management",
  },
];

function Section({ id, no, title, sub, icon: Icon, children, theme }) {
  const T = theme || DEFAULT_THEME;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-md border bg-white p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
      style={{
        borderColor: T.border || BRAND.border,
        background: T.surface || BRAND.white,
      }}
    >
      <div className="mb-4 flex items-center gap-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white shadow-md"
          style={{
            background: T.gradient || T.primary,
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

  const T = theme || company?.theme || DEFAULT_THEME;

  const companyData = company?.data || {};

  const data = {
    ...DEFAULT_DATA,
    ...(externalData || localData),

    company: company?.fullName || company?.name || (externalData || localData)?.company || DEFAULT_DATA.company,

    logo: company?.logo || (externalData || localData)?.logo || DEFAULT_DATA.logo,

    website: companyData.website || (externalData || localData)?.website || DEFAULT_DATA.website,

    address: companyData.address || (externalData || localData)?.address || DEFAULT_DATA.address,

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

    const companyName = escapeHtml(data.company || "Next-Gen Business Consultancy PVT. LTD");

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
                      BRANCH
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
                        branch
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
                            <span style="padding-left:8px;">
                              ${address}
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
                width:180px;
                padding:0;
                vertical-align:top;
                text-align:right;
              "
            >
              <img
                src="${logo}"
                alt="${companyName}"
                width="180"
                style="
                  display:block;
                  width:180px;
                  max-width:180px;
                  height:auto;
                  border:0;
                  outline:none;
                  text-decoration:none;
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

      website: companyData.website || initialData?.website || DEFAULT_DATA.website,

      address: companyData.address || initialData?.address || DEFAULT_DATA.address,

      email: initialData?.email || companyData.email || DEFAULT_DATA.email,

      phone: initialData?.phone || companyData.phone || DEFAULT_DATA.phone,

      branch: initialData?.branch || companyData.branch || DEFAULT_DATA.branch,

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
    if (typeof onReady === "function") {
      onReady();
    }
  };

  return (
    <div
      className="grid min-w-0 gap-5 p-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:p-5"
      style={{
        background: T.background || DEFAULT_THEME.background,
      }}
    >
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

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {DEPTS.map((item) => (
              <Choice
                key={item.id}
                label={item.id}
                selected={data.dept === item.id}
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
              placeholder="Vikas Parmar"
              theme={T}
            />

            <Field
              label="Designation"
              icon={FaUserTie}
              value={data.designation}
              onChange={(v) => updateData("designation", v)}
              placeholder="Full-Stack Developer"
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
              placeholder="vikasparmar@nextgenconsultancy.in"
              theme={T}
            />

            <Field
              label="Website"
              icon={FaGlobe}
              value={data.website}
              onChange={(v) => updateData("website", v)}
              placeholder="https://www.nextgenbusiness.co.in"
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
        className="scroll-mt-24 min-w-0 rounded-md border p-5 shadow-[0_6px_24px_rgba(3,37,76,.07)]"
        style={{
          borderColor: T.border || BRAND.border,

          background: T.surface || BRAND.white,
        }}
      >
        {/* PREVIEW HEADER */}

        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="grid h-12 w-12 place-items-center rounded-full shadow-md"
              style={{
                background: T.accentLight || BRAND.white,

                color: T.accent,
              }}
            >
              <FaEnvelope size={20} />
            </div>

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

        {/* DESKTOP PREVIEW */}

        <div
          className="flex min-h-[420px] items-center justify-center overflow-hidden rounded-md border p-4 sm:p-8"
          style={{
            borderColor: T.border || BRAND.border,

            background: T.background || "#F8FAFC",
          }}
        >
          <div className="w-full max-w-[850px]">
            <div
              className="overflow-x-auto rounded-md border p-6 shadow-sm sm:p-10"
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

        {/* MOBILE PREVIEW */}

        <div
          className="mt-5 rounded-md border p-5 sm:hidden"
          style={{
            borderColor: T.border || BRAND.border,

            background: T.surface || BRAND.white,
          }}
        >
          <div className="mb-4 flex items-center gap-2">
            <FaEnvelope color={T.accent} size={14} />

            <span
              className="text-xs font-bold"
              style={{
                color: T.primary,
              }}
            >
              Mobile Preview
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <div
                className="text-lg font-bold"
                style={{
                  color: T.primary,
                }}
              >
                {data.name || "Your Name"}
              </div>

              <div
                className="mt-1 text-sm font-semibold"
                style={{
                  color: T.primary,
                }}
              >
                {data.designation || "Your Designation"}
              </div>

              <div
                className="mt-1 text-sm font-semibold"
                style={{
                  color: T.primary,
                }}
              >
                {data.company || "Company"}
              </div>

              <div
                className="mt-3 h-px w-full"
                style={{
                  background: T.primary,
                }}
              />

              <div
                className="mt-4 space-y-1.5 text-xs"
                style={{
                  color: T.text || T.primary,
                }}
              >
                {data.phone && (
                  <div>
                    <strong>Phone:</strong> {data.phone}
                  </div>
                )}

                {data.email && (
                  <div>
                    <strong>Email:</strong> {data.email}
                  </div>
                )}

                {data.branch && (
                  <div className="pt-2">
                    <span
                      className="font-semibold"
                      style={{
                        color: T.muted || BRAND.muted,
                      }}
                    >
                      BRANCH
                    </span>
                  </div>
                )}

                {data.address && (
                  <div>
                    <strong
                      style={{
                        color: T.primary,
                      }}
                    >
                      {data.branch}:
                    </strong>{" "}
                    {data.address}
                  </div>
                )}

                {data.website && (
                  <div className="pt-2">
                    <strong>Website:</strong> {data.website}
                  </div>
                )}
              </div>

              {/* MOBILE SOCIAL */}

              <div className="mt-4 flex gap-2">
                {data.facebook && (
                  <a
                    href={data.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-sm text-white"
                    style={{
                      background: "#1877F2",
                    }}
                  >
                    <FaFacebookF size={14} />
                  </a>
                )}

                {data.linkedin && (
                  <a
                    href={data.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-sm text-white"
                    style={{
                      background: "#0A66C2",
                    }}
                  >
                    <FaLinkedinIn size={14} />
                  </a>
                )}

                {data.instagram && (
                  <a
                    href={data.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-sm text-white"
                    style={{
                      background: "linear-gradient(135deg,#F58529,#DD2A7B,#8134AF,#515BD4)",
                    }}
                  >
                    <FaInstagram size={14} />
                  </a>
                )}
              </div>

              {/* MOBILE DISCLAIMER */}

              {data.disclaimer && (
                <div
                  className="mt-4 border-t pt-3 text-[10px] leading-relaxed"
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
    </div>
  );
}
