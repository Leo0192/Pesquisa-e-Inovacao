var database = require("../database/config");

function buscarUltimasMedidas(idTalhao, limite_linhas) {

    var instrucaoSql = `
    SELECT
	    idHistorico,
	    fkSensor,
	    umidade,
	    data,
	    DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
        FROM historico_sensor hs
    JOIN sensor s ON s.idSensor = hs.fkSensor
    join talhao t on s.fktalhao = t.idtalhao
    where fkTalhao = ${idTalhao}
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
    FROM historico_sensor hs
    JOIN sensor s ON s.idSensor = hs.fkSensor
    join talhao t on s.fktalhao = t.idtalhao
    where fkSensor = ${idTalhao}
    ORDER BY idHistorico DESC LIMIT 4;
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarSensorPorTalhão(idTalhao){

    var instrucaoSql = `
        select  
            *
        from sensor s 
        join talhao t on t.idtalhao = s.fktalhao
        where fktalhao = ${idTalhao};
    `

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarSensorPorTalhão
}
