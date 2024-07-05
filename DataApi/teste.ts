function removeDuplicates(nums: number[]): number {
  const numberArray: number[] = [];
  const numbersProcessed: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    if (numbersProcessed.includes(nums[i])) continue;
    numberArray.push(nums[i]);
    numbersProcessed.push(nums[i]);
  }

  for (let i = 0; i < numberArray.length; i++) {
    nums[i] = numberArray[i];
  }

  return numberArray.length;
}
