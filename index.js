const gameBoard  = document.querySelector('#gameBoard');
const ctx = gameBoard.getContext('2d');
const scoreText = document.querySelector('#scoreText');
const resetBtn = document.querySelector('#resetBtn');
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBg = 'white';
const snakecolor = 'lightgreen';
const snakeborder = 'black';
const foodColor = 'red';
const unitSize = 25;
let running = false;
let xVel = unitSize;
let yVel = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener('keydown', changeDirection);
resetBtn.addEventListener('click', resetGame);

alert("WELCOME TO DERRICK\'S SNAKE GAME!! ENJOY");
alert("HERE ARE THE INSTRUCTIONS;\n 1.You will loose as soon as you hit the lines\n 2. You can adjust the speed in the script \n 3.If need be press the restart button\n 4.Grow your snake as large as you want \n 5. HAVE A DAMN GREAT DAY!!");
gameStart();


function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        },100);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBg;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) / unitSize)) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood(){ 
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVel, y: snake[0].y + yVel};

    snake.unshift(head);
    // if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY ){
        score+=1;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakecolor;
    ctx.strokeStyle = snakeborder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUP = (yVel == -unitSize);
    const goingDOWN = (yVel == unitSize);
    const goingRIGHT = (xVel == unitSize);
    const goingLEFT = (xVel == -unitSize);

    switch(true){
        case (keyPressed == LEFT && !goingRIGHT):
            xVel = -unitSize;
            yVel = 0;
            break;
        case (keyPressed == UP && !goingDOWN):
            xVel = 0;
            yVel = -unitSize;
            break;
        case (keyPressed == RIGHT && !goingLEFT):
            xVel = unitSize;
            yVel = 0;
            break;
        case (keyPressed == DOWN && !goingUP):
            xVel = 0;
            yVel = unitSize;
            break;
    }

};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = '50px MV Boli';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER!!', gameWidth / 2, gameHeight /2);
    running = false;
};
function resetGame(){
    score = 0;
    xVel = unitSize;
    yVel = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
};