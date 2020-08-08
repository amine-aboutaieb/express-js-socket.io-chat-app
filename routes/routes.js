const router = require('express').Router();
const PageController = require('../controllers/page');
const UserController = require('../controllers/user');

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


module.exports = router;