## **API de Classificação de Investimentos (Em Desenvolvimento)**

Bem-vindo ao projeto da API de Classificação de Investimentos! Esta API está atualmente em desenvolvimento e tem como objetivo fornecer uma plataforma para classificar investimentos com base em vários critérios, capacitando os usuários a tomar decisões informadas sobre suas escolhas de investimento. Além disso, fornecerá diversos indicadores sobre as ações.

### Ideia do Projeto

A API de Classificação de Investimentos visa oferecer uma ferramenta robusta e flexível para investidores. Utilizando algoritmos e estratégias como o método Bazin, entre outros, para "rankear" as ações, a API classificará investimentos de acordo com diversos critérios, principalmente baseados na recorrência e quantidade de dividendos, além do nível de risco. A API também incluirá ferramentas de visualização de dados para facilitar a compreensão das classificações e tendências de investimento.

### Recursos (Em Breve)

- **Algoritmo de Classificação:** Um algoritmo de classificação será implementado para classificar investimentos de acordo com estratégias como ROI, nível de risco, tendências de mercado e mais.
  
- **Visualização de Dados:** Ferramentas intuitivas de visualização de dados serão fornecidas para ajudar os usuários a entender as classificações e tendências de investimento.
  
- **Escalabilidade:** A API será projetada com escalabilidade em mente, permitindo o manuseio eficiente de grandes conjuntos de dados e tráfego de usuários elevado.
  
- **Autenticação e Segurança:** Mecanismos robustos de autenticação e criptografia de dados serão implementados para garantir a segurança e privacidade dos dados do usuário.

### Como Ativar o Projeto

1. **Pré-requisitos**:
   - Node.js instalado (versão 14 ou superior)
   - Gerenciador de pacotes npm
   - Banco de dados PostgreSQL (ou outro, listagem dos permitidos em [Doc](https://sequelize.org/docs/v6/getting-started/))

2. **Configuração Inicial**:
   - Clone o repositório do projeto:
     ```bash
     git clone https://github.com/Alangdp/IBOVESPA-WINNER.git
     ```
   - Navegue até o diretório do projeto:
     ```bash
     cd ./IBOVESPA-WINNER
     ```

3. **Instalação das Dependências**:
   - Use npm ou yarn para instalar as dependências:
     ```bash
     npm install
     ```

4. **Configuração do Banco de Dados**:
   - Configure o arquivo `.env` com as informações do seu banco de dados. Um exemplo de configuração:
     ```
     PORT=Porta do Projeto
     DATABASE=Nome do Banco de Dados
     DATABASE_HOST=API do Banco de Dados (Em rede "localhost")
     DATABASE_PORT=Porta do Banco de Dados
     DATABASE_USERNAME=Nome do User do Banco de Dados
     DATABASE_PASSWORD=Senha do User do Banco de Dados
     SECRET_TOKEN=Secret Token para login e validações internas (Pode ser qualquer coisa)
     MONGOOSE_URI=URI do MongoDB
     TOLERANCE_TIME_HOURS=24 (Período de atualização dos caches)
     TOLERANCE_TIME_HOURS_RANKING=1 (Período de atualização do ranking)
     ```

5. **Execução das Migrações**:
   - Execute as migrações do banco de dados para criar as tabelas necessárias:
     ```bash
     npx sequelize-cli db:migrate
     ```

6. **Iniciando a API**:
   - Inicie o servidor da API:
     ```bash
     npm start
     ```

7. **Acessando a API**:
   - A API estará disponível em `http://localhost:3000` ou na rota estabelecida no `.env`. Utilize ferramentas como Postman ou cURL para fazer chamadas à API e testar os endpoints.

### Licença

Este projeto será licenciado sob a Licença MIT - consulte o arquivo LICENSE para detalhes após o lançamento.

### Contato

Se você tiver alguma dúvida ou sugestão sobre o desenvolvimento do projeto, sinta-se à vontade para entrar em contato conosco em [alangabrieldias@hotmail.com](mailto:alangabrieldias@hotmail.com).

Obrigado pelo seu interesse na API de Classificação de Investimentos! Fique atento para atualizações enquanto continuamos a desenvolver e melhorar a plataforma!
