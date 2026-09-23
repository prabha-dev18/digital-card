"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaEnvelope, FaGlobe, FaLocationDot, FaLock, FaPhone, FaUser, FaWandMagicSparkles } from "react-icons/fa6";
import { validateCardData } from "../lib/validateCardData";
import { COMPANY, LOCK_COMPANY } from "../lib/cardConfig";

const inputCls =
  "w-full rounded-md border border-[#cbd5e1]/80 bg-[#ffffff] px-3.5 py-2.5 text-sm text-[#475569] outline-none transition placeholder:text-[#64748b] focus:border-[#F26522] focus:ring-2 focus:ring-[#F26522]/30 aria-[invalid=true]:border-[#F26522] aria-[invalid=true]:ring-[#F26522]/30";

const FIELDS = [
  { id: "name", label: "Full name", required: true, Icon: FaUser, ph: "e.g. Deepak Sharma", type: "text" },
  { id: "title", label: "Job title", required: true, Icon: FaBriefcase, ph: "e.g. Business Development Manager", type: "text" },
  { id: "phone", label: "Phone", required: true, Icon: FaPhone, ph: "+91 98765 43210", type: "tel" },
  { id: "email", label: "Email", required: true, Icon: FaEnvelope, ph: "you@aarambhgrow.com", type: "email" },
  { id: "website", label: "Website", Icon: FaGlobe, ph: COMPANY.website, type: "text" },
  { id: "location", label: "Location", Icon: FaLocationDot, ph: COMPANY.location, type: "text" },
];

export default function CardForm({ data, update, onGenerate }) {
  const [touched, setTouched] = useState({});
  const { errors, isValid } = useMemo(() => validateCardData(data), [data]);

  const show = (f) => (touched[f] ? errors[f] : undefined);
  const blur = (f) => () => setTouched((t) => ({ ...t, [f]: true }));
  const missing = FIELDS.filter((f) => f.required && errors[f.id]).length;

  const handleGenerate = (e) => {
    e.preventDefault();
    setTouched(Object.fromEntries(FIELDS.map((f) => [f.id, true])));
    if (isValid) onGenerate?.();
  };

  return (
    <motion.form
      onSubmit={handleGenerate}
      noValidate
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="rounded-md border border-[#e2e8f0] bg-[#ffffff] p-5 shadow-soft sm:p-7"
    >
      <h2 className="text-lg font-extrabold text-[#03254C]">Your details</h2>

      <p className="mt-1 text-sm text-[#64748b]">
        Fields marked <span className="font-bold text-[#F26522]">*</span> are required. The card previews live as you type.
      </p>

      {LOCK_COMPANY && (
        <p className="mt-4 flex items-center gap-2 rounded-md bg-[#03254C]/5 px-3.5 py-2.5 text-xs font-medium text-[#03254C]">
          <FaLock className="shrink-0 text-[#F26522]" size={12} />
          Branding is locked to {COMPANY.brandName} {COMPANY.brandNameAccent} — only your personal details are editable.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ id, label, required, Icon, ph, type }) => (
          <div key={id}>
            <label htmlFor={`f-${id}`} className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#475569]">
              {label} {required && <span className="text-[#F26522]">*</span>}
            </label>

            <div className="relative">
              <Icon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#64748b]" />

              <input
                id={`f-${id}`}
                type={type}
                className={`${inputCls} pl-10`}
                placeholder={ph}
                value={data[id]}
                onChange={(e) => update({ [id]: e.target.value })}
                onBlur={blur(id)}
                aria-invalid={!!show(id)}
              />
            </div>

            {show(id) && (
              <p className="mt-1 text-xs font-medium text-[#F26522]" role="alert">
                {show(id)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-[#f1f5f9] pt-6">
        <button
          type="submit"
          disabled={!isValid}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#03254C] px-5 py-3 text-sm font-extrabold text-[#ffffff] shadow-soft transition hover:bg-[#03254C]/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F26522] sm:w-auto"
        >
          <FaWandMagicSparkles className="text-[#F26522]" />
          Generate My Card
        </button>

        {!isValid && (
          <p className="mt-2 text-xs text-[#64748b]">
            {missing} required field{missing > 1 ? "s" : ""} left to unlock generation.
          </p>
        )}
      </div>
    </motion.form>
  );
}
