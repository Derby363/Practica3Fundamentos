//hacer variables de los elementos del juego
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//asociar la imagen de cada tile
const TILE_SIZE = 32; //cada tile es de 32x32

const tiles = {
    0: loadImage('SPRITES/pac man tiles/tile000.png'), //tile de error
    1: loadImage('SPRITES/pac man tiles/tile001.png'), //CAMINO vacio
    2: loadImage('SPRITES/pac man tiles/tile002.png'), //MURO esquina superior izquierda
    3: loadImage('SPRITES/pac man tiles/tile003.png'), //MURO esquina superior derecha
    4: loadImage('SPRITES/pac man tiles/tile004.png'), //MURO esquina inferior derecha
    5: loadImage('SPRITES/pac man tiles/tile005.png'), //MURO esquina inferior izquierda
    6: loadImage('SPRITES/pac man tiles/tile006.png'), //MURO horizontal
    7: loadImage('SPRITES/pac man tiles/tile007.png'), //MURO vertical
    8: loadImage('SPRITES/pac man tiles/tile008.png'), //CAMINO con pildora
    9: loadImage('SPRITES/pac man tiles/tile009.png'), //CAMINO con power-up
    10: loadImage('SPRITES/pac man tiles/tile010.png'), //OBSTÁCULO horizontal
    11: loadImage('SPRITES/pac man tiles/tile011.png'), //OBSTÁCULO cierre horizontal izquierdo
    12: loadImage('SPRITES/pac man tiles/tile012.png'), //OBSTÁCULO cierre horizontal derecho
    13: loadImage('SPRITES/pac man tiles/tile013.png'), //OBSTÁCULO vertical
    14: loadImage('SPRITES/pac man tiles/tile014.png'), //OBSTÁCULO cierre vertical arriba
    15: loadImage('SPRITES/pac man tiles/tile015.png'), //OBSTÁCULO cierre vertical abajo
    16: loadImage('SPRITES/pac man tiles/tile016.png'),
    17: loadImage('SPRITES/pac man tiles/tile017.png'),
    18: loadImage('SPRITES/pac man tiles/tile018.png'),
    19: loadImage('SPRITES/pac man tiles/tile019.png'),
    20: loadImage('SPRITES/pac man tiles/tile020.png'),
    21: loadImage('SPRITES/pac man tiles/tile021.png'),
    22: loadImage('SPRITES/pac man tiles/tile022.png'),
    23: loadImage('SPRITES/pac man tiles/tile023.png'),
    24: loadImage('SPRITES/pac man tiles/tile024.png'),
    25: loadImage('SPRITES/pac man tiles/tile025.png'),
    26: loadImage('SPRITES/pac man tiles/tile026.png'),
    27: loadImage('SPRITES/pac man tiles/tile027.png'),
    28: loadImage('SPRITES/pac man tiles/tile028.png'),
    29: loadImage('SPRITES/pac man tiles/tile029.png'),
    30: loadImage('SPRITES/pac man tiles/tile030.png'),
    31: loadImage('SPRITES/pac man tiles/tile031.png'),
    32: loadImage('SPRITES/pac man tiles/tile032.png'),
    33: loadImage('SPRITES/pac man tiles/tile033.png'),
    34: loadImage('SPRITES/pac man tiles/tile034.png'),
    35: loadImage('SPRITES/pac man tiles/tile035.png'),
    36: loadImage('SPRITES/pac man tiles/tile036.png'),
    37: loadImage('SPRITES/pac man tiles/tile037.png'), //T-SHAPE arriba
    38: loadImage('SPRITES/pac man tiles/tile038.png'), //T-SHAPE izquierda
    39: loadImage('SPRITES/pac man tiles/tile039.png'), //T-SHApe abajo
    40: loadImage('SPRITES/pac man tiles/tile040.png'), //T-SHAPE derecha
    41: loadImage('SPRITES/pac man tiles/tile041.png'), //T-SHAPE hacia abajo y mas gruesa
    42: loadImage('SPRITES/pac man tiles/tile042.png'), //OBSTÁCULO2 cierre horizontal derecho
    43: loadImage('SPRITES/pac man tiles/tile043.png'), //OBSTÁCULO2 muro horizontal
    44: loadImage('SPRITES/pac man tiles/tile044.png'), //OBSTÁCULO2 muro vertical
    45: loadImage('SPRITES/pac man tiles/tile045.png'), //OBSTÁCULO2 esquina superior izquierda
    46: loadImage('SPRITES/pac man tiles/tile046.png'), //OBSTÁCULO2 esquina superior derecha
    47: loadImage('SPRITES/pac man tiles/tile047.png'), //OBSTÁCULO2 esquina inferior izquierda
    48: loadImage('SPRITES/pac man tiles/tile048.png'), //OBSTÁCULO2 esquina inferior derecha
    49: loadImage('SPRITES/pac man tiles/tile049.png'),
    50: loadImage('SPRITES/pac man tiles/tile050.png'),
    51: loadImage('SPRITES/pac man tiles/tile051.png'),
    52: loadImage('SPRITES/pac man tiles/tile052.png'),
    53: loadImage('SPRITES/pac man tiles/tile053.png'),
    54: loadImage('SPRITES/pac man tiles/tile054.png'),
    55: loadImage('SPRITES/pac man tiles/tile055.png'),
    56: loadImage('SPRITES/pac man tiles/tile056.png'),
    57: loadImage('SPRITES/pac man tiles/tile057.png'),
    58: loadImage('SPRITES/pac man tiles/tile058.png'), //FANTASMAS esqina superior izquierda
    59: loadImage('SPRITES/pac man tiles/tile059.png'), //FANTASMAS esquina superior derecha
    60: loadImage('SPRITES/pac man tiles/tile060.png'), //FANTASMAS esquina inferior izquierda
    61: loadImage('SPRITES/pac man tiles/tile061.png'), //FANTASMAS esquina inferior derecha
    62: loadImage('SPRITES/pac man tiles/tile062.png'), //FANTASMAS muro inferior
    63: loadImage('SPRITES/pac man tiles/tile063.png'), //FANTASMAS puerta 1
    64: loadImage('SPRITES/pac man tiles/tile064.png'), //FANTASMAS puerta 2
    65: loadImage('SPRITES/pac man tiles/tile065.png'), //FANTASMAS puerta 3
    66: loadImage('SPRITES/pac man tiles/tile066.png'),
    67: loadImage('SPRITES/pac man tiles/tile067.png'),
    68: loadImage('SPRITES/pac man tiles/tile068.png'),
    69: loadImage('SPRITES/pac man tiles/tile069.png'),
}

