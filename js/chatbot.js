let savedName;
let gender;
let ageRange;
let skip;
let purpose;
let skipObject = { messages: [], next: true };
let errorObject = { messages: ["Ok, something went wrong. We'll fix it quick."] };

function welcome(name) {
    let messages = [];

    if (!name)
        return { messages: ["Name not set"] }

    savedName = name;
    messages[0] = `Hi, ${name}. It's nice to talk to you :)`;
    messages[1] = 'Can I ask you a few questions?';
    let options = ["Yes", "No"];

    return { messages, options, };
}

function questionOne(index, options) {
    if (options[index] == 'No') {
        let messages = ["Ok, that's fine"];
        return { messages, next: true };
    } else if (options[index] == 'Yes') {
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
            return { messages: ['Awww. Babe.'], next: true };
        case 'Other':
            return { messages: ['Mood 100%'], next: true };
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

    let messages = ["Which age range do you fall in?"];
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
            return { messages: ['Give your parent back their phone', 'Just kidding ;)'], next: true };
        case '13-19':
            return { messages: ["Isn't it great to be young?"], next: true };
        case '20-29':
            return { messages: ['Well, who woulda thought'], next: true };
        case '51-above':
            return { messages: [
                `Ah! ${ (gender == 'Male') ? 'Baba mi' : ( (gender == 'Female') ? 'Mama mi' : 'Welcome.' ) }`
                ], next: true };
        case '30-50':
            return { messages: ['Interesting'], next: true };
        default:
            return errorObject;
    }
}

function askPurpose() {
    let messages = ["Why are you here?"];
    let options = ['For support', 'To give feedback', 'To talk'];
    return { messages, options, }
}

function purposeResponse(index, options) {
    if (!index) {
        return errorObject;
    }

    purpose = options[index];
    switch (options[index]) {
        case 'For support':
            skip = true;
            return { messages: ['An agent will be with you shortly. (Not really, this is just a demo)'] };
        case 'To give feedback':
            return { messages: ["What's your feedback?"] };
        case 'To talk':
            skip = true;
            return { messages: ['Go ahead :)'] };
        default:
            return errorObject;
    }
}

function talk(message) {
    return { messages: ["I'm repeating your message (yes, I'm a parrot)", message] };
}

function takeFeedback(message) {
    if (skip)
        return talk(message);

    return { messages: ["Your feedback is appreciated"] };
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
        counter: 0,

        next(...args) {
            if (this.counter >= initFuncs.length)
                return talk(...args);


            return initFuncs[this.counter++](...args);
        }
    };
}

export { bot };