"use client";

import { FaEnvelope, FaGlobe, FaLocationDot, FaPhone } from "react-icons/fa6";

/* =========================================================
   DEFAULT THEME
========================================================= */

const DEFAULT_THEME = {
  primary: "#00275E",
  secondary: "#159B24",
  accent: "#FA7800",

  background: "#FAFAFA",
  text: "#00275E",
  muted: "#64748B",
};

/* =========================================================
   MAIN CARD DESIGN
   DO NOT CHANGE
   THIS IS THE ORIGINAL AARAMBHGROW GROUP STRUCTURE
========================================================= */

const GROUP_CARD_DESIGN = {
  landscape: {
    width: 1050,
    height: 600,

    logo: {
      left: "-1%",
      top: "-13%",
      width: "72%",
    },

    person: {
      left: "6%",
      top: "46%",
      width: "47%",
      align: "left",
    },

    name: {
      size: "4.9cqw",
      left: "3%",
      top: "0%",
      align: "left",
    },

    title: {
      size: "3cqw",
      left: "3%",
      top: "0%",
      align: "left",
      marginTop: "1%",
    },

    slogan: {
      size: "2.5cqw",
      left: "3%",
      top: "0%",
      align: "left",
      marginTop: "7%",
    },

    divider: {
      left: "56.2%",
      top: "11%",
      width: "0.15cqw",
      height: "74%",
    },

    contacts: {
      left: "60%",
      top: "20%",
      width: "40%",
      gap: "2.5cqw",
    },

    icon: {
      size: "5cqw",
      iconSize: "2.5cqw",
    },

    contactText: {
      size: "2.2cqw",
    },

    contactGap: "1.5cqw",
  },

  /* =========================================================
     PORTRAIT
  ========================================================= */

  portrait: {
    width: 500,
    height: 1000,

    logo: {
      left: "1%",
      top: "5%",
      width: "102%",
    },

    person: {
      left: "8%",
      top: "34%",
      width: "84%",
      align: "left",
    },

    name: {
      size: "7.8cqw",
      left: "1%",
      top: "2%",
      align: "left",
    },

    title: {
      size: "3.7cqw",
      left: "1%",
      top: "0%",
      align: "left",
      marginTop: "3%",
    },

    slogan: {
      size: "2.9cqw",
      left: "1%",
      top: "0%",
      align: "left",
      marginTop: "7%",
    },

    divider: {
      left: "8%",
      top: "54%",
      width: "84%",
      height: "0.15cqw",
    },

    contacts: {
      left: "8%",
      top: "59%",
      width: "84%",
      gap: "3.5cqw",
    },

    icon: {
      size: "8cqw",
      iconSize: "3.5cqw",
    },

    contactText: {
      size: "3.5cqw",
    },

    contactGap: "1.8cqw",
  },
};

/* =========================================================
   PER-COMPANY BUSINESS CARD FRONT LOGO FIT
   - infinity: Reference proper size (maintained)
   - euroasia: Minor decrease in height and width
   - nexera: Decrease in height and width
   - aarambhgrow: Increase in height and width
   - services: Increase in height and width
   - advisory: Clean & balanced with infinity
========================================================= */

