import { AxiosOptions } from '../types/get.type';

// Não existe funções ou váriavies em interfaces Typescript
// Logo torna inviável a criação de um Protocol para a classe de utilidades.
// FIXME Revisar SOLID mais tarde
export class AxiosUtils {
  static makeOptionsJson(
    method: 'POST' | 'GET',
    url: string,
    params: any,
    final?: string,
    contentType:
      | 'application/x-www-form-urlencoded'
      | 'application/json' = 'application/json'
  ) {
    const options: AxiosOptions = {
      method: method,
      url: `https://statusinvest.com.br/${final ?? 'acao'}/${url}`,
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
}
