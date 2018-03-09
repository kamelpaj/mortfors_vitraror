\set ON_ERROR_STOP on
\c ah7352
drop database if exists mortforsvitvaror;
create database mortforsvitvaror;
\c mortforsvitvaror;
revoke all privileges on database mortforsvitvaror from public;


create table LeverantörsInformation (
  LeverantörID varchar,
  Telefonnummer int,
  Webbadress varchar,

  primary key (LeverantörID)
);

create table ProduktLagerSaldoPrisInformation (
  ProduktID varchar,
  Saldo int,
  SäljStyckPris int,

  primary key (ProduktID)
);


create table ProduktInköpsInformation (
  LeverantörID varchar,
  ProduktID varchar,
  Tillverkare varchar,
  StyckInköpsPris int,

  primary key (ProduktID, LeverantörID),
  foreign key (LeverantörID) references Leverantörsinformation(LeverantörID),
  foreign key (ProduktID) references ProduktLagerSaldoPrisInformation(ProduktID)
);

create table Kundinfo (
  Personnummer int,
  Namn varchar,
  Adress varchar,
  Epost varchar,

  primary key (Personnummer)
);

create table Orders (
  OrderID int,
  Datum date,
  Personnummer int,

  primary key (OrderID),
  foreign key (Personnummer) references Kundinfo(Personnummer)
);


create table Kvitto (
  OrderID int,
  ProduktID varchar,
  SäljStyckpris int,
  Antal int,

  primary key (OrderID, ProduktID),
  foreign key (OrderID) references Orders(OrderID),
  foreign key (ProduktID) references ProduktLagerSaldoPrisInformation(ProduktID)
);


insert into LeverantörsInformation values
  ('Elgiganten', 031149193, 'elgiganten.se'),
  ('SIBA', 042238744, 'siba.se'),
  ('Flugsvamp', null, 'flugsvampoFJfddJg2245G.onion');

insert into ProduktLagerSaldoPrisInformation values
  ('Kylskåp', 2, 2500),
  ('Tvättmaskin', 12, 3000),
  ('Cannabis edibles', 420, 42);

insert into ProduktInköpsInformation values
  ('Elgiganten', 'Kylskåp', 'Siemens', 2000),
  ('SIBA', 'Kylskåp', 'Siemens', 1900),
  ('Flugsvamp', 'Cannabis edibles', null, 420);

insert into Kundinfo values
  (940419, 'Adam Hermansson', 'Östra Promenaden 23', 'haha@kuk.se'),
  (930712, 'Stiffe von Piffe', 'Duvetvart 00', 'ayy@lmao.lol');

insert into Orders values
  (001, '2018-01-03', 940419),
  (002, '2018-02-20', 930712);

insert into Kvitto values
  (001, 'Tvättmaskin', 3100, 2),
  (002, 'Cannabis edibles', 420, 5);
