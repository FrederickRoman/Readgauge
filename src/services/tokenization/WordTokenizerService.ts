import { error, compile, Lexer, Token } from "moo";
import WorkerPoolingService from "../workerPooling/WorkerPoolingService";

const WORKER_URL = `${process.env.PUBLIC_URL}/worker/wordTokenizerWorker.js`;
const workerPool = new WorkerPoolingService(WORKER_URL);

const WORD_TOKENIZER_TYPES_REGEX = Object.freeze({
  WS: /[ \t]+/,
  number: /0|[1-9][0-9]*/,
  word: /[a-zA-Z]+/,
  punctuation: /[.,/#!$%^&*;:{}=\-â€“_`~()?'[\]]/,
  NL: { match: /\n/, lineBreaks: true },
  default: { match: /[\s\S]/, lineBreaks: true },
  lexerError: error,
});
const lexer: Lexer = compile(WORD_TOKENIZER_TYPES_REGEX);

function mainThreadWordTokenization(sentence: string): string[] {
  lexer.reset(sentence);
  const tokens: Token[] = Array.from(lexer);
  const words: string[] = [];
  tokens.forEach(({ type, text }) => {
    if (type === "word") words.push(text);
  });
  return words;
}

class WordTokenizerService {
  static async tokenize(sentence: string): Promise<string[]> {
    let words: string[] = [];
    try {
      const jobData = { sentence };
      const tokenizeJobPromise: (data: typeof jobData) => Promise<string[]> =
        workerPool.jobPromise.bind(workerPool);
      words = await tokenizeJobPromise(jobData);
    } catch (error) {
      console.log(error);
      console.log("Fall back to main thread execution");
      words = mainThreadWordTokenization(sentence);
    }
    return words;
  }
}

export default WordTokenizerService;
