import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rawOutputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const outputDir = isAbsolute(rawOutputDir) ? rawOutputDir : resolve(scriptDir, rawOutputDir);
const entry = "Caught a sudden Vice City fever; doctor ordered 72 hours of bed rest and zero sunlight.";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), entry, "utf8");
const writtenText = readFileSync(join(outputDir, "entry.txt"), "utf8");
const expectedLength = 87;
const expectedByteLength = 87;
const expectedMaxWords = 20;
const actualLength = [...writtenText].length;
const actualByteLength = Buffer.byteLength(writtenText, "utf8");
const actualWords = writtenText.trim() ? writtenText.trim().split(/\s+/).length : 0;
const actualLines = writtenText.split(/\r\n|\r|\n/).length;
if (actualLength !== expectedLength || actualByteLength !== expectedByteLength || actualLines !== 1 || writtenText !== entry || actualWords > expectedMaxWords) {
  throw new Error(`Entry check failed: expected length ${expectedLength}, actual ${actualLength}; expected byte length ${expectedByteLength}, actual ${actualByteLength}; expected lines 1, actual ${actualLines}; expected at most ${expectedMaxWords} words, actual ${actualWords}; expected exact entry match, actual ${writtenText === entry}`);
}
