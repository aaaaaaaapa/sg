const createChatElem = (name, id) => {

    const li = document.createElement('li');
    const span = document.createElement('span');

    li.classList.add('chat-list-item');
    span.classList.add('lk-text');
    span.textContent = name;

    li.append(span);

    li.setAttribute('data-chat-id', id);

    return li;

}

export const loadChats = (chats) => {

    if (chats) {
        const chatList = document.querySelector('.chat-list');
        chatList.innerHTML = '';
        
        for (const item of chats) {
            const li = createChatElem(item.name, item.chat_id);
            chatList.append(li);
        }
    }

}

export const changeActiveElem = (newElem) => {

    const activeElem = document.querySelector('.active');
    const chatInfo = document.querySelector('.chat-info');
    const chatInput = document.querySelector('.chat-input');

    if (activeElem) activeElem.classList.remove('active');
    
    newElem.classList.add('active');
    chatInfo.style.display = 'flex';
    chatInput.style.display = 'flex';

}


// message


export function addMessage(text, sender, date) {

    const messageElement = document.createElement('div');
    const textMessage = document.createElement('p');
    const senderSpan = document.createElement('span');
    const dateSpan = document.createElement('span');

    messageElement.classList.add('message');
    textMessage.classList.add('message-text');
    senderSpan.classList.add('message-span');
    dateSpan.classList.add('message-span');

    textMessage.textContent = text;
    senderSpan.textContent = sender;
    dateSpan.textContent = date;

    messageElement.append(textMessage, senderSpan, dateSpan);

    return messageElement;

}

export const loadMessages = (messages, currentUserId) => {

    if (messages) {

        const chatMessages = document.getElementById("chat-messages");
        chatMessages.innerHTML = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        for (const item of messages) {
            const message = addMessage(item.text, item.username, item.created_at);
            if (item.id === currentUserId) message.classList.add('current');
            chatMessages.append(message);
        }

    }

}

const createOption = (item) => {

    const option = document.createElement('option');

    option.classList.add('user-option');
    option.value = item.id;
    option.innerText = item.username;

    return option;

}

export const loadUsers = (users) => {

    if (users.length > 0) {

        const usersSelect = document.getElementById('users');
        const submitBtn = document.querySelector('.submit-btn');

        usersSelect.innerHTML = '';
        submitBtn.removeAttribute('disabled');
        
        for (const item of users) {
            const option = createOption(item);
            usersSelect.append(option);
        }

    }

}