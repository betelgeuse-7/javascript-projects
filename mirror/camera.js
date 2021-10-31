function hasGetUserMedia() {
    // about double negation:
    // https://stackoverflow.com/a/10467486
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

const cam = document.getElementById("cam")
const stopCamBtn = document.getElementById("stop-cam-btn")
const camSizeRangeInput = document.getElementById("cam-size")

if (!hasGetUserMedia()) alert("no getUserMedia")
else record()

cam.style.width = "100%"
cam.style.height = "100%"

function record() {
    navigator.mediaDevices.getUserMedia({ video: true }).then(s => {
        window.CAMSTREAM = s
        cam.srcObject = s
    })
}

function stopCam() {
    const s = window.CAMSTREAM
    s.getTracks().forEach(t => t.stop())
}

stopCamBtn.addEventListener("click", stopCam)
