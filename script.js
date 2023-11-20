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
    let itemsPos = -100;
    let playerPass = false;
    const moveItems = setInterval(() => {
      if (gameRun) {
        pipe.style.right = itemsPos + "px";
        pipe2.style.right = itemsPos + "px";
        itemsPos += 5;

        if (itemsPos > 512) {
          pipe.remove();
          pipe2.remove();
          clearInterval(moveItems);
        }
        if (itemsPos >= 256 && itemsPos <= 260) {
          let birdPos = bird.style.top.replace("px", "");
          let pipePos = pipe.style.top.replace("px", "");
          let pipe2Pos = pipe2.style.top.replace("px", "");
          const monitor = document.createElement("div");
          const monitor2 = document.createElement("div");
          monitor.id = 'monitor';
          monitor2.id = 'monitor2';
          monitor.style.top = pipePos + "px";
          monitor2.style.top = (Number(pipe2Pos) + 320) + "px";
          monitor.style.position = 'absolute';
          monitor2.style.position = 'absolute';
          monitor.style.background = "red";
          monitor.style.height = "10px";
          monitor.style.width = "100px";
          monitor2.style.background = "red";
          monitor2.style.height = "10px";
          monitor2.style.width = "100px";
          scenery.append(monitor2);
          scenery.append(monitor);

          cl(pipePos);
          cl(birdPos);
          cl(Number(pipe2Pos)+ 320);
          if (birdPos <= pipePos && birdPos >= (Number(pipe2Pos) + 320)) {
            playerPass = true;
            if (playerPass) {
              SCORE += 1;
              playerPass = false;
            }
          } else {
            birdFall();
          }

          Array.from(String(SCORE)).forEach((e) =>
            score.firstChild != null ? score.firstChild.remove() : false
          );
          Array.from(String(SCORE)).forEach((e) => {
            const img = document.createElement("img");
            img.classList.add("score-img");
            img.src = `./images/${e}.png`;
            score.appendChild(img);
          });
        }
      }
    }, 50);
  }
}

createItems();

const createItemsInterval = setInterval(createItems, 2000);

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

function birdFall() {
  //! ------------Ground hit handler--------------
  clearInterval(createItemsInterval); //* Stops the generation of the pipes.
  gameRun = false; //* Stops the movement of the pipes.
  //*Deactivating animations
  ground.classList.remove("ground-animation");
  ground2.classList.remove("ground-animation");
  ground3.classList.remove("ground-animation");
  bird.classList.remove("bird-animation");
  gameOver.style.display = "block";
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

setInterval(moveBird, 20);
