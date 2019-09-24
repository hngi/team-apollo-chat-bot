/***** Message Handlers *****/
// The following functions manipulate the DOM, they handle the display of messages

let createBotButtons = (speechArr) => {
    let x = 0
    let buttonHolder = document.createElement("div")
    buttonHolder.className ="button"
    for (let speech of speechArr){
        x++
        let speechElem = document.createElement("button");
        speechElem.innerText = speech;
        speechElem.value = `${x}`
        speechElem.className = "btn btn-light"
        speechElem.addEventListener("click", (e) => handleResponse(e))
        buttonHolder.appendChild(speechElem)
    }
    parentElem.appendChild(buttonHolder)
}

let talkToUser = (message) => {
    let messageContainer = document.createElement("div");
    messageContainer.innerHTML = `<p>${message}</p>`;
    messageContainer.className = "message row"
    parentElem.appendChild(messageContainer)
}

/***** End of Message Handlers *****/