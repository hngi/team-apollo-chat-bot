let savedName, gender, ageRange, skipDemographic,
		skipObject = {
			messages: [],
			next: true 
		},
		errorObject = {
			messages: [
				"Oops! Something went wrong. We'll fix it quick."
			]
		},
		helpMessages = [
			'Here are some commands you might find helpful.',
			'Type /help to see this message again.',
			'Type /feedback to give some feedback',
			`Type /clear-chat to restart this conversation. 
			[It might surprise you that we can even turn back time 😉 ]`,
			`Type /clear-data to start from even before the beginning.
			(That is, the current user data is cleared, and you get to enter a new name.)
			[See? Time travel! 😎]`
		],
		messageCounter = 0;

function checkForCommand(message) {
	//Only messages (string input) starting with "/" are interpreted as commands.
	if (typeof message !== "string" || message.trim().split('')[0] !== '/')
		return false;

	switch (message) {
		case '/help':
			return { messages: helpMessages };

		case '/clear-data': {
			document.cookie = `name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
			document.cookie = `gender=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
			document.cookie = `ageRange=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
			//setTimeout(() => location.reload() , 1500);
			//return { messages: ["Reloading in a second", "I'm about to be so new and shiny 😍"] };
		}

		case '/clear-chat': {
			setTimeout(() => {
				messageCounter = 0; // Reset the messages counter to the very beginning.

				// Broadcast an event telling script.js to restart the chat sequence.
				let restartChatEvent = new Event('restart-chat');
				document.dispatchEvent(restartChatEvent);
			}, 1500);
			//
			return { messages: ["One second please..."] };
		}

		case '/feedback': {
			messageCounter = 7;
			return { messages: ["Awesome, we'd love to hear what you have to say"] };
		}

		default: {
			return {
				messages: [
					"Unrecognized command.",
					'NB: All messages beginning with a "/" are interpreted as commands.',
					'Type "/help" to see all supported commands.'
				]
			};
		}
	}
}

function welcome(userData) {
	savedName = userData.name;
	document.cookie = `name=${savedName}; expires=Sat, 19 Jan 2030 12:00:00 UTC; path=/`;

	gender = userData.gender;
	ageRange = userData.ageRange;

	if (!gender || !ageRange) { //If gender and/or age range weren't found in the cookie, ask the user.
		let messages = [
			`Hi, ${savedName}. It's nice to meet you.`,
			...helpMessages,
			'Can I ask you a few questions? Just some demographic information before we get started.'
		];

		let options = ["Yeah, sure.", "No"];

		console.log({ messages, options });
		return { messages, options };
	}

	else {
		let messages = [`Welcome, ${savedName}. Glad to have you back.`,
				...helpMessages
		];

		return { messages, next: true };
	}
}

function questionOne(index) {
	if (gender) //If gender is already known, skip this.
		return skipObject;
	
	let options =  ["Yeah, sure.", "No"];

	if (options[index] == 'No') {	//If the user chose not to provide their details, move on.
		skipDemographic = true;		
		let messages = ["Ok, that's fine. Moving on."];
		return { messages, next: true };
	} 

	else if (options[index] == 'Yeah, sure.') { //If user consents, ask for details.
		let messages = ["Yay!", "Ok, first, what's your gender?"];
		let options = ["Male", "Female", "Other", "Rather not say"];
		return { messages, options };
	}

	else
		return errorObject;     
}

function responseOne(index) {
    if (!index) //Gender question was skipped.
      return skipObject;

		let options = ["Male", "Female", "Other", "Rather not say"];

		gender = options[index];
		document.cookie = `gender=${gender}; expires=Sat, 19 Jan 2030 12:00:00 UTC; path=/`; 
		
    switch (gender) {
			case 'Male':
				return { messages: ['Hey bro 😊'], next: true };
			case 'Female':
				return { messages: ['Hey sis 😊'], next: true };
			case 'Other':
				return { messages: ['Mood! 100%.'], next: true };
			case 'Rather not say':
				return { messages: ["That's totally ok."], next: true };
			default:
				return errorObject;
    }
}

function questionTwo() {
	if (ageRange || skipDemographic) //Either user chose not to provide details, or ageRange was already saved.
		return skipObject;

	let messages = ["What age range do you fall into?"];
	let options = ['0-12', '13-19', '20-29', '30-50', '51-above'];
	return { messages, options, }
}

function responseTwo(index) {
    if (!index) //Age range question was skipped.
			return skipObject;
				
    let options = ['0-12', '13-19', '20-29', '30-50', '51-above'];

		ageRange = options[index];
    document.cookie = `ageRange=${ageRange}; expires=Sat, 19 Jan 2030 12:00:00 UTC; path=/`; 
    switch (options[index]) {
        case '0-12':
            return { messages: ['Give your mum back her phone.', 'Just kidding ;)'], next: true };
        case '13-19':
            return { messages: ["Oh to be young and free!"], next: true };
        case '20-29':
            return { messages: ['Well, who woulda thought.'], next: true };
        case '51-above':
            return { messages: [
                `Ah! ${ (gender == 'Male') ? 'Baba o!' : ( (gender == 'Female') ? 'Mama o!' : 'Welcome.' ) }`
                ], next: true };
        case '30-50':
            return { messages: ['Interesting.'], next: true };
        default:
            return errorObject;
    }
}

function askPurpose() {
    let messages = ["Why are you here?"];
    let options = ['Product support', 'Feedback', 'Just wanna talk'];
    return { messages, options }
}

function purposeResponse(index) {
	if (!index) // Called without a specified option, that's an error.
		return errorObject;

	let options = ['Product support', 'Feedback', 'Just wanna talk'];

	let purpose = options[index];
	switch (purpose) {
		case 'Product support':
			skip = true;
			return {
				messages: [
					`Hang on ${savedName}, an agent will be with you shortly.`,
					"PS: Not really, this is just a demo.",
				]
			};
		case 'Feedback':
			return { messages: ["Awesome! Team Apollo loves feedback. Please tell us how we can improve."] };
		case 'Just wanna talk':
			skip = true;
			return { messages: ['Sure pal. Go ahead :)'] };
		default:
			return errorObject;
	}
}

function takeFeedback() {     
	return { 
		messages: [
			"We're always looking for ways to improve. Your feedback is much appreciated.",
		]
	};
}

function talk(message) {
  return {
		messages: [
			"I'm repeating your message.",
			"(Yes, I'm a parrot).",
			message
		]
	};
}

let chatFunctions = [
	welcome,
	questionOne,
	responseOne,
	questionTwo,
	responseTwo,
	askPurpose,
	purposeResponse,
	takeFeedback,
];

const chatbot = {
	/**Relays user input to the appropriate handler based on current position the chat sequence. */
	next: (input)=> {
		let commandResponse = checkForCommand(input);
		if (commandResponse)
			return commandResponse;

		if (messageCounter >= chatFunctions.length)
			return talk(input);
		
		return chatFunctions[messageCounter++](input);
	}
};

export { chatbot };
