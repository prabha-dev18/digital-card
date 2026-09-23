"use client";

import { FaEnvelope, FaGlobe, FaLocationDot, FaPhone } from "react-icons/fa6";

const CARD_DESIGN = {
  landscape: {
    width: 1050,
    height: 600,

    background: "/bg-2.png",

    logo: {
      left: "2%",
      top: "5%",
      width: "54%",
    },

    person: {
      left: "6%",
      top: "46%",
      width: "47%",
      align: "left",
    },

    name: {
      size: "4.9cqw",
      left: "0%",
      top: "0%",
      align: "left",
    },

    title: {
      size: "3cqw",
      left: "0%",
      top: "0%",
      align: "left",
      marginTop: "1%",
    },

    slogan: {
      size: "2.5cqw",
      left: "0%",
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

  portrait: {
    width: 500,
    height: 1000,

    background: "/p-bg1.png",

    logo: {
      left: "4%",
      top: "7%",
      width: "95%",
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

function prettyUrl(url) {
  return String(url || "")
    .replace(/^https?:\/\//i, "")
    .replace(/\/+$/, "");
}

function withProtocol(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) {
    return value;
  }
  return `https://${value}`;
}

export default function CardFront({ data, innerRef, orientation = "landscape" }) {
  const isPortrait = orientation === "portrait";
  const design = isPortrait ? CARD_DESIGN.portrait : CARD_DESIGN.landscape;

  const rows = [
    data?.phone && {
      Icon: FaPhone,
      text: data.phone,
      href: `tel:${data.phone.replace(/[^+\d]/g, "")}`,
      bg: "#157327",
      label: "Call",
    },

    data?.email && {
      Icon: FaEnvelope,
      text: data.email,
      href: `mailto:${data.email}`,
      bg: "#F26522",
      label: "Email",
    },

    data?.website && {
      Icon: FaGlobe,
      text: prettyUrl(data.website),
      href: withProtocol(data.website),
      bg: "#03254C",
      label: "Website",
    },

    data?.location && {
      Icon: FaLocationDot,
      text: data.location,
      href: null,
      bg: "#157327",
      label: "Location",
    },
  ].filter(Boolean);

  return (
    <div
      ref={innerRef}
      data-card-orientation={orientation}
      className="backface-hidden absolute inset-0 overflow-hidden rounded-md"
      style={{
        width: "100%",
        height: "100%",
        containerType: "inline-size",
        backgroundColor: "#fafafa",
      }}
    >
      <img src={design.background} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" draggable="false" />

      <div className="absolute inset-0">
        <img
          src="/logo.png"
          alt="AarambhGrow Logo"
          className="absolute h-auto object-contain"
          style={{
            left: design.logo.left,
            top: design.logo.top,
            width: design.logo.width,
          }}
          draggable="false"
        />

        <div
          className="absolute"
          style={{
            left: design.person.left,
            top: design.person.top,
            width: design.person.width,
          }}
        >
          <h3
            className="font-extrabold leading-tight text-[#03254C]"
            style={{
              position: "relative",
              left: design.name.left || "0%",
              top: design.name.top || "0%",
              textAlign: design.name.align || design.person.align || "left",
              fontSize: design.name.size,
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "visible",
            }}
          >
            {data?.name || "Your Name"}
          </h3>
          <p
            className="font-semibold leading-tight text-[#475569]"
            style={{
              position: "relative",
              left: design.title.left || "0%",
              top: design.title.top || "0%",
              textAlign: design.title.align || design.person.align || "left",
              fontSize: design.title.size,
              marginTop: design.title.marginTop || "1%",
              whiteSpace: "nowrap",
              overflow: "visible",
            }}
          >
            {data?.title || "Job Title"}
          </p>

          <p
            className="font-medium leading-tight text-[#64748b]"
            style={{
              position: "relative",
              left: design.slogan.left || "0%",
              top: design.slogan.top || "0%",
              textAlign: design.slogan.align || design.person.align || "left",
              fontSize: design.slogan.size,
              marginTop: design.slogan.marginTop,
              whiteSpace: "nowrap",
              overflow: "visible",
            }}
          >
            {data?.slogan || "Your Growth | Our Commitment"}
          </p>
        </div>

        <div
          className="absolute bg-[#03254C]/25"
          style={{
            left: design.divider.left,
            top: design.divider.top,
            width: design.divider.width,
            height: design.divider.height,
          }}
        />

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
            {rows.map(({ Icon, text, href, bg, label }) => {
              const content = (
                <>
                  {/* ICON */}
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

                  {/* CONTACT TEXT */}
                  <span
                    className="min-w-0 break-words font-medium leading-tight text-[#03254C]"
                    style={{
                      fontSize: design.contactText.size,
                    }}
                  >
                    {text}
                  </span>
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  aria-label={`${label}: ${text}`}
                  className="flex min-w-0 items-center"
                  style={{
                    gap: design.contactGap,
                  }}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={label}
                  className="flex min-w-0 items-center"
                  style={{
                    gap: design.contactGap,
                  }}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
