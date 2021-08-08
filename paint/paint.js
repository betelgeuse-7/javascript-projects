/**
 * TODO
 *  Shapes
 *  Saving drawing after resize
 */

// *********** D O M ******>>>>>>>>>>
const bgColorInput = document.getElementById("bgcolor")
const boldnessInput = document.getElementById("boldness")
const lineTypeInput = document.getElementById("line-type")
const colorInput = document.getElementById("color")
const clearBtn = document.getElementById("clear-btn")
const canvas = document.getElementById("canvas")

canvas.width = innerWidth / 1.1
canvas.height = innerHeight / 1.1

// ** canvas context
const ctx = canvas.getContext("2d")

// whether the user is currently painting
let painting = false

const draw = e => {
    canvas.style.backgroundColor = bgColorInput.value

    // fix alignment problem
    const X = e.clientX - 6
    const Y = e.clientY - 8

    // if we are moving the mouse over the canvas
    // but not actually pressing the left click
    if (!painting) return

    ctx.lineWidth = boldnessInput.value
    ctx.lineCap = lineTypeInput.value

    ctx.lineTo(X, Y)
    ctx.strokeStyle = colorInput.value
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(X, Y)
}

// <-----* L I S T E N E R S *----->
canvas.addEventListener("mousedown", e => {
    // set painting to true whenever user clicks mouse on canvas
    painting = true
    // draw a dot
    draw(e)
})

canvas.addEventListener("mouseup", () => {
    painting = false
    // begin a new path after releasing the mouse
    // to keep the old line separate from the new one
    ctx.beginPath()
})

// draw when the mouse is moving on the canvas
// but 'if (!painting) return' line in draw function
//  will check the painting status before drawing anything on the canvas
canvas.addEventListener("mousemove", draw)

// resize the canvas dynamically
window.addEventListener("resize", () => {
    canvas.width = innerWidth / 1.5
    canvas.height = innerHeight / 1.5
})

clearBtn.addEventListener("click", () =>
    ctx.clearRect(0, 0, canvas.width, canvas.height)
)
