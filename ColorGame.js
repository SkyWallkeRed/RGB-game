console.log("Running");
var numSquares = 6;
var colors = colorEngine(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = randomeColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");

var btnEasy = document.querySelector("#btnEasy");
var btnHard = document.querySelector("#btnHard");


btnEasy.addEventListener("click", function() {
    console.log("easy clicked");
    numSquares = 3;
    btnEasy.classList.add("selected");
    btnHard.classList.remove("selected");
    colors = colorEngine(numSquares);
    console.log(colors);
    pickedColor = randomeColor();
    colorDisplay.textContent = pickedColor;
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[3].style.backgroundColor = "#232323";
            squares[4].style.backgroundColor = "#232323";
            squares[5].style.backgroundColor = "#232323";
            document.querySelector("h1").style.backgroundColor = "steelblue";

        }
    }
});
btnHard.addEventListener("click", function() {
    console.log("hard clicked");
    numSquares = 6;
    btnEasy.classList.remove("selected");
    btnHard.classList.add("selected");
    // genarate all new colors
    colors = colorEngine(numSquares);
    // pick a new random color from the arry
    pickedColor = randomeColor();
    // change color display to match picked color
    colorDisplay.textContent = pickedColor;
    // change color of squers
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        resetButton.textContent = "Change Colors";
    }
});
shakeContainerOff();
// reset button
resetButton.addEventListener("click", function() {
        messageDisplay.textContent = "  ";
        // allshake off 
        shakeContainerOff();
        // genarate all new colors
        colors = colorEngine(numSquares);
        // pick a new random color from the arry
        pickedColor = randomeColor();
        // change color display to match picked color
        colorDisplay.textContent = pickedColor;
        // change color of squers
        for (var i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            resetButton.textContent = "Change Colors";
            document.querySelector("h1").style.backgroundColor = "steelblue";

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
            document.querySelector("h1").style.backgroundColor = pickedColor;
            // FLASH DIV ###########################
            shakeContainer();
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

// ALL SHAKE FUNC
function shakeContainer() {
    var element = document.getElementById("container");
    element.classList.add("allShake");
}

function shakeContainerOff() {
    var element = document.getElementById("container");
    element.classList.remove("allShake");
}