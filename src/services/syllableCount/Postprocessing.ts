class Postprocessing {
  static indexOfMax(arr: number[]): number {
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
}

export default Postprocessing;
