## Classe Comparator

Uma classe para comparar indicadores de ações entre várias ações.

### execute(opções)

Executa a comparação entre o array fornecido de ações com base em seus indicadores.

#### Parâmetros

- `opções` (`Object`): As opções para a comparação.
  - `opções.arrayToCompare` (`Array` de `StockProps`): O array de ações para comparar.

#### Retorna

- `Object`: O resultado da comparação contendo chaves, valores ordenados e valores maiores para cada indicador.
  - `chaves` (`Array` de `string`): As chaves representando os indicadores.
  - `valoresOrdenados` (`Object`): Um objeto contendo valores ordenados para cada indicador.
  - `valoresMaiores` (`Object`): Um objeto contendo valores maiores para cada indicador.

### Exemplo de Uso

```javascript
const resultadoComparacao = Comparator.execute({
  arrayToCompare: [
    { ticker: 'AAPL', indicadores: { preço: { atual: 150 }, volume: { atual: 1000000 } } },
    { ticker: 'GOOGL', indicadores: { preço: { atual: 2500 }, volume: { atual: 500000 } } },
    // Adicione mais ações para comparação conforme necessário
  ]
});
