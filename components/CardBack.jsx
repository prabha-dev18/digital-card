"use client";

import { useMemo } from "react";
import { FaHandshake, FaBullseye, FaLightbulb } from "react-icons/fa6";
import { QRCodeSVG } from "qrcode.react";

import { COMPANY } from "../lib/cardConfig";
import { downloadVCard, generateVCard } from "../lib/generateVCard";

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
   GROUP DESIGN
   DO NOT CHANGE STRUCTURE
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
   COMPANY DESIGN
   LANDSCAPE = LEFT QR + RIGHT CONTENT
   PORTRAIT = TOP QR + BOTTOM CONTENT
========================================================= */

const COMPANY_DESIGN = {
  landscape: {
    background: "#FFFFFF",

    qr: {
      columnWidth: "28%",
      paddingLeft: "4cqw",
      paddingRight: "2cqw",
      gap: "1.4cqw",
      buttonPadding: "0.7cqw",
      innerPadding: "0.8cqw",
      size: "14cqw",
      maxWidth: "105px",
      maxHeight: "105px",
      textSize: "1.8cqw",
    },

    divider: {
      marginTop: "9%",
      marginBottom: "9%",
      width: "0.12cqw",
    },

    main: {
      paddingTop: "4%",
      paddingBottom: "4%",
      paddingLeft: "3%",
      paddingRight: "7%",
      gap: "1.1cqw",
    },

    heading: {
      size: "3.2cqw",
    },

    subtitle: {
      size: "1.55cqw",
    },

    dividerLine: {
      width: "18cqw",
      height: "0.3cqw",
    },

    servicesTitle: {
      size: "1.65cqw",
    },

    services: {
      size: "1.35cqw",
      gap: "0.9cqw",
      columnGap: "3cqw",
    },

    tagline: {
      size: "1.5cqw",
    },

    contact: {
      website: "1.2cqw",
      email: "1.2cqw",
    },
  },

  portrait: {
    background: "#FFFFFF",

    qr: {
      paddingTop: "6cqw",
      buttonPadding: "0.8cqw",
      innerPadding: "1cqw",
      size: "20cqw",
      maxWidth: "150px",
      maxHeight: "150px",
      textSize: "2.5cqw",
      textMarginTop: "1.3cqw",
    },

    divider: {
      marginTop: "4cqw",
      width: "76%",
      height: "0.12cqw",
    },

    main: {
      width: "86%",
      paddingBottom: "6cqw",
      gap: "2cqw",
    },

    heading: {
      size: "4.5cqw",
    },

    subtitle: {
      size: "2.2cqw",
    },

    dividerLine: {
      width: "28cqw",
      height: "0.5cqw",
    },

    servicesTitle: {
      size: "2.6cqw",
    },

    services: {
      size: "2.15cqw",
      gap: "1.6cqw",
      columnGap: "6cqw",
    },

    tagline: {
      size: "2.3cqw",
    },

    contact: {
      website: "1.9cqw",
      email: "1.9cqw",
    },
  },
};

/* =========================================================
   HELPERS
========================================================= */

function getCompanyBackType(company) {
  if (!company) return "group";

  if (company.id === "aarambhgrow" || company.backCard?.type === "group") {
    return "group";
  }

  return "company";
}

/* =========================================================
   GET COMPANY WEBSITE
========================================================= */

function getCompanyWebsite(company, data) {
  const website =
    company?.data?.website ||
    data?.website ||
    company?.backCard?.website ||
    COMPANY?.website ||
    "https://aarambhgrow.group";

  return website;
}

/* =========================================================
   NORMALIZE WEBSITE
========================================================= */

function normalizeWebsite(website) {
  if (!website) {
    return "https://aarambhgrow.group";
  }

  if (website.startsWith("http://") || website.startsWith("https://")) {
    return website;
  }

  return `https://${website}`;
}

/* =========================================================
   WEBSITE LINK
========================================================= */

function WebsiteLink({ company, data, primary, fontSize }) {
  const website = getCompanyWebsite(company, data);

  const websiteUrl = normalizeWebsite(website);

  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-no-flip
      onClick={(event) => {
        event.stopPropagation();
      }}
      className="font-semibold underline-offset-2 transition-opacity hover:opacity-70"
      style={{
        color: primary,
        fontSize,
        cursor: "pointer",
      }}
    >
      {website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
    </a>
  );
}

/* =========================================================
   QR CODE
   SCAN = COMPANY WEBSITE
   CLICK QR = SAVE CONTACT
========================================================= */

