console.log("running mySQLconnection.js");

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql.fullstacksteve.com",
  user: "pokerupdater",
  password: "uBVYGIhbfo8HUBILe3IO897qg482b9"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.on('error', function(err) {
  console.log("[mysql error]",err);
});