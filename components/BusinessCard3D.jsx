"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function BusinessCard3D({ data, flipped, onToggleFlip, frontFaceRef, backFaceRef, orientation = "landscape" }) {
  const reduced = useReducedMotion();
  const tiltEnabled = useRef(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 140,
    damping: 18,
    mass: 0.4,
  });

  const springY = useSpring(rotateY, {
    stiffness: 140,
    damping: 18,
    mass: 0.4,
  });

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      tiltEnabled.current = finePointer.matches && !noMotion.matches;
    };

    update();

    finePointer.addEventListener?.("change", update);
    noMotion.addEventListener?.("change", update);

    return () => {
      finePointer.removeEventListener?.("change", update);
      noMotion.removeEventListener?.("change", update);
    };
  }, []);

  const handlePointerMove = (e) => {
    if (!tiltEnabled.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;

    rotateY.set(px * 14);
    rotateX.set(-py * 12);
  };

  const handlePointerLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleClick = (e) => {
    if (e.target.closest("a, button, input, textarea, [data-no-flip]")) {
      return;
    }

    onToggleFlip?.();
  };

  const handleKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggleFlip?.();
    }
  };

  const isPortrait = orientation === "portrait";

  return (
    <div
      className={`relative select-none touch-manipulation ${
        isPortrait ? "aspect-[600/1050] w-[min(76vw,360px)]" : "aspect-[1050/600] w-[min(92vw,500px)]"
      }`}
    >
      <div
        className="relative h-full w-full"
        style={{
          perspective: "1400px",
        }}
      >
        {/* TILT */}
        <motion.div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="h-full w-full"
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          {/* FLIP */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label={`3D business card for ${data?.name || "you"}. Activate to flip the card.`}
            aria-pressed={flipped}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            initial={false}
            animate={{
              rotateY: flipped ? 180 : 0,
            }}
            transition={
              reduced
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 240,
                    damping: 26,
                  }
            }
            className="relative h-full w-full cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <CardFront data={data} innerRef={frontFaceRef} orientation={orientation} />
            <CardBack data={data} innerRef={backFaceRef} orientation={orientation} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
// import CardFront from "./CardFront";
// import CardBack from "./CardBack";

// export default function BusinessCard3D({ data, flipped, onToggleFlip, frontFaceRef, backFaceRef }) {
//   const reduced = useReducedMotion();
//   const tiltEnabled = useRef(false);

//   const rotateX = useMotionValue(0);
//   const rotateY = useMotionValue(0);
//   const springX = useSpring(rotateX, { stiffness: 140, damping: 18, mass: 0.4 });
//   const springY = useSpring(rotateY, { stiffness: 140, damping: 18, mass: 0.4 });

//   useEffect(() => {
//     const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
//     const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const update = () => {
//       tiltEnabled.current = finePointer.matches && !noMotion.matches;
//     };
//     update();
//     finePointer.addEventListener?.("change", update);
//     noMotion.addEventListener?.("change", update);
//     return () => {
//       finePointer.removeEventListener?.("change", update);
//       noMotion.removeEventListener?.("change", update);
//     };
//   }, []);

//   const handlePointerMove = (e) => {
//     if (!tiltEnabled.current) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;
//     rotateY.set(px * 14);
//     rotateX.set(-py * 12);
//   };

//   const handlePointerLeave = () => {
//     rotateX.set(0);
//     rotateY.set(0);
//   };

//   const handleClick = (e) => {
//     if (e.target.closest("a, button, input, textarea, [data-no-flip]")) return;
//     onToggleFlip?.();
//   };

//   const handleKeyDown = (e) => {
//     if (e.target !== e.currentTarget) return;
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault();
//       onToggleFlip?.();
//     }
//   };

//   return (
//     /* aspect 7:4 = standard 3.5"×2" business card ratio, same as the artwork */
//     <div className="relative aspect-[7/4] w-[min(92vw,460px)] select-none touch-manipulation lg:w-[500px]">
//       <div className="relative h-full w-full" style={{ perspective: "1400px" }}>
//         {/* Layer 1 — parallax tilt */}
//         <motion.div
//           onPointerMove={handlePointerMove}
//           onPointerLeave={handlePointerLeave}
//           className="h-full w-full"
//           style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", willChange: "transform" }}
//         >
//           {/* Layer 2 — flip */}
//           <motion.div
//             role="button"
//             tabIndex={0}
//             aria-label={`3D business card for ${data.name || "you"}. Activate to flip the card.`}
//             aria-pressed={flipped}
//             onClick={handleClick}
//             onKeyDown={handleKeyDown}
//             initial={false}
//             animate={{ rotateY: flipped ? 180 : 0 }}
//             transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 26 }}
//             className="relative h-full w-full cursor-pointer rounded-md outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
//             style={{ transformStyle: "preserve-3d", willChange: "transform" }}
//           >
//             <CardFront data={data} innerRef={frontFaceRef} />
//             <CardBack data={data} innerRef={backFaceRef} />
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
