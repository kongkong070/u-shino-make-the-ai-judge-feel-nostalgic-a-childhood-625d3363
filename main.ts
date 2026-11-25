// Make the AI Judge Feel Nostalgic: A Childhood Memory
// Entry: a single sentence (<= 280 chars) recalling a childhood memory.
// Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt (or /output/entry.txt).
// Node 22 stdlib only. Never removes the output directory itself
// (the grader bind-mounts it); only creates it and writes the file.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Every summer evening my grandmother called me in from the yard, and her kitchen smelled of fresh rice and rain on hot concrete while the radio murmured low and the last light turned the chipped tiles gold.";

const MAX_CHARS = 280;

function validate(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("entry is empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, over the 280-char gate`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Gate: a single sentence — exactly one sentence-ending mark, at the end.
  const terminators = (text.match(/[.!?]/g) ?? []).length;
  if (terminators !== 1 || !text.endsWith(".")) {
    throw new Error("entry must be a single sentence ending with a period");
  }
}

function main(): void {
  validate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
  console.log(`wrote ${ENTRY.length} chars to ${join(outDir, "entry.txt")}`);
}

main();
