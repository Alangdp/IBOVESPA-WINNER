import { RootCashFlow } from '../types/cashFlow.type.js';
import { DividendReturn, RootDividend } from '../types/dividends.type.js';
import { Header, PassiveChartObject, PayoutReturn } from '../types/get.type.js';
import { MainPrices, PriceReturn } from '../types/prices.type.js';
import {
  PassiveChartReturn,
  ReportReturn,
  RootReport,
} from '../types/stock.types.js';

import axios from 'axios';
import Cheerio from 'cheerio';

import { AxiosUtils } from './Axios.Utils.js';
import Scrapper from './Fetcher.utils.js';
import Utilities from './Utilities.js';
import { IndicatorRoot, IndicatorsData } from '../types/indicators.type.js';

// FIXME REFAZER TUDO AQUI

export default class TickerFetcher {
  public ticker: string;
  private Utility?: Scrapper;
  private type?: string;
  private actualyear: number = new Date().getFullYear();

  constructor(ticker: string) {
    this.ticker = ticker;
  }

  async initialize(): Promise<void> {
    const htmlPage: string = await this.getHtmlPage();
    this.Utility = new Scrapper(htmlPage);
  }

  async getHtmlPage() {
    try {
      return (
        await axios.request(
          AxiosUtils.makeOptionsJson('GET', this.ticker, {}, 'acoes')
        )
      ).data;
    } catch (err: any) {
      const status = err.response.status;

      console.log(status);
      if (status === 403) throw new Error('BLOCKED REQUEST CODE 403');
      if (status === 404) throw new Error('INVALID TICKER CODE 404');
      throw new Error(err.message);
    }
  }

  async getBasicInfo() {
    if (!this.Utility) {
      throw new Error('Utility not initialized.');
    }

    const selectors = {
      imageURL:
        '#company-section > div:nth-child(1) > div > div.d-block.d-md-flex.mb-5.img-lazy-group > div.company-brand.w-100.w-md-30.p-3.rounded.mb-3.mb-md-0.bg-lazy',
      totalStocksInCirculation:
        'div[title="Total de papéis disponíveis para negociação"] div strong',
      freeFloat:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(11) > div > div > strong',
      netEquity:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(1) > div > div > strong',
      marketValue:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(7) > div > div > strong',
      price:
        '#main-2 > div:nth-child(4) > div > div.pb-3.pb-md-5 > div > div.info.special.w-100.w-md-33.w-lg-20 > div > div:nth-child(1) > strong',
      porcentLast12Days:
        '#main-2 > div:nth-child(4) > div > div.pb-3.pb-md-5 > div > div:nth-child(5) > div > div:nth-child(1) > strong',
      dividendPorcent:
        '#main-2 > div:nth-child(4) > div > div.pb-3.pb-md-5 > div > div:nth-child(4) > div > div:nth-child(1) > strong',
      name: 'title',
      LPA: '#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(11) > div > div > strong',
      VPA: '#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(9) > div > div > strong',
      liquidPatrimony:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(1) > div > div > strong',
      grossDebt:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(4) > div > div > strong',
      shareQuantity:
        '#company-section > div:nth-child(1) > div > div.top-info.info-3.sm.d-flex.justify-between.mb-3 > div:nth-child(9) > div > div > strong',
    };

    const totalStocksInCirculation: string = this.Utility.extractText(
      selectors.totalStocksInCirculation
    );
    const freeFloat: number = this.Utility.extractNumber(selectors.freeFloat);
    const netEquity: string = this.Utility.extractText(selectors.netEquity);
    const marketValue: string = this.Utility.extractText(selectors.marketValue);
    const price: number = this.Utility.extractNumber(selectors.price);
    const porcentLast12Days: Number = this.Utility.extractNumber(
      selectors.porcentLast12Days
    );
    const dividendPorcent: number = this.Utility.extractNumber(
      selectors.dividendPorcent
    );
    const dividendDecimal: Number = dividendPorcent / 100;
    const name: string = this.Utility.extractText(selectors.name);
    const LPA: number = this.Utility.extractNumber(selectors.LPA);
    const VPA: number = this.Utility.extractNumber(selectors.VPA);
    const liquidPatrimony: number = this.Utility.extractNumber(
      selectors.liquidPatrimony
    );

    const grossDebt = this.Utility.extractNumber(selectors.grossDebt);
    const shareQuantity = this.Utility.extractNumber(selectors.shareQuantity);
    let image = this.Utility.extractImage(selectors.imageURL);

    const data = {
      ticker: this.ticker,
      image,
      name,
      price,
      dividendPorcent,
      dividendDecimal,
      porcentLast12Days,
      totalStocksInCirculation,
      freeFloat,
      netEquity,
      marketValue,
      LPA,
      VPA,
      liquidPatrimony,
      grossDebt,
      shareQuantity,
    };

    return data;
  }

