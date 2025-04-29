-- Criação do banco de dados central da VitAgro
CREATE DATABASE vitagro;
-- Colocando o database central em uso
USE vitagro;

/* Criação da tabela empresa, que tem como intuito armazenar os dados das empresas clientes,
guardando suas informações principais para identificação */
CREATE TABLE empresa(
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da empresa
    token CHAR(6) NOT NULL UNIQUE, -- Token para validar o cadastro do representante
    cnpj CHAR(14) NOT NULL, -- CNPJ da empresa
    nome_empresa VARCHAR(40) NOT NULL -- Nome da empresa
);

/* Criação da tabela telefone_empresa, responsável por armazenar os telefones de contato das empresas */
CREATE TABLE telefone_empresa (
    idTelefone INT AUTO_INCREMENT, -- Identificador único do telefone
    codigo_internacional CHAR(2) NOT NULL, -- Código internacional do telefone
    ddd CHAR(2) NOT NULL, -- DDD do telefone
    telefone VARCHAR(9) NOT NULL, -- Número do telefone
    fkEmpresa INT NOT NULL, -- Chave estrangeira referenciando a empresa
    PRIMARY KEY (idTelefone),
    CONSTRAINT fk_telefone_empresa FOREIGN KEY (fkEmpresa)
        REFERENCES empresa (idEmpresa) -- Relacionamento com a tabela empresa
);

/* Criação da tabela email_empresa, que armazena os e-mails de contato das empresas */
CREATE TABLE email_empresa (
    idEmail INT AUTO_INCREMENT, -- Identificador único do e-mail
    email VARCHAR(200) NOT NULL, -- Endereço de e-mail da empresa
    fkEmpresa INT NOT NULL, -- Chave estrangeira referenciando a empresa
    PRIMARY KEY (idEmail),
    CONSTRAINT fk_email_empresa FOREIGN KEY (fkEmpresa)
        REFERENCES empresa (idEmpresa) -- Relacionamento com a tabela empresa
);

/* Criação da tabela representante, que armazena os dados dos representantes das empresas */
CREATE TABLE representante (
    idRepresentante INT AUTO_INCREMENT, -- Identificador único do representante
    nome_representante VARCHAR(50) NOT NULL, -- Nome do representante da empresa
    cpf_representante CHAR(11) NOT NULL, -- CPF do representante da empresa
    fkEmpresa INT NOT NULL, -- Identificador da empresa
    senha VARCHAR(20) NOT NULL, -- Senha de acesso do representante
    status CHAR(7) NOT NULL DEFAULT 'Ativo', -- Status do representante (Ativo/Inativo)
    PRIMARY KEY (idRepresentante),
    CONSTRAINT chk_status_representante CHECK(status IN ('Ativo','Inativo')), -- Restrição para status permitido
	CONSTRAINT fk_representante_empresa FOREIGN KEY (fkEmpresa)
        REFERENCES empresa (idEmpresa) -- Relacionamento com a tabela empresa
);

create table contato_representante (
	idContato INT AUTO_INCREMENT,
    email_representante VARCHAR(100) NOT NULL, -- E-mail do representante
	codigo_internacional CHAR(2) NOT NULL, -- Código internacional do telefone do representante
    ddd CHAR(2) NOT NULL, -- DDD do telefone do representante
    telefone CHAR(9) NOT NULL, -- Número do telefone do representante
    fkRepresentante INT NOT NULL UNIQUE,
    PRIMARY KEY (idContato),
	CONSTRAINT fk_contato_representante FOREIGN KEY (fkRepresentante)
		REFERENCES representante (idRepresentante) -- Relacionamento com a tabela representante
);
/* Criação da tabela plantacao, que visa armazenar os dados das diferentes plantações nas quais nosso sistema está instalado,
junto com a relação da plantação com a empresa parceira, dona do talhao */
CREATE TABLE plantacao(
    idPlantacao INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da plantação
    fazenda VARCHAR(60) NOT NULL, -- Fazenda da plantação
    estado VARCHAR(19) NOT NULL, -- Fazenda da plantação (Não exite nenhum estado brasileiro com mais de 19 caracteres)
    fkEmpresa INT NOT NULL, -- Identificador da empresa responsável
    CONSTRAINT fk_idEmpresa FOREIGN KEY(fkEmpresa) REFERENCES empresa(idEmpresa) -- Criação da relação da chave estrangeira
);

