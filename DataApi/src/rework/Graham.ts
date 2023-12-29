import { Stock } from './Stock';
import { NetLiquid } from './types/stock.types';

// Princípios utilizados:

// - [x] 1.  Sobrevivência: Sobreviveu nos últimos 10 anos.
// - [x] 2.  Estabilidade ds Lucros: Lucro > 0 nos últimos 10 anos. https://www.estrategista.net/o-fracasso-de-benjamin-graham-na-bolsa-atual/
// - [x] 3.  Crescimento dos Lucros: Lucros crescentes nos últimos 10 anos https://www.estrategista.net/o-fracasso-de-benjamin-graham-na-bolsa-atual/
// - [x] 4.  Crescimento dos Lucro Por Ação: LPA atual > 1.33 * LPA 10 anos atrás. (Calculado através da média dos 3 anos do começo e dos 3 anos do fim deste período) http://seuguiadeinvestimentos.com.br/a-tecnica-de-investimento-de-benjamin-graham-ii/
// - [x] 5.  Estabilidade dos Dividendos: Dividendos pagos nos últimos 10 anos. http://seuguiadeinvestimentos.com.br/a-tecnica-de-investimento-de-benjamin-graham-ii/
// - [x] 6.  raíz_quadrada_de(22.5 * VPA * LPA) => Quanto maior, melhor. Ideal > 1.5 * Preço. https://www.sunoresearch.com.br/artigos/valor-intrinseco/?utm_source=PR&utm_medium=artigo&utm_campaign=investing_05122019
// - [x] 7.  P/L (Preço/Lucro) => Quanto menor, melhor (ideal, < 15 E >= 0) http://seuguiadeinvestimentos.com.br/a-tecnica-de-investimento-de-benjamin-graham-ii/
// - [x] 8.  P/VP (Preço/Valor Patrimonial) => Quanto menor, melhor (ideal, < 1.5 E >= 0) http://seuguiadeinvestimentos.com.br/a-tecnica-de-investimento-de-benjamin-graham-ii/
// - [x] 9.  Crescimento em 5 anos => Quanto maior, melhor (ideal, > 5%) https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/
// - [x] 10. ROE (Return On Equity) => Quanto maior, melhor (ideal, superior a 20%) https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/
// - [x] 11. Dividend Yield (Rendimento de Dividendo) => Quanto maior, melhor (ideal, > Taxa Selic (4.5%)) https://foconomilhao.com/acoes-com-dividend-yield-maior-que-a-selic/
// - [] 12. Liquidez Corrente => Quanto maior, melhor (ideal > 1.5) https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/
// - [] 13. Dívida Bruta/Patrimônio => Quanto menor, melhor (ideal < 50%) https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/
// - [] 14. Patrimônio Líquido => Quanto maior, melhor (ideal > 2000000000)

// ### Graham ###
// ===== Próximos =====
// * Valor de Mercado maior que 2.000.000 . // Benjamin Graham // https://edisciplinas.usp.br/pluginfile.php/3821144/mod_resource/content/4/245.pdf
//   => https://www.fundamentus.com.br/detalhes.php?papel=PETR4
// * Valor médio de negociações superior a R$ 1 milhão. // Benjamin Graham // https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/
//   ~> Vol $ méd (2m) > 1.000.000
//   => https://www.fundamentus.com.br/detalhes.php?papel=PETR4
// * Endividamento de longo prazo < Capital de Giro // Benjamin Graham // https://www.sunoresearch.com.br/artigos/o-investidor-inteligente-entenda-a-obra-de-benjamin-graham/
// * Possui bom nível de governança corporativa // Benjamin Graham // https://daxinvestimentos.com/analise-fundamentalista-mais-de-200-de-rentabilidade-em-2-anos/

// Lucros para fazer o Gráfico ;)
// https://api-analitica.sunoresearch.com.br/api/Statement/GetStatementResultsReportByTicker?type=y&ticker=WEGE3&period=10

