//this is always holding reference to the questio  that invoked the butons
let reasonForQuestion = "";
let salutation = "", username = "";

let parentElem = document.getElementById("message-area")

let decidingObject = {
    //reason: array of functions for each response
    "moreDetails": [(e) => {askGender(e)}],
    "gender": [(e) => {genderGotten(e)}]
}

let handleResponse = (e) => {
    let functionIndex = e.target.value * 1 - 1
    decidingObject[reasonForQuestion][0](functionIndex)
}

let welcomeMessage = (userName = "Sam") => {
    if (userName == ""){
        talkToUser(`Welcome to the workspace!!!
        I'm [botname], I'd love to know your gender just as a means of salutation without your name.
        Do you care to tell me?`)
    }else{
        talkToUser(`Welcome to the workspace ${userName}!!!
        I'm [botname], woud love to know more about you.
        Cool?`)
    }
    createBotButtons(["Yes", "No"])
    reasonForQuestion = "moreDetails"
}

let askGender = (e) => {
    if (e == 1){
        //user does not want to waste time talking 
        talkToUser(`Ooops, okay. Let's get to business. May I know why you're here?`)
        discussionStart()
    }else{
        //user is ready to answer our questions
        talkToUser(`Okay, it's cool`)
        talkToUser(`May I know your gender?`)
        createBotButtons(["Male", "Female"])
        reasonForQuestion = "gender"
    }
}

let genderGotten = (e) => {
    if (e == 0){
        //male was selected
        salutation = "sir"
    }else{
        salutation = "ma"
    }
    talkToUser(`Thanks. It's my pleasure to help you ${salutation}. Let's get straight to business.
    May I know why you're here?`)
    discussionStart()
}

let discussionStart = () => {
    createBotButtons(["I need some help using the app", "I want to leave some feedback for improvement"])
    reasonForQuestion = "whatUserwants"
}

welcomeMessage()

