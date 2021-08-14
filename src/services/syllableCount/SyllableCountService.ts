import { LayersModel } from "@tensorflow/tfjs";
import sequentialCount from "./sequentialCount";
import parallelCount from "./parallelCount";

interface ICountSyllablesArgs {
  words: string[];
  model: LayersModel;
}

class SyllableCountService {
  static async countSyllables(args: ICountSyllablesArgs): Promise<number> {
    const { words, model } = args;
    const COUNTING_MODE_THRESHOLD = 1000;
    const numOfWords = words.length;
    const predictionCountInput = { words, model };
    return numOfWords < COUNTING_MODE_THRESHOLD
      ? sequentialCount(predictionCountInput)
      : await parallelCount(predictionCountInput);
  }
}

export default SyllableCountService;
