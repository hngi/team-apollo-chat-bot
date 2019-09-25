let chatArea;
let initiallized = false;

// Top Level Variables
let lastGroup = {};

function addMessage(messages, user = false) {
	if (!initiallized)
		throw new Error();
	// create new group if lastGroup is empty or not for the same 'user'
	if ( !(lastGroup.user === user) ) {
		lastGroup.user = user;
		lastGroup.div = document.createElement('div');
		lastGroup.div.className = 'message-group';
		if (user)
			lastGroup.div.classList.add('message-group-user');

		chatArea.appendChild(lastGroup.div);
	}

	// iterate over message array and append messages to last group
	for (let message of messages) {
		let messageDiv = document.createElement('div');
		messageDiv.className = 'message';
		messageDiv.innerText = message;
		let messageContainer = document.createElement('div');
		messageContainer.className = 'message-container';
		messageContainer.appendChild(messageDiv);
		lastGroup.div.appendChild(messageContainer);
	}
}

function init(selctor) {
	chatArea = document.querySelector(selctor);
	initiallized = true;
}

let chat = {
	init,
	addMessage,
};

export { chat };