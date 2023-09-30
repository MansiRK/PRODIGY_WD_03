const cells = document.getElementsByClassName(".cells");

const playerXScore = document.getElementsById("#playXScore");

const playerOScore = document.getElementsById("#playOScore");

const playBtn = document.getElementsByClassName(".btn-play");

const draws = document.getElementsByClassName(".draws");

const playerX = "X";
const playerO = "O";

let initPlayerXScore = 0;
let initPlayerOScore = 0;

let level = 1;

let currentPlayer = playerX;

let flag = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 8, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

const cellClicked = (e) => {
  if (flag) {
    if (e.target.innerHTML === "") {
      e.target.appendChild(addImg(currentPlayer));
      checkWinner();
      checkDraw();

      if (currentPlayer === playerX) {
        currentPlayer = playerO;
      } else {
        currentPlayer = playerX;
      }
    }
  }
};
