const pool = document.getElementById('pool');
let chatBox = document.getElementById('chat-box');
let target = document.getElementById('target');
let poolItems;
let users;
let lastTarget;
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
        setLastTarget(data);
        users.forEach((item, index) => {
            if (item === data) {
                users.splice(index, 1);
            }
        });
        rmUser(data);
        // users.push(data);
    });
}

function listUsers(users) {
    users.forEach((item, index) => {
        pool.innerHTML += `<button id='${item}' class='pool-item'>${item}</button>`;
        poolItems = document.querySelectorAll('.pool-item');
    });
    setPoolItemsClick(poolItems);
}

function addUser(user) {
    pool.innerHTML += `<button id='${user}' class='pool-item'>${user}</button>`;
    poolItems = document.querySelectorAll('.pool-item');
    setPoolItemsClick(poolItems);
    updateAddUser(user);
}

function rmUser(data) {
    poolItems.forEach((item, index) => {
        if (item.id === data) {
            pool.removeChild(pool.children[index]);
        }
    });
    poolItems = document.querySelectorAll('.pool-item');
    setPoolItemsClick(poolItems);
}

function setPoolItemsClick(items) {
    items.forEach((item) => {
        item.onclick = () => {
            chatBox.style.display = 'block';
            target.innerText = "";
            target.innerText = item.id;
            lastTarget = item.id;
        }
    });
}

function updateAddUser(user) {
    console.log(lastTarget, user);
    if (user === lastTarget) {
        chatBox.style.display = 'block';
        target.innerText = '';
        target.innerText = user;
    }

}

function setLastTarget(user) {
    console.log(target.innerText, user);
    if (chatBox.style.display === 'block') {
        if (target.innerText === user) {
            lastTarget = user;
            chatBox.style.display = 'none';
        }
    }
}