/* Criação da tabela talhao, que irá separar os sensores instalados em grupos para melhor visualização do usuário e 
aumento de eficiência no momento da consulta (1 talhao tem 4 sensores dentro do grupo, um talhão possui 500mx1000m) */
CREATE TABLE talhao(
    idTalhao INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do talhão
    localizacao VARCHAR(25) NOT NULL, -- Localização do talhao em coordenadas
    fkPlantacao INT NOT NULL, -- Identificador de qual plantação esse talhao faz parte
    CONSTRAINT fk_idPlantacao FOREIGN KEY(fkPlantacao) REFERENCES plantacao(idPlantacao) -- Criação da relação da chave estrangeira
);

/* Criação da tabela sensor, que irá armazenar todos os sensores instalados para sua identificação,
localização, momento de instalação, status, etc */
CREATE TABLE sensor(
    idSensor INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do sensor
    status CHAR(7) DEFAULT 'Ativo', -- Status do sensor, para ver se ele está ativo ou não
    localizacao VARCHAR(25) NOT NULL, -- Coordenadas para localização do sensor
    fkTalhao INT NOT NULL, -- Identificador de qual grupo esse sensor faz parte
    CONSTRAINT chk_status CHECK(status IN ('Ativo','Inativo')), -- Regra para que a coluna 'status' só possa ter os valores 'Ativo' e 'Inativo'
    CONSTRAINT fk_idGrupo FOREIGN KEY(fkTalhao) REFERENCES talhao(idTalhao) -- Criação da relação da chave estrangeira
);

/* Criação da tabela 'histórico sensor' onde os registros de umidade medidos pelos sensores serão armazenados, juntamente com o horário em que foi
feita a medição */
CREATE TABLE historico_sensor(
    idHistorico INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do histórico
    fkSensor INT NOT NULL, -- Identificador do sensor
    umidade int, -- Porcentagem da umidade no momento do registro
    data DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e horário em que a medição foi feita
    CONSTRAINT fk_idSensor FOREIGN KEY(fkSensor) REFERENCES sensor(idSensor) -- Criação da relação da chave estrangeira
);

-- Inserindo uma empresa
INSERT INTO empresa (token, cnpj, nome_empresa)
VALUES 
    ('Dk61!s', '12345678000195', 'AgroTech LTDA'),
    ('L4K!@1', '98765432000188', 'AgroForte S.A.'),
    ('jd%GYK', '45678912000133', 'SojaTerra LTDA');
    
-- Inserindo telefones das empresas na tabela telefone_empresa
INSERT INTO telefone_empresa (codigo_internacional, ddd, telefone, fkEmpresa)
VALUES 
    ('55', '11', '987654321', 1),
    ('55', '62', '998765432', 2),
    ('55', '64', '976543210', 3);
    
-- Inserindo emails adicionais das empresas na tabela email_empresa
INSERT INTO email_empresa (email, fkEmpresa)
VALUES 
    ('financeiro@empresa.com', 1),
    ('suporte@agroforte.com', 2),
    ('vendas@sojaterra.com', 3);

-- Inserindo dados na tabela representante
INSERT INTO representante (nome_representante, cpf_representante, fkEmpresa, senha)
VALUES 
    ('João Silva', '12345678901', 1, 'senha123'),
    ('Maria Oliveira', '98765432100', 2, 'senha456'),
    ('Carlos Mendes', '65498732100', 3, 'senha789');

INSERT INTO contato_representante (email_representante, codigo_internacional, ddd, telefone, fkRepresentante)
VALUES ('joao@empresa.com', '55', '11', '912345678', 1),
	   ('maria@agroforte.com', '55', '62', '987654321', 2),
       ('carlos@sojaterra.com', '55', '64', '965432109', 3);
       
-- Inserindo uma plantação vinculada à empresa
INSERT INTO plantacao (fazenda, estado, fkEmpresa)
VALUES ('Fazenda Primavera', 'Goiás', 1),
       ('Fazenda Bela Vista', 'Mato Grosso', 2),
       ('Fazenda Novo Horizonte', 'Mato Grosso do Sul', 3);

-- Inserindo um grupo de sensores na plantação
INSERT INTO talhao (localizacao, fkPlantacao)
VALUES ('-22.123456,-47.654321', 1),
       ('-13.456789,-56.789123', 2),
       ('-14.123456,-55.987654', 3);

-- Inserindo um sensor no grupo
INSERT INTO sensor (localizacao, fktalhao)
VALUES ('-22.123456,-47.654321', 1),
       ('-13.456789,-56.789123', 1),
       ('-73.486283,-21.489327', 1),
       ('-14.123456,-55.987654', 1);

-- Seleção para verificação das inserções e consulta
SELECT * FROM empresa;
SELECT * FROM plantacao;
SELECT * FROM talhao;
SELECT * FROM sensor;
SELECT * FROM historico_sensor ORDER BY data DESC;
