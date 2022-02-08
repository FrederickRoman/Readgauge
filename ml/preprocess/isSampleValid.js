const NUM_CHARS = Object.freeze([
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
]);
const PUNCTUATION_CHARS = Object.freeze([
  "-",
  "_",
  "&",
  "%",
  "(",
  ")",
  "{",
  "}",
  "!",
  "?",
  '"',
  ":",
  ",",
  ";",
  "#",
  "/",
  "'",
  ".",
]);
const FORBIDDEN_CHARS = Object.freeze([...NUM_CHARS, ...PUNCTUATION_CHARS]);

/**
 * Test whether the sample word if valid for training.
 * @param {string} word - Word from the syllableCountDict.
 * @returns {boolean} - If true, the word is valid fro training.
 */
function isSampleValid(word) {
  const charIsNotForbidden = (char) =>
    !FORBIDDEN_CHARS.some((forbiddenChar) => forbiddenChar === char);
  return word.split("").every(charIsNotForbidden);
}

module.exports = isSampleValid;
