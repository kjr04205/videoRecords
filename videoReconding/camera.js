/**
 * dom
 */
const recordButton = document.querySelector(".record-button")
const stopButton = document.querySelector(".stop-button")
const playButton = document.querySelector(".play-button")
const downloadButton = document.querySelector(".download-button")
const previewPlayer = document.querySelector("#preview")
const recordingPlayer = document.querySelector("#recording")

let recorder;
let recordedChunks;
/**
 *  function
 */
function videoStart(){
    navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then(stream => {
            previewPlayer.srcObject = stream;
            startRecording(previewPlayer.captureStream())
        })
}
function startRecording(stream){
    recordedChunks = [];
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = (e) => { recordedChunks.push(e.data) }
    recorder.start()
}
function stopRecording(){
    previewPlayer.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop()
}
function playRecording(){
    const recordedBlob = new Blob(recordedChunks, {type: "video/ewbm"});
    recordingPlayer.src = URL.createObjectURL(recordedBlob);
    recordingPlayer.play();
    downloadButton.href = recordingPlayer.src;
    console.log(recordingPlayer.src);
    downloadButton.download = `${new Date()}.webm`;
}
/**
 *  event
 */
recordButton.addEventListener("click", videoStart)
stopButton.addEventListener("click", stopRecording)
playButton.addEventListener("click", playRecording)
