var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, lastname, email, cpf, phone, senha, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, lastname, email, cpf, phone, senha, fkEmpresa);

    let codInternacional = phone.slice(0,2);
    let ddd = phone.slice(2,4);
    let telefone = phone.slice(4);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
    INSERT INTO representante (nome_representante, cpf_representante, fkEmpresa, senha)
    VALUES 
    ('${nome} ${lastname}', '${cpf}', ${fkEmpresa}, '${senha}');
    `

    var instrucaoSql2 = `INSERT INTO contato_representante (email_representante, codigo_internacional, ddd, telefone, fkRepresentante)
    VALUES ('${email}', '${codInternacional}', '${ddd}', '${telefone}', (select idRepresentante from representante where nome_representante = '${nome} ${lastname}' and cpf_representante = '${cpf}'));
    `;
    console.log("Executando a instrução SQL 2: \n" + instrucaoSql2);
    
    return database.executar(instrucaoSql).then(() => {
        return database.executar(instrucaoSql2);
    });
}

module.exports = {
    autenticar,
    cadastrar
};