function CompanyQRCode({
  company,
  data,
  primary,
  gradient,
  design,
  handleSaveContact,
}) {
  const website = getCompanyWebsite(company, data);

  const websiteUrl = normalizeWebsite(website);

  return (
    <>
      <button
        type="button"
        onClick={handleSaveContact}
        aria-label="Save contact"
        data-no-flip
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
            value={websiteUrl}
            level="H"
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
          marginTop: design.qr.textMarginTop || undefined,
          fontSize: design.qr.textSize,
          color: primary,
        }}
      >
        Scan QR Code
        <br />
        Open Website
      </p>
    </>
  );
}

/* =========================================================
   COMPANY BACK CARD
   OTHER COMPANIES
========================================================= */

function CompanyBackCard({
  data,
  company,
  orientation,
  theme,
  vcardValue,
  handleSaveContact,
}) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const primary = T.primary || DEFAULT_THEME.primary;
  const secondary = T.secondary || DEFAULT_THEME.secondary;
  const accent = T.accent || DEFAULT_THEME.accent;
  const gradient = T.gradient || DEFAULT_THEME.gradient;

  const isPortrait = orientation === "portrait";

  const design = isPortrait
    ? COMPANY_DESIGN.portrait
    : COMPANY_DESIGN.landscape;

  const backCard = company?.backCard || {};

  const services = Array.isArray(backCard.services)
    ? backCard.services
    : [];

  const cardBackground = company?.cardBackground?.back || null;

  /* =======================================================
     PORTRAIT
     QR TOP + CONTENT BELOW
  ======================================================= */

  if (isPortrait) {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          backgroundColor: design.background,
          color: primary,
        }}
      >
        {/* BACKGROUND IMAGE - KEPT */}
        {cardBackground && (
          <img
            src={cardBackground}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-fill"
            draggable="false"
          />
        )}

        {/* BACKGROUND OVERLAY - KEPT */}
        {cardBackground && (
          <div
            className="absolute inset-0"
            style={{
              background: "rgba(255,255,255,0.08)",
            }}
          />
        )}

        {/* NO LEFT / RIGHT EDGE LINE */}

        <div className="relative z-10 flex h-full w-full flex-col items-center">
          {/* =================================================
              QR
          ================================================= */}

          <div
            data-no-flip
            className="flex w-full flex-col items-center justify-center"
            style={{
              paddingTop: design.qr.paddingTop,
            }}
          >
            <CompanyQRCode
              company={company}
              data={data}
              primary={primary}
              gradient={gradient}
              design={design}
              handleSaveContact={handleSaveContact}
            />
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            style={{
              marginTop: design.divider.marginTop,
              width: design.divider.width,
              height: design.divider.height,
              backgroundColor: primary,
              opacity: 0.2,
            }}
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
            style={{
              width: design.main.width,
              paddingBottom: design.main.paddingBottom,
              gap: design.main.gap,
            }}
          >
            <CompanyContent
              data={data}
              company={company}
              backCard={backCard}
              services={services}
              primary={primary}
              secondary={secondary}
              accent={accent}
              gradient={gradient}
              design={design}
              isPortrait
            />
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     LANDSCAPE
     LEFT QR + RIGHT CONTENT
  ======================================================= */

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        backgroundColor: design.background,
        color: primary,
      }}
    >
      {/* BACKGROUND IMAGE - KEPT */}
      {cardBackground && (
        <img
          src={cardBackground}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-fill"
          draggable="false"
        />
      )}

      {/* BACKGROUND OVERLAY - KEPT */}
      {cardBackground && (
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(255,255,255,0.08)",
          }}
        />
      )}

      {/* NO LEFT / RIGHT EDGE LINE */}

      <div className="relative z-10 flex h-full w-full">
        {/* =================================================
            LEFT QR COLUMN
        ================================================= */}

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
          <CompanyQRCode
            company={company}
            data={data}
            primary={primary}
            gradient={gradient}
            design={design}
            handleSaveContact={handleSaveContact}
          />
        </div>

        {/* =================================================
            VERTICAL DIVIDER
        ================================================= */}

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

        {/* =================================================
            RIGHT CONTENT
        ================================================= */}

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
          <CompanyContent
            data={data}
            company={company}
            backCard={backCard}
            services={services}
            primary={primary}
            secondary={secondary}
            accent={accent}
            gradient={gradient}
            design={design}
            isPortrait={false}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   COMPANY CONTENT
   OTHER COMPANIES
   NO LOGO
========================================================= */

