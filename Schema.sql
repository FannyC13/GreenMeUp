CREATE TABLE greenmeup.clients (
  mail VARCHAR(50) NOT NULL,
  password VARCHAR(100) NULL,
  lastname VARCHAR(50) NULL,
  firstname VARCHAR(50) NULL,
  PRIMARY KEY (mail));

CREATE TABLE greenmeup.plants (
  idplants INT NOT NULL,
  name VARCHAR(50) NOT NULL,
  price DOUBLE NOT NULL,
  description MEDIUMTEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  stock INT NOT NULL,
  PRIMARY KEY (idplants),
  UNIQUE INDEX name_UNIQUE (name ASC) VISIBLE);