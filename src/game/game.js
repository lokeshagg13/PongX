import constants from "../store/constants";
import NightSky from "./nighSky";
import Paddle from "./paddle";
import Ball from "./ball";

class Game {
    constructor(mainCanvas, gameType, scoreHandlers) {
        // Basic Game Config
        this.mainCanvas = mainCanvas;
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
        this.paddleMovementControl = {
            left: "user",
            right: "bot"
        }
        if (gameType === "u/vs/u") {
            this.paddleMovementControl.right = "user"
        } else if (gameType === "b/vs/b") {
            this.paddleMovementControl.left = "bot"
        }

        // Ball Velocity Controls
        this.paddleHitCount = 0;

        // Score based functions
        this.incrementLeftScore = scoreHandlers.incrementLeftPlayerScore;
        this.incrementRightScore = scoreHandlers.incrementRightPlayerScore;
    }

    resizeGameObjects() {
        const canvasPadding = this.mainCanvas.width * constants.SPACING.PADDING_PERC;
        const paddleWidth = this.mainCanvas.width * constants.SIZING.PADDLE_WIDTH_PERC;
        const paddleHeight = this.mainCanvas.height * constants.SIZING.PADDLE_HEIGHT_PERC;
        const paddleVelocity = this.mainCanvas.height * constants.PADDLE_VELOCITY_PERC;
        const ballRadius = this.mainCanvas.height * constants.SIZING.BALL_RADIUS_PERC;

        const leftPaddleX = canvasPadding + paddleWidth / 2;
        const leftPaddleY = this.leftPaddle ?
            this.leftPaddle.y * this.leftPaddle.yRatio * this.mainCanvas.height :
            this.mainCanvas.height / 2;
        const rightPaddleX = this.mainCanvas.width - canvasPadding - paddleWidth / 2;
        const rightPaddleY = this.rightPaddle ?
            this.rightPaddle.y * this.rightPaddle.yRatio * this.mainCanvas.height :
            this.mainCanvas.height / 2;
        const ballX = this.ball ?
            this.ball.x * this.ball.xRatio * this.mainCanvas.width :
            this.mainCanvas.width / 2;
        const ballY = this.ball ?
            this.ball.y * this.ball.yRatio * this.mainCanvas.height :
            this.mainCanvas.height / 2;
        const ballVelocityX = this.ball ?
            this.ball.velocityX * this.ball.xRatio * this.mainCanvas.width :
            constants.BALL_VELOCITY_X_PERC * this.mainCanvas.width;
        const ballVelocityY = this.ball ?
            this.ball.velocityY * this.ball.yRatio * this.mainCanvas.height :
            0;
        const incBallVelocity = constants.BALL_VELOCITY_INC_PERC * this.mainCanvas.width;
        const maxBallVelocity = constants.BALL_VELOCITY_MAX_PERC * this.mainCanvas.width;

        this.leftPaddle = new Paddle(
            leftPaddleX,
            leftPaddleY,
            1 / this.mainCanvas.height,
            paddleWidth,
            paddleHeight,
            paddleVelocity,
        );
        this.rightPaddle = new Paddle(
            rightPaddleX,
            rightPaddleY,
            1 / this.mainCanvas.height,
            paddleWidth,
            paddleHeight,
            paddleVelocity
        );
        this.ball = new Ball(
            ballX,
            ballY,
            1 / this.mainCanvas.width,
            1 / this.mainCanvas.height,
            ballRadius,
            ballVelocityX,
            ballVelocityY,
            incBallVelocity,
            maxBallVelocity
        );
        this.nightSky = new NightSky(
            20,
            this.mainCanvas.width,
            this.mainCanvas.height,
        )
    }

    handleCollisions() {
        // Collision with ceiling and floor
        if (
            (this.ball.y + this.ball.radius >= this.mainCanvas.height) ||
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

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.leftPaddle.y - this.ball.y;
                    const reductionFactor = (this.leftPaddle.height / 2) / (constants.BALL_VELOCITY_Y_PERC * this.mainCanvas.height);
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

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.rightPaddle.y - this.ball.y;
                    const reductionFactor = (this.rightPaddle.height / 2) / (constants.BALL_VELOCITY_Y_PERC * this.mainCanvas.height);
                    this.ball.velocityY = -1 * differenceInY / reductionFactor;
                }
            }
        }

        // Collision with left and right walls
        if (this.ball.x < 0) {
            this.incrementRightScore();
            this.ball.reset();
        } else if (this.ball.x > this.mainCanvas.width) {
            this.incrementLeftScore();
            this.ball.reset();
        }
    }

    movePaddle(whichPaddle, direction) {
        const paddle = whichPaddle === "left" ? this.leftPaddle : this.rightPaddle;
        if (direction === "up") {
            paddle.moveUp();
        } else {
            paddle.moveDown();
        }

        // Clamp paddle position to within canvas bounds
        paddle.y = Math.max(
            paddle.height / 2,
            Math.min(this.mainCanvas.height - paddle.height / 2, paddle.y)
        );
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
        }
    }

    updateGameObjects() {
        // Move paddles based on key presses
        this.updatePaddles();
        // Move the ball
        this.ball.move();
        // Handle collision of ball with walls and paddles
        this.handleCollisions();
    }

    draw() {
        const mainCtx = this.mainCanvas.getContext("2d");
        // Clear mainCanvas
        mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        // Draw Night Sky
        this.nightSky.draw(this.mainCanvas);

        // Draw Paddles and Ball
        this.leftPaddle.draw(this.mainCanvas);
        this.rightPaddle.draw(this.mainCanvas);
        this.ball.draw(this.mainCanvas);
    }
}

export default Game;