import { Bot } from "./chatbot.js";
import { addMessage } from "./chat.js";

(function app() {
    // Elements
    let body = document.querySelector("body");
    let nameForm = document.querySelector(".name-form");
    let nameInput = document.querySelector("input[name='name']");

    // Event Listeners
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        body.className = "page-two";
        addMessage(['user', "cats", 24]);
    })

})();