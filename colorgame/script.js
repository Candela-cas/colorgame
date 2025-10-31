
const colorPalettes = [
  ["rgb(240,14,128)","rgb(14,240,128)","rgb(128,14,240)","rgb(240,128,14)","rgb(14,128,240)","rgb(128,240,14)"],
  ["rgb(255,87,51)","rgb(255,195,0)","rgb(199,0,57)","rgb(144,12,63)","rgb(88,24,69)","rgb(255,111,105)"],
  ["rgb(52,152,219)","rgb(46,204,113)","rgb(231,76,60)","rgb(155,89,182)","rgb(241,196,15)","rgb(230,126,34)"],
  ["rgb(26,188,156)","rgb(46,204,113)","rgb(52,152,219)","rgb(155,89,182)","rgb(241,196,15)","rgb(231,76,60)"]
];

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

let numSquares = 6;
let colors = [];
let pickedColor;

init();

function init() {
  setupModeButtons();
  setupSquares();
  reset();
}

function setupModeButtons() {
  for (let i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function() {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      numSquares = this.textContent === "EASY" ? 3 : 6;
      reset();
    });
  }
}

function setupSquares() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
      const clickedColor = this.style.backgroundColor;
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "¡Correcto!";
        changeColors(pickedColor);
        h1.style.backgroundColor = pickedColor;
      } else {
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Intentalo nuevamente";
      }
    });
  }
}

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  messageDisplay.textContent = "";
  h1.style.backgroundColor = "steelblue";
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  }
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function pickColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function generateRandomColors(num) {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
