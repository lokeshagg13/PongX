class Countdown {
    constructor(initialCount) {
        this.initialCount = initialCount;
        this.count = initialCount;
    }

    decrementCount() {
        if (this.count > 0)
            this.count -= 1;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 48px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(this.count, canvas.width / 2, canvas.height / 2);
    }
}

export default Countdown;