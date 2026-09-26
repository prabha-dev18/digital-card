"use client";

import { useMemo } from "react";
import { FaHandshake, FaBullseye, FaLightbulb } from "react-icons/fa6";
import { QRCodeSVG } from "qrcode.react";

import { BRAND, COMPANY } from "../lib/cardConfig";
import { downloadVCard, generateVCard } from "../lib/generateVCard";

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
   AARAMBH GROW GROUP DESIGN
   DO NOT CHANGE THIS STRUCTURE
========================================================= */

const GROUP_DESIGN = {
  landscape: {
    background: "/p-bg2.png",

    qr: {
      columnWidth: "30%",
      paddingLeft: "4cqw",
      paddingRight: "2cqw",
      gap: "1.5cqw",
      buttonPadding: "0.7cqw",
      innerPadding: "0.8cqw",
      size: "16cqw",
      maxWidth: "110px",
      maxHeight: "110px",
      textSize: "2.1cqw",
    },

    divider: {
      marginTop: "9%",
      marginBottom: "9%",
      width: "0.12cqw",
    },

    main: {
      paddingTop: "5%",
      paddingBottom: "5%",
      paddingLeft: "3%",
      paddingRight: "11%",
      gap: "1.5cqw",
    },

    heading: {
      size: "3.1cqw",
    },

    vision: {
      gap: "1.5cqw",
      lineWidth: "5cqw",
      lineHeight: "0.35cqw",
      textSize: "2.1cqw",
      separatorLeft: "1.2cqw",
      separatorRight: "1.2cqw",
    },

    logos: {
      gap: "2cqw",

      service: {
        width: "18cqw",
        height: "15cqw",
      },

      advisory: {
        width: "15cqw",
        height: "14cqw",
        marginTop: "-2.6cqw",
      },

      infinity: {
        width: "17cqw",
        height: "14cqw",
      },

      divider: {
        width: "0.12cqw",
        height: "8cqw",
      },
    },

    motto: {
      gap: "1.5cqw",
      lineWidth: "5cqw",
      lineHeight: "0.35cqw",
      textSize: "2cqw",
    },

    features: {
      marginTop: "0.3cqw",
      gap: "1.5cqw",
      iconSize: "4.2cqw",
      iconInnerSize: "1.9cqw",
      textSize: "1.55cqw",
      dividerWidth: "0.12cqw",
      dividerHeight: "4.5cqw",
      itemGap: "1cqw",
    },
  },

  portrait: {
    background: "/p-bg2.png",

    qr: {
      paddingTop: "8cqw",
      buttonPadding: "0.8cqw",
      innerPadding: "1cqw",
      size: "24cqw",
      maxWidth: "150px",
      maxHeight: "150px",
      textSize: "3cqw",
      textMarginTop: "1.5cqw",
    },

    divider: {
      marginTop: "4cqw",
      width: "76%",
      height: "0.12cqw",
    },

    main: {
      width: "86%",
      paddingBottom: "7cqw",
      gap: "3cqw",
    },

    heading: {
      size: "4cqw",
    },

    vision: {
      gap: "2cqw",
      lineWidth: "5cqw",
      lineHeight: "0.35cqw",
      textSize: "2.6cqw",
      separatorLeft: "1.5cqw",
      separatorRight: "1.5cqw",
    },

    logos: {
      gap: "2.5cqw",

      service: {
        width: "18cqw",
        height: "14cqw",
      },

      advisory: {
        width: "15cqw",
        height: "13cqw",
        marginTop: "-1.5cqw",
      },

      infinity: {
        width: "17cqw",
        height: "13cqw",
      },

      divider: {
        width: "0.12cqw",
        height: "9cqw",
      },
    },

    motto: {
      gap: "2cqw",
      lineWidth: "5cqw",
      lineHeight: "0.35cqw",
      textSize: "2.4cqw",
    },
  },
};

/* =========================================================
   COMPANY CARD DESIGN
   Used for Advisory / Services / Infinity / Nexera / EuroAsia
========================================================= */

