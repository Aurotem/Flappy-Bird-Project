//! Player
const bird = document.getElementById("bird");

//! Game-overlay
const scene = document.getElementById("game-overlay");

//! Filter in gameOver scene
const filter = document.getElementById("filter");

//* Console.log shortcut for monitoring
const cl = console.log.bind(console);

//! Ground
const ground = document.getElementById("ground");
const ground2 = document.getElementById("ground2");
const ground3 = document.getElementById("ground3");

//! Game Start & Game Stop Signs
const gameStart = document.getElementById("game-start");
const gameOver = document.getElementById("game-over");
const rePlayButton = document.getElementById("re-play");

//! ------------------PLAYER SCORE---------------------
let SCORE = 0;
const score = document.getElementById("SCORE");
const showScore = document.getElementById("show-score");
const showHighScore = document.getElementById("show-high-score");

setStorage(); //! Get HighScore in the beginning

//TODO -------------------------START GAME----------------------------------------
let gameRun = false;
function createItems() {
  //! Activating animations
  ground.classList.add("ground-animation");
  ground2.classList.add("ground-animation");
  ground3.classList.add("ground-animation");
  bird.classList.add("bird-animation");
  if (gameRun) {
    score.style.visibility = "visible";
    gameStart.style.display = "none";

    //! Random number for generating pipes.
    const randomPos = Math.random() * (372 - 132) + 132;

    //*Create Elements
    const pipe = document.createElement("div");
    const pipe2 = document.createElement("div");

    //* Adding items their CSS class
    pipe2.classList.add("pipe");
    pipe.classList.add("pipe");

    //* Randomly Generate pipes
    pipe2.style.top = randomPos - 420 + "px";
    pipe2.style.transform = "rotate(180deg)";
    pipe.style.top = randomPos + "px";

    //* Making elements visible
    scene.appendChild(pipe);
    scene.appendChild(pipe2);

    //monitorScript(pipe, pipe2);

    let itemsPos = -100;
    let playerPass = false;
    const moveItems = setInterval(() => {
      if (gameRun) {
        let birdPos = Number(bird.style.top.replace("px", ""));
        let pipePos = Number(pipe.style.top.replace("px", ""));
        let pipe2Pos = Number(pipe2.style.top.replace("px", ""));

        pipe.style.right = itemsPos + "px";
        pipe2.style.right = itemsPos + "px";
        itemsPos += 1;

        if (itemsPos > 512) {
          pipe.remove();
          pipe2.remove();
          clearInterval(moveItems);
        }
        if (!playerPass && itemsPos >= 154 && itemsPos <= 222) {
          if (birdPos < pipePos && birdPos > pipe2Pos + 320) {
            playerPass = true;
            if (playerPass) {
              SCORE += 1;
            }
          } else {
            birdFall();
          }
          scoreCalculate(SCORE, score);
        }
      }
    }, 10);
  }
}

//! ------------GameOver handler--------------
function birdFall() {
  clearInterval(createItemsInterval); //* Stops the generation of the pipes.
  gameRun = false; //* Stops the movement of the pipes.

  gameStart.style.display = 'none';

  setStorage();

  //*Deactivating animations
  ground.classList.remove("ground-animation");
  ground2.classList.remove("ground-animation");
  ground3.classList.remove("ground-animation");
  bird.classList.remove("bird-animation");
  gameOver.style.display = "block";
  bird.style.transform = "rotate(55deg)";
  document.removeEventListener("click", clickListenerFn);

  gameOverFn();
  clearInterval(birdJumpInterval);
  scoreCalculate(SCORE, showScore);
  rePlayButton.addEventListener("click", resetGame);
}
//! ---------------GameOver handler-----------------

//! ------------------- Saving score to Local Storage -----------------------
function setStorage() {
  let storeScore = localStorage.getItem("highScore");
  if (SCORE > storeScore || localStorage.getItem("highScore") == undefined) {
    localStorage.setItem("highScore", JSON.stringify(SCORE));
  }

  storeScore = localStorage.getItem("highScore");

  scoreCalculate(storeScore, showHighScore);
}

//! ------------------- Reset Game Button -------------------------

function resetGame() {
//   scene.innerHTML = `<div id="SCORE" draggable="false">
//   <img src="./images/0.png" alt="score" class="score-img" />
// </div>
// <div id="game-start"></div>
// <div id="game-over">
//   <div class="game-over-panel">
//     <div class="score-panel">
//       <p>SCORE:</p>
//       <div id="show-score" class="score"></div>
//     </div>
//     <div class="score-panel">
//       <p>HIGHSCORE:</p>
//       <div id="show-high-score" class="high-score"></div>
//     </div>
//     <button id="re-play">PLAY AGAIN</button>
//   </div>
// </div>
// <div id="bird"></div>
// <div id="filter"></div>
// <div id="ground" class="ground"></div>
// <div id="ground2" class="ground" style="left: 335px;"></div>
// <div id="ground3" class="ground" style="left: 670px;"></div>`;
//   SCORE = 0;
//   gameOver.style.display = "none";
//   ground.classList.add("ground-animation");
//   ground2.classList.add("ground-animation");
//   ground3.classList.add("ground-animation");
//   bird.classList.add("bird-animation");

//   bird.style.top = "200px";
//   birdStart = 200;
//   birdMoveTo = 0;
//   const createItemsInterval = setInterval(createItems, 2000);
//   const birdJumpInterval = setInterval(moveBird, 20);
//   gameRun = true;
//   rePlayButton.removeEventListener("click", resetGame);
//   document.addEventListener("click", clickListenerFn);

location.reload();
}

//! ------------------- Reset Game Button -------------------------

//! ---------------- Calculate Score -----------------
function scoreCalculate(SCORE, x) {
  Array.from(x.children).forEach((e) => {
    e.remove();
  });
  Array.from(String(SCORE)).forEach((e) => {
    const img = document.createElement("img");
    img.classList.add("score-img");
    img.src = `./images/${e}.png`;
    x.appendChild(img);
  });
}
//! ---------------- Calculate Score -----------------

//? Start Game
createItems();
const createItemsInterval = setInterval(createItems, 2000);

//TODO ----------------Jump Handling Area----------------
let birdStart = 200;
let birdMoveTo = 0;
function moveBird() {
  if (gameRun) {
    if (birdStart < 382) {
      bird.style.top = birdStart + "px";
      birdMoveTo <= 7 ? (birdMoveTo += 1) : false;
      birdStart += birdMoveTo;
      if (birdMoveTo >= 6) {
        bird.style.transform = "rotate(35deg)";
      } else if (birdMoveTo <= 5) {
        bird.style.transform = "rotate(-35deg)";
      }
    } else {
      birdFall();
    }
  }
}
const clickListenerFn = () => (gameRun ? birdJump() : activateGame());
//* Bird Jump Inputs
document.addEventListener("click", clickListenerFn);

//*Jump function
function birdJump() {
  birdMoveTo = -9;
}
function activateGame() {
  gameRun = true;
  birdJump();
}

const birdJumpInterval = setInterval(moveBird, 20); //* Gravity
//TODO ----------------Jump Handling Area----------------

//TODO -------------- Bird Falling in the end of the game -------------------
function gameOverFn() {
  const birdFallInterval = setInterval(() => {
    let birdTop = Number(bird.style.top.replace("px", ""));
    if (birdTop < 400) {
      bird.style.top = birdTop + 6 + "px";
    } else {
      clearInterval(birdFallInterval);
    }
  }, 10);
}
//TODO -------------- Bird Falling in the end of the game -------------------
