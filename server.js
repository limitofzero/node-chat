const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime');

const cache = {};

function send404(resp) {
    resp.writeHead(404, {'Content-Type': 'text/plain'});
    resp.write('Error 404: resource not found. Пошел нахуй!');
    resp.end();
}

function sendFile(resp, filePath, fileContents) {
    resp.writeHead(200, {"content-type": mime.lookup(path.basename(filePath))});
    resp.end(fileContents);
}

function serveStatic(resp, cache, absPath) {
    if (cache[absPath]) {
        sendFile(resp, absPath, cache[absPath]);
    } else {
        fs.exists(absPath,exists => {
            if (exists) {
                fs.readFile(absPath,(err, data) => {
                    if(err) {
                        send404(resp);
                    } else {
                        cache[absPath] = data;
                        sendFile(resp, absPath, data);
                    }
                });
            } else {
                send404(resp);
            }
        })
    }
}

const server = http.createServer((request, response)=> {
    const filePath = request.url === '/' ? 'public/index.html' : 'public' + request.url;
    const absPath = './' + filePath;
    serveStatic(response, cache, absPath);
});

server.listen(3000, () => console.log("Server listening on port 3000."));