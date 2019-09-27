let savedName;

function welcome(name) {
    let messages = [];

    if (!name)
        return { messages: ["Name not set"] }

    savedName = name;
    messages[0] = `Hi, ${name}. It's nice to talk to you :)`;
    messages[1] = 'Do you mind if I ask you a few questions?';
    let options = ["Yes", "No"];

    return { messages, options, };
}

function questionOne(index, options) {
    if (options[index] == 'No') {
        let messages = ["Ok, that's fine"];
        return { messages };
    } else if (options[index] == 'Yes') {
        let messages = ["Yay!", "Ok, first, what's your gender?"];
        let options = ["Male", "Female", "Other", "Rather not say"];
        return { messages, options, };
    } else {
        return { messages: ["Ok, something went wrong. We'll fix it quick."] };
    }
        
}

function bot() {
    let initFuncs = [
        welcome,
        questionOne,
    ];

    return {
        counter: 0,

        next(...args) {
            if (this.counter >= initFuncs.length)
                return { messages: ["No message"] };


            return initFuncs[this.counter++](...args);
        }
    };
}

export { bot };