const rootDiv = document.querySelector("#root")
const proximityDiv = document.querySelector("#proximity")
const guessInput = document.querySelector("#guess")
const guessBtnButton = document.querySelector("#guess-btn")

const API = "http://www.numbersapi.com"

let STATE = {
    number: Math.floor(Math.random() * 100),
    lastGuessed: "",
    ok: false,
    restart: false,
    message: "",
    numberFact: "",
}

function guess(num) {
    STATE.lastGuessed = num
    if (num === STATE.number) {
        STATE.ok = true
        STATE.message = "you found it"
        makeApiCall()
    } else if (num < STATE.number) STATE.message = "UP!"
    else STATE.message = "DOWN!"

    message()
}

function message() {
    proximityDiv.textContent = STATE.message
}

function makeApiCall() {
    fetch(API + "/" + STATE.number)
        .then(res =>
            res.text().then(data => {
                STATE.numberFact = data
                proximityDiv.textContent = data
            })
        )
        .catch(e => console.log(e))
}

guessBtnButton.addEventListener("click", () =>
    guess(parseInt(guessInput.value))
)
