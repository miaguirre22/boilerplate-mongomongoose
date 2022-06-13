require('dotenv').config();
let mongoose = require("mongoose")

const mySecret = process.env['MONGO_URI']

mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;

const personSchema = new Schema({
  name:  {type: String, required: true}, 
  age: Number,
  favoriteFoods: [String]  
});

let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({"name": "martin", "age": 36, "favoriteFoods": ["pastas", "pizzas"]})
  person.save(function(err, data) {
    if (err) console.error(err)
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) console.error(err)
    done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({"name": personName}, function(err, data) {
    if (err) console.error(err)
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({"favoriteFoods": food}, function(err, data) {
    if (err) console.error(err)
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) console.error(err)
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, person) {
    if (err) console.error(err)
    person.favoriteFoods.push(foodToAdd)
    person.save(function(err, data) {
      if (err) console.error(err)
      done(null, data);    
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, person) {
    if (err) console.error(err)
    done(null, person);      
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) console.error(err)
    done(null, data);    
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
