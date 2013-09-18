var constraints = {
    video: true,    // ask for Camera
    audio: true     // ask for Microphone
}

var video = document.querySelector('video'),
    image = document.querySelector('#image-screen'),
    canvas = document.querySelector('canvas'),
    canvasCtx = canvas.getContext('2d'),
    screenShotBtn = document.querySelector('#take-screen'),
    screenShotBtnTxt = screenShotBtn.innerText || screenShotBtn.textContent,
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
            
            // C. Heilmann fix
            canvasCtx.translate(baseWidth, 0);
            canvasCtx.scale(-1, 1);

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

var RecordConfig = {
    RecordingGifStatus: false,
    frameLimit: 30,
    frameRate: 300
}

screenShotBtn.addEventListener('click', function(){
    var encoder = new GIFEncoder(),
        gifInterval,
        textProperty = this.innerText ? 'innerText' : 'textContent',
        frameCount = 0;

    this[textProperty] = 'Recording';
    this.classList.add('ongoing');

    if (RecordConfig.RecordingGifStatus) return false;
    RecordConfig.RecordingGifStatus = true;

    encoder.setRepeat(0);
    encoder.setDelay(300);

    console.log('GIF Encoder Started', encoder.start());
    encoder.setSize(canvas.width, canvas.height);
    gifInterval = window.setInterval(function(){
        frameCount++;
        if (frameCount > RecordConfig.frameLimit) {
            window.clearInterval(gifInterval);
            processGif(encoder, image, canvas);
            screenShotBtn[textProperty] = screenShotBtnTxt;
            screenShotBtn.classList.remove('ongoing');
            RecordConfig.RecordingGifStatus = false;
            return false;
        }
        canvasCtx.drawImage(video, 0, 0, baseWidth, baseHeight);
        console.log('Added Frame -- ' + frameCount + ':: Status -- ' + encoder.addFrame(canvasCtx));
    }, RecordConfig.frameRate);

}, false);

function processGif(encoder){
    var imageData;
    encoder.finish();

    imageData = canvas.toDataURL('image/png');
    image.setAttribute('src', 
        'data:image/gif;base64,' + encode64( 
                encoder.stream().getData()
            )
        );
}