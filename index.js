'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const app = express();


// const http = require("http"); 
// const fs = require("fs");
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

const cheez = require("./models/cheez.js");
const routes = require("./routes.js");

app.use('/routes', routes, require('cors')());

app.post('/detail', (req, res) => {
  cheez.Burger.findOne({'name': req.body.name_field}, (err, item) => {
    let search = req.body.name_field;
    let result = item;
    if (err) return next(err);
    res.render('detail', {search: search, result: result }); 
})});

app.post('/delete', (req, res) => {
  cheez.Burger.findOne({'name': req.body.name_field}, async (err, item) => {
    let ding = req.body.name_field;
    let result = item;
    await item.remove(); 
    if (err) return next(err); 
  cheez.Burger.find({}, (err, items) => {
      if (err) return next(err);
      let cheezlength = items.length;
      res.render('delete', {ding: ding, result: result, cheezlength: cheezlength }); 
  })
})});

app.get('/', (req, res) => {
  cheez.Burger.find({}, (err, items) => {
    if (err) return next(err);
    res.render('home', {items: items}); 
})});
 
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About Page');
 });

 app.get('/getall', (req, res) => {
  cheez.Burger.find({}, (err, items) => {
    if (err) return next(err);
    console.log(items.length);
    res.type('text/plain');
    res.send(JSON.stringify(items));
  })});
  

//app.get('/get', (req, res) => {
//  let burger = cheez.get(req.query.name);
//  let results = (burger) ? JSON.stringify(burger) : "Not found";
//  res.send(results);
// });

//app.get('/delete', (req, res) => {
//  let ding = cheez.get(req.query.name);
//  cheez.dilly(req.query.name);
//  res.send('Item Deleted ' + ding.name);
// });

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