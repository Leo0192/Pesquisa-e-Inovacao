var database = require("../database/config");

function buscarTalhoesPorEmpresa(empresaId) {

  var instrucaoSql = `select idTalhao from talhao 
    inner join plantacao p on fkPlantacao=p.idPlantacao
    inner join empresa on p.fkEmpresa=idEmpresa where idEmpresa=${empresaId};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarTalhoesPorEmpresa,
  
}
