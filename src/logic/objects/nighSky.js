class NightSky {
    constructor(numStars, maxWidth, maxHeight) {
        this.numStars = numStars;
        this.starCoords = [];
        this.regenerate(maxWidth, maxHeight);
    }

    regenerate(maxWidth, maxHeight) {
        this.starCoords = [];
        for (let i = 0; i < this.numStars; i++) {
            this.starCoords.push([
                Math.random() * maxWidth,
                Math.random() * maxHeight
            ]);
        }
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (this.starCoords.length === 0) {
            this.regenerate(canvas.width, canvas.height);
        }
        for (let i = 0; i < this.numStars; i++) {
            const [x, y] = this.starCoords[i];
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }
    }
}

export default NightSky;

