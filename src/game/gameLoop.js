import constants from "../store/constants";
import Countdown from "./countdown";
import Game from "./game";

let game;

// Handle resizing
function handleResize() {
    game.resizeGameObjects();
}

// Handle key press
function handleKeyDown(e) {
    e.preventDefault();
    if (e.key in game.keyState) {
        game.keyState[e.key] = true;
        game.buttonState[constants.KEYS_MAP[e.key]] = false;
    }
}

// Handle key up
function handleKeyUp(e) {
    e.preventDefault();
    if (e.key in game.keyState) {
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
export function startGame(mainCanvas, gameType, scoreHandlers) {
    game = new Game(mainCanvas, gameType, scoreHandlers);
    const countdown = new Countdown(3);

    const frameDuration = 1000 / constants.TARGET_FPS;
    let lastTime = performance.now();
    let animationFrameId;

    function startGameLoop() {
        function gameLoop(currentTime) {
            const deltaTime = currentTime - lastTime;
            if (deltaTime >= frameDuration) {
                game.updateGameObjects();
                game.draw();
                lastTime = currentTime;
            }
            animationFrameId = requestAnimationFrame(gameLoop);
        }

        game.resizeGameObjects();
        animationFrameId = requestAnimationFrame(gameLoop);

        window.addEventListener("resize", handleResize);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
    }

    function countdownLoop() {
        if (countdown.count > 0) {
            countdown.draw(mainCanvas);
            countdown.decrementCount();
            setTimeout(countdownLoop, 1000);
        } else {
            startGameLoop();
        }
    }

    // Initialize and start countdown
    game.resizeGameObjects();
    countdownLoop();

    // Cleanup
    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("keydown", handleResize);
        window.removeEventListener("keyup", handleKeyUp);
    };
}