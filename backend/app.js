const express = require('express');
const { Client } = require('pg');

var app = express()
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('tjena mannen')
});


app.listen(3000, function(){
  console.log("Serverbrush mkt fet bomshakalak!");
});

const client = new Client({
  user: 'ah7352',
  host: 'pgserver.mah.se',
  database: 'bizznizz',
  password: 'n52c5oux',
  port: 5432,
});
client.connect();

client.query('select * from anstalld;', function(err, res) {
  console.log(err, res);
  client.end();
});

// const text = 'SELECT * from PROJEKT';
// window.text = text;
