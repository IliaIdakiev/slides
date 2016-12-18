const port = 3000;
const spdy = require('spdy');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const Readable = require('stream').Readable;
const publicPath = path.resolve(__dirname, '../public/dist/');
const createStream = path => fs.createReadStream(`${path}`);
const bodyParser = require('body-parser');
 
var files = fs.readdirSync(publicPath);
var connections = [];

var options = {
    key: fs.readFileSync(__dirname + '/keys/server.key'),
    cert: fs.readFileSync(__dirname + '/keys/server.crt'),
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const push = (res, path) => fileName => {
    var stream = res.push(path || '/' + fileName, {
        status: 200,
        method: 'GET',
        request: {
            accept: '*/*'
        },
        response: {
            'content-type': 'application/javascript'
        }
    });

    stream.on('error', function (err) {
        console.error(err);
    });

    var fstream = createStream(`${publicPath}/${fileName}`);
    fstream.pipe(stream);
};
const createEventData = (event, data) => `event:${event}\ndata:${data}\n\n`; 

app.get('/chat', (req, res) => {
    var nickname = req.query.nickname;
    console.log(`${nickname} connected`);
    let nullIndex = connections.indexOf(null);
    let connectionIndex = nullIndex !== -1 ? nullIndex : connections.length;
    
    req.socket.on('close', () => {
        connections[connectionIndex] = null;
        console.log(`${connectionIndex} Disconnected`);
    }); 

    res.setHeader('content-type', 'text/event-stream');
    connections.push(res);
    res.write(createEventData('connected', JSON.stringify({ nickname: req.nickname })));
});

app.post('/message', (req, res) => {
    var data = createEventData('new-message', JSON.stringify({ nickname: req.body.nickname, message: req.body.message }));
    connections.filter(x => x).map(res => res.write(data));
    res.status(200).end();
});

app.get('/sw.js', (req, res) => {
    console.log('sw.js');
    res.setHeader('content-type', 'application/javascript');
    res.sendFile(path.resolve(`${publicPath}/../sw.js`));
});

app.get('*', (req, res) => {
    res.sendFile(`${publicPath}/index.html`);
    files.map(push(res));
});

spdy.createServer(options, app).listen(port, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log('Listening on port: ' + port + '.');
    }
});
