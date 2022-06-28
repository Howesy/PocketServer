const express = require("express");
const session = require("express-session");
const { urlencoded, json } = require("body-parser");
const { readdir } = require("fs");
const { join } = require("path");
const application = express();
const specifiedPort = 3000;

//Serve all assets within the "assets" folder to the server, so webpages can access them.
application.use("/assets", express.static(__dirname + `/assets`));
//Initialize the ejs view engine, so the server can display this type of webpage.
application.set("view engine", "ejs");
//Use middleware to only allow UTF-8 content in the body.
application.use(urlencoded({ extended: false }));
//Use middleware that only parses JSON content.
application.use(json());

//Initialize a session on the server.
application.use(
    session({
        secret: "YourIncredibleSecretTellNobody",
        resave: false,
        saveUninitialized: false
    })
);

//Serve all views within the "views" directory to the user.
tractualizeViews();

//Initialize server and listen on port: 3000
application.listen(specifiedPort, () => console.log("Server successfully initialized."));

//Actualize view into existence, when called upon on the server; will display the view passed.
function actualizeView(viewName, ...desiredMiddleware) {
    application.get(`/${viewName}`, desiredMiddleware, function(request, response) {
        response.render(viewName);
    });
}

//Traverse views directory and actualize any existing views within with the desired middleware passed.
function tractualizeViews(...desiredMiddleware) {
    const viewDirectory = join(__dirname, "views");
    readdir(viewDirectory, function(error, files) {
        if (error) throw new Error(error);
        files.forEach(function(file) {
            if (file.endsWith(".ejs")) {
                const fileName = file.split(".")[0];
                actualizeView(fileName, desiredMiddleware);
            }
        });
    });
}

//Destroy the current existing session with the provided request object.
function destroySession(request) {
    request.session.destroy(function(error) {
        if (error) throw new Error(error);
    });
}