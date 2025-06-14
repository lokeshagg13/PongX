import { GenomeBuilder } from "neat-javascript";
import config from "./config";
import genomeData from "../bot/genomes/best.json";

class Bot {
    constructor(mutate = false) {
        this.genome = GenomeBuilder.loadGenome(JSON.stringify(genomeData), config);
        if (mutate) this.genome.mutate();

        this.lastDecision = null;
        this.lastUpdateTime = 0;
    }

    decide(inputs) {
        const currentTime = Date.now();
        const decisionDelay = 100; // in milliseconds
        if (currentTime - this.lastUpdateTime < decisionDelay) {
            return this.lastDecision;
        }

        // Propagate inputs through the genome
        const output = this.genome.propagate(inputs);
        const decision = output.indexOf(Math.max(...output));

        // Smooth decision-making
        if (decision === 1 && this.lastDecision !== "up") {
            this.lastDecision = "up";
        } else if (decision === 2 && this.lastDecision !== "down") {
            this.lastDecision = "down";
        } else {
            this.lastDecision = null;
        }

        this.lastUpdateTime = currentTime;
        return this.lastDecision;
    }
}

export default Bot;