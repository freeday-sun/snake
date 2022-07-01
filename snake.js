window.onload = function () {
    const cvs = document.getElementById('canvas');
    const ctx = cvs.getContext('2d');

    let cvsW = cvs.width;
    let cvsH = cvs.height;

    const snakeW = 20;
    const snakeH = 20;

    const snakeLength = 4;
    let snake = [];
    let direction = "right";
    let score = 4;

    for (let i = snakeLength - 1; i >= 0; i--) {
        snake.push({x: i, y: 0});
    }

    function drawSnake(x, y) {
        ctx.fillStyle = "#FFF";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "green"
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }

    let food = {
        x: Math.round(Math.random() * (cvsW / snakeW - 1) + 1),
        y: Math.round(Math.random() * (cvsH / snakeH - 1) + 1)
    }

    function drawFood(x, y) {
        ctx.fillStyle = "blue";
        ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);

        ctx.fillStyle = "green"
        ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH);
    }

    function drawScore(x){
        ctx.fillStyle = "red";
        ctx.fillText("score: " +x, 5, cvsH-5);
        ctx.font = "40px Verdana";
    }
    function checkCollision(x, y, array) {
        for (let i = 1; i < array.length - 1; i++) {
            if (x === array[i].x && y === array[i].y) {return true;}
        }
        return false;
    }

    function draw() {
        ctx.clearRect(0, 0, cvsW, cvsH);
        for (let i = 0; i < snake.length; i++) {
            let x = snake[i].x;
            let y = snake[i].y;
            drawSnake(x, y);
        }
        drawFood(food.x, food.y)
        let snakeHeadX = snake[0].x;
        let snakeHeadY = snake[0].y;
        if (snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= cvsW / snakeW || snakeHeadY >= cvsH / snakeH
            || checkCollision(snakeHeadX, snakeHeadY, snake)) {
             location.reload();
        }

        document.addEventListener('keydown', getDirection);

        function getDirection(e) {
            if (e.keyCode === 37 && direction !== "right") {
                direction = "left";
            } else if (e.keyCode === 38 && direction !== "down") {
                direction = "up";
            } else if (e.keyCode === 39 && direction !== "left") {
                direction = "right";
            } else if (e.keyCode === 40 && direction !== "up") {
                direction = "down";
            }
        }

        if (direction === "left") snakeHeadX--;
        else if (direction === "up") snakeHeadY--;
        else if (direction === "right") snakeHeadX++;
        else if (direction === "down") snakeHeadY++;

        if (snakeHeadX === food.x && snakeHeadY === food.y) {
            food = {
                x: Math.round(Math.random() * (cvsW / snakeW - 1) + 1),
                y: Math.round(Math.random() * (cvsH / snakeH - 1) + 1)
            }
            drawFood(food.x, food.y)
            score++;
        } else {
            snake.pop();
        }

        snake.unshift({x: snakeHeadX, y: snakeHeadY})
        drawScore(score)
    }
    console.log(food)


    setInterval(draw, 100);
}
