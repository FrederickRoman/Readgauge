import TokenizationService from "../tokenization/TokenizationService";
import SyllableCountService from "../syllableCount/SyllableCountService";

class ReadabilityService {
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
    console.log("SCORE", score);
    return score;
  }
}

export default ReadabilityService;
