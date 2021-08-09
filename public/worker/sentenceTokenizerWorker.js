function isAnAbbreviation(token) {
  var abbrevationList = Object.freeze(["Mr.", "Mrs."]);
  return abbrevationList.includes(token);
}

function isEndingWord(token) {
  return (
    (token.endsWith(".") && !isAnAbbreviation(token)) ||
    token.endsWith("!") ||
    token.endsWith("?") ||
    token.endsWith('?"')
  );
}

self.addEventListener("message", function (event) {
  var text = event.data.text;
  var tokens = text.split(/\s+/);
  var endingWords = [];
  tokens.forEach(function (token) {
    if (isEndingWord(token)) {
      endingWords.push(token);
    }
  });
  // console.log(endingWords);
  var sentences = [];
  var sentence = "";
  tokens.forEach(function (token) {
    sentence += token + " ";
    if (endingWords.includes(token)) {
      sentences.push(sentence);
      sentence = "";
    }
  });
  postMessage(sentences);
});
