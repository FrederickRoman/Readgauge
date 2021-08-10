import { LayersModel, tensor2d, Tensor2D, tidy } from "@tensorflow/tfjs";

import memoize from "fast-memoize";

function wordEncode(input: string): number[] {
  const wordLowerCase = input.toLowerCase();
  const inputCharsArray = wordLowerCase.split("");
  const wordZeroPad = Array(5 * (33 - inputCharsArray.length)).fill(0);
  return [
    ...wordZeroPad,
    ...inputCharsArray
      .map((_, i) => {
        const binaryString = (wordLowerCase.charCodeAt(i) - 97).toString(2);
        // console.log("binaryString");
        // console.log(binaryString);
        const binaryArray = binaryString.split("").map((c) => Number(c));
        const numOfDigits = binaryArray.length;
        // console.log("input to encode");
        // console.log(input);
        const zeroPad = Array(5 - numOfDigits).fill(0);
        const binaryPaddedArray = [...zeroPad, ...binaryArray];
        // console.log(binaryPaddedArray);
        return binaryPaddedArray;
      })
      .flat(),
  ];
}

const memoWordEncoder: (input: string) => number[] = memoize(wordEncode);

function indexOfMax(arr: number[]): number {
  // console.log("arr.length");
  // console.log(arr.length);
  // console.log("arr");
  // console.log(arr);
  let cur = Infinity;
  let max = -Infinity;
  let indexOfMax = -1;
  for (let i = 0; i < arr.length; i++) {
    cur = arr[i];
    if (cur > max) {
      max = cur;
      indexOfMax = i;
    }
  }
  return indexOfMax;
}

function countSyllsSeq(words: string[], model: LayersModel): number {
  console.time("count 2");
  const MAX_NUM_OF_CHARS: number = 33;
  const LENGTH_OF_CHAR_ENCODING: number = 5;
  const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
  const INPUT_SIZE: [number, number] = [1, INPUT_LENGTH];
  const predictSyllableCount = (word: string): number =>
    tidy((): number => {
      const encodedWord: number[] = wordEncode(word);
      const inputTensor: Tensor2D = tensor2d(encodedWord, INPUT_SIZE);
      const outputTensor = model.predict(inputTensor) as Tensor2D;
      const outputArray = outputTensor.arraySync() as number[][];
      const syllableCount: number = indexOfMax(outputArray[0]);
      return syllableCount;
    });
  const memoPredictSyllabeCount: (word: string) => number =
    memoize(predictSyllableCount);

  let totSyllableCount: number = 0;
  words.forEach((word: string): void => {
    totSyllableCount += memoPredictSyllabeCount(word);
  });
  console.timeEnd("count 2");
  return totSyllableCount;
}

// function countSyllsParallel(words: string[], model: LayersModel): number {
//   console.time("count 1");
//   // const encodedWord: number[] = wordEncode(word);
//   // const inputTensor = tf.tensor2d(encodedWord, [1, encodedWord.length]);
//   // const outputTensor = model.predict(inputTensor) as tf.Tensor;
//   // const outputArray = outputTensor.arraySync() as number[][];
//   // const syllableCount: number = indexOfMax(outputArray[0]);

//   const encodedWords: number[][] = words.map((word) => wordEncode(word));
//   const numOfInputs = encodedWords.length;
//   const lenghtOfInputs = 33 * 5;
//   const inputSize: [number, number] = [encodedWords.length, 33 * 5];
//   const inputTensor = tensor2d(encodedWords, inputSize);
//   const outputTensor = model.predict(inputTensor) as Tensor;
//   const outputArray = outputTensor.arraySync() as number[][];
//   const syllableCount: number[] = outputArray.map((t) => indexOfMax(t));
//   const count = syllableCount.reduce((acc, cur) => acc + cur);
//   console.timeEnd("count 1");
//   return count;
// }

const workerPool: Worker[] = [];
function clearWorkerPool(): void {
  const numOfWorkers = workerPool.length;
  if (numOfWorkers > 0)
    for (let i = 0; i < numOfWorkers; i++) workerPool.pop()?.terminate();
}

