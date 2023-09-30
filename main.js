const cells = document.querySelectorAll(".cell");

const playerXScore = document.querySelector("#playXScore");

const playerOScore = document.querySelector("#playOScore");

const playBtn = document.querySelector(".btn-play");

const draws = document.querySelector(".draws");

const toastContainer = document.querySelector(".toast");

const playerX = "x";
const playerO = "o";

let initPlayerXScore = 0;
let initPlayerOScore = 0;
let initDraw = 0;

let level = 1;

let currentPlayer = playerX;

let flag = true;

let gameStarted = false;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellClicked = (e) => {
  if (!gameStarted) {
    toast("Click on PLAY to start");
    return;
  }

  const cell = e.target;
  if (cell.innerHTML === "") {
    // console.log("Click");
    cell.appendChild(addImg(currentPlayer));
    checkWinner();
    checkDraw();

    if (currentPlayer === playerX) {
      currentPlayer = playerO;
    } else {
      currentPlayer = playerX;
    }
  }
};

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

const addImg = (type) => {
  const img = document.createElement("img");
  img.src = `${type}.png`;
  return img;
};

const checkWinner = () => {
  for (let i = 0; i < winCombos.length; i++) {
    const winCombo = winCombos[i];

    const cell1 = cells[winCombo[0]];
    const cell2 = cells[winCombo[1]];
    const cell3 = cells[winCombo[2]];

    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML === cell2.innerHTML &&
      cell1.innerHTML === cell3.innerHTML
    ) {
      toast(`Player ${currentPlayer} WINS!`);
      updateScore();

      flag = false;
      level++;

      setTimeout(() => {
        reset();
        toast(`Level ${level}`);
      }, 2000);
    }
  }
};

const checkDraw = () => {
  if (
    [...cells].every(
      (cell) =>
        cell.innerHTML !== "" &&
        cell.innerHTML !== "X" &&
        cell.innerHTML !== "O"
    )
  ) {
    toast("DRAW! No one wins");

    level++;
    initDraw++;
    draws.textContent = initDraw;

    setTimeout(() => {
      reset();
      toast(`Level ${level}`);
    }, 2000);
  }
};

const toast = (msg) => {
  toastContainer.classList.add("show");
  toastContainer.textContent = msg;

  setTimeout(() => {
    toastContainer.classList.remove("show");
  }, 1500);
};

const updateScore = () => {
  if (currentPlayer === playerX) {
    initPlayerXScore++;
    playerXScore.textContent = initPlayerXScore;
  } else {
    initPlayerOScore++;
    playerOScore.textContent = initPlayerOScore;
  }
};

const reset = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  //   flag = true;
};

playBtn.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    playBtn.textContent = "Reset";
    toast(`Game Started - Level ${level}`);
  } else {
    //Game is in progress or already started
    flag = false;
    reset();

    level = 1;
    initPlayerXScore = 0;
    initPlayerOScore = 0;
    initDraw = 0;

    playerXScore.textContent = initPlayerXScore;
    playerOScore.textContent = initPlayerOScore;
    draws.textContent = initDraw;
    toast("Game is RESET!");

    setTimeout(() => {
      toast(`Level ${level}`);
      flag = true;
    }, 2000);
  }
});
