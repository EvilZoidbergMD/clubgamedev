
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

//Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'css'));
app.use('/js', express.static(__dirname + 'js'));
app.use('/res', express.static(__dirname + 'res'));


app.set('views', './views');
app.set('view engine', 'ejs');


//Views
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/index.html', (req, res) => {
    res.render('index');
});

app.get('/installation.html', (req, res) => {
    res.render('installation');
});

app.get('/coding.html', (req, res) => {
    res.render('coding');
});

app.get('/art.html', (req, res) => {
    res.render('art');
});

app.get('/examples.html', (req, res) => {
    res.render('examples');
});

app.get('/coding/new-project.html', (req, res) => {
    res.render('new-project');
});

app.listen(port, () => console.log(`Server listening in port ${port}`));
