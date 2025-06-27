import gameConfig from "./gameConfig";
import NightSky from "./objects/nighSky";
import Paddle from "./objects/paddle";
import Ball from "./objects/ball";
import Bot from "./bot/bot";

class Game {
    constructor(canvas, gameType, scoreHandlers) {
        // Basic Game Config
        this.canvas = canvas;
        this.gameType = gameType;

        // Game Objects
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ball = null;
        this.nightSky = null;

        // Paddle Movement Controls
        this.keyState = {
            w: false,
            s: false,
            ArrowUp: false,
            ArrowDown: false,
        };
        this.buttonState = {
            leftUp: false,
            leftDown: false,
            rightUp: false,
            rightDown: false
        }

        this.paddleMovementControl = {}
        if (gameType === "u/vs/u") {
            this.paddleMovementControl.left = "user"
            this.paddleMovementControl.right = "user"
        } else if (gameType === "b/vs/b") {
            this.paddleMovementControl.left = "bot"
            this.paddleMovementControl.right = "bot"
            this.leftPaddleBot = new Bot();
            this.rightPaddleBot = new Bot();
        } else {
            this.paddleMovementControl.left = "user"
            this.paddleMovementControl.right = "bot"
            this.leftPaddleBot = null;
            this.rightPaddleBot = new Bot();
        }

        // Score based functions
        this.incrementLeftScore = scoreHandlers.incrementLeftPlayerScore;
        this.incrementRightScore = scoreHandlers.incrementRightPlayerScore;

        // Audios
        this.hitSound = new Audio(`${process.env.PUBLIC_URL}/audios/hit.mp3`);
        this.hitSound.volume = 0.5;
        this.scoreSound = new Audio(`${process.env.PUBLIC_URL}/audios/score.mp3`
        );
        this.scoreSound.volume = 0.5;
    }

    generateAndResizeGameObjects() {
        const canvasPadding = this.canvas.width * gameConfig.PADDLE.SPACING_PERC;
        const paddleWidth = this.canvas.width * gameConfig.PADDLE.WIDTH_PERC;
        const paddleHeight = this.canvas.height * gameConfig.PADDLE.HEIGHT_PERC;
        const paddleVelocity = this.canvas.height * gameConfig.PADDLE.VELOCITY_PERC;
        const ballRadius = this.canvas.height * gameConfig.BALL.RADIUS_PERC;

        const leftPaddleX = canvasPadding + paddleWidth / 2;
        const leftPaddleY = this.canvas.height / 2;
        const rightPaddleX = this.canvas.width - canvasPadding - paddleWidth / 2;
        const rightPaddleY = this.canvas.height / 2;
        const incBallVelocity = gameConfig.BALL.VELOCITY_INC_PERC * this.canvas.width;
        const maxBallVelocity = gameConfig.BALL.VELOCITY_MAX_PERC * this.canvas.width;
        const ballX = this.canvas.width / 2;
        const ballY = this.canvas.height / 2;
        const ballInitAngle = Ball.getRandomAngle(-30, 30, [0]);
        const ballInitDirection = Math.random() < 0.5 ? 1 : -1;
        const ballInitVelocity = gameConfig.BALL.VELOCITY_X_PERC * this.canvas.width;
        const ballInitVelocityX = ballInitDirection * Math.abs(
            Math.cos(ballInitAngle) * ballInitVelocity
        );
        const ballInitVelocityY = Math.sin(ballInitAngle) * ballInitVelocity;
        const ballVelocityX = ballInitVelocityX;
        const ballVelocityY = ballInitVelocityY;

        this.leftPaddle = new Paddle(
            leftPaddleX,
            leftPaddleY,
            paddleWidth,
            paddleHeight,
            paddleVelocity,
        );
        this.rightPaddle = new Paddle(
            rightPaddleX,
            rightPaddleY,
            paddleWidth,
            paddleHeight,
            paddleVelocity
        );
        this.ball = new Ball(
            ballX,
            ballY,
            ballRadius,
            ballVelocityX,
            ballVelocityY,
            incBallVelocity,
            maxBallVelocity
        );
        this.nightSky = new NightSky(
            20,
            this.canvas.width,
            this.canvas.height,
        )
    }

    isBallOutOfBoundary() {
        return this.ball.y < 0 || this.ball.y > this.canvas.height;
    }

