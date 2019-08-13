var express = require('express');
var router = express.Router();
const cheez = require("./models/cheez.js");

// define the home page route
router.get('/', (req, res) => {
  res.send('home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About my app')
})

router.get('/allcheez', (req,res) => {
    cheez.Burger.find({}, (err, items) => { // return all items in array
    if (err) return next(err);
    console.log(items.length);
    if (items) { // res.json sets appropriate status code and response header
    res.json(items);
  } else {
    return res.status(500).send('Error occurred: database error.');
  }
})});

router.get('/cheez/:name', (req, res) => {
      cheez.Burger.findOne({'name':req.params.name}, (err, item) => {
      if (err) return next(err);
      if (item) {
      res.json(item);
    } else {
      return res.status(500).send('Error occurred: database error. NO SUCH BURGER IN DATABASE');
  }})});

router.get('/delete/:name', (req, res) => {
  cheez.Burger.findOne({'name':req.params.name}, (err, item) => {
    if (err) return next(err);
    if (item) {
      item.remove();
      res.json(item + "THIS CHEESEBURGER HAS BEEN DELETED");
    } else {
      return res.status(500).send('Error occurred: database error. NO SUCH BURGER IN DATABASE');
    }})});

router.get('/add/', (req, res) => {
      res.type('text/html');
      res.sendFile(__dirname + '/public/add.html'); 
     });

router.post('/add/', (req, res, next) => {
  console.log(req);
  cheez.Burger.create({'name':req.body.name_field,'restaurant':req.body.rest_field,'price':req.body.price_field}, (err, item) => {
    if (err) return next(err);
    if (item) {
      res.json(item + "YOU HAVE ADDED A NEW CHEESEBURGER");
    } else {
      return res.status(500).send('Error occurred: database error. TOO MANY BURGERS IN THE DATABASE');
    }
  })});



module.exports = router