const TOLERANCE_TIME_IN_HOURS = 0.5

export function validateToleranceTime(time: number) {
  return new Date().getTime() - time < TOLERANCE_TIME_IN_HOURS * 60 * 60 * 1000
}