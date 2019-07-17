const http = require("http"); 
const fs = require("fs");
const cheez = require("./cheez.js");
let qs = require("querystring");
http.createServer((req,res) => {
  const path = req.url.toLowerCase();
  const url = req.url.split("?");
  const query = qs.parse(url[1]);
  const bumbum = url[0];
  switch(bumbum) {
    case '/':   
      fs.readFile("public/home.html", (err, data) => {
      if (err) return console.error(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data.toString());
   });
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('About page');
      break;
    case '/getall':
      res.end(JSON.stringify(cheez.getAll()));
      break;
    case '/get':
      let burger = cheez.get(query.name);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      let results = (burger) ? JSON.stringify(burger) : "Not found";
      res.end(results);
      break;
    case '/delete':
      let ding = cheez.get(query.name);
      cheez.dilly(query.name);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Item Deleted ' + ding.name);
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Not found');
      break;
    }
}).listen(process.env.PORT || 3000);