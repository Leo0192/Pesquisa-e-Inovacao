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
    nome_empresa VARCHAR(40) NOT NULL -- Nome da empresa
);

/* Criação da tabela representante, que visa armazenar os dados das diferentes plantações nas quais nosso sistema está instalado,
junto com a relação da plantação com a empresa parceira, dona do hectare */
CREATE TABLE representante(
    id_representante INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único da plantação
	nome_representante VARCHAR(50) NOT NULL, -- Nome do representante da empresa
    cpf_representante CHAR(11) NOT NULL, -- CPF do representante da empresa
    email_representante VARCHAR(50) NOT NULL, -- Email para contato com o representante da empresa
    telefone_representante VARCHAR(14) NOT NULL, -- Telefone para contato com o representante
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
    fk_idRepresentante INT, -- Identificador de qual plantação esse grupo faz parte
    CONSTRAINT fk_idRepresentante FOREIGN KEY(fk_idRepresentante) REFERENCES representante(id_representante) -- Criação da relação da chave estrangeira
);

/* Criação da tabela sensor, que irá armazenar todos os sensores instalados para sua identificação,
localização, momento de instalação, status, etc */
CREATE TABLE sensor(
    id_sensor INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do sensor
    status CHAR(7) DEFAULT 'Ativo', -- Status do sensor, para ver se ele está ativo ou não
    localizacao VARCHAR(25) NOT NULL, -- Coordenadas para localização do sensor
    fk_idGrupo INT, -- Identificador de qual grupo esse sensor faz parte
    CONSTRAINT chk_status CHECK(status IN ('Ativo','Inativo')), -- Regra para que a coluna 'status' só possa ter os valores 'Ativo' e 'Inativo'
    CONSTRAINT fk_idGrupo FOREIGN KEY(fk_idGrupo) REFERENCES grupo(id_grupo) -- Criação da relação da chave estrangeira
);

/* Criação da tabela 'histórico sensor' onde os registros de umidade medidos pelos sensores serão armazenados, juntamente com o horário em que foi
feita a medição */
CREATE TABLE historico_sensor(
    id_historico INT AUTO_INCREMENT, -- Identificador único do histórico
    fk_idSensor INT, -- Identificador do sensor
    umidade DECIMAL(5,2), -- Porcentagem da umidade no momento do registro
    dataHorario DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e horário em que a medição foi feita
    PRIMARY KEY (id_historico, fk_idSensor),
    CONSTRAINT fk_idSensor FOREIGN KEY(fk_idSensor) REFERENCES sensor(id_sensor) -- Criação da relação da chave estrangeira
);

-- Inserindo dados na tabela empresa
INSERT INTO empresa (email_institucional, telefone, token, senha, cnpj, nome_empresa) VALUES
('contato@agroverde.com', '11999998888', 123456, 'senhaAgro1', '12345678000199', 'AgroVerde'),
('suporte@plantbem.com', '11888887777', 654321, 'senhaPlant2', '98765432000111', 'PlantBem');

-- Inserindo dados na tabela representante
INSERT INTO representante (nome_representante, cpf_representante, email_representante, telefone_representante, endereco, hectares, idEmpresa) VALUES
('Carlos Silva', '12345678901', 'carlos@agroverde.com', '11999990000', 'Fazenda Primavera, SP', 10, 1),
('Mariana Costa', '98765432100', 'mariana@plantbem.com', '11888880000', 'Fazenda Aurora, MG', 15, 2);

-- Inserindo dados na tabela grupo
INSERT INTO grupo (localizacao, fk_idRepresentante) VALUES
('Lat:-23.5505', 1),
('Lat:-19.9167', 2);

-- Inserindo dados na tabela sensor
INSERT INTO sensor (status, localizacao, fk_idGrupo) VALUES
('Ativo', 'Lat:-23.5505', 1),
('Ativo', 'Lat:-23.5506', 1),
('Inativo', 'Lat:-19.9168', 2),
('Ativo', 'Lat:-19.9169', 2);

-- Inserindo dados na tabela historico_sensor
INSERT INTO historico_sensor (fk_idSensor, umidade, dataHorario) VALUES
(1, 45.30, '2025-04-09 08:30:00'),
(1, 47.85, '2025-04-09 12:45:00'),
(2, 50.10, '2025-04-09 09:15:00'),
(3, 40.20, '2025-04-09 10:00:00'),
(4, 42.75, '2025-04-09 11:30:00');

-- Seleção para verificação das inserções e consulta
SELECT * FROM empresa;
SELECT * FROM plantacao;
SELECT * FROM grupo;
SELECT * FROM sensor;
SELECT * FROM historico_sensor ORDER BY data DESC;
