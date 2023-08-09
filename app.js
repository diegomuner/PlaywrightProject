const http = require('http');

const server = http.createServer((req, res)=>{
 res.end('hola gato');

});

server.listen(3000);