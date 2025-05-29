var database = require("../database/config");

function buscarUltimasMedidas(idTalhao, limite_linhas) {

    var instrucaoSql = `
    SELECT
	    idHistorico,
	    fkSensor,
	    umidade,
	    data,
	    DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
    FROM historico_sensor
    ORDER BY idHistorico DESC LIMIT ${limite_linhas * 4};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idTalhao) {

    var instrucaoSql = `
    SELECT
	    idHistorico,
	    fkSensor,
	    umidade,
	    data,
	    DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
    FROM historico_sensor
    ORDER BY idHistorico DESC LIMIT 4;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
