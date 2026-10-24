const fs = require("fs");
const path = require("path");

/**
 * Fast zero-dependency PNG dimension reader using standard Node.js
 */
function getPngDimensions(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    // PNG Magic Header: 89 50 4E 47
    if (buf.readUInt32BE(0) === 0x89504E47) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      return { width, height };
    }
  } catch (err) {
    return null;
  }
  return null;
}

const publicDir = path.join(process.cwd(), "public");

const companyLogos = [
  { name: "AarambhGrow Group", file: "aarambh2.png", alt: "aarambh.png" },
  { name: "AarambhGrow Advisory", file: "advisory2.png", alt: "advisory.png" },
  { name: "AarambhGrow Services", file: "service2.png", alt: "service.png" },
  { name: "AarambhGrow Infinity", file: "infinity.png", alt: "infinity2.png" },
  { name: "Nexera Consultancy", file: "nexera2.png", alt: "nexera.png" },
  { name: "EuroAsia Aquatic", file: "euroasia.png", alt: null },
];

console.log("\n=======================================================");
console.log("       AARAMBH GROUP - 6 COMPANY LOGO DIMENSIONS");
console.log("=======================================================\n");

const table = companyLogos.map((item, idx) => {
  const mainPath = path.join(publicDir, item.file);
  const mainDims = getPngDimensions(mainPath);
  const altPath = item.alt ? path.join(publicDir, item.alt) : null;
  const altDims = altPath ? getPngDimensions(altPath) : null;

  return {
    "No.": idx + 1,
    Company: item.name,
    "Primary Logo": item.file,
    "Width × Height": mainDims ? `${mainDims.width} × ${mainDims.height} px` : "Not found",
    "Aspect Ratio": mainDims ? `${(mainDims.width / mainDims.height).toFixed(2)} : 1` : "-",
    "Alt Logo": item.alt || "-",
    "Alt Size": altDims ? `${altDims.width} × ${altDims.height} px` : "-",
  };
});

console.table(table);

console.log("\nTIP: In your UI, set equal height containers with object-contain to display all 6 logos uniformly.\n");
