
const {MongoClient} = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

//working without function
 client.connect().then(() =>{
  console.log("connection is successful");
}).catch((err) =>{
  console.log("Connection Failed",err);
}) 

module.exports = client;



  