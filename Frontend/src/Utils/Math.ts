const HOUR_IN_MILISECONDS = 3600000 
const TOLERANCE_TIME_IN_HOURS = 0.5

export function validateToleranceTime(time: number) {
  const milliseconds = new Date().getTime() - (time ?? 0);
  console.log((milliseconds / HOUR_IN_MILISECONDS), TOLERANCE_TIME_IN_HOURS)
  return ((milliseconds / HOUR_IN_MILISECONDS) < TOLERANCE_TIME_IN_HOURS);
}