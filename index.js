const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff";

app.get('/', function(req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => console.log("Listening on port " + PORT));