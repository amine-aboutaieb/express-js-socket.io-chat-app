const router = require('express').Router();
const PageController = require('../controllers/page');
const UserController = require('../controllers/user');
const ChatModel = require('../models/chat');

router.get('/', (req, res) => {
    PageController.app(req, res);
});

router.get('/register', (req, res) => {
    PageController.register(req, res);
});

router.get('/login', (req, res) => {
    PageController.login(req, res);
});

router.post('/register', (req, res) => {
    UserController.register(req, res);
});

router.post('/login', (req, res) => {
    UserController.login(req, res);
});

router.get('/logout', (req, res) => {
    UserController.logout(req, res);
});

router.get('/api/chatlogs/:sender/:receiver', (req, res) => {
    ChatModel.getChatLogs(req.params.sender, req.params.receiver).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.send(error);
    });
});

module.exports = router;