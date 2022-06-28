const express = require("express");
const session = require("express-session");
const {join} = require("path");
const { urlencoded, json } = require("body-parser");
const application = express();
const specifiedPort = 3000;

application.use("/assets", express.static(__dirname + `/assets`));
application.use("views", join(__dirname, "views"));
application.set("view engine", "ejs");
application.use(urlencoded({ extended: false }));
application.use(json());

application.listen(specifiedPort, () => console.log("Server successfully initialized."));

function actualizeView(viewName, ...desiredMiddleware) {
    application.get(`/${viewName}`, desiredMiddleware, function(request, response) {
        response.render(viewName);
    });
}