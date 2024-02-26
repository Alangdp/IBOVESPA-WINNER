import { Schema } from 'mongoose';
import { NetLiquid, PriceHistory, StockProps } from '../../../types/stock.types'
import { LastDividendPayment } from '../../../types/dividends.type';
import { IndicatorsData } from '../../../types/indicators.type';
import { PassiveChartReturn } from '../../../types/PassiveChart.type';
import { MongooConnection } from '../../index.js'

const priceHistorySchema = new Schema<PriceHistory>({
  date: { type: String, required: false },
  price: { type: Number, default: 0, required: false }
});

const lastDividendsValueSchema = new Schema<LastDividendPayment>({
  ticker: { type: String, required: false },
  dataCom: { type: String, required: false },  
  dataEx: { type: String, required: false },
  dividendType: { type: String, required: false },
  dividendTypeName: { type: String, required: false },
  value: { type: Number, default: 0, required: false }
})

const indicatorsDataSchema = new Schema<IndicatorsData>({
  actual: { type: Number},
  avg: { type: Number},
  // ? OLD INDICATORS
  olds: [{
    date: { type: Number, default: 0, required: false},
    value: { type: Number, default: 0 }
  }]
})

const netLiquidSchema = new Schema<NetLiquid>({
  year: { type: String, required: false },
  value: { type: Number, default: 0, required: false }
})

const passiveChartSchema = new Schema<PassiveChartReturn>({
  year: { type: Number, default: 0, required: false },
  totalAssets: { type: Number, default: 0, required: false },
  totalLiabilities: { type: Number, default: 0, required: false },
  currentAssets: { type: Number, default: 0, required: false },
  nonCurrentAssets: { type: Number, default: 0, required: false },
  currentLiabilities: { type: Number, default: 0, required: false },
  nonCurrentLiabilities: { type: Number, default: 0, required: false },
  shareholdersEquity: { type: Number, default: 0, required: false }
})

const stockSchema = new Schema<StockProps>({
  ticker: {
    unique: true,
    required: false,
    type: String
  },

  name: {
    required: false,
    type: String
  },

  activeValue: {
    required: false,
    type: Number
  },

  shareQuantity: {
    required: false,
    type: Number
  },

  actualPrice: {
    required: false,
    type: Number
  },

  priceHistory: {
    required: false,
    type: [priceHistorySchema]
  },
  
  dividendYield: {
    required: false,
    type: Number
  },

  grossDebt: {
    required: false,
    type: Number
  },

  patrimony: {
    required: false,
    type: Number
  },

  payout: {
    required: false,
    type: Number
  },

  actualDividendYield: {
    required: false,
    type: Number
  },

  lastDividendsYieldYear: {
    required: false,
    type: [Number]
  },

  lastDividendsValueYear: {
    required: false,
    type: [Number]
  },

  lastDividendsValue: {
    required: false,
    type: [lastDividendsValueSchema]
  },

  indicators: {
    required: false,
    type: indicatorsDataSchema
  },

  netLiquid: {
    required: false,
    type: [netLiquidSchema]
  },

  passiveChart: {
    required: false,
    type: [passiveChartSchema]
  }
}, { timestamps: true })


async function makeModel() {
  const mongoose = await MongooConnection.makeConnection()
  return mongoose.model<StockProps>('Stock', stockSchema)
}

const stockModel = makeModel()

export default stockModel
