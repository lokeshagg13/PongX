import { GenomeBuilder, Population } from "neat-javascript";

import config from "../bot/config";
import SimulatorGame from "./game";
import constants from "../../store/constants";
import { findAverageFitness, findAvgMatchDuration, findBestMatchDuration, saveBestGenome } from "./utils";

let matchDurations = [];

function movePaddlesAI(genome1, genome2, simulatorGame) {
    const players = [
        [genome1, simulatorGame.leftPaddle, "left"],
        [genome2, simulatorGame.rightPaddle, "right"]
    ];

    players.forEach(([genome, paddleObject, whichPaddle]) => {
        const output = genome.propagate([
            paddleObject.y,
            Math.abs(paddleObject.x - simulatorGame.ball.x),
            simulatorGame.ball.y
        ]);
        const decision = output.indexOf(Math.max(...output));
        let validMove = true;
        if (decision === 0) {
            genome.fitness -= 0.01  // Penalize for staying still
        } else if (decision === 1) {
            validMove = simulatorGame.movePaddle(whichPaddle, "up");
        } else {
            validMove = simulatorGame.movePaddle(whichPaddle, "down");
        }

        // Penalize for paddles trying to go off the screen
        if (!validMove) {
            genome.fitness -= 1;
        }
    });
}

function trainAI(genome1, genome2, canvas, isSimulatorRunning, updateLog) {
    return new Promise((resolve) => {
        let simulatorGame = new SimulatorGame(canvas);
        const frameDuration = 1000 / constants.TARGET_FPS;
        let startTime = performance.now();
        let lastTime = performance.now();
        let animationFrameId;

        function handleResize() {
            simulatorGame.resizeGameObjects();
        }

        function updateFitness() {
            const matchDuration = (performance.now() - startTime) / 1000; // In seconds
            matchDurations.push(matchDuration);
            updateLog({
                bestMatchDuration: findBestMatchDuration(matchDurations),
                avgMatchDuration: findAvgMatchDuration(matchDurations)
            });
            genome1.fitness += simulatorGame.leftHits + matchDuration;
            genome2.fitness += simulatorGame.rightHits + matchDuration;
        }

        function gameLoop(currentTime) {
            if (!isSimulatorRunning()) {
                cancelAnimationFrame(animationFrameId);
                window.removeEventListener("resize", handleResize);
                resolve();
                return;
            }

            const deltaTime = currentTime - lastTime;
            if (deltaTime >= frameDuration) {
                movePaddlesAI(genome1, genome2, simulatorGame);
                simulatorGame.updateGameObjects();
                simulatorGame.draw();

                if (simulatorGame.leftScore >= 1 || simulatorGame.rightScore >= 1 || simulatorGame.leftHits > 50) {
                    updateFitness();
                    cancelAnimationFrame(animationFrameId);
                    window.removeEventListener("resize", handleResize);
                    resolve();
                    return;
                }
                lastTime = currentTime;
            }
            animationFrameId = requestAnimationFrame(gameLoop);
        }
        simulatorGame.resizeGameObjects();
        animationFrameId = requestAnimationFrame(gameLoop);
        window.addEventListener("resize", handleResize);
    });
}

async function evalGenomes(genomes, canvas, updateLog, isSimulatorRunning) {
    for (let i = 0; i < genomes.length; i++) {
        if (!isSimulatorRunning()) return;
        genomes[i].fitness = 0
        for (let j = i + 1; j < genomes.length; j++) {
            if (!isSimulatorRunning()) return;
            genomes[j].fitness = genomes[j]?.fitness || 0;
            updateLog({
                genomeX: i + 1,
                genomeY: j + 1,
            });
            await trainAI(genomes[i], genomes[j], canvas, isSimulatorRunning, updateLog);
        }
    }
}

export async function runSimulation(canvas, updateLog, isSimulatorRunning) {
    // Create a new population with your configuration
    const population = new Population(config);
    // For each generation
    for (let i = 0; i < config.generations; i++) {
        if (!isSimulatorRunning()) break;
        updateLog({ generation: i + 1 });
        matchDurations = [];
        await evalGenomes(population.genomes, canvas, updateLog, isSimulatorRunning);

        const bestGenome = population.getBestGenome();
        const avgFitness = findAverageFitness(population.genomes);

        updateLog({
            bestFitnessScore: bestGenome.fitness.toFixed(2),
            avgFitnessScore: avgFitness.toFixed(2),
        });

        saveBestGenome(bestGenome); // Save the final best genome    
        population.evolve();
    }

    console.log('Simulation Complete!')
}

export async function resumeSimulation(canvas, generationNum, savedGenomeData, updateLog, isSimulatorRunning) {
    // Create a new population with your configuration
    const population = new Population(config);
    const savedGenome = GenomeBuilder.loadGenome(JSON.stringify(savedGenomeData), config);

    population.genomes = population.genomes.map(_ => savedGenome);

    // For each generation
    for (let i = generationNum - 1; i < config.generations; i++) {
        if (!isSimulatorRunning()) break;
        updateLog({ generation: i + 1 });
        matchDurations = [];
        await evalGenomes(population.genomes, canvas, updateLog, isSimulatorRunning);

        if (isSimulatorRunning()) {
            const bestGenome = population.getBestGenome();
            const avgFitness = findAverageFitness(population.genomes);
            updateLog({
                bestFitnessScore: bestGenome.fitness.toFixed(2),
                avgFitnessScore: avgFitness.toFixed(2),
            });
            saveBestGenome(bestGenome); // Save the final best genome    
            population.evolve();
        }
    }

    console.log('Simulation Complete!')
}



