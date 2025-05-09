// importa os bibliotecas necessários
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');

// constantes para configurações
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// habilita ou desabilita a inserção de dados no banco de dados
const HABILITAR_OPERACAO_INSERIR = true;

// função para comunicação serial
const serial = async (
    valoresSensorA,
    valoresSensorB,
    valoresSensorC,
    valoresSensorD
) => {

    // conexão com o banco de dados MySQL
    // no bash do lubuntu, execute os seguintes comandos :
    // mysql -u root -p
    // (senha: SPTech#2024)
    // create user vitagro identified by 'Vitagro12345!';
    // grant insert on vitagro.historico_sensor to 'vitagro;
    let poolBancoDados = mysql.createPool(
        {
            host: 'localhost',
            user: 'vitagro',
            password: 'Vitagro12345!',
            database: 'vitagro',
            port: 3307,
            connectTimeout: 30000
        }
    ).promise();

    // lista as portas seriais disponíveis e procura pelo Arduino
    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == '2341' && porta.productId == 43); // 2341:43 é o ID do Arduino Uno original sptech, o genérico é '1A86':7523
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }

    // configura a porta serial com o baud rate especificado
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );

    // evento quando a porta serial é aberta
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });

    // processa os dados recebidos do Arduino
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        console.log(data);
        const valores = data.split(';');
        const sensorA = parseInt(valores[0]);
        const sensorB = parseInt(valores[1]);
        const sensorC = parseInt(valores[2]);
        const sensorD = parseInt(valores[3]);

        // armazena os valores dos sensores nos arrays correspondentes
        valoresSensorA.push(sensorA);
        valoresSensorB.push(sensorB);
        valoresSensorC.push(sensorC);
        valoresSensorD.push(sensorD);

        // insere os dados no banco de dados (se habilitado)
        if (HABILITAR_OPERACAO_INSERIR) {

            // este insert irá inserir os dados na tabela "medida"
            await poolBancoDados.execute(
                'INSERT INTO historico_sensor (fk_idSensor, umidade) VALUES (?, ?), (?, ?), (?, ?), (?, ?)',
                [1, sensorA, 2, sensorB, 3, sensorC, 4, sensorD]
            );
            console.log("valores inseridos no banco: ", sensorA + ", " + sensorB + ", "+ sensorC + ", " + sensorD);

        }

    });

    // evento para lidar com erros na comunicação serial
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}

// função para criar e configurar o servidor web
const servidor = (
    valoresSensorA,
    valoresSensorB,
    valoresSensorC,
    valoresSensorD
) => {
    const app = express();

    // configurações de requisição e resposta
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });

    // inicia o servidor na porta especificada
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });

    // define os endpoints da API para cada tipo de sensor
    app.get('/sensores/A', (_, response) => {
        return response.json(valoresSensorA);
    });
    app.get('/sensores/B', (_, response) => {
        return response.json(valoresSensorB);
    });
    app.get('/sensores/C', (_, response) => {
        return response.json(valoresSensorC);
    });
    app.get('/sensores/D', (_, response) => {
        return response.json(valoresSensorD);
    });
}

// função principal assíncrona para iniciar a comunicação serial e o servidor web
(async () => {
    // arrays para armazenar os valores dos sensores
    const valoresSensorA = [];
    const valoresSensorB = [];
    const valoresSensorC = [];
    const valoresSensorD = [];

    // inicia a comunicação serial
    await serial(
        valoresSensorA,
        valoresSensorB,
        valoresSensorC,
        valoresSensorD
    );

    // inicia o servidor web
    servidor(
        valoresSensorA,
        valoresSensorB,
        valoresSensorC,
        valoresSensorD
    );
})();