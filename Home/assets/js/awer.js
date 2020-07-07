var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var circleArray = [];

var ballColorSelections = ['#EFFBFB', '#CEF6F5', '#58FAF4', '#04B4AE'];

var settings = {
    maxCount: 80,
    
    bounce: -0.00,
    force: -2.25,
    gravity: -0.01
}

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

createCircle(settings.maxCount);

window.addEventListener('resize', function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

function Circle() {
    this.positionX = (Math.random() * window.innerWidth / 2) + window.innerWidth / 4;
    this.positionY = window.innerHeight;
    this.radius = Math.floor((Math.random() * window.innerWidth * 0.005) + 1);
    this.velocityY = (Math.random() * 100) / 100 * -1;
    this.velocityX = (Math.random() * 100) / 100 * -1;
    this.color = ballColorSelections[Math.floor(Math.random() * 5)];
}

function createCircle(max) {
    for (var i = 0; i < max; i++) {
        var circleObject = new Circle;
        circleObject.id = i;
        circleArray.push(circleObject);
    }
    moveCircle();
}

function drawCircle(object) {

    for (var i = 0; i < object.length; i++) {
        context.beginPath();
        context.arc(object[i].positionX, object[i].positionY, object[i].radius, 0, 2 * Math.PI);
        context.fillStyle = object[i].color;
        context.fill();
        context.closePath();
    }

}

function moveCircle() {

    context.fillStyle = "#69D2E7";
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < circleArray.length; i++) {

        collideCircle(circleArray, circleArray[i]);
        circleArray[i].velocityY += settings.gravity;
        circleArray[i].positionY += circleArray[i].velocityY;
        circleArray[i].positionX += circleArray[i].velocityX;

        if (circleArray[i].positionY > 0 - circleArray[i].radius) {
            circleArray[i].positionY += circleArray[i].velocityY;
        } else {
            circleArray[i].velocityY = (Math.random() * 100) / 100 * -1;
            circleArray[i].positionX = (Math.random() * window.innerWidth);
            circleArray[i].positionY = window.innerHeight;
        }

        if (circleArray[i].positionX > canvas.width + circleArray[i].radius
            || circleArray[i].positionX < 0 - circleArray[i].radius) {
            circleArray[i].positionX = (Math.random() * window.innerWidth);
            circleArray[i].positionY = window.innerHeight;
        }

    }

    function collideCircle(collideObject, circleObject) {
        for (var j = circleObject.id + 1; j < collideObject.length; j++) {
            var distanceX = collideObject[j].positionX - circleObject.positionX;
            var distanceY = collideObject[j].positionY - circleObject.positionY;
            var distance = Math.floor(Math.sqrt((distanceX * distanceX) + (distanceY * distanceY)));
            
            var minimumDistance = collideObject[j].radius + circleObject.radius * 10;
            if (distance <= minimumDistance) {
                var angle = Math.atan2(distanceY, distanceX);
                var targetX = circleObject.positionX + Math.cos(angle) * minimumDistance;
                var targetY = circleObject.positionY + Math.sin(angle) * minimumDistance;
                var angleX = parseInt((targetX - collideObject[j].positionX) * settings.bounce) / 50;
                var angleY = parseInt((targetY - collideObject[j].positionY) * settings.bounce) / 50;
                circleObject.velocityX -= angleX;
                circleObject.velocityY -= angleY;
                collideObject[j].velocityX += angleX;
                collideObject[j].velocityY += angleY;
            }

        }
    }

    drawCircle(circleArray);

    requestAnimationFrame(moveCircle);

}