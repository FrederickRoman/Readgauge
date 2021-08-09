import SentenceTokenizerService from "./SentenceTokenizerService";
import WordTokenizerService from "./WordTokenizerService";

class TokenizationService {
  static async sentenceTokenize(text: string): Promise<string[]> {
    const sentenceTokens: string[] = await SentenceTokenizerService.tokenize(
      text
    );
    console.log(sentenceTokens);
    return sentenceTokens;
  }
  static wordTokenize(sentence: string): string[] {
    const wordTokens: string[] = WordTokenizerService.tokenize(sentence);
    // console.log(wordTokens);
    return wordTokens;
  }
}

export default TokenizationService;
