const { default: fetch } = require("node-fetch");

const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const vidoeVolume = document.getElementById("videoVolume");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volumeValue = 0.5;
video.volume = volumeValue;


const handlePlayClick = (event) => {
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
}

const handleMute = (event) => {
    if(video.muted){
        video.muted = false;
    } else {
        video.muted = true;
    }
    muteBtn.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";
    volumeRange.value = video.muted ? 0 : volumeValue;
}

const handleVolumeChange = (event) => {
    const { target: { value } } = event;
    if(video.muted) {
        video.muted = false;
    }
    muteBtn.classList = value !== '0' ? "fas fa-volume-up" : "fas fa-volume-mute";
    volumeValue = value;
    video.volume = value;
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetaData = () => {
    if(video.readyState === 4){ 
        totalTime.innerText = formatTime(Math.floor(video.duration));
        timeline.max = Math.floor(video.duration);
    }
}

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    timeline.value = Math.floor(video.currentTime);
}

const handleTimelineChange = (event) => {
    const { target: { value } } = event;
    video.currentTime = value;
}

const handleFullscreen = () => {
    const fullscreen = document.fullscreenElement;
    if(fullscreen) {
        document.exitFullscreen();
    } else {
        videoContainer.requestFullscreen();
    }
    fullScreenBtn.classList = fullscreen ? "fas fa-expand" : "fas fa-compress";
}

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
    if(controlsTimeout) {
        clearTimeout(controlsTimeout);;
        controlsTimeout = null;
    }
    if(controlsMovementTimeout) {
        clearTimeout(controlsMovementTimeout);
        controlsMovementTimeout = null;
    }
    videoControls.classList.add("showing");
    controlsMovementTimeout = setTimeout(hideControls, 3000);
}

const handleMouseLeave = () => {
    controlsTimeout = setTimeout(hideControls, 3000);
}

const handleKeydown = (event) => {
    if(event.key === ' ') {
        event.preventDefault();
        handlePlayClick();
    }
}

const handleMouseHoverIn = () => {
    volumeRange.classList.remove("leave");
    volumeRange.classList.add("enter");
}

const handelMouseHoverOut = () => {
    volumeRange.classList.remove("enter");
    volumeRange.classList.add("leave");
}

const handleEnded = () => {
    const { id } = videoContainer.dataset;
    fetch(`/api/videos/${id}/view`, {
        method: "POST",
    });
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullscreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
window.addEventListener("keydown", handleKeydown);
video.addEventListener("click", handlePlayClick);
vidoeVolume.addEventListener("mouseenter", handleMouseHoverIn);
vidoeVolume.addEventListener("mouseleave", handelMouseHoverOut);
