import { Bot } from "./chatbot.js";
import { chat } from "./chat.js";

(function app() {
    // Elements
    let body = document.querySelector("body");
    let nameForm = document.querySelector(".name-form");
    let nameInput = document.querySelector("input[name='name']");

    //initiallization
    chat.init('.chat-area');

    // Event Listeners
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        body.className = "two";
        //chat.addMessage(['user', "cats", 24], true);
        //chat.addOptions(["yes", "what?", "lol"], (x, o) => console.log(o[x]) );
    })

})();