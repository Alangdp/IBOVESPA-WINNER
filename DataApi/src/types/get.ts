interface DataReport {
  year: string;
}
interface Report {
  yearReport: string;
  date: string;
  type: string;
  subject: string;
  linkPDF: string;
}
interface ReportObject {
  reportType: string;
  species: string;
  year: string;
  referenceDate: string;
  subject: string;
  linkPdf: string;
}
interface Dividend {
  type: string;
  dataEx: string;
  dataCom: string;
  value: number;
}

interface DividendInfoReturn {
  dividends: Dividend[];
  bestPrice: {
    bazin: string;
    granham: number;
  };
}

interface priceInfo {
  date: Date;
  price: number;
}

export {
  DataReport,
  Report,
  ReportObject,
  Dividend,
  DividendInfoReturn,
  priceInfo,
};