const FRONT_CARD_LOGO_FIT = {
  // AarambhGrow Group: Increased height & width (compensates for transparent margins in aarambh2.png)
  aarambhgrow: {
    landscape: {
      left: "-1%",
      top: "-8%",
      width: "72%",
      height: "60%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "-4%",
      top: "0%",
      width: "108%",
      height: "32%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },

  // AarambhGrow Services: Decreased height & width as requested
  services: {
    landscape: {
      left: "4.5%",
      top: "4.5%",
      width: "44%",
      height: "32%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "9%",
      top: "5%",
      width: "82%",
      height: "20.5%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },

  // AarambhGrow Infinity: Reference ("proper side") - maintained
  infinity: {
    landscape: {
      left: "5%",
      top: "4%",
      width: "48%",
      height: "36%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "6%",
      top: "5%",
      width: "88%",
      height: "22%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },

  // EuroAsia: Minor decrease in height and width as requested
  euroasia: {
    landscape: {
      left: "5%",
      top: "5%",
      width: "43%",
      height: "32%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "10%",
      top: "6%",
      width: "80%",
      height: "19%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },

  // Nexera Consultancy: Decreased height and width as requested
  nexera: {
    landscape: {
      left: "5%",
      top: "6%",
      width: "35%",
      height: "25%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "17%",
      top: "7.5%",
      width: "66%",
      height: "15.5%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },

  // AarambhGrow Advisory: Balanced with infinity
  advisory: {
    landscape: {
      left: "5%",
      top: "4%",
      width: "48%",
      height: "36%",
      objectFit: "contain",
      objectPosition: "left center",
    },
    portrait: {
      left: "6%",
      top: "5%",
      width: "88%",
      height: "22%",
      objectFit: "contain",
      objectPosition: "center center",
    },
  },
};

function resolveCompanyKey(company) {
  const key = String(company?.id || company?.name || "")
    .trim()
    .toLowerCase();

  if (key === "infinity" || key.includes("infinity")) return "infinity";
  if (key === "nexera" || key.includes("nexera")) return "nexera";
  if (key === "euroasia" || key.includes("euroasia")) return "euroasia";
  if (key === "advisory" || key.includes("advisory")) return "advisory";
  if (key === "services" || key.includes("services")) return "services";
  return "aarambhgrow";
}

/* =========================================================
   COMPANY TYPE
========================================================= */

function isGroupCompany(company) {
  if (!company) {
    return true;
  }

  return company.id === "aarambhgrow" || company.id === "aarambhgrow-group" || company.backCard?.type === "group";
}

/* =========================================================
   HELPERS
========================================================= */

function prettyUrl(url) {
  return String(url || "")
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

function withProtocol(url) {
  const value = String(url || "").trim();

  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

/* =========================================================
   CONTACT ROWS
========================================================= */

function getContactRows(data, theme) {
  const secondary = theme.secondary || DEFAULT_THEME.secondary;

  const accent = theme.accent || DEFAULT_THEME.accent;

  const primary = theme.primary || DEFAULT_THEME.primary;

  return [
    data?.phone && {
      Icon: FaPhone,
      text: data.phone,
      href: `tel:${data.phone.replace(/[^+\d]/g, "")}`,
      bg: secondary,
      label: "Call",
    },

    data?.email && {
      Icon: FaEnvelope,
      text: data.email,
      href: `mailto:${data.email}`,
      bg: accent,
      label: "Email",
    },

    data?.website && {
      Icon: FaGlobe,
      text: prettyUrl(data.website),
      href: withProtocol(data.website),
      bg: primary,
      label: "Website",
    },

    data?.location && {
      Icon: FaLocationDot,
      text: data.location,
      href: null,
      bg: secondary,
      label: "Location",
    },
  ].filter(Boolean);
}

/* =========================================================
   CONTACT ROW
========================================================= */

function ContactRow({ row, design, primary }) {
  const { Icon, text, href, bg, label } = row;

  const content = (
    <>
      <span
        className="grid shrink-0 place-items-center rounded-full text-white"
        style={{
          width: design.icon.size,
          height: design.icon.size,
          minWidth: design.icon.size,
          minHeight: design.icon.size,
          backgroundColor: bg,
        }}
      >
        <Icon
          style={{
            width: design.icon.iconSize,
            height: design.icon.iconSize,
          }}
        />
      </span>

      <span
        className="min-w-0 break-words font-medium leading-tight"
        style={{
          fontSize: design.contactText.size,
          color: primary,
        }}
      >
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={`${label}: ${text}`}
        className="flex min-w-0 items-center"
        style={{
          gap: design.contactGap,
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="flex min-w-0 items-center"
      style={{
        gap: design.contactGap,
      }}
    >
      {content}
    </div>
  );
}

/* =========================================================
   MAIN CARD FRONT
========================================================= */

export default function CardFront({ data, innerRef, orientation = "landscape", company, theme }) {
  const T = theme || company?.theme || DEFAULT_THEME;

  const primary = T.primary || DEFAULT_THEME.primary;

  const secondary = T.secondary || DEFAULT_THEME.secondary;

  const accent = T.accent || DEFAULT_THEME.accent;

  const background = T.background || DEFAULT_THEME.background;

  const muted = T.muted || DEFAULT_THEME.muted;

  const isPortrait = orientation === "portrait";

  const design = isPortrait ? GROUP_CARD_DESIGN.portrait : GROUP_CARD_DESIGN.landscape;

  const isGroup = isGroupCompany(company);

  const cardBackground = company?.cardBackground?.front || "/bg-2.png";

  const cardLogo = company?.cardLogo || company?.logo || "/aarambh2.png";

  const companyKey = resolveCompanyKey(company);
  const companyLogoFit = FRONT_CARD_LOGO_FIT[companyKey] || FRONT_CARD_LOGO_FIT.aarambhgrow;
  const logoDesign = isPortrait ? companyLogoFit.portrait : companyLogoFit.landscape;

  const rows = getContactRows(data, {
    primary,
    secondary,
    accent,
  });

  return (
    <div
      ref={innerRef}
      data-card-orientation={orientation}
      data-card-front-export
      className="absolute inset-0 overflow-hidden rounded-md"
      style={{
        width: "100%",
        height: "100%",
        containerType: "inline-size",

        backgroundColor: background,

        backgroundImage: `url("${cardBackground}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Background Image Layer */}
      <img src={cardBackground} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" draggable="false" />

      {/* Content Layer */}
      <div className="absolute inset-0">
        {/* LOGO AREA - IDENTICAL POSITION, SIDE & SIZE FOR ALL COMPANIES */}
        <div
          className={`absolute flex overflow-hidden ${
            isPortrait ? "items-center justify-center" : "items-center justify-start"
          }`}
          style={{
            left: logoDesign.left,
            top: logoDesign.top,
            width: logoDesign.width,
            height: logoDesign.height,
          }}
        >
          <img
            src={cardLogo}
            alt={company?.fullName || company?.name || "Company Logo"}
            className="max-h-full max-w-full w-auto h-auto object-contain"
            style={{
              objectFit: logoDesign.objectFit,
              objectPosition: logoDesign.objectPosition,
            }}
            draggable="false"
          />
        </div>

        {/* Person Information */}
        <div
          className="absolute"
          style={{
            left: design.person.left,
            top: design.person.top,
            width: design.person.width,
          }}
        >
          <h3
            className="font-extrabold leading-tight"
            style={{
              position: "relative",
              left: design.name.left || "0%",
              top: design.name.top || "0%",
              textAlign: design.name.align || design.person.align || "left",
              fontSize: design.name.size,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "visible",
              color: primary,
              margin: 0,
            }}
          >
            {data?.name || "Your Name"}
          </h3>

          <p
            className="font-semibold leading-tight"
            style={{
              position: "relative",
              left: design.title.left || "0%",
              top: design.title.top || "0%",
              textAlign: design.title.align || design.person.align || "left",
              fontSize: design.title.size,
              marginTop: design.title.marginTop || "1%",
              marginBottom: 0,
              whiteSpace: "nowrap",
              overflow: "visible",
              color: muted,
            }}
          >
            {data?.title || "Job Title"}
          </p>

          <p
            className="font-medium leading-tight"
            style={{
              position: "relative",
              left: design.slogan.left || "0%",
              top: design.slogan.top || "0%",
              textAlign: design.slogan.align || design.person.align || "left",
              fontSize: design.slogan.size,
              marginTop: design.slogan.marginTop,
              marginBottom: 0,
              whiteSpace: "nowrap",
              overflow: "visible",
              color: muted,
            }}
          >
            {data?.slogan || "Your Growth | Our Commitment"}
          </p>
        </div>

        {/* Divider */}
        <div
          className="absolute"
          style={{
            left: design.divider.left,
            top: design.divider.top,
            width: design.divider.width,
            height: design.divider.height,
            backgroundColor: primary,
            opacity: 0.25,
          }}
        />

        {/* Contact Information */}
        <div
          className="absolute"
          style={{
            left: design.contacts.left,
            top: design.contacts.top,
            width: design.contacts.width,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              gap: design.contacts.gap,
            }}
          >
            {rows.map((row) => (
              <ContactRow key={row.label} row={row} design={design} primary={primary} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
