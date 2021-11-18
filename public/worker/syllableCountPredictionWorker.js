importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");

("use strict");

function indexOfMax(arr) {
  var cur = Infinity;
  var max = -Infinity;
  var indexOfMax = -1;
  for (var i = 0; i < arr.length; i++) {
    cur = arr[i];
    if (cur > max) {
      max = cur;
      indexOfMax = i;
    }
  }
  return indexOfMax;
}

self.addEventListener("message", function (event) {
  console.log("web worker");
  var data = event.data;
  var encodedWords = data.encodedWords;
  var INPUT_SIZE = data.INPUT_SIZE;

  var MODEL_PUBLIC_DIR = "../neuralNet/model.json";
  var totSyllCount = 0;
  var inputTensor = null;
  var outputTensor = null;
  tf.loadLayersModel(MODEL_PUBLIC_DIR)
    .then(function (model) {
      inputTensor = tf.tensor2d(encodedWords, INPUT_SIZE);
      outputTensor = model.predict(inputTensor);
      outputTensor.array().then(function (outputArray) {
        outputArray.forEach(function (outWordPred) {
          totSyllCount += indexOfMax(outWordPred);
        });
        postMessage(totSyllCount);
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      if (inputTensor) inputTensor.dispose();
      if (outputTensor) outputTensor.dispose();
    });
});
