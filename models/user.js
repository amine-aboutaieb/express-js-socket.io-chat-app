const user = require('../controllers/user');

const con = require('./db_config').db;


module.exports = {
    register: (email, username, pwd) => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT COUNT(*) AS emailnum FROM users WHERE email LIKE '${email}'`, (error, ecResult) => {
                if (error) {
                    reject(error);
                }
                else {
                    if (ecResult[0].emailnum !== 0) {
                        resolve({ status: 'email exists' });
                    }
                    else {
                        con.query(`SELECT COUNT(*) AS usernamenum FROM users WHERE username LIKE '${username}'`, (error, ucResult) => {
                            if (error) {
                                reject(error);
                            }
                            else {
                                if (ucResult[0].usernamenum !== 0) {
                                    resolve({ status: 'username exists' });
                                }
                                else {
                                    con.query(`INSERT INTO users values(NULL,'${email}','${username}','${pwd}',NOW());`, (error) => {
                                        if (error) {
                                            reject(error);
                                        }
                                        else {
                                            resolve({ status: 'account created successfully' });
                                        }
                                    });
                                }
                            }
                        });
                    }

                }
            });
        });
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT * FROM users WHERE email LIKE '${email}' AND pwd LIKE '${password}';`, (error, result) => {
                if (error) {
                    console.log("A DATABASE ERROR HAS OCCURED !!!!!!");
                    reject(error);
                }
                else {
                    if (result.length === 1) {
                        resolve({ status: 'authentication succeeded', username: result[0].username });
                    }
                    else if (result.length === 0) {
                        resolve({ status: 'authentication failed' });
                    }

                }
            });
        });
    }
}