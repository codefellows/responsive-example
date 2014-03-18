var http = require('http');
var fs = require('fs');

function fourOhFour(res)
{
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404');
}

http.createServer(function (req, res) {
  if (/^\/$/.test(req.url))
  {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html'));
  }
  else if (/^\/images\//.test(req.url))
  {
    try
    {
      image = fs.readFileSync(__dirname + req.url);
    }
    catch (error)
    {
      return fourOhFour(res);
    }
    
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(image);
  }
  else
  {
    fourOhFour(res);
  }
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');