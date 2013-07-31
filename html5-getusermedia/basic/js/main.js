var constraints = {
    video: true,    // ask for Camera
    audio: true     // ask for Microphone
}

var video = document.querySelector('video');

function successCallback(localMediaStream) {
    if (navigator.mozGetUserMedia) { 
        video.mozSrcObject = stream; // only for FF
    } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(localMediaStream);
    }
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
