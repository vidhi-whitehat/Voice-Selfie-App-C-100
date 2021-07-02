var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start()
{
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function run(event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = Content;
    console.log(Content);

    if (Content.toLowerCase() =="take my selfie")
    {
        console.log("Taking selfie in 5 seconds ---- ");
        speak();
    }
}

function speak(){
    //speak_data = document.getElementById("textbox").value;
    speak_data = "Taking your selfie in 5 seconds";

    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    Webcam.attach(camera);

    setTimeout(function()
    {
        take_snapshot();
        save();
    }, 5000);
}

Webcam.set({
    width:200,
    height:150,
    image_format : 'png',
    png_quality:90
});
camera = document.getElementById("camera");

function take_snapshot()
{
    Webcam.snap(function(data_url)  {
        document.getElementById("result").innerHTML = '<img id="selfie_image" src="' + data_url + '">';
    });
}

function save()
{
    link = document.getElementById("link");
    image = document.getElementById("selfie_image");
    link.href = image.src;
    link.click();
}
