

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

  static abbreviateNumber(value: number) {
    let newValue: string = ''; 
    if (value >= 1000) {
        var suffixes = ["", "K", "M", "B","T"];
        var suffixNum = Math.floor( (""+value).length/3 );
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision);
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (parseFloat(shortValue) % 1 != 0)  shortValue = parseFloat(shortValue).toFixed(1);
        newValue = shortValue+suffixes[suffixNum];
    }

    if(newValue.includes('undefined')) return '0';
    return newValue;
}
}

