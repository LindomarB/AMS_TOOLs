const express = require('express');

const httpServer = express();

httpServer.use('*', (req, res) => {
    return res.redirect('https://amstools.cargill.com');
});

httpServer.listen(81);