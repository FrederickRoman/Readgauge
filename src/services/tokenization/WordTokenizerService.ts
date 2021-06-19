import moo from "moo";

type wordTokenizerRules = Readonly<{
  WS: RegExp;
  number: RegExp;
  word: RegExp;
  punctuation: RegExp;
  NL: {
    match: RegExp;
    lineBreaks: boolean;
  };
  default: {
    match: RegExp;
    lineBreaks: boolean;
  };
  lexerError: moo.ErrorRule;
}>;

const WORD_TOKENIZER_TYPES_REGEX: wordTokenizerRules = Object.freeze({
  WS: /[ \t]+/,
  number: /0|[1-9][0-9]*/,
  word: /[a-zA-Z]+/,
  punctuation: /[.,/#!$%^&*;:{}=\-â€“_`~()?'[\]]/,
  NL: { match: /\n/, lineBreaks: true },
  default: { match: /[\s\S]/, lineBreaks: true },
  lexerError: moo.error,
});
const lexer: moo.Lexer = moo.compile(WORD_TOKENIZER_TYPES_REGEX);

class WordTokenizerService {
  static tokenize(sentence: string): string[] {
    console.log("-------------");
    console.log(sentence);
    lexer.reset(sentence);
    const tokens = Array.from(lexer);
    const words: string[] = tokens
      .filter(({ type }) => type === "word")
      .map(({ text }) => text);
    return words;
  }
}

export default WordTokenizerService;
