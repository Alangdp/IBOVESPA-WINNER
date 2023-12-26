import { Report, ReportObject, priceInfo } from '../types/get.js';

// INTERFACES

interface AxiosOptions {
  method: 'POST' | 'GET';
  url: string;
  data?: object | string;
  params?: object;
  headers: {
    'Content-Type': string;
    cookie: string;
    'user-agent': string;
  };
}

interface History {
  [date: string]: {
    date: string;
    price: number;
  };
}

interface DividendYield {
  [date: string]: {
    date: string;
    value: number;
  };
}

interface Indicators {
  dy: {
    actual: number;
    average: number;
    olds: DividendYield[];
  };
}

interface priceReturn {
  price: number;
  priceVariation: History[];
  currency: string;
}

interface Dividend {
  type: string;
  dataEx: string;
  dataCom: string;
  value: number;
}

interface Dividends {
  lastDividends: Dividend[];
  dividiendPorcentInDecimal: number;
  dividendPorcent: number;
}

interface Series {
  percentual: number[];
  proventos: number[];
  lucroLiquido: number[];
}

interface Chart {
  categoryUnique: boolean;
  category: string[];
  series: Series;
}

interface PayoutReturn {
  actual: number;
  average: number;
  minValue: number;
  maxValue: number;
  currency?: String;
  chart: Chart;
}

/*eslint-disable  */
import axios from 'axios';
import Utilities from './Utilities.js';
import Cheerio from 'cheerio';

const Root = Cheerio.root;

interface PassiveChartObject {
  year: string;
  ativoTotal: string;
  passivoTotal: string;
  ativoCirculante: string;
  ativoNaoCirculante: string;
  passivoCirculante: string;
  passivoNaoCirculante: string;
  patrimonioLiquido: string;
}

export default class TickerFetcher {
  private url: String = 'https://statusinvest.com.br';
  public ticker: string;
  private Utility?: Utilities;
  private type?: string;

  constructor(ticker: string) {
    this.ticker = ticker;
  }

  async initialize(): Promise<void> {
    const htmlPage: string = await this.getHtmlPage();
    this.Utility = new Utilities(htmlPage);
  }

  getTicker() {
    return this.ticker;
  }

  makeOptionsJson(
    method: 'POST' | 'GET',
    url: string,
    params: any,
    final: string = 'acao',
    contentType:
      | 'application/x-www-form-urlencoded'
      | 'application/json' = 'application/json'
  ) {
    const options: AxiosOptions = {
      method: method,
      url: `https://statusinvest.com.br/${final}/${url}`,
      headers: {
        'Content-Type': contentType,
        cookie: '_adasys=b848d786-bc93-43d6-96a6-01bb17cbc296',
        'user-agent': 'CPI/V1',
      },
    };

    if (contentType === 'application/json') {
      options.params = params;
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      options.data = params;
    }

    return options;
  }

