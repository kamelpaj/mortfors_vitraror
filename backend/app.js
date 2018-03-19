const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const uuidv4 = require('uuid/v4');

const client = new Client({
  user: 'ah7352',
  host: 'pgserver.mah.se',
  database: 'mortforsvitvaror3',
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

// Searches for a product with user input from front-end
app.get('/search', async function (req, res) {
  var search = req.query.search;
  const {rows} = await client.query("select distinct ProduktLagerSaldoPrisInformation.produktid, ProduktLagerSaldoPrisInformation.saldo, ProduktLagerSaldoPrisInformation.säljstyckpris, ProduktInköpsInformation.tillverkare from produktlagersaldoprisinformation inner join produktinköpsinformation on produktlagersaldoprisinformation.produktid=produktinköpsinformation.produktid where ProduktLagerSaldoPrisInformation.produktid='"+search+"' or ProduktInköpsInformation.tillverkare='"+search+"';")
  console.log(rows);
	res.send(rows);
});


// Fetches articles from database
app.get('/get_articles', async function (req, res) {
  const {rows} = await client.query('select distinct ProduktLagerSaldoPrisInformation.produktid, ProduktLagerSaldoPrisInformation.saldo, ProduktLagerSaldoPrisInformation.säljstyckpris, ProduktInköpsInformation.tillverkare from produktlagersaldoprisinformation inner join produktinköpsinformation on produktlagersaldoprisinformation.produktid=produktinköpsinformation.produktid;')
  console.log(rows);
  res.send(rows);
});

// Customer registration and ...
app.get('/new_order/', async function (req, res) {
  var personnummer = req.query.personnummer;
  var namn = req.query.namn;
  var adress = req.query.adress;
  var epost = req.query.epost;

  var produktid = req.query.produktid;
  var antal = req.query.antal;
  const {rows} = await client.query("select SäljStyckPris from ProduktLagerSaldoPrisInformation where ProduktID='" + produktid + "';")
  console.log(produktid);
  console.log(rows[0].säljstyckpris);
  const säljstyckpris = rows[0].säljstyckpris

  // const {rows} = await client.query(query)

  var orderid = Math.floor(Math.random() * 1000000);
  var datum = (new Date()).toISOString().substring(0, 10);



  // Insert into Kundinfo
  await client.query(
    "insert into Kundinfo values ("
    + personnummer + ", '"
    + namn + "', '"
    + adress + "', '"
    + epost + "');"
  );

  // Insert into Orders
  console.log('datum', datum);
	console.log('datum type', typeof(datum));
  await client.query(
    "insert into Orders values ('"
    + orderid + "', '"
    + datum + "', "
    + personnummer + ");"
  );

  // Insert into Kvitto
  await client.query(
    "insert into Kvitto values ('"
    + orderid + "', '"
    + produktid + "', "
    + säljstyckpris + ", "
    + antal + ");"
  );

	// TODO:
  // Transaction between Kvitto and ProduktLagerSaldoPrisInformation
  await client.query('begin;')
  await client.query('update kvitto set antal = ' + antal + ' where orderid=' + orderid + ';')
  await client.query("update produktlagersaldoprisinformation set saldo = saldo - "+ antal +" where produktid='"+ produktid +"';")
  await client.query('commit;')

  res.send("uDUNno");

})

app.get('/supplier_info', async function (req, res) {
  const {rows} = await client.query('select * from LeverantörsInformation')
  console.log(rows);
  res.send(rows);
});

app.get('/kvitto', async function (req, res) {
  const {rows} = await client.query("select kvitto.produktid, kvitto.antal, orders.datum, kvitto.säljstyckpris, kvitto.orderid from kvitto inner join orders on orders.orderid=kvitto.orderid;")
})

app.listen(3000, function(){
  console.log("Serverbrush mkt fet bomshakalak!");
});