function CompanyContent({
  data,
  company,
  backCard,
  services,
  primary,
  secondary,
  accent,
  gradient,
  design,
  isPortrait,
}) {
  return (
    <>
      {/* =================================================
          COMPANY NAME
      ================================================= */}

      <h2
        className="font-extrabold leading-tight"
        style={{
          color: primary,
          fontSize: design.heading.size,
          margin: 0,
        }}
      >
        {company?.name || backCard.title || "Company"}
      </h2>

      {/* =================================================
          SUBTITLE
      ================================================= */}

      {backCard.subtitle && (
        <p
          className="font-medium leading-tight"
          style={{
            color: primary,
            opacity: 0.72,
            fontSize: design.subtitle.size,
            margin: 0,
          }}
        >
          {backCard.subtitle}
        </p>
      )}

      {/* =================================================
          DECORATIVE LINE
      ================================================= */}

      <div
        className="rounded-full"
        style={{
          width: design.dividerLine.width,
          height: design.dividerLine.height,
          background: gradient,
        }}
      />

      {/* =================================================
          SERVICES TITLE
      ================================================= */}

      <p
        className="font-extrabold uppercase tracking-[0.12em]"
        style={{
          color: primary,
          fontSize: design.servicesTitle.size,
          margin: 0,
        }}
      >
        {backCard.servicesTitle || "Our Services"}
      </p>

      {/* =================================================
          SERVICES
      ================================================= */}

      <div
        className="grid w-full"
        style={{
          gridTemplateColumns: "1fr 1fr",
          columnGap: design.services.columnGap,
          rowGap: design.services.gap,
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
                backgroundColor:
                  index % 2 === 0 ? accent : secondary,
              }}
            />

            <span
              className="font-semibold leading-tight"
              style={{
                color: primary,
                fontSize: design.services.size,
              }}
            >
              {service}
            </span>
          </div>
        ))}
      </div>

      {/* =================================================
          TAGLINE
      ================================================= */}

      {backCard.tagline && (
        <p
          className="font-bold leading-tight"
          style={{
            color: primary,
            fontSize: design.tagline.size,
            margin: 0,
          }}
        >
          {backCard.tagline}
        </p>
      )}

      {/* =================================================
          WEBSITE + EMAIL
      ================================================= */}

      <div
        className="flex flex-wrap items-center justify-center"
        style={{
          gap: isPortrait ? "2cqw" : "1.5cqw",
        }}
      >
        {(backCard.website ||
          company?.data?.website ||
          data?.website) && (
          <WebsiteLink
            company={company}
            data={data}
            primary={primary}
            fontSize={design.contact.website}
          />
        )}

        {backCard.email && (
          <span
            className="font-semibold"
            style={{
              color: primary,
              opacity: 0.8,
              fontSize: design.contact.email,
            }}
          >
            {backCard.email}
          </span>
        )}
      </div>
    </>
  );
}

/* =========================================================
   MAIN CARD BACK
========================================================= */

