-- Criação do banco de dados central da VitAgro
CREATE DATABASE vitagro;
-- Colocando o database central em uso
USE vitagro;

/* Criação da tabela empresa, que tem como intuito armazenar os dados das empresas clientes,
guardando suas informações principais para identificação */
CREATE TABLE empresa(
    id_empresa INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da empresa
    token CHAR(6) NOT NULL UNIQUE, -- Token para validar o cadastro do representante
    cnpj CHAR(14) NOT NULL, -- CNPJ da empresa
    nome_empresa VARCHAR(40) NOT NULL -- Nome da empresa
);

/* Criação da tabela telefone_empresa, responsável por armazenar os telefones de contato das empresas */
CREATE TABLE telefone_empresa (
    id_telefone INT AUTO_INCREMENT, -- Identificador único do telefone
    codigo_internacional CHAR(2), -- Código internacional do telefone
    ddd CHAR(3), -- DDD do telefone
    telefone VARCHAR(9), -- Número do telefone
    id_empresa INT NOT NULL, -- Chave estrangeira referenciando a empresa
    PRIMARY KEY (id_telefone),
    CONSTRAINT fk_telefone_empresa FOREIGN KEY (id_empresa)
        REFERENCES empresa (id_empresa) -- Relacionamento com a tabela empresa
);

/* Criação da tabela email_empresa, que armazena os e-mails de contato das empresas */
CREATE TABLE email_empresa (
    id_email INT AUTO_INCREMENT, -- Identificador único do e-mail
    email VARCHAR(200), -- Endereço de e-mail da empresa
    id_empresa INT NOT NULL, -- Chave estrangeira referenciando a empresa
    PRIMARY KEY (id_email),
    CONSTRAINT fk_email_empresa FOREIGN KEY (id_empresa)
        REFERENCES empresa (id_empresa) -- Relacionamento com a tabela empresa
);

/* Criação da tabela representante, que armazena os dados dos representantes das empresas */
CREATE TABLE representante (
    id_representante INT AUTO_INCREMENT, -- Identificador único do representante
    nome_representante VARCHAR(50) NOT NULL, -- Nome do representante da empresa
    cpf_representante CHAR(11) NOT NULL, -- CPF do representante da empresa
    id_empresa INT NOT NULL, -- Identificador da empresa
    email_representante VARCHAR(100) NOT NULL, -- E-mail do representante
    senha VARCHAR(20), -- Senha de acesso do representante
    codigo_internacional CHAR(2), -- Código internacional do telefone do representante
    ddd CHAR(3), -- DDD do telefone do representante
    telefone CHAR(9), -- Número do telefone do representante
    status CHAR(7) DEFAULT 'Ativo', -- Status do representante (Ativo/Inativo)
    PRIMARY KEY (id_representante),
    CONSTRAINT chk_status_representante CHECK(status IN ('Ativo','Inativo')), -- Restrição para status permitido
     CONSTRAINT fk_representante_empresa FOREIGN KEY (id_empresa)
        REFERENCES empresa (id_empresa) -- Relacionamento com a tabela empresa
);

/* Criação da tabela plantacao, que visa armazenar os dados das diferentes plantações nas quais nosso sistema está instalado,
junto com a relação da plantação com a empresa parceira, dona do hectare */
CREATE TABLE plantacao(
    id_plantacao INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da plantação
    endereco VARCHAR(60) NOT NULL, -- Endereço da plantação
    hectares INT NOT NULL, -- Número de hectares da plantação
    idEmpresa INT NOT NULL, -- Identificador da empresa responsável
    CONSTRAINT fk_idEmpresa FOREIGN KEY(idEmpresa) REFERENCES empresa(id_empresa) -- Criação da relação da chave estrangeira
);

/* Criação da tabela hectare, que irá separar os sensores instalados em grupos para melhor visualização do usuário e 
aumento de eficiência no momento da consulta (1 hectare tem 4 sensores dentro do grupo,
cada sensor faz o monitoramento de 2500 metros quadrados) */
CREATE TABLE hectare(
    id_hectare INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do hectare
    localizacao VARCHAR(25) NOT NULL, -- Localização do hectare em coordenadas
    fk_idPlantacao INT NOT NULL, -- Identificador de qual plantação esse hectare faz parte
    CONSTRAINT fk_idPlantacao FOREIGN KEY(fk_idPlantacao) REFERENCES plantacao(id_plantacao) -- Criação da relação da chave estrangeira
);

