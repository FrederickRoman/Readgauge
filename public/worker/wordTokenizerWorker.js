importScripts("../vendors/moo/moo.js")

'use strict'

var WORD_TOKENIZER_TYPES_REGEX = Object.freeze({
  WS: /[ \t]+/,
  number: /0|[1-9][0-9]*/,
  word: /[a-zA-Z]+/,
  punctuation: /[.,/#!$%^&*;:{}=\-â€“_`~()?'[\]]/,
  NL: { match: /\n/, lineBreaks: true },
  default: { match: /[\s\S]/, lineBreaks: true },
  lexerError: moo.error,
});
var lexer = moo.compile(WORD_TOKENIZER_TYPES_REGEX);

self.addEventListener("message", function (event) {
  var sentence = event.data.sentence;
  lexer.reset(sentence);
  var tokens = Array.from(lexer);
  var words = [];
  for (let i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (token.type === "word") words.push(token.text);
  }
  postMessage(words);
});
