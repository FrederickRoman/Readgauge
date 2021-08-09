importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js");

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
  tf.loadLayersModel(MODEL_PUBLIC_DIR)
    .then(function (model) {
      var inputTensor = tf.tensor2d(encodedWords, INPUT_SIZE);
      var outputTensor = model.predict(inputTensor);
      inputTensor.dispose();
      var outputArray = outputTensor.arraySync();
      outputTensor.dispose();
      outputArray.forEach(function (outWordPred) {
        totSyllCount += indexOfMax(outWordPred);
      });
      postMessage(totSyllCount);
    })
    .catch(function (error) {
      console.log(error);
    });
});