    handleCollisions() {
        // Collision with ceiling and floor
        if (
            (this.ball.y + this.ball.radius >= this.canvas.height) ||
            (this.ball.y - this.ball.radius <= 0)
        ) {
            this.ball.velocityY *= -1;
        }

        // Collision with paddles
        if (this.ball.velocityX < 0) {
            // Check for left paddle collision - if the y coordinate of ball lie between the y coordinates of upper and lower edge of the paddle
            if (
                (this.ball.y + this.ball.radius) >= (this.leftPaddle.y - this.leftPaddle.height / 2) &&
                (this.ball.y - this.ball.radius) <= (this.leftPaddle.y + this.leftPaddle.height / 2)
            ) {
                // Then, we check if the leftmost point on ball's circumference lie on or to the left of the paddle
                if (
                    (this.ball.x - this.ball.radius) <= (
                        this.leftPaddle.x + this.leftPaddle.width / 2
                    )
                ) {
                    this.ball.velocityX *= -1;
                    this.ball.accelerate();
                    this.hitSound.play();

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.leftPaddle.y - this.ball.y;
                    const reductionFactor = (this.leftPaddle.height / 2) / (gameConfig.BALL.VELOCITY_Y_PERC * this.canvas.height);
                    this.ball.velocityY = -1 * differenceInY / reductionFactor;
                }
            }
        } else {
            // Check for right paddle collision - if the y coordinate of ball lie between the y coordinates of upper and lower edge of the paddle
            if (
                (this.ball.y + this.ball.radius) >= (this.rightPaddle.y - this.rightPaddle.height / 2) &&
                (this.ball.y - this.ball.radius) <= (this.rightPaddle.y + this.rightPaddle.height / 2)
            ) {
                // Then, we check if the rightmost point on ball's circumference lie on or to the right of the paddle
                if (
                    (this.ball.x + this.ball.radius) >= (
                        this.rightPaddle.x - this.rightPaddle.width / 2
                    )
                ) {
                    this.ball.velocityX *= -1;
                    this.ball.accelerate();
                    this.hitSound.play();

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.rightPaddle.y - this.ball.y;
                    const reductionFactor = (this.rightPaddle.height / 2) / (gameConfig.BALL.VELOCITY_Y_PERC * this.canvas.height);
                    this.ball.velocityY = -1 * differenceInY / reductionFactor;
                }
            }
        }

        // Collision with left and right walls
        if (
            this.ball.x < 0 ||
            (this.isBallOutOfBoundary() && this.ball.velocityX > 0)
        ) {
            this.incrementRightScore();
            this.scoreSound.play();
            const newX = this.rightPaddle.x - this.rightPaddle.width / 2 - this.ball.radius;
            const newY = Ball.getRandomPosition(
                this.rightPaddle.y - this.rightPaddle.height / 2,
                this.rightPaddle.y + this.rightPaddle.height / 2,
                [this.rightPaddle.y]
            );
            this.ball.reset(newX, newY);
        } else if (
            this.ball.x > this.canvas.width ||
            (this.isBallOutOfBoundary() && this.ball.velocityX < 0)
        ) {
            this.incrementLeftScore();
            this.scoreSound.play();
            const newX = this.leftPaddle.x + this.leftPaddle.width / 2 + this.ball.radius;
            const newY = Ball.getRandomPosition(
                this.leftPaddle.y - this.leftPaddle.height / 2,
                this.leftPaddle.y + this.leftPaddle.height / 2,
                [this.leftPaddle.y]
            );
            this.ball.reset(newX, newY);
        }
    }

    movePaddle(whichPaddle, direction) {
        const paddle = whichPaddle === "left" ? this.leftPaddle : this.rightPaddle;
        const customVelocity = this.paddleMovementControl[whichPaddle] === "user" ? null : paddle.velocity / 2; // Smooth movement step

        if (direction === "up") {
            paddle.moveUp(customVelocity);
        } else if (direction === "down") {
            paddle.moveDown(customVelocity);
        }
        let validMove = true;
        const lowerBound = paddle.height / 2;
        const upperBound = this.canvas.height - paddle.height / 2;
        if (paddle.y < lowerBound || paddle.y > upperBound) {
            validMove = false;
            paddle.y = Math.max(lowerBound, Math.min(upperBound, paddle.y));
        }
        return validMove;
    }

    updatePaddles() {
        if (this.paddleMovementControl.left === "user") {
            // Update left paddle based on keys
            if (
                (this.keyState.w && !this.buttonState.leftUp) ||
                (this.buttonState.leftUp && !this.keyState.w)
            ) {
                this.movePaddle("left", "up");
            }
            if (
                (this.keyState.s && !this.buttonState.leftDown) ||
                (this.buttonState.leftDown && !this.keyState.s)
            ) {
                this.movePaddle("left", "down");
            }
        } else {
            // Update left paddle based on bot's logic
            const leftBotInputs = [
                this.leftPaddle.y,
                Math.abs(this.leftPaddle.x - this.ball.x),
                this.ball.y
            ];
            const decision = this.leftPaddleBot.decide(leftBotInputs);
            if (decision !== null) {
                this.movePaddle("left", decision);
            }
        }

        if (this.paddleMovementControl.right === "user") {
            // Update right paddle based on keys
            if (
                (this.keyState.ArrowUp && !this.buttonState.rightUp) ||
                (this.buttonState.rightUp && !this.keyState.ArrowUp)
            ) {
                this.movePaddle("right", "up");
            }
            if (
                (this.keyState.ArrowDown && !this.buttonState.rightDown) ||
                (this.buttonState.rightDown && !this.keyState.ArrowDown)
            ) {
                this.movePaddle("right", "down");
            }
        } else {
            // Update right paddle based on bot's logic
            const rightBotInputs = [
                this.rightPaddle.y,
                Math.abs(this.rightPaddle.x - this.ball.x),
                this.ball.y
            ];
            const decision = this.rightPaddleBot.decide(rightBotInputs);
            if (decision !== null) {
                this.movePaddle("right", decision);
            }
        }
    }

    updateGameObjects() {
        // Move paddles based on key presses or console button clicks
        this.updatePaddles();
        // Move the ball
        this.ball.move();
        // Handle collision of ball with walls and paddles
        this.handleCollisions();
    }

    draw() {
        const ctx = this.canvas.getContext("2d");
        // Clear canvas
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw Night Sky
        this.nightSky.draw(this.canvas);

        // Draw Paddles and Ball
        this.leftPaddle.draw(this.canvas);
        this.rightPaddle.draw(this.canvas);
        this.ball.draw(this.canvas);
    }
}

export default Game;