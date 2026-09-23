"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaRotateLeft, FaUserPlus } from "react-icons/fa6";
import CardForm from "./CardForm";
import CardPreviewPane from "./CardPreviewPane";
import DownloadActions from "./DownloadActions";
import Toast from "./Toast";
import { useCardFormPersistence } from "../hooks/useCardFormPersistence";
import { encodeCardData } from "../lib/encodeCardData";
import { decodeCardData } from "../lib/decodeCardData";
import { defaultCardData } from "../lib/defaultCardData";
import { COMPANY } from "../lib/cardConfig";

const STEPS = ["Fill your details", "Preview & flip", "Download / Share"];

export default function HomeShell() {
  const searchParams = useSearchParams();
  const reduced = useReducedMotion();
  const [sharedData, setSharedData] = useState(null);
  const [sharedError, setSharedError] = useState(false);
  const { data, setData, update, clear } = useCardFormPersistence("aarambhcard:form:v1", defaultCardData);
  const [stage, setStage] = useState("form");
  const [activeTab, setActiveTab] = useState("form");
  const [landscapeFlipped, setLandscapeFlipped] = useState(false);
  const [portraitFlipped, setPortraitFlipped] = useState(false);
  const [orientation, setOrientation] = useState("landscape");
  const [toast, setToast] = useState(null);
  const [shareUrl, setShareUrl] = useState("");
  const landscapeFrontRef = useRef(null);
  const landscapeBackRef = useRef(null);
  const portraitFrontRef = useRef(null);
  const portraitBackRef = useRef(null);
  const cardSectionRef = useRef(null);

  useEffect(() => {
    const payload = searchParams.get("data");

    if (!payload) {
      return;
    }

    const decoded = decodeCardData(payload);

    if (decoded?.name) {
      setSharedData({
        ...defaultCardData,
        ...decoded,
      });
    } else {
      setSharedError(true);
    }
  }, [searchParams]);

  const displayData = sharedData || data;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setShareUrl(`${window.location.origin}/?data=${encodeCardData(displayData)}`);
  }, [displayData]);

  const showToast = useCallback((message, type = "success") => {
    setToast({
      id: Date.now(),
      message,
      type,
    });
  }, []);

  const handleGenerate = useCallback(() => {
    setStage("card");

    setTimeout(() => {
      cardSectionRef.current?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, 80);
  }, [reduced]);

  const handleEdit = () => {
    setStage("form");
    setActiveTab("form");

    window.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  const handleStartOver = () => {
    if (!window.confirm("Start over? This clears your saved details.")) {
      return;
    }

    clear();

    setData(defaultCardData);
    setStage("form");
    setLandscapeFlipped(false);
    setPortraitFlipped(false);
    setOrientation("landscape");
    setActiveTab("form");
    showToast("Cleared — start fresh!");
  };

  const firstName = (displayData.name || "").trim().split(/\s+/)[0];
  const selectedFlipped = orientation === "portrait" ? portraitFlipped : landscapeFlipped;

  const handleToggleSelectedFlip = () => {
    if (orientation === "portrait") {
      setPortraitFlipped((current) => !current);
    } else {
      setLandscapeFlipped((current) => !current);
    }
  };

  const selectedFrontRef = orientation === "portrait" ? portraitFrontRef : landscapeFrontRef;
  const selectedBackRef = orientation === "portrait" ? portraitBackRef : landscapeBackRef;

  const renderSelectedPreview = (variant = "preview") => (
    <CardPreviewPane
      variant={variant}
      orientation={orientation}
      data={displayData}
      flipped={selectedFlipped}
      onToggleFlip={handleToggleSelectedFlip}
      frontFaceRef={selectedFrontRef}
      backFaceRef={selectedBackRef}
      onOrientationChange={setOrientation}
    />
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#eef1f5] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <div>
              <p className="text-sm font-extrabold leading-none">
                <span className="text-brand-navy">{COMPANY.brandName}</span>
                <span className="text-brand-green">{COMPANY.brandNameAccent}</span>
                <span className="text-slate-400"> — Group of Companies</span>
              </p>

              <p className="mt-0.5 text-[10px] text-slate-500">Digital business cards</p>
            </div>
          </div>

          {/* STEPS */}
          <div className="hidden items-center gap-2 sm:flex">
            {STEPS.map((step, index) => (
              <span key={step} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-navy/10 text-[10px] font-extrabold text-brand-navy">
                  {index + 1}
                </span>
                {step}
                {index < STEPS.length - 1 && <span className="ml-1 text-slate-300">→</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="relative">

        {sharedError && (
          <section className="mx-auto max-w-lg px-4 py-24 text-center">
            <h1 className="text-xl font-extrabold text-brand-navy">This card link looks broken</h1>

            <p className="mt-2 text-sm text-slate-500">
              The shared data could not be read. You can create your own card instead — it only takes a minute.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 text-sm font-extrabold text-white"
            >
              <FaUserPlus />
              Create your own card
            </Link>
          </section>
        )}

        {sharedData && (
          <section className="mx-auto max-w-6xl px-4 pb-20 pt-8 text-center">
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >
              <p className="mb-8 inline-block rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold text-brand-orange">
                You&apos;re viewing {firstName}&apos;s shared card
              </p>

              {/* PREVIEW */}
              <div className="flex justify-center">{renderSelectedPreview("final")}</div>

              {/* DOWNLOAD */}
              <div className="mt-10 flex justify-center">
                <DownloadActions
                  data={sharedData}
                  landscapeFrontRef={landscapeFrontRef}
                  landscapeBackRef={landscapeBackRef}
                  portraitFrontRef={portraitFrontRef}
                  portraitBackRef={portraitBackRef}
                  orientation={orientation}
                  shareUrl={shareUrl}
                />
              </div>

              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-brand-orange"
              >
                <FaArrowLeft size={13} />
                Create your own card
              </Link>
            </motion.div>
          </section>
        )}

        {!sharedData && !sharedError && (
          <>
            <section className="mx-auto max-w-6xl px-4 pb-20 pt-10">
              {/* HERO */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="mx-auto max-w-2xl text-center"
              >
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                  <span className="text-brand-navy">{COMPANY.brandName}</span>
                  <span className="text-brand-green">{COMPANY.brandNameAccent}</span>{" "}
                  <span className="text-slate-700">Digital Business Card</span>
                </h1>

                <p className="mt-3 text-sm text-slate-500 sm:text-base">
                  Fill in your details and watch your digital business card build itself live. Download it as an image, PDF or contact file
                  — everything stays in your browser.
                </p>
              </motion.div>

              {/* MOBILE TABS */}
              <div
                role="tablist"
                aria-label="Form and preview"
                className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-1 rounded-md bg-slate-200/70 p-1 lg:hidden"
              >
                {[
                  {
                    id: "form",
                    label: "Edit Details",
                  },
                  {
                    id: "preview",
                    label: "Preview",
                  },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`rounded-md py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
                      activeTab === tab.id ? "bg-white text-brand-navy shadow-soft" : "text-slate-500"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* FORM + PREVIEW */}
              <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_1.1fr]">
                {/* FORM */}
                <div className={activeTab === "form" ? "block" : "hidden lg:block"}>
                  <CardForm data={data} update={update} onGenerate={handleGenerate} />
                </div>

                {/* PREVIEW */}
                <div className={activeTab === "preview" ? "block" : "hidden lg:block"}>
                  <div className="flex justify-center">{renderSelectedPreview("preview")}</div>
                </div>
              </div>
            </section>

            {/* =================================================
                  GENERATED CARD
              ================================================== */}

            {stage === "card" && (
              <section ref={cardSectionRef} className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 pt-6 text-center">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                >
                  <h2 className="text-2xl font-extrabold text-brand-navy">
                    Your card is ready
                    {firstName ? `, ${firstName}` : ""}!
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Choose Landscape or Portrait, flip the card, check every detail, then download.
                  </p>

                  {/* FINAL PREVIEW */}
                  <div className="mt-10 flex justify-center">{renderSelectedPreview("final")}</div>

                  {/* DOWNLOAD */}
                  <div className="mt-10 flex justify-center">
                    <DownloadActions
                      data={data}
                      landscapeFrontRef={landscapeFrontRef}
                      landscapeBackRef={landscapeBackRef}
                      portraitFrontRef={portraitFrontRef}
                      portraitBackRef={portraitBackRef}
                      orientation={orientation}
                      shareUrl={shareUrl}
                    />
                  </div>

                  {/* EDIT / START OVER */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-brand-orange"
                    >
                      <FaArrowLeft size={12} />
                      Edit Details
                    </button>

                    <button
                      type="button"
                      onClick={handleStartOver}
                      className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-500/10"
                    >
                      <FaRotateLeft size={12} />
                      Start Over
                    </button>
                  </div>
                </motion.div>
              </section>
            )}
          </>
        )}

        {/* FOOTER */}
        <footer className="relative border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          Nothing you type is uploaded anywhere — the whole studio runs in your browser.
        </footer>
      </main>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { motion, useReducedMotion } from "framer-motion";
// import { FaArrowLeft, FaRotateLeft, FaUserPlus } from "react-icons/fa6";

// import CardForm from "./CardForm";
// import CardPreviewPane from "./CardPreviewPane";
// import DownloadActions from "./DownloadActions";
// import Toast from "./Toast";

// import { useCardFormPersistence } from "../hooks/useCardFormPersistence";
// import { encodeCardData } from "../lib/encodeCardData";
// import { decodeCardData } from "../lib/decodeCardData";
// import { defaultCardData } from "../lib/defaultCardData";
// import { COMPANY } from "../lib/cardConfig";

// const STEPS = ["Fill your details", "Preview & flip", "Download / Share"];

// export default function HomeShell() {
//   const searchParams = useSearchParams();
//   const reduced = useReducedMotion();

//   const [sharedData, setSharedData] = useState(null);
//   const [sharedError, setSharedError] = useState(false);

//   const { data, setData, update, clear } = useCardFormPersistence("aarambhcard:form:v1", defaultCardData);

//   const [stage, setStage] = useState("form");
//   const [activeTab, setActiveTab] = useState("form");
//   const [flipped, setFlipped] = useState(false);
//   const [toast, setToast] = useState(null);
//   const [shareUrl, setShareUrl] = useState("");

//   const frontFaceRef = useRef(null);
//   const backFaceRef = useRef(null);
//   const cardSectionRef = useRef(null);

//   useEffect(() => {
//     const payload = searchParams.get("data");

//     if (!payload) {
//       return;
//     }

//     const decoded = decodeCardData(payload);

//     if (decoded?.name) {
//       setSharedData({
//         ...defaultCardData,
//         ...decoded,
//       });
//     } else {
//       setSharedError(true);
//     }
//   }, [searchParams]);

//   const displayData = sharedData || data;

//   useEffect(() => {
//     if (typeof window === "undefined") {
//       return;
//     }

//     setShareUrl(`${window.location.origin}/?data=${encodeCardData(displayData)}`);
//   }, [displayData]);

//   const showToast = useCallback((message, type = "success") => {
//     setToast({
//       id: Date.now(),
//       message,
//       type,
//     });
//   }, []);

//   const handleGenerate = useCallback(() => {
//     setStage("card");

//     setTimeout(() => {
//       cardSectionRef.current?.scrollIntoView({
//         behavior: reduced ? "auto" : "smooth",
//         block: "start",
//       });
//     }, 80);
//   }, [reduced]);

//   const handleEdit = () => {
//     setStage("form");
//     setActiveTab("form");

//     window.scrollTo({
//       top: 0,
//       behavior: reduced ? "auto" : "smooth",
//     });
//   };

//   const handleStartOver = () => {
//     if (!window.confirm("Start over? This clears your saved details.")) {
//       return;
//     }

//     clear();
//     setData(defaultCardData);
//     setStage("form");
//     setFlipped(false);
//     setActiveTab("form");

//     showToast("Cleared — start fresh!");
//   };

//   const handleExported = useCallback(() => {
//     clear();
//   }, [clear]);

//   const firstName = (displayData.name || "").trim().split(/\s+/)[0];

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-[#eef1f5] text-slate-900">
//       {/* Background */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0">
//         <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-orange/10 blur-3xl" />
//         <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
//       </div>

//       {/* Header */}
//       <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
//         <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">

//           <div className="flex items-center gap-2.5">
//             <div>
//               <p className="text-sm font-extrabold leading-none">
//                 <span className="text-brand-navy">{COMPANY.brandName}</span>

//                 <span className="text-brand-green">{COMPANY.brandNameAccent}</span>

//                 <span className="text-slate-400"> — Card Studio</span>
//               </p>

//               <p className="mt-0.5 text-[10px] text-slate-500">Digital business cards</p>
//             </div>
//           </div>

//           {/* STEPS */}
//           <div className="hidden items-center gap-2 sm:flex">
//             {STEPS.map((step, index) => (
//               <span key={step} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
//                 <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-navy/10 text-[10px] font-extrabold text-brand-navy">
//                   {index + 1}
//                 </span>

//                 {step}

//                 {index < STEPS.length - 1 && <span className="ml-1 text-slate-300">→</span>}
//               </span>
//             ))}
//           </div>
//         </div>
//       </header>

//       <main className="relative">
//         {/* Shared card error */}
//         {sharedError && (
//           <section className="mx-auto max-w-lg px-4 py-24 text-center">
//             <h1 className="text-xl font-extrabold text-brand-navy">This card link looks broken</h1>

//             <p className="mt-2 text-sm text-slate-500">
//               The shared data could not be read. You can create your own card instead — it only takes a minute.
//             </p>

//             <Link
//               href="/"
//               className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-navy px-5 py-2.5 text-sm font-extrabold text-white"
//             >
//               <FaUserPlus />
//               Create your own card
//             </Link>
//           </section>
//         )}

//         {/* Shared card */}
//         {sharedData && (
//           <section className="mx-auto max-w-3xl px-4 pb-20 pt-8 text-center">
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: 20,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               transition={{
//                 duration: 0.45,
//               }}
//             >
//               <p className="mb-6 inline-block rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5 text-xs font-bold text-brand-orange">
//                 You&apos;re viewing {firstName}&apos;s shared card
//               </p>

//               <div className="flex justify-center">
//                 <CardPreviewPane
//                   variant="final"
//                   data={sharedData}
//                   flipped={flipped}
//                   onToggleFlip={() => setFlipped((current) => !current)}
//                   frontFaceRef={frontFaceRef}
//                   backFaceRef={backFaceRef}
//                 />
//               </div>

//               <div className="mt-8 flex justify-center">
//                 <DownloadActions
//                   data={sharedData}
//                   flipped={flipped}
//                   frontFaceRef={frontFaceRef}
//                   backFaceRef={backFaceRef}
//                   shareUrl={shareUrl}
//                   onToast={showToast}
//                 />
//               </div>

//               <Link
//                 href="/"
//                 className="mt-8 inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-brand-orange"
//               >
//                 <FaArrowLeft size={13} />
//                 Create your own card
//               </Link>
//             </motion.div>
//           </section>
//         )}

//         {/* Main generator */}
//         {!sharedData && !sharedError && (
//           <>
//             <section className="mx-auto max-w-6xl px-4 pb-20 pt-10">
//               {/* HERO */}
//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 16,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                 }}
//                 className="mx-auto max-w-2xl text-center"
//               >
//                 <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
//                   <span className="text-brand-navy">{COMPANY.brandName}</span>
//                   <span className="text-brand-green">{COMPANY.brandNameAccent}</span> <span className="text-slate-700">digital card</span>
//                 </h1>

//                 <p className="mt-3 text-sm text-slate-500 sm:text-base">
//                   Fill in your details and watch your digital business card build itself live. Download it as an image, PDF or contact file
//                   — everything stays in your browser.
//                 </p>
//               </motion.div>

//               {/* Mobile tabs */}
//               <div
//                 role="tablist"
//                 aria-label="Form and preview"
//                 className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-1 rounded-md bg-slate-200/70 p-1 lg:hidden"
//               >
//                 {[
//                   {
//                     id: "form",
//                     label: "Edit Details",
//                   },
//                   {
//                     id: "preview",
//                     label: "Preview",
//                   },
//                 ].map((tab) => (
//                   <button
//                     key={tab.id}
//                     type="button"
//                     role="tab"
//                     aria-selected={activeTab === tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`rounded-md py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange ${
//                       activeTab === tab.id ? "bg-white text-brand-navy shadow-soft" : "text-slate-500"
//                     }`}
//                   >
//                     {tab.label}
//                   </button>
//                 ))}
//               </div>

//               {/* Form + Preview */}
//               <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_480px]">
//                 {/* FORM */}
//                 <div className={activeTab === "form" ? "block" : "hidden lg:block"}>
//                   <CardForm data={data} update={update} onGenerate={handleGenerate} />
//                 </div>

//                 {/* PREVIEW */}
//                 <div className={`flex justify-center ${activeTab === "preview" ? "block" : "hidden lg:block"}`}>
//                   <div className="lg:sticky lg:top-20">
//                     <CardPreviewPane
//                       variant="preview"
//                       data={data}
//                       flipped={flipped}
//                       onToggleFlip={() => setFlipped((current) => !current)}
//                       frontFaceRef={frontFaceRef}
//                       backFaceRef={backFaceRef}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </section>

//             {/* Generated card */}
//             {stage === "card" && (
//               <section ref={cardSectionRef} className="mx-auto max-w-3xl scroll-mt-20 px-4 pb-24 pt-6 text-center">
//                 <motion.div
//                   initial={{
//                     opacity: 0,
//                     y: 24,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: 0,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                   }}
//                 >
//                   <h2 className="text-2xl font-extrabold text-brand-navy">
//                     Your card is ready
//                     {firstName ? `, ${firstName}` : ""}!
//                   </h2>

//                   <p className="mt-2 text-sm text-slate-500">Flip it, check it, then download or share it.</p>

//                   <div className="mt-8 flex justify-center">
//                     <CardPreviewPane
//                       variant="final"
//                       data={data}
//                       flipped={flipped}
//                       onToggleFlip={() => setFlipped((current) => !current)}
//                       frontFaceRef={frontFaceRef}
//                       backFaceRef={backFaceRef}
//                     />
//                   </div>

//                   {/* DOWNLOAD ACTIONS */}
//                   <div className="mt-8 flex justify-center">
//                     <DownloadActions
//                       data={data}
//                       flipped={flipped}
//                       frontFaceRef={frontFaceRef}
//                       backFaceRef={backFaceRef}
//                       shareUrl={shareUrl}
//                       onToast={showToast}
//                       onExported={handleExported}
//                     />
//                   </div>

//                   {/* EDIT / START OVER */}
//                   <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
//                     <button
//                       type="button"
//                       onClick={handleEdit}
//                       className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-brand-orange"
//                     >
//                       <FaArrowLeft size={12} />
//                       Edit Details
//                     </button>

//                     <button
//                       type="button"
//                       onClick={handleStartOver}
//                       className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-500/10"
//                     >
//                       <FaRotateLeft size={12} />
//                       Start Over
//                     </button>
//                   </div>
//                 </motion.div>
//               </section>
//             )}
//           </>
//         )}

//         {/* Footer */}
//         <footer className="relative border-t border-slate-200 py-6 text-center text-xs text-slate-500">
//           Nothing you type is uploaded anywhere — the whole studio runs in your browser.
//         </footer>
//       </main>

//       <Toast toast={toast} onClose={() => setToast(null)} />
//     </div>
//   );
// }
