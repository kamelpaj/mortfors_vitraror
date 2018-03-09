const express = require('express');
const { Client } = require('pg');

const client = new Client({
  user: 'ah7352',
  host: 'pgserver.mah.se',
  database: 'mortforsvitvaror',
  password: 'n52c5oux',
  port: 5432,
});
client.connect();


var app = express()
// Landing route for application
app.get('/', function (req, res) {
  res.send('tjena kvinnan')
});

// Fetches articles from database
app.get('/get_articles', async function (req, res) {
  const {articles} = await client.query('select distinct ProduktLagerSaldoPrisInformation.produktid, ProduktLagerSaldoPrisInformation.saldo, ProduktLagerSaldoPrisInformation.säljstyckpris, ProduktInköpsInformation.tillverkare from produktlagersaldoprisinformation inner join produktinköpsinformation on produktlagersaldoprisinformation.produktid=produktinköpsinformation.produktid;')
  console.log(articles);
  res.send(articles);
});



app.listen(3000, function(){
  console.log("Serverbrush mkt fet bomshakalak!");
});


// client.query('select * from anstalld;', function(err, res) {
//   console.log(err, res);
//   client.end();
// });

// const text = 'SELECT * from PROJEKT';
// window.text = text;
