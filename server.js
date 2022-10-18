const path = require('path');
const express = require('express');
app = express();
const port = process.env.PORT || 3000;
app.use(express.static('src/'));

app.get('/stl', function(req, res) {
    try {
        res.sendFile(__dirname + '/src/stl.html');
    } catch (err) {}
});

app.get('/vrml', function(req, res) {
    try {
        res.sendFile(__dirname + '/src/vrml.html');
    } catch (err) {}
});

app.get('/*', function(req, res) {
    try {
        res.sendFile(__dirname + '/src/index.html');
    } catch (err) {}
});

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

process.on('SIGINT', () => {
    process.exit(0);
});


app.use(express.static(path.join(__dirname, 'src/')));

app.listen(port, '0.0.0.0');