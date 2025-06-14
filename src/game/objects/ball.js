class Ball {
    constructor(x, y, xRatio, yRatio, radius, velocityX, velocityY, incVelocity, maxVelocity) {
        this.x = x;
        this.y = y;
        this.xRatio = xRatio;
        this.yRatio = yRatio;
        this.radius = radius;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
        this.maxVelocity = maxVelocity;
        this.incVelocity = incVelocity;
        this.originalVelocityX = velocityX;
        this.originalVelocityY = velocityY;
    }

    static getRandomAngle(minAngle, maxAngle, excluded) {
        let angle = 0;
        while (excluded.includes(angle)) {
            angle = (minAngle + Math.random() * (maxAngle - minAngle)) * (Math.PI / 180);
        }
        return angle;
    }

    static getRandomPosition(minPos, maxPos, excluded) {
        let pos = (minPos + Math.random() * (maxPos - minPos));
        while (excluded.includes(pos)) {
            pos = (minPos + Math.random() * (maxPos - minPos));
        }
        return pos;
    }

    reset(newX, newY) {
        this.x = newX;
        this.y = newY;
        this.velocityX = -1 * Math.sign(this.velocityX) * Math.abs(this.originalVelocityX);
        this.velocityY = this.originalVelocityY;
    }

    move() {
        this.x += this.velocityX;
        this.y += this.velocityY;
    }

    accelerate() {
        this.velocityX = Math.min(
            Math.abs(this.velocityX * (1 + this.incVelocity)),
            this.maxVelocity
        ) * Math.sign(this.velocityX);
        this.velocityY = Math.min(
            Math.abs(this.velocityY * (1 + this.incVelocity)),
            this.maxVelocity
        ) * Math.sign(this.velocityY);

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