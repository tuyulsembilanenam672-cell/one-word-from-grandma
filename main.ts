import { mkdirSync, writeFileSync } from "node:fs";

// The single word our grandma would text about AI.
// She means "robot", of course — but her thumbs had other plans,
// and now the machine has a name it never asked for.
const WORD: string = "robut";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only white space, and one word only.
function validate(word: string): void {
  const points: string[] = [...word];
  if (points.length < 1 || points.length > 30) {
    throw new Error(`word must be 1-30 characters, got ${points.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("word must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no white space");
  }
  if (!/[A-Za-z]/.test(word)) {
    throw new Error("word must contain at least one letter");
  }
}

function main(): void {
  validate(WORD);
  mkdirSync("/output", { recursive: true });
  // Exactly the word, no trailing newline: the file is byte for byte
  // the entry, so the judge reads "robut" and nothing else.
  writeFileSync("/output/entry.txt", WORD, "utf8");
  console.log(`Wrote ${[...WORD].length} code points to /output/entry.txt`);
}

main();
