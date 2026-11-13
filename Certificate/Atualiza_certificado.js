    const fs = require("fs");
    const https = require("https");
   

    const options = {
        
        cert: fs.readFileSync("C:/AMS Tools/Certificate/amstoolscargillcom.pfx", "utf8")
        
    };

    https.createServer(options, (req,res) => {
	res.writeHead(200);
	res.end("Servidor HTTPS ativo!");
        
    }).listen(443, () => console.log("Servidor ativo com novo certificado"));
   