  static async getAllTickers(): Promise<string[]> {
    try {
      const options = {
        method: 'GET',
        url: `https://www.fundamentus.com.br/resultado.php`,
        headers: {
          'user-agent': 'CPI/V1',
          'content-length': 0,
        },
      };

      const response = await axios.request(options);

      const $ = Cheerio.load(response.data);
      const tickers: string[] = $('td span a')
        .map((index, element) => $(element).text())
        .get();

      return tickers;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        throw new Error('Invalid Ticker');
      }

      throw new Error('Error fetching tickers');
    }
  }

  async getStockrebuy(): Promise<any[]> {
    const selectors = {
      table: '#movements-section > div > div.buyback.card > div.card-body',
      types:
        '.w-100.w-lg-50.mt-2.mb-3.mb-sm-2.d-xs-flex.justify-center.align-items-center',
      status:
        '.w-100.w-lg-50.d-flex.flex-wrap.justify-around.align-items-center',
    };

    const rebuyInfo = [];

    const tempObject = {
      status: null,
      approvedDate: null,
      startDate: null,
      endDate: null,
      stocksQuantity: null,
      stockType: null,
    };

    const tableRows = this.Utility?.extractElement(selectors.table);
    if (!tableRows) return [];

    for (const tableRow of tableRows) {
      const rowContent: any = Cheerio(tableRow).html();
      const rows = Cheerio.load(rowContent, {});

      const status = this.Utility?.extractElement(selectors.status);
      const types = this.Utility?.extractElement(selectors.types);
      if (status === undefined || types === undefined) return [];

      const statusTextArray = Cheerio(status)
        .map((index: number, element: cheerio.Element) => {
          return rows(element).text();
        })
        .get();

      const infosText = Cheerio(types)
        .each((index: number, element: cheerio.Element) => {
          return rows(element).text();
        })
        .get();

      for (let i = 0; i < statusTextArray.length; i++) {
        const linesStatus = statusTextArray[i].trim().split('\n');
        const linesInfo = infosText[i].trim().split('\n');

        const tempObject = {
          status: linesStatus[0],
          approvedDate: linesStatus[5].replace('APROVADO EM\n', ''),
          startDate: linesStatus[9].replace('DATA DE INÍCIO\n', ''),
          endDate: linesStatus[13].replace('DATA DE FIM\n', ''),
          stocksQuantity: linesInfo[5],
          stockType: linesInfo[1],
        };

        rebuyInfo.push(tempObject);
      }
    }

    return rebuyInfo;
  }

  async getDividendInfo() {
    const ticker = this.ticker;

    const dividendReturn: DividendReturn = {
      lastDividendPayments: [],
      lastDividendPaymentsYear: [],
      helper: {
        earningsThisYearHelper: '',
        earningsLastYearHelper: '',
        earningsProvisionedHelper: '',
        earningsMainTextHelper: '',
      },
      dividendPaymentThisYear: 0,
      dividendPaymentLastYear: 0,
    };

    try {
      const options = AxiosUtils.makeOptionsJson(
        'GET',
        `companytickerprovents?ticker=${ticker}&chartProventsType=2`,
        null
      );

      const formatNumber = Utilities.formateNumber;

      const response = await axios.request(options);
      const data: RootDividend = response.data;

      dividendReturn.helper.earningsLastYearHelper =
        data.helpers.earningsLastYearHelper;
      dividendReturn.helper.earningsMainTextHelper =
        data.helpers.earningsMainTextHelper;
      dividendReturn.helper.earningsProvisionedHelper =
        data.helpers.earningsProvisionedHelper;
      dividendReturn.helper.earningsThisYearHelper =
        data.helpers.earningsThisYearHelper;

      dividendReturn.dividendPaymentLastYear = formatNumber(
        data.earningsLastYear
      );
      dividendReturn.dividendPaymentThisYear = formatNumber(
        data.earningsThisYear
      );

      for (const dividendYear of data.assetEarningsYearlyModels) {
        dividendReturn.lastDividendPaymentsYear.push({
          year: dividendYear.rank,
          value: dividendYear.value,
        });
      }

      for (const dividendPayment of data.assetEarningsModels) {
        dividendReturn.lastDividendPayments.push({
          ticker,
          dataCom: dividendPayment.ed,
          dataEx: dividendPayment.pd,
          dividendType: dividendPayment.et,
          dividendTypeName: dividendPayment.etd,
          value: dividendPayment.v,
        });
      }

      return dividendReturn;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getIndicatorsInfo() {
    const ticker = this.ticker;

    const options = AxiosUtils.makeOptionsJson(
      'POST',
      'indicatorhistoricallist',
      `codes%5B%5D=${ticker}&time=7&byQuarter=false&futureData=false`,
      'acao',
      'application/x-www-form-urlencoded'
    ); 

    const indicatorsData: IndicatorsData = {}
    const responseData: IndicatorRoot = (await axios.request(options)).data;
    const tickerReference = Object.keys(responseData.data)[0]
    for(const item of responseData.data[tickerReference]) {
      indicatorsData[item.key] = {
        actual: item.actual,
        avg: item.avg,
        olds: item.ranks.map( data => {
          return {
            date: data.rank,
            value: data.value
          }
        }),
      }
    }

    return indicatorsData;
  }

  async getPrice() {
    const ticker = this.ticker;

    try {
      const options = AxiosUtils.makeOptionsJson('POST', 'tickerprice', {
        ticker,
        type: 4,
        'currences[]': '1',
      });

      const response = await axios.request(options);
      const data: MainPrices = response.data[0];

      const priceReturn: PriceReturn = {
        price: data.prices[0].price,
        priceVariation: data.prices,
        currency: data.currency,
      };

      return priceReturn;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getPayout() {
    const ticker = this.ticker;

    try {
      const payout = await axios.request(
        AxiosUtils.makeOptionsJson('POST', 'payoutresult', {
          code: ticker,
          type: 1,
        })
      );
      if (!payout.data) return null;

      const data: PayoutReturn = {
        actual: payout.data.actual,
        average: payout.data.average | payout.data.actual,
        minValue: payout.data.minValue,
        maxValue: payout.data.maxValue,
        currency: payout.data.currency,
        chart: payout.data.chart,
      };

      return data;
    } catch (error) {
      return null;
    }
  }

  async getPassiveChart(): Promise<PassiveChartReturn[] | null> {
    const ticker = this.ticker;

    try {
      const response = await axios.request(
        AxiosUtils.makeOptionsJson('POST', 'getbsactivepassivechart', {
          code: ticker,
          type: 1,
        })
      );

      const data: PassiveChartObject[] = response.data;
      const dataFormated: PassiveChartReturn[] = [];

      for (const passiveObject of data) {
        dataFormated.push({
          year: passiveObject.year,
          totalAssets: passiveObject.ativoTotal,
          totalLiabilities: passiveObject.passivoTotal,
          currentAssets: passiveObject.ativoCirculante,
          nonCurrentAssets: passiveObject.ativoNaoCirculante,
          currentLiabilities: passiveObject.passivoCirculante,
          nonCurrentLiabilities: passiveObject.passivoNaoCirculante,
          shareholdersEquity: passiveObject.patrimonioLiquido,
        });
      }

      return dataFormated;
    } catch (error) {
      return null;
    }
  }

  async getReports(): Promise<ReportReturn[] | null> {
    const ticker = this.ticker;

    try {
      const returnData: ReportReturn[] = [];

      const response = await axios.request(
        AxiosUtils.makeOptionsJson('POST', 'getassetreports', {
          code: ticker,
          year: this.actualyear,
        })
      );

      const data: RootReport = response.data;

      for (const report of data.data) {
        returnData.push({
          year: report.year.toString(),
          rank: 0,
          referenceDate: report.dataReferencia_F,
          type: report.tipo,
          especie: report.especie,
          assunt: report.assunto,
          linkPdf: report.linkPdf,
        });
      }

      return returnData;
    } catch (error) {
      return null;
    }
  }

  async getCashFlow(): Promise<Header[] | null> {
    const ticker = this.ticker;
    try {
      const options = AxiosUtils.makeOptionsJson(
        'GET',
        `getfluxocaixa?code=${ticker}&range.min=${2000}&range.max=${
          this.actualyear - 1
        }`,
        null
      );

      const response = await axios.request(options);
      const data: RootCashFlow = response.data;
      const grid = data.data.grid;

      const header: Header[] = [];
      const yearsOrdened: string[] = grid[0].columns
        .map((item: any) => {
          if (item.name === 'DATA') {
            return item.value;
          }
        })
        .filter((item: any) => item !== undefined);

      let count = 0;
      yearsOrdened.forEach((year: string) => {
        header.push({
          name: year,
          index: count,
          value: {},
        });
        count++;
      });

      for (let i = 0; i < grid.length; i++) {
        if (i === 0) continue;

        const gridLineModel = grid[i].gridLineModel;

        if (gridLineModel !== undefined) {
          const key = gridLineModel?.key;

          header.forEach((item: Header, index: number) => {
            if (
              key === undefined ||
              gridLineModel === undefined ||
              gridLineModel.values === undefined
            ) {
              return;
            }

            const values = gridLineModel.values as (number | undefined)[];

            if (values[index] === undefined) {
              return;
            }

            item.value[key] = values[index] as number;
          });
        }
      }

      return header;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

async function teste() {
  const tickerFetcher = new TickerFetcher('BBAS3');
  await tickerFetcher.initialize(); 
  console.log(await tickerFetcher.getIndicatorsInfo())
}

teste()