create database vitagro;
use vitagro;

create table Empresa(
	id int primary key auto_increment,
    nome varchar(60) not null,
    cnpj varchar(14) not null
);

create table Usuario(
	id int primary key auto_increment,
	fkempresa int not null,
    nome varchar(45) not null,
    cpf varchar(11) not null,
    email varchar(50) not null,
    senha varchar(20) not null,
    foreign key (fkempresa) references Empresa(id)
);

create table Grupo_Sensor(
	id int primary key auto_increment,
    endereco varchar(60) not null,
	fkempresa int not null,
    foreign key (fkempresa) references Empresa(id)
);

create table Unidade_Sensor(
	id int primary key auto_increment,
    fkgrupo_sensor int not null,
    data_coleta datetime default current_timestamp(),
    umidade decimal(4,2),
    foreign key (fkgrupo_sensor) references Grupo_Sensor(id)
);

insert into Empresa (nome, cnpj)
values
	('AgroTech Soluções', '12345678000199'),
	('VerdeCampo Ltda', '98765432000177');

insert into Usuario (fkempresa, nome, cpf, email, senha)
values
	(1, 'João Silva', '12345678901', 'joao@agrotech.com', 'senha123'),
	(1, 'Maria Souza', '98765432100', 'maria@agrotech.com', 'abc12345'),
	(2, 'Carlos Lima', '32165498700', 'carlos@verdecampo.com', 'verde@123');

insert into Grupo_Sensor (endereco, fkempresa)
values
	('Fazenda Boa Esperança - Zona Rural, MG', 1),
	('Sítio Recanto Verde - Linha Verde, SP', 2);

insert into Unidade_Sensor (fkgrupo_sensor, umidade)
values
	(1, 55.40),
	(1, 58.25),
	(2, 61.10),
	(2, 59.90);

select * from Empresa;
select * from Usuario;
select * from Grupo_Sensor;
select * from Unidade_Sensor;

select
	u.id,
	u.nome as "Funcionário",
    u.cpf,
    u.email,
    e.nome as "Razão Social",
    e.cnpj
from Usuario u inner join Empresa e on u.fkempresa = e.id;

select
	gs.endereco as "Localização",
	us.fkgrupo_sensor as "grupo",
    us.id as "unidade",
    us.umidade,
    us.data_coleta
from Grupo_Sensor gs inner join Unidade_Sensor us on gs.id = us.fkgrupo_sensor;