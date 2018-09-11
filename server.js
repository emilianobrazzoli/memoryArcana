
		var memory = require('./memory.js');   // for local


var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



var port = process.env.PORT || 8080;

var router = express.Router();


router.get('/',function(req,res){
  res.json({message:'Welcome to api'});
});


router.route('/getchannel/:channel_id/:token')
.get(function(req, res){
  if(process.env.SECRET != req.params.token){
    console.log('bad request! ' + req.params.token);
    res.send("bad request!");
    return;
  }else{
    console.log('Server get service: ' + req.params.channel_id);
    var channel = req.params.channel_id;
    try {
      var result =memory.getChannel(channel );
      console.log('Server getchannel respond: ' + result);
      res.json(result);
    } catch(error) {
      console.log('Server getchannel error: ' + error);
      res.send(error);
    };
  }
});


router.route('/setchannel/:token')
.post(function(req,res){
  if(process.env.SECRET != req.params.token){
    console.log('bad request! ' + req.params.token);
    res.send("bad request!");
    return;
  }else{
    console.log('Server post service: ' + req.body);
    var channel = req.body;
    try {
      var result =memory.setChannel(channel.id, channel );
      console.log('Server setchannel respond: ' + result);
      res.json(result);
    } catch(error) {
        res.send(error);
    };
  }
});

app.use('/api', router);

app.listen(port);
console.log('Server started on ' + port);
