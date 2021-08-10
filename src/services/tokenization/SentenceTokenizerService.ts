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

function hasEndingPunctuation(text: string) {
  const trimmedText = text.trim();
  return (
    trimmedText.endsWith(".") ||
    trimmedText.endsWith("?") ||
    trimmedText.endsWith("!") ||
    trimmedText.endsWith('?"')
  );
}

const workerPool: Worker[] = [];
function clearWorkerPool(): void {
  const numOfWorkers = workerPool.length;
  if (numOfWorkers > 0)
    for (let i = 0; i < numOfWorkers; i++) workerPool.pop()?.terminate();
}

class SentenceTokenizerService {
  static async tokenize(text: string): Promise<string[]> {
    const endedText = hasEndingPunctuation(text) ? text : `${text}.`;
    if (window.Worker) {
      clearWorkerPool();
      const workerURL = `${process.env.PUBLIC_URL}/worker/sentenceTokenizerWorker.js`;
      const worker: Worker = new Worker(workerURL);
      workerPool.push(worker);
      console.log(`token worker pool size: ${workerPool.length}`);
      const workerPromise: Promise<string[]> = new Promise(
        (resolve, reject) => {
          worker.postMessage({ text: endedText });
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
      const tokens: string[] = endedText.split(/\s+/);
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
  }
}

export default SentenceTokenizerService;
