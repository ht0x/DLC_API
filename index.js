var express = require('express');
var app = express();
var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    response.send("OK");
});

app.get('/coolEmo', function(request, response){
   response.send(cool()); 
});

app.get('/times', function(request, response){
    var count = process.env.TIMES;
    var result = '';
    for (i = 0 ; i < count; i++)
       result += i + ' ';
    
    response.send(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