/* Criação da tabela sensor, que irá armazenar todos os sensores instalados para sua identificação,
localização, momento de instalação, status, etc */
CREATE TABLE sensor(
    id_sensor INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do sensor
    status CHAR(7) DEFAULT 'Ativo', -- Status do sensor, para ver se ele está ativo ou não
    localizacao VARCHAR(25) NOT NULL, -- Coordenadas para localização do sensor
    id_hectare INT NOT NULL, -- Identificador de qual grupo esse sensor faz parte
    CONSTRAINT chk_status CHECK(status IN ('Ativo','Inativo')), -- Regra para que a coluna 'status' só possa ter os valores 'Ativo' e 'Inativo'
    CONSTRAINT fk_idGrupo FOREIGN KEY(id_hectare) REFERENCES hectare(id_hectare) -- Criação da relação da chave estrangeira
);

/* Criação da tabela 'histórico sensor' onde os registros de umidade medidos pelos sensores serão armazenados, juntamente com o horário em que foi
feita a medição */
CREATE TABLE historico_sensor(
    id_historico INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do histórico
    fk_idSensor INT NOT NULL, -- Identificador do sensor
    umidade DECIMAL(4,2), -- Porcentagem da umidade no momento do registro
    data DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e horário em que a medição foi feita
    CONSTRAINT fk_idSensor FOREIGN KEY(fk_idSensor) REFERENCES sensor(id_sensor) -- Criação da relação da chave estrangeira
);

-- Inserindo uma empresa
INSERT INTO empresa (token, cnpj, nome_empresa)
VALUES 
    ('Dk61!s', '12345678000195', 'AgroTech LTDA'),
    ('L4K!@1', '98765432000188', 'AgroForte S.A.'),
    ('jd%GYK', '45678912000133', 'SojaTerra LTDA');
    
-- Inserindo telefones das empresas na tabela telefone_empresa
INSERT INTO telefone_empresa (codigo_internacional, ddd, telefone, id_empresa)
VALUES 
    ('55', '11', '987654321', 1),
    ('55', '62', '998765432', 2),
    ('55', '64', '976543210', 3);
    
-- Inserindo emails adicionais das empresas na tabela email_empresa
INSERT INTO email_empresa (email, id_empresa)
VALUES 
    ('financeiro@empresa.com', 1),
    ('suporte@agroforte.com', 2),
    ('vendas@sojaterra.com', 3);

-- Inserindo dados na tabela representante
INSERT INTO representante (nome_representante, cpf_representante, id_empresa, email_representante, senha, codigo_internacional, ddd, telefone)
VALUES 
    ('João Silva', '12345678901', 1, 'joao@empresa.com', 'senha123', '55', '11', '912345678'),
    ('Maria Oliveira', '98765432100', 2, 'maria@agroforte.com', 'senha456', '55', '62', '987654321'),
    ('Carlos Mendes', '65498732100', 3, 'carlos@sojaterra.com', 'senha789', '55', '64', '965432109');
    
-- Inserindo uma plantação vinculada à empresa
INSERT INTO plantacao (endereco, hectares, idEmpresa)
VALUES ('Fazenda Primavera, GO', 150, 1),
       ('Fazenda Bela Vista, MT', 200, 2),
       ('Fazenda Novo Horizonte, MS', 180, 3);

-- Inserindo um grupo de sensores na plantação
INSERT INTO hectare (localizacao, fk_idPlantacao)
VALUES ('-22.123456,-47.654321', 1),
       ('-13.456789,-56.789123', 2),
       ('-14.123456,-55.987654', 3);

-- Inserindo um sensor no grupo
INSERT INTO sensor (localizacao, id_hectare)
VALUES ('-22.123456,-47.654321', 1),
       ('-13.456789,-56.789123', 1),
       ('-73.486283,-21.489327', 1),
       ('-14.123456,-55.987654', 1);

-- Seleção para verificação das inserções e consulta
SELECT * FROM empresa;
SELECT * FROM plantacao;
SELECT * FROM hectare;
SELECT * FROM sensor;
SELECT * FROM historico_sensor ORDER BY data DESC;
