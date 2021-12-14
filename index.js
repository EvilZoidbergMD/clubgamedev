
const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('static'));


app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
});

app.get('/installation.html', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('installation.html').pipe(res);
});

app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
