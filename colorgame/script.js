
const colorPalettes = [
  ["rgb(240,14,128)","rgb(14,240,128)","rgb(128,14,240)","rgb(240,128,14)","rgb(14,128,240)","rgb(128,240,14)"],
  ["rgb(255,87,51)","rgb(255,195,0)","rgb(199,0,57)","rgb(144,12,63)","rgb(88,24,69)","rgb(255,111,105)"],
  ["rgb(52,152,219)","rgb(46,204,113)","rgb(231,76,60)","rgb(155,89,182)","rgb(241,196,15)","rgb(230,126,34)"],
  ["rgb(26,188,156)","rgb(46,204,113)","rgb(52,152,219)","rgb(155,89,182)","rgb(241,196,15)","rgb(231,76,60)"]
];

let numSquares = 6;
let colors = [];
let pickedColor;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");

init();

function init() {
  setupSquares();
  setupButtons();
  resetGame();
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function() {
      const clickedColor = this.style.backgroundColor;
      if (colorsMatch(clickedColor, pickedColor)) {
        messageDisplay.textContent = "¡Correcto!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "¿Jugar de nuevo?";
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Inténtalo nuevamente";
      }
    });
  });
}

function setupButtons() {
  resetButton.addEventListener("click", resetGame);

  easyBtn.addEventListener("click", function() {
    numSquares = 3;
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    resetGame();
  });

  hardBtn.addEventListener("click", function() {
    numSquares = 6;
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    resetGame();
  });
}

function resetGame() {
  colors = getRandomPalette();
  squares.forEach((square, i) => {
    if (i < numSquares) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = "none";
    }
  });

  pickedColor = colors[Math.floor(Math.random() * numSquares)];
  colorDisplay.textContent = pickedColor;

  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  resetButton.textContent = "Nuevos Colores";
}

function changeColors(color) {
  squares.forEach(square => {
    if (square.style.display !== "none") {
      square.style.backgroundColor = color;
    }
  });
}

function colorsMatch(c1, c2) {
  return c1.replace(/\s+/g,'') === c2.replace(/\s+/g,'');
}

function getRandomPalette() {
  return colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
}