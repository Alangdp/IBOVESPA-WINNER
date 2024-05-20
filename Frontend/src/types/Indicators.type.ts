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
  _id: string;
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

const referenceList: { [key in keyof FinancialIndicators]?: { fullName: string, info: string } } = {
  dy: {
    fullName: "Dividendo por Ação",
    info: "O Dividendo por Ação (DY) é uma métrica financeira que indica a quantidade de dinheiro que uma empresa paga aos acionistas em relação ao preço de suas ações. Ele é calculado dividindo o valor total dos dividendos pagos pela empresa pelo número total de ações em circulação."
  },
  p_l: {
    fullName: "Preço/Lucro",
    info: "O Preço/Lucro (P/L) é uma medida financeira que compara o preço atual de uma ação com seus lucros por ação. Ele é calculado dividindo o preço da ação pelo lucro por ação. O P/L é frequentemente usado para avaliar a atratividade de uma ação em termos de seu valor em relação aos lucros que ela gera."
  },
  p_vp: {
    fullName: "Preço/Valor Patrimonial",
    info: "O Preço/Valor Patrimonial (P/VP) é uma medida financeira que compara o preço atual de uma ação com seu valor patrimonial por ação. Ele é calculado dividindo o preço da ação pelo valor patrimonial por ação. O P/VP é usado para avaliar se uma ação está sendo negociada a um preço abaixo ou acima de seu valor patrimonial."
  },
  p_ebita: {
    fullName: "Preço/EBITDA",
    info: "O Preço/EBITDA (P/EBITDA) é uma medida financeira que compara o preço atual de uma ação com seu lucro antes de juros, impostos, depreciação e amortização (EBITDA) por ação. Ele é calculado dividindo o preço da ação pelo EBITDA por ação. O P/EBITDA é usado para avaliar a atratividade de uma ação em relação ao seu desempenho operacional."
  },
  p_ebit: {
    fullName: "Preço/EBIT",
    info: "O Preço/EBIT (P/EBIT) é uma medida financeira que compara o preço atual de uma ação com seu lucro antes de juros e impostos (EBIT) por ação. Ele é calculado dividindo o preço da ação pelo EBIT por ação. O P/EBIT é usado para avaliar a atratividade de uma ação em relação à sua lucratividade operacional."
  },
  p_sr: {
    fullName: "Preço/Vendas",
    info: "O Preço/Vendas (P/SR) é uma medida financeira que compara o preço atual de uma ação com suas vendas por ação. Ele é calculado dividindo o preço da ação pela receita por ação. O P/SR é usado para avaliar a atratividade de uma ação em relação à sua receita gerada."
  },
  p_ativo: {
    fullName: "Preço/Ativo",
    info: "O Preço/Ativo (P/Ativo) é uma medida financeira que compara o preço atual de uma ação com seus ativos totais por ação. Ele é calculado dividindo o preço da ação pelo ativo total por ação. O P/Ativo é usado para avaliar a atratividade de uma ação em relação aos seus ativos totais."
  },
  p_capitlgiro: {
    fullName: "Preço/Capital de Giro",
    info: "O Preço/Capital de Giro (P/Capital de Giro) é uma medida financeira que compara o preço atual de uma ação com seu capital de giro por ação. Ele é calculado dividindo o preço da ação pelo capital de giro por ação. O P/Capital de Giro é usado para avaliar a eficiência de uma empresa em usar seu capital de giro para gerar lucros."
  },
  p_ativocirculante: {
    fullName: "Preço/Ativo Circulante",
    info: "O Preço/Ativo Circulante (P/Ativo Circulante) é uma medida financeira que compara o preço atual de uma ação com seu ativo circulante por ação. Ele é calculado dividindo o preço da ação pelo ativo circulante por ação. O P/Ativo Circulante é usado para avaliar a eficiência de uma empresa em usar seus ativos circulantes para gerar lucros."
  },
  ev_ebitda: {
    fullName: "Valor da Empresa/EBITDA",
    info: "O Valor da Empresa/EBITDA (VE/EBITDA) é uma medida financeira que compara o valor total de uma empresa com seu lucro antes de juros, impostos, depreciação e amortização (EBITDA). Ele é calculado dividindo o valor da empresa pelo EBITDA. O VE/EBITDA é usado para avaliar o valor de uma empresa em relação ao seu desempenho operacional."
  },
  ev_ebit: {
    fullName: "Valor da Empresa/EBIT",
    info: "O Valor da Empresa/EBIT (VE/EBIT) é uma medida financeira que compara o valor total de uma empresa com seu lucro antes de juros e impostos (EBIT). Ele é calculado dividindo o valor da empresa pelo EBIT. O VE/EBIT é usado para avaliar o valor de uma empresa em relação à sua lucratividade operacional."
  },
  lpa: {
    fullName: "Lucro por Ação",
    info: "O Lucro por Ação (LPA) é uma medida financeira que calcula a quantidade de lucro líquido gerado por ação ordinária. Ele é calculado dividindo o lucro líquido da empresa pelo número de ações ordinárias em circulação."
  },
  vpa: {
    fullName: "Valor Patrimonial por Ação",
    info: "O Valor Patrimonial por Ação (VPA) é uma medida financeira que calcula o valor contábil líquido por ação ordinária. Ele é calculado dividindo o patrimônio líquido da empresa pelo número de ações ordinárias em circulação."
  },
  peg_Ratio: {
    fullName: "Price/Earnings to Growth Ratio",
    info: "A Price/Earnings to Growth Ratio (PEG Ratio) é uma medida financeira que relaciona o preço de uma ação ao seu crescimento futuro. Ela é calculada dividindo o P/L pelo crescimento anual esperado do lucro por ação (geralmente em uma base de cinco anos). Uma PEG Ratio abaixo de 1 é geralmente considerada favorável, indicando que a ação pode estar subvalorizada."
  },
  dividaliquida_patrimonioliquido: {
    fullName: "Dívida Líquida/Patrimônio Líquido",
    info: "A Dívida Líquida/Patrimônio Líquido é uma medida financeira que compara a dívida líquida de uma empresa com seu patrimônio líquido. Ela é calculada dividindo a dívida líquida pelo patrimônio líquido. Essa métrica é usada para avaliar a solidez financeira de uma empresa e sua capacidade de honrar suas obrigações."
  },
  dividaliquida_ebitda: {
    fullName: "Dívida Líquida/EBITDA",
    info: "A Dívida Líquida/EBITDA é uma medida financeira que compara a dívida líquida de uma empresa com seu lucro antes de juros, impostos, depreciação e amortização (EBITDA). Ela é calculada dividindo a dívida líquida pelo EBITDA. Essa métrica é usada para avaliar a capacidade de uma empresa de pagar sua dívida com seus fluxos de caixa operacionais."
  },
  dividaliquida_ebit: {
    fullName: "Dívida Líquida/EBIT",
    info: "A Dívida Líquida/EBIT é uma medida financeira que compara a dívida líquida de uma empresa com seu lucro antes de juros e impostos (EBIT). Ela é calculada dividindo a dívida líquida pelo EBIT. Essa métrica é usada para avaliar a capacidade de uma empresa de pagar sua dívida com seus lucros operacionais."
  },
  patrimonio_ativo: {
    fullName: "Patrimônio Líquido/Ativo Total",
    info: "A relação Patrimônio Líquido/Ativo Total é uma medida financeira que compara o patrimônio líquido de uma empresa com seu ativo total. Ela é calculada dividindo o patrimônio líquido pelo ativo total. Essa métrica é usada para avaliar a solidez financeira de uma empresa e sua capacidade de gerar retornos para os acionistas."
  },
  passivo_ativo: {
    fullName: "Passivo Total/Ativo Total",
    info: "A relação Passivo Total/Ativo Total é uma medida financeira que compara o passivo total de uma empresa com seu ativo total. Ela é calculada dividindo o passivo total pelo ativo total. Essa métrica é usada para avaliar a estrutura de capital de uma empresa e sua capacidade de honrar suas obrigações."
  },
  liquidezcorrente: {
    fullName: "Liquidez Corrente",
    info: "A Liquidez Corrente é uma medida financeira que avalia a capacidade de uma empresa de pagar suas obrigações de curto prazo com seus ativos de curto prazo. Ela é calculada dividindo os ativos circulantes pelo passivo circulante. Uma liquidez corrente acima de 1 indica que a empresa possui mais ativos circulantes do que passivos circulantes, o que é geralmente considerado positivo."
  },
  margembruta: {
    fullName: "Margem Bruta",
    info: "A Margem Bruta é uma medida financeira que avalia a rentabilidade de uma empresa antes de despesas operacionais, como salários e aluguel. Ela é calculada dividindo o lucro bruto pelo total de receitas. A margem bruta é usada para avaliar a eficiência operacional de uma empresa e sua capacidade de gerar lucros a partir de suas vendas."
  },
  margemebitda: {
    fullName: "Margem EBITDA",
    info: "A Margem EBITDA é uma medida financeira que avalia a rentabilidade de uma empresa antes de despesas de juros, impostos, depreciação e amortização (EBITDA). Ela é calculada dividindo o EBITDA pelo total de receitas. A margem EBITDA é usada para avaliar a eficiência operacional de uma empresa e sua capacidade de gerar lucros com suas operações principais."
  },
  margemebit: {
    fullName: "Margem EBIT",
    info: "A Margem EBIT é uma medida financeira que avalia a rentabilidade de uma empresa antes de despesas de juros e impostos (EBIT). Ela é calculada dividindo o EBIT pelo total de receitas. A margem EBIT é usada para avaliar a eficiência operacional de uma empresa e sua capacidade de gerar lucros com suas operações principais."
  },
  margemliquida: {
    fullName: "Margem Líquida",
    info: "A Margem Líquida é uma medida financeira que avalia a rentabilidade de uma empresa após todas as despesas, incluindo juros, impostos, depreciação e amortização (EBITDA). Ela é calculada dividindo o lucro líquido pelo total de receitas. A margem líquida é usada para avaliar a lucratividade final de uma empresa."
  },
  roe: {
    fullName: "Retorno sobre o Patrimônio Líquido",
    info: "O Retorno sobre o Patrimônio Líquido (ROE) é uma medida financeira que avalia a rentabilidade de uma empresa em relação ao patrimônio líquido dos acionistas. Ele é calculado dividindo o lucro líquido pelo patrimônio líquido. O ROE é usado para avaliar a eficiência de uma empresa em gerar lucros a partir do capital dos acionistas."
  },
  roa: {
    fullName: "Retorno sobre Ativos",
    info: "O Retorno sobre Ativos (ROA) é uma medida financeira que avalia a eficiência de uma empresa em gerar lucros a partir de seus ativos totais. Ele é calculado dividindo o lucro líquido pelo total de ativos. O ROA é usado para avaliar a eficiência operacional e a gestão de ativos de uma empresa."
  },
  roic: {
    fullName: "Retorno sobre o Capital Investido",
    info: "O Retorno sobre o Capital Investido (ROIC) é uma medida financeira que avalia a eficiência de uma empresa em gerar retornos sobre o capital investido. Ele é calculado dividindo o lucro operacional líquido após impostos pelo capital investido. O ROIC é usado para avaliar a eficiência de alocação de capital de uma empresa."
  },
  giro_ativos: {
    fullName: "Giro do Ativo",
    info: "O Giro do Ativo é uma medida financeira que avalia a eficiência de uma empresa em usar seus ativos para gerar vendas. Ele é calculado dividindo as vendas pelo total de ativos. O Giro do Ativo é usado para avaliar a eficiência operacional e a gestão de ativos de uma empresa."
  },
  receitas_cagr5: {
    fullName: "Taxa de Crescimento Anual Composta de 5 Anos",
    info: "A Taxa de Crescimento Anual Composta de 5 Anos (CAGR) é uma medida financeira que calcula a taxa de retorno média anual de um investimento ao longo de um período de cinco anos, levando em consideração os efeitos da composição. É usada para avaliar o desempenho histórico de um investimento e sua capacidade de crescimento no longo prazo."
  }
};

export { referenceList }