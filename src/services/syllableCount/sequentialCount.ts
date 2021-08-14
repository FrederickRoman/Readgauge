import { LayersModel, tensor2d, Tensor2D, tidy } from "@tensorflow/tfjs";
import Preprocessing from "./Preprocessing";
import Postprocessing from "./Postprocessing";

import memoize from "fast-memoize";

interface ISequentialCountArgs {
  words: string[];
  model: LayersModel;
}

const memoWordEncoder: (word: string) => number[] =
  Preprocessing.memoWordEncoder;
const indexOfMax: (arr: number[]) => number = Postprocessing.indexOfMax;

function sequentialCount(args: ISequentialCountArgs): number {
  console.time("count 2");
  const { words, model } = args;

  const MAX_NUM_OF_CHARS: number = 33;
  const LENGTH_OF_CHAR_ENCODING: number = 5;
  const INPUT_LENGTH: number = MAX_NUM_OF_CHARS * LENGTH_OF_CHAR_ENCODING;
  const INPUT_SIZE: [number, number] = [1, INPUT_LENGTH];
  const predictSyllableCount = (word: string): number =>
    tidy((): number => {
      const encodedWord: number[] = memoWordEncoder(word);
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

export default sequentialCount;
