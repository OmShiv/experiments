var constraints = {
    video: true,    // ask for Camera
    audio: true     // ask for Microphone
}

var video = document.querySelector('video'),
    canvas = document.querySelector('canvas'),
    canvasCtx = canvas.getContext('2d'),
    screenShotBtn = document.querySelector('#take-screen'),
    videoIsStreaming = false,
        
    baseWidth = 400,
    baseHeight = 0;

function successCallback(localMediaStream) {
    if (navigator.mozGetUserMedia) { 
        video.mozSrcObject = stream; // only for FF
    } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(localMediaStream);
    }

    // making sure that the aspect ratio remains same,
    // irrespective of browser inconsistencies in video resolutions
    
    video.addEventListener('canplay', function(e){
        // canplay will fire continuously till the stream is available
        // and hence this check, for making it fire only once
        if (!videoIsStreaming) { 
            baseHeight = video.videoHeight / (video.videoWidth/baseWidth);
            video.setAttribute('width',     baseWidth);
            video.setAttribute('height',    baseHeight);
            canvas.setAttribute('width',    baseWidth);
            canvas.setAttribute('height',   baseHeight);
            videoIsStreaming = true;
        }
    }, false);
    
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

// Attaching event handler to the button to take screenshot
screenShotBtn.addEventListener('click', function(){
    // This one line of code draws the current frame as an image on the canvas
    canvasCtx.drawImage(video, 0, 0, baseWidth, baseHeight);
}, false);