export interface OldData {
  date: number;
  value: number;
}

export interface FinancialData {
  actual: number;
  avg: number;
  olds: OldData[];
}

export interface FinancialIndicators {
  dy: FinancialData;
  p_l: FinancialData;
  p_vp: FinancialData;
  p_ebita: FinancialData;
  p_ebit: FinancialData;
  p_sr: FinancialData;
  p_ativo: FinancialData;
  p_capitlgiro: FinancialData;
  p_ativocirculante: FinancialData;
  ev_ebitda: FinancialData;
  ev_ebit: FinancialData;
  lpa: FinancialData;
  vpa: FinancialData;
  peg_Ratio: FinancialData;
  dividaliquida_patrimonioliquido: FinancialData;
  dividaliquida_ebitda: FinancialData;
  dividaliquida_ebit: FinancialData;
  patrimonio_ativo: FinancialData;
  passivo_ativo: FinancialData;
  liquidezcorrente: FinancialData;
  margembruta: FinancialData;
  margemebitda: FinancialData;
  margemebit: FinancialData;
  margemliquida: FinancialData;
  roe: FinancialData;
  roa: FinancialData;
  roic: FinancialData;
  giro_ativos: FinancialData;
  receitas_cagr5: FinancialData;
}
