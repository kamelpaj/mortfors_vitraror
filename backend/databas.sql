\set ON_ERROR_STOP on
drop database if exists mortforsvitvaror3;
create database mortforsvitvaror3;
\c mortforsvitvaror3;
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
  OrderID serial,
  Datum date,
  Personnummer int,

  primary key (OrderID),
  foreign key (Personnummer) references Kundinfo(Personnummer)
);


create table Kvitto (
  OrderID serial,
  ProduktID varchar,
  SäljStyckpris int,
  Antal int,

  primary key (OrderID, ProduktID),
  foreign key (OrderID) references Orders(OrderID),
  foreign key (ProduktID) references ProduktLagerSaldoPrisInformation(ProduktID)
);


insert into LeverantörsInformation values
  ('elgiganten', 031149193, 'elgiganten.se'),
  ('siba', 042238744, 'siba.se'),
  ('flugsvamp', null, 'flugsvampoFJfddJg2245G.onion');

insert into ProduktLagerSaldoPrisInformation values
  ('kylskåp', 2, 2500),
  ('tvättmaskin', 12, 3000),
  ('cannabis edibles', 420, 42);

insert into ProduktInköpsInformation values
  ('elgiganten', 'kylskåp', 'siemens', 2000),
  ('siba', 'kylskåp', 'siemens', 1900),
  ('flugsvamp', 'cannabis edibles', null, 420);

insert into Kundinfo values
  (940419, 'adam hermansson', 'östra promenaden 23', 'haha@kuk.se'),
  (930712, 'stiffe von piffe', 'duvetvart 00', 'ayy@lmao.lol');

insert into Orders values
  (DEFAULT, '2018-01-03', 940419),
  (DEFAULT, '2018-02-20', 930712);

insert into Kvitto values
  (DEFAULT, 'tvättmaskin', 3100, 2),
  (DEFAULT, 'cannabis edibles', 420, 5);
