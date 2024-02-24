import { Schema, InferSchemaType, Mongoose }  from 'mongoose'
import { NetLiquid, PriceHistory, StockProps } from '../../../types/stock.types'
import { LastDividendPayment } from '../../../types/dividends.type';
import { IndicatorsData, oldIndicator } from '../../../types/indicators.type';
import { PassiveChartReturn } from '../../../types/PassiveChart.type';
import { configDotenv } from 'dotenv';
import { InstanceStock } from '../../../useCases/instanceStock.js';

configDotenv()

const mongoose = new Mongoose()

const priceHistorySchema = new Schema<PriceHistory>({
  date: { type: String, required: true },
  price: { type: Number, required: true }
});

const lastDividendsValueSchema = new Schema<LastDividendPayment>({
  ticker: { type: String, required: true },
  dataCom: { type: String, required: true },  
  dataEx: { type: String, required: true },
  dividendType: { type: String, required: true },
  dividendTypeName: { type: String, required: true },
  value: { type: Number, required: true }
})

const indicatorsDataSchema = new Schema<IndicatorsData>({
  actual: { type: Number},
  avg: { type: Number},
  // ? OLD INDICATORS
  olds: [{
    date: { type: Number, required: true},
    value: { type: Number }
  }]
})

const netLiquidSchema = new Schema<NetLiquid>({
  year: { type: String, required: true },
  value: { type: Number, required: true }
})

const passiveChartSchema = new Schema<PassiveChartReturn>({
  year: { type: Number, required: true },
  totalAssets: { type: Number, required: true },
  totalLiabilities: { type: Number, required: true },
  currentAssets: { type: Number, required: true },
  nonCurrentAssets: { type: Number, required: true },
  currentLiabilities: { type: Number, required: true },
  nonCurrentLiabilities: { type: Number, required: true },
  shareholdersEquity: { type: Number, required: true }
})

const stockSchema = new Schema<StockProps>({
  ticker: {
    unique: true,
    required: true,
    type: String
  },

  name: {
    required: true,
    type: String
  },

  activeValue: {
    required: true,
    type: Number
  },

  shareQuantity: {
    required: true,
    type: Number
  },

  actualPrice: {
    required: true,
    type: Number
  },

  priceHistory: {
    required: true,
    type: [priceHistorySchema]
  },
  
  dividendYield: {
    required: true,
    type: Number
  },

  grossDebt: {
    required: true,
    type: Number
  },

  patrimony: {
    required: true,
    type: Number
  },

  payout: {
    required: true,
    type: Number
  },

  actualDividendYield: {
    required: true,
    type: Number
  },

  lastDividendsYieldYear: {
    required: true,
    type: [Number]
  },

  lastDividendsValueYear: {
    required: true,
    type: [Number]
  },

  lastDividendsValue: {
    required: true,
    type: [lastDividendsValueSchema]
  },

  indicators: {
    required: true,
    type: indicatorsDataSchema
  },

  netLiquid: {
    required: true,
    type: [netLiquidSchema]
  },

  passiveChart: {
    required: true,
    type: [passiveChartSchema]
  }
})

async function makeConnection() {
  await mongoose.connect("mongodb+srv://ditocanino:Akvj7Kb0vJq7kpnX@cluster0.5sur0cu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

  const mainModel = mongoose.model('Stock', stockSchema)
  const stock = await InstanceStock.execute('BBAS3');
  console.log(mongoose.connection)

  mainModel.create(stock)
  return stock
}

makeConnection()