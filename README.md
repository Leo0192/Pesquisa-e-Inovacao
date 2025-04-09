# VitAgro - Sensor de Umidade

//texto

## 📋 Objetivo do Projeto
//texto

### Funcionalidades
- Monitoramento da umidade.
- Multipontos de monitoramento por hectare.
- Inserção automática em um banco de dados.
- Visualização dinâmica em um ambiente web.
- Visualização de métricas de determinado sensor ou por hectare.

## 🛠️ Tecnologias Utilizadas

### Hardware
- **Microcontrolador:** Arduíno Uno R3 (ATmega328P).
- **Sensor de umidade:** DHT11.

### Software
- **Website:** HTML, CSS.
- **API:** NodeJS.
- **Armazenamento de Dados:** SQL Server.
- **Versionamento e amrazenamento de Código:** Git, Github.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [NodeJS](https://nodejs.org) para execução da API.
- [Arduino IDE](https://www.arduino.cc/en/software) para o compilamento e upload do código para o Arduíno Uno.
- [SQL Server](https://www.microsoft.com/sql-server) para hospedagem do banco de dados.

  
### Passos para Configuração
1. Clone este repositório:
    ```bash
    git clone https://github.com/Leo0192/Pesquisa-e-Inovacao.git
    cd Pesquisa-e-Inovacao
    ```

2. Dentro do diretório `dat-acqu-ino-api`, instale as dependências necessárias:
    ```bash
    npm install
    ```

3. No arquivo `main.js`, insira as credenciais do banco de dados.

4. Conecte o Arduíno Uno ao computador e faça o upload do código presente na pasta `Arduino` utilizando o Arduino IDE.

5. No diretório atual, execute a API:
    ```bash
    npm start
    ```


## 💡 Estrutura do Projeto

- `Individual - Nome/`: Diretório para armazenar as tasks que cada integrante necessita realizar individualmente.
- `Main/`: Diretório principal do projeto.
- `Main/docs`: Diretório para a documentação do projeto.
- `Main/res`: Diretório para recursos.


## 👷👷‍♀️ Membros da Equipe

- [Guilherme Santos](); 
- [Hércules Pereira]();
- [Isabelle Constantino]();
- [Leonardo Piato]();
- [Miguel de Oliveira]().

## 📝 Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
