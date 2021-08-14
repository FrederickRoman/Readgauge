import memoize from "fast-memoize";

const WORD_MAX_LEN = 33;
const CHAR_LEN = 5;
const A_CHAR_CODE = 97;
const BINARY_BASE = 2;

function truncate(chars: string): string {
  return chars.length > WORD_MAX_LEN ? chars.slice(0, WORD_MAX_LEN) : chars;
}

function encodeChars(input: string): number[][] {
  const wordLowerCase: string = input.toLowerCase();
  const wordLowerCaseChars: string[] = wordLowerCase.split("");
  const charToBinaryArrayMapper = (_: string, i: number): number[] => {
    const charCode: number = wordLowerCase.charCodeAt(i);
    const shiftedCharCode: number = charCode - A_CHAR_CODE;
    const utfBinCode: number[] = shiftedCharCode
      .toString(BINARY_BASE)
      .split("")
      .map((c: string): number => Number(c));
    const zeroPad: number[] = Array(CHAR_LEN - utfBinCode.length).fill(0);
    return [...zeroPad, ...utfBinCode];
  };
  return wordLowerCaseChars.map(charToBinaryArrayMapper);
}

function encodeWord(input: string): number[] {
  const inputChars: number[][] = encodeChars(truncate(input));
  const numInputChars: number = inputChars.length;
  const wordZeroPad = Array(CHAR_LEN * (WORD_MAX_LEN - numInputChars)).fill(0);
  return [...wordZeroPad, ...inputChars.flat()];
}

class Preprocessing {
  static memoWordEncoder: (word: string) => number[] = memoize(encodeWord);
}

export default Preprocessing;
