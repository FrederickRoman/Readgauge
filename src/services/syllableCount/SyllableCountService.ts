import * as tf from "@tensorflow/tfjs";

function wordEncode(input: string): number[] {
  const wordLowerCase = input.toLowerCase();
  const inputCharsArray = wordLowerCase.split("");
  const wordZeroPad = Array(5 * (33 - inputCharsArray.length)).fill(0);
  return [
    ...wordZeroPad,
    ...inputCharsArray
      .map((_, i) => {
        const binaryString = (wordLowerCase.charCodeAt(i) - 97).toString(2);
        console.log("binaryString");
        console.log(binaryString);
        const binaryArray = binaryString.split("").map((c) => Number(c));
        const numOfDigits = binaryArray.length;
        console.log("input to encode");
        console.log(input);
        const zeroPad = Array(5 - numOfDigits).fill(0);
        const binaryPaddedArray = [...zeroPad, ...binaryArray];
        // console.log(binaryPaddedArray);
        return binaryPaddedArray;
      })
      .flat(),
  ];
}

function indexOfMax(arr: number[]): number {
  console.log('arr.length');
  console.log(arr.length);
  console.log('arr');
  console.log(arr);
  let cur = Infinity;
  let max = -Infinity;
  let indexOfMax = -1;
  for (let i = 0; i < arr.length; i++) {
    cur = arr[i];
    if (cur > max) {
      max = cur;
      indexOfMax = i;
    }
  }
  return indexOfMax;
}

class SyllableCountService {
  static  countSyllables(word: string): number {
    // // const MODEL_DIR = "file://./neuralNet/model.json";
    // // const model = await tf.loadLayersModel(MODEL_DIR);
    // const model = await tf.loadLayersModel(
    //   "http://localhost:3000/neuralNet/model.json"
    // );
    // const encodedWord: number[] = wordEncode(word);
    // const inputTensor = tf.tensor2d(encodedWord, [1, encodedWord.length]);
    // const outputTensor = model.predict(inputTensor) as tf.Tensor;
    // const outputArray = (await outputTensor.array()) as number[][];
    // const syllableCount: number = indexOfMax(outputArray[0]);
    // console.log("prediction");
    // console.log(syllableCount);
    return word.length;
  }
}

export default SyllableCountService;
