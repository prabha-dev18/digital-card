/** Inverse of encodeCardData. Returns null on bad/corrupted links → form fallback. */
export function decodeCardData(payload) {
  try {
    const binary = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    const parsed = JSON.parse(new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0))));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}