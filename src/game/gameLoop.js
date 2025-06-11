import constants from "../store/constants";
import NightSky from "./nighSky";
import Paddle from "./paddle";
import Ball from "./ball";

let game;

class Game {
    constructor(mainCanvas, scoreHandlers) {
        this.mainCanvas = mainCanvas;
        this.frameDuration = 1000 / constants.TARGET_FPS;
        this.manualOverride = false;
        this.keyState = {
            ArrowUp: false,
            ArrowDown: false,
            w: false,
            s: false,
        };
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ball = null;
        this.nightSky = null;
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
            ballVelocityY
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

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.leftPaddle.y - this.ball.y;
                    const reductionFactor = (this.leftPaddle.height / 2) / (constants.BALL_VELOCITY_Y_MAX_PERC * this.mainCanvas.height);
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

                    // Displacement between paddle's center and ball's y coordinate
                    const differenceInY = this.rightPaddle.y - this.ball.y;
                    const reductionFactor = (this.rightPaddle.height / 2) / (constants.BALL_VELOCITY_Y_MAX_PERC * this.mainCanvas.height);
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

    updateGameObjects() {
        // Update left paddle based on keys
        if (this.keyState.w) {
            this.leftPaddle.moveUp();
        }
        if (this.keyState.s) {
            this.leftPaddle.moveDown();
        }
        this.leftPaddle.y = Math.max(
            this.leftPaddle.height / 2,
            Math.min(this.mainCanvas.height - this.leftPaddle.height / 2, this.leftPaddle.y)
        );

        if (this.manualOverride) {
            // Update right paddle based on keys
            if (this.keyState.ArrowUp) {
                this.rightPaddle.moveUp();
            }
            if (this.keyState.ArrowDown) {
                this.rightPaddle.moveDown();
            }
        }
        this.rightPaddle.y = Math.max(
            this.rightPaddle.height / 2,
            Math.min(this.mainCanvas.height - this.rightPaddle.height / 2, this.rightPaddle.y)
        );

        // Move the ball
        this.ball.move();
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

// Handle resizing
function handleResize() {
    game.resizeGameObjects();
}

// Handle key presses
function handleKeyDown(e) {
    e.preventDefault();
    if (e.key in game.keyState) {
        game.keyState[e.key] = true;
    }
}

function handleKeyUp(e) {
    e.preventDefault();
    if (e.key in game.keyState) {
        game.keyState[e.key] = false;
    }
}

export function toggleManualOverride() {
    game.manualOverride = !game.manualOverride;
}

export function startGame(mainCanvas, scoreHandlers) {
    game = new Game(mainCanvas, scoreHandlers);
    let lastTime = performance.now();
    let animationFrameId;

    function gameLoop(currentTime) {
        const deltaTime = currentTime - lastTime;
        if (deltaTime >= game.frameDuration) {
            game.updateGameObjects();
            game.draw();
            lastTime = currentTime;
        }
        animationFrameId = requestAnimationFrame(gameLoop);
    };

    // Initialize and resize
    game.resizeGameObjects();
    animationFrameId = requestAnimationFrame(gameLoop);
    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp)

    // Cleanup
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleResize);
        window.removeEventListener("keyup", handleKeyUp);
    };
}
