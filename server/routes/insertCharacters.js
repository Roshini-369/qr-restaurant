
const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//working without function
 client.connect().then(() =>{
  console.log("connection is successful");
  const newUser = {
    name: 'Alice Smith',
    // Other fields
  };
  
  db.collection('characters').insert(newUser, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Character added:', result.ops[0]);
  });
}).catch((err) =>{
  console.log("Connection Failed",err);
}) 

module.exports = client;



  