var particle = new Particle();
var token;
var deviceId = "NM";

particle.login({username: "username", password: "password"}).then(
    function(data) {
        token = data.body.access_token;
    }, 
    function(err) {
        console.log('Failed to login to Particle', err);
    }
)

/*****************************************************
 *   Cloud Function
 * ***************************************************
 *  When you click the happy button, trigger a function
 *  that asks your robot to change its face. 
 * 
 *  For students with CS background:  
 *  - Feel free to restructure the three
 *    similar functions to be the same one to reduce
 *    redundancy.
 */
$("#happy").click( function() {
    particle.callFunction({
        deviceId: deviceId,
        name: 'face',
        argument: "happy",
        auth: token
    });
});


$("#idle").click( function() {
    particle.callFunction({
        deviceId: deviceId,
        name: 'face',
        argument: "idle",
        auth: token
    });
});


$("#mischievous").click( function() {
    particle.callFunction({
        deviceId: deviceId,
        name: 'face',
        argument: "misch",
        auth: token
    });
});

/*********************************************
 *  Advanced Step 1: Speech Synthesis
 *********************************************
 */

$("#speak").click(function() {
    var text = $("#speech").val();
    speak(text);
});

function speak(text) {
    // Create an utterance to be spoken by the Web Speech API 
    var msgConfig = new SpeechSynthesisUtterance();

    // Get all the possible voices 
    var voices = window.speechSynthesis.getVoices();

    // Set the voice to be Victoria 
    msgConfig.voice = voices.filter(function(voice) {return voice.name === "Victoria"})[0]; //Kyoko or Victoria
    
    // Reduce the pitch so the voice sounds more robotic.  
    msgConfig.pitch = "0.2";

    // Speed up the voice so it sounds more robotic.  
    msgConfig.rate = "1.4";

    // Set the text we are going to say.  
    msgConfig.text = text;

    // Ask Web Speech API to say our utterance, in the voice we configured.  
    window.speechSynthesis.speak(msgConfig);
}

/*********************************************
 *  Advanced Step 2: Face Recognition
 *********************************************
 */
function initFaceRecognition() {

    // Find the DOM elements for video and canvas (see index.html) 
    var video = $('#video')[0];
    var canvas = $('#canvas')[0];
    var context = canvas.getContext('2d');

    // Initialize our face recognition tracker 
    var tracker = new tracking.ObjectTracker('face');

    // Some parameters that control the face recogntiion
    // algorithm.  
    tracker.setInitialScale(4);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    // Only when we transition from "no face detected" 
    // to "face detected", we will then do an action
    // (e.g., say "hello Jeff"). 
    var faceDetected = false;

    // When ever we get a new frame of image from the camera, 
    // the track event will be triggered.
    // Note that an event may contain zero faces.  
    tracker.on('track', function(event) {

        // Clean up the canvas so we can highlight 
        // a newly detected face. 
        context.clearRect(0, 0, canvas.width, canvas.height);

        // For each face we find, draw a rectangle for it. 
        event.data.forEach(function(rect) {
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.font = '11px Helvetica';
            context.fillStyle = "#fff";
            context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
        });

        // Only when a face come into the frame we will then do something.
        // If a face is in the frame already, we shouldn't keep saying Hello.
        if (faceDetected === false && event.data.length > 0) {
            // Detect a face
            speak("Hello Jeff");
            faceDetected = true;

        } else if (faceDetected === true && event.data.length === 0) {
            faceDetected = false;
        } 
    });

    // Setup the webpage to capture video from the <video> DOM, 
    // and use the tracker we configured to perform face recognition. 
    // We use camera instead of static image.  
    tracking.track('#video', tracker, { camera: true });
};

// Call the function for face recognition.  
// initFaceRecognition();

