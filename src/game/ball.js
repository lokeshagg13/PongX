class Ball {
    constructor(x, y, xRatio, yRatio, radius, velocityX, velocityY) {
        this.x = x;
        this.originalX = x;
        this.y = y;
        this.originalY = y;
        this.xRatio = xRatio;
        this.yRatio = yRatio;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    reset() {
        this.x = this.originalX;
        this.y = this.originalY;
        this.velocityY = 0;
        this.velocityX *= -1;
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            // Define the radial gradient
            const gradient = ctx.createRadialGradient(
                this.x - this.radius * 0.3, // Light source x (
                this.y - this.radius * 0.3, // Light source y
                this.radius * 0.1, // Inner radius
                this.x, // Outer gradient center x
                this.y, // Outer gradient center y
                this.radius // Outer radius
            );

            // Gradient color stops
            gradient.addColorStop(0, "#ffffff"); // Bright spot
            gradient.addColorStop(0.5, "#c0c0c0"); // Mid tone
            gradient.addColorStop(1, "#808080"); // Shadow

            // Fill the circle with the gradient
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // Create the circle
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
        }
    }
}

export default Ball;