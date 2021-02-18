"use strict";

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var PORT = process.env.PORT || 8080;
app.use((0, _cors["default"])());
app.listen(PORT, function () {
  return console.log("Example app listening on ".concat(PORT, "!"));
});
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get('/animals', function (req, res) {
  res.send([{
    name: "Princesa",
    breed: "Criolla",
    gender: "Female",
    isVaccinated: true,
    vaccines: ["rabia", "leucemia", "parvovirus"]
  }, {
    name: "Gus",
    breed: "Criolla",
    gender: "Male",
    isVaccinated: false,
    vaccines: ["rabia", "leucemia", "parvovirus", "Coronavirus"]
  }]);
});
//# sourceMappingURL=index.js.map