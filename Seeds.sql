INSERT INTO client (Lastname, Firstname, Mail, password) VALUES 
('Machard', 'Paul', 'pmachard@gmail.com', 'tennis94'),
('Le', 'Julian', 'julian.le@efrei.net', 'Guluff'),
('Billebaut', 'Arthur', 'arthur.billebaut2@gmail.com', 'ArthB'), 
( 'Brancolini','Lucas', 'lucas.brancolini@gmail.com', 'Nox'), 
( 'Trappeurs','Nox', 'nox.mignon@gmail.com', 'nox123'), 
('Chang', 'Fanny', 'fanny.chang@gmail.com', 'Fanny');

INSERT INTO plants (IDProduct, Price, Type, Stock, Description) VALUES
('Orch_Phal', '50', 'Orchid', '8', 'Moth orchid (Phalaenopsis)'),
('Cact_Fairy', '9', 'Cactus', '13', 'Fairy Castle Cactus (Acanthocereus tetragonus)'),
('Cact_Gold', '10', 'Cactus', '16', 'Golden Barrel Cactus (Echinocactus grusonii)'),
('Carni_Venus', '12', 'Carnivorous', '5', 'Venus Flytrap');

INSERT INTO sell (IDSell, DateS, Mail, IDProduct) VALUES 
('S1', '2022-05-17', 'julian.le@efrei.net', 'Orch_Phal'),
('S2', '2022-05-24', 'lucas.brancolini@gmail.com', 'Cact_Gold'),
('S3', '2022-06-02', 'julian.le@efrei.net', 'Carni_Venus'),
('S4', '2022-06-02', 'pmachard@gmail.com', 'Cact_Gold'),
('S5', '2022-08-24', 'lucas.brancolini@gmail.com', 'Carni_Venus'),
('S6', '2022-09-24', 'julian.le@efrei.net', 'Cact_Fairy'),
('S7', '2022-08-24', 'arthur.billebaut2@gmail.com', 'Orch_Phal'),
('S8', '2022-08-24', 'lucas.brancolini@gmail.com', 'Cact_Gold');
