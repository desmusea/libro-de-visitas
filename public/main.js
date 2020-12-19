
const BASE_URL = 'http://localhost:4000';
const socket = io.connect(`${BASE_URL}`);

const output = document.getElementById('output');
let answers;
let packs;
let packsCounter = 0;
let reactionsCounter = 0;
let currentReaction;
let currentReactionId;
let currentPack;
let currentPackId;
let currentAnswerId;
let buttonClicked;
let timeOut;
fetch(`${BASE_URL}/answers`).then((result) => result.json()).then((json) => answers = json);
fetch(`${BASE_URL}/reactions`).then((result) => result.json()).then((json) => packs = json);


socket.on('output', function(data) {
    if (data.event === 'buttonClicked') {
        buttonClicked = data.value;
        if(timeOut) {
            clearTimeout(timeOut);
            setInitialText();
            timeOut = null;
        } else {
            if(packsCounter < 18) {
                setCurrentReaction();
            } else {
                packsCounter = 0;
                reactionsCounter = 0;
                setCurrentReaction();
            }
        }
    }
});

function setAnswer() {
    switch(buttonClicked) {
        case 3:
            currentAnswerId = 1;
        break;    
        case 5:
            currentAnswerId = 2;
        break;
        case 29:
            currentAnswerId = 3;
        break;    
        case 31:
            currentAnswerId = 4;
        break;         
    }

    postResults();
};

function setCurrentReaction() {
    currentPack = packs[packsCounter];
    currentPackId = currentPack.id;
    const reactionsFromPack = JSON.parse(currentPack.reactions_ids);
    currentReactionId = reactionsFromPack[reactionsCounter];
    if (reactionsCounter !== 5) {
        getAndPrintCurrentReaction();
    }

    updateCounter();
}

function getAndPrintCurrentReaction() {
    fetch(`${BASE_URL}/reactions/${currentReactionId}`).then((result) => result.json()).then((json) => {
        currentReaction=json[0];
        printReaction();
        if (reactionsCounter !== 0) { 
            setAnswer();
        }
    });
}

function printReaction() {
    if (currentReaction) {
        output.innerHTML = '<p class="reaction-text">' + currentReaction.text + '</p>';
    }
}

function updateCounter() {
    if (reactionsCounter < 5) {
        reactionsCounter++;
    } else {
        timeOut = setTimeout(() => setInitialText(), 2000);
        setFinalText(); 
        reactionsCounter = 0;
        if (packsCounter < packs.length) {
            packsCounter++
        } 
    } 
}

function postResults() {
    fetch(`${BASE_URL}/results`, {
        method: 'POST',
        body: JSON.stringify({
            id_pack: currentPackId,
            id_reaction: currentReactionId,
            id_answer: currentAnswerId
        }),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        }
    }).then(res => res.json())
      .then(response => console.log(response))
}

function setInitialText() {
    output.innerHTML = '<p>' + '¡Valora tu experiencia!'+ '</p>' + '<p>' + 'Indica tu grado de conformidad con respecto a las siguientes afirmaciones:'+ '</p>'+ '<p class="press-button">' + '(Pulsa cualquier botón para comenzar)' + '</p>';
}

function setFinalText() {
    output.innerHTML = '<p>' + '¡Gracias por participar!'+ '</p>';
}