//hacer variables de los elementos del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//asociar la imagen de los tiles
const tileMap = new Image();
tileMap.src = 'SPRITES/pac man tiles/dm_google_pacman.png';

//crear la matriz que define el mapa del juego
const maze = [
    [0,1,2,3,4,5]
];

// === BUCLE PRINCIPAL DEL JUEGO ===
tileMap.onload = () => {
    drawMaze(); // solo dibujar cuando la imagen esté lista
};

//métodos para dibujar los tiles, cada tile es de 32
function drawTile(tile, x, y) {
    let sx, sy;
    const tileSize = 16;

    // definir posición del tile en el sprite sheet
    switch (tile) {

        case 0: sx = 32; sy = 0; break; // camino vacio
        case 1: sx = 8*32; sy = 0; break; // camino con pildora pequeña
        case 2: sx = 9*32; sy = 0; break; // camino con pildora grande
        default: sx = 0; sy = 0; break; // default (tile de error)

    }

    ctx.drawImage(
        tileMap,
        sx, sy, tileSize, tileSize, // sección del sprite sheet
        x * tileSize, y * tileSize, tileSize, tileSize // posición en canvas
    );
}

// dibujar todo el mapa
function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            drawTile(maze[y][x], x, y);
        }
    }
}

//movimiento de pacman
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && maze[pacman.y - 1][pacman.x] !== 1) pacman.y--;
    if (e.key === 'ArrowDown' && maze[pacman.y + 1][pacman.x] !== 1) pacman.y++;
    if (e.key === 'ArrowLeft' && maze[pacman.y][pacman.x - 1] !== 1) pacman.x--;
    if (e.key === 'ArrowRight' && maze[pacman.y][pacman.x + 1] !== 1) pacman.x++;
});
