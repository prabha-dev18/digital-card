"use client";

const AARAMBHGROW_THEME = {
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

  gradient: "linear-gradient(135deg,#00275E,#159B24)",
};

export const COMPANY_CONFIG = {
  /* =========================================================
     AARAMBHGROW GROUP
     ========================================================= */

  aarambhgrow: {
    id: "aarambhgrow",

    name: "AarambhGrow Group",

    fullName: "AarambhGrow Group of Companies",

    logo: "/aarambh.png",

    headerLogo: "/aarambh.png",

    cardLogo: "/aarambh2.png",

    /* Company-wise card backgrounds */
    cardBackground: {
      front: "/bg-2.png",
      back: "/p-bg2.png",
    },

    theme: AARAMBHGROW_THEME,

    data: {
      website: "https://aarambhgrow.group",
      email: "info@aarambhgrow.group",
      phone: "9998715799",
      address: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060",
    },

    /*
     * IMPORTANT:
     * This remains the original GROUP card.
     */
    backCard: {
      type: "group",

      title: "AarambhGrow Group",

      subtitle: "Group of Companies",

      tagline: "One Vision | Multiple Opportunities",

      bottomText: "Together for a Stronger Tomorrow",

      companies: [
        {
          name: "AarambhGrow Advisory",
          logo: "/advisory2.png",
        },
        {
          name: "AarambhGrow Services",
          logo: "/service2.png",
        },
        {
          name: "AarambhGrow Infinity",
          logo: "/infinity2.png",
        },
      ],

      features: ["Growth Partnership", "Sustainable Progress", "Greater Possibilities"],
    },
  },

  /* =========================================================
     AARAMBHGROW ADVISORY
     ========================================================= */

  advisory: {
    id: "advisory",

    name: "AarambhGrow Advisory",

    fullName: "AarambhGrow Advisory",

    logo: "/advisory.png",

    headerLogo: "/advisory.png",

    cardLogo: "/advisory2.png",

    /* Company-wise card backgrounds */
    cardBackground: {
       front: "/bg-2.png",
      back: "/p-bg2.png",
    },

    theme: AARAMBHGROW_THEME,

    data: {
      website: "https://aarambhgrow.com",
      email: "info@aarambhgrow.com",
      phone: "9998715799",
      address: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060",
    },

    backCard: {
      type: "company",

      title: "AarambhGrow Advisory",

      subtitle: "Business • Compliance • Tax • Certification",

      servicesTitle: "Our Services",

      services: [
        "Company Incorporation",
        "MSME / Udyam Registration",
        "GST & Income Tax Filing",
        "MCA / ROC Compliance",
        "Startup India & DPIIT",
        "Licences & Certifications",
        "Trademark Registration",
        "80IAC Tax Exemption",
      ],

      tagline: "Simplifying Business. Strengthening Compliance.",

      website: "aarambhgrow.com",

      email: "info@aarambhgrow.com",
    },
  },

  /* =========================================================
     AARAMBHGROW SERVICES
     ========================================================= */

  services: {
    id: "services",

    name: "AarambhGrow Services",

    fullName: "AarambhGrow Services Private Limited",

    logo: "/service.png",

    headerLogo: "/service.png",

    cardLogo: "/service2.png",

    /* Company-wise card backgrounds */
    cardBackground: {
      front: "/bg-2.png",
      back: "/p-bg2.png",
    },

    theme: AARAMBHGROW_THEME,

    data: {
      website: "https://aarambhgrow.co.in",
      email: "info@aarambhgrow.co.in",
      phone: "9998715799",
      address: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060",
    },

    backCard: {
      type: "company",

      title: "AarambhGrow Services",

      subtitle: "Funding • Finance • Government Schemes",

      servicesTitle: "Our Services",

      services: [
        "Startup Seed Fund",
        "SISFS & Seed Funding",
        "Government Grants",
        "CGTMSE & MUDRA",
        "PMEGP & PMFME",
        "CC / Term Loans",
        "NAIFF",
        "SSS & Textile Fund",
      ],

      tagline: "Funding Opportunities for Business Growth",

      website: "aarambhgrow.co.in",

      email: "info@aarambhgrow.co.in",
    },
  },

  /* =========================================================
     AARAMBHGROW INFINITY
     ========================================================= */

  infinity: {
    id: "infinity",

    name: "AarambhGrow Infinity",

    fullName: "AarambhGrow Infinity",

    logo: "/infinity.png",

    headerLogo: "/infinity.png",

    cardLogo: "/infinity2.png",

    /* Company-wise card backgrounds */
    cardBackground: {
      front: "/i-bg.png",
      back: "/i-back-bg.png",
    },

    theme: {
      primary: "#111111",
      secondary: "#222222",
      accent: "#FA5A00",

      primaryLight: "#F2F2F2",
      secondaryLight: "#F5F5F5",
      accentLight: "#FFF0E8",

      background: "#FAFAFA",
      surface: "#FFFFFF",
      text: "#111111",
      muted: "#666666",
      border: "#E5E5E5",

      gradient: "linear-gradient(135deg,#111111,#FA5A00)",
    },

    data: {
      website: "https://aarambhgrow.tech",
      email: "info@aarambhgrow.tech",
      phone: "9998715799",
      address: "813, Silver Radiance 4, Ovnaj, Bhavik Publication, SG Highway, Ahmedabad, Gujarat, 380060",
    },

    backCard: {
      type: "company",

      title: "AarambhGrow Infinity",

      subtitle: "Digital • Technology • Creative Solutions",

      servicesTitle: "Our Services",

      services: [
        "Digital Marketing",
        "Website Development",
        "SEO & Performance Marketing",
        "Branding & Creative Services",
        "Video & Photography",
        "Mobile App Development",
        "Email Marketing",
      ],

      tagline: "Build Digital. Grow Beyond.",

      website: "aarambhgrow.tech",

      email: "info@aarambhgrow.tech",
    },
  },

  /* =========================================================
     NEXERA CONSULTANCY
     ========================================================= */

  nexera: {
    id: "nexera",

    name: "Nexera Consultancy",

    fullName: "Nexera Consultancy",

    logo: "/nexera.png",

    headerLogo: "/nexera.png",

    cardLogo: "/nexera2.png",

    /* Company-wise card backgrounds */
    cardBackground: {
      front: "/n-bg.png",
      back: "/p-bg2.png",
    },

    theme: {
      primary: "#001E44",
      secondary: "#B59145",
      accent: "#B59145",

      primaryLight: "#EAF0F7",
      secondaryLight: "#F8F3E8",
      accentLight: "#F8F3E8",

      background: "#FAFAFA",
      surface: "#FFFFFF",
      text: "#001E44",
      muted: "#64748B",
      border: "#E3DED2",

      gradient: "linear-gradient(135deg,#001E44,#B59145)",
    },

    data: {
      website: "https://nexeraconsultancy.in",
      email: "info@nexeraconsultancy.in",
      phone: "9898938186",
      address: "Ganesh Glory 1313, 13th Floor, Jagatpur Road, Sarkhej - Gandhinagar Hwy, Gota, Ahmedabad, Gujarat 382470",
    },

    backCard: {
      type: "company",

      title: "Nexera Consultancy",

      subtitle: "Visa • Immigration • Global Opportunities",

      servicesTitle: "Our Services",

      services: [
        "Student Visa",
        "Work Visa",
        "Tourist Visa",
        "Visa & Immigration Guidance",
        "Documentation Support",
        "Application Assistance",
        "Global Mobility Solutions",
      ],

      tagline: "Turning Your Global Dreams Into Reality.",

      website: "nexeraconsultancy.in",

      email: "info@nexeraconsultancy.in",
    },
  },

  /* =========================================================
     EUROASIA
     ========================================================= */

  euroasia: {
    id: "euroasia",

    name: "EuroAsia",

    fullName: "EuroAsia Aquatic Private Limited",

    logo: "/euroasia.png",

    headerLogo: "/euroasia.png",

    cardLogo: "/euroasia.png",

    /* Company-wise card backgrounds */
    cardBackground: {
      front: "/e-bg.png",
      back: "/e-back-bg.png",
    },

    theme: {
      primary: "#002152",
      secondary: "#A9AEB7",
      accent: "#002152",

      primaryLight: "#EDF1F6",
      secondaryLight: "#F2F3F5",
      accentLight: "#EDF1F6",

      background: "#FAFAFA",
      surface: "#FFFFFF",
      text: "#002152",
      muted: "#6B7280",
      border: "#D9DDE3",

      gradient: "linear-gradient(135deg,#002152,#A9AEB7)",
    },

    data: {
      website: "https://euroasias.com",
      email: "info@euroasias.com",
      phone: "9898921290",
      address: "105-107, Athena Avenue, Gota, Ahmedabad, Gujarat – 382481",
    },

    backCard: {
      type: "company",

      title: "EuroAsia",

      subtitle: "MSME • Funding • Compliance • Growth",

      servicesTitle: "Our Services",

      services: [
        "Government Funding & Schemes",
        "MSME & Udyam Registration",
        "Business Certifications",
        "Compliance & Legal Advisory",
        "Government Tender Assistance",
        "Business Advisory",
        "Digital Marketing & Web",
      ],

      tagline: "Making Business Growth Simpler.",

      website: "euroasias.com",

      email: "info@euroasias.com",
    },
  },
};

/* =========================================================
   COMPANY OPTIONS
   ========================================================= */

export const COMPANY_OPTIONS = Object.values(COMPANY_CONFIG);

export const DEFAULT_COMPANY_ID = "aarambhgrow";
