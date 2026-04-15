CREATE DATABASE IF NOT EXISTS urbpay;
CREATE USER IF NOT EXISTS 'urbpay_user'@'localhost' IDENTIFIED BY 'ff@123';
GRANT ALL PRIVILEGES ON urbpay.* TO 'urbpay_user'@'localhost';
FLUSH PRIVILEGES;

USE urbpay;

CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL,
    telefone VARCHAR(15),
    endereco VARCHAR(50),
    data_nascimento DATE,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    senha VARCHAR(255) NOT NULL,
    status ENUM('ATIVO', 'INATIVO') DEFAULT 'ATIVO',
    foto_perfil VARCHAR(255),

    CONSTRAINT pk_usuarios PRIMARY KEY (id_usuario),
    CONSTRAINT uq_usuarios_email UNIQUE (email),
    CONSTRAINT uq_usuarios_cpf UNIQUE (cpf),
    CONSTRAINT uq_usuarios_telefone UNIQUE (telefone)
);

CREATE TABLE IF NOT EXISTS cartao (
    id_cartao INT AUTO_INCREMENT,
    numero_cartao CHAR(16) NOT NULL,
    cvv CHAR(10) NOT NULL,
    nome_impresso VARCHAR(100),
    saldo DECIMAL(10,2) DEFAULT 0.00,
    data_validade DATE NOT NULL,
    status ENUM('ATIVO', 'BLOQUEADO', 'EXPIRADO') DEFAULT 'ATIVO',
    id_usuario INT NOT NULL,

    CONSTRAINT pk_cartao PRIMARY KEY (id_cartao),
    CONSTRAINT uq_cartao_numero UNIQUE (numero_cartao),
    CONSTRAINT fk_cartao_usuario FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id_usuario),
    CONSTRAINT uq_cartao_usuario UNIQUE (id_usuario)
);

CREATE TABLE IF NOT EXISTS maquina (
    id_maquina INT AUTO_INCREMENT,
    localizacao VARCHAR(150) NOT NULL,
    status ENUM('ATIVA', 'INATIVA', 'MANUTENCAO') DEFAULT 'ATIVA',

    CONSTRAINT pk_maquina PRIMARY KEY (id_maquina)
);

CREATE TABLE IF NOT EXISTS movimentacoes (
    id_movimentacao INT AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    data_movimentacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_operacao ENUM('RECARGA', 'DEBITO') NOT NULL,
    status_operacao ENUM('APROVADO', 'SALDO_INSUFICIENTE', 'RECUSADO') NOT NULL,
    localizacao_operacao VARCHAR(150),
    id_cartao INT NOT NULL,
    id_maquina INT,

    CONSTRAINT pk_movimentacoes PRIMARY KEY (id_movimentacao),
    CONSTRAINT fk_mov_cartao FOREIGN KEY (id_cartao)
        REFERENCES cartao(id_cartao),
    CONSTRAINT fk_mov_maquina FOREIGN KEY (id_maquina)
        REFERENCES maquina(id_maquina),
    CONSTRAINT chk_mov_valor CHECK (valor > 0)
);