const COMPANY_DESIGN = {
  landscape: {
    background: "#FFFFFF",
    padding: "5cqw",

    logoWidth: "15cqw",
    logoHeight: "9cqw",

    headingSize: "3.2cqw",
    subtitleSize: "1.55cqw",

    dividerWidth: "18cqw",
    dividerHeight: "0.3cqw",

    servicesTitleSize: "1.65cqw",
    serviceSize: "1.35cqw",

    serviceGap: "1.2cqw",
    columnGap: "4cqw",

    taglineSize: "1.5cqw",
    websiteSize: "1.2cqw",
    emailSize: "1.2cqw",

    qrSize: "8cqw",
  },

  portrait: {
    background: "#FFFFFF",
    padding: "7cqw",

    logoWidth: "35cqw",
    logoHeight: "20cqw",

    headingSize: "4.5cqw",
    subtitleSize: "2.2cqw",

    dividerWidth: "28cqw",
    dividerHeight: "0.5cqw",

    servicesTitleSize: "2.6cqw",
    serviceSize: "2.15cqw",

    serviceGap: "2cqw",
    columnGap: "6cqw",

    taglineSize: "2.3cqw",
    websiteSize: "1.9cqw",
    emailSize: "1.9cqw",

    qrSize: "18cqw",
  },
};

/* =========================================================
   SMALL HELPER
========================================================= */

function getCompanyBackType(company) {
  if (!company) return "group";

  if (company.id === "aarambhgrow" || company.backCard?.type === "group") {
    return "group";
  }

  return "company";
}

/* =========================================================
   COMPANY BACK CARD
========================================================= */

