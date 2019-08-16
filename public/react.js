"use strict";

const tingle = [];
for (var i = 0; i < cheezes.length; i++) {
    tingle.push(React.createElement("a", {
    href:'http://localhost:3000/routes/cheez/' + cheezes[i], 
    key:i, 
    className: "cheezlist",
  }, cheezes[i]));
};

const ringle = React.createElement("div", {className: "ringle"}, tingle);

ReactDOM.render(ringle, document.getElementById('root') );

