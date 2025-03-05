const path = require('path');
const fs = require('fs');

// Handles errors by sending an appropriate response
function handleError(res, errorCode, message) {
    res.statusCode = errorCode;
    res.write(message);
    res.end();
}

// Parses the request body and converts it into URLSearchParams format
function parseBody(req, callback) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        callback(new URLSearchParams(body));
    });
}

// Returns the content type based on the file extension
function getContentType(filePath) {
    const ext = path.extname(filePath).toLowerCase();

    switch (ext) {
        case '.html': return 'text/html';
        case '.css': return 'text/css';
        case '.js': return 'application/javascript';
        case '.png': return 'image/png';
        case '.jpg': 
        case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        case '.ico': return 'image/x-icon';
        case '.json': return 'application/json';
        case '.svg': return 'image/svg+xml';
        default: return 'application/octet-stream';
    }
}

// Serves static files by reading and sending their content
function serveStaticFile(filePath, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = err.code === 'ENOENT' ? 404 : 500;
            res.end(err.code === 'ENOENT' ? '404 Not Found' : '500 Internal Server Error');
        } else {
            res.setHeader('Content-Type', getContentType(filePath));
            res.end(data);
        }
    });
}

module.exports = { serveStaticFile, getContentType, parseBody, handleError };
