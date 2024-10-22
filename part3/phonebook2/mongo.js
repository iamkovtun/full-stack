const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  phone: String
})

const Persone = mongoose.model('Person', personSchema)


const connectToMongo = () =>  {
  const password = process.argv[2]
  const url = `mongodb+srv://egorkovtun11:${password}@cluster0.rxpst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery')
  mongoose.connect(url)
}

if (process.argv.length < 3) {
  console.log('give a password as an argument ')
  process.exit(1)
}

else if (process.argv.length === 3) {
  connectToMongo()
  Persone.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.phone)
    })
    mongoose.connection.close()
  })

}

else if (process.argv.length === 5) {
  connectToMongo()
  const name = process.argv[3]
  const phone = process.argv[4]

  const person = new Persone({ name:name,phone:phone })

  person.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  console.log('incorrect command')
}



