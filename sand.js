const canvas = document.getElementById("sandCanvas");
const ctx = canvas.getContext('2d');
const gameWidth = canvas.width;
const gameHeight = canvas.height;
const unitSize = 10;
const boardBackground = "black";
let running = false;
const particles = []
let innerListStruc = []
let isDragging = false;
let lastTime = 0;
let fps = 0;


const ParticleType = {
    SAND: 0,
    WATER: 1,
};

class Particle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        spawnSand(event);
    }
});

canvas.addEventListener("mousedown", (event) => {
    isDragging = true;
    spawnSand(event);
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
});

//Starts the game
function gameStart() {
    running = true;
    genGrid();
    requestAnimationFrame(nextTick);
};

function genGrid() {
    //This needs to be in the format [[], [], []] with the inner lists being the rows and the amount
    //of elements being gameWidth/unitSize etc
    for (i = 0; i < (gameWidth/unitSize); i+=1) { //Rows
        innerListStruc = []
        for(j = 0; j < (gameHeight/unitSize); j+=1) { //Column in that row
            innerListStruc.push(null);
        };
        particles.push(innerListStruc);
    };
};

//Called when the game updates
function nextTick(timestamp) {
    if (running) {

    // Calculate the time difference between frames
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    // Calculate FPS (frames per second)
    fps = Math.round(1000 / delta);

    updateParticles();
    clearBoard();
    drawParticles();
    drawFPS();

    // Request the next frame
    requestAnimationFrame(nextTick);

    }
};

// Function to draw the FPS on the canvas
function drawFPS() {
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText(`FPS: ${fps}`, 10, 20); // Display in the top-left corner
}

//Clears the canvas to be blank
function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

//Draws the particles to the canvas
function drawParticles() {
    ctx.fillStyle = "yellow";
    for (i = 0; i < (gameWidth/unitSize); i+=1) { //Rows
        for(j = 0; j < (gameHeight/unitSize); j+=1) { //Column in that row
            if (particles[i][j] != null) { //Check if there is a particle there
                ctx.fillRect(particles[i][j].x, particles[i][j].y, unitSize, unitSize);
            }
        };
    };
};

//Updates each particle per tick
function updateParticles() {
    //loop through particle list 
    //First check if particle is at the bottom of the canvas, if it is do not move
    //Then check if there is room under the particle for it to move
        //If there is, move the particle there
        //If there isnt, leave the particle in place

    for (i = (gameHeight/unitSize) - 1; i >= 0; i--) { //Rows btm to top
        for(j = 0; j < (gameWidth/unitSize); j++) { //Column in that row left to right
            if (particles[i][j] != null) { //Check if there is a particle there
                if (i + 1 < (gameHeight / unitSize) && particles[i+1][j] == null) { //This means no particle underneath
                    particles[i+1][j] = particles[i][j]; //Copy particle down
                    particles[i][j] = null; //Set the space where it was empty
                    particles[i+1][j].y += unitSize; //Move it down by 1 unit
                    // console.log("nothing under ere");
                } else { //This means that there is a particle underneath, so dont move
                    continue;
                }
            } 
        };
    };
};

function spawnSand(client) {
    //Get the mouse coords realtive to the canvas
    const rect = canvas.getBoundingClientRect(); //Get the canvas bounds
    const mouseX = client.clientX - rect.left; //Get the Xpos relative to canvas
    const mouseY = client.clientY - rect.top; //Get the Ypos relative to canvas

    //Convert the mouse coordinates to grid coordinates
    const gridX = Math.floor(mouseX / unitSize);
    const gridY = Math.floor(mouseY / unitSize);

    // Check if the grid position is valid and empty
    if (gridX >= 0 && gridX < gameWidth / unitSize && gridY >= 0 && gridY < gameHeight / unitSize) {
        if (particles[gridY][gridX] === null) { // Check if the cell is empty
            // Create a new sand particle at the clicked position
            particles[gridY][gridX] = new Particle(gridX * unitSize, gridY * unitSize, ParticleType.SAND);
        }
    }
};

gameStart();