  async getHtmlPage() {
    try {
      return (
        await axios.request(
          this.makeOptionsJson('GET', this.ticker, {}, 'acoes')
        )
      ).data;
    } catch (err: any) {
      console.log(err);
      throw new Error('Error: ' + err.message);
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
    const dividiendPorcentInDecimal: Number = dividendPorcent / 100;
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
      // dividendInfo: getDividendInfoFromHTML($),
      ticker: this.ticker,
      image,
      name,
      price,
      dividendPorcent,
      dividiendPorcentInDecimal,
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

  async getDividendInfo(): Promise<Dividends> {
    const selectors = {
      tableRows:
        '#earning-section > div.list > div > div:nth-child(2) > table > tbody',
      price:
        '#main-2 > div:nth-child(4) > div > div.pb-3.pb-md-5 > div > div:nth-child(2) > div > div:nth-child(1) > strong',
      LPA: '#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(11) > div > div > strong',
      VPA: '#indicators-section > div.indicator-today-container > div > div:nth-child(1) > div > div:nth-child(9) > div > div > strong',
      dividendPorcent:
        '#main-2 > div:nth-child(4) > div > div.pb-3.pb-md-5 > div > div:nth-child(4) > div > div:nth-child(1) > strong',
    };

    const lastDividends: Dividend[] = [];

    const tableRows = Cheerio(
      this.Utility?.extractElement(selectors.tableRows)
    );
    if (!tableRows)
      return {
        lastDividends: [],
        dividiendPorcentInDecimal: 0,
        dividendPorcent: 0,
      };

    tableRows.each((index: number, row: cheerio.Element) => {
      const values: Array<cheerio.Element> = Cheerio(row)
        .find('td')
        .map((index: number, element: cheerio.Element) => Cheerio(element))
        .toArray();

      Utilities.breakArrayIntoGroups(values, 4).map((dividendInfo) => {
        const dividend: Dividend = {
          type: dividendInfo[0].text(),
          dataEx: dividendInfo[1].text(),
          dataCom: dividendInfo[2].text(),
          value: Number(dividendInfo[3].text().replace(',', '.')),
        };

        lastDividends.push(dividend);
      });
    });

    const price: number = this.Utility?.extractNumber(selectors.price) || 0;
    const LPA: number = this.Utility?.extractNumber(selectors.LPA) || 0;
    const VPA: number = this.Utility?.extractNumber(selectors.VPA) || 0;
    const dividendPorcent: number =
      this.Utility?.extractNumber(selectors.dividendPorcent) || 0;
    const dividiendPorcentInDecimal = dividendPorcent / 100;

    return {
      lastDividends: lastDividends,
      dividiendPorcentInDecimal,
      dividendPorcent,
    };
  }

  async getIndicatorsInfo() {
    const ticker = this.ticker;
    const url = 'https://statusinvest.com.br/acao/indicatorhistoricallist';
    const indicators: Indicators = {
      dy: {
        actual: 0,
        average: 0,
        olds: [],
      },
    };

    const options = this.makeOptionsJson(
      'POST',
      'indicatorhistoricallist',
      'codes%5B%5D=bbas3&time=7&byQuarter=false&futureData=false',
      'acao',
      'application/x-www-form-urlencoded'
    );

    const response = await axios.request(options);
    const data = response.data.data[ticker.toLowerCase()];

    for (const info of data) {
      if (info.key === 'dy') {
        indicators.dy.actual = info.actual;
        indicators.dy.average = info.avg;
        info.ranks.forEach((item: any) => {
          indicators.dy.olds.push({
            date: item.rank,
            value: item.value,
          });
        });
      }
    }

    return indicators;
  }

  async getPrice() {
    const ticker = this.ticker;

    try {
      const options = this.makeOptionsJson('POST', 'tickerprice', {
        ticker,
        type: 4,
        'currences[]': '1',
      });

      const response = await axios.request(options);
      if (response.data[0].prices.length === 0) return null;

      const data: priceReturn = {
        price: response.data[0].prices.pop(),
        priceVariation: response.data[0].prices,
        currency: response.data[0].currency,
      };

      return data;
    } catch (error) {
      return null;
    }
  }

  async getPayout() {
    const ticker = this.ticker;

    try {
      const payout = await axios.request(
        this.makeOptionsJson('POST', 'payoutresult', {
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

  async getPassiveChart() {
    const ticker = this.ticker;

    try {
      const response = await axios.request(
        this.makeOptionsJson('POST', 'getbsactivepassivechart', {
          code: ticker,
          type: 1,
        })
      );
      if (response.data.length === 0) return null;

      const data = response.data.map((item: PassiveChartObject) => {
        return {
          year: item.year || null,
          totalAssets: item.ativoTotal || null,
          totalLiabilities: item.passivoTotal || null,
          currentAssets: item.ativoCirculante || null,
          nonCurrentAssets: item.ativoNaoCirculante || null,
          currentLiabilities: item.passivoCirculante || null,
          nonCurrentLiabilities: item.passivoNaoCirculante || null,
          shareholdersEquity: item.patrimonioLiquido || null,
        };
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  async getReports() {
    const ticker = this.ticker;

    const lastFiveYears = Utilities.getLastYears(5);
    const data: any = {};

    try {
      for (const year of lastFiveYears) {
        const tempData: Report[] = [];

        const response = await axios.request(
          this.makeOptionsJson('POST', 'getassetreports', {
            code: ticker,
            year: year,
          })
        );

        const responseInfo = response.data;
        if (!responseInfo.data) data[year] = [];

        responseInfo.data.forEach((report: ReportObject) => {
          if (report.reportType === undefined) report.reportType = ' ';
          const type = (report.reportType = report.reportType.trim()
            ? report.reportType
            : report.species);

          tempData.push({
            yearReport: report.year,
            date: report.referenceDate,
            type: report.reportType,
            subject: report.subject,
            linkPDF: report.linkPdf,
          });
        });

        data[year] = tempData;
      }

      return data;
    } catch (error) {
      return null;
    }
  }
}

// const teste:TickerFetcher = new TickerFetcher("RANI3")
// await teste.initialize()
// console.log(await teste.getBasicInfo())
// console.log(await teste.getReports())

/* eslint-disable */
// export async function getActives(ticker = null) {
//   try {
//     ticker = ticker ? ticker.toUpperCase() : null;
//     if (!ticker) return null;

//     const lastFiveYears = getLastFiveYears();

//     const options = {
//       method: 'POST',
//       url: 'https://statusinvest.com.br/acao/getativos',
//       params: {
//         code: ticker,
//         type: 1,
//         range: { max: lastFiveYears[0], min: lastFiveYears.pop() },
//       },
//       headers: {
//         cookie: '_adasys=b848d786-bc93-43d6-96a6-01bb17cbc296',
//         'user-agent': 'CPI/V1',
//         'content-length': 0,
//       },
//     };

//     const actives = await axios.request(options);
//     if (actives.data.length === 0) return null;

//     const info = {};
//     const titulos = [
//       'Ativo Total - (R$)',
//       'Ativo Circulante - (R$)',
//       'Aplicações Financeiras - (R$)',
//       'Caixa e Equivalentes de Caixa - (R$)',
//       'Contas a Receber - (R$)',
//       'Estoque - (R$)',
//       'Ativo Não Circulante - (R$)',
//       'Ativo Realizável a Longo Prazo - (R$)',
//       'Investimentos - (R$)',
//       'Imobilizado - (R$)',
//       'Intangível - (R$)',
//       'Passivo Total - (R$)',
//       'Passivo Circulante - (R$)',
//       'Passivo Não Circulante - (R$)',
//       'Patrimônio Líquido Consolidado - (R$)',
//       'Capital Social Realizado - (R$)',
//       'Reserva Capital - (R$)',
//       'Reserva Lucros - (R$)',
//       'Participação dos Não Controladores',
//     ];

//     let lastTitle = null;
//     let lastDate = null;

//     let cabeçalhoList = [];

//     const data = actives.data.data;

//     for (let i = 0; i < data.grid[0].columns.length; i++) {
//       cabeçalhoList.push(data.grid[0].columns[i].value);

//       const dataFormated = {
//         date: data.grid[0].columns[i].value,
//         title: data.grid[1].columns[i].name || data.grid[1].columns[i].title,
//         value: data.grid[1].columns[i].value,
//       };

//       if (titulos.includes(dataFormated.date)) {
//         lastTitle = dataFormated.date;
//         info[lastTitle] = {};
//       }

//       if (/^[1-4]T\d{4}$/.test(dataFormated.date)) {
//         lastDate = dataFormated.date;
//         info[lastTitle].lastDate = {
//           AV: null,
//           AH: null,
//           value: null,
//         };
//         info[lastTitle].lastDate.value = dataFormated.value;
//       }

//       if (dataFormated.date === 'AH' || dataFormated.date === 'AV') {
//         info[lastDate][dataFormated.date] = dataFormated.value;
//       }
//     }

//     saveJSONToFile(info, 'TERSTE.json');
//     return info;
//   } catch (error) {
//     return null;
//   }
// }

// Funçao getActives
// Parado desde 17/07/2023
// Ultima coisa que foi feita
// Objetivo e separar o retorno da tabela em trimestres com dados abaixo
// Nome do titulo vem no indice 0 na variavel title geralmente

/*
    const titulos = [
      'Ativo Total - (R$)',
      'Ativo Circulante - (R$)',
      'Aplicações Financeiras - (R$)',
      'Caixa e Equivalentes de Caixa - (R$)',
      'Contas a Receber - (R$)',
      'Estoque - (R$)',
      'Ativo Não Circulante - (R$)',
      'Ativo Realizável a Longo Prazo - (R$)',
      'Investimentos - (R$)',
      'Imobilizado - (R$)',
      'Intangível - (R$)',
      'Passivo Total - (R$)',
      'Passivo Circulante - (R$)',
      'Passivo Não Circulante - (R$)',
      'Patrimônio Líquido Consolidado - (R$)',
      'Capital Social Realizado - (R$)',
      'Reserva Capital - (R$)',
      'Reserva Lucros - (R$)',
      'Participação dos Não Controladores',
    ];
*/

async function teste() {
  const tickerFetcher = new TickerFetcher('BBAS3');
  await tickerFetcher.initialize();
  const stockData = await tickerFetcher.getPrice();
  // console.log(stockData);
}

teste();
