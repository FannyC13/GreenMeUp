CREATE TABLE clients (
  mail VARCHAR(50) NOT NULL,
  password VARCHAR(100) NULL,
  lastname VARCHAR(50) NULL,
  firstname VARCHAR(50) NULL,
  PRIMARY KEY (mail));

CREATE TABLE plants (
  idplants INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price DOUBLE NOT NULL,
  description MEDIUMTEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY (idplants),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE);

  CREATE TABLE cart (
  idcart int NOT NULL,
  mail varchar(50) NOT NULL,
  idplants int NOT NULL,
  quantity int NOT NULL
)