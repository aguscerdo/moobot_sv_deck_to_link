const express = require('express');
const path = require('path');
const sv_handler = require('./deck_to_link.js');

const PORT = process.env.PORT || 5000;

app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pages/index'));
app.get('/sv_deck', (req, res) =>
    sv_handler.process_request(req)
    .then(function(ret) {
        res.send(ret)}));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
