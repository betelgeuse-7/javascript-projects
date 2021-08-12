const FLASHCARD_CLASSNAME = "card"
const FLASHCARD_TEXT_CLASSNAME = "text"
const FLASHCARD_SHOWHIDE_BTN_CLASSNAME = "show-answer-btn"
const FLASHCARD_ACTION_BTNS_CLASSNAME = "action"
const FLASHCARD_DELETE_BTN_CLASSNAME = "delete"

const FLASHCARD = (key, question) => {
    const card = document.createElement("div")
    card.className = FLASHCARD_CLASSNAME

    const flashcardText = FLASHCARD_TEXT(question)
    const showHideBtn = BUTTON("showhide")
    const deleteActionBtn = BUTTON("delete")

    card.appendChild(flashcardText)
    card.appendChild(showHideBtn)
    card.appendChild(deleteActionBtn)

    card.dataset.key = generateKey(24)

    return card
}

const FLASHCARD_TEXT = question => {
    const flashcardText = document.createElement("p")
    flashcardText.className = FLASHCARD_TEXT_CLASSNAME
    flashcardText.innerText = question

    return flashcardText
}

const BUTTON = type => {
    if (type !== "delete" && type !== "edit" && type !== "showhide")
        console.error("wtf man")

    const btn = document.createElement("button")

    if (type === "delete") {
        btn.textContent = "Delete"
        btn.classList.add(FLASHCARD_DELETE_BTN_CLASSNAME)
    } else if (type === "showhide") {
        btn.textContent = "Show/hide answer"
        btn.classList.add(FLASHCARD_SHOWHIDE_BTN_CLASSNAME)
    }

    btn.classList.add(FLASHCARD_ACTION_BTNS_CLASSNAME)

    return btn
}

function generateKey(length) {
    let result = ""
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
    }
    return result
}
