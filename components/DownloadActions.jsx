"use client";

import { useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

import { downloadVCard } from "../lib/generateVCard";

export default function DownloadActions({
  data,
  landscapeFrontRef,
  landscapeBackRef,
  portraitFrontRef,
  portraitBackRef,
  orientation = "landscape",
  shareUrl,
}) {
  const [busy, setBusy] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const slug =
    (data?.name || "business-card")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "business-card";

  const isPortrait = orientation === "portrait";

  /* =========================================================
     GET SELECTED REFS
  ========================================================== */

  const getSelectedRefs = () => {
    if (isPortrait) {
      return {
        frontRef: portraitFrontRef,
        backRef: portraitBackRef,
      };
    }

    return {
      frontRef: landscapeFrontRef,
      backRef: landscapeBackRef,
    };
  };

  /* =========================================================
     CAPTURE CARD
  ========================================================== */

  const captureCard = async (node) => {
    if (!node) {
      throw new Error("Card element not found.");
    }

    // Give browser one frame to finish rendering.
    await new Promise((resolve) => requestAnimationFrame(() => resolve()));

    const width = node.offsetWidth;
    const height = node.offsetHeight;

    if (!width || !height) {
      throw new Error("Card has invalid dimensions.");
    }

    return await toPng(node, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: "#FFFFFF",

      style: {
        transform: "none",
        backfaceVisibility: "visible",
        WebkitBackfaceVisibility: "visible",
      },

      width,
      height,
    });
  };

  /* =========================================================
     SAVE DATA URL
  ========================================================== */

  const saveDataUrl = (dataUrl, filename) => {
    const link = document.createElement("a");

    link.href = dataUrl;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    link.remove();
  };

  /* =========================================================
     DOWNLOAD PNG
  ========================================================== */

  const handleDownloadImage = async () => {
    setBusy("png");

    try {
      const { frontRef } = getSelectedRefs();

      const node = frontRef?.current;

      if (!node) {
        throw new Error(`${orientation} front card is not ready.`);
      }

      const image = await captureCard(node);

      saveDataUrl(image, `${slug}-${orientation}.png`);

      showToast(`${isPortrait ? "Portrait" : "Landscape"} PNG downloaded!`);
    } catch (error) {
      console.error("PNG export failed:", error);

      showToast("Could not export PNG. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  /* =========================================================
     DOWNLOAD PDF
  ========================================================== */

  const handleDownloadPDF = async () => {
    setBusy("pdf");

    try {
      const { frontRef, backRef } = getSelectedRefs();

      const frontNode = frontRef?.current;
      const backNode = backRef?.current;

      if (!frontNode) {
        throw new Error(`${orientation} front card is not ready.`);
      }

      if (!backNode) {
        throw new Error(`${orientation} back card is not ready.`);
      }

      // Capture both sides.
      const frontImage = await captureCard(frontNode);
      const backImage = await captureCard(backNode);

      const cardWidth = frontNode.offsetWidth;
      const cardHeight = frontNode.offsetHeight;

      if (!cardWidth || !cardHeight) {
        throw new Error("Invalid card dimensions.");
      }

      const cardRatio = cardWidth / cardHeight;

      /* =====================================================
         CREATE PDF
      ====================================================== */

      const pdf = new jsPDF({
        orientation: isPortrait ? "portrait" : "landscape",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      const addCardToCurrentPage = (image) => {
        const pageWidth = pdf.internal.pageSize.getWidth();

        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 15;

        const availableWidth = pageWidth - margin * 2;

        const availableHeight = pageHeight - margin * 2;

        let imageWidth;
        let imageHeight;

        if (availableWidth / availableHeight > cardRatio) {
          imageHeight = availableHeight;
          imageWidth = imageHeight * cardRatio;
        } else {
          imageWidth = availableWidth;
          imageHeight = imageWidth / cardRatio;
        }

        const x = (pageWidth - imageWidth) / 2;

        const y = (pageHeight - imageHeight) / 2;

        pdf.addImage(image, "PNG", x, y, imageWidth, imageHeight, undefined, "FAST");
      };

      /* FRONT */
      addCardToCurrentPage(frontImage);

      /* BACK */
      pdf.addPage("a4", isPortrait ? "portrait" : "landscape");

      addCardToCurrentPage(backImage);

      pdf.save(`${slug}-${orientation}.pdf`);

      showToast(`${isPortrait ? "Portrait" : "Landscape"} PDF downloaded!`);
    } catch (error) {
      console.error("PDF export failed:", error);

      showToast("Could not export PDF. Please try again.");
    } finally {
      setBusy(null);
    }
  };

  /* =========================================================
     SAVE CONTACT
  ========================================================== */

  const handleSaveContact = () => {
    setBusy("vcf");

    try {
      downloadVCard(data);

      showToast("Contact file downloaded!");
    } catch (error) {
      console.error("vCard export failed:", error);

      showToast("Could not create contact file.");
    } finally {
      setBusy(null);
    }
  };

  /* =========================================================
     COPY LINK
  ========================================================== */

  const handleCopyLink = async () => {
    try {
      const url = shareUrl || window.location.href;

      await navigator.clipboard.writeText(url);

      showToast("Link copied to clipboard!");
    } catch (error) {
      console.error("Copy link failed:", error);

      showToast("Could not copy link.");
    }
  };

  /* =========================================================
     SHARE
  ========================================================== */

  const handleShare = async () => {
    const url = shareUrl || window.location.href;

    if (!navigator.share) {
      await handleCopyLink();
      return;
    }

    try {
      await navigator.share({
        title: `${data?.name || "My"} Digital Business Card`,
        text: "Here's my digital business card",
        url,
      });
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Share failed:", error);

        showToast("Sharing failed.");
      }
    }
  };

  const baseButton =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="mx-auto mt-6 w-full max-w-[700px]">
      {/* SELECTED ORIENTATION */}
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold text-slate-500">
          Downloading:
          <span className="ml-1 font-bold text-[#03254C]">{isPortrait ? "Portrait" : "Landscape"}</span>
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3">
        {/* PNG */}
        <button
          type="button"
          disabled={!!busy}
          onClick={handleDownloadImage}
          className={`${baseButton} bg-[#F26522] text-white hover:brightness-95`}
        >
          {busy === "png" ? "Preparing..." : "Download PNG"}
        </button>

        {/* PDF */}
        <button
          type="button"
          disabled={!!busy}
          onClick={handleDownloadPDF}
          className={`${baseButton} bg-[#157327] text-white hover:brightness-95`}
        >
          {busy === "pdf" ? "Preparing..." : "Download PDF"}
        </button>

        {/* CONTACT */}
        <button
          type="button"
          disabled={!!busy}
          onClick={handleSaveContact}
          className={`${baseButton} bg-[#03254C] text-white hover:brightness-95`}
        >
          {busy === "vcf" ? "Preparing..." : "Save Contact (.vcf)"}
        </button>

        {/* COPY LINK */}
        <button
          type="button"
          disabled={!!busy}
          onClick={handleCopyLink}
          className={`${baseButton} bg-slate-200 text-slate-900 hover:bg-slate-300`}
        >
          Copy Link
        </button>

        {/* SHARE */}
        <button
          type="button"
          disabled={!!busy}
          onClick={handleShare}
          className={`${baseButton} bg-[#03254C] text-white hover:brightness-95`}
        >
          Share
        </button>
      </div>

      {/* TOAST */}
      {toast && (
        <p role="status" className="mt-3 text-center text-xs font-medium text-slate-600">
          {toast}
        </p>
      )}
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { toPng } from "html-to-image";
// import jsPDF from "jspdf";
// import { downloadVCard } from "../lib/generateVCard";

// export default function DownloadActions({ data, frontRef, backRef, shareUrl, orientation = "landscape" }) {
//   const [busy, setBusy] = useState(null);
//   const [toast, setToast] = useState("");

//   const showToast = (message) => {
//     setToast(message);

//     setTimeout(() => {
//       setToast("");
//     }, 2500);
//   };

//   const slug =
//     (data?.name || "business-card")
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "") || "business-card";

//   const captureCard = async (node) => {
//     if (!node) {
//       throw new Error("Card element not found.");
//     }

//     return await toPng(node, {
//       pixelRatio: 3,
//       cacheBust: true,
//       backgroundColor: "#FFFFFF",

//       style: {
//         transform: "none",
//         backfaceVisibility: "visible",
//       },

//       width: node.offsetWidth,
//       height: node.offsetHeight,
//     });
//   };

//   const saveDataUrl = (dataUrl, filename) => {
//     const link = document.createElement("a");

//     link.href = dataUrl;
//     link.download = filename;

//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//   };

//   const handleDownloadImage = async () => {
//     setBusy("png");

//     try {
//       const node = frontRef?.current;

//       if (!node) {
//         throw new Error("Front card is not ready.");
//       }

//       const image = await captureCard(node);

//       saveDataUrl(image, `${slug}-${orientation}.png`);

//       showToast(`${orientation === "portrait" ? "Portrait" : "Landscape"} PNG downloaded!`);
//     } catch (error) {
//       console.error("PNG export failed:", error);

//       showToast("Could not export PNG. Please try again.");
//     } finally {
//       setBusy(null);
//     }
//   };

//   const handleDownloadPDF = async () => {
//     setBusy("pdf");

//     try {
//       const frontNode = frontRef?.current;
//       const backNode = backRef?.current;

//       if (!frontNode) {
//         throw new Error("Front card is not ready.");
//       }

//       if (!backNode) {
//         throw new Error("Back card is not ready.");
//       }

//       const [frontImage, backImage] = await Promise.all([captureCard(frontNode), captureCard(backNode)]);
//       const cardWidth = frontNode.offsetWidth;
//       const cardHeight = frontNode.offsetHeight;

//       if (!cardWidth || !cardHeight) {
//         throw new Error("Invalid card dimensions.");
//       }

//       const cardRatio = cardHeight / cardWidth;

//       const isPortrait = orientation === "portrait";

//       const pdf = new jsPDF({
//         orientation: isPortrait ? "portrait" : "landscape",

//         unit: "mm",

//         format: "a4",
//       });

//       const pageWidth = pdf.internal.pageSize.getWidth();

//       const pageHeight = pdf.internal.pageSize.getHeight();

//       const margin = 15;

//       const availableWidth = pageWidth - margin * 2;

//       const availableHeight = pageHeight - margin * 2;

//       let imageWidth;
//       let imageHeight;

//       if (availableWidth / availableHeight > cardWidth / cardHeight) {
//         imageHeight = availableHeight;
//         imageWidth = imageHeight * (cardWidth / cardHeight);
//       } else {
//         imageWidth = availableWidth;
//         imageHeight = imageWidth * (cardHeight / cardWidth);
//       }

//       const x = (pageWidth - imageWidth) / 2;

//       const y = (pageHeight - imageHeight) / 2;

//       pdf.addImage(frontImage, "PNG", x, y, imageWidth, imageHeight);

//       pdf.addPage(isPortrait ? "portrait" : "landscape", "a4");

//       pdf.addImage(backImage, "PNG", x, y, imageWidth, imageHeight);

//       pdf.save(`${slug}-${orientation}.pdf`);

//       showToast(`${isPortrait ? "Portrait" : "Landscape"} PDF downloaded!`);
//     } catch (error) {
//       console.error("PDF export failed:", error);

//       showToast("Could not export PDF. Please try again.");
//     } finally {
//       setBusy(null);
//     }
//   };

//   const handleSaveContact = () => {
//     setBusy("vcf");

//     try {
//       downloadVCard(data);

//       showToast("Contact file downloaded!");
//     } catch (error) {
//       console.error("vCard export failed:", error);

//       showToast("Could not create contact file.");
//     } finally {
//       setBusy(null);
//     }
//   };

//   const handleCopyLink = async () => {
//     try {
//       const url = shareUrl || window.location.href;

//       await navigator.clipboard.writeText(url);

//       showToast("Link copied to clipboard!");
//     } catch (error) {
//       console.error("Copy link failed:", error);

//       showToast("Could not copy link.");
//     }
//   };

//   const handleShare = async () => {
//     const url = shareUrl || window.location.href;

//     if (!navigator.share) {
//       await handleCopyLink();
//       return;
//     }

//     try {
//       await navigator.share({
//         title: `${data?.name || "My"} Digital Business Card`,

//         text: "Here's my digital business card",

//         url,
//       });
//     } catch (error) {

//       if (error?.name !== "AbortError") {
//         showToast("Sharing failed.");
//       }
//     }
//   };

//   const baseButton =
//     "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

//   return (
//     <div className="mx-auto mt-6 w-full max-w-[650px]">
//       <div className="mb-4 text-center">
//         <p className="text-xs font-medium text-slate-500">Current card orientation</p>

//         <p className="mt-1 text-sm font-bold text-[#03254C]">{orientation === "portrait" ? "Portrait" : "Landscape"}</p>
//       </div>

//       <div className="flex flex-wrap justify-center gap-3">
//         {/* PNG */}
//         <button
//           type="button"
//           disabled={!!busy}
//           onClick={handleDownloadImage}
//           className={`${baseButton} bg-[#F26522] text-white hover:brightness-95`}
//         >
//           {busy === "png" ? "Preparing..." : "Download PNG"}
//         </button>

//         {/* PDF */}
//         <button
//           type="button"
//           disabled={!!busy}
//           onClick={handleDownloadPDF}
//           className={`${baseButton} bg-[#157327] text-white hover:brightness-95`}
//         >
//           {busy === "pdf" ? "Preparing..." : "Download PDF"}
//         </button>

//         {/* CONTACT */}
//         <button
//           type="button"
//           disabled={!!busy}
//           onClick={handleSaveContact}
//           className={`${baseButton} bg-[#03254C] text-white hover:brightness-95`}
//         >
//           {busy === "vcf" ? "Preparing..." : "Save Contact (.vcf)"}
//         </button>

//         {/* COPY LINK */}
//         <button
//           type="button"
//           disabled={!!busy}
//           onClick={handleCopyLink}
//           className={`${baseButton} bg-slate-200 text-slate-900 hover:bg-slate-300`}
//         >
//           Copy Link
//         </button>

//         {/* SHARE */}
//         <button
//           type="button"
//           disabled={!!busy}
//           onClick={handleShare}
//           className={`${baseButton} bg-[#03254C] text-white hover:brightness-95`}
//         >
//           Share
//         </button>
//       </div>

//       {toast && (
//         <p role="status" className="mt-3 text-center text-xs font-medium text-slate-600">
//           {toast}
//         </p>
//       )}
//     </div>
//   );
// }
