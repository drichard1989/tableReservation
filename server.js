var express = require ("express");
var path = require ("path");
var bodyParser = require ("body-parser");


var app = express();
var PORT = 3000;

//Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: "application/vnd.api+json"}));


var guestList = [];

var waitList = [];
app.get("/", function (req, res){
  res.sendFile(path.join(__dirname, "home.html"))
})

app.get("/table", function (req, res){
  res.sendFile(path.join(__dirname, "table.html"))
})

app.get("/reservation", function (req, res){
  res.sendFile(path.join(__dirname, "reservation.html"))
})

app.get("/reservationapi", function (req, res){
  res.json(guestList);
})

app.get("/waitlist", function (req, res){
  res.json(waitList);
})

app.post("/table", function(req, res){
  guestList=[];
  waitList=[];
  res.send("Success!")
})

app.post("/api/reservation", function(req, res){
  var newResevation = req.body;

  if(guestList.length <= 4){
    guestList.push(newResevation);
    }else{
      waitList.push(newResevation);
    }
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
