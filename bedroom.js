img = ""
status = "";
objectDetector = "";
Objects = [];

function preload() {
    img = loadImage('badroom.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {    
        console.log(error);
    }
    console.log(results);
    Objects = results;
}

function draw() {

    image(img, 0, 0, 640, 420);
    if (status != "") {
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("purple")
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "%", Objects[i].x +15, Objects[i].y +15);
            noFill();
            stroke("purple");
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height);
        }
    }
}