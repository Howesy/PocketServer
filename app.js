const express = require("express");
const {readdir, access} = require("fs");
const application = express();
const specifiedPort = 3000;

//Serve static files contained within the public directory.
application.use(express.static("public"))


//Handle wildcard routing dynamically and account for errors with custom error handler.
application.get("*", function(request, response, next) {
    const [requestedPage] = Object.values(request.params);
    const constructedPath = __dirname + requestedPage;
    access(constructedPath, function(error) {
        if (error) next(error);
        response.sendFile(constructedPath);
    });
});

//Define our own custom error handler.
application.use(function(error, request, response, next) {
    console.error(error.stack);
    response.status(500).send(error.stack);
});

//Initialize the express application to listen on our specified port: [3000] and send a conformation message.
application.listen(specifiedPort, () => console.log("Server successfully initialized."));