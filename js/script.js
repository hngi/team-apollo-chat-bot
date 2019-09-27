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

    // Functions
    function pageTwo() {
        body.className = "two";
    }

    function getTextCallback() {
        messageForm.removeEventListener('click', getTextCallback);
    }

    function questionLoop(...args) {
        messageInput.disabled = true;

        let response = chatbot.next(...args);
        chat.addMessages(response.messages);

        if (response.options) {
            chat.addOptions(response.options, questionLoop);
            return;
        }

        if (response.next) {
            questionLoop();
        } else {
            messageInput.disabled = false;
        }
    }



    // Event Listeners
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        pageTwo();

        questionLoop(nameInput.value);

        //chat.addMessages(['user', "cats", 24], true);
        //chat.addOptions(["yes", "what?", "lol"], (x, o) => console.log(o[x]) );
    });

    messageForm.addEventListener('submit', function(e) {
    	e.preventDefault();

    	chat.addMessages([messageInput.value], true);
        questionLoop(messageInput.value);
    	messageForm.reset();
        messageInput.focus();
    });

})();