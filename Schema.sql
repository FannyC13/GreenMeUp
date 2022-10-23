CREATE TABLE Client(
   Lastname VARCHAR(50) NOT NULL,
   Firstname VARCHAR(50) NOT NULL,
   Mail VARCHAR(50) NOT NULL,
   PRIMARY KEY(Mail), 
   password varchar(45) not null
);

CREATE TABLE Plants(
   IDProduct VARCHAR(50),
   Price INT NOT NULL,
   Type VARCHAR(50) NOT NULL,
   Stock INT NOT NULL,
   Description VARCHAR(50) NOT NULL,
   PRIMARY KEY(IDProduct)
);


CREATE TABLE Sell(
   IDSell VARCHAR(50),
   DateS DATE NOT NULL,
   Mail VARCHAR(50),
   IDProduct VARCHAR(50) NOT NULL,
   PRIMARY KEY(IDSell),
   FOREIGN KEY(Mail) REFERENCES Client(Mail),
   FOREIGN KEY(IDProduct) REFERENCES Plants(IDProduct));