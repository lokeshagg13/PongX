import constants from "../store/constants";
import Countdown from "./objects/countdown";
import Game from "./game";

let game;

// Handle resizing
function handleResize() {
    game.resizeGameObjects();
}

// Handle key press
function handleKeyDown(e) {
    if (e.key in game.keyState) {
        e.preventDefault();
        game.keyState[e.key] = true;
        game.buttonState[constants.KEYS_MAP[e.key]] = false;
    }
}

// Handle key up
function handleKeyUp(e) {
    if (e.key in game.keyState) {
        e.preventDefault();
        game.keyState[e.key] = false;
    }
}

// To Move Paddles by console buttons
export function movePaddle(whichPaddle = "left", direction = "up") {
    const state = `${whichPaddle}${direction[0].toUpperCase()}${direction.slice(1)}`
    game.buttonState[state] = true;
    game.keyState[constants.KEYS_MAP[state]] = false;
}

export function stopPaddle(whichPaddle = "left") {
    game.buttonState[`${whichPaddle}Up`] = false;
    game.buttonState[`${whichPaddle}Down`] = false;
}

// Start Game and Game Loop
export function initGame(gameCanvas, gameType, stateHandlers) {
    const { incrementLeftPlayerScore, incrementRightPlayerScore } = stateHandlers;
    game = new Game(gameCanvas, gameType, {
        incrementLeftPlayerScore, incrementRightPlayerScore
    });
    const countdown = new Countdown(3);

    const frameDuration = 1000 / constants.TARGET_FPS;
    let lastTime = performance.now();
    let animationFrameId;
    let isPaused = false;

    function startGameLoop() {
        function gameLoop(currentTime) {
            if (!isPaused) {
                const deltaTime = currentTime - lastTime;
                if (deltaTime >= frameDuration) {
                    game.updateGameObjects();
                    game.draw();
                    lastTime = currentTime;
                }
                animationFrameId = requestAnimationFrame(gameLoop);
            }
        }

        game.resizeGameObjects();
        animationFrameId = requestAnimationFrame(gameLoop);

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }

    function countdownLoop() {
        if (countdown.count > 0) {
            countdown.draw(gameCanvas);
            countdown.decrementCount();
            setTimeout(countdownLoop, 1000);
        } else {
            stateHandlers.toggleCountdownState();
            startGameLoop();
        }
    }

    // Start Game
    function startGame() {
        isPaused = false;
        lastTime = performance.now();
        stateHandlers.toggleCountdownState();
        countdownLoop();
    }

    // Pause Game
    function pauseGame() {
        if (!isPaused) {
            isPaused = true;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }

    // Resume Game
    function resumeGame() {
        if (isPaused) {
            isPaused = false;
            lastTime = performance.now();
            animationFrameId = requestAnimationFrame(startGameLoop);
        }
    }

    // End Game
    function endGame() {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
    }

    return {
        startGame,
        pauseGame,
        resumeGame,
        endGame
    }
}