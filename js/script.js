let canvas = document.getElementById("snake")
let h2Pontos = document.getElementById("pontos")
let context = canvas.getContext("2d")
let box = 32;
let snake = [];
let pontos = 0;

snake[0] = {
    x: getInteiroAleatorio() * box,
    y: getInteiroAleatorio() * box,
}
snake.direction = 'right';

let food = {
    x: getInteiroAleatorio() * box,
    y: getInteiroAleatorio() * box
}

function getInteiroAleatorio() {
    return Math.floor(Math.random() * 15 + 1);
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box)
}

function ateFood() {
    const foodX = getInteiroAleatorio() * box;
    const foodY = getInteiroAleatorio() * box;


    food.x = foodX;
    food.y = foodY;

    setPontos();
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && snake.direction != "right") snake.direction = "left";
    if (event.keyCode == 38 && snake.direction != "up") snake.direction = "down";
    if (event.keyCode == 39 && snake.direction != "left") snake.direction = "right";
    if (event.keyCode == 40 && snake.direction != "down") snake.direction = "up";
}


function setPontos() {
    h2Pontos.textContent = ++pontos;
}

function iniciarJogo() {
    if (snake[0].x > 15 * box) snake[0].x = 0;
    if (snake[0].x < 0 * box) snake[0].x = 15 * box;
    if (snake[0].y > 15 * box) snake[0].y = 0;
    if (snake[0].y < 0 * box) snake[0].y = 15 * box;

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert(`Game Over :(\nPontuação ${pontos}`);
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (snake.direction == "right") snakeX += box;
    if (snake.direction == "left") snakeX -= box;
    if (snake.direction == "up") snakeY += box;
    if (snake.direction == "down") snakeY -= box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        ateFood();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)