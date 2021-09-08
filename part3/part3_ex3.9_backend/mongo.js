const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
console.log("this is from mongo.js")
const url =
  `mongodb+srv://fullstack:${password}@cluster0.21jon.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: {
    type:String,
    required: true,
    unique: true
  },
  number: String,
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})


person.save().then(result => {
  console.log(`Added ${result.name} number ${result.number} to phonebook`)
})

console.log("phonebook:")
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})
