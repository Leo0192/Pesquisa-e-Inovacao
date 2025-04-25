-- banco de dados trabalho vit agro

CREATE DATABASE vitagro;

USE vitagro;

-- Empresa
CREATE TABLE empresa (
    id_empresa INT PRIMARY KEY AUTO_INCREMENT,
    nome_empresa VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    email_institucional VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(15)
);

-- Usuário da plataforma
CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome_usuario VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    senha_hash VARCHAR(255) NOT NULL,
    token_autenticacao VARCHAR(100) UNIQUE,
    id_empresa INT,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Plantação
CREATE TABLE plantacao (
    id_plantacao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    endereco VARCHAR(150),
    hectares INT NOT NULL,
    id_empresa INT,
    FOREIGN KEY (id_empresa) REFERENCES empresa(id_empresa)
);

-- Grupo de sensores
CREATE TABLE grupo (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nome_grupo VARCHAR(100),
    localizacao VARCHAR(50),
    id_plantacao INT,
    FOREIGN KEY (id_plantacao) REFERENCES plantacao(id_plantacao)
);

-- Sensor (modelo único: DHT11)
CREATE TABLE sensor (
    id_sensor INT PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(10) DEFAULT 'Ativo',
    data_instalacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    localizacao VARCHAR(50),
    id_grupo INT,
    CONSTRAINT chk_status_sensor CHECK (status IN ('Ativo', 'Inativo')),
    FOREIGN KEY (id_grupo) REFERENCES grupo(id_grupo)
);


-- Histórico de medições
CREATE TABLE historico_sensor (
    id_historico INT PRIMARY KEY AUTO_INCREMENT,
    id_sensor INT,
    umidade DECIMAL(5,2),
    data_medicao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sensor) REFERENCES sensor(id_sensor)
);

-- Alertas
CREATE TABLE alerta (
    id_alerta INT PRIMARY KEY AUTO_INCREMENT,
    id_historico INT,
    mensagem VARCHAR(255) NOT NULL,
    FOREIGN KEY (id_historico) REFERENCES historico_sensor(id_historico)
);


-- inserindo dados na empresa
INSERT INTO empresa (nome_empresa, cnpj, email_institucional, telefone)
VALUES 
('AgroSoluções Ltda', '12345678000195', 'contato@agrosolucoes.com.br', '(62)91234-5678'),
('VerdeCampo S.A.', '98765432000188', 'suporte@verdecampo.com', '(65)99876-5432');


-- inserindo dados em usuários da plataforma
INSERT INTO usuario (nome_usuario, cpf, email, telefone, senha_hash, token_autenticacao, id_empresa)
VALUES 
('Lucas Andrade', '12345678900', 'lucas@agrosolucoes.com.br', '(62)91111-2222', 'hash_senha1', 'token123lucas', 1),
('Ana Beatriz Costa', '98765432100', 'ana@verdecampo.com', '(65)92222-3333', 'hash_senha2', 'token456ana', 2);


-- inserindo dados Plantações
INSERT INTO plantacao (nome, endereco, hectares, id_empresa)
VALUES 
('Fazenda Campo Verde', 'Rodovia BR-153, km 98 - Itumbiara/GO', 150, 1),
('Fazenda Boa Esperança', 'Rodovia MT-242, km 75 - Sorriso/MT', 200, 2);


-- inserindo dados Grupos de sensores
INSERT INTO grupo (nome_grupo, localizacao, id_plantacao)
VALUES 
('Grupo A - Leste', '-18.421350, -49.215680', 1),
('Grupo B - Oeste', '-12.512345, -55.785690', 2);


-- inserindo dados sensores (modelo DHT11)
INSERT INTO sensor (status, localizacao, id_grupo)
VALUES 
('Ativo', '-18.421300, -49.215600', 1),
('Ativo', '-18.421320, -49.215640', 1),
('Ativo', '-12.512300, -55.785600', 2),
('Ativo', '-12.512320, -55.785640', 2);


-- inserindo dados Histórico de medições
INSERT INTO historico_sensor (id_sensor, umidade, data_medicao)
VALUES 
(1, 39.75, '2025-04-08 08:00:00'),
(1, 42.10, '2025-04-08 10:00:00'),
(2, 45.60, '2025-04-08 08:30:00'),
(3, 37.20, '2025-04-08 09:00:00'),
(4, 49.10, '2025-04-08 11:30:00');


-- Alertas com base nos históricos
INSERT INTO alerta (id_historico, mensagem)
VALUES 
(1, 'Alerta: Umidade abaixo de 40% detectada (39.75%).'),
(4, 'Alerta Crítico: Umidade crítica (37.20%).');