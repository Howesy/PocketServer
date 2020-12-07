const express = require("express");
const {resolve} = require("path");
const {readdir} = require("fs");
const application = express();
const specifiedPort = 3000;

//Serve static files contained within the public directory.

application.use(express.static("public"));

handleHTMLDocuments();

/**
 * Scan and handle GET requests for HTML documents contained within the current directory.
 * @author Howesy
 */

function handleHTMLDocuments() {
    readdir(__dirname, function(error, documents) {
        if (error) throw new Error(error);
        documents.filter(document => document.endsWith(".html"))
        .forEach(htmlDocument => handlePageRequest(htmlDocument));
    });
}

/**
 * Handle GET request to specified HTML document.
 * @param {string} specifiedPage Desired HTML document to handle a GET request for.
 */

function handlePageRequest(specifiedPage) {
    application.get(`/${specifiedPage}`, function(request, response) {
        const resolvedPath = resolve(__dirname, specifiedPage);
        response.sendFile(resolvedPath);
    });
}

//Initialize the express application to listen on our specified port: [3000] and send a conformation message.

application.listen(specifiedPort, () => console.log("Server successfully initialized."));