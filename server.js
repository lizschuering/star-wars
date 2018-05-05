var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.envPORT || 3000;

//app.get('/', (req, res) => res.send('Hello World!'));

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Data
// ===========================================================
var characters = [{
  routeName: "yoda",
  name: "Yoda",
  role: "Jedi Master",
  age: 900,
  forcePoints: 2000
}, {
  routeName: "darthmaul",
  name: "Darth Maul",
  role: "Sith Lord",
  age: 200,
  forcePoints: 1200
}, {
  routeName: "obiwankenobi",
  name: "Obi Wan Kenobi",
  role: "Jedi Knight",
  age: 60,
  forcePoints: 1350
}];

// Routes
// ===========================================================
app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
  
    //response.send('Welcome to the Star Wars page');
    //console.log('Home Page');
});

// API Routes
// ===========================================================
app.get('/api/:characters', function (request, response) {
  return response.json(characters);
  
  //var chosen = request.params.character;
  //console.log(chosen);
  //response.end();
});

app.get('/api/:characters/:character', function (request,response) {
  // Connect to DB and make a sequelize call to the DB to get Yoda
  var chosen = request.params.character;
  console.log(chosen);

  for (i=0; i < characters.length; i++) {
    if (chosen == characters[i].routeName) {
      response.json(characters[i]);
    }
  }

  return response.send('No character found');

});

// Create New Characters
// ===========================================================

app.post('/api/characters', function (request, response) {
  var newCharacter = request.body;
  characters.push(newCharacter);
  //console.log(request.body);

  response.json(newCharacter);
  console.log(newCharacter);

})

// Listener
// ===========================================================
  app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});