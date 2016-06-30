var locHour;
var locMin;
var locSec;

var backGround = "lightyellow";
var outerRing = "yellowgreen";
var middleRing = "olivedrab";
var innerRing = "darkolivegreen";

//backGround = "azure";
//outerRing = "lightseagreen";
//middleRing = "mediumaquamarine";
//innerRing = "teal";

//backGround = "gold";
//outerRing = "orange";
//middleRing = "orangered";
//innerRing = "goldenrod";

//backGround = "papayawhip";
//outerRing = "deeppink";
//middleRing = "hotpink";
//innerRing = "darkmagenta";



function Clock() {
    setInterval(startClock, 1);
}

function startClock() {
    getLocation();
    getLocTime();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var x = position.coords.longitude;

    locHour = Math.round(x / 15);
    locMin = Math.round((x % 15) / 0.25);
    locSec = Math.round(((x % 15) % 0.25) / 0.0041666667);
}

function getLocTime() {
    var time = new Date();
    var nHour = time.getHours();
    var nMin = time.getMinutes();
    var nSec = time.getSeconds();
    var nMSc = time.getMilliseconds();
    var utcHour = time.toUTCString().replace(/\D/g, "").substring(6, 8);
    var utcMin = time.toUTCString().replace(/\D/g, "").substring(8, 10);
    var utcSec = time.toUTCString().replace(/\D/g, "").substring(10);


    var hour = (utcHour * 1) + locHour;
    if (hour >= 24) {
        hour -= 24;
    };

    var min = (utcMin * 1) + locMin;
    var minEven;
    var minOdd;
    
   
    var sec = (utcSec * 1) + locSec;
    var secEven;
    var secOdd;
    if (sec >= 60) {
        sec -= 60;
        min += 1;
    };
    if (sec < 0) {
        sec += 60;
        min += 1;
    };

    if (min >= 60) {
        min -= 60;
        hour += 1;
    };
    if (min < 0) {
        min += 60;
        hour -= 1;
    };
   
    if (min % 2 === 0) {
        secEven = -0.5 + ((sec + (nMSc * 0.001)) / 30);
        secOdd = -0.5;
    } else {
        secEven = -0.5;
        secOdd = -0.5 + ((sec + (nMSc * 0.001)) / 30);
    };

    if (hour % 2 === 0) {
        minEven = (-0.5 + ((min + (sec * 0.0166666667) + (nMSc * 0.00001)) / 30));
        minOdd = -0.5;
    } else {
        minEven = -0.5;
        minOdd = (-0.5 + ((min + (sec * 0.0166666667) + (nMSc * 0.00001)) / 30));
    };

    var hour12;
    var hour24;
    if (hour >= 12) {;
        hour24 = (-0.5 + (((hour-12) + (min * 0.0166666667) + (sec * 0.000166666667) + (nMSc * 0.0000001)) / 6));
        hour12 = -0.5;
    } else {
        hour24 = -0.5;
        hour12 = (-0.5 + ((hour + (min * 0.0166666667) + (sec * 0.000166666667)+ (nMSc * 0.0000001)) / 6));
    }

    if (nSec < 10) {
        nSec = "0" + nSec;
    }
    if (nMin < 10) {
        nMin = "0" + nMin;
    }
    if (nHour < 10) {
        nHour = "0" + nHour;
    }

    

    var tHour = hour;
    if (hour < 10) {
        tHour = "0" + hour;
    };
    var tMin = min;
    if (min < 10) {
        tMin = "0" + min;
    };
    var tSec = sec;
    if (sec < 10) {
        tSec = "0" + sec;
    };

    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    if (window.innerWidth > window.innerHeight) {
        ctx.canvas.width = ctx.canvas.height = window.innerHeight;
    }
    if (window.innerHeight > window.innerWidth) {
        ctx.canvas.width = ctx.canvas.height = window.innerWidth;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.width);

    ctx.beginPath();
    ctx.arc(canvas.width * 0.5, canvas.width * 0.504, canvas.width * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = backGround;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(canvas.width * 0.5,
        canvas.width * 0.504,
        canvas.width * 0.4,
        hour24 * Math.PI,
        hour12 * Math.PI);
    ctx.lineWidth = canvas.width * 0.02;
    ctx.strokeStyle = outerRing;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width * 0.5,
        canvas.width * 0.504,
        canvas.width * 0.375,
        minEven * Math.PI,
        minOdd * Math.PI);
    ctx.lineWidth = canvas.width * 0.015;
    ctx.strokeStyle = middleRing;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(canvas.width * 0.5,
        canvas.width * 0.504,
        canvas.width * 0.355,
        secEven * Math.PI,
        secOdd * Math.PI);
    ctx.lineWidth = canvas.width * 0.01;
    ctx.strokeStyle = innerRing;
    ctx.stroke();

    var ang;
    var num;
    ctx.font = (canvas.width * 0.045) + "px Calibri";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = backGround;
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -canvas.width * 0.40);
        ctx.rotate(-ang);
        ctx.fillText("●", canvas.width / 2, canvas.width / 2);
        ctx.rotate(ang);
        ctx.translate(0, canvas.width * 0.40);
        ctx.rotate(-ang);
    }

    ctx.textAlign = "center";
    ctx.font = (canvas.width * 0.08) + "px Calibri";
    ctx.fillStyle = middleRing;
    ctx.fillText("Solar Time:", canvas.width * 0.5, canvas.width * 0.42);

    ctx.font = (canvas.width * 0.16) + "px Calibri";
    ctx.fillStyle = outerRing;
    ctx.fillText(tHour + ":" + tMin + ":" + tSec, canvas.width * 0.5, canvas.width * 0.53);

    ctx.font = (canvas.width * 0.05) + "px Calibri";
    ctx.fillStyle = innerRing;
    ctx.fillText("Local Time: " + nHour + ":" + nMin + ":" + nSec, canvas.width * 0.5, canvas.width * 0.63);

}