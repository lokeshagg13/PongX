import gameConfig from "../gameConfig";

class Paddle {
    constructor(x, y, yRatio, width, height, velocity, fillColor = gameConfig.COLORS.WHITE, strokeColor = gameConfig.COLORS.BLACK) {
        this.x = x;  // x coord of center of mass of the paddle
        this.y = y;  // y coord of center of mass of the paddle
        this.yRatio = yRatio;  // y divided by canvas height for y adjustment
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }

    moveUp(customVelocity = null) {
        if (customVelocity) this.y -= customVelocity;
        else this.y -= this.velocity;
    }

    moveDown(customVelocity = null) {
        if (customVelocity) this.y += customVelocity;
        else this.y += this.velocity;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const topLeftX = this.x - this.width / 2;
            const topLeftY = this.y - this.height / 2;

            // Create a gradient fill for the paddle
            const gradient = ctx.createLinearGradient(topLeftX, topLeftY, topLeftX, topLeftY + this.height);
            gradient.addColorStop(0, this.fillColor); // Start color
            gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)"); // Light gradient at bottom

            // Draw paddle with gradient fill
            ctx.fillStyle = gradient;
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = 2; // Outline thickness
            ctx.beginPath();
            ctx.roundRect(topLeftX, topLeftY, this.width, this.height, 8); // Rounded corners with a radius of 8
            ctx.fill();
            ctx.stroke();

            // Add a subtle shadow
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;

            // Reset shadow to avoid affecting other elements
            ctx.shadowColor = "transparent";
        }
    }
}

export default Paddle;