import { PontuationProps } from '../types/Pontuation.type';
import { PontuationRule } from '../types/Pontuation.type';
class Pontuation implements PontuationProps {
  // Identifier
  public id: string;
  public subId?: string;

  // Used on Constructor
  public defaultIfTrue: number;
  public defaultIfFalse: number;

  // Points
  public totalPoints: number = 0;

  // Rules
  public totalEvaluate: PontuationRule[] = [];

  constructor(props: PontuationProps) {
    this.defaultIfFalse = props.defaultIfFalse;
    this.defaultIfTrue = props.defaultIfTrue;
    this.id = props.id;
    this.subId = props.subId;
  }

  addRule(rule: PontuationRule) {
    this.totalEvaluate.push(rule);
  }

  calculate() {
    for (const rule of this.totalEvaluate) {
      if (rule.rule) {
        this.totalPoints +=
          rule.ifTrue === this.defaultIfTrue ? this.defaultIfTrue : rule.ifTrue;
        rule.scored = true;
      }
      if (!rule.rule) {
        this.totalPoints -=
          rule.ifFalse === this.defaultIfFalse
            ? this.defaultIfFalse
            : rule.ifFalse;
        rule.scored = false;
      }
    }
  }
}

export { Pontuation }