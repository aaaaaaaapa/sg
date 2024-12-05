import { getChats, getMessages, postMessage, getUsers } from "./query.js";
import { loadChats, changeActiveElem, loadMessages, loadUsers } from "./createElem.js";

const searchInput = document.querySelector('.search-input');
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const createChat = document.getElementById('create-chat');
const modal = document.querySelector('.modal');
const searchInputUser = document.getElementById('user');


let currentUserId = 2;
let currentChatId; 


const findChat = (text, chats) => {

    const filteredChats = chats.filter(item => 
        item.name.toLowerCase().
        includes(text.toLowerCase())
    );

    loadChats(filteredChats);

}

const findUser = (text, users) => {

    const filteredUsers = users.filter(item => 
        item.username.toLowerCase().
        includes(text.toLowerCase())
    );

    loadUsers(filteredUsers);

}

const loadMessagesForChats = async (chatId, currentUserId) => {
    const messages = await getMessages(chatId);
    loadMessages(messages, currentUserId);
}

const sendMessage = () => {

    const text = messageInput.value.trim();

    if (text !== "") {
        messageInput.value = "";
        postMessage(currentChatId, currentUserId, text);
    }

}


document.addEventListener('click', (event) => {
    if (event.target.classList.contains('chat-list-item')) {
        changeActiveElem(event.target);
        currentChatId = event.target.getAttribute('data-chat-id');
        loadMessagesForChats(currentChatId, currentUserId);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    
    const chats = await getChats(currentUserId);
    const users = await getUsers(currentUserId);

    loadChats(chats);
    
    searchInput.addEventListener('input', async () => {
        findChat(searchInput.value, chats);
    });

    searchInputUser.addEventListener('input', async () => {
        findUser(searchInputUser.value, users);
    });

    sendButton.addEventListener("click", () => {
        sendMessage();
        loadMessagesForChats(currentChatId, currentUserId);
    });

    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") sendButton.click();
    });

    createChat.addEventListener('click', () => {
        modal.classList.toggle('dis');
        document.body.classList.toggle('hide');
        searchInputUser.value = '';
        loadUsers(users);
    });

});