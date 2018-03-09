const express = require('express');
const { Client } = require('pg');

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

// Fetches articles from database
app.get('/get_articles', async function (req, res) {
  const {rows} = await client.query('select distinct ProduktLagerSaldoPrisInformation.produktid, ProduktLagerSaldoPrisInformation.saldo, ProduktLagerSaldoPrisInformation.säljstyckpris, ProduktInköpsInformation.tillverkare from produktlagersaldoprisinformation inner join produktinköpsinformation on produktlagersaldoprisinformation.produktid=produktinköpsinformation.produktid;')
  console.log(rows);

  res.send(rows);
});

// app.post('/new_order', async function (req, res) {
//   const {  }
// });


app.listen(3000, function(){
  console.log("Serverbrush mkt fet bomshakalak!");
});
