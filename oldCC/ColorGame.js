// console.log("working");
var colors = colorEngine(6);
var squares = document.querySelectorAll(".square");
var pickedColor = randomeColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
// reset button
resetButton.addEventListener("click", function() {
        // genarate all new colors
        colors = colorEngine(6);
        // pick a new random color from the arry
        pickedColor = randomeColor();
        // change color display to match picked color
        colorDisplay.textContent = pickedColor;
        // change color of squers
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            resetButton.textContent = "Change Colors";
        }
    })
    // correct color for this round
colorDisplay.textContent = pickedColor;

// squares color loop
for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    // click alert
    squares[i].addEventListener("click", function() {
        // grab color of clicked square 
        var clickedColor = this.style.backgroundColor;
        // compare colore with set color        
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!"
            resetButton.textContent = "Play Again";
            // FLASH DIV ###########################

            // END FLASH DIV########################
            changeColor(clickedColor);
            // wrong color colore fade out to backround
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = " Try Againe";
        }
    })
}
// function to loop all SQUERS and to change tere color to the RIGHT one when clicked
function changeColor(color) {
    for (var i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}
// RANDOME COLOR FUNCTION
function randomeColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
};
// make an arry with random colors
function colorEngine(num) {
    // make an arry
    var arr = []
        // repeat num tims
    for (var i = 0; i < num; i++) {
        // get random color push to arr
        arr.push(colorEngineColor())
    }
    // return full arr 
    return arr;
}
// single random color 
function colorEngineColor() {
    // pick red from 0-255
    var r = Math.floor(Math.random() * 256)
        // pick green from 0-255
    var g = Math.floor(Math.random() * 256)
        // pick blue from 0-255
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
// SHAKE ELEMENT ######################################################
var shakingElements = [];

var shake = function(element, magnitude = 16, angular = false) {
    //First set the initial tilt angle to the right (+1) 
    var tiltAngle = 1;

    //A counter to count the number of shakes
    var counter = 1;

    //The total number of shakes (there will be 1 shake per frame)
    var numberOfShakes = 15;

    //Capture the element's position and angle so you can
    //restore them after the shaking has finished
    var startX = 0,
        startY = 0,
        startAngle = 0;

    // Divide the magnitude into 10 units so that you can 
    // reduce the amount of shake by 10 percent each frame
    var magnitudeUnit = magnitude / numberOfShakes;

    //The `randomInt` helper function
    var randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Add the element to the `shakingElements` array if it
    //isn't already there
    if (shakingElements.indexOf(element) === -1) {
        //console.log("added")
        shakingElements.push(element);

        //Add an `updateShake` method to the element.
        //The `updateShake` method will be called each frame
        //in the game loop. The shake effect type can be either
        //up and down (x/y shaking) or angular (rotational shaking).
        if (angular) {
            angularShake();
        } else {
            upAndDownShake();
        }
    }

    //The `upAndDownShake` function
    function upAndDownShake() {

        //Shake the element while the `counter` is less than 
        //the `numberOfShakes`
        if (counter < numberOfShakes) {

            //Reset the element's position at the start of each shake
            element.style.transform = 'translate(' + startX + 'px, ' + startY + 'px)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Randomly change the element's position
            var randomX = randomInt(-magnitude, magnitude);
            var randomY = randomInt(-magnitude, magnitude);

            element.style.transform = 'translate(' + randomX + 'px, ' + randomY + 'px)';

            //Add 1 to the counter
            counter += 1;

            requestAnimationFrame(upAndDownShake);
        }

        //When the shaking is finished, restore the element to its original 
        //position and remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'translate(' + startX + ', ' + startY + ')';
            shakingElements.splice(shakingElements.indexOf(element), 1);
        }
    }

    //The `angularShake` function
    function angularShake() {
        if (counter < numberOfShakes) {
            console.log(tiltAngle);
            //Reset the element's rotation
            element.style.transform = 'rotate(' + startAngle + 'deg)';

            //Reduce the magnitude
            magnitude -= magnitudeUnit;

            //Rotate the element left or right, depending on the direction,
            //by an amount in radians that matches the magnitude
            var angle = Number(magnitude * tiltAngle).toFixed(2);
            console.log(angle);
            element.style.transform = 'rotate(' + angle + 'deg)';
            counter += 1;

            //Reverse the tilt angle so that the element is tilted
            //in the opposite direction for the next shake
            tiltAngle *= -1;

            requestAnimationFrame(angularShake);
        }

        //When the shaking is finished, reset the element's angle and
        //remove it from the `shakingElements` array
        if (counter >= numberOfShakes) {
            element.style.transform = 'rotate(' + startAngle + 'deg)';
            shakingElements.splice(shakingElements.indexOf(element), 1);
            //console.log("removed")
        }
    }

};

document.querySelectorAll('.red').addEventListener('mouseenter', (e) => {
    shake(e.currentTarget);
});

document.querySelectorAll('.green').addEventListener('mouseenter', (e) => {
    shake(e.currentTarget, 20, true);
});