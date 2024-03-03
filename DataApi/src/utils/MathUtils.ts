

export default class MathUtils {
  static makeMedian(array: number[]) {
    const sortedArray = array.sort();
    const middleIndex = sortedArray.length / 2;

    if (sortedArray.length % 2 === 0) {
      return (sortedArray[middleIndex] + sortedArray[middleIndex - 1]) / 2;
    }

    return sortedArray[Math.floor(middleIndex)];
  }

  static makeAverage(array: number[]) {
    return array.reduce((acc, curr) => acc + curr, 0) / array.length;
  }
}