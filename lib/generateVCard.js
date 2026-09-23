import { COMPANY } from "./cardConfig";

function escapeValue(v) {
  return String(v ?? "").replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
function foldLine(line) {
  if (line.length <= 75) return line;
  return (line.match(/.{1,73}/g) || [line]).join("\r\n ");
}
function withProtocol(url) {
  const v = String(url || "").trim();
  return !v || /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function generateVCard(data) {
  const parts = (data.name || "").trim().split(/\s+/);
  const first = parts.shift() || "";
  const last = parts.join(" ");

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeValue(last)};${escapeValue(first)};;;`,
    `FN:${escapeValue(data.name)}`,
    `ORG:${escapeValue(COMPANY.orgFullName)}`,
    `TITLE:${escapeValue(data.title)}`,
    `TEL;TYPE=CELL,VOICE:${(data.phone || "").trim()}`,
    `EMAIL;TYPE=INTERNET,WORK:${(data.email || "").trim()}`,
  ];
  if (data.website?.trim()) lines.push(`URL:${withProtocol(data.website)}`);
  if (data.location?.trim()) lines.push(`ADR;TYPE=WORK:;;${escapeValue(data.location)};;;;`);
  lines.push(`REV:${new Date().toISOString()}`, "END:VCARD");

  return lines.map(foldLine).join("\r\n");
}

export function buildVCardFileName(data) {
  const slug =
    (data.name || "contact").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") ||
    "contact";
  return `${slug}-contact.vcf`;
}

export function downloadVCard(data) {
  const blob = new Blob([generateVCard(data)], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = buildVCardFileName(data);
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}