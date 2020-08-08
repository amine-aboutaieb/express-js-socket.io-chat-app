const pool = document.getElementById('pool');
let poolItems;
let users;
document.body.onload = () => {
    let socket = io();
    socket.on('connect', () => {
        socket.emit('connection-data', { username });
    });
    socket.on('users-list', (data) => {
        users = data.users;
        listUsers(data.users);
        // console.log(data);
    });
    socket.on('add-user', (data) => {
        // console.log(`to add ${data.username}`);
        users.push(data);
        addUser(data);
    });
    socket.on('rm-user', (data) => {
        // console.log(`to remove ${data.username}`);
        users.forEach((item, index) => {
            if (item.id === data.id) {
                users.splice(index, 1);
            }
        });
        rmUser(data);
        // users.push(data);
    });
}

function listUsers(users) {
    users.forEach((item, index) => {
        pool.innerHTML += `<button id='${item.id}' class='pool-item'>${item.username}</button>`;
        poolItems = document.querySelectorAll('.pool-item');
    });
}

function addUser(user) {
    pool.innerHTML += `<button id='${user.id}' class='pool-item'>${user.username}</button>`;
    poolItems = document.querySelectorAll('.pool-item');
}

function rmUser(data) {
    poolItems.forEach((item, index) => {
        if (item.id === data.id) {
            pool.removeChild(pool.children[index]);
        }
    });
    poolItems = document.querySelectorAll('.pool-item');
}