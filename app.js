const express = require("express");
const {resolve} = require("path");
const {readdir} = require("fs");
const application = express();
const specifiedPort = 3000;

application.use(express.static("public"));

handleHTMLDocuments();

function handleHTMLDocuments() {
    readdir(__dirname, function(error, documents) {
        if (error) throw new Error(error);
        documents.filter(document => document.endsWith(".html"))
        .forEach(htmlDocument => handlePageRequest(htmlDocument));
    });
}

function handlePageRequest(specifiedPage) {
    application.get(`/${specifiedPage}`, function(request, response) {
        const resolvedPath = resolve(__dirname, specifiedPage);
        response.sendFile(resolvedPath);
    });
}

application.listen(specifiedPort, () => console.log("Server successfully initialized."));