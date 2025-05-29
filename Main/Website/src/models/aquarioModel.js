var database = require("../database/config");

function buscarTalhoesPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM talhao a WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, localizacao) {
  
  var instrucaoSql = `INSERT INTO talhao (localizacao, fkEmpresa) VALUES (${localizacao}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarTalhoesPorEmpresa,
  cadastrar
}
