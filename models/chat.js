const con = require('./db_config').db;


module.exports = {
    addChatMsg: (sender, receiver, msg) => {
        con.query(`INSERT INTO chat_logs VALUES(NULL,
            (SELECT id FROM users WHERE username LIKE '${sender}'),
            (SELECT id FROM users WHERE username LIKE '${receiver}'),
            '${msg}',
            NOW());`, (error) => {
            console.log(error);
        });
    },
    getChatLogs: (u1, u2) => {
        return new Promise((resolve, reject) => {
            con.query(`SELECT (SELECT username FROM users WHERE id LIKE sender) AS sender,msg,sent_time FROM chat_logs WHERE sender IN (SELECT id FROM users WHERE username IN('${u1}','${u2}')) 
            AND
            receiver IN (SELECT id FROM users WHERE username IN('${u1}','${u2}')) ORDER BY sent_time `, (error, data) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
}