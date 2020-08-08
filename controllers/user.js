const UserModel = require('../models/user');


module.exports = {
    register: (req, res) => {
        let data = req.body;
        if (data.email !== "" && data.username !== "" && data.password !== "") {
            UserModel.register(data.email, data.username, data.password).then((result) => {
                if (result.status === 'account created successfully') {
                    req.session.session_data = {
                        email: data.email,
                        username: data.username
                    };
                    res.render('app', { msg: result.status, session_data: { email: data.email, username: data.username } });
                } else {
                    res.render('register', { msg: result.status });
                }
            }).catch((error) => {
                res.json(error);
            });
        } else {
            res.render('register', { msg: 'Please fill all the fields' });
        }
    },
    login: (req, res) => {
        let data = req.body;
        if (data.email !== "" && data.password !== "") {
            // UserModel.login(data.email, data.password).then((result) => {
            //     console.log(result);
            // }).catch((error) => {
            //     console.log(error);
            // })
            UserModel.login(data.email, data.password).then((result) => {
                console.log(result);
                if (result.status === 'authentication succeeded') {
                    req.session.session_data = {
                        email: data.email,
                        username: result.username
                    };
                    res.render('app', { msg: result.status, session_data: { email: data.email, username: result.username } });
                } else {
                    res.render('login', { msg: result.status });
                }
            }).catch((error) => {
                res.send(error);
            });
        }
        else {
            res.render('login', { msg: 'Please fill all the fields' });
        }
    },
    logout: (req, res) => {
        req.session.destroy((error) => {
            if (error) {
                res.send(error);
            }
            else {
                res.render('login');
            }
        });
    }
}