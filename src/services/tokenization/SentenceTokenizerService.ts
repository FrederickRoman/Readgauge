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

class SentenceTokenizerService {
  static tokenize(text: string): string[] {
    const tokens: string[] = text.split(/\s+/);
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

export default SentenceTokenizerService;
