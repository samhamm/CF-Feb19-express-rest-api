'use strict';

// Bring in the schema for the data
var Pet = require('../models/Pet');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

// Definte the RESTful HTTP behaviors
module.exports = function(app) {
  app.use(bodyParser.json());

  //POST
  app.post('/pets', function(req, res) {
    var newPet = new Pet(req.body);
    newPet.save(function(err, Pet) {
      if (err) return res.status(500).send({'msg': 'error - could not save to pets'});
      res.json(Pet)
    });
  });

  //GET
  app.get('/pets', function(req, res) {
    Pet.find({}, function(err, data){
      if (err) return res.status(500).send({'msg': 'error - could not retrieve pets'});
      res.json(data);
    });
  });

  //PUT
  app.put('/pets/:id', function (req, res) {
    var updatedPet = req.body;
    delete updatedPet._id;
    Pet.update({_id: req.params.id}, updatedPet, function(err) {
      if (err) return res.status(500).send({'msg': 'error updating pets'});
      res.json(req.body);
    });
  });

  //PATCH
  app.patch('/pets/:id', function(req, res) {

  });

  //DELETE
  app.delete('/pets', function (req, res){

  });

}; //closes the module.exports