/**
 * [node train] builds and trains the model that runs on Readgauge.
 *
 * It predicts the syllable count of a word (that has been encoded).
 * It uses a feedforward neural network with leaky ReLU and dropout layers.
 *
 * Since this is intended to be part of Readgauge's reading level calculation,
 * this model was chosen to balance performance and accuracy. The full
 * model making process and exploration to solve this task is saved in a
 * separate public repo by the same author:
 *
 * @author Frederick Roman
 */
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const util = require("util");
const encode = require("./preprocess/preprocess");
const writeFileAsync = util.promisify(fs.writeFile);

const NUM_OF_FEATURES = 165; // encoded word length
const NUM_OF_CLASSES = 15; // syllable count label in [0, 14]

/**
 * Returns built sequential model.
 * that predicts the number of syllables of a word.
 * @returns {tf.Sequential} - Untrained syllable count model.
 */
function buildModel() {
  const { dense, leakyReLU, dropout } = tf.layers;
  const alpha = 0.1;
  const rate = 0.5;

  const model = tf.sequential();
  model.add(dense({ units: 34, inputShape: [NUM_OF_FEATURES] }));
  model.add(leakyReLU({ alpha }));
  model.add(dropout({ rate }));
  model.add(dense({ units: 15 }));
  model.add(leakyReLU({ alpha }));
  model.add(dropout({ rate }));
  model.add(dense({ units: NUM_OF_CLASSES, activation: "softmax" }));
  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: "categoricalAccuracy",
  });

  model.summary();
  return model;
}

/**
 * Trains the syllable count model and saves it to MODEL_DIRECTORY.
 * The training history is saved to HISTORY_DIRECTORY.
 * @param {number[]} input - Sample words (ascii-based encoded by preprocess).
 * @param {number[]} output - Syllable count labels (one-hot encoded).
 * @param {tf.Sequential} model - Untrained syllable count model.
 * @returns {Promise<void>}
 */
async function trainModel(input, output, model) {
  try {
    const NUM_OF_SAMPLES = 115533;
    const INPUT_SIZE = [NUM_OF_SAMPLES, NUM_OF_FEATURES];
    const OUTPUT_SIZE = [NUM_OF_SAMPLES, NUM_OF_CLASSES];

    const xs = tf.tensor2d(input, INPUT_SIZE);
    const ys = tf.tensor2d(output, OUTPUT_SIZE);
    const config = {
      epochs: 1000,
      batchSize: 300,
      shuffle: true,
      validationSplit: 0.1,
      callbacks: tf.callbacks.earlyStopping({
        monitor: "val_loss",
        patience: 50,
      }),
    };
    const history = await model.fit(xs, ys, config);
    xs.dispose();
    ys.dispose();

    const MODEL_DIRECTORY = "file://./ml/model/syllableCountModel";
    const HISTORY_DIRECTORY = "./ml/validation/history.json";
    await model.save(MODEL_DIRECTORY);
    await writeFileAsync(HISTORY_DIRECTORY, JSON.stringify(history, null, " "));
  } catch (error) {
    console.log(error);
  }
}

const { input, output } = encode();
const model = buildModel();
trainModel(input, output, model);
