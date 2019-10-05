import { chatbot } from "./chat.js";

// Get DOM elements.
let nameForm = document.querySelector(".name-form");
let nameInput = document.querySelector("input[name='name']");

let messageForm = document.querySelector(".message-form");
let messageInput = document.querySelector("input[name='message']");

let chatArea = document.querySelector('.chat-area');

/**An object that holds a container for a set of contiguous messages from the same source. */
let lastGroup = {};

/**A refrence to the earliest unread message. The chat should not autoscroll past this message. */
let unreadTop;

/** Add a new mesage to the chat screen.
 * @param messages - An array of messages to print.
 * @param user - Boolean. Optional. True if message is from the user.
 */
function addMessages(messages, user = false) {
	// Create new group if lastGroup is empty or not for the same 'user'
	if ( !(lastGroup.user === user) ) {
		lastGroup.user = user;
		lastGroup.div = document.createElement('div');
		lastGroup.div.className = 'message-group';

		if (user)
			lastGroup.div.classList.add('message-group-user');

		chatArea.appendChild(lastGroup.div);
	}

	// Iterate over message array and append messages to lastGroup
	for (let message of messages) {
		let messageDiv = document.createElement('div');
		messageDiv.className = 'message';
		messageDiv.innerText = message;
		let messageContainer = document.createElement('div');
		messageContainer.className = 'message-container';
		messageContainer.appendChild(messageDiv);
		lastGroup.div.appendChild(messageContainer);
	}

	// Scroll to the top of the latest message group.
	unreadTop = lastGroup.div;
	unreadTop.scrollIntoView();
}

/** Add preset option buttons for questions with specific options. */
function addOptions(options, callback) {
	let optionGroup = document.createElement('div');
	optionGroup.className = 'option-group';

	for (let [key, option] of options.entries()) {
		let optionButton = document.createElement('button');
		optionButton.className = 'option';
		optionButton.innerText = option;
		optionButton.value = key;

		optionButton.onclick = (e)=> {
			chatArea.removeChild(optionGroup);
			addMessages([options[e.target.value]], true);
			callback(e.target.value);
		};

		optionGroup.appendChild(optionButton);
	}
	chatArea.appendChild(optionGroup);
	optionGroup.scrollIntoView(); //Bring the options into view so the users knows to click and not type...
	unreadTop.scrollIntoView(); //...However, make sure no new message from the bot is scolled out of view.
}

/** Get's a response from the bot depending on an input.
 * @param input may be userData or new message from the user.
 */
function questionLoop(input) {
	let response = chatbot.next(input);
	addMessages(response.messages);

	if (response.options) {
		addOptions(response.options, questionLoop);
		return;
	}

	if (response.next)
		questionLoop();
}

messageForm.onsubmit = (e)=> {
	e.preventDefault();

	addMessages([messageInput.value], true);
	questionLoop(messageInput.value);
	messageForm.reset();
	messageInput.focus();
}

/** Gets user data stored in browser cookie.
 * @returns userData object containing the stored user information.
 * @returns false if no stored data is found.
 * */
const getCookieData = ()=> {
	const nameFilter = (item)=> item.trim().startsWith('name=');

	let cookieData = document.cookie.split('; ');
	let storedName = cookieData.filter(nameFilter);

	if (storedName.length) {
		let userData = {};

		// Split the cookieData into attribute:value pairs in the userData object.
		for (let i = 0; i < cookieData.length; i++) {
			// datum - /ˈdeɪtəm/ - noun:- A piece of information.
			let cookieDatum = cookieData[i].split('='),
					attribute = cookieDatum[0],
					value = cookieDatum[1];
			userData[attribute] = value;
		}

		return userData;
	}

	else return false;
}

const startChat = ()=> {
	const userData = getCookieData();
	if (userData) {
		// Switch to the chat screen if it's a known user.
		document.body.className = "two";

		// Start the conversation.
		questionLoop(userData);
	}

	// If there's no saved data for this user, wait for them to submit their name, then proceed.
	else {
		document.body.className = "one";
		nameForm.onsubmit = (e)=> {
			e.preventDefault();

			// Switch to chat screen.
			document.body.className = "two";

			// Start the conversation using the newly submitted name.
			questionLoop({name: nameInput.value});
		}
	}
}

// Start chat afresh when needed.
document.addEventListener('restart-chat', ()=> {
	chatArea.innerHTML = ''; //Clear chat area.
	lastGroup = {}; //Reset the message group object. Ready to hold fresh messages.
	startChat(); //Begin a new chat.
});

startChat();