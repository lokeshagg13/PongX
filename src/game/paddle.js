import constants from "../store/constants";

class Paddle {
    constructor(x, y, yRatio, width, height, velocity, fillColor = constants.COLORS.WHITE, strokeColor = constants.COLORS.BLACK) {
        this.x = x;  // x coord of center of mass of the paddle
        this.y = y;  // y coord of center of mass of the paddle
        this.yRatio = yRatio;  // y divided by canvas height for y adjustment
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
    }

    moveUp() {
        this.y -= this.velocity;
    }

    moveDown() {
        this.y += this.velocity;
    }

    draw(canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
            const topLeftX = this.x - this.width / 2;
            const topLeftY = this.y - this.height / 2;
            ctx.fillStyle = this.fillColor;
            ctx.strokeStyle = this.strokeColor;
            ctx.fillRect(topLeftX, topLeftY, this.width, this.height);
            ctx.strokeRect(topLeftX, topLeftY, this.width, this.height);
        }

    }
}

export default Paddle;