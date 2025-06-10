import constants from "../store/constants";
import NightSky from "./nighSky";
import Paddle from "./paddle";
import Ball from "./ball";

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.frameDuration = 1000 / constants.TARGET_FPS;
        this.keyState = {
            ArrowUp: false,
            ArrowDown: false,
        }
        this.leftPaddle = null;
        this.rightPaddle = null;
        this.ball = null;
        this.nightSky = null;
    }

    resizeGameObjects() {
        const canvasPadding = this.canvas.width * constants.SPACING.PADDING_PERC;
        const paddleWidth = this.canvas.width * constants.SIZING.PADDLE_WIDTH_PERC;
        const paddleHeight = this.canvas.height * constants.SIZING.PADDLE_HEIGHT_PERC;
        const paddleVelocity = this.canvas.height * constants.PADDLE_VELOCITY_PERC;
        const ballRadius = this.canvas.height * constants.SIZING.BALL_RADIUS_PERC;

        const leftPaddleX = canvasPadding + paddleWidth / 2;
        const leftPaddleY = this.leftPaddle ?
            this.leftPaddle.y * this.leftPaddle.yRatio * this.canvas.height :
            this.canvas.height / 2;
        const rightPaddleX = this.canvas.width - canvasPadding - paddleWidth / 2;
        const rightPaddleY = this.rightPaddle ?
            this.rightPaddle.y * this.rightPaddle.yRatio * this.canvas.height :
            this.canvas.height / 2;
        const ballX = this.ball ?
            this.ball.x * this.ball.xRatio * this.canvas.width :
            this.canvas.width / 2;
        const ballY = this.ball ?
            this.ball.y * this.ball.yRatio * this.canvas.height :
            this.canvas.height / 2;
        const ballVelocityX = this.ball ?
            this.ball.velocityX * this.ball.xRatio * this.canvas.width :
            constants.BALL_VELOCITY_X_PERC * this.canvas.width;
        const ballVelocityY = this.ball ?
            this.ball.velocityY * this.ball.yRatio * this.canvas.height :
            0;

        this.leftPaddle = new Paddle(
            leftPaddleX,
            leftPaddleY,
            1 / this.canvas.height,
            paddleWidth,
            paddleHeight,
            paddleVelocity,
        );
        this.rightPaddle = new Paddle(
            rightPaddleX,
            rightPaddleY,
            1 / this.canvas.height,
            paddleWidth,
            paddleHeight,
            paddleVelocity
        );
        this.ball = new Ball(
            ballX,
            ballY,
            1 / this.canvas.width,
            1 / this.canvas.height,
            ballRadius,
            ballVelocityX,
            ballVelocityY
        );
        this.nightSky = new NightSky(
            20,
            this.canvas.width,
            this.canvas.height,
        )
    }

    handleCollisions() {
        // Collision with ceiling and floor
        if (
            (this.ball.y + this.ball.radius >= this.canvas.height) ||
            (this.ball.y - this.ball.radius <= 0)
        ) {
            this.ball.velocityY *= -1;
        }

        if (this.ball.velocityX < 0) {
            // Check for left paddle collision - if the y coordinate of ball lie between the y coordinates of upper and lower edge of the paddle
            if (
                this.ball.y >= (this.leftPaddle.y - this.leftPaddle.height / 2) &&
                this.ball.y <= (this.leftPaddle.y + this.leftPaddle.height / 2)
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
                    const reductionFactor = (this.leftPaddle.height / 2) / (constants.BALL_VELOCITY_Y_MAX_PERC * this.canvas.height);
                    this.ball.velocityY = -1 * differenceInY / reductionFactor;
                }
            }
        } else {
            // Check for right paddle collision - if the y coordinate of ball lie between the y coordinates of upper and lower edge of the paddle
            if (
                this.ball.y >= (this.rightPaddle.y - this.rightPaddle.height / 2) &&
                this.ball.y <= (this.rightPaddle.y + this.rightPaddle.height / 2)
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
                    const reductionFactor = (this.rightPaddle.height / 2) / (constants.BALL_VELOCITY_Y_MAX_PERC * this.canvas.height);
                    this.ball.velocityY = -1 * differenceInY / reductionFactor;
                }
            }
        }
    }

    updateGameObjects() {
        if (this.keyState.ArrowUp) {
            this.leftPaddle.moveUp();
        }
        if (this.keyState.ArrowDown) {
            this.leftPaddle.moveDown();
        }
        this.leftPaddle.y = Math.max(
            this.leftPaddle.height / 2,
            Math.min(this.canvas.height - this.leftPaddle.height / 2, this.leftPaddle.y)
        );
        this.ball.move();
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

export function startGame(canvas) {
    let game = new Game(canvas);
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

    // Handle resizing
    const handleResize = () => {
        game.resizeGameObjects();
    };
    window.addEventListener("resize", handleResize);

    // Handle key presses
    const handleKeyDown = (e) => {
        e.preventDefault();
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            game.keyState[e.key] = true;
        }
    }
    const handleKeyUp = (e) => {
        e.preventDefault();
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
            game.keyState[e.key] = false;
        }
    }
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
