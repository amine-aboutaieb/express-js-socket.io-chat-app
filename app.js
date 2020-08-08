const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5500;
const path = require('path');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const routes = require('./routes/routes');


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    store: new LokiStore({}),
    secret: 'mytopsecretsecret',
    resave: true,
    saveUninitialized: true
}));

app.use('/', routes);
app.use((req, res) => {
    res.render('error', { errorCode: 404, errorMsg: `this path '${req.url}' could not be found` });
});


server.listen(port, () => {
    console.log(`listening on port ${port}`);
});