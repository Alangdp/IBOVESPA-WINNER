export interface IndicatorRoot {
  success: boolean
  data: Data
}

export interface Data {
  [ticker: string]: IndicatorResponse[]
}

export interface IndicatorResponse {
  key: string
  actual: number
  avg: number
  avgDifference: number
  minValue: number
  minValueRank: number
  maxValue: number
  maxValueRank: number
  actual_F: string
  avg_F: string
  avgDifference_F?: string
  minValue_F: string
  minValueRank_F: string
  maxValue_F: string
  maxValueRank_F: string
  ranks: Rank[]
}

export interface Rank {
  timeType: number
  rank: number
  rank_F: string
  value?: number
  value_F: string
  rankN: number
}

export interface IndicatorsData {
  [key: string] : {
    actual: number,
    avg: number
    olds: oldIndicator[]
  }
}

export interface oldIndicator {
  date: number;
  value?: number;
}
