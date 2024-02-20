// Não existe funções ou váriavies em interfaces Typescript
// Logo torna inviável a criação de um Protocol para a classe de utilidades.
// FIXME Revisar SOLID mais tarde
export class AxiosUtils {
    static makeOptionsJson({ headers: headersInput, method, url, params }, final) {
        const options = {
            method: method,
            url: `https://statusinvest.com.br/${url ?? 'acao'}/${final}`,
            headers: {
                'Content-Type': headersInput['Content-Type'] ?? 'application/json',
                cookie: headersInput.cookie ?? '_adasys=b848d786-bc93-43d6-96a6-01bb17cbc296',
                'user-agent': headersInput['user-agent'] ?? 'CPI/V1'
            }
        };
        if (headersInput['Content-Type'] === 'application/json') {
            options.params = params;
        }
        if (headersInput['Content-Type'] === 'application/x-www-form-urlencoded') {
            options.data = params;
        }
        return options;
    }
}
