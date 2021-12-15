
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

//Static Files
app.use(express.static('static'));
app.use('/static', express.static(__dirname + 'static'));

//Views
app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});

app.listen(port, () => console.log(`Server listening in port ${port}`));
