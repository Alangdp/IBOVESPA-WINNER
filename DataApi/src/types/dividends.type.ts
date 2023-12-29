interface RootDividend {
  earningsThisYear: string;
  earningsLastYear: string;
  rendiment: string;
  rendimentIsUp: boolean;
  provisionedThisYear: string;
  rendimentWithProvisioned: string;
  rendimentWithProvisionedIsUp: boolean;
  helpers: Helpers;
  assetEarningsModels: AssetEarningsModel[];
  assetEarningsYearlyModels: AssetEarningsYearlyModel[];
}

interface Helpers {
  earningsThisYearHelper: string;
  earningsLastYearHelper: string;
  earningsProvisionedHelper: string;
  earningsMainTextHelper: string;
}

interface AssetEarningsModel {
  y: number;
  m: number;
  d: number;
  ed: string;
  pd: string;
  et: string;
  etd: string;
  v: number;
  sv: string;
  sov: string;
  adj: boolean;
}

interface AssetEarningsYearlyModel {
  rank: number;
  value: number;
}

interface DividendReturn {
  lastDividendPayments: LastDividendPayment[];
  lastDividendPaymentsYear: LastDividendPaymentYear[];
  helper: Helpers;
  dividendPaymentThisYear: number;
  dividendPaymentLastYear: number;
}

interface LastDividendPayment {
  dataCom: string;
  dataEx: string;
  dividendType: string;
  dividendTypeName: string;
  value: number;
}

interface LastDividendPaymentYear {
  year: number;
  value: number;
}

export { RootDividend, DividendReturn, LastDividendPayment };
