'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// const http = require("http"); 
// const fs = require("fs");
const cheez = require("./cheez.js");
// let qs = require("querystring");

// http.createServer((req,res) => {
//   const path = req.url.toLowerCase();
//   const url = req.url.split("?");
//   const query = qs.parse(url[1]);
//   const bumbum = url[0];

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public')); // set location for static files
app.use(bodyParser.urlencoded({extended: true})); // parse form submissions  

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: false}));
app.set("view engine", ".html");
 
app.post('/detail', (req, res) => {
  let search = req.body.name_field;
  let result = cheez.get(req.body.name_field);
  res.render('detail', {search: search, result: result }); 
});

cheez.add({'name':'whopper','restaurant':'Burger King','price':'6.74'})

app.post('/delete', (req, res) => {
  let ding = req.body.name_field;
  let result = cheez.get(req.body.name_field);
  cheez.dilly(ding);
  let cheezlength = cheez.getAll().length;
  res.render('delete', {ding: ding, result: result, cheezlength: cheezlength }); 
});

app.get('/', (req, res) => {
  res.type('text/html');
  res.sendFile(__dirname + '/public/home.html'); 
 });
 
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About Page');
 });

 app.get('/getall', (req, res) => {
  res.type('text/plain');
  res.send(JSON.stringify(cheez.getAll()));
 });

app.get('/get', (req, res) => {
  let burger = cheez.get(req.query.name);
  let results = (burger) ? JSON.stringify(burger) : "Not found";
  res.send(results);
 });

app.get('/delete', (req, res) => {
  let ding = cheez.get(req.query.name);
  cheez.dilly(req.query.name);
  res.send('Item Deleted ' + ding.name);
 });

app.use( (req,res) => {
  res.type('text/plain'); 
  res.status(404);
  res.send('404 - Not found');
 });

 app.listen(app.get('port'), () => {
  console.log('Express started'); 
 });
 

  //  }
//}).listen(process.env.PORT || 3000);