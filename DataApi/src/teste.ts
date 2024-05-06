import { PontuationProps, PontuationRule } from "./types/Pontuation.type"
import Json from "./utils/Json";
import { Pontuation } from "./Entities/Pontuation";
import fs from "fs"

function createPontuationInstances(pontuationData: Record<string, PontuationProps>) {
  let csv = "Pontuation ID,Total Points,Média do Dividend Yield nos últimos 5 anos > 0.06 (5%),Mediana do Dividend Yield nos últimos 5 anos > 0.06 (5%),Dividend Yield Atual > 0.06 (6%),Dívida Bruta/Patrimônio < 0.5 (50%),Pagamento constante de dividendos nos últimos 5 anos,Dividendos crescentes nos últimos 5 anos,0 < Payout < 1,Preço Atual < Preço Máximo,Segmento válido\n";
  const pontuationInstances: Pontuation[] = [];

  Object.keys(pontuationData).forEach(key => {
    const instance = pontuationData[key];
    csv += `${instance.id},${instance.totalPoints}`;

    const rules = [
      'Média do Dividend Yield nos últimos 5 anos > 0.06 (5%)',
      'Mediana do Dividend Yield nos últimos 5 anos > 0.06 (5%)',
      'Dividend Yield Atual > 0.06 (6%)',
      'Dívida Bruta/Patrimônio < 0.5 (50%)',
      'Pagamento constante de dividendos nos últimos 5 anos',
      'Dividendos crescentes nos últimos 5 anos',
      '0 < Payout < 1',
      'Preço Atual < Preço Máximo',
      'Segmento válido'
    ];

    rules.forEach(ruleName => {
      const rule = instance.totalEvaluate.find(rule => rule.ruleName === ruleName);
      if (rule) {
        csv += `,${rule.scored ? rule.ifTrue : '-'+rule.ifFalse}`;
      } else {
        csv += `,0`;
      }
    });

    csv += '\n';
  });
  
  return csv;
}

const pontuationData = Json.readJSONFromFile("Ranking.json");
fs.writeFileSync("Teste.csv", createPontuationInstances(pontuationData));

