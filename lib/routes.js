
const tryMessages = require("./tryMessages");

module.exports = class bot {

    static validarFacebook(req, res){
        const VERIFY_TOKEN = "JavierWebinar";
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        if (mode && token)
            if (mode == 'subscribe' && token == VERIFY_TOKEN)
                res.status(200).send(challenge);
            else
                res.sendStatus(403);
        else 
        	res.send("No deberias estar aquí !!!!");
    }

    static responderFacebook(req, res){
        const data = req.body;
        if (data.object == "page")
            data.entry.forEach(function(entry) {
                if (entry.messaging)
                    entry.messaging.forEach(function(messaging) {
                        if (messaging.postback) {
                            let msg = messaging.postback;
                            if (msg.payload)
                                tryMessages(msg.payload, messaging.sender.id);
                        }
                        if (messaging.message) {
                            let msg = messaging.message;
                            if (msg.text)
                                tryMessages(msg.text, messaging.sender.id);
                        }
                    });
            })
        res.send("");
    }

}