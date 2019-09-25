import * from "./chatbot.js";
import * from "./chat.js";

(function app() {
    // Elements
    let body = document.querySelector("body");
    let nameForm = document.querySelector(".name-form");
    let nameInput = document.querySelector("input[name='name']");

    // Event Listeners
    nameForm.addEventListener('submit', function(e) {
        e.preventDefault();

        body.className = "page-two";
    })

})();