import SentenceTokenizerService from "./SentenceTokenizerService";
import WordTokenizerService from "./WordTokenizerService";

class TokenizationService {
  static sentenceTokenize(text: string): string[] {
    const sentenceTokens: string[] = SentenceTokenizerService.tokenize(text);
    console.log(sentenceTokens);
    return sentenceTokens;
  }
  static wordTokenize(sentence: string): string[] {
    const wordTokens: string[] = WordTokenizerService.tokenize(sentence);
    console.log(wordTokens);
    return wordTokens;
  }
}

export default TokenizationService;
