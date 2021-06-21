import TokenizationService from "../tokenization/TokenizationService";
import SyllableCountService from "../syllableCount/SyllableCountService";

import * as tf from "@tensorflow/tfjs";

class ReadabilityService {
  // model: tf.LayersModel | null = null;
  // async init() {
  //   this.model = await tf.loadLayersModel(
  //     "http://localhost:3000/neuralNet/model.json"
  //   );
  // }
  score(text: string): number {
    const sentences: string[] = TokenizationService.sentenceTokenize(text);
    const numOfSentences: number = sentences.length;
    let totalNumOfSyllables: number = 0;

    sentences.forEach((sentence: string): void => {
      const words: string[] = TokenizationService.wordTokenize(sentence);
      words.forEach(async (word: string): Promise<void> => {
        const syllables: number = SyllableCountService.countSyllables(word);
        totalNumOfSyllables += syllables;
      });
    });

    const score: number =
      numOfSentences > 0 ? totalNumOfSyllables / numOfSentences : Infinity;
    // console.log("SCORE", score);
    return score;
  }
  static score(text: string): number {
    const sentences: string[] = TokenizationService.sentenceTokenize(text);
    const numOfSentences: number = sentences.length;
    let totalNumOfSyllables: number = 0;

    sentences.forEach((sentence: string): void => {
      const words: string[] = TokenizationService.wordTokenize(sentence);
      words.forEach(async (word: string): Promise<void> => {
        const syllables: number = SyllableCountService.countSyllables(word);
        totalNumOfSyllables += syllables;
      });
    });

    const score: number =
      numOfSentences > 0 ? totalNumOfSyllables / numOfSentences : Infinity;
    // console.log("SCORE", score);
    return score;
  }
}

export default ReadabilityService;
