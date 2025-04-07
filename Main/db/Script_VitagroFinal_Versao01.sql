-- Criação do banco de dados central da VitAgro
CREATE DATABASE vitagro;

-- Colocando o database central em uso
USE vitagro;

/* Criação da tabela empresa, que tem como intuito armazenar os dados das empresas clientes,
guardando suas informações principais para contato e identificação */
CREATE TABLE empresa(
    id_empresa INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da empresa
    email_institucional VARCHAR(50) NOT NULL, -- Email institucional da empresa
    telefone VARCHAR(14) NOT NULL, -- Telefone para contato com a empresa
    token INT NOT NULL UNIQUE, -- Token para realizar login (como se fosse o RA dos alunos da SPTECH)
    senha VARCHAR(50) NOT NULL, -- Senha para realizar login
    cnpj CHAR(14) NOT NULL, -- CNPJ da empresa
    nome_empresa VARCHAR(40) NOT NULL, -- Nome da empresa
    nome_representante VARCHAR(50) NOT NULL, -- Nome do representante da empresa
    cpf_representante CHAR(11) NOT NULL, -- CPF do representante da empresa
    email_representante VARCHAR(50) NOT NULL, -- Email para contato com o representante da empresa
    telefone_representante VARCHAR(14) NOT NULL -- Telefone para contato com o representante
);

/* Criação da tabela plantacao, que visa armazenar os dados das diferentes plantações nas quais nosso sistema está instalado,
junto com a relação da plantação com a empresa parceira, dona do hectare */
CREATE TABLE plantacao(
    id_plantacao INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da plantação
    endereco VARCHAR(60) NOT NULL, -- Endereço da plantação
    hectares INT NOT NULL, -- Número de hectares da plantação
    idEmpresa INT, -- Identificador da empresa responsável
    CONSTRAINT fk_idEmpresa FOREIGN KEY(idEmpresa) REFERENCES empresa(id_empresa) -- Criação da relação da chave estrangeira
);

/* Criação da tabela grupo, que irá separar os sensores instalados em grupos para melhor visualização do usuário e 
aumento de eficiência no momento da consulta (cada grupo equivale a 1 hectare e tem 4 sensores dentro do grupo,
cada sensor faz o monitoramento de 2500 metros quadrados) */
CREATE TABLE grupo(
    id_grupo INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do grupo
    localizacao VARCHAR(25) NOT NULL, -- Localização do hectare em coordenadas
    fk_idPlantacao INT, -- Identificador de qual plantação esse grupo faz parte
    CONSTRAINT fk_idPlantacao FOREIGN KEY(fk_idPlantacao) REFERENCES plantacao(id_plantacao) -- Criação da relação da chave estrangeira
);

/* Criação da tabela sensor, que irá armazenar todos os sensores instalados para sua identificação,
localização, momento de instalação, status, etc */
CREATE TABLE sensor(
    id_sensor INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do sensor
    status CHAR(7) DEFAULT 'Ativo', -- Status do sensor, para ver se ele está ativo ou não
    instalacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data e horário da instalação do sensor
    localizacao VARCHAR(25) NOT NULL, -- Coordenadas para localização do sensor
    fk_idGrupo INT, -- Identificador de qual grupo esse sensor faz parte
    CONSTRAINT chk_status CHECK(status IN ('Ativo','Inativo')), -- Regra para que a coluna 'status' só possa ter os valores 'Ativo' e 'Inativo'
    CONSTRAINT fk_idGrupo FOREIGN KEY(fk_idGrupo) REFERENCES grupo(id_grupo) -- Criação da relação da chave estrangeira
);

/* Criação da tabela 'histórico sensor' onde os registros de umidade medidos pelos sensores serão armazenados, juntamente com o horário em que foi
feita a medição */
CREATE TABLE historico_sensor(
    id_historico INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do histórico
    fk_idSensor INT, -- Identificador do sensor
    umidade DECIMAL(4,2), -- Porcentagem da umidade no momento do registro
    data DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e horário em que a medição foi feita
    CONSTRAINT fk_idSensor FOREIGN KEY(fk_idSensor) REFERENCES sensor(id_sensor) -- Criação da relação da chave estrangeira
);

-- Inserindo uma empresa
INSERT INTO empresa (email_institucional, telefone, token, senha, cnpj, nome_empresa, nome_representante, cpf_representante, email_representante, telefone_representante)
VALUES ('contato@empresa.com', '(11)98765-4321', 123456, 'senha123', '12345678000195', 'AgroTech LTDA', 'João Silva', '12345678901', 'joao@empresa.com', '(11)91234-5678'),
       ('contato@agroforte.com', '(62)99876-5432', 654321, 'senha456', '98765432000188', 'AgroForte S.A.', 'Maria Oliveira', '98765432100', 'maria@agroforte.com', '(62)98765-4321'),
       ('suporte@sojaterra.com', '(64)97654-3210', 789012, 'senha789', '45678912000133', 'SojaTerra LTDA', 'Carlos Mendes', '65498732100', 'carlos@sojaterra.com', '(64)96543-2109');

-- Inserindo uma plantação vinculada à empresa
INSERT INTO plantacao (endereco, hectares, idEmpresa)
VALUES ('Fazenda Primavera, GO', 150, 1),
       ('Fazenda Bela Vista, MT', 200, 2),
       ('Fazenda Novo Horizonte, MS', 180, 3);

-- Inserindo um grupo de sensores na plantação
INSERT INTO grupo (localizacao, fk_idPlantacao)
VALUES ('-22.123456,-47.654321', 1),
       ('-13.456789,-56.789123', 2),
       ('-14.123456,-55.987654', 3);

-- Inserindo um sensor no grupo
INSERT INTO sensor (instalacao, localizacao, fk_idGrupo)
VALUES ('2025-03-10 00:00:00', '-22.123456,-47.654321', 1),
       ('2025-03-11 08:30:00', '-13.456789,-56.789123', 2),
       ('2025-03-12 14:45:00', '-14.123456,-55.987654', 3);

-- Inserindo um histórico de medições do sensor
INSERT INTO historico_sensor (fk_idSensor, umidade)
VALUES (1, 45.75),
       (2, 50.20),
       (3, 38.90),
       (1, 42.30),
       (2, 48.75),
       (3, 40.10);

-- Seleção para verificação das inserções e consulta
SELECT * FROM empresa;
SELECT * FROM plantacao;
SELECT * FROM grupo;
SELECT * FROM sensor;
SELECT * FROM historico_sensor ORDER BY data DESC;