function CompanyBackCard({ data, company, orientation, theme, vcardValue, handleSaveContact }) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const primary = T.primary || DEFAULT_THEME.primary;
  const secondary = T.secondary || DEFAULT_THEME.secondary;
  const accent = T.accent || DEFAULT_THEME.accent;
  const gradient = T.gradient || DEFAULT_THEME.gradient;

  const isPortrait = orientation === "portrait";

  const design = isPortrait ? COMPANY_DESIGN.portrait : COMPANY_DESIGN.landscape;

  const backCard = company?.backCard || {};

  const services = Array.isArray(backCard.services) ? backCard.services : [];

  const logo = company?.cardLogo || company?.logo || "/aarambh.png";

  /*
   * COMPANY-WISE BACKGROUND
   *
   * Uses:
   * company.cardBackground.back
   *
   * Example:
   * advisory -> /advisory-back-bg.png
   * services -> /services-back-bg.png
   * infinity -> /infinity-back-bg.png
   * nexera -> /nexera-back-bg.png
   * euroasia -> /euroasia-back-bg.png
   */
  const cardBackground = company?.cardBackground?.back || null;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: design.background,
        color: primary,
      }}
    >
      {/* =================================================
          COMPANY BACKGROUND IMAGE
      ================================================= */}

      {cardBackground && (
        <img src={cardBackground} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" draggable="false" />
      )}

      {/* =================================================
          LIGHT OVERLAY
          Keeps text readable on background images
      ================================================= */}

      {cardBackground && (
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(255,255,255,0.08)",
          }}
        />
      )}

      {/* ================================================
          DECORATIVE TOP BAR
      ================================================= */}

      <div
        className="absolute left-0 top-0 h-full w-[1.2%]"
        style={{
          background: gradient,
        }}
      />

      <div
        className="absolute right-0 top-0 h-full w-[1.2%]"
        style={{
          background: gradient,
        }}
      />

      {/* ================================================
          MAIN
      ================================================= */}

      <div
        className="relative z-10 flex h-full w-full flex-col items-center text-center"
        style={{
          padding: design.padding,
        }}
      >
        {/* LOGO */}

        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            width: design.logoWidth,
            height: design.logoHeight,
          }}
        >
          <img src={logo} alt={backCard.title || company?.name || "Company"} className="h-full w-full object-contain" draggable="false" />
        </div>

        {/* COMPANY NAME */}

        <h2
          className="mt-[1.5cqw] font-extrabold leading-tight"
          style={{
            color: primary,
            fontSize: design.headingSize,
          }}
        >
          {backCard.title || company?.name}
        </h2>

        {/* SUBTITLE */}

        {backCard.subtitle && (
          <p
            className="mt-[0.7cqw] font-medium leading-tight"
            style={{
              color: primary,
              opacity: 0.72,
              fontSize: design.subtitleSize,
            }}
          >
            {backCard.subtitle}
          </p>
        )}

        {/* DECORATIVE LINE */}

        <div
          className="mt-[1.5cqw] rounded-full"
          style={{
            width: design.dividerWidth,
            height: design.dividerHeight,
            background: gradient,
          }}
        />

        {/* SERVICES TITLE */}

        <p
          className="mt-[1.5cqw] font-extrabold uppercase tracking-[0.12em]"
          style={{
            color: primary,
            fontSize: design.servicesTitleSize,
          }}
        >
          {backCard.servicesTitle || "Our Services"}
        </p>

        {/* SERVICES */}

        <div
          className="mt-[1.2cqw] grid w-full"
          style={{
            gridTemplateColumns: "1fr 1fr",
            columnGap: design.columnGap,
            rowGap: design.serviceGap,
          }}
        >
          {services.map((service, index) => (
            <div
              key={`${service}-${index}`}
              className="flex min-w-0 items-center text-left"
              style={{
                gap: isPortrait ? "1.3cqw" : "0.7cqw",
              }}
            >
              <span
                className="shrink-0 rounded-full"
                style={{
                  width: isPortrait ? "1.6cqw" : "0.9cqw",
                  height: isPortrait ? "1.6cqw" : "0.9cqw",
                  backgroundColor: index % 2 === 0 ? accent : secondary,
                }}
              />

              <span
                className="font-semibold leading-tight"
                style={{
                  color: primary,
                  fontSize: design.serviceSize,
                }}
              >
                {service}
              </span>
            </div>
          ))}
        </div>

        {/* TAGLINE */}

        {backCard.tagline && (
          <p
            className="mt-[1.8cqw] font-bold leading-tight"
            style={{
              color: primary,
              fontSize: design.taglineSize,
            }}
          >
            {backCard.tagline}
          </p>
        )}

        {/* CONTACT DETAILS */}

        <div
          className="mt-[1.2cqw] flex flex-wrap items-center justify-center"
          style={{
            gap: isPortrait ? "2cqw" : "1.5cqw",
          }}
        >
          {backCard.website && (
            <span
              className="font-semibold"
              style={{
                color: primary,
                fontSize: design.websiteSize,
              }}
            >
              {backCard.website}
            </span>
          )}

          {backCard.email && (
            <span
              className="font-semibold"
              style={{
                color: primary,
                opacity: 0.8,
                fontSize: design.emailSize,
              }}
            >
              {backCard.email}
            </span>
          )}
        </div>

        {/* QR */}

        <button
          type="button"
          data-no-flip
          onClick={handleSaveContact}
          aria-label="Save contact"
          className="mt-[1.5cqw] rounded-md transition-transform duration-300 hover:scale-[1.03]"
          style={{
            padding: isPortrait ? "0.8cqw" : "0.5cqw",
            background: gradient,
          }}
        >
          <span
            className="block rounded-md bg-white"
            style={{
              padding: isPortrait ? "0.9cqw" : "0.6cqw",
            }}
          >
            <QRCodeSVG
              value={vcardValue}
              level="L"
              fgColor={primary}
              bgColor="#FFFFFF"
              style={{
                width: design.qrSize,
                height: design.qrSize,
                maxWidth: isPortrait ? "180px" : "90px",
                maxHeight: isPortrait ? "180px" : "90px",
              }}
            />
          </span>
        </button>

        <p
          className="mt-[0.6cqw] font-semibold"
          style={{
            color: primary,
            fontSize: isPortrait ? "1.9cqw" : "1.1cqw",
          }}
        >
          Scan QR Code • Save Contact
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN CARD BACK
========================================================= */

