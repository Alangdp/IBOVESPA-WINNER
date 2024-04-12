const HOUR_IN_MILISECONDS = 3600000 
const TOLERANCE_TIME_IN_HOURS = 0.5

export function validateToleranceTime(time: number) {
  const milliseconds = new Date().getTime() - (time ?? 0);
  return (((milliseconds / 1000) /3600) < TOLERANCE_TIME_IN_HOURS);
}