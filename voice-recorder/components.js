const stopBtn = () => {
    const b = document.createElement("button")
    b.classList.add("control")
    b.id = "stop-recording-btn"
    
    const stopIcon = document.createElement("i")
    stopIcon.classList.add("fas")
    stopIcon.classList.add("fa-stop-circle")

    b.appendChild(stopIcon)

    return b
}