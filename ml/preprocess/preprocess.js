/**
 * It preprocesses the dataset samples into arrays (to be turned into tensors
 * during training later on).
 *
 * Note: This preprocess is semantically the same that runs on production
 * on the client-side; but this version emphasizes maintainability as opposed to
 * performance. 
 * The version that runs on production is under src/services/Preprocessing.ts
 * 
 * @author Frederick Roman
 */
const isSampleValid = require("./isSampleValid");
const asciiEncode = require("./asciiEncode");
const hotEncode = require("./hotEncode");

/**
 * @type {[key: string]: number}
 */
const SYLLABLE_COUNT_DICT = require("../data/syllableCountDict.json");

/**
 * Takes the syllableCountDict and encode each valid entry of the dict into
 * ascii-encoded input features and hot-encoded output labels.
 * @returns {input: (0 | 1)[]; ouput: (0 | 1)[]}
 */
function encode() {
  const input = [];
  const output = [];
  Object.entries(SYLLABLE_COUNT_DICT)
    .map(([word, syllablecount]) => ({ features: word, label: syllablecount }))
    .filter(({ features }) => isSampleValid(features))
    .map(({ features, label }) => ({
      encodedFeat: asciiEncode(features),
      encodedLabel: hotEncode(label, 15),
    }))
    .forEach(({ encodedFeat, encodedLabel }) => {
      input.push(encodedFeat);
      output.push(encodedLabel);
    });
  return { input, output };
}

module.exports = encode;
