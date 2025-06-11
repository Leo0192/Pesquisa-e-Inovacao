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

/* Criação da tabela talhao, que irá separar os sensores instalados em grupos para melhor visualização do usuário e 
aumento de eficiência no momento da consulta (1 talhao tem 4 sensores dentro do grupo, um talhão possui 500mx1000m) */
CREATE TABLE talhao(
idTalhao INT PRIMARY KEY AUTO_INCREMENT, -- Identificador único do talhão
localizacao VARCHAR(25) NOT NULL, -- Localização do talhao em coordenadas
fkEmpresa INT NOT NULL, -- Identificador de qual plantação esse talhao faz parte
CONSTRAINT fk_idEmpresa FOREIGN KEY(fkEmpresa) REFERENCES empresa (idEmpresa) -- Criação da relação da chave estrangeira
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
idHistorico INT AUTO_INCREMENT, -- Identificador único do histórico
fkSensor INT NOT NULL, -- Identificador do sensor
fkTalhao INT NOT NULL,
umidade int, -- Porcentagem da umidade no momento do registro
data DATETIME DEFAULT CURRENT_TIMESTAMP, -- Data e horário em que a medição foi feita
CONSTRAINT fk_idSensor FOREIGN KEY(fkSensor) REFERENCES sensor(idSensor),-- Criação da relação da chave estrangeira
CONSTRAINT fk_idTalhao FOREIGN KEY(fkTalhao) REFERENCES talhao(idTalhao),
PRIMARY KEY (idHistorico, fkSensor, fkTalhao)
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
VALUES
('joao@empresa.com', '55', '11', '912345678', 1),
('maria@agroforte.com', '55', '62', '987654321', 2),
('carlos@sojaterra.com', '55', '64', '965432109', 3);

-- Inserindo um grupo de sensores na plantação
INSERT INTO talhao (localizacao, fkEmpresa)
VALUES
('-22.123456,-47.654321', 1),
('-13.456789,-56.789123', 1),
('-14.123456,-55.987654', 1);

-- Inserindo um sensor no grupo
INSERT INTO sensor (localizacao, fktalhao)
VALUES
('-22.123456,-47.654321', 1),
('-13.456789,-56.789123', 1),
('-73.486283,-21.489327', 1),
('-14.123456,-55.987654', 1);

select * from representante;
select * from contato_representante;
-- Seleção para verificação das inserções e consulta
SELECT * FROM empresa;
SELECT * FROM talhao;
SELECT * FROM sensor;
SELECT * FROM historico_sensor ORDER BY data DESC;
    
SELECT
idHistorico,
fkSensor,
idTalhao,
umidade,
data,
DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
FROM historico_sensor hs
JOIN sensor s ON s.idSensor = hs.fkSensor
join talhao t on s.fktalhao = t.idtalhao
where idTalhao = 1
ORDER BY idHistorico DESC, fkSensor LIMIT 4;

    
select idTalhao from talhao 
inner join empresa on fkEmpresa=idEmpresa where idEmpresa=1;
    
desc historico_sensor;
    
INSERT INTO `historico_sensor` VALUES
(1,1,1,0,'2025-06-09 11:48:42'),
(2,2,1,47,'2025-06-09 11:48:42'),
(3,3,1,0,'2025-06-09 11:48:42'),
(4,4,1,0,'2025-06-09 11:48:42'),
(5,1,1,8,'2025-06-09 11:48:42'),
(6,2,1,0,'2025-06-09 11:48:42'),
(7,3,1,0,'2025-06-09 11:48:42'),
(8,4,1,0,'2025-06-09 11:48:42'),
(9,1,1,65,'2025-06-09 11:48:42'),
(10,2,1,58,'2025-06-09 11:48:42'),
(11,3,1,52,'2025-06-09 11:48:42'),
(12,4,1,47,'2025-06-09 11:48:42');

    
INSERT INTO `historico_sensor` VALUES
(13,1,2,0,'2025-06-09 11:48:42'),
(14,2,2,47,'2025-06-09 11:48:42'),
(15,3,2,0,'2025-06-09 11:48:42'),
(16,4,2,0,'2025-06-09 11:48:42'),
(17,1,2,8,'2025-06-09 11:48:42'),
(18,2,2,0,'2025-06-09 11:48:42'),
(19,3,2,0,'2025-06-09 11:48:42'),
(20,4,2,0,'2025-06-09 11:48:42'),
(21,1,2,65,'2025-06-09 11:48:42'),
(22,2,2,58,'2025-06-09 11:48:42'),
(23,3,2,52,'2025-06-09 11:48:42'),
(24,4,2,47,'2025-06-09 11:48:42');

INSERT INTO `historico_sensor` VALUES (36,1,3,0,'2025-06-09 11:48:42'),
(25,2,3,47,'2025-06-09 11:48:42'),
(26,3,3,0,'2025-06-09 11:48:42'),
(27,4,3,0,'2025-06-09 11:48:42'),
(28,1,3,8,'2025-06-09 11:48:42'),
(29,2,3,0,'2025-06-09 11:48:42'),
(30,3,3,0,'2025-06-09 11:48:42'),
(31,4,3,0,'2025-06-09 11:48:42'),
(32,1,3,65,'2025-06-09 11:48:42'),
(33,2,3,58,'2025-06-09 11:48:42'),
(34,3,3,52,'2025-06-09 11:48:42'),
(35,4,3,47,'2025-06-09 11:48:42');

SELECT distinct
fkSensor,
idHistorico,
idTalhao,
umidade,
data,
DATE_FORMAT(data,'%H:%i:%s') as momento_grafico
FROM historico_sensor hs
JOIN sensor s ON s.idSensor = hs.fkSensor
join talhao t on s.fktalhao = t.idtalhao
where idTalhao = 1
ORDER BY idHistorico DESC, fkSensor LIMIT 4;

SELECT
hs.fkSensor,
hs.idHistorico,
hs.fkTalhao,
hs.umidade,
hs.data,
DATE_FORMAT(hs.data,'%H:%i:%s') as momento_grafico
FROM historico_sensor hs
JOIN sensor s ON s.idSensor = hs.fkSensor
join talhao t on s.fktalhao = t.idtalhao
where hs.fkTalhao = 3
ORDER BY hs.idHistorico DESC, hs.fkSensor LIMIT 4;

select * from historico_sensor order by idHistorico desc;