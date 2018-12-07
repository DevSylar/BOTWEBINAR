
const watson = require('watson-developer-cloud');
const fs = require("fs");
const config = require("./config.js");
const buildMessages = require("./sendMessage/buildMessage.js");
const sendMessages = require("./sendMessage/sendMessage.js");
const assistant = new watson.AssistantV1(config.watson);

const contexts = {};

module.exports = tryMessages;

function tryMessages(message,id){
	let context = {};
	if(contexts[id])
		context = contexts[id];
	assistant.message({
			workspace_id: "",
			input: {'text': message},
			context:context
	},(err, response)=>{
		if (err)
			console.log(err);
		else{
			contexts[id] = response["context"];
			let arrayMessages = [];
			response["output"]["text"].forEach((item)=>{
				arrayMessages.push(buildMessages.text(id,item));
			});
			sendMessages(id,arrayMessages);
		}

	});
}