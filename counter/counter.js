const incBtn = document.getElementById("inc")
const decBtn = document.getElementById("dec")
const counterSpan = document.getElementById("counter")

let count = 0

const getRandomHEXCode = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"

    for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)]

    return color
}

const refresh = () => {
    counterSpan.innerText = count
    const randomColor = getRandomHEXCode()
    counterSpan.style.backgroundColor = randomColor
    document.body.style.backgroundColor = randomColor
}

const changeValue = signal => {
    switch (signal) {
        case "inc":
            count++
            refresh()
            break
        case "dec":
            count--
            refresh()
            break
        case "res":
            count = 0
            refresh()
            break
    }
}

window.addEventListener("load", refresh)
incBtn.addEventListener("click", () => changeValue("inc"))
decBtn.addEventListener("click", () => changeValue("dec"))
counterSpan.addEventListener("dblclick", () => changeValue("res"))
