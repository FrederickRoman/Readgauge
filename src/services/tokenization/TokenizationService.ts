import SentenceTokenizerService from "./SentenceTokenizerService";
import WordTokenizerService from "./WordTokenizerService";

const sentenceTokenize: (text: string) => Promise<string[]> =
  SentenceTokenizerService.tokenize.bind(SentenceTokenizerService);
const wordTokenize: (sentence: string) => Promise<string[]> =
  WordTokenizerService.tokenize.bind(WordTokenizerService);

class TokenizationService {
  static async tokenizeToSentences(text: string): Promise<string[]> {
    const sentenceTokens: string[] = await sentenceTokenize(text);
    // console.log(sentenceTokens);
    return sentenceTokens;
  }
  static async tokenizeToWords(sentence: string): Promise<string[]> {
    const wordTokens: string[] = await wordTokenize(sentence);
    // console.log(wordTokens);
    return wordTokens;
  }
}

export default TokenizationService;
