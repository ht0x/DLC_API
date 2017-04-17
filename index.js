var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
var bodyParser = require('body-parser');
var DLC_Info = "DLC_INFO"; 
var db;

app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

mongodb.MongoClient.connect(process.env.MONGOLAB_URI, function(error, database){
   if (error)
   {
       console.log(error);
       process.exit(1);
   }
    
   db = database;
   console.log("Database connection is ready!");
    
   var server = app.listen(app.get('port'), function() {
        console.log('App is running on port', app.get('port'));
    });
    
});

/*
    *DLC Json Info*
    
    {
        "DLC_VERSION": <dateTime>,
        "DLC_SERVER_URL": <string>
    }
*/


function handleError(response, reason, message, code)
{
    console.log("Error: " + reason);
    response.status(code || 500).json({"error": message});
}

app.get('/', function(request, response) {
    response.send("Status: Ok");
});

app.get('/coolEmo', function(request, response){
   response.send(cool()); 
});

app.get('/directory', function (request, response){
    
});

app.post('/directory', function(request, response){
    var newDLCInfo = response.body;
    
    if (!newDLCInfo.DLC_VERION){
            handleError(response, "Invalid DLC Version", "Must provide a DLC version", 400);
        }
    else 
        {
            db.collection(DLC_Info).insertOne(newDLCInfo, function(error, response){
                if (error)
                    {
                        handleError(response, error.message, "Failed to create new DLC Info");
                    }
                else 
                    res.status(201).json(response.ops[0]);
            })
        }
});

app.delete('/directory', function(request, response){
    
});

