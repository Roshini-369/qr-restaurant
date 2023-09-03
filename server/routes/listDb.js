const conn = require('../conn')

async function lstDb(){
    // try{
       //conn.dbData.db().admin().listDatabases();
      var dbLists = await conn.db().admin().listDatabases();
       console.log("Databases");
       if(dbLists){
       dbLists.databases.forEach(db => console.log(`- ${db.name}`));
       var dbNames=[];
       dbLists.databases.forEach(db => {dbNames.push(db.name)})
         console.log("you are in",dbNames);
       //return dbLists.databases;
       return dbNames;
       }
       
     
    // }catch(err){
     //  console.log(err)
    // }
     
   }

   module.exports = lstDb;
