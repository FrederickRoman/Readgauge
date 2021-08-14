import { LayersModel, tensor2d, Tensor2D, tidy } from "@tensorflow/tfjs";
import WorkerPoolingService from "../workerPooling/WorkerPoolingService";
import Preprocessing from "./Preprocessing";
import Postprocessing from "./Postprocessing";

interface IMainThreadParlCountArgs {
  encodedWords: number[][];
  INPUT_SIZE: [number, number];
  model: LayersModel;
}

interface IParallelCountArgs {
  words: string[];
  model: LayersModel;
}

const WORKER_URL = `${process.env.PUBLIC_URL}/worker/syllableCountPredictionWorker.js`;
const workerPool = new WorkerPoolingService(WORKER_URL);

const memoWordEncoder: (word: string) => number[] =
  Preprocessing.memoWordEncoder.bind(Preprocessing);
const indexOfMax: (arr: number[]) => number =
  Postprocessing.indexOfMax.bind(Postprocessing);

function mainThreadParallelCount(args: IMainThreadParlCountArgs): number {
  const { encodedWords, INPUT_SIZE, model } = args;
  return tidy((): number => {
    const inputTensor: Tensor2D = tensor2d(encodedWords, INPUT_SIZE);
    const outputTensor = model.predict(inputTensor) as Tensor2D;
    const outputArray = outputTensor.arraySync() as number[][];
    console.log("main thread outputArray");
    console.log(outputArray);
    const syllableCount: number[] = outputArray.map((t) => indexOfMax(t));
    return syllableCount.reduce((acc, cur) => acc + cur);
  });
}

async function parallelCount(args: IParallelCountArgs): Promise<number> {
  console.time("count 1");
  const { words, model } = args;

  const MAX_NUM_OF_CHARS = 33;
  const LENGTH_OF_CHAR_ENCODING = 5;
  const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
  const encodedWords: number[][] = [];
  words.forEach((word: string): void => {
    encodedWords.push(memoWordEncoder(word));
  });
  const INPUT_SIZE: [number, number] = [encodedWords.length, INPUT_LENGTH];

  let totSyllableCount: number = 0;
  try {
    const jobData = { encodedWords, INPUT_SIZE };
    const parallelCountJobPromise: (data: typeof jobData) => Promise<number> =
      workerPool.jobPromise.bind(workerPool);
    totSyllableCount = await parallelCountJobPromise(jobData);
  } catch (error) {
    console.log(error);
    console.log("Fall back to main thread execution");
    const mainThreadData = { encodedWords, INPUT_SIZE, model };
    totSyllableCount = mainThreadParallelCount(mainThreadData);
  }
  console.timeEnd("count 1");
  return totSyllableCount;
}

export default parallelCount;
