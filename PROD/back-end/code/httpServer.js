const express = require('express');

const httpServer = express();

httpServer.use((req, res) => {
    return res.redirect(process.env.HTTPS_SERVER);
});

module.exports = httpServer;