export default function CardBack({
  data,
  innerRef,
  orientation = "landscape",
  company,
  theme,
}) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const primary = T.primary || DEFAULT_THEME.primary;
  const secondary = T.secondary || DEFAULT_THEME.secondary;
  const accent = T.accent || DEFAULT_THEME.accent;
  const gradient = T.gradient || DEFAULT_THEME.gradient;

  const isPortrait = orientation === "portrait";

  const design = isPortrait
    ? GROUP_DESIGN.portrait
    : GROUP_DESIGN.landscape;

  /* =======================================================
     VCARD
     Used only when user clicks QR
  ======================================================= */

  const vcardValue = useMemo(() => generateVCard(data), [data]);

  /* =======================================================
     SAVE CONTACT
  ======================================================= */

  const handleSaveContact = (event) => {
    event.stopPropagation();

    try {
      downloadVCard(data);
    } catch (error) {
      console.error("Unable to download vCard:", error);
    }
  };

  /* =======================================================
     COMPANY TYPE
  ======================================================= */

  const backType = getCompanyBackType(company);

  /* =======================================================
     COMPANY WEBSITE
  ======================================================= */

  const groupWebsite = normalizeWebsite(
    getCompanyWebsite(company, data)
  );

  /*
   * CardBack itself MUST NOT rotate.
   * HomeShell controls card side.
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
              GROUP BACKGROUND
          ================================================= */}

          <img
            src={design.background}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-fill"
            draggable="false"
          />

          {/* =================================================
              GROUP PORTRAIT
          ================================================= */}

          {isPortrait ? (
            <div className="relative z-10 flex h-full w-full flex-col items-center">
              {/* =================================================
                  QR
              ================================================= */}

              <div
                data-no-flip
                className="flex w-full flex-col items-center justify-center"
                style={{
                  paddingTop: design.qr.paddingTop,
                }}
              >
                <CompanyQRCode
                  company={company}
                  data={data}
                  primary={primary}
                  gradient={gradient}
                  design={design}
                  handleSaveContact={handleSaveContact}
                />
              </div>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <div
                style={{
                  marginTop: design.divider.marginTop,
                  width: design.divider.width,
                  height: design.divider.height,
                  backgroundColor: primary,
                  opacity: 0.2,
                }}
              />

              {/* =================================================
                  MAIN
              ================================================= */}

              <div
                className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
                style={{
                  width: design.main.width,
                  paddingBottom: design.main.paddingBottom,
                  gap: design.main.gap,
                }}
              >
                {/* =================================================
                    GROUP HEADING
                ================================================= */}

                <p
                  className="font-extrabold leading-tight"
                  style={{
                    fontSize: design.heading.size,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color: primary,
                    }}
                  >
                    {company?.backCard?.title || "AarambhGrow"}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color: primary,
                      opacity: 0.7,
                    }}
                  >
                    {company?.backCard?.subtitle ||
                      "Group of Companies"}
                  </span>
                </p>

                {/* =================================================
                    VISION
                ================================================= */}

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
                      margin: 0,
                    }}
                  >
                    {COMPANY?.visionLine?.left || "One Vision"}

                    <span
                      style={{
                        marginLeft: design.vision.separatorLeft,
                        marginRight: design.vision.separatorRight,
                        color: accent,
                      }}
                    >
                      |
                    </span>

                    {COMPANY?.visionLine?.right ||
                      "Multiple Opportunities"}
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

                {/* =================================================
                    COMPANY LOGOS
                ================================================= */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.logos.gap,
                  }}
                >
                  <img
                    src="/service.png"
                    alt="AarambhGrow Services"
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
                    alt="AarambhGrow Advisory"
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

                {/* =================================================
                    MOTTO
                ================================================= */}

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
                      margin: 0,
                    }}
                  >
                    {COMPANY?.mottoLine ||
                      "Together for a Stronger Tomorrow"}
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
               LANDSCAPE GROUP
            ================================================= */

            <div className="relative z-10 flex h-full w-full">
              {/* =================================================
                  QR COLUMN
              ================================================= */}

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
                <CompanyQRCode
                  company={company}
                  data={data}
                  primary={primary}
                  gradient={gradient}
                  design={design}
                  handleSaveContact={handleSaveContact}
                />
              </div>

              {/* =================================================
                  VERTICAL DIVIDER
              ================================================= */}

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

              {/* =================================================
                  RIGHT CONTENT
              ================================================= */}

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
                {/* =================================================
                    GROUP HEADING
                ================================================= */}

                <p
                  className="font-extrabold leading-tight"
                  style={{
                    fontSize: design.heading.size,
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color: primary,
                    }}
                  >
                    {company?.backCard?.title || "AarambhGrow"}
                  </span>{" "}
                  <span
                    className="font-semibold"
                    style={{
                      color: primary,
                      opacity: 0.7,
                    }}
                  >
                    {company?.backCard?.subtitle ||
                      "Group of Companies"}
                  </span>
                </p>

                {/* =================================================
                    VISION
                ================================================= */}

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
                      margin: 0,
                    }}
                  >
                    {COMPANY?.visionLine?.left || "One Vision"}

                    <span
                      style={{
                        marginLeft: design.vision.separatorLeft,
                        marginRight: design.vision.separatorRight,
                        color: accent,
                      }}
                    >
                      |
                    </span>

                    {COMPANY?.visionLine?.right ||
                      "Multiple Opportunities"}
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

                {/* =================================================
                    COMPANY LOGOS
                ================================================= */}

                <div
                  className="flex items-center justify-center"
                  style={{
                    gap: design.logos.gap,
                  }}
                >
                  <img
                    src="/service.png"
                    alt="AarambhGrow Services"
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
                    alt="AarambhGrow Advisory"
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

                {/* =================================================
                    MOTTO
                ================================================= */}

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
                      margin: 0,
                    }}
                  >
                    {COMPANY?.mottoLine ||
                      "Together for a Stronger Tomorrow"}
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

                {/* =================================================
                    FEATURES
                ================================================= */}

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
                        margin: 0,
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
                        margin: 0,
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
                        margin: 0,
                      }}
                    >
                      Greater
                      <br />
                      Possibilities
                    </p>
                  </div>
                </div>

                {/* =================================================
                    GROUP WEBSITE
                ================================================= */}

                <a
                  href={groupWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-no-flip
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                  className="font-semibold underline-offset-2 transition-opacity hover:opacity-70"
                  style={{
                    color: primary,
                    fontSize:
                      orientation === "portrait"
                        ? "2.2cqw"
                        : "1.5cqw",
                    cursor: "pointer",
                    marginTop: "0.5cqw",
                  }}
                >
                  {groupWebsite
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")}
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}