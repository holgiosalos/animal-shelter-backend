"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
var animals = [{
  name: "Manchas",
  breed: "Bengali",
  gender: "Female",
  isVaccinated: true,
  vaccines: ["rabia", "leucemia", "parvovirus"]
}];
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.listen(PORT, function () {
  return console.log("Example app listening on ".concat(PORT, "!"));
});
app.get('/', function (req, res) {
  res.send('Animals Shelter API!');
});
app.get('/animals', function (req, res) {
  res.send(animals);
});
app.post('/animals', function (req, res) {
  var animal = req.body;

  if (!animals.some(function (e) {
    return e.name.toUpperCase() === animal.name.toUpperCase();
  })) {
    animals.push(animal);
    res.status(201).send(animal);
  } else {
    res.status(409).json({
      message: 'The animal has already been created'
    });
  }
});
app.put('/animals/:name', function (req, res) {
  var name = req.params.name;
  var _req$body = req.body,
      breed = _req$body.breed,
      gender = _req$body.gender,
      isVaccinated = _req$body.isVaccinated,
      vaccines = _req$body.vaccines;
  var filteredAnimal = animals.filter(function (animal) {
    return animal.name.toUpperCase() === name.toUpperCase();
  });

  if (filteredAnimal.length > 0) {
    filteredAnimal[0].breed = breed;
    filteredAnimal[0].gender = gender;
    filteredAnimal[0].isVaccinated = isVaccinated;
    filteredAnimal[0].vaccines = vaccines;
    animals.splice(animals.findIndex(function (animal) {
      return animal.name.toUpperCase() === name.toUpperCase();
    }), 1, filteredAnimal[0]);
    res.status(200).send(animals.filter(function (animal) {
      return animal.name.toUpperCase() === name.toUpperCase();
    })[0]);
  } else res.status(404).json({
    message: "Animal with the name ".concat(name, " not found")
  });
});
app["delete"]('/animals/:name', function (req, res) {
  var name = req.params.name;
  var filteredAnimal = animals.filter(function (animal) {
    return animal.name.toUpperCase() === name.toUpperCase();
  });

  if (filteredAnimal.length > 0) {
    animals.splice(animals.findIndex(function (animal) {
      return animal.name.toUpperCase() === name.toUpperCase();
    }), 1);
    res.status(200).json({
      message: "Animal deleted successfully"
    });
  } else res.status(404).json({
    message: "Animal with the name ".concat(name, " not found")
  });
});
app.get('/animals/:name', function (req, res) {
  var name = req.params.name;
  var filteredAnimal = animals.filter(function (animal) {
    return animal.name.toUpperCase() === name.toUpperCase();
  });

  if (filteredAnimal.length > 0) {
    animals.splice(animals.findIndex(function (animal) {
      return animal.name.toUpperCase() === name.toUpperCase();
    }), 1);
    res.status(200).send(filteredAnimal[0]);
  } else res.status(404).json({
    message: "Animal with the name ".concat(name, " not found")
  });
});
//# sourceMappingURL=index.js.map