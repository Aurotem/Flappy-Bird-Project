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

//TODO -------------------------START GAME----------------------------------------
function createItems() {
  //! Activating ground animation
  ground.style.animation = "move 3.4s infinite linear";
  ground2.style.animation = "move 3.4s infinite linear";
  ground3.style.animation = "move 3.4s infinite linear";

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
  const moveItems = setInterval(() => {
    pipe.style.right = itemsPos + "px";
    pipe2.style.right = itemsPos + "px";
    itemsPos += 50;
    if (itemsPos > 512) {
      pipe.remove();
      pipe2.remove();
      clearInterval(moveItems);
    }
  }, 500);
}
const createItemsInterval = setInterval(createItems, 2000);

let birdStart = 200;
let birdMoveTo = 0;
function moveBird() {
  if (birdStart < 382) {
    bird.style.top = birdStart + "px";
    birdMoveTo <= 8 ? (birdMoveTo += 1) : false;
    birdStart += birdMoveTo;
    if(birdMoveTo >= 7) {
                bird.style.transform= 'rotate(35deg)';
    }else if(birdMoveTo <= 0) {
                bird.style.transform= 'rotate(-35deg)';
    }
  }else {
                clearInterval(createItemsInterval)
  }
}

window.addEventListener('click', birdJump)
function birdJump() {
                birdMoveTo = -10;
}

setInterval(moveBird, 20);
