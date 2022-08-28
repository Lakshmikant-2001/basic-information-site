const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const basePath = path.join(__dirname, 'src');
  let filePath = path.join(basePath, req.url === '/' ?
    'index.html' : req.url);
  const fileExt = path.extname(filePath);
  let contentType = 'text/html';

  switch (fileExt) {
    case ".js":
      contentType = 'text/javascript';
      break;
    case ".css":
      contentType = 'text/css';
      break;
    case ".svg":
      contentType = 'image/svg+xml';
      break;
  }

  if (contentType === "text/html" && fileExt === "")
    filePath += ".html";

  fs.readFile(filePath, (err, data) => {
    if (err && err.code === 'ENOENT') {
      fs.readFile(path.join(basePath, '404.html'), (err, data) => {
        res.writeHead(404, { "Content-Type": contentType });
        res.end(data);
      })
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  })
})

server.listen(8080, () => {
  console.log(`Server is listening at ${PORT}...`);
})