export default function CardBack({ data, innerRef, orientation = "landscape", company, theme }) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const primary = T.primary || DEFAULT_THEME.primary;

  const secondary = T.secondary || DEFAULT_THEME.secondary;

  const accent = T.accent || DEFAULT_THEME.accent;

  const gradient = T.gradient || DEFAULT_THEME.gradient;

  const isPortrait = orientation === "portrait";

  const design = isPortrait ? GROUP_DESIGN.portrait : GROUP_DESIGN.landscape;

  const vcardValue = useMemo(() => generateVCard(data), [data]);

  const handleSaveContact = (event) => {
    event.stopPropagation();
    downloadVCard(data);
  };

  const backType = getCompanyBackType(company);

  /*
   * IMPORTANT:
   * CardBack itself MUST NOT rotate.
   * HomeShell controls the card side.
   */

  return (
    <div
      ref={innerRef}
      data-card-orientation={orientation}
      data-card-back-export
      className="absolute inset-0 overflow-hidden rounded-md shadow-card"
      style={{
        width: "100%",
        height: "100%",
        containerType: "inline-size",

        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* ==================================================
          NON-GROUP COMPANIES
      ================================================== */}

      {backType === "company" ? (
        <CompanyBackCard
          data={data}
          company={company}
          orientation={orientation}
          theme={T}
          vcardValue={vcardValue}
          handleSaveContact={handleSaveContact}
        />
      ) : (
        <>
          {/* =================================================
              AARAMBH GROW GROUP BACKGROUND

              KEEP THIS ORIGINAL STRUCTURE
          ================================================= */}

          <img src={design.background} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" draggable="false" />

          {/* =================================================
              PORTRAIT GROUP CARD
          ================================================= */}

          {isPortrait ? (
            <div className="relative z-10 flex h-full w-full flex-col items-center">
              {/* QR */}

              <div
                data-no-flip
                className="flex w-full flex-col items-center justify-center"
                style={{
                  paddingTop: design.qr.paddingTop,
                }}
              >
                <button
                  type="button"
                  onClick={handleSaveContact}
                  aria-label="Save contact"
                  className="rounded-md shadow-soft transition-transform duration-300 hover:scale-[1.03]"
                  style={{
                    padding: design.qr.buttonPadding,
                    background: gradient,
                  }}
                >
                  <span
                    className="block rounded-[9px] bg-white"
                    style={{
                      padding: design.qr.innerPadding,
                    }}
                  >
                    <QRCodeSVG
                      value={vcardValue}
                      level="L"
                      fgColor={primary}
                      bgColor="#FFFFFF"
                      style={{
                        width: design.qr.size,
                        height: design.qr.size,
                        maxWidth: design.qr.maxWidth,
                        maxHeight: design.qr.maxHeight,
                      }}
                    />
                  </span>
                </button>

                <p
                  className="text-center font-semibold leading-snug"
                  style={{
                    marginTop: design.qr.textMarginTop,
                    fontSize: design.qr.textSize,
                    color: primary,
                  }}
                >
                  Scan QR Code
                  <br />
                  Save Contact
                </p>
              </div>

              {/* DIVIDER */}

              <div
                style={{
                  marginTop: design.divider.marginTop,
                  width: design.divider.width,
                  height: design.divider.height,
                  backgroundColor: primary,
                  opacity: 0.2,
                }}
              />

              {/* MAIN */}

              <div
                className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
                style={{
                  width: design.main.width,
                  paddingBottom: design.main.paddingBottom,
                  gap: design.main.gap,
                }}
              >
                {/* HEADING */}

                <p
                  className="font-extrabold leading-tight"
                  style={{
                    fontSize: design.heading.size,
                  }}
                >
                  <span
                    style={{
                      color: primary,
                    }}
                  >
                    {company?.name || COMPANY.brandName || "AarambhGrow"}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color: primary,
                      opacity: 0.7,
                    }}
                  >
                    {company?.fullName || COMPANY.backHeadingTail || ""}
                  </span>
                </p>

                {/* VISION */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.vision.gap,
                  }}
                >
                  <span
                    className="rounded"
                    style={{
                      width: design.vision.lineWidth,
                      height: design.vision.lineHeight,
                      backgroundColor: accent,
                    }}
                  />

                  <p
                    className="whitespace-nowrap font-medium"
                    style={{
                      fontSize: design.vision.textSize,
                      color: primary,
                    }}
                  >
                    {COMPANY.visionLine.left}

                    <span
                      style={{
                        marginLeft: design.vision.separatorLeft,
                        marginRight: design.vision.separatorRight,
                        color: accent,
                      }}
                    >
                      |
                    </span>

                    {COMPANY.visionLine.right}
                  </p>

                  <span
                    className="rounded"
                    style={{
                      width: design.vision.lineWidth,
                      height: design.vision.lineHeight,
                      backgroundColor: secondary,
                    }}
                  />
                </div>

                {/* COMPANY LOGOS */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.logos.gap,
                  }}
                >
                  <img
                    src="/service.png"
                    alt="AarambhGrow Services Private Limited"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.service.width,
                      height: design.logos.service.height,
                    }}
                  />

                  <span
                    style={{
                      width: design.logos.divider.width,
                      height: design.logos.divider.height,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  <img
                    src="/advisory.png"
                    alt="AarambhGrow Advisory Private Limited"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.advisory.width,
                      height: design.logos.advisory.height,
                      marginTop: design.logos.advisory.marginTop,
                    }}
                  />

                  <span
                    style={{
                      width: design.logos.divider.width,
                      height: design.logos.divider.height,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  <img
                    src="/infinity.png"
                    alt="AarambhGrow Infinity"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.infinity.width,
                      height: design.logos.infinity.height,
                    }}
                  />
                </div>

                {/* MOTTO */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.motto.gap,
                  }}
                >
                  <span
                    className="rounded"
                    style={{
                      width: design.motto.lineWidth,
                      height: design.motto.lineHeight,
                      backgroundColor: accent,
                    }}
                  />

                  <p
                    className="whitespace-nowrap font-semibold"
                    style={{
                      fontSize: design.motto.textSize,
                      color: primary,
                    }}
                  >
                    {COMPANY.mottoLine}
                  </p>

                  <span
                    className="rounded"
                    style={{
                      width: design.motto.lineWidth,
                      height: design.motto.lineHeight,
                      backgroundColor: secondary,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* =================================================
               LANDSCAPE GROUP CARD
            ================================================= */

            <div className="relative z-10 flex h-full w-full">
              {/* QR COLUMN */}

              <div
                data-no-flip
                className="flex shrink-0 flex-col items-center justify-center"
                style={{
                  width: design.qr.columnWidth,
                  paddingLeft: design.qr.paddingLeft,
                  paddingRight: design.qr.paddingRight,
                  gap: design.qr.gap,
                }}
              >
                <button
                  type="button"
                  onClick={handleSaveContact}
                  aria-label="Save contact"
                  className="rounded-md shadow-soft transition-transform duration-300 hover:scale-[1.03]"
                  style={{
                    padding: design.qr.buttonPadding,
                    background: gradient,
                  }}
                >
                  <span
                    className="block rounded-[9px] bg-white"
                    style={{
                      padding: design.qr.innerPadding,
                    }}
                  >
                    <QRCodeSVG
                      value={vcardValue}
                      level="L"
                      fgColor={primary}
                      bgColor="#FFFFFF"
                      style={{
                        width: design.qr.size,
                        height: design.qr.size,
                        maxWidth: design.qr.maxWidth,
                        maxHeight: design.qr.maxHeight,
                      }}
                    />
                  </span>
                </button>

                <p
                  className="text-center font-semibold leading-snug"
                  style={{
                    fontSize: design.qr.textSize,
                    color: primary,
                  }}
                >
                  Scan QR Code
                  <br />
                  Save Contact
                </p>
              </div>

              {/* VERTICAL DIVIDER */}

              <div
                className="shrink-0"
                style={{
                  marginTop: design.divider.marginTop,
                  marginBottom: design.divider.marginBottom,
                  width: design.divider.width,
                  backgroundColor: primary,
                  opacity: 0.2,
                }}
              />

              {/* RIGHT CONTENT */}

              <div
                className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
                style={{
                  paddingTop: design.main.paddingTop,
                  paddingBottom: design.main.paddingBottom,
                  paddingLeft: design.main.paddingLeft,
                  paddingRight: design.main.paddingRight,
                  gap: design.main.gap,
                }}
              >
                {/* HEADING */}

                <p
                  className="font-extrabold leading-tight"
                  style={{
                    fontSize: design.heading.size,
                  }}
                >
                  <span
                    style={{
                      color: primary,
                    }}
                  >
                    {company?.name || COMPANY.brandName || "AarambhGrow"}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color: primary,
                      opacity: 0.7,
                    }}
                  >
                    {company?.fullName || COMPANY.backHeadingTail || ""}
                  </span>
                </p>

                {/* VISION */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.vision.gap,
                  }}
                >
                  <span
                    className="rounded"
                    style={{
                      width: design.vision.lineWidth,
                      height: design.vision.lineHeight,
                      backgroundColor: accent,
                    }}
                  />

                  <p
                    className="whitespace-nowrap font-medium"
                    style={{
                      fontSize: design.vision.textSize,
                      color: primary,
                    }}
                  >
                    {COMPANY.visionLine.left}

                    <span
                      style={{
                        marginLeft: design.vision.separatorLeft,
                        marginRight: design.vision.separatorRight,
                        color: accent,
                      }}
                    >
                      |
                    </span>

                    {COMPANY.visionLine.right}
                  </p>

                  <span
                    className="rounded"
                    style={{
                      width: design.vision.lineWidth,
                      height: design.vision.lineHeight,
                      backgroundColor: secondary,
                    }}
                  />
                </div>

                {/* COMPANY LOGOS */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.logos.gap,
                  }}
                >
                  <img
                    src="/service.png"
                    alt="AarambhGrow Services Private Limited"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.service.width,
                      height: design.logos.service.height,
                    }}
                  />

                  <span
                    style={{
                      width: design.logos.divider.width,
                      height: design.logos.divider.height,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  <img
                    src="/advisory.png"
                    alt="AarambhGrow Advisory Private Limited"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.advisory.width,
                      height: design.logos.advisory.height,
                      marginTop: design.logos.advisory.marginTop,
                    }}
                  />

                  <span
                    style={{
                      width: design.logos.divider.width,
                      height: design.logos.divider.height,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  <img
                    src="/infinity.png"
                    alt="AarambhGrow Infinity"
                    className="object-contain"
                    draggable="false"
                    style={{
                      width: design.logos.infinity.width,
                      height: design.logos.infinity.height,
                    }}
                  />
                </div>

                {/* MOTTO */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.motto.gap,
                  }}
                >
                  <span
                    className="rounded"
                    style={{
                      width: design.motto.lineWidth,
                      height: design.motto.lineHeight,
                      backgroundColor: accent,
                    }}
                  />

                  <p
                    className="whitespace-nowrap font-semibold"
                    style={{
                      fontSize: design.motto.textSize,
                      color: primary,
                    }}
                  >
                    {COMPANY.mottoLine}
                  </p>

                  <span
                    className="rounded"
                    style={{
                      width: design.motto.lineWidth,
                      height: design.motto.lineHeight,
                      backgroundColor: secondary,
                    }}
                  />
                </div>

                {/* FEATURES */}

                <div
                  className="flex w-full items-center justify-center"
                  style={{
                    gap: design.features.gap,
                    marginTop: design.features.marginTop,
                  }}
                >
                  {/* GROWTH */}

                  <div
                    className="flex items-center justify-center"
                    style={{
                      gap: design.features.itemGap,
                    }}
                  >
                    <span
                      className="grid shrink-0 place-items-center rounded-full text-white"
                      style={{
                        width: design.features.iconSize,
                        height: design.features.iconSize,
                        backgroundColor: secondary,
                      }}
                    >
                      <FaHandshake
                        style={{
                          width: design.features.iconInnerSize,
                          height: design.features.iconInnerSize,
                        }}
                      />
                    </span>

                    <p
                      className="text-left font-medium leading-tight"
                      style={{
                        fontSize: design.features.textSize,
                        color: primary,
                      }}
                    >
                      Growth
                      <br />
                      Partnership
                    </p>
                  </div>

                  <span
                    className="shrink-0"
                    style={{
                      width: design.features.dividerWidth,
                      height: design.features.dividerHeight,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  {/* SUSTAINABLE */}

                  <div
                    className="flex items-center justify-center"
                    style={{
                      gap: design.features.itemGap,
                    }}
                  >
                    <span
                      className="grid shrink-0 place-items-center rounded-full text-white"
                      style={{
                        width: design.features.iconSize,
                        height: design.features.iconSize,
                        backgroundColor: accent,
                      }}
                    >
                      <FaBullseye
                        style={{
                          width: design.features.iconInnerSize,
                          height: design.features.iconInnerSize,
                        }}
                      />
                    </span>

                    <p
                      className="text-left font-medium leading-tight"
                      style={{
                        fontSize: design.features.textSize,
                        color: primary,
                      }}
                    >
                      Sustainable
                      <br />
                      Progress
                    </p>
                  </div>

                  <span
                    className="shrink-0"
                    style={{
                      width: design.features.dividerWidth,
                      height: design.features.dividerHeight,
                      backgroundColor: primary,
                      opacity: 0.2,
                    }}
                  />

                  {/* POSSIBILITIES */}

                  <div
                    className="flex items-center justify-center"
                    style={{
                      gap: design.features.itemGap,
                    }}
                  >
                    <span
                      className="grid shrink-0 place-items-center rounded-full text-white"
                      style={{
                        width: design.features.iconSize,
                        height: design.features.iconSize,
                        backgroundColor: primary,
                      }}
                    >
                      <FaLightbulb
                        style={{
                          width: design.features.iconInnerSize,
                          height: design.features.iconInnerSize,
                        }}
                      />
                    </span>

                    <p
                      className="text-left font-medium leading-tight"
                      style={{
                        fontSize: design.features.textSize,
                        color: primary,
                      }}
                    >
                      Greater
                      <br />
                      Possibilities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
