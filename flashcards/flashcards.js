const addCardBtn = document.getElementById("add-card-btn")
const questionTextarea = document.getElementById("question-textarea")
const answerTextarea = document.getElementById("answer-textarea")
const saveBtn = document.getElementById("save-btn")
const list = document.getElementById("list")

const LOCALSTORAGE_KEY = "flashcards"

// localStorage
class Store {
    save(flashcard) {
        const oldData = this.getRaw()

        if (oldData !== "") {
            const newData = oldData + JSON.stringify(flashcard)
            localStorage.setItem(LOCALSTORAGE_KEY, newData)
        } else {
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(flashcard))
        }
    }

    getAll() {
        let data = ""
        if (localStorage.getItem(LOCALSTORAGE_KEY))
            data = Array.from(
                JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
            )

        return data
    }

    getRaw() {
        return localStorage.getItem(LOCALSTORAGE_KEY)
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
    console.log("rerender")
    list.innerHTML = ""
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

    store.save(newFlashcard)
    reRenderList()
})
