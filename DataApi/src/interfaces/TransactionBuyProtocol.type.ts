// TODO ALTERAR O SITEMA DE CODIGOS USAR SOMENTE OS NUMEROS

export interface BuyTransactionProcol {
  ticker: string;

  totalValue(quantity: number, value: number): number;
}
