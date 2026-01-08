//<---!CÓDIGO DESARROLLADO POR ALEJANDRO VALENTÍN LÓPEZ Y GUILLERMO ESCÁRZAGA!--->

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === VARIABLES GLOBALES ===
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const TILE_SIZE = 32; //cada tile es de 32x32

canvas.tabIndex = 0;
canvas.focus();

// Ajuste responsivo: escala el canvas (CSS) para que quepa en la ventana
function resizeCanvasToWindow() {
    if (typeof maze === 'undefined' || !maze || !maze[0]) return;
    const cols = maze[0].length;
    const rows = maze.length;

    // establecer resolución interna según número de tiles
    canvas.width = cols * TILE_SIZE;
    canvas.height = rows * TILE_SIZE;

    // calcular escala para ajustarse a la ventana con un pequeño margen
    const margin = 40; // px
    const scaleX = (window.innerWidth - margin) / canvas.width;
    const scaleY = (window.innerHeight - margin) / canvas.height;
    const scale = Math.max(0.1, Math.min(scaleX, scaleY));

    canvas.style.width = Math.floor(canvas.width * scale) + 'px';
    canvas.style.height = Math.floor(canvas.height * scale) + 'px';
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === OBJETOS ===

//pacman :v
const pacman = {
    x: 12,
    y: 20,
    px: 12 * TILE_SIZE,
    py: 20 * TILE_SIZE,
    direction: 'right',
    animation: 'right',
    nextDirection: 'right',
    frameIndex: 0,
    frameTimer: 0,
    speed: 80 // píxeles por segundo
}

pacman.nextDirection = pacman.direction;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === LOADER DE IMÁGENES ===
//loader de imágenes
let imagesLoaded = 0;
let totalImages = 0;

function loadImage(src) {
    totalImages++;
    const img = new Image();
    img.src = src;

    img.onload = () => {
        imagesLoaded++;
        console.log(`Imagen cargada: ${src} (${imagesLoaded}/${totalImages})`);
    };

    img.onerror = () => {
        imagesLoaded++;
        console.error("Error cargando imagen:", src);
    };

    return img;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === TILES DEL MAPA ===
const tiles = {
    //los números que faltan fueron eliminados ya que son tiles que nunca se utilizan
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

    58: loadImage('SPRITES/pac man tiles/tile058.png'), //FANTASMAS esqina superior izquierda
    59: loadImage('SPRITES/pac man tiles/tile059.png'), //FANTASMAS esquina superior derecha
    60: loadImage('SPRITES/pac man tiles/tile060.png'), //FANTASMAS esquina inferior izquierda
    61: loadImage('SPRITES/pac man tiles/tile061.png'), //FANTASMAS esquina inferior derecha
    62: loadImage('SPRITES/pac man tiles/tile062.png'), //FANTASMAS muro inferior
    63: loadImage('SPRITES/pac man tiles/tile063.png'), //FANTASMAS puerta 1
    64: loadImage('SPRITES/pac man tiles/tile064.png'), //FANTASMAS puerta 2
    65: loadImage('SPRITES/pac man tiles/tile065.png'), //FANTASMAS puerta 3

    //Tiles añadidos
    70: loadImage('SPRITES/pac man tiles/tile070.png'), //FANTASMAS pared izquierda
    71: loadImage('SPRITES/pac man tiles/tile071.png'), //FANTASMAS pared derecha
    72: loadImage('SPRITES/pac man tiles/tile072.png'), //OBSTACULO2 cierre horizontal izquierdo
    73: loadImage('SPRITES/pac man tiles/tile073.png'), //OBSTACULO2 pared arriba
    74: loadImage('SPRITES/pac man tiles/tile074.png'), //OBSTACULO2 pared izquierda
    75: loadImage('SPRITES/pac man tiles/tile075.png'), //OBSTACULO2 pared abajo
    76: loadImage(`SPRITES/pac man tiles/tile076.png`), //OBSTACULO2 pared derecha
    77: loadImage('SPRITES/pac man tiles/tile077.png'), //OBSTACULO2 cierre vertical arriba
    78: loadImage('SPRITES/pac man tiles/tile078.png') //OBSTACULO2 cierre vertical abajo
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === ANIMACIONES ===
//animaciones de pacman
const pacmanAnimations = {
    right: {
        frames: [
            loadImage('SPRITES/pacman/pacman_closed.png'),
            loadImage('SPRITES/pacman/pacman_right1.png'),
            loadImage('SPRITES/pacman/pacman_right2.png'),
            loadImage('SPRITES/pacman/pacman_right1.png')

        ],
        speed: 0.15,
        loop: true
    },
    left: {
        frames: [
            loadImage('SPRITES/pacman/pacman_closed.png'),
            loadImage('SPRITES/pacman/pacman_left1.png'),
            loadImage('SPRITES/pacman/pacman_left2.png'),
            loadImage('SPRITES/pacman/pacman_left1.png')
        ],
        speed: 0.15,
        loop: true
    },
    up: {
        frames: [
            loadImage('SPRITES/pacman/pacman_closed.png'),
            loadImage('SPRITES/pacman/pacman_up1.png'),
            loadImage('SPRITES/pacman/pacman_up2.png'),
            loadImage('SPRITES/pacman/pacman_up1.png')
        ],
        speed: 0.15,
        loop: true
    },
    down: {
        frames: [
            loadImage('SPRITES/pacman/pacman_closed.png'),
            loadImage('SPRITES/pacman/pacman_down1.png'),
            loadImage('SPRITES/pacman/pacman_down2.png'),
            loadImage('SPRITES/pacman/pacman_down1.png')
        ],
        speed: 0.15,
        loop: true
    },
    death: {
        frames: [
            loadImage('SPRITES/pacman/pacman_closed.png'),
            loadImage('SPRITES/pacman/pacman_death1.png'),
            loadImage('SPRITES/pacman/pacman_death2.png'),
            loadImage('SPRITES/pacman/pacman_death3.png'),
            loadImage('SPRITES/pacman/pacman_death4.png'),
            loadImage('SPRITES/pacman/pacman_death5.png'),
            loadImage('SPRITES/pacman/pacman_death6.png'),
            loadImage('SPRITES/pacman/pacman_death7.png'),
            loadImage('SPRITES/pacman/pacman_death8.png'),
            loadImage('SPRITES/pacman/pacman_death9.png'),
            loadImage('SPRITES/pacman/pacman_death10.png')
        ],
        speed: 0.1,
        loop: false
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === MÁTRIZ DEL MAPA ===
const maze = [
    [2, 6, 39, 6, 6, 6, 6, 6, 6, 6, 6, 6, 39, 6, 6, 6, 6, 6, 6, 6, 6, 6, 39, 6, 3],
    [7, 9, 13, 8, 8, 8, 8, 8, 8, 8, 8, 9, 13, 9, 8, 8, 8, 8, 8, 8, 8, 8, 13, 9, 7],
    [7, 8, 13, 8, 45, 73, 73, 73, 73, 73, 46, 8, 13, 8, 45, 73, 73, 73, 73, 73, 46, 8, 13, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 74, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 15, 8, 47, 75, 75, 75, 75, 75, 48, 8, 13, 8, 47, 75, 75, 75, 75, 75, 48, 8, 15, 8, 7],
    [7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 13, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 7],
    [5, 6, 6, 6, 3, 8, 72, 43, 43, 43, 42, 8, 15, 8, 72, 43, 43, 43, 42, 8, 2, 6, 6, 6, 4],
    [1, 1, 1, 1, 7, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 7, 1, 1, 1, 1],
    [1, 1, 1, 1, 38, 10, 10, 10, 10, 10, 12, 8, 1, 8, 11, 10, 10, 10, 10, 10, 40, 1, 1, 1, 1],
    [1, 1, 1, 1, 7, 8, 8, 8, 8, 8, 8, 8, 1, 8, 8, 8, 8, 8, 8, 8, 7, 1, 1, 1, 1],
    [1, 1, 1, 1, 7, 8, 45, 73, 46, 8, 8, 8, 8, 8, 8, 8, 45, 73, 46, 8, 7, 1, 1, 1, 1],
    [6, 6, 6, 6, 4, 8, 74, 1, 76, 8, 58, 63, 64, 65, 59, 8, 74, 1, 76, 8, 5, 6, 6, 6, 6],
    [8, 8, 8, 8, 8, 8, 74, 1, 76, 8, 70, 1, 1, 1, 71, 8, 74, 1, 76, 8, 8, 8, 8, 8, 8],
    [6, 6, 6, 6, 3, 8, 74, 1, 76, 8, 60, 62, 62, 62, 61, 8, 74, 1, 76, 8, 2, 6, 6, 6, 6],
    [1, 1, 1, 1, 7, 8, 74, 1, 76, 8, 8, 8, 8, 8, 8, 8, 74, 1, 76, 8, 7, 1, 1, 1, 1],
    [1, 1, 1, 1, 7, 8, 74, 1, 76, 8, 45, 73, 73, 73, 46, 8, 74, 1, 76, 8, 7, 1, 1, 1, 1],
    [1, 1, 1, 1, 7, 8, 74, 1, 76, 8, 74, 1, 1, 1, 76, 8, 74, 1, 76, 8, 7, 1, 1, 1, 1],
    [2, 6, 6, 6, 4, 8, 47, 75, 48, 8, 47, 75, 75, 75, 48, 8, 47, 75, 48, 8, 5, 6, 6, 6, 3],
    [7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 8, 8, 8, 8, 8, 9, 8, 8, 8, 8, 8, 8, 8, 8, 7],
    [7, 8, 14, 8, 45, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 73, 46, 8, 14, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 13, 8, 74, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 76, 8, 13, 8, 7],
    [7, 8, 13, 8, 47, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 48, 8, 13, 8, 7],
    [7, 9, 13, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 8, 8, 8, 8, 8, 8, 8, 8, 8, 13, 9, 7],
    [5, 6, 37, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 37, 6, 4]
];

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === FUNCIONES DE DIBUJADO ===
//dibujar a pacman
function drawPacman() {
    const anim = pacmanAnimations[pacman.animation];
    const frame = anim.frames[pacman.frameIndex];

    // placeholder si la imagen no está lista
    if (!frame.complete) {
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(pacman.px + TILE_SIZE/2, pacman.py + TILE_SIZE/2, TILE_SIZE/2, 0, Math.PI*2);
        ctx.fill();
        return;
    }

    ctx.drawImage(frame, pacman.px, pacman.py, TILE_SIZE, TILE_SIZE);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === FUNCIONES DE ACTUALIZACIÓN ===
//actualizar animaciones
function updateAnimation(entity, deltaTime) {
    const anim = pacmanAnimations[entity.animation];
    entity.frameTimer += deltaTime;
    if (entity.frameTimer >= anim.speed) {
        entity.frameTimer = 0;
        entity.frameIndex++;
        if (entity.frameIndex >= anim.frames.length) {
            entity.frameIndex = anim.loop ? 0 : anim.frames.length - 1;
        }
    }
}

//actualizar movimiento de pacman
function updatePacman(deltaTime) {
    const move = pacman.speed * deltaTime;

    // posiciones previas (esquina superior izquierda)
    const prevPx = pacman.px;
    const prevPy = pacman.py;

    // centros previos
    const prevCx = prevPx + TILE_SIZE / 2;
    const prevCy = prevPy + TILE_SIZE / 2;

    // tile actual basado en el centro
    const currTileX = Math.floor(prevCx / TILE_SIZE);
    const currTileY = Math.floor(prevCy / TILE_SIZE);
    const tileCenterX = currTileX * TILE_SIZE + TILE_SIZE / 2;
    const tileCenterY = currTileY * TILE_SIZE + TILE_SIZE / 2;

    // calcular posición tentativa según la dirección actual
    let tentativePx = prevPx;
    let tentativePy = prevPy;
    switch (pacman.direction) {
        case 'right': tentativePx += move; break;
        case 'left':  tentativePx -= move; break;
        case 'up':    tentativePy -= move; break;
        case 'down':  tentativePy += move; break;
    }

    // centros tentativos
    const tentativeCx = tentativePx + TILE_SIZE / 2;
    const tentativeCy = tentativePy + TILE_SIZE / 2;

    // INTENTO DE GIRO: usar el centro del sprite para decidir
    if (pacman.nextDirection && pacman.nextDirection !== pacman.direction) {
        let canTurn = false;

        // detectar si se ha cruzado el centro del tile entre prev y tentative (o está dentro de una pequeña tolerancia)
        const crossedCenterX = (prevCx - tileCenterX) * (tentativeCx - tileCenterX) <= 0;
        const crossedCenterY = (prevCy - tileCenterY) * (tentativeCy - tileCenterY) <= 0;
        const centeredX = Math.abs(prevCx - tileCenterX) < 4 || Math.abs(tentativeCx - tileCenterX) < 4;
        const centeredY = Math.abs(prevCy - tileCenterY) < 4 || Math.abs(tentativeCy - tileCenterY) < 4;

        if ((pacman.nextDirection === 'left' || pacman.nextDirection === 'right') && (centeredY || crossedCenterY)) {
            const targetTileX = pacman.nextDirection === 'left' ? currTileX - 1 : currTileX + 1;
            if (canMove(targetTileX, currTileY)) canTurn = true;
        }

        if ((pacman.nextDirection === 'up' || pacman.nextDirection === 'down') && (centeredX || crossedCenterX)) {
            const targetTileY = pacman.nextDirection === 'up' ? currTileY - 1 : currTileY + 1;
            if (canMove(currTileX, targetTileY)) canTurn = true;
        }

        // Aplicar giro y ajustar la posición al grid (snap)
        if (canTurn) {
            pacman.direction = pacman.nextDirection;
            pacman.animation = pacman.nextDirection;
            // alinear la coordenada perpendicular al movimiento al inicio del tile (top-left)
            if (pacman.direction === 'left' || pacman.direction === 'right') pacman.py = currTileY * TILE_SIZE;
            if (pacman.direction === 'up' || pacman.direction === 'down') pacman.px = currTileX * TILE_SIZE;

            // recalcular tentativas tras el giro
            tentativePx = pacman.px;
            tentativePy = pacman.py;
            switch (pacman.direction) {
                case 'right': tentativePx += move; break;
                case 'left':  tentativePx -= move; break;
                case 'up':    tentativePy -= move; break;
                case 'down':  tentativePy += move; break;
            }
        }
    }

    // usar la posición tentativa como nueva posición candidata
    let newPx = tentativePx;
    let newPy = tentativePy;

    // TILES QUE OCUPARÁ PAC-MAN
    const leftTile   = Math.floor(newPx / TILE_SIZE);
    const rightTile  = Math.floor((newPx + TILE_SIZE - 1) / TILE_SIZE);
    const topTile    = Math.floor(newPy / TILE_SIZE);
    const bottomTile = Math.floor((newPy + TILE_SIZE - 1) / TILE_SIZE);

    // COMPROBAR COLISIONES
    let canMoveX = true;
    let canMoveY = true;

    if (pacman.direction === 'right') {
        if (!canMove(rightTile, topTile) || !canMove(rightTile, bottomTile)) canMoveX = false;
    }
    if (pacman.direction === 'left') {
        if (!canMove(leftTile, topTile) || !canMove(leftTile, bottomTile)) canMoveX = false;
    }
    if (pacman.direction === 'up') {
        if (!canMove(leftTile, topTile) || !canMove(rightTile, topTile)) canMoveY = false;
    }
    if (pacman.direction === 'down') {
        if (!canMove(leftTile, bottomTile) || !canMove(rightTile, bottomTile)) canMoveY = false;
    }

    // APLICAR MOVIMIENTO SOLO SI ES POSIBLE
    if (canMoveX) pacman.px = newPx;
    if (canMoveY) pacman.py = newPy;

    // ACTUALIZAR TILE ACTUAL
    const oldTileX = pacman.x;
    const oldTileY = pacman.y;

    pacman.x = Math.floor(pacman.px / TILE_SIZE);
    pacman.y = Math.floor(pacman.py / TILE_SIZE);

    // COMER PÍLDORA
    if ((pacman.x !== oldTileX || pacman.y !== oldTileY) && (maze[pacman.y][pacman.x] === 8 || maze[pacman.y][pacman.x] === 9)) {
        maze[pacman.y][pacman.x] = 1;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === GESTIÓN DE TECLAS ===
canvas.addEventListener('keydown', e => {
    switch(e.key) {
        case 'ArrowUp': pacman.nextDirection = 'up'; break;
        case 'ArrowDown': pacman.nextDirection = 'down'; break;
        case 'ArrowLeft': pacman.nextDirection = 'left'; break;
        case 'ArrowRight': pacman.nextDirection = 'right'; break;
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === DETECCIÓN DE COLISIONES ===
function isWall(tile) {
    return tile !== 1 && tile !== 8 && tile !== 9;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === MÉTODOS DE MOVIMIENTO ===
//comprueba si puede avanzar
function canMove(tileX, tileY) {
    // Verifica que el tile exista y no sea muro (comprobación correcta de undefined)
    if (typeof maze[tileY] === 'undefined' || typeof maze[tileY][tileX] === 'undefined') return false;
    return !isWall(maze[tileY][tileX]);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === COMPROBAR QUE TODAS LAS IMÁGENES HAN SIDO CARGADAS PARA INICIAR EL JUEGO ===
function checkAllImagesLoaded() {
    if (imagesLoaded === totalImages) {
        console.log("Todas las imágenes cargadas. Iniciando el juego...");
        startGame();
    } else {
        // opcional: sigue revisando hasta que todas estén listas
        setTimeout(checkAllImagesLoaded, 50);
    }
}

checkAllImagesLoaded();
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === BUCLE PRINCIPAL DEL JUEGO ===
let lastTime = 0;

function gameLoop(time) {
    const deltaTime = (time - lastTime) / 1000;
    lastTime = time;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMaze();
    updatePacman(deltaTime);
    updateAnimation(pacman, deltaTime);
    drawPacman();

    requestAnimationFrame(gameLoop);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// === INICIO DEL JUEGO ===
function startGame() {
    // ajustar canvas al tamaño de ventana antes de empezar
    resizeCanvasToWindow();
    window.addEventListener('resize', resizeCanvasToWindow);
    requestAnimationFrame(gameLoop);
}