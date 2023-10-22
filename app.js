const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Check if the request is for a specific URL, for example, '/WebPage/homePage.html'
  if (req.url === '/WebPage/homePage.html') {
    // Build the full file path
    const filePath = path.join(__dirname, 'WebPage', 'homePage.html');

    // Read the content of the HTML file
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // Handle any errors, such as the file not being found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      } else {
        // Send the HTML content as the response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle other requests or URLs
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