export class GranhamMethod {
  private points: number = 0;
  private lpa: number[] = [];
  private vpa: number[] = [];
  private p_l: number = 0;
  private p_vp: number = 0;
  private roe: number = 0;

  private netLiquid: NetLiquid[] = [];

  constructor(private stock: Stock) {
    const { indicators } = stock;

    this.p_l = Number(indicators.p_l.actual);
    this.p_vp = Number(indicators.p_vp.actual);
    this.roe = Number(indicators.roe.actual) / 100;

    indicators.lpa.olds.map((indicator) => {
      this.lpa.push(Number(indicator.value));
    });

    indicators.vpa.olds.map((indicator) => {
      this.vpa.push(Number(indicator.value));
    });

    this.netLiquid = stock.netLiquid;

    this.makePoints();
  }

  makePoints() {
    const stock = this.stock;
    const { netLiquid } = stock;
    const { vpa, lpa, p_l, p_vp, roe } = this;

    const lpaAverage = stock.makeAverage(lpa);
    const vpaAverage = stock.makeAverage(vpa);

    const netLiquidOn10Years = netLiquid.slice(0, 10);

    if (netLiquidOn10Years.length > 10) this.points++;
    if (netLiquidOn10Years.every((netLiquid) => netLiquid.value > 0))
      this.points++;
    if (this.crescentNetLiquid(netLiquidOn10Years)) this.points++;
    if (this.crescentLpa() === true) this.points++;
    if (this.constantDividend()) this.points++;
    if (Math.sqrt(22.5 * vpaAverage * lpaAverage) > 1.5 * stock.actualPrice)
      this.points++;
    if (p_l > 0 && p_l < 15) this.points++;
    if (p_vp > 0 && p_vp < 1.5) this.points++;
    if (this.calculateYearGrowth(5)) this.points++;
    if (roe > 0.2) this.points++;
    if (stock.actualDividendYield > stock.CDI) this.points++;
  }

  crescentNetLiquid(netLiquidOn10Years: NetLiquid[]) {
    let crescent = true;
    for (let i = 0; i < netLiquidOn10Years.length; i++) {
      if (netLiquidOn10Years[i + 1] === undefined) break;
      console.log(Number(netLiquidOn10Years[i].value) / 10000000000);
      if (!(netLiquidOn10Years[i].value < netLiquidOn10Years[i + 1].value))
        crescent = false;
    }
    return crescent;
  }

  crescentLpa() {
    const { lpa } = this;

    const lpaInitial = (lpa[0] + lpa[1] + lpa[2]) / 3;
    const lpaFinal =
      (lpa[lpa.length - 3] + lpa[lpa.length - 2] + lpa[lpa.length - 1]) / 3;

    const crescent = lpa[lpa.length - 1] > 1.33 * lpaInitial;

    return crescent;
  }

  constantDividend() {
    const { lastDividendsValue } = this.stock;
    let crescent = true;

    lastDividendsValue.map((dividend) => {
      if (dividend.value <= 0) crescent = false;
    });

    return crescent;
  }

  calculateYearGrowth(numberYears: number) {
    try {
      const { netLiquid } = this.stock;

      const actualYear = (new Date().getFullYear() - 1).toString();
      const lastYear = (Number(actualYear) - numberYears).toString();

      console.log(actualYear, lastYear);

      const actualNetLiquid = netLiquid.find(
        (netLiquid) => netLiquid.year === actualYear
      );
      const lastNetLiquid = netLiquid.find(
        (netLiquid) => netLiquid.year === lastYear
      );

      if (!actualNetLiquid || !lastNetLiquid)
        throw new Error('Invalid NetLiquid');

      console.log(actualNetLiquid, lastNetLiquid);
      const growth =
        (actualNetLiquid.value - lastNetLiquid.value) / lastNetLiquid.value;

      if (growth > 0.05) return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