//crear la matriz que define el mapa del juego
const maze = [
    [2, 6, 39, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 39, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 39, 6, 3],
    [7, 9, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 9, 7],
    [7, 1, 13, 1, 43, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 7],
    [7, 1, 15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [5, 6, 6, 6, 6, 3, 1, 1, 1, 1, 1, 1, 1, 1, 13, 1, 1, 1, 1, 1, 1, 1, 2, 6, 6, 6, 6, 4],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 15, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [6, 6, 6, 6, 6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 6, 6, 6, 6],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 58, 63, 64, 65, 59, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 60, 62, 62, 62, 61, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [6, 6, 6, 6, 6, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 6, 6, 6, 6, 6],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 1],
    [2, 6, 6, 6, 6, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 6, 6, 6, 6, 3],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7],
    [5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4]
];

// === BUCLE PRINCIPAL DEL JUEGO ===
let imagesLoaded = 0;
const totalImages = Object.keys(tiles).length;

for (const key in tiles) {
    tiles[key].onload = () => {
        imagesLoaded++;
        if (imagesLoaded === totalImages) {
            drawMaze();
        }
    };
}

// === MÉTODOS PARA DIBUJAR LOS TILES ===

//loader de los tiles
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

//función que dibuja las tiles
function drawTile(tile, x, y) {
    const img = tiles[tile];
    if (!img) return;

    ctx.drawImage(img, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE)
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
