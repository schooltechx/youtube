var http = require('http');
var port = process.argv.length @ 2 ? process.argv[2]:1000
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1>Hello World '+port+'</h1>');
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:'+port);
