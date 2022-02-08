/**
 * Ascii-encodes word's chars and zero-pads the array.
 * @param {string} word - Word from syllableCountDict.
 * @returns {(0 | 1)[]} - Ascii-based encoding with zero-padding.
 */
function asciiEncode(word) {
  const wordCharsArray = word.split("");
  const wordZeroPad = Array(5 * (33 - wordCharsArray.length)).fill(0);
  const wordCharsEncoded = wordCharsArray
    .map((_, i) => {
      const binaryString = (word.charCodeAt(i) - 97).toString(2);
      const binaryArray = binaryString.split("").map((c) => Number(c));
      const numOfDigits = binaryArray.length;
      const zeroPad = Array(5 - numOfDigits).fill(0);
      const binaryPaddedArray = [...zeroPad, ...binaryArray];
      return binaryPaddedArray;
    })
    .flat();
  return [...wordZeroPad, ...wordCharsEncoded];
}

module.exports = asciiEncode;
