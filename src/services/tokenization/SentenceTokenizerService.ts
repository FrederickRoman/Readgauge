import WorkerPoolingService from "../workerPooling/WorkerPoolingService";

const WORKER_URL =
  `${process.env.PUBLIC_URL}/worker/sentenceTokenizerWorker.js` as const;
const workerPool = new WorkerPoolingService(WORKER_URL);

function isAnAbbreviation(token: string): boolean {
  const abbrevationList: readonly string[] = Object.freeze(["Mr.", "Mrs."]);
  return abbrevationList.includes(token);
}

function isEndingWord(token: string): boolean {
  return (
    (token.endsWith(".") && !isAnAbbreviation(token)) ||
    token.endsWith("!") ||
    token.endsWith("?") ||
    token.endsWith('?"')
  );
}

function hasEndingPunctuation(text: string): boolean {
  const trimmedText = text.trim();
  return (
    trimmedText.endsWith(".") ||
    trimmedText.endsWith("?") ||
    trimmedText.endsWith("!") ||
    trimmedText.endsWith('?"')
  );
}

function mainThreadSentenceTokenize(text: string): string[] {
  const tokens: string[] = text.split(/\s+/);
  const endingWords: string[] = [];
  tokens.forEach((token) => {
    if (isEndingWord(token)) {
      endingWords.push(token);
    }
  });
  // console.log(endingWords);
  const sentences: string[] = [];
  let sentence: string = "";
  tokens.forEach((token) => {
    sentence += `${token} `;
    if (endingWords.includes(token)) {
      sentences.push(sentence);
      sentence = "";
    }
  });
  return sentences;
}

class SentenceTokenizerService {
  static async tokenize(text: string): Promise<string[]> {
    const endedText: string = hasEndingPunctuation(text) ? text : `${text}.`;
    let sentences: string[] = [];
    try {
      const tokenizeJobPromise: (data: { text: string }) => Promise<string[]> =
        workerPool.jobPromise.bind(workerPool);
      sentences = await tokenizeJobPromise({ text: endedText });
    } catch (error) {
      console.log(error);
      console.log("Fall back to main thread execution");
      sentences = mainThreadSentenceTokenize(endedText);
    }
    return sentences;
  }
}

export default SentenceTokenizerService;
