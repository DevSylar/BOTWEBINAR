var request = require('request');
const config = require("./../config.js");
var usuarios = {};

function send(id,array){
    
  if (!usuarios[id]) {
    usuarios[id] = 0;
  } 
	
  request({
    url:'https://graph.facebook.com/v2.6/me/messages',
    method:'POST',
    qs:{"access_token":config.facebook.TOKEN},
    json:array[usuarios[id]]
	},(err,res,data)=>{

    	if(res.statusCode == 200){
      		usuarios[id] += 1;
      		if(array.length == usuarios[id]){
        		delete usuarios[id];
    		}
    		else{
        		send(id,array);
    		}
    		     	
    	}
  });

}


module.exports = send;

