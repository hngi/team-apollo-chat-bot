import { bot } from "./chatbot.js";
import { chat } from "./chat.js";

(function app() {
    // Elements
    let body = document.querySelector("body");
    let nameForm = document.querySelector(".name-form");
    let nameInput = document.querySelector("input[name='name']");
    let messageForm = document.querySelector(".message-form");
    let messageInput = document.querySelector("input[name='message']");

    //initiallization
    chat.init('.chat-area');
    let chatbot = bot();

    // Event Listeners
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        body.className = "two";
        let { message } = chatbot.next(nameInput.value);
        chat.addMessage([message]);
        //chat.addMessage(['user', "cats", 24], true);
        //chat.addOptions(["yes", "what?", "lol"], (x, o) => console.log(o[x]) );
    });

    messageForm.addEventListener('submit', function(e) {
    	e.preventDefault();

    	chat.addMessage([messageInput.value], true);
    	messageForm.reset();
    });

})();