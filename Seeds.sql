INSERT INTO client (Lastname, Firstname, Mail) VALUES 
('Machard', 'Paul', 'pmachard@gmail.com'),*/
('Le', 'Julian', 'julian.le@efrei.net'),
('Billebaut', 'Arthur', 'arthur.billebaut2@gmail.com'), 
( 'Brancolini','Lucas', 'lucas.brancolini@gmail.com'), 
('Chang', 'Fanny', 'fanny.chang@gmail.com');

INSERT INTO plants (IDProduct, Price, Type, Stock, Description) VALUES
('Orch_Phal', '50', 'Orchid', '8', 'Moth orchid (Phalaenopsis)'),
('Cact_Fairy', '9', 'Cactus', '13', 'Fairy Castle Cactus (Acanthocereus tetragonus)'),
('Cact_Gold', '10', 'Cactus', '16', 'Golden Barrel Cactus (Echinocactus grusonii)'),
('Carni_Venus', '12', 'Carnivorous', '5', 'Venus Flytrap');

INSERT INTO sell (IDSell, DateS, IDClient, IDProduct) VALUES 
('S1', '2022-05-17', 'CL-4', 'Orch_Phal'),
('S2', '2022-05-24', 'CL-2', 'Cact_Gold'),
('S3', '2022-06-02', 'CL-3', 'Carni_Venus'),
('S4', '2022-06-02', 'CL-3', 'Cact_Gold'),
('S5', '2022-08-24', 'CL-2', 'Carni_Venus'),
('S6', '2022-09-24', 'CL-5', 'Cact_Fairy'),
('S7', '2022-08-24', 'CL-1', 'Orch_Phal'),
('S8', '2022-08-24', 'CL-1', 'Cact_Gold');
