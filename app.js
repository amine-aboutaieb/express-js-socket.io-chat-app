const express = require('express');
const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5500;
const io = require('socket.io')(server);
const path = require('path');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const routes = require('./routes/routes');
let available_users = [];


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


io.on('connection', (socket) => {
    let users = [];
    available_users.forEach((item, index) => {
        users.push(item.username);
    });
    socket.emit('users-list', { users });
    socket.on('connection-data', (data) => {
        available_users.push({ username: data.username, id: socket.id });
        socket.broadcast.emit('add-user', data.username);
    });
    socket.on('disconnect', () => {
        available_users.forEach((item, index) => {
            if (item.id === socket.id) {
                available_users.splice(index, 1);
                socket.broadcast.emit('rm-user', item.username);
            }
        });

        console.log(available_users);
    });
});