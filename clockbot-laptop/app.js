var particle = new Particle();
var token;

particle.login({username: "username", password: "password"}).then(
    function(data) {
        token = data.body.access_token;
    }, 
    function(err) {
        console.log('Failed to login to Particle', err);
    }
)

$("#happy").click( function() {
    particle.callFunction({
        deviceId: 'LN',
        name: 'face',
        argument: "happy",
        auth: token
    })
});


$("#idle").click( function() {
    particle.callFunction({
        deviceId: 'LN',
        name: 'face',
        argument: "idle",
        auth: token
    })
});


$("#mischievous").click( function() {
    particle.callFunction({
        deviceId: 'LN',
        name: 'face',
        argument: "mischievous",
        auth: token
    })
});

$("#speak").click(function() {
    var speech = $("#speech").val();

    var msgConfig = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    msgConfig.voice = voices.filter(function(voice) {return voice.name === "Kyoko"})[0]; //Kyoko or Victoria
    msgConfig.pitch = "0.2";
    msgConfig.rate = "1.4";
    msgConfig.text = speech;
    window.speechSynthesis.speak(msgConfig);
})
