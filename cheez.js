let cheez = [
    {name: 'bigmac', restaurant: 'McDonalds', price: 3.99},
    {name: 'doublestack', restaurant: 'Wendys', price: 2.09},
    {name: 'double', restaurant: 'Great State Burgers', price: 8.50},
    {name: 'monsterthickburger', restaurant: 'Hardees', price: 7.29},
    {name: 'baconcheeseburger', restaurant: 'Rain City Burgers', price: 7.69}
  ];

  exports.getAll = () => {
    return cheez;
  };

  exports.add = (whopper) => {
    if (module.exports.get(whopper.name)) {
    console.log ("Whopper already in database!");
    } else {
    cheez.push(whopper);
    console.log( "Whopper Added to Database!");
    }};

  exports.get = (name) => {
    let found = cheez.find((item) => {
      return item.name === name;
    });
    return found;
  };

  exports.dilly = (name) => {
      let dong = cheez.filter((bro) => {
        return name != bro.name;
       });
      cheez = dong;
    };