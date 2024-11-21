import { getChats, getMessages, postMessage } from "./query.js";
import { loadChats, changeActiveElem, loadMessages } from "./createElem.js";

const searchInput = document.querySelector('.search-input');
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

let currentUserId = 1;
let currentChatId; 


const findChat = (text, chats) => {

    const filteredChats = chats.filter(item => 
        item.name.toLowerCase().
        includes(text.toLowerCase())
    );

    loadChats(filteredChats)

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
    loadChats(chats);
    
    searchInput.addEventListener('input', async () => {
        findChat(searchInput.value, chats);
    });

    sendButton.addEventListener("click", () => {
        sendMessage();
        loadMessagesForChats(currentChatId, currentUserId);
    });

    messageInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") sendButton.click();
    });

});