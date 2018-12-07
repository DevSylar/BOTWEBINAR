const express = require("express");
const bodyParser = require("body-parser");
const routers = require("./lib/routes.js");
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.get("/",routers.validarFacebook);

app.post("/",routers.responderFacebook);

app.listen(3000);

