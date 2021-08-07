const CLASS_KEY = "key"

const KEY = symbol => {
    const button = document.createElement("button")
    button.className = CLASS_KEY
    button.innerText = symbol
    return button
}

const BACKSPACE = () => {
    const button = document.createElement("button")
    button.classList.add("backspace", "special")
    button.innerText = "<x"
    return button
}

const SPACE = () => {
    const button = document.createElement("button")
    button.classList.add("space", "special")
    button.innerText = "|_________|"
    return button
}

const LATIN_EN = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const CYRILLIC_RUS =
    "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
const GREEK = "αβγδεζηθικλμνξοπρσςτυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ"
// TODO add Arabic

const input = document.getElementById("test-input")

function renderKeyboard(language) {
    if (document.querySelector(".board"))
        document.querySelector(".board").remove()
    if (document.querySelector(".special-board"))
        document.querySelector(".special-board").remove()

    const board = document.createElement("div")
    board.className = "board"

    const specialKeys = document.createElement("div")
    specialKeys.classList.add("special-board")

    switch (language) {
        case "en" || "EN":
            for (const letter of LATIN_EN) {
                board.appendChild(KEY(letter))
            }
            break

        case "rus" || "RUS":
            for (const letter of CYRILLIC_RUS) {
                board.appendChild(KEY(letter))
            }
            break

        case "gr" || "GR":
            for (const letter of GREEK) {
                board.appendChild(KEY(letter))
            }
            break
    }

    specialKeys.appendChild(BACKSPACE())
    specialKeys.appendChild(SPACE())
    document.body.appendChild(specialKeys)
    document.body.appendChild(board)

    for (const key of document.querySelectorAll("." + CLASS_KEY)) {
        key.addEventListener("click", write)
    }
    document
        .querySelector(".backspace")
        .addEventListener("click", deleteLastChar)
    document.querySelector(".space").addEventListener("click", appendWhiteSpace)
}

function write(e) {
    //const activeEl = document.activeElement
    input.value += e.target.innerText
}

function deleteLastChar(e) {
    if (input.value.length === 0) input.value = ""
    else if (input.value.length === 1) {
        input.value = ""
    } else {
        input.value = input.value.slice(0, input.value.length - 1)
    }
}

function appendWhiteSpace(e) {
    input.value += " "
}

document
    .getElementById("EN")
    .addEventListener("click", () => renderKeyboard("en"))
document
    .getElementById("RUS")
    .addEventListener("click", () => renderKeyboard("rus"))
document
    .getElementById("GR")
    .addEventListener("click", () => renderKeyboard("gr"))
