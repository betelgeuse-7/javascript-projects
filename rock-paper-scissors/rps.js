/**
 * TODO
 *  - DO NOT REFRESH AFTER RESTARTING
 *  - STYLING
 */

const DOM_NODES = {
    game: document.querySelector("#game"),
    toggleDarkBtn: document.querySelector("#toggle-dark-btn"),
    score: document.querySelector("#score"),
    lastEvent: document.querySelector("#event"),
    rock: document.querySelector("#rock"),
    paper: document.querySelector("#paper"),
    scissor: document.querySelector("#scissor"),
    history: document.querySelector("#history"),
}

let dark = false
let score = { player: 0, computer: 0 }
let events = [
    /* { round: 2, player: "PAPER", computer: "ROCK", winner: "player" } */
]
let winner = ""
let choices = ["PAPER", "ROCK", "SCISSOR"]
let round = 1
// increment this in case of tie
let maxRounds = 10

// init first score
refreshScore()

function playRound(e) {
    // reached the last round
    if (round === maxRounds) {
        introduceWinner() // finish the game
        // create the restart button
        const restartBtn = document.createElement("button")
        restartBtn.addEventListener("click", restartGame)
        restartBtn.textContent = "Restart the game!"
        restartBtn.id = "restart-btn"

        DOM_NODES.game.appendChild(restartBtn)
    }

    const computerChoice = choices[Math.floor(Math.random() * choices.length)]
    const playerChoice = e.target.innerText

    const winner = decideWinner(computerChoice, playerChoice)
    if (winner === "") maxRounds++
    else if (winner === "player") score = { ...score, player: score.player + 1 }
    else if (winner === "comp")
        score = { ...score, computer: score.computer + 1 }

    // register the event
    events.push({
        round,
        player: playerChoice,
        computer: computerChoice,
        winner,
    })

    refreshScore()
    refreshLastEvent()
    refreshHistory()

    round++
}

// yandere dev moment
function decideWinner(comp, player) {
    if (player === comp) return ""
    if (comp === "ROCK") {
        if (player === "SCISSOR") return "comp"
        else if (player === "PAPER") return "player"
        else return ""
    } else if (comp === "PAPER") {
        if (player === "ROCK") return "comp"
        else if (player === "SCISSOR") return "player"
        else return ""
    } else if (comp === "SCISSOR") {
        if (player === "ROCK") return "player"
        else if (player === "PAPER") return "comp"
        else return ""
    } else return ""
}

function refreshScore() {
    DOM_NODES.score.innerText = `Player: ${score.player}  -  Computer: ${score.computer}`
}

function refreshLastEvent() {
    DOM_NODES.lastEvent.innerText = `Player -> ${
        events[events.length - 1].player
    }\nComputer -> ${events[events.length - 1].computer}`
}

function refreshHistory() {
    let historyInnerHTML = "<h2>EVENT HISTORY</h2>"
    for (const e of events) {
        historyInnerHTML += `<br><strong>ROUND</strong> ${e.round}: <br><strong>PLAYER -></strong> ${e.player}<br><strong>COMPUTER -></strong> ${e.computer} <br> <strong>WINNER -></strong> ${e.winner} <br>-------------------<br>`
    }

    DOM_NODES.history.innerHTML = historyInnerHTML
}

function restartGame() {
    window.location = window.location
}

function introduceWinner() {
    let playerWins = 0
    let compWins = 0

    for (const r of events) {
        if (r.winner === "player") playerWins++
        else if (r.winner === "comp") compWins++
        else continue
    }

    // just once. i promise
    playerWins > compWins
        ? (winner = "Player")
        : playerWins === compWins
        ? (winner = "")
        : (winner = "Computer")

    const winnerNode = document.createElement("div")
    if (winner !== "") winnerNode.innerText = `The winner is ${winner}`
    // this is impossible ??
    else winnerNode.innerText = "DRAW!" // this cannot happen
    // because i increment maxRounds whenever there is a tie
    winnerNode.id = "winner-banner"

    DOM_NODES.game.appendChild(winnerNode)
}

function toggleDark() {
    dark = !dark
    DOM_NODES.toggleDarkBtn.textContent = dark ? "light mode" : "dark mode"
    DOM_NODES.history.style.color = dark ? "#fff" : "#000"
    document.body.style.backgroundColor = dark ? "#30302e" : "#fff"

    // set winner text color to white if dark
    if (round >= maxRounds) {
        document.querySelector("#winner-banner").style.color = dark
            ? "#fff"
            : "#000"
    }
}

DOM_NODES.toggleDarkBtn.addEventListener("click", toggleDark)
DOM_NODES.rock.addEventListener("click", playRound)
DOM_NODES.paper.addEventListener("click", playRound)
DOM_NODES.scissor.addEventListener("click", playRound)
