"use client";

import dynamic from "next/dynamic";

const BusinessCard3D = dynamic(() => import("./BusinessCard3D"), {
  ssr: false,
  loading: () => <div className="aspect-[1050/600] w-[min(92vw,500px)] animate-pulse rounded-md bg-slate-200/70" />,
});

export default function CardPreviewPane({
  data,
  flipped,
  onToggleFlip,
  frontFaceRef,
  backFaceRef,
  variant = "preview",
  orientation = "landscape",
  onOrientationChange,
}) {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* LIVE PREVIEW BADGE */}
      {variant === "preview" && (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-orange">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
          Live Preview
        </span>
      )}

      {/* ORIENTATION SWITCH */}
      {onOrientationChange && (
        <div className="flex items-center gap-1 rounded-lg bg-slate-200/80 p-1" role="group" aria-label="Card orientation">
          <button
            type="button"
            onClick={() => onOrientationChange("landscape")}
            disabled={orientation === "landscape"}
            className={`rounded-md px-4 py-2 text-xs font-bold transition-all ${
              orientation === "landscape" ? "bg-white text-[#03254C] shadow-sm" : "text-slate-500 hover:text-[#03254C]"
            }`}
          >
            Landscape
          </button>

          <button
            type="button"
            onClick={() => onOrientationChange("portrait")}
            disabled={orientation === "portrait"}
            className={`rounded-md px-4 py-2 text-xs font-bold transition-all ${
              orientation === "portrait" ? "bg-white text-[#03254C] shadow-sm" : "text-slate-500 hover:text-[#03254C]"
            }`}
          >
            Portrait
          </button>
        </div>
      )}

      {/* CARD */}
      <BusinessCard3D
        data={data}
        flipped={flipped}
        onToggleFlip={onToggleFlip}
        frontFaceRef={frontFaceRef}
        backFaceRef={backFaceRef}
        orientation={orientation}
      />

      {/* INFO */}
      <p className="text-center text-xs text-slate-500">
        {variant === "final"
          ? `Flip the ${orientation} card to double-check every detail before downloading.`
          : "Click or tap the card to flip it — it updates as you type."}
      </p>
    </div>
  );
}

// "use client";

// import dynamic from "next/dynamic";

// // Client-only — the 3D transform context never touches the server.
// const BusinessCard3D = dynamic(() => import("./BusinessCard3D"), {
//   ssr: false,
//   loading: () => (
//     <div className="aspect-[7/4] w-[min(92vw,460px)] animate-pulse rounded-md bg-slate-200/70 lg:w-[500px]" />
//   ),
// });

// export default function CardPreviewPane({ data, flipped, onToggleFlip, frontFaceRef, backFaceRef, variant = "preview" }) {
//   return (
//     <div className="flex flex-col items-center gap-4">
//       {variant === "preview" && (
//         <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-orange">
//           <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-orange" />
//           Live Preview
//         </span>
//       )}

//       <BusinessCard3D
//         data={data}
//         flipped={flipped}
//         onToggleFlip={onToggleFlip}
//         frontFaceRef={frontFaceRef}
//         backFaceRef={backFaceRef}
//       />

//       <p className="text-center text-xs text-slate-500">
//         {variant === "final"
//           ? "Flip the card to double-check every detail before downloading."
//           : "Click or tap the card to flip it — it updates as you type."}
//       </p>
//     </div>
//   );
// }
