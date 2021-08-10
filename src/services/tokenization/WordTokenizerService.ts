import { ErrorRule, error, compile, Lexer, Token } from "moo";

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
  lexerError: ErrorRule;
}>;

const WORD_TOKENIZER_TYPES_REGEX: wordTokenizerRules = Object.freeze({
  WS: /[ \t]+/,
  number: /0|[1-9][0-9]*/,
  word: /[a-zA-Z]+/,
  punctuation: /[.,/#!$%^&*;:{}=\-â€“_`~()?'[\]]/,
  NL: { match: /\n/, lineBreaks: true },
  default: { match: /[\s\S]/, lineBreaks: true },
  lexerError: error,
});
const lexer: Lexer = compile(WORD_TOKENIZER_TYPES_REGEX);

const workerPool: Worker[] = [];
function clearWorkerPool(): void {
  const numOfWorkers = workerPool.length;
  if (numOfWorkers > 0)
    for (let i = 0; i < numOfWorkers; i++) workerPool.pop()?.terminate();
}

class WordTokenizerService {
  static async tokenize(sentence: string): Promise<string[]> {
    // console.log("-------------");
    // console.log(sentence);
    if (window.Worker) {
      clearWorkerPool();
      const workerURL = `${process.env.PUBLIC_URL}/worker/wordTokenizerWorker.js`;
      const worker: Worker = new Worker(workerURL);
      workerPool.push(worker);
      console.log(`token worker pool size: ${workerPool.length}`);
      const workerPromise: Promise<string[]> = new Promise(
        (resolve, reject) => {
          worker.postMessage({ sentence });
          worker.onerror = reject;
          worker.addEventListener("message", ({ data }) => {
            resolve(data);
          });
        }
      );

      try {
        const sentences = await workerPromise;
        return sentences;
      } catch (error) {
        console.log(error);
        return [];
      }
    } else {
      lexer.reset(sentence);
      const tokens: Token[] = Array.from(lexer);
      const words: string[] = [];
      tokens.forEach(({ type, text }) => {
        if (type === "word") words.push(text);
      });
      return words;
    }
  }
}

export default WordTokenizerService;
