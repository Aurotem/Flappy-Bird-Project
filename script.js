//! Player
const bird = document.getElementById("bird");

//! Game-overlay
const scenery = document.getElementById("game-overlay");
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

//! ------------------PLAYER SCORE---------------------
let SCORE = 0;
const score = document.getElementById("SCORE");

//TODO -------------------------START GAME----------------------------------------
let gameRun = false;
function createItems() {
  gameRun = true;
  //! Activating animations
  ground.classList.add("ground-animation");
  ground2.classList.add("ground-animation");
  ground3.classList.add("ground-animation");
  bird.classList.add("bird-animation");

  //! Random number for generating pipes.
  const randomPos = Math.random() * (372 - 132) + 132;

  //*Create Elements
  const pipe = document.createElement("div");
  const pipe2 = document.createElement("div");

  //* Adding items their CSS class
  pipe2.classList.add("pipe");
  pipe.classList.add("pipe");

  //* Randomly Generate pipes
  pipe2.style.transform = `translate(0px,${randomPos - 420}px) rotate(180deg)`;
  pipe.style.transform = `translate(0px,${randomPos}px)`;

  //* Making elements visible
  scenery.appendChild(pipe);
  scenery.appendChild(pipe2);

  let itemsPos = -100;
  let playerPass = false;
  const moveItems = setInterval(() => {
    if (gameRun) {
      pipe.style.right = itemsPos + "px";
      pipe2.style.right = itemsPos + "px";
      itemsPos += 50;
    }
    if (itemsPos > 512) {
      pipe.remove();
      pipe2.remove();
      clearInterval(moveItems);
    }
    if (itemsPos >= 256 && itemsPos <= 300) {
      playerPass = true;
      if (playerPass) {
        SCORE += 1;
        playerPass = false;
      }
      score.textContent = SCORE;
    }
  }, 500);

  cl(SCORE);
}
const createItemsInterval = setInterval(createItems, 2000);

let birdStart = 200;
let birdMoveTo = 0;
function moveBird() {
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
    //! ------------Ground hit handler--------------
    clearInterval(createItemsInterval); //* Stops the generation of the pipes.
    gameRun = false; //* Stops the movement of the pipes.
    //*Deactivating animations
    ground.classList.remove("ground-animation");
    ground2.classList.remove("ground-animation");
    ground3.classList.remove("ground-animation");
    bird.classList.remove("bird-animation");
  }
}

//! Bird Jump Inputs
window.addEventListener("click", birdJump);
window.addEventListener("keydown", (e) => e.keyCode == 32 && birdJump);

//*Jump function
function birdJump() {
  birdMoveTo = -9;
}

setInterval(moveBird, 20);
