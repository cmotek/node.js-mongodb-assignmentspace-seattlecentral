const mongoose = require('mongoose');
const credentials = require("../credentials.js");

// remote db connection settings. For security, connectionString should be in a separate file not committed to git

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connectionString, { dbName: 'aj_db', useNewUrlParser: true }); 

mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');

  const mySchema = mongoose.Schema({
    name: { type: String, required: true },
    restaurant: String,
    price: Number
   }); 

   var Burger = mongoose.model('Burger', mySchema, 'cheez');
   exports.Burger = Burger;
  

   //var burger1 = new Burger({ name:'bigmac', restaurant:'McDonalds', price: 3.99 });
   //var burger2 = new Burger({ name:'doublestack', restaurant: 'Wendys', price: 2.09});
   //var burger3 = new Burger({ name:'double', restaurant: 'Great State Burgers', price: 8.50});
   //var burger4 = new Burger({ name:'monsterthickburger', restaurant: 'Hardees', price: 7.29});
   //var burger5 = new Burger({ name:'baconcheeseburger', restaurant: 'Rain City Burgers', price: 7.69});

       // save model to database (I did one for each burger)
       // burger3.save(function (err, Burger) {
       // if (err) return console.error(err);
       // console.log(Burger.name + " saved to cheez collection.");
      //});

});
 