import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One haiku for make.fun "Seventeen Syllables of Debugging": a red
// breakpoint dot holds its breath while I step through the dark code —
// and the bug, it turns out, is stepping right along with me.
// Syllables: 5-7-5 (Red dot holds its breath / I step through the dark
// code once / the bug steps with me).
const text =
  "Red dot holds its breath\nI step through the dark code once\nthe bug steps with me";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Gate: the entry must be UTF-8 text of 1-200 characters, three lines
// in the 5-7-5 haiku shape, and not only white space.
const length = [...text].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
const trimmed = text.trim();
if (trimmed.length === 0) {
  throw new Error("entry must not be only white space");
}
const lines = text.split("\n");
if (lines.length !== 3) {
  throw new Error(`entry must be exactly three lines, got ${lines.length}`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
