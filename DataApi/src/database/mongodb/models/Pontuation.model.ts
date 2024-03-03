import { Schema } from 'mongoose';
import { PontuationProps, PontuationRule } from '../../../types/Pontuation.type';
import { MongooConnection } from '../../index.js';

interface PontuationDocument extends PontuationProps {
  defaultIfTrue: number;
  defaultIfFalse: number;
  id: string;
  subId: string
  totalEvaluate: PontuationRule[];
  totalPoints: number
}

const pontuationSchema = new Schema<PontuationDocument>({
  defaultIfTrue: { type: Number, required: true },
  defaultIfFalse: { type: Number, required: true },
  id: { type: String, required: true, unique: true },
  totalPoints: {type: Number, required: true},
  totalEvaluate: [
    {
      ruleName: { type: String, required: true },
      rule: { type: Boolean, required: true },
      ifTrue: { type: Number, required: true },
      ifFalse: { type: Number, required: true },
      scored: { type: Boolean, default: false }
    }
  ]
});

async function makeConnection() {
  const mongoose = await MongooConnection.makeConnection() 
  return mongoose.model<PontuationDocument>('pontuations', pontuationSchema)

}

const pontuationModel = makeConnection()

export { pontuationModel };
