var express = require('express');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var artists = [];
fetch("http://artists.freeiz.com/artists.json")
.then(function(response){
  console.log("Artists loaded from server.");
  return response.json();
})
.then(function(data){
  artists = data;
});

app.get('/', function (req, res) {
  res.send('Hello my friend');
})

app.get('/artists', function (req, res) {
  res.send(artists);
})

app.get('/artists/:id', function (req, res) {
  console.log(req.params);
  var artist = artists.find(function (artist) {
   return artist.id === Number(req.params.id)
  });
  res.send(artist);
})

app.post('/artists', function (req, res) {
  var artist = {
   id: Date.now(),
   name: req.body.name
  };
  artists.push(artist);
  res.send(artist);
})

app.put('/artists/:id', function (req, res) {
  var artist = artists.find(function (artist) {
   return artist.id === Number(req.params.id)
  });
  artist.name = req.body.name;
  res.send(artist);
})

app.listen(3012, function () {
  console.log('API app started')
})