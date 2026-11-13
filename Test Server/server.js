const path = require('path');
const https = require('https');
const fs = require('fs');

const express = require('express');

const httpServer = require('./httpServer.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public', 'CTI Tool', 'data')));

app.use("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'CTI Tool', 'data', 'index.html'));
});

const server = https.createServer({
    key: fs.readFileSync('amstoolscargillcomkey.pem'),
    cert: fs.readFileSync('amstoolscargillcomcert.pem')
}, app);

server.listen(444);