-- Tabela do Projeto
CREATE TABLE IF NOT EXISTS `clientes` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  nome varchar(255) NOT NULL,
  ativo BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;