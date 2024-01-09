const http = require('http')

http.createServer((req, res) => {
    res.end('Hello NodeJS');
}).listen(5000, () => console.log("Server is running!"))