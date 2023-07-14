const express = require("express");
//const mongodb = require('mongodb');
const {MongoClient} = require('mongodb');

const cors = require("cors");
const assert = require('assert');
const app = express();


async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri = "mongodb://localhost:27017";


  const client = new MongoClient(uri);

  try {
      // Connect to the MongoDB cluster
      await client.connect();

      // Make the appropriate DB calls
      await  listDatabases(client);
      //Fetch one record from a db
      await findOneListingByName(client, "Avengers: Endgame");
           console.log("Connection successful!!!");

        
  } catch (e) {
      console.error(e);
  } finally {
      await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => {console.log(` - ${db.name}`);});

  return databasesList.databases;
};

async function findOneListingByName(client, nameOfListing) {
  const result = await client.db("moviedb").collection("movies").findOne({ name: nameOfListing });

  if (result) {
      console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
      console.log(result);
      return result;
  } else {
      console.log(`No listings found with the name '${nameOfListing}'`);
  }
}

app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
  //console.log("mongod docs to display", mongoDocsToDisplay);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get("/message",async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri); 
     
  await client.connect();
  var dbList = await client.db().admin().listDatabases();
    var tf = [];
    dbList.databases.forEach(db =>{
      tf.push({collectionName:db.name});
    })
       // const result =  await findOneListingByName(client, "The Godfather");
      //  const result = await client.db("moviedb").collection("movies").findOne({ name: "Avengers: Endgame" });
        //const anoRes =  await client.db("game-of-thrones").collection("characters").findOne({ name: "Arya Stark" });
  var lists = await client.db("game-of-thrones").collection("characters").find({}).toArray();
  var tt=[];
  lists.forEach(lst => {
     tt.push(lst.name);
  })
  //res.json({message:"passing db lists", data: tf})
  res.json({message:"list of databases", data: tf})

            //res.status(200).send("hello from message")
            /* const test = await main();
            res.send(test) */
  });  

// This variable is populated in the findDocuments function (see below "Using Mongo")
//var mongoDocsToDisplay = null;

// This line of code will print the collection's documents in the browser,
// when you enter in the browser url bar: http://localhost:3000/mongo


// Using MongoDB:

//const MongoClient = require('mongodb').MongoClient;

/* const url = 'mongodb://127.0.0.1:27017';

const dbName = 'game-of-thrones';
//const conn = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true } );

// Connect to MongoDB server, run the findDocuments function and close the connection.
MongoClient.connect(url, {useUnifiedTopology: true },function(err) {

    assert.equal(null, err);
    console.log('Connected successfully to MongoDB server on port 27017');
    const db = conn.db(dbName);

     findDocuments(db, function() {
        conn.close();
    }); 
});

const findDocuments = function(db, callback) {

  const collection = db.collection('game-of-thrones');

  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log('Found the following documents:');
    console.log(docs)
	mongoDocsToDisplay = docs;
    callback(docs);
  });
}

app.get('/mongo', (req, res) => res.send(
  mongoDocsToDisplay
));

 */







//let MongoClient = require('mongodb').MongoClient;
/* const connectionString = 'mongodb://0.0.0.0:27017'
const dbName = 'testCollection'
let db
 MongoClient.connect(
  connectionString,{useNewUrlParser:true},
  function(err,client){
    if(err){console.log("err",err);
    app.listen(8000, () => {
      console.log(`Server is running on port 8000.`);
    });
  
    }
    
    db = client.db(dbName);
    console.log(`Mongodb Connection :${connectionString}`)
    console.log(`Database: ${dbName}`)
    app.listen(8000, () => {
      console.log(`Server is running on port 8000.`);
    });
   
  }
)   */





/* app.post('/create-data',function(req,res){
  //Sending request to create a data
  db.collection('data').insertOne({text:req.body.text},function(err,info){res.json(info.ops[0])})
}) */
 /*  app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});   */
 /*app.get("/message",function(req,res,next){
  var collection = "meteorites";
   db.collection("meteorites").find({},function(err,docs){
    if(err) return next(err);
    docs.each(function(err,doc){
      if(doc){
        console.log(doc)
      }else{
        res.end();
      }
    })
  }) 

}) */


