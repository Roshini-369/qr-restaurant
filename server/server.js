const express = require("express");
const cors = require("cors");
//const assert = require('assert');
const app = express();
//const mongodb = require('./mongodb');
//const conn = require('./conn')
//const {MongoClient} = require('mongodb');
const lstDbs = require('./routes/listDb.js');
const chrLists = require('./routes/characters.js');
const conn = require('./conn.js');

//const uri = "mongodb://localhost:27017";
//const client = new MongoClient(uri);
/*async function listDbs(){
 // try{
    //conn.dbData.db().admin().listDatabases();
   var dbLists = await conn.db().admin().listDatabases();
    console.log("dbLIsts",dbLists);
    console.log("Databases");
    dbLists.databases.forEach(db => console.log(`- ${db.name}`))
    return dbLists.databases;
 // }catch(err){
  //  console.log(err)
 // }
  
}*/


app.use(cors());
app.use(express.json());

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/getDbLists',async(req,res) => {  
  res.json({message:"Database lists", data: await lstDbs()});
})

app.get('/api/getCharacters',async(req,res) => {  
  res.json({message:"Characters Lists", data: await chrLists()});
})

app.post('/api/insertCharacters',async(req, res) => {
  const dataInsert = req.body;
    const result = await conn.db('test').collection('characters').insertOne(dataInsert);

   // res.json({ message: 'User added successfully', insertedId: result.insertedId });
 // } catch (error) {
 //   console.error('Error:', error);
 //   res.status(500).json({ message: 'Server Error' });
 // }

  res.json({ message: 'Data inserted successfully' });
});


/*app.get('/message',async(req,res) => {
  var dbLst = await listDbs();
  //conn.connect;
  //conn.db('moviedb').collection('characters');
  var dbNames=[];
  dbLst.forEach(db => {dbNames.push({dbName:db.name})})
  console.log("you are in",dbNames);
  res.json({message:"Database lists", data: dbNames})
})*/

/* app.get("/message",async (req, res) => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri); 
     
  await client.connect();
  var dbList = await client.db().admin().listDatabases();
    var tf = [];
    dbList.databases.forEach(db =>{
      tf.push(db.name);
    })
       // const result =  await findOneListingByName(client, "The Godfather");
      //  const result = await client.db("moviedb").collection("movies").findOne({ name: "Avengers: Endgame" });
        //const anoRes =  await client.db("game-of-thrones").collection("characters").findOne({ name: "Arya Stark" });
  var lists = await client.db("game-of-thrones").collection("characters").find({}).toArray();
  var tt=[];
  lists.forEach(lst => {
     tt.push({characterName:lst.name});
  })
  //res.json({message:"passing db lists", data: tf})
  res.json({message:"passing game-of-thrones characters", data: tt})

            //res.status(200).send("hello from message")
            
  });   */

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


