var database = require("../database/config");

function buscarUltimasMedidas(idTalhao, limite_linhas) {

    var instrucaoSql = `SELECT 
                        umidade,
                        data,
                        DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
                    FROM historico_sensor
                    WHERE fkSensor = ${idTalhao}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTalhao) {

    var instrucaoSql = `SELECT 
                        umidade,
                        DATE_FORMAT(data,'%H:%i:%s') as momento_grafico, 
                        fkSensor 
                        FROM historico_sensor WHERE fkSensor = ${idTalhao} 
                    ORDER BY id DESC LIMIT 1`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
