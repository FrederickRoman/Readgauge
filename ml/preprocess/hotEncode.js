/**
 * Hot-encodes a number label classification.
 * @param {number} label - Number < numOfClasses that encodes the label class.
 * @param {number} numOfClasses - Total number of classes.
 * @returns {number[]} - Label's hot-encoding.
 */
function hotEncode(label, numOfClasses) {
  const zeroPad = Array(numOfClasses).fill(0);
  zeroPad[label] = 1;
  return zeroPad;
}

module.exports = hotEncode;
