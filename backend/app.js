const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const client = new Client({
  user: 'ah7352',
  host: 'pgserver.mah.se',
  database: 'mortforsvitvaror',
  password: 'n52c5oux',
  port: 5432,
});
console.log(client.connect());


var app = express()
// Landing route for application
app.get('/', function (req, res) {
  res.send('tjena kvinnan')
});

app.use(cors({origin: '*'}));

// Fetches articles from database
app.get('/get_articles', async function (req, res) {
  const {rows} = await client.query('select distinct ProduktLagerSaldoPrisInformation.produktid, ProduktLagerSaldoPrisInformation.saldo, ProduktLagerSaldoPrisInformation.säljstyckpris, ProduktInköpsInformation.tillverkare from produktlagersaldoprisinformation inner join produktinköpsinformation on produktlagersaldoprisinformation.produktid=produktinköpsinformation.produktid;')
  console.log(rows);
  res.send(rows);
});

// Customer registration and ...
app.get('/new_order/:id', async function (req, res) {
  var id = req.params.id;

  // Insert into Kundinfo
  await client.query('insert into Kundinfo values (910102, Kuk Hedlund, Adress, Epost)')

  // Insert into Orders
  await client.query('insert into Orders values (OrderID, Datum, Personnummer)')

  // Insert into Kvitto
  await client.query('insert into Kvitto values (OrderID, ProduktID, SäljStyckPris, Antal)')

  // Transaction between Kvitto and ProduktLagerSaldoPrisInformation
  await client.query('begin;')
  await client.query('update kvitto set antal = antal + 'FIXA' where orderid='FIXA';')
  await client.query('update produktlagersaldoprisinformation set saldo = saldo - 'FIXA' where produktid='FIXA';')
  await client.query('commit;')


app.get('/supplier_info', async function (req, res) {
  const {rows} = await client.query('select * from LeverantörsInformation')
  console.log(rows);
  res.send(rows);
});


app.listen(3000, function(){
  console.log("Serverbrush mkt fet bomshakalak!");
});