async function countSyllsParallel(
  words: string[],
  model: LayersModel
): Promise<number> {
  console.time("count 1");

  const encodedWords: number[][] = [];
  words.forEach((word: string): void => {
    encodedWords.push(memoWordEncoder(word));
  });
  const numOfInputs = encodedWords.length;
  const MAX_NUM_OF_CHARS: number = 33;
  const LENGTH_OF_CHAR_ENCODING: number = 5;
  const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
  const INPUT_SIZE: [number, number] = [numOfInputs, INPUT_LENGTH];
  // const DEFAUL_SYLLABLE_COUNT = 0;

  let totSyllableCount: number = 0;

  if (window.Worker) {
    clearWorkerPool();
    const workerURL = `${process.env.PUBLIC_URL}/worker/syllableCountPredictionWorker.js`;
    const worker: Worker = new Worker(workerURL);
    workerPool.push(worker);
    console.log(`syllable worker pool size: ${workerPool.length}`);
    const workerPromise: Promise<number> = new Promise((resolve, reject) => {
      worker.postMessage({ encodedWords, INPUT_SIZE });
      worker.onerror = reject;
      worker.addEventListener("message", ({ data }) => {
        resolve(data);
      });
    });

    try {
      totSyllableCount = await workerPromise;
    } catch (error) {
      console.log(error);
    }
  } else {
    totSyllableCount = tidy((): number => {
      const inputTensor: Tensor2D = tensor2d(encodedWords, INPUT_SIZE);
      const outputTensor = model.predict(inputTensor) as Tensor2D;
      const outputArray = outputTensor.arraySync() as number[][];
      console.log("main thread outputArray");
      console.log(outputArray);
      const syllableCount: number[] = outputArray.map((t) => indexOfMax(t));
      return syllableCount.reduce((acc, cur) => acc + cur);
    });
    console.log(`main thread count ${totSyllableCount}`);
  }
  console.timeEnd("count 1");
  return totSyllableCount;
}

class SyllableCountService {
  static countSyllables(word: string): number {
    // // const MODEL_DIR = "file://./neuralNet/model.json";
    // // const model = await tf.loadLayersModel(MODEL_DIR);
    // const model = await tf.loadLayersModel(
    //   "http://localhost:3000/neuralNet/model.json"
    // );
    // const encodedWord: number[] = wordEncode(word);
    // const inputTensor = tf.tensor2d(encodedWord, [1, encodedWord.length]);
    // const outputTensor = model.predict(inputTensor) as tf.Tensor;
    // const outputArray = (await outputTensor.array()) as number[][];
    // const syllableCount: number = indexOfMax(outputArray[0]);
    // console.log("prediction");
    // console.log(syllableCount);
    return word.length;
  }
  static async countSyllablesM(
    words: string[],
    model: LayersModel
  ): Promise<number> {
    const WORD_NUM_THRESHOLD = 100;//1000;
    const numOfWords = words.length;
    return numOfWords < WORD_NUM_THRESHOLD
      ? countSyllsSeq(words, model)
      : await countSyllsParallel(words, model);
  }
  // static countSyllablesM(words: string[], model: LayersModel): number {
  //   const lenghtOfInput = 33 * 5;
  //   const inputSize: [number, number] = [1, lenghtOfInput];
  //   const getSyll = (encodedWord: number[]) =>
  //     tidy(() => {
  //       const inputTensor = tensor2d(encodedWord, inputSize);
  //       const outputTensor = model.predict(inputTensor) as Tensor;
  //       const outputArray = outputTensor.arraySync() as number[][];
  //       const syllableCount = indexOfMax(outputArray[0]);
  //       return syllableCount;
  //     });
  //   const memoGetSyll = memoize(getSyll);

  //   const encodedWords: number[][] = words.map((word) => wordEncode(word));
  //   let tot = 0;
  //   encodedWords.forEach((encodedWord) => {
  //     const syllableCount: number = memoGetSyll(encodedWord);
  //     tot += syllableCount;
  //   });
  //   return tot;
  // }
  // static countSyllablesM(words: string[], model: LayersModel): number {
  //   console.time("count 2");
  //   const MAX_NUM_OF_CHARS: number = 33;
  //   const LENGTH_OF_CHAR_ENCODING: number = 5;
  //   const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
  //   const INPUT_SIZE: [number, number] = [1, INPUT_LENGTH];
  //   const predictSyllableCount = (word: string): number =>
  //     tidy(() => {
  //       const encodedWord: number[] = wordEncode(word);
  //       const inputTensor: Tensor2D = tensor2d(encodedWord, INPUT_SIZE);
  //       const outputTensor = model.predict(inputTensor) as Tensor;
  //       const outputArray = outputTensor.arraySync() as number[][];
  //       const syllableCount: number = indexOfMax(outputArray[0]);
  //       return syllableCount;
  //     });
  //   const memoPredictSyllabeCount: (word: string) => number =
  //     memoize(predictSyllableCount);

  //   let tot: number = 0;
  //   words.forEach((word: string): void => {
  //     tot += memoPredictSyllabeCount(word);
  //   });
  //   console.timeEnd("count 2");
  //   return tot;
  // }
}

export default SyllableCountService;
