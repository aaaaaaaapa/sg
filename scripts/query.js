export const getChats = async (user_id) => {

    const chats = await fetch(`server/get_chats.php?userId=${user_id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error(`Ошибка! Статус: ${response.status}`);
        }
        if (response.text) {
            return await response.json();
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке сообщений:', error);
    });

    if (chats) {
        chats.forEach(item => {
            if (item.type === 'private') {
                item.name = item.members[0];
            }
        });
    
        return chats;
    }

};

export const getMessages = async (chat_id) => {

    const messages = await fetch(`server/get_messages.php?chatId=${chat_id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error(`Ошибка! Статус: ${response.status}`);
        }
        if (response.text) {
            return await response.json();
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке сообщений:', error);
    });


    return messages;

};

export const postMessage = async (chat_id, user_id, text) => {

    await fetch(`server/post_message.php`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        body: JSON.stringify({ chatId: chat_id, userId: user_id, text })
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error(`Ошибка! Статус: ${response.status}`);
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке сообщений:', error);
    });


};

export const getUsers = async (user_id) => {

    const users = await fetch(`server/get_users.php?userId=${user_id}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    })
    .then(async response => {
        if (!response.ok) {
            throw new Error(`Ошибка! Статус: ${response.status}`);
        }
        if (response.text) {
            return await response.json();
        }
    })
    .catch(error => {
        console.error('Ошибка при загрузке сообщений:', error);
    });


    return users;

};


