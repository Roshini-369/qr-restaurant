const conn = require('../conn')

async function characters(){
    // try{
       //conn.dbData.db().admin().listDatabases();
      var charactersNames = await conn.db('test').collection('characters').find({}).toArray();
      // console.log("Characters");
       if(charactersNames){
       //  console.log("you are in",charactersNames);
      return charactersNames;
       }  
   }

   module.exports = characters;
