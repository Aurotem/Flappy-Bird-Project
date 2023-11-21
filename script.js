//! Player
const bird = document.getElementById("bird");

//! Game-overlay
const scenery = document.getElementById("game-overlay");

//! Filter in gameOver scene
const filter = document.getElementById("filter");

//* Console.log shortcut for monitoring
const cl = console.log.bind(console);

//! Create Ground
const ground = document.createElement("div");
const ground2 = document.createElement("div");
const ground3 = document.createElement("div");
ground.classList.add("ground");
ground2.classList.add("ground");
ground3.classList.add("ground");
ground2.style.left = "335px";
ground3.style.left = "670px";
scenery.appendChild(ground);
scenery.appendChild(ground2);
scenery.appendChild(ground3);

//! Game Start & Game Stop Signs
const gameStart = document.getElementById("game-start");
const gameOver = document.getElementById("game-over");

//! ------------------PLAYER SCORE---------------------
let SCORE = 0;
const score = document.getElementById("SCORE");

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
    scenery.appendChild(pipe);
    scenery.appendChild(pipe2);

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

          scoreCalculate(SCORE);
        }
      }
    }, 10);
  }
}

function scoreCalculate(SCORE) {
  Array.from(String(SCORE)).forEach(() =>
    score.firstChild != null ? score.firstChild.remove() : false
  );
  Array.from(String(SCORE)).forEach((e) => {
    const img = document.createElement("img");
    img.classList.add("score-img");
    img.src = `./images/${e}.png`;
    score.appendChild(img);
  });
}

//? Start Game
createItems();
const createItemsInterval = setInterval(createItems, 2000);

//TODO Jump Handling Area
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
//! ------------Ground hit handler--------------
function birdFall() {
  clearInterval(createItemsInterval); //* Stops the generation of the pipes.
  gameRun = false; //* Stops the movement of the pipes.
  //*Deactivating animations
  ground.classList.remove("ground-animation");
  ground2.classList.remove("ground-animation");
  ground3.classList.remove("ground-animation");
  bird.classList.remove("bird-animation");
  gameOver.style.display = "block";
  bird.style.transform = "rotate(55deg)";
  window.removeEventListener("click", moveBird);
  filter.style.display = "flex";
  filter.style.opacity = "0";
  gameOverFn();
  clearInterval(birdJumpInterval);
}

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

//! Bird Jump Inputs
window.addEventListener("click", () => (gameRun ? birdJump() : activateGame()));

//*Jump function
function birdJump() {
  birdMoveTo = -9;
}
function activateGame() {
  gameRun = true;
  birdJump();
}

const birdJumpInterval = setInterval(moveBird, 20);
