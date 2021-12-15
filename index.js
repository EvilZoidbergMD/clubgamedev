
const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

//Static Files
app.use(express.static('..'));
app.use('/css', express.static(__dirname + 'css'));
app.use('/js', express.static(__dirname + 'js'));
app.use('/img', express.static(__dirname + 'img'));


app.set('views', './views');
app.set('view engine', 'ejs');


//Views
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => console.log(`Server listening in port ${port}`));
