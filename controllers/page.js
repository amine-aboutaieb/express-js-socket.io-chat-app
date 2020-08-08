

module.exports = {
    app: (req, res) => {
        if (req.session.session_data) {
            let data = req.session.session_data;
            res.render('app', { session_data: { email: data.email, username: data.username } });
        } else {
            res.render('login');
        }
    },
    register: (req, res) => {
        if (req.session.session_data) {
            let data = req.session.session_data;
            res.render('app', { session_data: { email: data.email, username: data.username } });
        } else {
            res.render('register');
        }
    },
    login: (req, res) => {
        if (req.session.session_data) {
            let data = req.session.session_data;
            res.render('app', { session_data: { email: data.email, username: data.username } });
        } else {
            res.render('login');
        }
    }
}