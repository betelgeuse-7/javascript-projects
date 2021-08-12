const addCardBtn = document.getElementById("add-card-btn")
const questionTextarea = document.getElementById("question-textarea")
const answerTextarea = document.getElementById("answer-textarea")
const saveBtn = document.getElementById("save-btn")
const list = document.getElementById("list")

const LOCALSTORAGE_KEY = "flashcards"

// localStorage
class Store {
    save(flashcard) {
        const oldData = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
        const newData = [...oldData, flashcard]
        localStorage.setItem(LOCALSTORAGE_KEY, newData)
    }

    getAll() {
        const data = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
        return data
    }

    delete(key) {}

    edit(key) {}
}

class Flashcard {
    constructor(question, answer) {
        this.key = generateKey(24)
        this.question = question
        this.answer = answer
    }
}

const store = new Store()

function reRenderList() {
    const flashcards = store.getAll()
    for (const card of flashcards) {
        const flashcard = FLASHCARD(card.key, card.question, card.answer)
        list.appendChild(flashcard)
    }
}

saveBtn.addEventListener("click", () => {
    const newFlashcard = new Flashcard(
        questionTextarea.value,
        answerTextarea.value
    )
    // TODO save to localhost
    // * JSON.stringify
})
