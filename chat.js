// Elements
let chatArea = document.querySelector('.chat-area');

// Top Level Variables
let lastGroup = {};
//console.log(lastGroup.user);
console.log("Sam")

function addMessage(messages, user = false) {
	//if (lastGroup.user) {
		
	//}
	for (let message of messages) {
		let messageDiv = document.createElement('div');
		messageDiv.innerText = message;
	}
}

export addMessage;