var constraints = {
    video: true,    // ask for Camera
    audio: true     // ask for Microphone
}

var video = document.querySelector('video'),
    canvasCtx = document.querySelector('canvas').getContext('2d');

function successCallback(localMediaStream) {
    video.src = window.URL.createObjectURL(localMediaStream);
    video.play(); // not doing this doesn't work in some browsers
}

function errorCallback(err) {
    console.log("The following error occured: " + err + " -- with code: " + err.code);
}

// Defining a common method by checking vendor prefixes
navigator.getMedia = ( 
    navigator.getUserMedia ||       // default
    navigator.webkitGetUserMedia || // Chrome and Safari
    navigator.mozGetUserMedia ||    // Firefox
    navigator.msGetUserMedia);      // IE 9, 10

navigator.getMedia ( constraints, successCallback, errorCallback );

var takeScreenShot = function(){
    debugger;
    canvasCtx.drawImage(video, 0, 0);

    // img.attr('src', canvas[0].toDataURL('image/webm'));
};
