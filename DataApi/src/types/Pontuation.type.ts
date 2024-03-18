export interface PontuationRule {
  ruleName: string;
  rule: boolean;
  ifTrue?: number;
  ifFalse?: number;
  scored?: boolean;
}

export interface PontuationProps {
  defaultIfTrue: number;
  defaultIfFalse: number;
  id: string;
  subId?: string;
  totalPoints: number;
}
