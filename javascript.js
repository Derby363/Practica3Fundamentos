const maze = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1],
];

const tileSize = 40; // tamaño de cada celda

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pacman = { x: 1, y: 1, dir: 'RIGHT' }; // posición inicial

function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                ctx.fillStyle = 'blue'; // pared
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
            } else {
                ctx.fillStyle = 'black'; // espacio vacío
                ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                ctx.fillStyle = 'yellow'; // píldora
                ctx.beginPath();
                ctx.arc(x * tileSize + tileSize/2, y * tileSize + tileSize/2, 5, 0, Math.PI*2);
                ctx.fill();
            }
        }
    }
}

function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x * tileSize + tileSize/2, pacman.y * tileSize + tileSize/2, tileSize/2 - 2, 0, Math.PI*2);
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
    drawPacman();
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && maze[pacman.y-1][pacman.x] !== 1) pacman.y--;
    if (e.key === 'ArrowDown' && maze[pacman.y+1][pacman.x] !== 1) pacman.y++;
    if (e.key === 'ArrowLeft' && maze[pacman.y][pacman.x-1] !== 1) pacman.x--;
    if (e.key === 'ArrowRight' && maze[pacman.y][pacman.x+1] !== 1) pacman.x++;
});

let ghosts = [
    {x: 8, y: 1, dir: 'LEFT', color: 'red'},
];

function drawGhosts() {
    ghosts.forEach(g => {
        ctx.fillStyle = g.color;
        ctx.beginPath();
        ctx.arc(g.x * tileSize + tileSize/2, g.y * tileSize + tileSize/2, tileSize/2 - 2, 0, Math.PI*2);
        ctx.fill();
    });
}
