const express = require("express");
const {resolve} = require("path");
const application = express();
const specifiedPort = 3000;

application.use(express.static("public"));

handlePageRequest("index.html");

function handlePageRequest(specifiedPage) {
    application.get(`/${specifiedPage}`, function(request, response) {
        const resolvedPath = resolve(__dirname, specifiedPage);
        response.sendFile(resolvedPath);
    });
}

application.listen(specifiedPort, () => console.log("Server successfully initialized."));