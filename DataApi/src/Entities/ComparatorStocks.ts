import { StockProps } from '../types/stock.types';
import instanceStock from './instanceStock.js';

type ArrayToCompare = {
  [key: string]: Array<number | undefined | string>;
};
class Comparator {
  static comparators: ArrayToCompare[] = [];
  static bestValues: ArrayToCompare[] = [];

  private constructor(stock: StockProps) {
    this.addToObject('ticker', stock.ticker);

    const { indicators, payout, dividendYield } = stock;
    const {
      p_l,
      ev_ebitda,
      ev_ebit,
      p_ebita,
      p_ebit,
      p_ativo,
      p_sr,
      p_capitlgiro,
      p_ativocirculante,
      margemebitda,
      margemebit,
      margembruta,
      margemliquida,
      dividaliquida_patrimonioliquido,
      dividaliquida_ebitda,
      dividaliquida_ebit,
      patrimonio_ativo,
      passivo_ativo,
      liquidezcorrente,
      roe,
      roa,
      roic,
      giro_ativos,
      receitas_cagr5,
      lucros_cagr5,
    } = indicators;

    this.addToObject('p_l', p_l.actual);
    this.addToObject('payout', payout);
    this.addToObject('dividendYield', dividendYield);
    this.addToObject('ev_ebitda', ev_ebitda.actual);
    this.addToObject('ev_ebit', ev_ebit.actual);
    this.addToObject('p_ebita', p_ebita.actual);
    this.addToObject('p_ebit', p_ebit.actual);
    this.addToObject('p_ativo', p_ativo.actual);
    this.addToObject('p_sr', p_sr.actual);
    this.addToObject('p_capitlgiro', p_capitlgiro.actual);
    this.addToObject('p_ativocirculante', p_ativocirculante.actual);
    this.addToObject('margemebitda', margemebitda.actual);
    this.addToObject('margemebit', margemebit.actual);
    this.addToObject('margembruta', margembruta.actual);
    this.addToObject('margemliquida', margemliquida.actual);
    this.addToObject(
      'dividaliquida_patrimonioliquido',
      dividaliquida_patrimonioliquido.actual
    );
    this.addToObject('dividaliquida_ebitda', dividaliquida_ebitda.actual);
    this.addToObject('dividaliquida_ebit', dividaliquida_ebit.actual);
    this.addToObject('patrimonio_ativo', patrimonio_ativo.actual);
    this.addToObject('passivo_ativo', passivo_ativo.actual);
    this.addToObject('liquidezcorrente', liquidezcorrente.actual);
    this.addToObject('roe', roe.actual);
    this.addToObject('roa', roa.actual);
    this.addToObject('roic', roic.actual);
    this.addToObject('giro_ativos', giro_ativos.actual);
    this.addToObject('receitas_cagr5', receitas_cagr5.actual);
    this.addToObject('lucros_cagr5', lucros_cagr5.actual);

    console.log(Comparator.comparators, Comparator.comparators.length);
  }

  private addToObject(key: string, value: number | string | undefined) {
    const valueTyped = isNaN(Number(value)) ? value : Number(value);

    let finded = false;
    for (let i = 0; i < Comparator.comparators.length; i++) {
      if (Comparator.comparators[i][key] !== undefined) {
        Comparator.comparators[i][key].push(valueTyped);
        finded = true;
      }
    }

    if (!finded) {
      const newObj = { [key]: [valueTyped] };
      Comparator.comparators.push(newObj);
    }
  }

  static compare(stocks: StockProps[]) {
    for (const stock of stocks) {
      new Comparator(stock);
    }
  }
}

async function name() {
  const bbas3 = await instanceStock('bbas3');
  const taee11 = await instanceStock('taee11');

  Comparator.compare([bbas3, taee11]);
}

name();
