let savedName;
let gender;
let ageRange;
let skip;
let purpose;
let skipObject = { messages: [], next: true };
let errorObject = { messages: ["Oops! Something went wrong. We'll fix it quick."] };

let helpMessage = `Here are some commands you might find helpful.

Type /help to see this message again
Type /feedback to give some feedback
Type /reload to start from the very beginning [it might surprise you that we can even turn back time ;) ]`;

let counter = 0;

function welcome(name) {

    if (!name)
        return { messages: ["Name not set"] }

    savedName = name;
    let messages = [`Hi, ${savedName}. It's nice to meet you.`,
    	helpMessage,
    	'Can I ask you a few questions? Just some demographic information before we get started.'];
    let options = ["Yeah, sure.", "No"];

    return { messages, options, };
}

function questionOne(index, options) {
    if (options[index] == 'No') {
        let messages = ["Ok, that's fine. Moving on."];
        return { messages, next: true };
    } else if (options[index] == 'Yeah, sure.') {
        let messages = ["Yay!", "Ok, first, what's your gender?"];
        let options = ["Male", "Female", "Other", "Rather not say"];
        return { messages, options, };
    } else {
        return errorObject;
    }      
}

function responseOne(index, options) {
    if (!index) {
        skip = true;
        return skipObject;
    }
    gender = options[index];
    switch (options[index]) {
        case 'Male':
            return { messages: ['Big boy :)'], next: true };
        case 'Female':
            return { messages: ['Hey Babe :)'], next: true };
        case 'Other':
            return { messages: ['Mood! 100%.'], next: true };
        case 'Rather not say':
            return { messages: ["That's totally ok."], next: true };
        default:
            return errorObject;
    }
}

function questionTwo() {
    if (skip) {
        skip = false;
        return skipObject;
    }

    let messages = ["Which age range do you fall into?"];
    let options = ['0-12', '13-19', '20-29', '30-50', '51-above'];
    return { messages, options, }
}

function responseTwo(index, options) {
    if (!index) {
        return skipObject;
    }
    ageRange = options[index];
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
    return { messages, options, }
}

function purposeResponse(index, options) {
    if (!index) {
        return errorObject;
    }

    purpose = options[index];
    switch (options[index]) {
        case 'Product support':
            skip = true;
            return {
							messages: [
								`Hang on ${savedName}, an agent will be with you shortly.`,
								"PS: Not really, this is just a demo & you've reached the end.",
								"You may reload to explore other conversation paths. Or continue chatting with the parrot."
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

function talk(message) {
	message = message.trim();
	if (message.split('')[0] == '/') {
		switch (message) {
			case '/help':
				return { messages: [ helpMessage ] };
			case '/reload':
				setTimeout(() => location.reload() , 1000);
				return { messages: ["Reloading in a second", "I'm about to be so new and shiny 😍"] };
			case '/feedback':
				counter = 7;
				return { messages: ["Awesome, we'd love to hear what you have to say"] };
		}
	}
    return { messages: ["I'm repeating your message.", "(Yes, I'm a parrot).", message] };
}

function takeFeedback(message) {
    if (skip) {
    	skip = false;
        return talk(message);
    }
        
    return { 
			messages: [
				"We're always looking for ways to improve. Your feedback is much appreciated.",
				"Thank you for stopping by. Ciao.",
				"PS: You've reached the end of this path. You may reload to explore other conversation paths. Or continue to chat with the parrot."
			]
		};
}

function bot() {
    let initFuncs = [
        welcome,
        questionOne,
        responseOne,
        questionTwo,
        responseTwo,
        askPurpose,
        purposeResponse,
        takeFeedback,
    ];

    return {

        next(...args) {
            if (counter >= initFuncs.length)
                return talk(...args);


            return initFuncs[counter++](...args);
        }
    };
}

export { bot };