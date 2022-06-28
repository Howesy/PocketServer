const express = require("express");
const session = require("express-session");
const { urlencoded, json } = require("body-parser");
const application = express();
const specifiedPort = 3000;

application.use("/assets", express.static(__dirname + `/assets`));
application.set("view engine", "ejs");
application.use(urlencoded({ extended: false }));
application.use(json());

application.use(
    session({
        secret: "YourIncredibleSecretTellNobody",
        resave: false,
        saveUninitialized: false
    })
);

actualizeView("index");

application.listen(specifiedPort, () => console.log("Server successfully initialized."));

function actualizeView(viewName, ...desiredMiddleware) {
    application.get(`/${viewName}`, desiredMiddleware, function(request, response) {
        response.render(viewName);
    });
}

function destroySession(request) {
    request.session.destroy(function(error) {
        if (error) throw new Error(error);
    });
}