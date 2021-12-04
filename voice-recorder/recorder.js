const recordBtn = document.getElementById("record-btn")
const timeLeftDiv = document.getElementById("time-left")

function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

function recordVoice() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
        recordBtn.style.display = "none"
        const stopRecordingBtn = stopBtn()  
        document.body.appendChild(stopRecordingBtn)

        const mediaRecorder = new MediaRecorder(s)
        mediaRecorder.start()

        const audioChunks = {}

        mediaRecorder.ondataavailable = e => {
            audioChunks.voice = e.data
        }
        setTimeout(() => {
            stopRecording(mediaRecorder, s)
            console.log(audioChunks)
        }, 3000)
    })
}

// stop a MediaRecorder instance and the a voice stream 
function stopRecording(mediaRecorder, voiceStream) {
    if (!mediaRecorder instanceof MediaRecorder) {
        console.error("mediaRecorder argument must be of type 'MediaRecorder'")
        return
    }
    if (!voiceStream instanceof MediaStream) {
        console.error("voiceStream argument must be of type 'MediaStream'")
        return
    }

    mediaRecorder.stop()
    voiceStream.getTracks().forEach(t => t.stop())
}

recordBtn.addEventListener("click", recordVoice)
