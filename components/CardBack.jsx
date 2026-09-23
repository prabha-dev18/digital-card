"use client";

import { useMemo } from "react";
import { FaHandshake, FaBullseye, FaLightbulb } from "react-icons/fa6";
import { QRCodeSVG } from "qrcode.react";
import { BRAND, COMPANY } from "../lib/cardConfig";
import { downloadVCard, generateVCard } from "../lib/generateVCard";

const CARD_DESIGN = {
  landscape: {
    width: 1050,
    height: 600,

    background: "/bg1.png",

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
      textMarginTop: "0cqw",
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
    width: 1080,
    height: 1920,

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

export default function CardBack({ data, innerRef, orientation = "landscape" }) {
  const isPortrait = orientation === "portrait";
  const design = isPortrait ? CARD_DESIGN.portrait : CARD_DESIGN.landscape;
  const vcardValue = useMemo(() => generateVCard(data), [data]);
  const handleSaveContact = (event) => {
    event.stopPropagation();
    downloadVCard(data);
  };

  return (
    <div
      ref={innerRef}
      data-card-orientation={orientation}
      className="backface-hidden absolute inset-0 overflow-hidden rounded-md shadow-card [transform:rotateY(180deg)]"
      style={{
        width: "100%",
        height: "100%",
        containerType: "inline-size",
      }}
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <img src={design.background} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-fill" draggable="false" />

      {/* ===================================================
          PORTRAIT
      =================================================== */}

      {isPortrait ? (
        <div className="relative z-10 flex h-full w-full flex-col items-center">
          {/* =================================================
              QR CODE
          ================================================= */}

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
              aria-label="Save contact — scan the QR code or tap to download the vCard"
              className="rounded-md bg-gradient-to-br from-[#F26522] via-[#157327] to-[#03254C] shadow-soft transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26522]"
              style={{
                padding: design.qr.buttonPadding,
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
                  fgColor={BRAND.navy}
                  bgColor={BRAND.white}
                  style={{
                    width: design.qr.size,
                    height: design.qr.size,
                    maxWidth: design.qr.maxWidth,
                    maxHeight: design.qr.maxHeight,
                  }}
                  role="img"
                  aria-label={`QR code to save ${data?.name || "this"} contact`}
                />
              </span>
            </button>

            <p
              className="text-center font-semibold leading-snug text-[#03254C]"
              style={{
                marginTop: design.qr.textMarginTop,
                fontSize: design.qr.textSize,
              }}
            >
              Scan QR Code
              <br />
              Save Contact
            </p>
          </div>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="bg-[#03254C]/20"
            style={{
              marginTop: design.divider.marginTop,
              width: design.divider.width,
              height: design.divider.height,
            }}
          />

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div
            className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
            style={{
              width: design.main.width,
              paddingBottom: design.main.paddingBottom,
              gap: design.main.gap,
            }}
          >
            {/* ===============================================
                HEADING
            =============================================== */}

            <p
              className="font-extrabold leading-tight"
              style={{
                fontSize: design.heading.size,
              }}
            >
              <span className="text-[#03254C]">{COMPANY.brandName}</span>{" "}
              <span className="font-semibold text-[#03254C]/70">{COMPANY.backHeadingTail}</span>
            </p>

            {/* ===============================================
                VISION
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.vision.gap,
              }}
            >
              <span
                className="rounded bg-[#F26522]"
                style={{
                  width: design.vision.lineWidth,
                  height: design.vision.lineHeight,
                }}
              />

              <p
                className="whitespace-nowrap font-medium text-[#03254C]"
                style={{
                  fontSize: design.vision.textSize,
                }}
              >
                {COMPANY.visionLine.left}

                <span
                  className="text-[#F26522]"
                  style={{
                    marginLeft: design.vision.separatorLeft,
                    marginRight: design.vision.separatorRight,
                  }}
                >
                  |
                </span>

                {COMPANY.visionLine.right}
              </p>

              <span
                className="rounded bg-[#157327]"
                style={{
                  width: design.vision.lineWidth,
                  height: design.vision.lineHeight,
                }}
              />
            </div>

            {/* ===============================================
                COMPANY LOGOS
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.logos.gap,
              }}
            >
              {/* SERVICES */}

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

              {/* DIVIDER */}

              <span
                className="bg-[#03254C]/20"
                style={{
                  width: design.logos.divider.width,
                  height: design.logos.divider.height,
                }}
              />

              {/* ADVISORY */}

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

              {/* DIVIDER */}

              <span
                className="bg-[#03254C]/20"
                style={{
                  width: design.logos.divider.width,
                  height: design.logos.divider.height,
                }}
              />

              {/* INFINITY */}

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

            {/* ===============================================
                MOTTO
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.motto.gap,
              }}
            >
              <span
                className="rounded bg-[#F26522]"
                style={{
                  width: design.motto.lineWidth,
                  height: design.motto.lineHeight,
                }}
              />

              <p
                className="whitespace-nowrap font-semibold text-[#03254C]"
                style={{
                  fontSize: design.motto.textSize,
                }}
              >
                {COMPANY.mottoLine}
              </p>

              <span
                className="rounded bg-[#157327]"
                style={{
                  width: design.motto.lineWidth,
                  height: design.motto.lineHeight,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================
           LANDSCAPE
        =================================================== */

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
            <button
              type="button"
              onClick={handleSaveContact}
              aria-label="Save contact — scan the QR code or tap to download the vCard"
              className="rounded-md bg-gradient-to-br from-[#F26522] via-[#157327] to-[#03254C] shadow-soft transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26522]"
              style={{
                padding: design.qr.buttonPadding,
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
                  fgColor={BRAND.navy}
                  bgColor={BRAND.white}
                  style={{
                    /* SAME QR SIZE */
                    width: design.qr.size,
                    height: design.qr.size,
                    maxWidth: design.qr.maxWidth,
                    maxHeight: design.qr.maxHeight,
                  }}
                  role="img"
                  aria-label={`QR code to save ${data?.name || "this"} contact`}
                />
              </span>
            </button>

            <p
              className="text-center font-semibold leading-snug text-[#03254C]"
              style={{
                fontSize: design.qr.textSize,
              }}
            >
              Scan QR Code
              <br />
              Save Contact
            </p>
          </div>

          {/* =================================================
              VERTICAL DIVIDER
          ================================================= */}

          <div
            className="shrink-0 bg-[#03254C]/20"
            style={{
              marginTop: design.divider.marginTop,
              marginBottom: design.divider.marginBottom,
              width: design.divider.width,
            }}
          />

          {/* =================================================
              RIGHT MAIN CONTENT
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
            {/* ===============================================
                HEADING
            =============================================== */}

            <p
              className="font-extrabold leading-tight"
              style={{
                fontSize: design.heading.size,
              }}
            >
              <span className="text-[#03254C]">{COMPANY.brandName}</span>{" "}
              <span className="font-semibold text-[#03254C]/70">{COMPANY.backHeadingTail}</span>
            </p>

            {/* ===============================================
                VISION
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.vision.gap,
              }}
            >
              <span
                className="rounded bg-[#F26522]"
                style={{
                  width: design.vision.lineWidth,
                  height: design.vision.lineHeight,
                }}
              />

              <p
                className="whitespace-nowrap font-medium text-[#03254C]"
                style={{
                  fontSize: design.vision.textSize,
                }}
              >
                {COMPANY.visionLine.left}

                <span
                  className="text-[#F26522]"
                  style={{
                    marginLeft: design.vision.separatorLeft,
                    marginRight: design.vision.separatorRight,
                  }}
                >
                  |
                </span>

                {COMPANY.visionLine.right}
              </p>

              <span
                className="rounded bg-[#157327]"
                style={{
                  width: design.vision.lineWidth,
                  height: design.vision.lineHeight,
                }}
              />
            </div>

            {/* ===============================================
                COMPANY LOGOS
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.logos.gap,
              }}
            >
              {/* SERVICES */}

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

              {/* DIVIDER */}

              <span
                className="bg-[#03254C]/20"
                style={{
                  width: design.logos.divider.width,
                  height: design.logos.divider.height,
                }}
              />

              {/* ADVISORY */}

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

              {/* DIVIDER */}

              <span
                className="bg-[#03254C]/20"
                style={{
                  width: design.logos.divider.width,
                  height: design.logos.divider.height,
                }}
              />

              {/* INFINITY */}

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

            {/* ===============================================
                MOTTO
            =============================================== */}

            <div
              className="flex items-center justify-center"
              style={{
                gap: design.motto.gap,
              }}
            >
              <span
                className="rounded bg-[#F26522]"
                style={{
                  width: design.motto.lineWidth,
                  height: design.motto.lineHeight,
                }}
              />

              <p
                className="whitespace-nowrap font-semibold text-[#03254C]"
                style={{
                  fontSize: design.motto.textSize,
                }}
              >
                {COMPANY.mottoLine}
              </p>

              <span
                className="rounded bg-[#157327]"
                style={{
                  width: design.motto.lineWidth,
                  height: design.motto.lineHeight,
                }}
              />
            </div>

            {/* ===============================================
                BOTTOM FEATURES
                MATCHING REFERENCE DESIGN
            =============================================== */}

            <div
              className="flex w-full items-center justify-center"
              style={{
                gap: design.features.gap,
                marginTop: design.features.marginTop,
              }}
            >
              {/* ===========================================
                  GROWTH PARTNERSHIP
              =========================================== */}

              <div
                className="flex items-center justify-center"
                style={{
                  gap: design.features.itemGap,
                }}
              >
                <span
                  className="grid shrink-0 place-items-center rounded-full bg-[#157327] text-white"
                  style={{
                    width: design.features.iconSize,
                    height: design.features.iconSize,
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
                  className="text-left font-medium leading-tight text-[#03254C]"
                  style={{
                    fontSize: design.features.textSize,
                  }}
                >
                  Growth
                  <br />
                  Partnership
                </p>
              </div>

              {/* ===========================================
                  DIVIDER
              =========================================== */}

              <span
                className="shrink-0 bg-[#03254C]/20"
                style={{
                  width: design.features.dividerWidth,
                  height: design.features.dividerHeight,
                }}
              />

              {/* ===========================================
                  SUSTAINABLE PROGRESS
              =========================================== */}

              <div
                className="flex items-center justify-center"
                style={{
                  gap: design.features.itemGap,
                }}
              >
                <span
                  className="grid shrink-0 place-items-center rounded-full bg-[#F26522] text-white"
                  style={{
                    width: design.features.iconSize,
                    height: design.features.iconSize,
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
                  className="text-left font-medium leading-tight text-[#03254C]"
                  style={{
                    fontSize: design.features.textSize,
                  }}
                >
                  Sustainable
                  <br />
                  Progress
                </p>
              </div>

              {/* ===========================================
                  DIVIDER
              =========================================== */}

              <span
                className="shrink-0 bg-[#03254C]/20"
                style={{
                  width: design.features.dividerWidth,
                  height: design.features.dividerHeight,
                }}
              />

              {/* ===========================================
                  GREATER POSSIBILITIES
              =========================================== */}

              <div
                className="flex items-center justify-center"
                style={{
                  gap: design.features.itemGap,
                }}
              >
                <span
                  className="grid shrink-0 place-items-center rounded-full bg-[#03254C] text-white"
                  style={{
                    width: design.features.iconSize,
                    height: design.features.iconSize,
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
                  className="text-left font-medium leading-tight text-[#03254C]"
                  style={{
                    fontSize: design.features.textSize,
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
    </div>
  );
}
